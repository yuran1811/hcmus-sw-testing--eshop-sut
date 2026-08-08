---
name: eshop-test-automation
description: Use when generating or maintaining Playwright automation scripts for the EShop SUT (eshop-sut) — converting manual test cases (BVA/domain-testing docs) into data-driven, multi-browser test suites, producing multi-browser HTML reports with run attribution, or logging AI Audit Report entries for automation-testing coursework (HW04-style assignments).
---

# EShop Test Automation

## Overview

Converts manual test-case documents for one EShop feature (FR-xx) into a
data-driven Playwright suite that runs on 3 browsers and produces
attributable HTML reports plus an AI Audit Report log. Each phase is a
separate, reviewable step — never generate the whole suite from one prompt.

## When to Use

- Turning `BVA.md` / `DomainTesting.md` test cases for an EShop FR into
  `.spec.ts` Playwright scripts.
- Need HTML test reports that must show "Run by: {StudentID}" + ISO
  timestamp (anti-cheat requirement in automation-testing homeworks).
- Need to log an AI interaction (prompt/output) into an AI Audit Report
  markdown file in the required format.
- Setting up a new FR's automation from scratch or adding cases to an
  existing suite.

## Conventions (fixed — required for the helper scripts to work)

| Item | Path |
|---|---|
| Playwright project root | `23127152-hw4/e2e/` |
| Config | `e2e/playwright.config.ts` (see `templates/playwright.config.template.ts`) |
| Student ID | `e2e/student.config.json` → `{"studentId": "23127152"}` |
| Test data (data-driven, never inline) | `e2e/data/<feature>.json` (schema: `templates/test-data-schema.example.json`) |
| Spec file | `e2e/<feature>/<feature>.spec.ts` |
| HTML report per browser run | `23127152-hw4/reports/<feature>/<browser>/` |
| Bug reports | `23127152-hw4/bug-reports/<feature>/BUG-xx.md` |
| AI Audit log | `23127152-hw4/report/AI_Audit_Report.md` |
| Traceability matrix | `23127152-hw4/test-summary/traceability-matrix.md` |

`<feature>` is the lowercase FR slug, e.g. `fr02-login`, `fr10-orderstate`,
`fr18-ordermanagement` — matches the folders already created under
`23127152-hw4/`.

## Workflow

Work through these phases **in order, one at a time**. After each phase,
run the AI-audit logging step (last section) for that phase before moving
on — don't batch logging till the end.

### Phase 1 — Ingest test cases
Read the feature's source docs (default: `tests/HW02/<FR>_*/BVA.md` and
`tests/HW02/<FR>_*/DomainTesting.md`; if the user points at a different
source, use that instead). List every candidate case with an id, a
positive/negative/edge tag, and a one-line description. Select **at least
12**, covering all three tags — don't cherry-pick only the easy ones.

### Phase 2 — Write the data file
Create `e2e/data/<feature>.json` from `templates/test-data-schema.example.json`.
One entry per selected case: `id`, `type`, `description`, `input`,
`expected`. This file is the single source of test data — the spec file
must import it, never redeclare the values inline.

### Phase 3 — Generate the spec, in groups
Write `e2e/<feature>/<feature>.spec.ts` using `@playwright/test`
(`test()`/`expect()`), driven by the JSON data file (`for (const tc of data)`
or `test.describe.parallel` per case). Generate in 2–3 small groups (e.g.
positive cases, then negative, then edge) rather than one pass over all 12+
cases — review each group before starting the next.

Use **at least 3 distinct assertion patterns** across the suite, e.g.:
- UI state: `await expect(page.getByTestId(...)).toBeVisible()`
- Text/value: `await expect(locator).toHaveText(...)` / `toHaveValue(...)`
- API/network: assert on a `page.waitForResponse(...)` status/body, or use
  the `request` fixture directly for API-level checks

Prefer stable selectors (`data-testid`, ARIA role) over CSS classes or text
that can change. If the AI-generated selector is fragile (nth-child, deep
CSS chains), replace it — note the fix in Phase 5.

