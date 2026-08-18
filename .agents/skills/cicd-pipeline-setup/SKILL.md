---
name: cicd-pipeline-setup
description: Sets up a GitHub Actions pipeline that runs Newman automatically for HW06, and helps write the short CI/CD report describing the config + 2 sample runs (one all passing, one with a failing test). Use when the user says "set up CI/CD", "GitHub Actions to run Newman", "integrate tests into the pipeline", or needs to prepare the 2 required sample commits.
---

# CI/CD Pipeline Setup (GitHub Actions + Newman)

## Goal (per assignment section 6)
- Add a GitHub Actions workflow that runs Newman in the SUT/submission repo.
- Provide **2 sample commits**: one where the pipeline run shows ALL tests passing, another where it shows EXACTLY 1 failing test.
- Write a short CI/CD report with screenshots + links to both runs.

## Step 1 — Add the workflow file
Copy `assets/newman-ci.yml` into `.github/workflows/newman-ci.yml` in the repo.
Fill in the `<...>` placeholders:
- Paths to the collection/environment JSON exported from Postman.
- The step that starts the SUT (if it runs via docker-compose or npm start, add the corresponding step before running newman).

## Step 2 — Commit #1 (all passing)
1. Make sure every test case in the collection passes against the current SUT code (main branch, no deliberate failure yet).
2. Commit + push with a clear message, e.g.: `test: add Newman CI - all API tests passing`.
3. Go to the Actions tab on GitHub, wait for the pipeline to finish, screenshot the result (all green/passing) and copy the link to that run.

## Step 3 — Commit #2 (one failing test)
There are 2 ways to produce this commit (prefer option 1 so the evidence is genuine, per the anti-cheat rules in section 11):
- **Option 1 (recommended):** Change one test case's expected result to be slightly, deliberately wrong compared to the SUT's actual current behavior (e.g. change the expected status code from 200 → 201), or temporarily revert a fix for a real bug. Clearly note in the report that this is a deliberate change to demonstrate the pipeline catching a failure.
- **Option 2:** If the SUT has a genuinely unfixed bug (from the Bug Report step), leave it as-is and the commit will naturally have one real failing test — this is preferable since it reflects a real defect.
3. Commit + push with a message like: `test: intentional failing case to demonstrate CI failure detection`.
4. Screenshot the pipeline showing red/failing, copy the run link.

## Step 4 — Write the CI/CD report
Use `assets/cicd_report_template.md`, filling in:
- Pipeline configuration (trigger, main steps)
- Link + screenshot for both runs
- A brief explanation of why the second run fails

## Anti-cheat note (section 11)
- The Newman results in CI must run against `localhost`/`127.0.0.1` (the SUT running inside the CI job itself, e.g. via docker-compose or npm start in the background) — the TA will cross-check the hostname in the Newman output against your deployment environment.
- Do NOT manually edit/fabricate the Newman output — the pipeline must genuinely produce that result.

## Output language
Fill the CI/CD report content in **Vietnamese**, since that's the submission language for this course. These instructions themselves are in English.
