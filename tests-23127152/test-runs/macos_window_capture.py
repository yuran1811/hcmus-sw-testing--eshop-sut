#!/usr/bin/env python3
"""List or capture an on-screen macOS window by owner name substring.

Uses CGWindowListCreateImage (works when /usr/sbin/screencapture is TCC-blocked).

Usage:
  python3 macos_window_capture.py list [owner_substr]
  python3 macos_window_capture.py capture <owner_substr> <out.png> [--title-substr S]
"""

from __future__ import annotations

import argparse
import ctypes
import ctypes.util
import sys
from ctypes import (
    POINTER,
    Structure,
    byref,
    c_bool,
    c_char_p,
    c_double,
    c_int32,
    c_long,
    c_uint32,
    c_ulong,
    c_void_p,
    create_string_buffer,
)
from typing import Optional

CFTypeRef = c_void_p
CFArrayRef = c_void_p
CFDictionaryRef = c_void_p
CFStringRef = c_void_p
CGImageRef = c_void_p

kUTF8 = 0x08000100


class CGRect(Structure):
    _fields_ = [("x", c_double), ("y", c_double), ("w", c_double), ("h", c_double)]


def _cf():
    return ctypes.CDLL(ctypes.util.find_library("CoreFoundation"))


def _cg():
    return ctypes.CDLL(ctypes.util.find_library("CoreGraphics"))


def _imageio():
    return ctypes.CDLL(ctypes.util.find_library("ImageIO"))


def cfstr_to_py(cf_lib, cf):
    if not cf:
        return ""
    cf_lib.CFStringGetLength.argtypes = [CFStringRef]
    cf_lib.CFStringGetLength.restype = c_long
    length = cf_lib.CFStringGetLength(cf)
    if length <= 0:
        return ""
    buf = create_string_buffer(length * 4 + 1)
    cf_lib.CFStringGetCString.argtypes = [CFStringRef, c_char_p, c_long, c_uint32]
    cf_lib.CFStringGetCString.restype = c_bool
    ok = cf_lib.CFStringGetCString(cf, buf, len(buf), kUTF8)
    return buf.value.decode("utf-8", errors="replace") if ok else ""


def cf_str(cf_lib, s: str):
    cf_lib.CFStringCreateWithCString.argtypes = [CFTypeRef, c_char_p, c_uint32]
    cf_lib.CFStringCreateWithCString.restype = CFStringRef
    return cf_lib.CFStringCreateWithCString(None, s.encode(), kUTF8)


