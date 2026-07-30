---
name: ai-audit-report
description: >
  Generate or append FIT@HCMUS AI Audit Report (AI-02 template) for Software Testing
  homework and seminar work. Captures tool name, date/time, verbatim prompt, AI output,
  VALID/INVALID/INCOMPLETE verdict, ISTQB/course reasoning, and student fix. Also writes
  accuracy summary, conclusion, and mandatory disclosure. Use whenever the user mentions
  AI Audit Report, AI Usage, AI-02, prompt log, audit table, VALID/INCOMPLETE/INVALID
  verdicts, or mandatory AI appendix for HW01-HW06 / seminar / GUI usability.
---

# AI Audit Report (FIT@HCMUS / AI-02)

## Purpose

Produce a submission-ready `AI_Audit_Report.md` that satisfies:

1. Course **AI-02** five-section template (Prompt+Tool / AI Output / Verdict / Reasoning / Student Fix)
2. Homework minimums (tool, datetime, prompt, output) -- e.g. HW03 section 9
3. Operational transparency from the seminar skill (Human Review, Bloom-AI, contribution %)

**Do not invent prompts or timestamps.** Evidence first; ask once if required fields are missing.

## When to use

| Trigger | Mode |
| --- | --- |
| First AI session for an assignment | **GENERATE** |
| Later AI session same assignment | **APPEND** |
| End of homework, need full appendix | **FINALIZE** (recompute summary + disclosure) |
| User says "no AI used" | **NO-AI** declaration only |

Also run at the end of any GUI-checklist / usability / cross-browser AI session so the audit trail is never rebuilt from memory.

## Output paths (this repo)

Prefer project convention; create folders if missing.

```text
Appendix_A/AI_Audit_Report.md
# or (submission packaging)
AI Submission/AI_Audit_Report.md
```

If the user gives an explicit path inside this repo, use that path. Do not write outside the workspace.

Optional companion files (same folder):

- `AI_Critique.md` -- produced by skill `ai-critique` (do not invent critique here unless user asks)
- `prompt_log.md` -- raw dump only if user wants full untruncated outputs separately

## Evidence priority

1. **File** -- chat export, prompt log, prior audit entry (read verbatim)
2. **Pasted prompt/output** in the message (use as-is)
3. **Oral retelling** -- OK for execution steps and output summary; **not** OK for the Prompt cell -- ask for the real prompt

Never paraphrase the Prompt column. Never fill Date/Time with "now" unless the user explicitly says the session just finished and confirms the clock.

## Required fields before writing any artifact row

If any field is missing, stop and ask **once** with a single numbered list:

1. **AI tool** (+ version if known): e.g. Cursor (Claude), ChatGPT-4o, Gemini 2.5
2. **Date/Time** with timezone: prefer `YYYY-MM-DD HH:MM:SS +07:00` (also store `HH:MM dd/mm/yyyy` for template)
3. **Verbatim prompt**
4. **AI output** -- full text if short; if long, full text in a linked file or labelled excerpt + path
5. **Artifact name** -- what was produced (checklist batch, SUS plan, skill file, ...)
6. **Verdict** from student after review: `VALID` | `INVALID` | `INCOMPLETE`
7. **Student fix** -- what changed (or "Accepted as-is" only when VALID)
8. **Reasoning anchor** -- ISTQB section, lecture topic, or homework rule the verdict relies on

Optional but recommended: Bloom-AI level (G9.x), quality rating, issues list, feature/module.

### Verdict rules (load-bearing)

| Verdict | Meaning | When to use |
| --- | --- | --- |
| **VALID** | Correct; accepted as-is | No material edit after human review |
| **INVALID** | Wrong; rejected | Fundamentally incorrect; rewrite or discard |
| **INCOMPLETE** | Usable after student edits | Most real homework cases -- AI draft + human repair |

Do not mark VALID if the student added checklist items, fixed SUS scoring, or removed hallucinated FR/IA coverage.

## Modes

### GENERATE

Create a new report with all sections below and Artifact #1 filled.

### APPEND

Read existing report -> add next artifact row -> refresh overview table, accuracy summary, contribution breakdown, compliance checklist, disclosure draft.

### FINALIZE

No new artifact. Recompute Section 4 counts/percentages, tighten Section 5 conclusion (80-150 words), paste final Mandatory Disclosure, fill signature block from student info.

### NO-AI

Write only declaration:

