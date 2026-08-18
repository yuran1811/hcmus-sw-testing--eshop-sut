---
name: bug-report-writer
description: Writes a standard bug report (Markdown + content for GitHub Issues) when a real bug is found while running API tests for HW06, including bugs the AI missed. Use when the user says "report a bug", "write a bug report", "create a GitHub issue for this", or when a test case fails unexpectedly (not a deliberate negative test).
---

# Bug Report Writer

## When a Fail = a real Bug
Only write a bug report when:
- A test case **designed to pass** (expected result matches the spec) **actually fails**, OR
- The system behaves inconsistently with the spec even if it wasn't predicted by the original test case (discovered incidentally during testing).

Do NOT write a bug report for negative test cases that deliberately send bad input expecting an error (that's a correctly passing negative test, not a bug).

## Step 1 — Gather evidence
For each bug, you need:
- The full request (method, URL, headers including `X-Student-Id`, body)
- The actual response received (status code + body)
- A screenshot (Postman response or Newman HTML report) — **required per assignment section 6.5**
- The related test case (Test_ID in the Excel file)

## Step 2 — Fill in the template
Use `assets/bug_report_template.md`, creating one file per bug: `bug_reports/BUG-<number>.md`.

## Step 3 — Classify Severity and Priority
| Severity | Example |
|---|---|
| Critical | Another user's data exposed (IDOR), authentication bypassed, successful SQL injection |
| High | Wrong state transition allows cancelling an already-delivered order, role escalation lets a regular user perform admin actions |
| Medium | Wrong response schema, missing input validation leading to junk data being stored |
| Low | Unclear error message, minor formatting issue that doesn't affect functionality |

## Step 4 — Post to GitHub Issues
1. Go to your personal GitHub repo (fork/clone of `eshop-sut` or the submission repo) → Issues tab → New Issue.
2. Copy the content from the `BUG-xxx.md` file into the issue, attach the screenshot directly in the issue (drag-and-drop).
3. Add a label matching the severity if the repo already has labels, or create a new one.
4. Screenshot the Issues list page as further evidence to attach to the main report.

## Step 5 — Roll up into the main report
Build a summary table of all bugs (place it in the main Markdown report):

| Bug ID | API | Related Test_ID | Severity | Short description | GitHub Issue link | Found by AI? |
|---|---|---|---|---|---|---|

The last column matters: the assignment requires you to indicate which bugs were found by the student and missed by the AI — link this directly to the "Extend" table from the `test-case-auditor` skill.

## Output language
Fill the bug report template and any deliverable text with **Vietnamese** content, since that's the submission language for this course. These instructions themselves are in English.
