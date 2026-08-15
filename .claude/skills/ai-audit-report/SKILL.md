---
name: ai-audit-report
description: Use when logging AI tool usage for an AI Audit Report/declaration — recording tool name, timestamp, prompt, and output for each AI interaction, or when a homework's AI policy requires disclosing how AI was used.
---

# AI Audit Report

## Overview
Turns AI usage into a verifiable, per-interaction log instead of a summary reconstructed after the fact. The log's credibility depends on being written **during** the session it documents — assignments with an AI-audit requirement grade it partly on whether the log is genuine and complete, not just present.

## When to use
- Right after any AI-assisted step in a graded task (design, code, analysis, report writing) — not batched at the end
- User asks for an "AI Audit Report", "AI declaration", "AI usage log", or a task's AI policy requires one

## Core rule
**Log now, not later.** Append the entry immediately after the interaction it documents, using the actual prompt text and actual output — never reconstruct a prompt from memory once the session has moved on. A log written from memory is functionally a fabricated log even if well-intentioned, and is exactly what AI-audit anti-cheat checks are designed to catch.

If no AI was used for the task at all, the declaration is still mandatory: state that explicitly rather than omitting the report.

## Entry structure
Copy `templates/audit-log-entry-template.md` and fill in per interaction:
- **Tool** — name + model (e.g., "Claude Code (claude-sonnet-5)")
- **Date/time** — the real timestamp of the interaction, not the write-up time
- **Prompt** — the actual text sent, verbatim
- **Output** — verbatim, or a traceable reference (see below)

## Verbatim vs. reference for long output
- Short outputs (a few paragraphs, a config snippet): paste verbatim inline.
- Long-form deliverables (a full generated report, a multi-file diff): don't retype or summarize into the log — reference the exact artifact it produced (file path, or commit hash) and state whether it's unedited AI output or note precisely what was changed afterward. Never paraphrase an output into the log; a paraphrase is not an audit trail.

## Session grouping
For a multi-step task, group entries under a session header (tool + date), one entry per prompt/response pair, in chronological order.

## Self-review checklist
- [ ] Every AI-assisted step in the task has a corresponding entry — not just the "interesting" ones
- [ ] Prompts are copied verbatim, not reworded/cleaned up after the fact
- [ ] Timestamps are real interaction times, not the moment the log was written
- [ ] Long outputs point to the actual artifact (file/commit), not a summary passed off as the output
- [ ] If AI was not used at all, the explicit non-use declaration is present

## Common mistakes
- Writing the whole audit log in one pass at the end of the task — timestamps and prompt wording drift from what actually happened.
- Summarizing AI output "for readability" — undetectable to the writer, but defeats the purpose of an audit trail.
- Skipping the declaration entirely when AI wasn't used — silence is treated as an omission, not as "no AI used."
