# AI Audit Report - HW03-AI GUI and Usability (SAMPLE)

> Replace all sample rows before submission. This file shows shape only.

## 1. Student Information

| Field | Value |
| --- | --- |
| **Student name (printed)** | [Full name] |
| **Student ID** | [MSSV] |
| **Class / Cohort** | 23CLC0X |
| **Assignment ID** | HW03-AI |
| **Assignment date** | 2026-07-27 |
| **AI tool(s) used** | Cursor (Claude), ChatGPT |
| **AI used?** | Yes |

## 2. Instructions

Each row is one AI-generated artifact. Prompts and outputs are verbatim or linked. Verdicts: VALID / INVALID / INCOMPLETE. Reasoning cites ISTQB or course lectures.

## 3. Audit Table - one row per artifact

| (1) Prompt + Tool | (2) AI Output | (3) Verdict | (4) Reasoning (ISTQB / course) | (5) Student Fix |
| --- | --- | --- | --- | --- |
| **Tool:** Cursor (Claude) **Time:** 10:15 27/07/2026 **Prompt:** "Generate a GUI checklist >40 items for EShop Cart covering IA-01..IA-04" | Draft checklist 42 items, mostly visual alignment and form labels | INCOMPLETE | ISTQB FL reviews/static techniques + HW03 Task 1 require coverage of a11y and state feedback; AI draft missed them | Added 9 items (contrast, focus ring, empty cart, coupon error, RTL note); removed 2 duplicate padding items |
| **Tool:** Cursor (Claude) **Time:** 14:40 27/07/2026 **Prompt:** "Write a moderated usability task scenario for checkout with coupon" | Scenario with step-by-step UI instructions | INCOMPLETE | Usability lecture: scenario must be goal-oriented, not a script; leading steps bias participants | Rewrote as goal-only scenario; added pilot notes; kept probes for clarity/error/speed/trust |

### Artifact #1 - GUI checklist draft (Cart)

| Field | Value |
| --- | --- |
| **AI Tool** | Cursor (Claude) |
| **Date/Time** | 2026-07-27 10:15:00 +07:00 |
| **Task** | Generate initial GUI checklist for Cart screen |
| **Feature / Module** | Task 1 / Cart / IA-01 to IA-04 |
| **Bloom-AI Level** | G9.3 (Analyse) - student gap analysis after generation |
| **Verdict** | INCOMPLETE |

#### (1) Prompt (verbatim)

```text
Generate a GUI checklist of more than 40 items for the EShop Cart screen.
Cover IA-01 general UI, IA-02 forms, IA-03 navigation, IA-04 feedback/state.
Output a Markdown table: ID, IA, Check item, How to evaluate.
```

#### (2) AI Output

```text
Created Cart_GUI_Checklist.md with 42 rows. Strong on layout/labels; weak on
accessibility, loading/empty states, and Vietnamese error copy.
Full draft: Cart_GUI_Checklist.md (pre-human-edit commit).
```

#### (3)-(5) Review

| Aspect | Detail |
| --- | --- |
| **Verdict** | INCOMPLETE |
| **Reasoning** | HW03 Task 1 and GUI checklist lecture require non-repetitive coverage including states AI often skips; ISTQB emphasises reviews finding defects early - human review must extend AI draft. |
| **Student Fix** | +9 items (a11y contrast/focus, empty cart, disabled checkout, coupon fail message, keyboard tab order); -2 duplicates; execution Pass/Fail filled by student on SUT |
| **Quality rating** | Good |
| **Issues found** | Missed a11y; duplicate spacing items; no dark-mode row |

### Artifact #2 - Usability task scenario

| Field | Value |
| --- | --- |
| **AI Tool** | Cursor (Claude) |
| **Date/Time** | 2026-07-27 14:40:00 +07:00 |
| **Task** | Draft moderated usability scenario + probes |
| **Feature / Module** | Task 2 / Checkout + coupon flow |
| **Bloom-AI Level** | G9.4 (Collaborate) |
| **Verdict** | INCOMPLETE |

#### (1) Prompt (verbatim)

```text
Write one end-to-end usability task scenario for EShop: find a product under
500,000 VND and checkout using a discount coupon. Include SUS plan and 4 probes.
```

#### (2) AI Output

```text
Produced scenario with numbered UI steps ("click Cart, then Checkout") and
generic SUS mention without scoring sheet.
```

#### (3)-(5) Review

| Aspect | Detail |
| --- | --- |
| **Verdict** | INCOMPLETE |
| **Reasoning** | Course usability method: give a goal, not instructions; leading steps contaminate observation (moderator bias). |
| **Student Fix** | Goal-only scenario; pilot with 1 person; SUS scoring sheet prepared by student; probes kept |
| **Quality rating** | Acceptable |
| **Issues found** | Scripted steps; no pilot timing |

## 4. Summary of AI Accuracy

| Metric | Count | Percentage |
| --- | ---: | ---: |
| **Total AI-generated artifacts audited** | 2 | 100% |
| **VALID (correct, accepted as-is)** | 0 | 0% |
| **INVALID (wrong; rejected)** | 0 | 0% |
| **INCOMPLETE (acceptable after edits)** | 2 | 100% |

## 5. Conclusion - When should AI be used (or not)?

AI is effective for first-pass GUI checklist volume and drafting usability instruments, but it systematically under-covers accessibility, empty/error states, and writes scenarios that over-direct participants. Use AI to brainstorm, then force a gap pass against IA-01 to IA-04 and the live SUT. Do not use AI to invent participants, session outcomes, or cross-browser screenshots. For HW-style GUI work, AI is a draft engine; execution evidence and severity calls stay human.

## 6. Mandatory Disclosure

"GUI checklist and usability scenario drafts were initially generated by Cursor (Claude); I reviewed and modified checklist coverage (added accessibility and state items), rewrote the task scenario to be goal-only, and executed Pass/Fail on the live SUT myself. Participant recruitment, session notes, SUS scores, and cross-platform screenshots were produced entirely by me without AI fabrication. The detailed AI Audit Report is attached as Appendix A. I confirm I did not use AI to generate any artifact listed in the prohibited category."

## 7. Signature

| Field | Value |
| --- | --- |
| Student name | [Full name] |
| Student ID | [MSSV] |
| Class / Cohort | 23CLC0X |
| Course | CS423 / CSC13003 - Software Testing |
| Instructor | [Lecturer] |
| Date | 2026-07-27 |
| Signature | [Full name] |

## Compliance Checklist

- [x] AI usage declaration
- [x] Tool name(s)
- [x] Date and time per interaction
- [x] Verbatim prompt per artifact
- [x] AI output (full or linked)
- [x] Verdict + course/ISTQB reasoning
- [x] Student fix
- [x] Accuracy summary
- [x] Conclusion 80-150 words
- [x] Mandatory disclosure
