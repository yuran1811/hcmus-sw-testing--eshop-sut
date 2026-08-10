#!/usr/bin/env python3
"""
analyze_jtl.py — Tinh ground truth tu file .jtl cua JMeter (hoac CSV tuong duong).

Chi dung thu vien chuan cua Python, khong can cai dat gi them.

Vi du:
    python3 analyze_jtl.py results/load.jtl
    python3 analyze_jtl.py results/load.jtl --steady-only
    python3 analyze_jtl.py results/load.jtl --label "05 - Checkout"
    python3 analyze_jtl.py results/load.jtl --json > ground_truth.json
    python3 analyze_jtl.py results/soak.jtl --window 60   # xu huong theo cua so 60s
"""

import argparse
import csv
import json
import math
import sys
from collections import defaultdict


# ----------------------------------------------------------------------
# Percentile
# ----------------------------------------------------------------------
def percentile(sorted_values, pct):
    """Nearest-rank percentile, cung quy uoc voi JMeter.

    JMeter dung nearest-rank: gia tri thu ceil(pct/100 * N) trong day da sap xep.
    Dung linear interpolation (nhu numpy mac dinh) se lech nhe so voi
    HTML dashboard cua JMeter — day la mot nguon 'sai so bi ngo nhan la loi'.
    """
    if not sorted_values:
        return None
    n = len(sorted_values)
    rank = math.ceil(pct / 100.0 * n)
    rank = max(1, min(rank, n))
    return sorted_values[rank - 1]


def stats_for(elapsed_list):
    if not elapsed_list:
        return None
    s = sorted(elapsed_list)
    n = len(s)
    return {
        "count": n,
        "min": s[0],
        "max": s[-1],
        "mean": round(sum(s) / n, 2),
        "p50": percentile(s, 50),
        "p90": percentile(s, 90),
        "p95": percentile(s, 95),
        "p99": percentile(s, 99),
    }


# ----------------------------------------------------------------------
# Doc file
# ----------------------------------------------------------------------
REQUIRED = ("timeStamp", "elapsed", "label", "success")


def load_jtl(path):
    rows = []
    with open(path, newline="", encoding="utf-8", errors="replace") as f:
        reader = csv.DictReader(f)
        if reader.fieldnames is None:
            sys.exit("File rong hoac khong doc duoc header.")
        missing = [c for c in REQUIRED if c not in reader.fieldnames]
        if missing:
            sys.exit(
                "Thieu cot bat buoc: %s\nHeader tim thay: %s\n"
                "Neu file o dinh dang XML, chay lai test voi "
                "jmeter.save.saveservice.output_format=csv."
                % (", ".join(missing), ", ".join(reader.fieldnames))
            )
        for r in reader:
            try:
                row = {
                    "ts": int(r["timeStamp"]),
                    "elapsed": int(r["elapsed"]),
                    "label": r["label"],
                    # Cot 'success' moi la nguon su that ve pass/fail.
                    # responseCode=200 van co the success=false neu assertion fail.
                    "success": str(r["success"]).strip().lower() == "true",
                    "code": r.get("responseCode", ""),
                    "latency": int(r["Latency"]) if r.get("Latency", "").isdigit() else None,
                    "connect": int(r["Connect"]) if r.get("Connect", "").isdigit() else None,
                    "threads": int(r["allThreads"]) if r.get("allThreads", "").isdigit() else None,
                    "bytes": int(r["bytes"]) if r.get("bytes", "").isdigit() else 0,
                }
            except (ValueError, KeyError):
                continue  # bo qua dong hong
            rows.append(row)
    if not rows:
        sys.exit("Khong doc duoc dong du lieu hop le nao.")
    rows.sort(key=lambda x: x["ts"])
    return rows


# ----------------------------------------------------------------------
# Steady-state
# ----------------------------------------------------------------------
def detect_steady_state(rows, tolerance=0.9):
    """Tim khoang thoi gian ma allThreads o gan muc toi da.

    So lieu trong ramp-up/ramp-down bi nhieu; tinh p95 tren toan file
    se tron lan ba giai doan khac nhau va cho ra con so khong dai dien.
    """
    threaded = [r for r in rows if r["threads"] is not None]
    if not threaded:
        return None
    peak = max(r["threads"] for r in threaded)
    if peak == 0:
        return None
    cutoff = peak * tolerance
    inside = [r for r in threaded if r["threads"] >= cutoff]
    if not inside:
        return None
    return {
        "start_ts": inside[0]["ts"],
        "end_ts": inside[-1]["ts"],
        "peak_threads": peak,
        "cutoff_threads": round(cutoff, 1),
        "sample_count": len(inside),
    }


