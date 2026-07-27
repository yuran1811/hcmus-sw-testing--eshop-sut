# IC08 — FR-06 Product Detail Automation

- Student ID: `23127065`
- Feature: FR-06 — Product Detail
- Logical test cases: 15
- Browsers: Chromium, Firefox, WebKit
- Executions: 45
- Result: 6 passed, 39 failed, 0 skipped
- Failure classification: 39 product defects; 0 automation defects; 0 invalid-data failures; 0 environment failures

This folder is the submission copy of the FR-06 automation source and evidence.
The failed tests are intentionally retained because the SUT does not satisfy
their expected requirements.

## Contents

| Path | Purpose |
| --- | --- |
| `test-cases/product-detail/` | Manual TC-001..015, test plan, BVA, and decision table |
| `automation/` | TypeScript Playwright package and external JSON data |
| `test-summary/FR-06-AUTOMATION-TEST-SUMMARY.md` | Execution and coverage summary |
| `bug-reports/FR-06-AUTOMATION-BUG-REPORTS.md` | Six consolidated product bugs |
| `docs/ai-conversion-log.md` | Analyze-to-verify AI conversion evidence |
| `reports/manifests/product-detail.json` | Machine-readable matrix result and classifications |
| `reports/results/product-detail/` | Per-browser JSON results and console logs |
| `reports/html/product-detail/` | Three labeled interactive HTML reports |
| `reports/artifacts/product-detail/` | Failure screenshots, videos, traces, and error contexts |

## Open reports

- `reports/html/product-detail/chromium/index.html`
- `reports/html/product-detail/firefox/index.html`
- `reports/html/product-detail/webkit/index.html`

Every report contains and visibly renders the exact label
`Run by: 23127065 | Product Detail | <browser>`.

## Reproduce from the repository

The runnable canonical package remains at `tests/automation`, because it uses
the repository's `backend` and `frontend-web` directories. From there:

```bash
npm ci
npx playwright install chromium firefox webkit
npm run typecheck
npm run validate:data
npm run test:list
npm run test:matrix
```

`npm run test:matrix` currently exits with status 1 because legitimate product
failures are preserved.
