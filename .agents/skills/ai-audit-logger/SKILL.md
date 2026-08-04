---
name: ai-audit-logger
description: Records every AI-tool interaction (tool name, date/time, prompt, output) into a structured JSON log as it happens, then renders that log into the Markdown/PDF-ready "AI Audit Report" appendix required by AI-first assignments (e.g. HW04 Automation Testing's mandatory AI Audit Report and "I use AI tools for the following tasks" declaration). Use this skill any time the user is working through an AI-assisted assignment and needs to declare AI usage, log prompts and outputs for audit purposes, generate an AI Audit Report appendix, or produce a "not used AI" declaration. Trigger on phrases like "audit log", "AI audit report", "ghi log prompt AI", "khai báo dùng AI", "log lại prompt", or whenever the user finishes a step that used an AI tool and needs it recorded — proactively suggest logging it, don't wait to be asked at the end.
---

# AI Audit Logger

Turns the tedious, easy-to-forget "record every AI interaction" requirement into a
one-line command per interaction, plus a one-command report generator at the end. Built
for assignments (like HW04 Automation Testing) that mandate an **AI Audit Report**
appendix listing, for every AI interaction: tool name, date/time, prompt, and output.

## When to use this skill

- Immediately after any exchange with an AI tool (Claude, ChatGPT, Copilot, Cursor,
  Gemini...) that produced something going into the deliverable — log it right away,
  don't reconstruct the log from memory at submission time.
- When the user asks to "generate the AI Audit Report" or "AI Critique appendix."
- When the user says they didn't use AI at all — still produce the required declaration
  sentence (see Step 3).

## Workflow

### Step 1 — Log each interaction as it happens

Append one entry per AI interaction to a local JSON log using
`scripts/log_interaction.py`:

```bash
python3 scripts/log_interaction.py \
  --log audit_log.json \
  --tool "Claude Sonnet 5" \
  --task "Sinh Page Object cho FR-02 Đăng nhập" \
  --prompt "$(cat prompt_stage1.txt)" \
  --output "$(cat ai_output_stage1.txt)"
```

Or pass `--prompt-file` / `--output-file` instead of inline text for long content. Each
call appends a new record with an auto-filled ISO timestamp — never overwrites previous
entries. Run this right after each AI stage in the `playwright-ai-automation` skill's
Step 2 (AI-driven script generation) so nothing gets lost.

If the user pastes a prompt/output pair directly in conversation and asks you to "log
this," call the script yourself with that content rather than asking them to re-type it
into a file.

### Step 2 — Generate the Markdown AI Audit Report

Once logging is done (or at submission time), render the full report:

```bash
python3 scripts/render_audit_report.py --log audit_log.json --out AI_Audit_Report.md
```

This produces a Markdown file following the exact structure the assignment expects (see
`assets/audit_report_template.md` for the raw template if you want to adapt it manually):
a declaration sentence, then one entry per interaction with Tool / Date & time / Prompt /
Output, grouped by task/feature if the `--task` field was used consistently.

Convert to PDF the same way as the rest of the report (e.g. via the docx/pdf skill, or
`pandoc AI_Audit_Report.md -o AI_Audit_Report.pdf` if available).

### Step 3 — Declaration wording (must match the assignment's exact phrasing)

- **If AI was used:** the report must open with:
  > "I use AI tools for the following tasks,"

  `render_audit_report.py` inserts this automatically when the log has ≥1 entry.

- **If AI was NOT used at all:** the declaration must be exactly:
  > "I do not use any AI help in this exercise."

  Run `python3 scripts/render_audit_report.py --log audit_log.json --none-used --out AI_Audit_Report.md`
  (or just write that single sentence — no need for the script if the log is empty).

### Step 4 — Feed the AI Critique paragraph, not just the raw log

The raw audit log is input, not the deliverable — the assignment also wants a 200–300
word **AI Critique** paragraph analyzing where the AI got things wrong. Don't try to
generate that critique mechanically from the log; instead use the log as evidence while
following `review-and-critique.md` from the `playwright-ai-automation` skill to write it
with real analytical judgment (what was wrong, why the AI missed it, what principle was
learned).

## Data format (`audit_log.json`)

```json
[
  {
    "timestamp": "2026-08-04T09:15:32+07:00",
    "tool": "Claude Sonnet 5",
    "task": "Sinh Page Object cho FR-02 Đăng nhập",
    "prompt": "Đây là HTML của trang đăng nhập EShop...",
    "output": "export class LoginPage { ... }"
  }
]
```

Keep this file under version control alongside the test scripts (but it does NOT count
toward the 8-commit `.spec.js`/`.spec.ts` minimum — only test-script-file commits count
per the assignment's Git Commit Log rule).