def slice_window(rows, start_ts, end_ts):
    return [r for r in rows if start_ts <= r["ts"] <= end_ts]


# ----------------------------------------------------------------------
# Tinh toan tong hop
# ----------------------------------------------------------------------
def summarize(rows, name):
    if not rows:
        return None
    duration_s = (rows[-1]["ts"] - rows[0]["ts"]) / 1000.0
    errors = sum(1 for r in rows if not r["success"])
    st = stats_for([r["elapsed"] for r in rows])
    lat = [r["latency"] for r in rows if r["latency"] is not None]

    out = {
        "scope": name,
        "samples": len(rows),
        "duration_seconds": round(duration_s, 2),
        # Throughput tinh tren khoang thoi gian THUC TE cua tap dang xet.
        # Neu tinh tren toan file ke ca ramp-down, con so se thap hon thuc te.
        "throughput_rps": round(len(rows) / duration_s, 2) if duration_s > 0 else None,
        "errors": errors,
        "error_rate_pct": round(errors / len(rows) * 100, 3),
        "response_time_ms": st,
    }
    if lat:
        ls = stats_for(lat)
        out["latency_ttfb_ms"] = {"p50": ls["p50"], "p95": ls["p95"], "mean": ls["mean"]}
    return out


def by_label(rows):
    buckets = defaultdict(list)
    for r in rows:
        buckets[r["label"]].append(r)
    result = {}
    for label, rs in sorted(buckets.items()):
        errors = sum(1 for r in rs if not r["success"])
        st = stats_for([r["elapsed"] for r in rs])
        result[label] = {
            "samples": len(rs),
            "errors": errors,
            "error_rate_pct": round(errors / len(rs) * 100, 3),
            **st,
        }
    return result


def error_breakdown(rows):
    counts = defaultdict(int)
    for r in rows:
        if not r["success"]:
            counts["%s | %s" % (r["label"], r["code"] or "no-code")] += 1
    return dict(sorted(counts.items(), key=lambda kv: -kv[1]))


def time_windows(rows, window_s):
    """Chia theo cua so thoi gian de phat hien degradation tich tu.

    p95 tang dan trong khi tai khong doi la dau hieu co van de tich luy
    (memory leak, log file phinh to, phan manh du lieu).
    """
    if not rows:
        return []
    t0 = rows[0]["ts"]
    buckets = defaultdict(list)
    for r in rows:
        idx = int((r["ts"] - t0) / 1000 / window_s)
        buckets[idx].append(r)
    out = []
    for idx in sorted(buckets):
        rs = buckets[idx]
        st = stats_for([r["elapsed"] for r in rs])
        errors = sum(1 for r in rs if not r["success"])
        out.append({
            "window": "%ds-%ds" % (idx * window_s, (idx + 1) * window_s),
            "samples": len(rs),
            "rps": round(len(rs) / window_s, 2),
            "p50": st["p50"],
            "p95": st["p95"],
            "error_rate_pct": round(errors / len(rs) * 100, 2),
            "avg_threads": round(
                sum(r["threads"] for r in rs if r["threads"] is not None) /
                max(1, sum(1 for r in rs if r["threads"] is not None)), 1),
        })
    return out


# ----------------------------------------------------------------------
# In ket qua
# ----------------------------------------------------------------------
def print_block(title, d):
    if not d:
        return
    print("\n" + "=" * 68)
    print(title)
    print("=" * 68)
    print("Samples           : %s" % d["samples"])
    print("Duration (s)      : %s" % d["duration_seconds"])
    print("Throughput (RPS)  : %s" % d["throughput_rps"])
    print("Errors            : %s  (%.3f%%)" % (d["errors"], d["error_rate_pct"]))
    rt = d["response_time_ms"]
    print("\nResponse time (elapsed, ms):")
    print("  min %-8s mean %-10s max %s" % (rt["min"], rt["mean"], rt["max"]))
    print("  p50 %-8s p90 %-8s p95 %-8s p99 %s"
          % (rt["p50"], rt["p90"], rt["p95"], rt["p99"]))
    if "latency_ttfb_ms" in d:
        lt = d["latency_ttfb_ms"]
        print("\nLatency / TTFB (ms):  p50 %s   p95 %s   mean %s"
              % (lt["p50"], lt["p95"], lt["mean"]))
        print("  (Latency = thoi gian toi byte dau tien; elapsed = toan bo response.")
        print("   Nham hai cot nay la loi doc log pho bien nhat.)")


def print_table(title, rows_dict):
    print("\n" + "-" * 68)
    print(title)
    print("-" * 68)
    print("%-28s %8s %8s %8s %8s %7s" % ("Label", "Samples", "p50", "p95", "p99", "Err%"))
    for label, d in rows_dict.items():
        print("%-28s %8s %8s %8s %8s %7s"
              % (label[:28], d["samples"], d["p50"], d["p95"], d["p99"], d["error_rate_pct"]))


