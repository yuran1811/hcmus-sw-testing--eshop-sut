---
name: api-test-cicd
description: >-
  Integrates HW06 Newman API tests into GitHub Actions and documents two sample
  pipeline runs (all-pass and intentional one-fail) with screenshots and commit
  links. Use when adding HW06 CI/CD, GitHub Actions Newman workflow, or the
  pass/fail sample commits.
---

# API Test CI/CD (HW06)

## Overview

Wire Newman into CI and produce a short CI/CD report with **two** attributable runs.

## Deliverables

1. Workflow file (e.g. `.github/workflows/hw06-api-tests.yml`)
2. `23127152-hw6/report/CI_CD_Report.md` (skeleton already exists)
3. `23127152-hw6/cicd/sample-commits.md` + screenshots
4. Two commits:
   - **Pass:** green run, all API tests pass
   - **Fail:** one assertion deliberately broken → red run

## Process

1. Workflow steps (typical): checkout → setup Node → start SUT (or service container) → wait for `:3000` → `npm i -g newman newman-reporter-htmlextra` → run collection → upload HTML artifact.
2. Ensure `X-Student-Id` still applied in CI.
3. Commit pass baseline; capture Actions URL + screenshot → `cicd/screenshots/run-all-pass.png`.
4. Introduce **one** intentional failure (e.g. expect status 201 instead of 200); push; capture fail run → `run-one-fail.png`.
5. Revert fail change in a follow-up commit if needed so main suite stays green.
6. Fill `CI_CD_Report.md` and `sample-commits.md`.

## Report consistency

Reuse the existing skeleton sections in `23127152-hw6/report/CI_CD_Report.md` (do not invent a parallel template). Narrative tone may follow HW05 main-report clarity: tables for commit SHA, URL, result.

## Self-review checklist

- [ ] Workflow runs Newman against real/reachable SUT
- [ ] Pass commit link + screenshot
- [ ] Fail commit link + screenshot + named failing test
- [ ] CI_CD_Report explains config briefly

## Common mistakes

- Fake screenshots / localhost Actions that never ran
- Failing for infra reasons and calling it the “intentional fail”
- No artifact or log link for graders