> "I do not use any AI help in this exercise."

Plus student info + signature. Skip audit table.

---

## Mandatory document structure

Write sections in this order. Keep English section titles from the faculty template; body language may be Vietnamese or English to match the rest of the submission.

### 1. Student Information

Use this shape:

```
# AI Audit Report -- [Assignment ID] [Short title]

## 1. Student Information

| Field | Value |
| --- | --- |
| **Student name (printed)** | [Full name] |
| **Student ID** | [MSSV] |
| **Class / Cohort** | [e.g. 23CLC08] |
| **Assignment ID** | [e.g. HW03-AI] |
| **Assignment date** | [YYYY-MM-DD] |
| **AI tool(s) used** | [list] |
| **AI used?** | Yes / No |
```

### 2. Instructions (keep short)

State that each row = one AI-generated artifact (one prompt batch = one artifact), prompts are verbatim, verdicts are VALID/INVALID/INCOMPLETE, reasoning cites ISTQB or course material.

### 3. Audit Table -- one row per artifact

Use the faculty 5-column table. For readability in Markdown, also expand each artifact as a detailed block under the table. Table cells may hold condensed text; the expanded block must hold the full prompt and full-or-linked output.

Table columns:

1. Prompt + Tool
2. AI Output
3. Verdict
4. Reasoning (ISTQB / course)
5. Student Fix

Cell (1) format:

```
Tool: [name]
Time: HH:MM dd/mm/yyyy
Prompt: "[verbatim]"
```

#### Expanded artifact block (required for each row)

```
### Artifact #N -- [Short title]

| Field | Value |
| --- | --- |
| **AI Tool** | [name + version] |
| **Date/Time** | [YYYY-MM-DD HH:MM:SS +07:00] |
| **Task** | [what the student asked AI to do] |
| **Feature / Module** | [e.g. Cart screen / IA-01-04 checklist] |
| **Bloom-AI Level** | [G9.x -- short why] |
| **Verdict** | VALID / INVALID / INCOMPLETE |

#### (1) Prompt + Tool

**Prompt (verbatim):**

    [exact prompt -- no paraphrase]

**Execution notes (optional):**

    Skill(s): ...
    Mode: GENERATE | APPEND
    Steps the AI took: ...

#### (2) AI Output

    [Full output if <= ~80 lines.
     If longer: structured summary of deliverables + path to full dump,
     e.g. Full output: Appendix_A/raw/artifact-03-output.md]

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect | Detail |
| --- | --- |
| **Verdict** | VALID / INVALID / INCOMPLETE |
| **Reasoning** | 2-5 sentences; cite ISTQB FL, lecture, or HW section |
| **Student Fix** | Concrete delta: added items, deleted hallucinations, ... |
| **Reviewed by** | [student name] |
| **Review date** | [YYYY-MM-DD] |
| **Quality rating** | Excellent / Good / Acceptable / Poor |
| **Issues found** | list or None |
```

HW03 note: faculty prefers non-paraphrased output. Prefer linking a raw file over aggressive summarising when the artifact is a long checklist.

### 4. Summary of AI Accuracy

```
## 4. Summary of AI Accuracy

| Metric | Count | Percentage |
| --- | ---: | ---: |
| **Total AI-generated artifacts audited** | N | 100% |
| **VALID (correct, accepted as-is)** | a | a/N % |
| **INVALID (wrong; rejected)** | b | b/N % |
| **INCOMPLETE (acceptable after edits)** | c | c/N % |
```

Percentages must sum to 100% (rounding tolerance 0.1). Recompute on every APPEND/FINALIZE.

### 5. Conclusion -- When should AI be used (or not)?

80-150 words. Patterns only -- where AI helped, where it failed, recommendation for similar work (GUI checklist, usability, cross-browser). No empty praise.

### 6. Mandatory Disclosure (adapt, do not leave placeholders)

```
"[Artifacts] was initially generated by [AI tool(s)]; I reviewed and modified [sections];
added [edge cases / checklist items / analysis]; [parts] was written entirely by me.
The detailed AI Audit Report is attached as Appendix A. I confirm I did not use AI to
generate any artifact listed in the prohibited category."
```

Map prohibited items from the active homework (HW03: 7 real participants, cross-platform screenshots with student identity, etc.).

### 7. Signature