def print_windows(wins):
    if not wins:
        return
    print("\n" + "-" * 68)
    print("XU HUONG THEO CUA SO THOI GIAN")
    print("-" * 68)
    print("%-14s %8s %8s %8s %8s %8s" % ("Window", "Samples", "RPS", "p50", "p95", "Err%"))
    for w in wins:
        print("%-14s %8s %8s %8s %8s %8s"
              % (w["window"], w["samples"], w["rps"], w["p50"], w["p95"], w["error_rate_pct"]))
    first, last = wins[0], wins[-1]
    if first["p95"] and last["p95"] and first["p95"] > 0:
        delta = (last["p95"] - first["p95"]) / first["p95"] * 100
        print("\np95 cua so dau -> cuoi: %s ms -> %s ms  (%+.1f%%)"
              % (first["p95"], last["p95"], delta))
        if delta > 20:
            print("  => p95 tang dang ke. Neu tai giu nguyen, day la dau hieu")
            print("     degradation tich tu — can doi chieu voi do thi RAM truoc")
            print("     khi ket luan la memory leak.")


def main():
    ap = argparse.ArgumentParser(description="Tinh ground truth tu file .jtl")
    ap.add_argument("jtl_file")
    ap.add_argument("--label", help="Chi phan tich mot label cu the")
    ap.add_argument("--steady-only", action="store_true",
                    help="Chi bao cao giai doan steady-state")
    ap.add_argument("--window", type=int, default=0,
                    help="Kich thuoc cua so thoi gian (giay) de xem xu huong, vd 60")
    ap.add_argument("--json", action="store_true", help="Xuat JSON thay vi text")
    args = ap.parse_args()

    rows = load_jtl(args.jtl_file)
    if args.label:
        rows = [r for r in rows if r["label"] == args.label]
        if not rows:
            sys.exit("Khong tim thay sample nao voi label: %s" % args.label)

    steady = detect_steady_state(rows)
    overall = summarize(rows, "toan bo file")
    steady_summary = None
    if steady:
        steady_rows = slice_window(rows, steady["start_ts"], steady["end_ts"])
        steady_summary = summarize(steady_rows, "chi steady-state")

    result = {
        "file": args.jtl_file,
        "overall": overall,
        "steady_state": steady,
        "steady_state_summary": steady_summary,
        "by_label": by_label(rows),
        "error_breakdown": error_breakdown(rows),
    }
    if args.window:
        base = slice_window(rows, steady["start_ts"], steady["end_ts"]) \
            if (args.steady_only and steady) else rows
        result["time_windows"] = time_windows(base, args.window)

    if args.json:
        print(json.dumps(result, indent=2, ensure_ascii=False))
        return

    print("\nFILE: %s" % args.jtl_file)
    if not args.steady_only:
        print_block("TOAN BO FILE (gom ca ramp-up va ramp-down)", overall)
    if steady:
        print("\nSteady-state phat hien duoc: peak %s threads, "
              "nguong xet >= %s threads, %s samples"
              % (steady["peak_threads"], steady["cutoff_threads"], steady["sample_count"]))
        print_block("CHI STEADY-STATE  <-- dung khoang nay de doi chieu SLA",
                    steady_summary)
    else:
        print("\nKhong xac dinh duoc steady-state (thieu cot allThreads).")
        print("Moi so lieu duoi day tinh tren toan file — ghi ro dieu nay khi bao cao.")

    print_table("THEO TUNG TRANSACTION (toan file)", result["by_label"])

    if result["error_breakdown"]:
        print("\n" + "-" * 68)
        print("PHAN RA LOI (label | responseCode)")
        print("-" * 68)
        for k, v in result["error_breakdown"].items():
            print("  %-52s %6d" % (k[:52], v))
    else:
        print("\nKhong co sample nao that bai (success=false).")

    if args.window:
        print_windows(result["time_windows"])

    print("\n" + "=" * 68)
    print("LUU Y KHI TRICH DAN")
    print("=" * 68)
    print("- Percentile o day tinh theo nearest-rank, cung quy uoc voi JMeter.")
    print("- Error rate tinh tu cot 'success', khong phai 'responseCode'.")
    print("- Doi chieu SLA bang so lieu STEADY-STATE, khong phai toan file.")
    print("- Log nay khong chua thong tin tang database, GC hay disk I/O:")
    print("  moi ket luan ve nhung tang do deu la suy dien, phai ghi ro.\n")


if __name__ == "__main__":
    main()
