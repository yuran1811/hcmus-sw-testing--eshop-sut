# JTL Parser — Reference Implementation

## summarize_jtl

```python
import pandas as pd
import numpy as np
from pathlib import Path


def summarize_jtl(filepath: str) -> dict:
    """
    Parse a JMeter JTL file and return a structured summary of performance
    metrics per sampler label, plus an overall aggregate.

    All elapsed times are in milliseconds.
    Error rate is computed from the success column, not from HTTP status codes,
    to correctly capture Duration Assertion failures and network timeouts.
    """
    df = pd.read_csv(filepath, low_memory=False)

    # Normalize types
    df["elapsed"] = pd.to_numeric(df["elapsed"], errors="coerce")
    df["Latency"] = pd.to_numeric(df["Latency"], errors="coerce")
    df["timeStamp"] = pd.to_numeric(df["timeStamp"], errors="coerce")
    df["success_bool"] = df["success"].astype(str).str.strip().str.lower() == "true"

    total_duration_sec = (df["timeStamp"].max() - df["timeStamp"].min()) / 1000.0

    def metrics_for(subset: pd.DataFrame) -> dict:
        n = len(subset)
        failed = subset[~subset["success_bool"]]
        successful = subset[subset["success_bool"]]
        return {
            "total_requests": n,
            "success_count": len(successful),
            "failure_count": len(failed),
            "error_rate_pct": round(len(failed) / n * 100, 3) if n > 0 else 0.0,
            "avg_elapsed_ms": round(subset["elapsed"].mean(), 1),
            "median_elapsed_ms": round(subset["elapsed"].median(), 1),
            "p90_elapsed_ms": round(subset["elapsed"].quantile(0.90), 1),
            "p95_elapsed_ms": round(subset["elapsed"].quantile(0.95), 1),
            "p99_elapsed_ms": round(subset["elapsed"].quantile(0.99), 1),
            "max_elapsed_ms": int(subset["elapsed"].max()),
            "avg_latency_ms": round(subset["Latency"].mean(), 1),
            # Throughput uses the full test window, not per-sampler window,
            # to give a consistent and comparable figure across all labels.
            "throughput_rps": round(n / total_duration_sec, 3) if total_duration_sec > 0 else 0.0,
        }

    summary = {}

    for label in sorted(df["label"].unique()):
        summary[label] = metrics_for(df[df["label"] == label])

    summary["_OVERALL"] = metrics_for(df)
    summary["_meta"] = {
        "filepath": str(filepath),
        "total_rows": len(df),
        "test_duration_sec": round(total_duration_sec, 1),
        "start_ts": int(df["timeStamp"].min()),
        "end_ts": int(df["timeStamp"].max()),
    }

    return summary


def print_summary(summary: dict):
    """Print a human-readable table from summarize_jtl output."""
    meta = summary.pop("_meta", {})
    overall = summary.pop("_OVERALL", {})

    print(f"\nTest duration: {meta.get('test_duration_sec', '?')}s")
    print(f"Total rows in JTL: {meta.get('total_rows', '?')}\n")

    header = (
        f"{'Label':<35} {'Reqs':>6} {'ErrPct':>7} {'Avg':>7} "
        f"{'p90':>7} {'p95':>7} {'p99':>7} {'Max':>7} {'RPS':>7}"
    )
    print(header)
    print("-" * len(header))

    for label, m in summary.items():
        print(
            f"{label:<35} {m['total_requests']:>6} {m['error_rate_pct']:>6.2f}% "
            f"{m['avg_elapsed_ms']:>7.0f} {m['p90_elapsed_ms']:>7.0f} "
            f"{m['p95_elapsed_ms']:>7.0f} {m['p99_elapsed_ms']:>7.0f} "
            f"{m['max_elapsed_ms']:>7} {m['throughput_rps']:>7.2f}"
        )

    print("-" * len(header))
    print(
        f"{'OVERALL':<35} {overall['total_requests']:>6} {overall['error_rate_pct']:>6.2f}% "
        f"{overall['avg_elapsed_ms']:>7.0f} {overall['p90_elapsed_ms']:>7.0f} "
        f"{overall['p95_elapsed_ms']:>7.0f} {overall['p99_elapsed_ms']:>7.0f} "
        f"{overall['max_elapsed_ms']:>7} {overall['throughput_rps']:>7.2f}"
    )
    # Restore for caller
    summary["_OVERALL"] = overall
    summary["_meta"] = meta
```

