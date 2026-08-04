#!/usr/bin/env python3
"""
render_audit_report.py — Render audit_log.json into the Markdown "AI Audit Report"
appendix required by AI-first assignments.

Usage:
  python3 render_audit_report.py --log audit_log.json --out AI_Audit_Report.md
  python3 render_audit_report.py --log audit_log.json --none-used --out AI_Audit_Report.md
"""
import argparse
import json
from collections import OrderedDict


def group_by_task(records):
    groups = OrderedDict()
    for r in records:
        key = r.get("task") or "(chưa gắn nhãn nhiệm vụ)"
        groups.setdefault(key, []).append(r)
    return groups


def render(records):
    lines = []
    lines.append("# AI Audit Report\n")

    if not records:
        lines.append('"I do not use any AI help in this exercise."\n')
        return "\n".join(lines)

    lines.append('"I use AI tools for the following tasks,"\n')

    groups = group_by_task(records)
    entry_num = 0
    for task, entries in groups.items():
        lines.append(f"## {task}\n")
        for e in entries:
            entry_num += 1
            lines.append(f"### Interaction {entry_num}")
            lines.append(f"- **Name of the AI tool:** {e.get('tool', '')}")
            lines.append(f"- **Date and time:** {e.get('timestamp', '')}")
            lines.append("- **Prompt:**")
            lines.append("```")
            lines.append(e.get("prompt", "").strip())
            lines.append("```")
            lines.append("- **AI output:**")
            lines.append("```")
            lines.append(e.get("output", "").strip())
            lines.append("```")
            lines.append("")

    lines.append(f"\n_Tổng số tương tác AI được ghi log: {len(records)}._")
    return "\n".join(lines)


def main():
    ap = argparse.ArgumentParser(description="Render audit_log.json into an AI Audit Report (Markdown).")
    ap.add_argument("--log", required=True, help="Path to the JSON audit log file")
    ap.add_argument("--out", required=True, help="Output Markdown file path")
    ap.add_argument(
        "--none-used",
        action="store_true",
        help="Force the 'no AI used' declaration regardless of log content",
    )
    args = ap.parse_args()

    records = []
    if not args.none_used:
        try:
            with open(args.log, "r", encoding="utf-8") as f:
                records = json.load(f)
        except FileNotFoundError:
            records = []

    if args.none_used:
        records = []

    content = render(records)

    with open(args.out, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Đã tạo báo cáo: {args.out} ({len(records)} tương tác)")


if __name__ == "__main__":
    main()
