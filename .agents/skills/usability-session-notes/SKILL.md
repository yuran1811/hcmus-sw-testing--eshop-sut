---
name: usability-session-notes
description: Structure raw usability-session observations (think-aloud quotes, hesitation points, errors, emotional reactions) into a consistent note template during/after each of the 7 sessions, then synthesize all 7 sessions' notes plus SUS/UEQ-S scores into grouped findings with severity ratings (blocker vs minor). Use this for HW03-style Task 2 Phase 2/3 work — anytime the user has session notes, recordings, or SUS/UEQ-S raw scores from real participants and needs them turned into a synthesis report with severity-ranked findings. This skill never invents participant behavior or scores — it only structures and analyzes what the student observed.
---

# Usability Session Notes & Synthesis (guided, per-session then cross-session)

## Why this skill exists

Seven sessions of loose notes are hard to compare and easy to under-analyze. This skill enforces (a) a consistent per-session note structure captured _during_ moderation, and (b) a disciplined cross-session synthesis afterward that separates one-off quirks from systemic design problems and ranks them by severity — rather than asking the AI to "find the usability issues" from raw transcripts in one shot.

## Part A — Per-session note template (fill in live or right after each session)

For each of the 7 sessions, capture:

```text
Session ID: P0X
Date/time:
Task scenario given: [paste exact scenario text used]
Timeline of notable moments:
  - [mm:ss] Observation: <what happened>  | Type: [hesitation/error/emotional reaction/success]
  - ...
Moments participant got fully stuck (required moderator intervention):
Think-aloud quotes (verbatim, timestamped):
Completion: [completed / completed with help / abandoned]
Time on task:
SUS or UEQ-S raw responses (item-by-item):
Open-question answers (clarity / error-recovery / speed / trust):
```

Do not let AI fabricate or "fill in" any of this from assumptions — it is transcribed by the student from the actual session (recording or live notes). AI's role here is limited to: turning rough shorthand into the structured template above, calculating the SUS/UEQ-S score for that one session from the raw item responses, and flagging any missing fields.

## Part B — Cross-session synthesis (run once all 7 sessions are structured)

### Step 1 — Score aggregation

Prompt seed:

> "Here are the raw SUS/UEQ-S item responses for 7 participants: [paste table]. Compute each participant's score using the standard [SUS/UEQ-S] formula, then the mean, median, and range across all 7. Show the per-item breakdown too, not just the total, so I can see which items drove low scores."

Student verifies the arithmetic independently (SUS formula errors from LLMs are common — spot-check at least 2 participants by hand).

### Step 2 — Cluster similar observations across sessions

Prompt seed, run once per session-note batch of ~2-3 sessions to keep it grounded rather than one mega-prompt over all 7 at once:

> "From these 3 session note sets [paste P01-P03 structured notes], list every distinct usability problem observed, quoting the specific moment/timestamp it came from. Do not merge problems across sessions yet — just extract them per-session first."

Then a second pass across all extracted problems:

> "Here is the full list of extracted problems from all 7 sessions [paste]. Group ones that describe the same underlying issue, even if worded differently by different participants. For each group, list which session IDs it appeared in and how many of the 7 participants hit it."

### Step 3 — Separate single-user quirks from systemic issues

For each grouped finding, the student (not the AI alone) decides: is this a one-off (only 1/7 participants, plausibly idiosyncratic) or systemic (2+ participants, or 1 participant but clearly rooted in a real design flaw like a missing error message)? Document the reasoning in one sentence per finding.

### Step 4 — Severity ranking

Use a simple two-tier (or four-tier if the course prefers) scheme:

- **Blocker**: prevents task completion or causes data loss / wrong order / wrong charge.
- **Major**: causes significant confusion/delay but user recovers.
- **Minor**: cosmetic or small friction, doesn't affect task success.

Prompt seed:

> "For this list of grouped findings [paste], propose a severity (Blocker/Major/Minor) for each based on: did it block task completion for any participant, how many participants hit it, and whether a workaround was available. Justify each rating in one sentence."

Student adjusts ratings they disagree with — the rubric expects a defensible human severity call, not an AI's default answer.

### Step 5 — Report generation

Produce a findings table: `ID | Finding | Sessions affected (n/7) | Severity | Example quote | Root cause hypothesis`. Give each finding a stable ID (`F01`, `F02`, ...) that never gets reused or renumbered — this is what the eventual bug file's "Found by Test Case" field points back to, and what the checklist/finding cross-reference relies on. Feed Blocker/Major items into the `bug-report-github` skill (Phase 1: draft the bug file with evidence first — only file a GitHub Issue when explicitly asked).

Note: severity here is about impact on task success (Blocker/Major/Minor). When these findings become bug files, they'll also need an independent **Priority** rating (P0-P3, how urgently it should be fixed) — don't assume severity and priority are the same thing; that split happens in the `bug-report-github` skill.

## Output artifacts

- `sessions/P01.md` ... `P07.md` — structured per-session notes.
- `scores_summary.md` — SUS/UEQ-S computation and aggregate stats.
- `findings_synthesis.md` — grouped, severity-ranked findings table with rationale.

## Guardrails

- Never let the AI generate a "typical" participant reaction to fill a gap in real notes — leave it blank and flag it instead.
- Always keep the per-session raw notes alongside the synthesis so a TA or oral-defense caller can trace any finding back to a real session.
