---
name: ai-audit-report
description: Maintain a running AI Audit Report (tool name, timestamp, exact prompt, AI output, for every AI interaction across the whole homework) and help draft the 200-300 word AI Critique reflecting on where the AI was wrong, biased, or missed something and why. Use this continuously throughout HW03-style work — every time an AI prompt is used for the checklist, usability design, session synthesis, or bug reports, log it here immediately rather than reconstructing the log at the end. Also use this when the user is ready to write the final AI Critique paragraph.
---

# AI Audit Report + AI Critique

## Why this matters

Missing or reconstructed-after-the-fact audit logs are easy for a TA to spot (timestamps that don't match commit history, prompts that don't match what the checklist/report actually shows). Log in real time.

## CRITICAL: Never fabricate entries

**One real user prompt = one entry. No more, no less.**

A known failure mode: the agent receives **one** prompt (e.g., "design checklist for home screen") but writes **multiple fake entries** (e.g., "Entry 1: IA-01 pass", "Entry 2: IA-02 pass"…) as if the user had sent those prompts separately. **This is dishonest and easily detected by graders.**

Rules:

- The "Prompt used (verbatim)" field must be the **exact text the student typed**, not a paraphrase or a decomposed sub-task the AI invented internally.
- If the AI internally does IA-01 through IA-04 passes within a single model response, **that is still 1 entry** — the output summary may describe all 4 passes, but the prompt is the one message the student actually sent.
- If the AI made an error (e.g., generated fabricated entries), log that as a separate entry when the correction prompt was sent, and note what was wrong in the output of the original entry.

## Live logging format (append one entry per AI interaction, immediately after it happens)

```text
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

Before submission, walk the whole project's interaction history (chat log, or per-skill outputs generated during the homework) and make sure every distinct **user-sent** prompt appears as its own entry. Cross-check that entry count matches the number of distinct user messages in the chat history that involved AI assistance — not the number of AI-generated outputs.

A mismatch in the other direction is also a red flag: if you have 40 checklist items but logged 5 separate "per-IA-pass" entries when the student only sent 1 prompt, graders will notice the timestamps and prompt texts don't align with the git commit log.

## Drafting the AI Critique (200-300 words)

This must be the student's own analytical voice, not the AI restating itself. Use the audit log as raw material and answer, concretely, with specific examples from _this_ assignment (not generic AI-critique boilerplate):

1. **Where was the AI wrong/biased/incomplete?** Pull a real example from the log — e.g., a checklist pass that missed accessibility items, a task scenario draft that leaked step-by-step instructions despite being asked for goal-oriented phrasing, a SUS-formula miscalculation caught during verification, an overly generic severity rating the student overrode.
2. **Why didn't the AI catch it?** Reason about the actual cause: no visual/runtime access to the real SUT (can't see actual contrast ratios or actual error states), prompt scope was too narrow (only asked about forms, not accessibility), training bias toward common web patterns not reflecting this specific Vietnamese e-commerce context, no memory of earlier constraints (the goal-oriented scenario instruction was in the model's context but it still defaulted to a habitual instructional-writing pattern).
3. **What principle for AI collaboration follows from this?** e.g., "always verify computed scores by hand for at least a sample," "never accept a first-draft task scenario without an explicit anti-step-by-step check," "treat AI checklist output as a first draft that needs a targeted, named gap-analysis pass, not a final list."

Draft prompt seed (for structuring only — the content/examples must come from the student's real log):

> "Help me organize (not invent) a 200-300 word critique paragraph using these specific examples from my AI audit log: [paste 2-3 concrete entries where the AI was wrong/incomplete]. Structure it as: what went wrong, why, and what principle I'm taking forward. Keep my own analytical points, just tighten the prose."

## Output artifacts

- `AI_Audit_Report.md` (or `ai_audit_report.md`) — full chronological log of user interactions with required declaration. **Note:** Do NOT automatically append the AI Critique section into `AI_Audit_Report.md`; keep `AI_Audit_Report.md` strictly as the audit log.
- `ai_critique.md` (or Section 10 in `Main_Report.md`) — separate final 200-300 word paragraph analyzing AI gaps, causes, and collaboration principles.
