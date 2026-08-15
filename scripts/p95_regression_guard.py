#!/usr/bin/env python3
"""
p95_regression_guard.py — Automated Performance Regression Detection Tool

Evaluates performance test .jtl log files against Golden SLA Baselines, calculates
percentiles (P50, P90, P95, P99), Error Rate, and Throughput, and determines whether
a Pull Request should pass, receive a soft warning, or be blocked (Gatekeeper CI/CD).

Author: Software Testing Team - FIT @ HCMUS
License: MIT
"""

import argparse
import csv
import json
import math
import os
import re
import sys
from typing import Any, Dict, List, Optional, Tuple

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")



def normalize_label(label: str) -> str:
    """
    Normalizes JMeter sampler labels:
    - Replaces dynamic numeric IDs (e.g. /api/categories/123 -> /api/categories/:id)
    - Strips human-readable parentheses (e.g. 'POST /api/login (Admin Auth)' -> 'POST /api/login')
    """
    # Replace numeric ID path segments
    normalized = re.sub(r"/\d+", "/:id", label)
    # Strip parenthetical annotations
    normalized = re.sub(r"\s*\([^)]*\)", "", normalized).strip()
    return normalized


def parse_jtl_file(jtl_path: str) -> Tuple[List[Dict[str, Any]], Dict[str, List[Dict[str, Any]]]]:
    """
    Parses a JMeter .jtl (CSV) file and groups records overall and per normalized endpoint.
    """
    if not os.path.exists(jtl_path):
        raise FileNotFoundError(f"JTL log file not found: {jtl_path}")

    all_records: List[Dict[str, Any]] = []
    endpoint_records: Dict[str, List[Dict[str, Any]]] = {}

    with open(jtl_path, mode="r", encoding="utf-8", errors="replace") as f:
        reader = csv.DictReader(f)
        if not reader.fieldnames:
            raise ValueError(f"JTL file is empty or corrupted: {jtl_path}")

        # Check required columns
        required = {"timeStamp", "elapsed", "label", "success"}
        if not required.issubset(set(reader.fieldnames)):
            raise ValueError(
                f"Invalid JTL header format. Expected columns containing: {required}. Found: {reader.fieldnames}"
            )

        for row in reader:
            try:
                record = {
                    "timestamp": int(row["timeStamp"]),
                    "elapsed": float(row["elapsed"]),
                    "label": row["label"],
                    "success": str(row["success"]).strip().lower() in ("true", "1"),
                    "response_code": row.get("responseCode", ""),
                    "response_message": row.get("responseMessage", ""),
                }
            except (ValueError, KeyError):
                continue

            all_records.append(record)
            ep = normalize_label(record["label"])
            endpoint_records.setdefault(ep, []).append(record)

    if not all_records:
        raise ValueError(f"No valid sample records found in JTL file: {jtl_path}")

    return all_records, endpoint_records


def calculate_statistics(records: List[Dict[str, Any]]) -> Dict[str, float]:
    """
    Calculates key performance metrics from sample records:
    - Total samples, Error count & rate
    - Elapsed response times: Avg, P50, P90, P95, P99, Max (ms)
    - Throughput (RPS)
    """
    n = len(records)
    if n == 0:
        return {
            "samples": 0,
            "errors": 0,
            "error_rate_pct": 0.0,
            "avg_rt_ms": 0.0,
            "p50_ms": 0.0,
            "p90_ms": 0.0,
            "p95_ms": 0.0,
            "p99_ms": 0.0,
            "max_rt_ms": 0.0,
            "duration_s": 0.0,
            "throughput_rps": 0.0,
        }

    elapsed_list = sorted([r["elapsed"] for r in records])
    errors = sum(1 for r in records if not r["success"])
    error_rate_pct = (errors / n) * 100.0

    avg_rt_ms = sum(elapsed_list) / n
    max_rt_ms = elapsed_list[-1]

    def get_percentile(p: float) -> float:
        index = int(math.ceil(p * n)) - 1
        index = max(0, min(index, n - 1))
        return elapsed_list[index]

    p50_ms = get_percentile(0.50)
    p90_ms = get_percentile(0.90)
    p95_ms = get_percentile(0.95)
    p99_ms = get_percentile(0.99)

    timestamps = [r["timestamp"] for r in records]
    min_ts = min(timestamps)
    # Include execution time of the last finished sample
    max_ts = max(r["timestamp"] + int(r["elapsed"]) for r in records)
    duration_s = (max_ts - min_ts) / 1000.0 if len(timestamps) > 1 and max_ts > min_ts else 1.0
    throughput_rps = n / duration_s if duration_s > 0 else 0.0

    return {
        "samples": n,
        "errors": errors,
        "error_rate_pct": round(error_rate_pct, 2),
        "avg_rt_ms": round(avg_rt_ms, 2),
        "p50_ms": round(p50_ms, 2),
        "p90_ms": round(p90_ms, 2),
        "p95_ms": round(p95_ms, 2),
        "p99_ms": round(p99_ms, 2),
        "max_rt_ms": round(max_rt_ms, 2),
        "duration_s": round(duration_s, 2),
        "throughput_rps": round(throughput_rps, 2),
    }


