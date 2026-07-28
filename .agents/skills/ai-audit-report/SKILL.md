---
name: ai-audit-report
description: Maintain a running AI Audit Report (tool name, timestamp, exact prompt, AI output, for every AI interaction across the whole homework) and help draft the 200-300 word AI Critique reflecting on where the AI was wrong, biased, or missed something and why. Use this continuously throughout HW03-style work — every time an AI prompt is used for the checklist, usability design, session synthesis, or bug reports, log it here immediately rather than reconstructing the log at the end. Also use this when the user is ready to write the final AI Critique paragraph.
---

# AI Audit Report + AI Critique

## Why this matters

Missing or reconstructed-after-the-fact audit logs are easy for a TA to spot (timestamps that don't match commit history, prompts that don't match what the checklist/report actually shows). Log in real time.

## Live logging format (append one entry per AI interaction, immediately after it happens)

```
### Entry N
- Tool: <ChatGPT / Claude / Gemini / Copilot / Cursor / ...>
- Date/time: <YYYY-MM-DD HH:MM>
- Task context: <e.g., "Task 1 Step 2 - IA-02 Forms pass">
- Prompt used (verbatim):
  > <exact text sent>
- AI output (verbatim or faithful summary if very long — note if truncated):
  > <output>
- What the student changed/kept from this output: <one line>
```

If the student does an interaction without this skill in the loop (e.g., a quick one-off question in another tab), still log it manually using the same format — completeness matters more than which tool logged it.

If **no AI was used at all** for the whole assignment, the required declaration is exactly:

> "I do not use any AI help in this exercise."

If AI **was** used, the required declaration is:

> "I use AI tools for the following tasks," followed by the full entry list above.

## Aggregating at the end

Before submission, walk the whole project's interaction history (chat log, or per-skill outputs generated during the homework) and make sure every distinct AI-assisted step appears as its own entry — checklist generation (per IA pass), task scenario drafting, instrument drafting, synthesis/severity ranking, bug report drafting. Cross-check entry count roughly matches the number of distinct AI-touched steps in the Git commit log (see `hw-submission-packager` skill) — a mismatch (e.g., 40 checklist items but only 1 logged prompt) is a red flag graders look for.

## Drafting the AI Critique (200-300 words)

This must be the student's own analytical voice, not the AI restating itself. Use the audit log as raw material and answer, concretely, with specific examples from _this_ assignment (not generic AI-critique boilerplate):

1. **Where was the AI wrong/biased/incomplete?** Pull a real example from the log — e.g., a checklist pass that missed accessibility items, a task scenario draft that leaked step-by-step instructions despite being asked for goal-oriented phrasing, a SUS-formula miscalculation caught during verification, an overly generic severity rating the student overrode.
2. **Why didn't the AI catch it?** Reason about the actual cause: no visual/runtime access to the real SUT (can't see actual contrast ratios or actual error states), prompt scope was too narrow (only asked about forms, not accessibility), training bias toward common web patterns not reflecting this specific Vietnamese e-commerce context, no memory of earlier constraints (the goal-oriented scenario instruction was in the model's context but it still defaulted to a habitual instructional-writing pattern).
3. **What principle for AI collaboration follows from this?** e.g., "always verify computed scores by hand for at least a sample," "never accept a first-draft task scenario without an explicit anti-step-by-step check," "treat AI checklist output as a first draft that needs a targeted, named gap-analysis pass, not a final list."

Draft prompt seed (for structuring only — the content/examples must come from the student's real log):

> "Help me organize (not invent) a 200-300 word critique paragraph using these specific examples from my AI audit log: [paste 2-3 concrete entries where the AI was wrong/incomplete]. Structure it as: what went wrong, why, and what principle I'm taking forward. Keep my own analytical points, just tighten the prose."

## Output artifacts

- `ai_audit_report.md` — full chronological log, ready to also export to PDF.
- `ai_critique.md` — final 200-300 word paragraph.