## endurance_threshold

```python
def endurance_threshold(
    jtl_file: str,
    error_rate_limit: float = 0.01,
    p95_limit_ms: float = 3000.0,
    window_seconds: int = 60,
) -> dict:
    """
    Segment a soak test JTL into time windows and find the point where
    either error rate or p95 latency first exceeds the defined limits.

    Returns a dict with:
    - stable_windows: list of windows that passed both limits
    - degraded_windows: list of windows that failed at least one limit
    - first_degradation_sec: seconds into the test when degradation began
    - max_stable_rps: highest per-second throughput in stable windows
    - p95_in_stable: p95 latency across all stable-window requests
    """
    df = pd.read_csv(jtl_file, low_memory=False)
    df["elapsed"] = pd.to_numeric(df["elapsed"], errors="coerce")
    df["timeStamp"] = pd.to_numeric(df["timeStamp"], errors="coerce")
    df["success_bool"] = df["success"].astype(str).str.strip().str.lower() == "true"

    start_ts = df["timeStamp"].min()
    df["seconds_in"] = (df["timeStamp"] - start_ts) / 1000.0
    df["window"] = (df["seconds_in"] // window_seconds).astype(int)

    stable = []
    degraded = []

    for w, grp in df.groupby("window"):
        window_start_sec = int(w * window_seconds)
        n = len(grp)
        err_rate = 1 - grp["success_bool"].mean()
        p95 = grp["elapsed"].quantile(0.95)
        rps = n / window_seconds

        record = {
            "window": w,
            "start_sec": window_start_sec,
            "requests": n,
            "error_rate_pct": round(err_rate * 100, 3),
            "p95_ms": round(p95, 1),
            "rps": round(rps, 2),
        }

        if err_rate <= error_rate_limit and p95 <= p95_limit_ms:
            stable.append(record)
        else:
            record["trigger"] = (
                "error_rate" if err_rate > error_rate_limit else "p95_latency"
            )
            degraded.append(record)

    first_degradation_sec = degraded[0]["start_sec"] if degraded else None
    max_stable_rps = max((w["rps"] for w in stable), default=0.0)

    stable_rows = df[df["window"].isin(w["window"] for w in stable)]
    p95_in_stable = round(stable_rows["elapsed"].quantile(0.95), 1) if not stable_rows.empty else None

    return {
        "stable_windows": stable,
        "degraded_windows": degraded,
        "first_degradation_sec": first_degradation_sec,
        "max_stable_rps": max_stable_rps,
        "p95_in_stable_ms": p95_in_stable,
        "thresholds_used": {
            "error_rate_limit_pct": error_rate_limit * 100,
            "p95_limit_ms": p95_limit_ms,
            "window_seconds": window_seconds,
        },
    }
```

## CLI entry point

```python
# scripts/parse_jtl.py
import argparse
import json
from jtl_parser import summarize_jtl, print_summary, endurance_threshold

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="command")

    s = sub.add_parser("summary")
    s.add_argument("jtl")
    s.add_argument("--json", action="store_true")

    e = sub.add_parser("endurance")
    e.add_argument("jtl")
    e.add_argument("--error-limit", type=float, default=0.01)
    e.add_argument("--p95-limit", type=float, default=3000.0)

    args = parser.parse_args()

    if args.command == "summary":
        result = summarize_jtl(args.jtl)
        if args.json:
            print(json.dumps(result, indent=2))
        else:
            print_summary(result)
    elif args.command == "endurance":
        result = endurance_threshold(args.jtl, args.error_limit, args.p95_limit)
        print(json.dumps(result, indent=2))
```