def evaluate_gate(
    actual_p95: float,
    baseline_p95: float,
    actual_error_rate: float,
    warn_threshold: float,
    fail_threshold: float,
    max_error_rate: float,
) -> Tuple[str, float, str]:
    """
    Evaluates gatekeeping decision status:
    - PASS: Delta P95 <= warn_threshold AND Error Rate <= max_error_rate
    - SOFT WARNING: warn_threshold < Delta P95 <= fail_threshold AND Error Rate <= max_error_rate
    - HARD BLOCK (FAIL): Delta P95 > fail_threshold OR Error Rate > max_error_rate
    """
    if baseline_p95 > 0:
        delta_p95_pct = ((actual_p95 - baseline_p95) / baseline_p95) * 100.0
    else:
        delta_p95_pct = 0.0

    if actual_error_rate > max_error_rate:
        verdict = "FAIL"
        reason = f"Error Rate ({actual_error_rate:.2f}%) exceeds maximum allowable threshold ({max_error_rate:.2f}%)"
    elif delta_p95_pct > fail_threshold:
        verdict = "FAIL"
        reason = f"P95 Latency regression (+{delta_p95_pct:.1f}%) exceeds hard block threshold (+{fail_threshold:.1f}%)"
    elif delta_p95_pct > warn_threshold:
        verdict = "WARN"
        reason = f"P95 Latency regression (+{delta_p95_pct:.1f}%) exceeds warning threshold (+{warn_threshold:.1f}%)"
    else:
        verdict = "PASS"
        reason = "All performance & latency metrics meet Golden SLA requirements"

    return verdict, round(delta_p95_pct, 2), reason


