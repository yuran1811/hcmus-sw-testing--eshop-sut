#!/usr/bin/env python3
"""
log_interaction.py — Append one AI-interaction record to a JSON audit log.

Usage:
  python3 log_interaction.py --log audit_log.json --tool "Claude Sonnet 5" \
      --task "Sinh Page Object cho FR-02" \
      --prompt "text here" --output "text here"

  # or read prompt/output from files (better for long content):
  python3 log_interaction.py --log audit_log.json --tool "ChatGPT" \
      --task "Trích xuất test data ra JSON" \
      --prompt-file prompt.txt --output-file output.txt
"""
import argparse
import json
import os
from datetime import datetime, timezone


def read_arg_or_file(value, file_path):
    if file_path:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    return value or ""


def main():
    ap = argparse.ArgumentParser(description="Append an AI interaction to the audit log.")
    ap.add_argument("--log", required=True, help="Path to the JSON audit log file")
    ap.add_argument("--tool", required=True, help="Name of the AI tool used")
    ap.add_argument("--task", default="", help="Short label of what this interaction was for")
    ap.add_argument("--prompt", default="", help="The prompt text (inline)")
    ap.add_argument("--prompt-file", default="", help="Path to a file containing the prompt")
    ap.add_argument("--output", default="", help="The AI output text (inline)")
    ap.add_argument("--output-file", default="", help="Path to a file containing the AI output")
    ap.add_argument(
        "--timestamp",
        default="",
        help="ISO timestamp override (default: now, local time with offset)",
    )
    args = ap.parse_args()

    prompt = read_arg_or_file(args.prompt, args.prompt_file)
    output = read_arg_or_file(args.output, args.output_file)

    if not prompt or not output:
        raise SystemExit("Error: both prompt and output must be non-empty.")

    timestamp = args.timestamp or datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")

    record = {
        "timestamp": timestamp,
        "tool": args.tool,
        "task": args.task,
        "prompt": prompt,
        "output": output,
    }

    log = []
    if os.path.exists(args.log):
        with open(args.log, "r", encoding="utf-8") as f:
            try:
                log = json.load(f)
            except json.JSONDecodeError:
                log = []

    log.append(record)

    with open(args.log, "w", encoding="utf-8") as f:
        json.dump(log, f, ensure_ascii=False, indent=2)

    print(f"Đã ghi log tương tác #{len(log)} vào {args.log} ({args.tool} — {args.task or 'no task label'})")


if __name__ == "__main__":
    main()