### Phase 4 — Run on 3 browsers + report
`playwright.config.ts` (see `templates/playwright.config.template.ts`) already
sets the HTML reporter's `title` to `Run by: {studentId} | {ISO timestamp}` —
this is a real `HtmlReporterOptions` field, but it only surfaces client-side
(React sets `document.title` from a base64-zip blob embedded in `index.html`),
so a plain grep of the report file won't find it. For each of `chromium`,
`firefox`, `webkit`:
```bash
cd 23127152-hw4/e2e
REPORT_DIR=../reports/<feature>/<browser> npx playwright test <feature>/<feature>.spec.ts --project=<browser>
```
Then stamp the report so the same text also exists as literal HTML (grep-safe,
in case grading checks the file directly instead of opening it in a browser):
```bash
node ../../.claude/skills/eshop-test-automation/scripts/inject-report-banner.js \
  ../reports/<feature>/<browser> <studentId>
```
This must produce 3 report folders per feature (9 total across 3 features),
each containing "Run by: {StudentID}" + an ISO timestamp in the report.

### Phase 5 — Review and fix (human review, mandatory)
Re-read the generated spec against this checklist; fix what fails and
record findings (what was wrong, and *why* the AI likely missed it — prompt
too broad, model guessed a selector without seeing the DOM, feature has
async/timing behavior, etc.):
- [ ] Any fragile selector (position-based, brittle text match)?
- [ ] Any assertion that only checks "no error" instead of the actual
      expected value?
- [ ] Any missing edge case from Phase 1's list?
- [ ] Any fixed `waitForTimeout` that should be a condition-based wait
      (`waitForResponse`, `toBeVisible`, `toHaveURL`)?
- [ ] Does every case actually exercise the data file (no leftover
      hardcoded literals)?

### Phase 6 — Bugs found
For each case that fails because of a genuine SUT defect (not a script
bug), write `23127152-hw4/bug-reports/<feature>/BUG-xx.md` (repro steps,
expected vs actual, screenshot path) and prepare the same content for a
GitHub Issue with a screenshot attached. Cases that couldn't be automated
at all go in the main report with a one-line reason (e.g. "requires manual
email inbox check").

### Phase 7 — Update traceability
Append a row per test case to `23127152-hw4/test-summary/traceability-matrix.md`:
`case id | feature | type | automated (Y/N) | browsers run | result | bug id (if any)`.

## Logging AI Audit entries

After each phase that involved driving an AI tool, log it immediately:
```bash
node .claude/skills/eshop-test-automation/scripts/append-ai-audit.js \
  --file 23127152-hw4/report/AI_Audit_Report.md \
  --tool "Claude Code (claude-sonnet-5)" \
  --prompt "<the exact prompt used for this phase>" \
  --output "<short factual summary of what was generated/found>"
```
Log per phase, not per phrase — one entry for "Phase 3 group 1 (positive
cases)" is enough, don't log every intermediate tool call.

## Common Mistakes

- **Hardcoding test data in the spec** — fails the data-driven requirement
  even if the script works. Data always lives in `e2e/data/<feature>.json`.
- **One assertion pattern repeated 12 times** — doesn't meet "≥3 distinct
  assertion patterns"; mix UI-state, value, and API-level checks.
- **Generating all 12+ cases in a single prompt** — violates the AI-first
  step-by-step requirement and makes review harder; use Phase 3's grouping.
- **Skipping the banner injection** — an HTML report without "Run by:
  {StudentID}" + timestamp doesn't satisfy the anti-cheat requirement, no
  matter how complete the test run was.
- **Treating a script bug (bad selector) as a product bug** — only failures
  that trace to real SUT behavior go in `bug-reports/`; script mistakes get
  fixed, not filed.

## Files in this skill

- `scripts/inject-report-banner.js` — stamps a Playwright HTML report with
  `Run by: {studentId} | {ISO timestamp}` in the title and a visible banner.
- `scripts/append-ai-audit.js` — appends one formatted interaction entry to
  an AI Audit Report markdown file, creating it if missing.
- `templates/playwright.config.template.ts` — 3-browser config
  (chromium/firefox/webkit), HTML reporter via `REPORT_DIR` env var.
- `templates/test-data-schema.example.json` — data-driven test case shape.