def generate_markdown_report(
    scenario_name: str,
    overall_actual: Dict[str, Any],
    overall_baseline: Dict[str, Any],
    overall_verdict: str,
    overall_delta_p95: float,
    overall_reason: str,
    endpoint_data: List[Dict[str, Any]],
    warn_threshold: float,
    fail_threshold: float,
    max_error_rate: float,
) -> str:
    """
    Generates a GitHub-flavored Markdown performance audit report.
    """
    verdict_badge = {
        "PASS": "🟢 **PASS (ALLOWED TO MERGE)**",
        "WARN": "🟡 **SOFT WARNING (SRE / LEAD REVIEW REQUIRED)**",
        "FAIL": "🔴 **HARD BLOCK (MERGE BLOCKED)**",
    }.get(overall_verdict, overall_verdict)

    delta_p95_str = f"{overall_delta_p95:+.1f}%" if overall_delta_p95 != 0 else "0.0%"
    delta_avg_rt = (
        ((overall_actual["avg_rt_ms"] - overall_baseline["avg_rt_ms"]) / overall_baseline["avg_rt_ms"]) * 100.0
        if overall_baseline.get("avg_rt_ms", 0) > 0
        else 0.0
    )
    delta_avg_str = f"{delta_avg_rt:+.1f}%" if delta_avg_rt != 0 else "0.0%"

    delta_tps = (
        ((overall_actual["throughput_rps"] - overall_baseline["throughput_rps"]) / overall_baseline["throughput_rps"])
        * 100.0
        if overall_baseline.get("throughput_rps", 0) > 0
        else 0.0
    )
    delta_tps_str = f"{delta_tps:+.1f}%" if delta_tps != 0 else "0.0%"

    lines = [
        f"### 🤖 Automated Performance Regression Guard — {scenario_name.upper()} Test",
        "",
        f"**Gatekeeper Verdict:** {verdict_badge}  ",
        f"**Evaluation Summary:** {overall_reason}  ",
        f"**Configured Thresholds:** Soft Warning: `+{warn_threshold:.1f}%` | Hard Block: `+{fail_threshold:.1f}%` | Max Error Rate: `{max_error_rate:.2f}%`",
        "",
        "#### 1. Tổng Quan Chỉ Số Toàn Hệ Thống (System-Wide Comparative Overview)",
        "",
        "| Chỉ số Hiệu năng (Metric) | Kết quả Đo thực tế (PR) | Golden SLA Baseline | Độ lệch (Delta %) | Đánh giá |",
        "| :--- | :---: | :---: | :---: | :---: |",
        f"| **Tổng số Samples** | **{overall_actual['samples']:,}** | {overall_baseline.get('samples', 0):,} | — | ℹ️ Analyzed |",
        f"| **Tỷ lệ Lỗi (Error Rate)** | **{overall_actual['error_rate_pct']:.2f}%** ({overall_actual['errors']} errors) | {overall_baseline.get('error_rate_pct', 0.0):.2f}% | `0.0%` | {'🟢 Clean' if overall_actual['error_rate_pct'] <= max_error_rate else '🔴 Critical'} |",
        f"| **Throughput (Thông lượng)** | **{overall_actual['throughput_rps']:.2f} req/s** | {overall_baseline.get('throughput_rps', 0.0):.2f} req/s | `{delta_tps_str}` | {'🟢 Normal' if delta_tps >= -10.0 else '🟡 Degraded'} |",
        f"| **Average RT (Độ trễ TB)** | **{overall_actual['avg_rt_ms']:.2f} ms** | {overall_baseline.get('avg_rt_ms', 0.0):.2f} ms | `{delta_avg_str}` | {'🟢 Optimal' if delta_avg_rt <= warn_threshold else '🟡 Elevated'} |",
        f"| **Median (P50)** | **{overall_actual['p50_ms']:.2f} ms** | {overall_baseline.get('p50_ms', 0.0):.2f} ms | — | 🟢 Fast |",
        f"| **90th Percentile (P90)** | **{overall_actual['p90_ms']:.2f} ms** | {overall_baseline.get('p90_ms', 0.0):.2f} ms | — | 🟢 Normal |",
        f"| **95th Percentile (P95)** | **{overall_actual['p95_ms']:.2f} ms** | **{overall_baseline.get('p95_ms', 0.0):.2f} ms** | **`{delta_p95_str}`** | {'🟢 PASS' if overall_verdict == 'PASS' else ('🟡 WARN' if overall_verdict == 'WARN' else '🔴 HARD BLOCK')} |",
        f"| **99th Percentile (P99)** | **{overall_actual['p99_ms']:.2f} ms** | {overall_baseline.get('p99_ms', 0.0):.2f} ms | — | ℹ️ Tail Latency |",
        f"| **Max Response Time** | **{overall_actual['max_rt_ms']:.2f} ms** | {overall_baseline.get('max_rt_ms', 0.0):.2f} ms | — | ℹ️ Peak |",
        "",
        "---",
        "",
        "#### 2. Chi Tiết Từng Endpoint (Endpoint SLA Breakdown)",
        "",
        "| Endpoint / Sampler | Samples | Avg RT | P95 Actual | P95 Baseline | Δ P95 (%) | Error Rate | Trạng thái |",
        "| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |",
    ]

    for ep in endpoint_data:
        status_icon = "🟢 PASS" if ep["verdict"] == "PASS" else ("🟡 WARN" if ep["verdict"] == "WARN" else "🔴 BLOCK")
        delta_str = f"{ep['delta_p95']:+.1f}%" if ep["delta_p95"] != 0 else "0.0%"
        lines.append(
            f"| `{ep['endpoint']}` | {ep['actual']['samples']:,} | {ep['actual']['avg_rt_ms']:.2f} ms | "
            f"**{ep['actual']['p95_ms']:.2f} ms** | {ep['baseline'].get('p95_ms', 0.0):.2f} ms | "
            f"`{delta_str}` | {ep['actual']['error_rate_pct']:.2f}% | {status_icon} |"
        )

    lines.append("")
    if overall_verdict == "FAIL":
        lines.extend(
            [
                "---",
                "",
                "### 🚨 Khuyến Nghị Khắc Phục (Root-Cause & Action Items):",
                "1. **Điều tra hồi quy độ trễ:** Kiểm tra các hàm truy vấn DB mới, Index bảng SQLite (`EXPLAIN QUERY PLAN`), hoặc các tác vụ đồng bộ chặn Event Loop.",
                "2. **Tối ưu hóa ghi cơ sở dữ liệu:** Với các API Write-heavy, đảm bảo transaction được gom nhóm và bật chế độ SQLite `WAL (Write-Ahead Logging)`.",
                "3. **CI Status:** Pull Request đang bị chặn merge tự động. Vui lòng tối ưu hóa code và push commit mới để kích hoạt lại Performance Pipeline.",
            ]
        )
    elif overall_verdict == "WARN":
        lines.extend(
            [
                "---",
                "",
                "### ⚠️ Cảnh Báo Hiệu Năng (Performance Warning):",
                "- Độ trễ P95 ghi nhận mức tăng trưởng từ 10% đến 20% so với Baseline.",
                "- Cần sự xem xét và phê duyệt (Manual Override) từ Tech Lead hoặc SRE trước khi merge vào nhánh chính.",
            ]
        )

    lines.append("")
    return "\n".join(lines)


