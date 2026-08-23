---
name: api-test-executor
description: >
  Execute Postman collections via Newman for HW06 API Testing (§6.4 Execute and
  §6.5 Report Bugs). Takes any Postman collection (from api-test-generator or
  manually created), runs it with Newman, produces HTML and JSON reports, drafts
  bug reports for genuine failures, and assists with CI/CD two-commit setup.
  Activate when the user asks to run API tests, execute a Postman collection,
  generate Newman reports, or set up CI/CD for API testing.
---

# API Test Executor

## Purpose

Automate HW06 §6.4 (Execute) and §6.5 (Report Bugs): run Postman test
collections via Newman CLI, produce the required Newman/HTML report, and draft
bug reports for genuine failures found during execution.

## When to activate

| Trigger | Action |
|---------|--------|
| User says "run tests" or "execute collection" | Full 4-phase pipeline |
| User asks for Newman report | Phases 1–3 |
| User asks to report bugs from test results | Phase 4 only (needs existing report) |
| User asks about CI/CD setup | Phase 5 (CI assist) |

## Required input — ask once if missing

1. **Collection file path** — e.g., `tests/collections/login.postman_collection.json`
2. **Environment file path** — e.g., `tests/environments/eshop.postman_environment.json`
3. **Data file path** (optional) — for data-driven runs
4. **Base URL** — confirm the backend is running. Default: `http://localhost:3000`

---

## Pipeline — 4 Phases + CI Assist

### Phase 1: PREFLIGHT

Check all prerequisites before running. Fail fast with clear instructions if
anything is missing.

```
1. Check newman is installed:
     newman --version
   If not installed:
     npm install -g newman newman-reporter-htmlextra

2. Check newman-reporter-htmlextra is installed:
     newman run --help | grep htmlextra
   If not installed:
     npm install -g newman-reporter-htmlextra

3. Check backend is reachable:
     curl -s -o /dev/null -w "%{http_code}" {{baseUrl}}/api/products
   If not reachable:
     Tell user to start the backend:
       cd backend && node server.js

4. Validate collection file exists and is valid JSON

5. Validate environment file exists and contains required variables:
     baseUrl, studentId, token (can be empty initially)
```

---

### Phase 2: EXECUTE

Run Newman with appropriate reporters and options.

#### Standard run (no data file)

```bash
newman run tests/collections/<collection>.json \
  -e tests/environments/eshop.postman_environment.json \
  --reporters cli,htmlextra,json \
  --reporter-htmlextra-export tests/test-runs/<api-name>-report.html \
  --reporter-json-export tests/test-runs/<api-name>-report.json \
  --timeout-request 10000 \
  --delay-request 100
```

#### Data-driven run

```bash
newman run tests/collections/<collection>.json \
  -e tests/environments/eshop.postman_environment.json \
  -d tests/data/<api-name>-data-driven.json \
  --reporters cli,htmlextra,json \
  --reporter-htmlextra-export tests/test-runs/<api-name>-ddt-report.html \
  --reporter-json-export tests/test-runs/<api-name>-ddt-report.json \
  --timeout-request 10000 \
  --delay-request 100
```

#### Options explained

| Flag | Purpose |
|------|---------|
| `--reporters cli,htmlextra,json` | Console output + pretty HTML + machine-readable JSON |
| `--reporter-htmlextra-export` | Save HTML report to file (HW06 submission requirement) |
| `--reporter-json-export` | Save JSON report for automated parsing |
| `--timeout-request 10000` | 10s timeout per request (prevent hanging) |
| `--delay-request 100` | 100ms delay between requests (avoid overwhelming the SUT) |

#### Handling auth tokens

If the collection has a login/register request in the E2E workflow folder, it
will self-provision tokens. For isolated test folders that need pre-existing
tokens, instruct the user to:

1. Run the login request first (or the E2E folder)
2. Or manually set `token` and `adminToken` in the environment file

---

### Phase 3: REPORT

Parse the JSON report and generate a human-readable summary.

#### 3.1 Parse results

Read the `<api-name>-report.json` file. Extract:

```
Total assertions: <N>
Passed: <N> (<percentage>%)
Failed: <N> (<percentage>%)
Skipped: <N>
Total execution time: <N>ms
```

#### 3.2 Per-folder breakdown

| Folder | Total | Passed | Failed | Pass Rate |
|--------|-------|--------|--------|-----------|
| 01-Happy-Path | 5 | 5 | 0 | 100% |
| 02-Schema-Validation | 4 | 3 | 1 | 75% |
| ... | ... | ... | ... | ... |

#### 3.3 Failed test details

For each failed assertion:

```
FAIL: <test name>
  Request: <METHOD> <URL>
  Assertion: <assertion message>
  Expected: <expected value>
  Actual: <actual value>
  Response status: <status code>
  Response body (excerpt): <first 200 chars>
```

#### 3.4 Postman features used

List the Postman features exercised in this run (for HW06 report):