def list_windows():
    cg = _cg()
    cf = _cf()
    kCGWindowListOptionOnScreenOnly = 1 << 0
    kCGWindowListExcludeDesktopElements = 1 << 4
    kCGNullWindowID = 0

    cg.CGWindowListCopyWindowInfo.argtypes = [c_uint32, c_uint32]
    cg.CGWindowListCopyWindowInfo.restype = CFArrayRef
    arr = cg.CGWindowListCopyWindowInfo(
        kCGWindowListOptionOnScreenOnly | kCGWindowListExcludeDesktopElements,
        kCGNullWindowID,
    )
    if not arr:
        return []

    cf.CFArrayGetCount.argtypes = [CFArrayRef]
    cf.CFArrayGetCount.restype = c_long
    cf.CFArrayGetValueAtIndex.argtypes = [CFArrayRef, c_long]
    cf.CFArrayGetValueAtIndex.restype = CFTypeRef
    cf.CFDictionaryGetValue.argtypes = [CFDictionaryRef, CFTypeRef]
    cf.CFDictionaryGetValue.restype = CFTypeRef
    cf.CFNumberGetValue.argtypes = [CFTypeRef, c_int32, c_void_p]
    cf.CFNumberGetValue.restype = c_bool
    cf.CFRelease.argtypes = [CFTypeRef]

    kOwner = cf_str(cf, "kCGWindowOwnerName")
    kName = cf_str(cf, "kCGWindowName")
    kNumber = cf_str(cf, "kCGWindowNumber")
    kLayer = cf_str(cf, "kCGWindowLayer")
    kBounds = cf_str(cf, "kCGWindowBounds")
    kX = cf_str(cf, "X")
    kY = cf_str(cf, "Y")
    kW = cf_str(cf, "Width")
    kH = cf_str(cf, "Height")
    kCFNumberSInt32Type = 3
    kCFNumberDoubleType = 13

    def num_val(nref) -> Optional[float]:
        if not nref:
            return None
        i = c_int32()
        if cf.CFNumberGetValue(nref, kCFNumberSInt32Type, byref(i)):
            return float(i.value)
        d = c_double()
        if cf.CFNumberGetValue(nref, kCFNumberDoubleType, byref(d)):
            return float(d.value)
        return None

    out = []
    count = cf.CFArrayGetCount(arr)
    for i in range(count):
        d = cf.CFArrayGetValueAtIndex(arr, i)
        owner = cfstr_to_py(cf, cf.CFDictionaryGetValue(d, kOwner))
        name = cfstr_to_py(cf, cf.CFDictionaryGetValue(d, kName))
        wid = num_val(cf.CFDictionaryGetValue(d, kNumber))
        layer = num_val(cf.CFDictionaryGetValue(d, kLayer))
        b = cf.CFDictionaryGetValue(d, kBounds)
        bounds = None
        if b:
            bounds = {
                "x": num_val(cf.CFDictionaryGetValue(b, kX)),
                "y": num_val(cf.CFDictionaryGetValue(b, kY)),
                "w": num_val(cf.CFDictionaryGetValue(b, kW)),
                "h": num_val(cf.CFDictionaryGetValue(b, kH)),
            }
        out.append(
            {
                "owner": owner,
                "name": name,
                "id": int(wid) if wid is not None else None,
                "layer": int(layer) if layer is not None else None,
                "bounds": bounds,
            }
        )
    cf.CFRelease(arr)
    return out


def pick_window(owner_substr: str, title_substr: Optional[str] = None):
    owner_substr = owner_substr.lower()
    title_substr = title_substr.lower() if title_substr else None
    cands = []
    for w in list_windows():
        if w["layer"] not in (0, None):
            continue
        if owner_substr not in (w["owner"] or "").lower():
            continue
        if title_substr and title_substr not in (w["name"] or "").lower():
            continue
        b = w["bounds"] or {}
        area = (b.get("w") or 0) * (b.get("h") or 0)
        if area < 200 * 200:
            continue
        cands.append((area, w))
    cands.sort(key=lambda t: t[0], reverse=True)
    return cands[0][1] if cands else None


def save_cgimage_png(image: int, out_path: str):
    cf = _cf()
    imageio = _imageio()

    cf.CFURLCreateFromFileSystemRepresentation.argtypes = [
        CFTypeRef,
        c_char_p,
        c_long,
        c_bool,
    ]
    cf.CFURLCreateFromFileSystemRepresentation.restype = CFTypeRef
    path_bytes = out_path.encode()
    url = cf.CFURLCreateFromFileSystemRepresentation(None, path_bytes, len(path_bytes), False)
    if not url:
        raise RuntimeError("CFURLCreateFromFileSystemRepresentation failed")

    uti = cf_str(cf, "public.png")
    imageio.CGImageDestinationCreateWithURL.argtypes = [CFTypeRef, CFStringRef, c_ulong, CFTypeRef]
    imageio.CGImageDestinationCreateWithURL.restype = CFTypeRef
    dest = imageio.CGImageDestinationCreateWithURL(url, uti, 1, None)
    if not dest:
        raise RuntimeError("CGImageDestinationCreateWithURL failed")

    imageio.CGImageDestinationAddImage.argtypes = [CFTypeRef, CGImageRef, CFTypeRef]
    imageio.CGImageDestinationAddImage(dest, c_void_p(image), None)

    imageio.CGImageDestinationFinalize.argtypes = [CFTypeRef]
    imageio.CGImageDestinationFinalize.restype = c_bool
    ok = imageio.CGImageDestinationFinalize(dest)
    cf.CFRelease.argtypes = [CFTypeRef]
    cf.CFRelease(dest)
    cf.CFRelease(url)
    if not ok:
        raise RuntimeError("CGImageDestinationFinalize failed")


