#!/usr/bin/env python3
"""Overlay a StudentID@hcmus.edu.vn watermark onto one image or every image in a folder.

Usage:
    python watermark_screenshot.py <input_path> [--student-id ID] [options]

Arguments:
    input_path    a single .png/.jpg file, or a folder (every .png/.jpg/.jpeg inside is processed)

Options:
    --student-id ID    e.g. 25127001 -> watermark text becomes "25127001@hcmus.edu.vn".
                        OPTIONAL — if omitted, DEFAULT_EMAIL below is used as-is instead.
                        HW03 requires the exact form "<StudentID>@hcmus.edu.vn" on submitted
                        screenshots, so pass --student-id explicitly for those. DEFAULT_EMAIL is
                        a personal address on a different domain — fine for quick local testing,
                        not the format graders expect on the final submission.
    --output-dir DIR   write results here, mirroring input filenames (default: "<input>_watermarked/")
    --in-place          overwrite the original file(s) instead of writing elsewhere (must be explicit)
    --position {br,bl,tr,tl}   corner to place the watermark in (default: br)
    --opacity N         0-255, higher = more visible (default: 200)
    --font-size N       pixel size, auto-scaled to image width if omitted
    --raw-text TEXT     use this exact text instead of "<student_id>@hcmus.edu.vn" / DEFAULT_EMAIL

Never overwrites originals unless --in-place is passed explicitly.
"""

import argparse
import sys
from pathlib import Path
from typing import Optional

from PIL import Image, ImageDraw, ImageFont

IMG_EXTS = {".png", ".jpg", ".jpeg"}

# Personal default, used only when student_id is omitted — see the note above about why this
# is NOT the format required on submitted screenshots (those need "<StudentID>@hcmus.edu.vn").
DEFAULT_EMAIL = "nlhakhoa23@clc.fitus.edu.vn"


def find_font(size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ]
    for path in candidates:
        if Path(path).is_file():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default(size=size)


def watermark_one(src: Path, dst: Path, text: str, position: str, opacity: int, font_size: Optional[int]):
    img = Image.open(src).convert("RGBA")
    w, h = img.size
    size = font_size or max(14, w // 40)
    font = find_font(size)

    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w, text_h = bbox[2] - bbox[0], bbox[3] - bbox[1]

    margin = max(8, size // 2)
    pad = max(4, size // 4)
    x = margin if "l" in position else w - text_w - margin - pad * 2
    y = margin if "t" in position else h - text_h - margin - pad * 2

    # subtle backing box so the text stays legible on any background
    draw.rounded_rectangle(
        [x, y, x + text_w + pad * 2, y + text_h + pad * 2],
        radius=max(3, pad // 2),
        fill=(0, 0, 0, min(160, opacity)),
    )
    draw.text((x + pad, y + pad - bbox[1]), text, font=font, fill=(255, 255, 255, opacity))

    out = Image.alpha_composite(img, overlay)
    if src.suffix.lower() in {".jpg", ".jpeg"}:
        out = out.convert("RGB")
    dst.parent.mkdir(parents=True, exist_ok=True)
    out.save(dst)


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("input_path")
    p.add_argument("--student-id", default=None)
    p.add_argument("--output-dir")
    p.add_argument("--in-place", action="store_true")
    p.add_argument("--position", choices=["br", "bl", "tr", "tl"], default="br")
    p.add_argument("--opacity", type=int, default=200)
    p.add_argument("--font-size", type=int, default=None)
    p.add_argument("--raw-text")
    args = p.parse_args()

    if args.raw_text:
        text = args.raw_text
    elif args.student_id:
        text = f"{args.student_id}@hcmus.edu.vn"
    else:
        text = DEFAULT_EMAIL
    src_path = Path(args.input_path)
    if not src_path.exists():
        sys.exit(f"error: no such path: {src_path}")

    if src_path.is_file():
        files = [src_path]
    else:
        files = sorted(f for f in src_path.rglob("*") if f.suffix.lower() in IMG_EXTS)
        if not files:
            sys.exit(f"error: no .png/.jpg/.jpeg files found under {src_path}")

    if args.in_place:
        out_for = lambda f: f
    elif args.output_dir:
        out_root = Path(args.output_dir)
        base = src_path if src_path.is_dir() else src_path.parent
        out_for = lambda f: out_root / f.relative_to(base)
    else:
        out_root = (src_path if src_path.is_dir() else src_path.parent) / f"{src_path.stem if src_path.is_file() else src_path.name}_watermarked"
        base = src_path if src_path.is_dir() else src_path.parent
        out_for = lambda f: out_root / f.relative_to(base)

    for f in files:
        dst = out_for(f)
        watermark_one(f, dst, text, args.position, args.opacity, args.font_size)
        print(f"watermarked {f} -> {dst}")

    print(f"done: {len(files)} file(s), text='{text}'")


if __name__ == "__main__":
    main()
