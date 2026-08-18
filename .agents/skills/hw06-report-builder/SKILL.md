---
name: hw06-report-builder
description: Assembles all HW06 deliverables (3 APIs x full pipeline, AI Audit Report, Postman/Newman, CI/CD, bug reports, test-generator design) into the main report, a README.md with a self-assessment table, and a checklist of files required in the submission .zip. Use when the user says "compile the report", "create the README", "prepare for submission", "submission checklist", or wants to double-check completeness close to the deadline.
---

# HW06 Report Builder

## When to use
After finishing the pipeline for all 3 APIs (using `api-test-case-generator`, `test-case-auditor`, `ai-audit-logger`, `postman-newman-runner`, `bug-report-writer`, `cicd-pipeline-setup`) and having a test-generator design (section 7).

## Step 1 — Review the required-files checklist
Cross-check against `references/submission_checklist.md` (the full list drawn from assignment section 14). Missing ANY required item → automatic 0, so review this carefully before packaging.

## Step 2 — Compute summary numbers
From the Excel test-case files + AI Audit Report + bug reports, calculate:
- Total APIs tested (must = 3, one from each pool A/B/C)
- Total test cases generated (AI), audited, added (Human), executed, passed, failed
- Total real bugs found, by severity, by AI-detected vs. Human-detected

## Step 3 — Create README.md
Use `assets/README_template.md`, filling in the self-assessment table (matching the grading table in section 15: API1/API2/API3 each 30 pts, Agent Skills 10 pts) and the test summary section.

## Step 4 — Assemble the main report
Use `assets/main_report_template.md` as the skeleton — one major section per API, following the 5 pipeline steps exactly (Generate → Audit → Extend → Execute → Report bugs), plus a CI/CD section, a Test Generator Design section (diagram + pseudocode), and the AI Critique (200-300 words) section.

Remind the user:
- The AI Critique section must be SELF-WRITTEN — this skill only provides the guiding questions, it should not write the personal reflection content for them.
- The test-generator diagram must be a hand-drawn image (not generated directly by AI) — only insert an image the user already has, never generate the diagram image yourself.

## Step 5 — Export to PDF
Once the main report and AI Audit Report are finalized in Markdown, convert them to PDF (use the built-in `docx` or `pdf` skill if needed, or the user's preferred Markdown→PDF tool).

## Step 6 — File naming & packaging
Zip file name: `<StudentID>_HW06_AI_API_<SelfAssessedGrade>.zip` (SelfAssessedGrade is a 3-digit number, e.g. `090`).
Suggested folder structure inside the zip:
```
README.md
main_report.md / main_report.pdf
ai_audit_report.md / ai_audit_report.pdf
ai_critique.md
git_commit_log.txt
postman/
  collection.json
  environment.json
  features_used.md
newman_reports/
  api1_report.html
  api2_report.html
  api3_report.html
cicd/
  cicd_report.md
  screenshots/
testcases/
  testcases_api1.xlsx
  testcases_api2.xlsx
  testcases_api3.xlsx
  test_summary.md
bug_reports/
  BUG-01.md ...
test_generator/
  diagram.png
  pseudocode.md (or .py)
openapi/ (optional)
```

## Output language
All deliverable documents (main report, README, AI Audit Report, etc.) should be written in **Vietnamese**, since that's the submission language for this course. This skill's own instructions are in English.
