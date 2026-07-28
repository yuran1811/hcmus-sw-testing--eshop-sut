---
name: hw-submission-packager
description: Assemble and validate the final HW03 submission zip — correct filename with StudentID and self-assessed grade, all 9 required content categories present, README self-assessment table filled, and a git commit log exported as text. Use this near the end of HW03-style work, when the user is ready to package deliverables from gui-checklist-ai, usability-study-designer, usability-session-notes, bug-report-github, and ai-audit-report into one submission, or asks to check the zip is complete before submitting.
---

# HW Submission Packager

## Required filename

`<StudentID>_HW03_AI_GUIUsability_<SelfAssessedGrade>.zip`

- `SelfAssessedGrade` = 3 digits, 000-100 (e.g., `090`).
- Example: `25127001_HW03_AI_GUIUsability_090.zip`

Ask the student for their StudentID and self-assessed grade if not already known; don't guess the grade — that's a self-assessment, not something to fabricate.

## Required contents checklist (validate all 9 are present before zipping)

1. [ ] Main report — Markdown **and** PDF — covering both GUI checklist report and usability evaluation report.
2. [ ] Bug reports — one file per bug under `bugs/BUG-0XX.md` with evidence, plus the corresponding GitHub Issues (export/screenshot the issue list too, in case of link rot). Confirm every bug file's "Found by Test Case" points back to a real checklist item ID or finding ID, and every referenced checklist row/finding points forward to its BUG-ID (bidirectional links, not one-directional).
       2b. [ ] A traceability matrix (`traceability_matrix.md` or a sheet in the xlsx) mapping `Screen/Requirement → Checklist item / Finding ID → Result → Bug ID → Status`, so coverage and defect traceability are visible in one table.
3. [ ] AI Critique + AI Audit Report — Markdown **and** PDF.
4. [ ] Git commit log as a text file (`git log --stat > commit_log.txt` or similar — see below).
5. [ ] Excel checklist (>40 items) + test-result summary table.
6. [ ] Usability session evidence: task scenario, observation notes (all 7), SUS/UEQ-S results, severity-ranked findings, screen recordings if available, participant table (name + masked contact).
7. [ ] Cross-browser/cross-platform screenshots (≥3 platforms, each overlaid with `StudentID@hcmus.edu.vn`).
8. [ ] `README.md` with self-assessment table + test summary (screens/flows tested, checklist items designed/executed/passed/failed, bug count, participant count, demo video link).
9. [ ] Any supporting docs (optional).

## Generating the git commit log

Run from the repo root:

```bash
git log --stat --date=iso > commit_log.txt
```

Verify commits exist for each major step: checklist design, checklist execution, bug logging, each of the 7 usability sessions, synthesis/analysis. A thin commit history (e.g., one giant commit) is a rubric red flag — if that's the case, be upfront about it rather than trying to rewrite history to look better.

## README self-assessment table template

```markdown
# HW03 Submission — <StudentID>

## Self-assessment

| Criterion                       | Self score | Max     |
| ------------------------------- | ---------- | ------- |
| Task 1 – GUI Checklist          |            | 30      |
| Task 2 – Usability Evaluation   |            | 40      |
| Task 3 – Cross-Browser/Platform |            | 20      |
| Agent Skills                    |            | 10      |
| **Total**                       |            | **100** |

## Summary

- Screens/flows tested: <list>
- Checklist items: designed <N> / executed <N> / passed <N> / failed <N>
- Bugs filed: <N> (GitHub Issues #X-#Y)
- Usability participants: 7 (real, verified contacts on file)
- Demo video: <YouTube link, if Agent Skill task attempted>
```

## Final validation pass before zipping

- Confirm no participant contact info has middle digits _unmasked_ anywhere in the packaged files.
- Confirm every cross-platform screenshot actually shows the `StudentID@hcmus.edu.vn` overlay, full name, and localhost URL — spot check at least 3.
- Confirm PDF exports render correctly (open each, don't just trust the export step).
- Zip using the exact filename format above, then re-open the zip to confirm structure before submitting on Moodle.

## Output

- The finished `<StudentID>_HW03_AI_GUIUsability_<Grade>.zip` plus a short pass/fail checklist confirming all 9 categories were found before zipping.