def print_cli_summary(report_md: str, verdict: str) -> None:
    """
    Prints a formatted summary to stdout with terminal colors if available.
    """
    print("\n" + "=" * 80)
    print(report_md)
    print("=" * 80 + "\n")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="p95_regression_guard: Automated Performance Regression Detection Tool"
    )
    parser.add_argument("--jtl", required=True, help="Path to input JMeter .jtl result file")
    parser.add_argument("--baseline", required=True, help="Path to performance_baseline.json file")
    parser.add_argument(
        "--scenario",
        default="load",
        choices=["load", "stress", "spike", "endurance"],
        help="Target scenario in baseline (default: load)",
    )
    parser.add_argument(
        "--output-markdown",
        default="",
        help="Optional path to save generated Markdown report file",
    )
    parser.add_argument(
        "--threshold-warn",
        type=float,
        default=None,
        help="Override Soft Warning threshold in percent (default from baseline: 10.0)",
    )
    parser.add_argument(
        "--threshold-fail",
        type=float,
        default=None,
        help="Override Hard Block threshold in percent (default from baseline: 20.0)",
    )
    parser.add_argument(
        "--max-error-rate",
        type=float,
        default=None,
        help="Override Maximum Error Rate threshold in percent (default from baseline: 0.10)",
    )

    args = parser.parse_args()

    # Load Baseline JSON
    if not os.path.exists(args.baseline):
        print(f"❌ Error: Baseline JSON file not found at '{args.baseline}'", file=sys.stderr)
        return 1

    with open(args.baseline, "r", encoding="utf-8") as f:
        try:
            baseline_data = json.load(f)
        except Exception as e:
            print(f"❌ Error parsing baseline JSON: {e}", file=sys.stderr)
            return 1

    scenarios = baseline_data.get("scenarios", {})
    if args.scenario not in scenarios:
        print(
            f"❌ Error: Scenario '{args.scenario}' not found in baseline. Available: {list(scenarios.keys())}",
            file=sys.stderr,
        )
        return 1

    scenario_cfg = scenarios[args.scenario]
    overall_baseline = scenario_cfg.get("overall", {})
    endpoints_baseline = scenario_cfg.get("endpoints", {})
    gate_thresholds = baseline_data.get("gate_thresholds", {})

    warn_threshold = (
        args.threshold_warn
        if args.threshold_warn is not None
        else gate_thresholds.get("soft_warning_p95_delta_pct", 10.0)
    )
    fail_threshold = (
        args.threshold_fail
        if args.threshold_fail is not None
        else gate_thresholds.get("hard_block_p95_delta_pct", 20.0)
    )
    max_error_rate = (
        args.max_error_rate
        if args.max_error_rate is not None
        else gate_thresholds.get("max_allowed_error_rate_pct", 0.10)
    )

    # Parse JTL
    try:
        all_records, endpoint_records = parse_jtl_file(args.jtl)
    except Exception as e:
        print(f"❌ Error reading JTL file '{args.jtl}': {e}", file=sys.stderr)
        return 1

    # Calculate statistics
    overall_actual = calculate_statistics(all_records)

    # Evaluate Overall Gate
    overall_verdict, overall_delta_p95, overall_reason = evaluate_gate(
        actual_p95=overall_actual["p95_ms"],
        baseline_p95=overall_baseline.get("p95_ms", overall_actual["p95_ms"]),
        actual_error_rate=overall_actual["error_rate_pct"],
        warn_threshold=warn_threshold,
        fail_threshold=fail_threshold,
        max_error_rate=max_error_rate,
    )

    # Evaluate Endpoints
    endpoint_data = []
    # Combine endpoints from actual and baseline
    all_endpoint_keys = sorted(list(set(list(endpoint_records.keys()) + list(endpoints_baseline.keys()))))

    has_endpoint_fail = False
    for ep in all_endpoint_keys:
        records = endpoint_records.get(ep, [])
        ep_actual = calculate_statistics(records)
        ep_base = endpoints_baseline.get(ep, {})

        ep_verdict, ep_delta_p95, _ = evaluate_gate(
            actual_p95=ep_actual["p95_ms"],
            baseline_p95=ep_base.get("p95_ms", ep_actual["p95_ms"]),
            actual_error_rate=ep_actual["error_rate_pct"],
            warn_threshold=warn_threshold,
            fail_threshold=fail_threshold,
            max_error_rate=max_error_rate,
        )

        if ep_verdict == "FAIL":
            has_endpoint_fail = True

        endpoint_data.append(
            {
                "endpoint": ep,
                "actual": ep_actual,
                "baseline": ep_base,
                "verdict": ep_verdict,
                "delta_p95": ep_delta_p95,
            }
        )

    # If any single endpoint critically fails, upgrade overall verdict to FAIL
    final_verdict = overall_verdict
    if has_endpoint_fail and final_verdict != "FAIL":
        final_verdict = "FAIL"
        overall_reason = "One or more critical endpoints violated hard SLA / regression thresholds"

    # Generate Markdown report
    markdown_report = generate_markdown_report(
        scenario_name=args.scenario,
        overall_actual=overall_actual,
        overall_baseline=overall_baseline,
        overall_verdict=final_verdict,
        overall_delta_p95=overall_delta_p95,
        overall_reason=overall_reason,
        endpoint_data=endpoint_data,
        warn_threshold=warn_threshold,
        fail_threshold=fail_threshold,
        max_error_rate=max_error_rate,
    )

    # Print to stdout
    print_cli_summary(markdown_report, final_verdict)

    # Write to file if requested
    if args.output_markdown:
        out_dir = os.path.dirname(args.output_markdown)
        if out_dir and not os.path.exists(out_dir):
            os.makedirs(out_dir, exist_ok=True)
        with open(args.output_markdown, "w", encoding="utf-8") as f:
            f.write(markdown_report)
        print(f"📄 Report written to: {args.output_markdown}")

    # Return exit code: 0 for PASS / WARN, 1 for FAIL (CI Gate Block)
    if final_verdict == "FAIL":
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