| Field | Value |
| --- | --- |
| Student name | |
| Student ID | |
| Class / Cohort | |
| Course | CS423 / CSC13003 - Software Testing |
| Instructor | |
| Date | |
| Signature | [typed full name is acceptable in Markdown] |

### 8. Operational appendix (recommended, not a substitute for section 3)

Keep seminar-style overview if useful for defense:

- Interaction Overview table: #, AI Tool, Task Category, Feature, Date, Bloom-AI, Verdict
- Contribution Breakdown: Task, AI %, Human %
- Compliance Checklist:
  - [ ] AI usage declaration
  - [ ] Tool name(s)
  - [ ] Date and time per interaction
  - [ ] Verbatim prompt per artifact
  - [ ] AI output (full or linked)
  - [ ] Verdict + ISTQB/course reasoning
  - [ ] Student fix
  - [ ] Accuracy summary
  - [ ] Conclusion 80-150 words
  - [ ] Mandatory disclosure
  - [ ] Markdown submission format

---

## HW03-specific artifact taxonomy

When assignment is HW03 (GUI and Usability), label Feature using these buckets so the audit maps to graded tasks:

| Task | Typical artifacts |
| --- | --- |
| Task 1 GUI Checklist | Initial checklist (>40 items), missed-item gap analysis, Pass/Fail execution notes, bug drafts |
| Task 2 Usability | Objectives, task scenario, SUS/UEQ-S instrument, probe questions, synthesis / severity ranking |
| Task 3 Cross-platform | Platform matrix plan, failure notes (not fake screenshots) |
| Agent Skills | Skill SKILL.md drafts, demo script outlines |
| Meta | This audit report formatting, critique drafting support |

**Never** use AI to fabricate: participant list, contact details, session recordings, or cross-browser screenshots with identity overlays. If the user asks, refuse and log the refusal in Human Review if an audit row exists for that attempt.

### Checklist gap pattern (Task 1)

When AI generates a checklist, human review must consider items AI typically misses (HW03 examples: accessibility, RTL, dark mode, Vietnamese copy, touch targets, loading/empty/error states). Each student-added item should appear in **Student Fix** of that artifact (or a dedicated "gap fill" artifact).

---

## Bloom-AI levels (course scale)

- **G9.1** Remember / understand -- lookup, definitions
- **G9.2** Apply -- templates, formatting, first draft generation
- **G9.3** Analyse -- critique AI output, severity ranking, gap analysis (HW03 target)
- **G9.4** Collaborate / create -- exploratory partnership, multi-step agent skills (HW03 target)

Tag each artifact with the level that matches the **student's use**, not the model marketing name.

---

## Writing rules

1. **Prompt = evidence.** No invented prompts.
2. **One prompt batch = one artifact.** Do not merge unrelated chats.
3. **Verdict is the student's.** Agent may propose a verdict with justification; student must confirm before FINALIZE if uncertain.
4. **Reasoning must cite something real** -- ISTQB FL syllabus section, named lecture topic, or HW paragraph. "Seems wrong" is not enough.
5. **Plain Markdown** -- no emoji in the submission file; avoid `**[Label]**` (linter false link); use `**Label:**`.
6. **Language** -- match the main report (usually Vietnamese body + English template headers).
7. After writing, print a short **agent checklist** to the user: path written, artifact count, verdict tallies, missing fields if any.

## Activation examples

```
GENERATE: Tao AI Audit Report cho HW03, MSSV 23127148.
Tool: Cursor (Claude). Time: 2026-07-27 10:15 +07.
Prompt: """..."""
Output: checklist 42 items in Cart_GUI_Checklist.md
Verdict: INCOMPLETE -- toi them 8 item a11y. Reasoning: GUI review lecture + WCAG contrast.
```

```
APPEND: Them artifact usability scenario design vao Appendix_A/AI_Audit_Report.md
[du field bat buoc]
```

```
FINALIZE: Chot AI Audit Report HW03 -- cap nhat % accuracy, conclusion, disclosure.
```

## Related skills

- `ai-critique` -- 200-300 word mandatory critique from this audit's gaps
- Older thin logger `ai-audit-log` -- superseded for homework submission; keep only for in-session one-liners if needed

## References

- Faculty template summary: [references/ai_02_template.md](references/ai_02_template.md)
- Course AI usage rules: [references/ai_usage_guidelines_summary.md](references/ai_usage_guidelines_summary.md)
- Filled sample: [examples/sample_audit_report.md](examples/sample_audit_report.md)