- [ ] Collections and folders
- [ ] Environment variables
- [ ] Collection variables
- [ ] Pre-request scripts
- [ ] Test scripts (pm.test, pm.expect)
- [ ] Data-driven runs (Collection Runner / Newman -d)
- [ ] Variable scoping (environment, collection, data)
- [ ] Request chaining (pm.collectionVariables.set from response)
- [ ] JSON Schema validation (pm.response.to.have.jsonSchema)
- [ ] Dynamic variables (if used)

Check each feature that was actually used in the collection.

#### 3.5 Output summary file

Write to `tests/test-summary/<api-name>-results.md`:

```markdown
# Test Execution Results — <API Name>

**Date:** <timestamp>
**Collection:** <file path>
**Environment:** <file path>
**Newman version:** <version>

## Summary

| Metric | Value |
|--------|-------|
| Total tests | <N> |
| Passed | <N> (<percentage>%) |
| Failed | <N> (<percentage>%) |
| Execution time | <N>ms |

## Per-folder breakdown

<table from 3.2>

## Failed tests

<details from 3.3>

## Postman features used

<checklist from 3.4>
```

---

### Phase 4: BUG DRAFTS

For each **genuine failure** (not a test setup issue like missing token or
unreachable server), draft a bug report.

#### Classify failures

- **Test setup issue** — missing env var, backend not running, auth token expired
  → Do not file as bug. Tell user to fix setup and re-run.
- **Genuine bug** — the API returns an unexpected status code, wrong data,
  schema mismatch, security vulnerability, or incorrect state transition
  → Draft a bug report.

#### Bug report format

Create `tests/bugs/BUG-<API>-<NNN>.md`:

```markdown
# BUG-<API>-<NNN>: <Short title>

## Severity
<Critical / Major / Minor / Cosmetic>

## Related test case
TC-<API>-<NNN>

## Endpoint
<METHOD> <URL>

## Steps to reproduce
1. <step>
2. <step>
3. <step>

## Expected result
<what the spec says should happen>

## Actual result
<what actually happened, including status code and response body>

## Evidence
Newman report: `tests/test-runs/<api-name>-report.html`
Test assertion: `<assertion name>`

## Suggested GitHub Issue

**Title:** [BUG] <API Name>: <short description>

**Body:**
<paste the above content formatted for GitHub>

**Labels:** `bug`, `api-testing`, `hw06`
```

---

### Phase 5: CI ASSIST (on demand)

Help the user set up the CI/CD pipeline for HW06. This is activated when the
user explicitly asks about CI/CD.

#### GitHub Actions workflow template

```yaml
name: API Tests — Newman
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: api-tests-${{ github.ref }}
  cancel-in-progress: true

jobs:
  api-test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install backend dependencies
        run: cd backend && npm ci

      - name: Start backend
        run: cd backend && node server.js &

      - name: Wait for backend
        run: |
          for i in $(seq 1 30); do
            curl -s http://localhost:3000/api/products && break
            sleep 1
          done

      - name: Install Newman
        run: npm install -g newman newman-reporter-htmlextra

      - name: Run API tests
        run: |
          newman run tests/collections/<collection>.json \
            -e tests/environments/eshop.postman_environment.json \
            --reporters cli,htmlextra,json \
            --reporter-htmlextra-export tests/test-runs/report.html \
            --reporter-json-export tests/test-runs/report.json

      - name: Upload reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: newman-report
          path: tests/test-runs/
          retention-days: 7
```

#### Two-commit requirement

HW06 requires two sample commits:

1. **All-pass commit** — all test cases pass. Run Newman, confirm 0 failures,
   commit with message: `test: all API tests passing for <API name>`

2. **One-fail commit** — deliberately break one test to show the pipeline
   catches it. Two approaches:
   - Temporarily change an expected status code (e.g., expect 201 instead of 200)
   - Or add a test that asserts a known bug in the SUT
   Commit with message: `test: demonstrate pipeline failure detection`
   Then revert after the pipeline run completes.

---

## Output file paths

```
tests/
├── test-runs/
│   ├── <api-name>-report.html
│   ├── <api-name>-report.json
│   └── <api-name>-ddt-report.html    (if data-driven run)
├── test-summary/
│   └── <api-name>-results.md
└── bugs/
    ├── BUG-<API>-001.md
    └── ...
```

---

## After completion — report to user

Print a summary:

```
✅ API Test Executor complete for: <API Name>
   Tests run: <N>
   Passed: <N> (<percentage>%)
   Failed: <N> (<percentage>%)
   Bugs drafted: <N>
   Files created:
     - tests/test-runs/<name>-report.html
     - tests/test-runs/<name>-report.json
     - tests/test-summary/<name>-results.md
     - tests/bugs/BUG-<API>-001.md ... (if any)
   Next steps:
     1. Review bug drafts — confirm genuine vs false positive
     2. File confirmed bugs as GitHub Issues with screenshots
     3. For CI/CD: ask me to set up GitHub Actions workflow
```