def capture_window_id(window_id: int, out_path: str, bounds: Optional[dict] = None):
    """Prefer /usr/sbin/screencapture (needs Screen Recording). Fallback to CG."""
    import subprocess
    from pathlib import Path

    # 1) screencapture -l<windowid>
    r = subprocess.run(
        ["/usr/sbin/screencapture", "-x", f"-l{window_id}", out_path],
        capture_output=True,
        text=True,
    )
    if r.returncode == 0 and Path(out_path).is_file() and Path(out_path).stat().st_size > 2000:
        return "screencapture-l"

    # 2) screencapture -R from window bounds
    if bounds and all(bounds.get(k) is not None for k in ("x", "y", "w", "h")):
        region = f"{int(bounds['x'])},{int(bounds['y'])},{int(bounds['w'])},{int(bounds['h'])}"
        r2 = subprocess.run(
            ["/usr/sbin/screencapture", "-x", f"-R{region}", out_path],
            capture_output=True,
            text=True,
        )
        if r2.returncode == 0 and Path(out_path).is_file() and Path(out_path).stat().st_size > 2000:
            return f"screencapture-R:{region}"

    # 3) CG fallback (may be black without full TCC)
    cg = _cg()
    kCGWindowListOptionIncludingWindow = 1 << 3
    kCGWindowImageBoundsIgnoreFraming = 1 << 0
    kCGWindowImageBestResolution = 1 << 1
    cg.CGWindowListCreateImage.restype = CGImageRef
    cg.CGWindowListCreateImage.argtypes = [CGRect, c_uint32, c_uint32, c_uint32]
    null_rect = CGRect(0, 0, 0, 0)
    img = cg.CGWindowListCreateImage(
        null_rect,
        kCGWindowListOptionIncludingWindow,
        c_uint32(window_id),
        kCGWindowImageBoundsIgnoreFraming | kCGWindowImageBestResolution,
    )
    if not img:
        raise RuntimeError(
            f"capture failed for window {window_id}: screencapture={r.stderr!r}"
        )
    try:
        save_cgimage_png(img, out_path)
    finally:
        cg.CGImageRelease.argtypes = [CGImageRef]
        cg.CGImageRelease(c_void_p(img))
    return "cg"


def capture(owner_substr: str, out_path: str, title_substr: Optional[str] = None):
    w = pick_window(owner_substr, title_substr)
    if not w or w["id"] is None:
        raise SystemExit(f"No window matched owner~{owner_substr!r} title~{title_substr!r}")
    how = capture_window_id(w["id"], out_path, w.get("bounds"))
    print(f"captured[{how}] id={w['id']} owner={w['owner']!r} title={w['name']!r} -> {out_path}")
    return w


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)

    p_list = sub.add_parser("list")
    p_list.add_argument("owner", nargs="?", default="")

    p_cap = sub.add_parser("capture")
    p_cap.add_argument("owner")
    p_cap.add_argument("out")
    p_cap.add_argument("--title-substr", default=None)

    args = ap.parse_args()
    if args.cmd == "list":
        for w in list_windows():
            if args.owner and args.owner.lower() not in (w["owner"] or "").lower():
                continue
            print(f"{w['id']}\tlayer={w['layer']}\t{w['owner']}\t{w['name']}\t{w['bounds']}")
    else:
        capture(args.owner, args.out, args.title_substr)


if __name__ == "__main__":
    main()
