---
name: api-test-execute
description: >-
  Implements and runs HW06 API tests with Postman + Newman — collection,
  environment, X-Student-Id header, data-driven runs, HTML reports, and
  Postman feature evidence. Use when executing HW06 Postman/Newman tests,
  adding pre-request scripts, or producing Newman HTML reports.
---

# API Test Execute (HW06)

## Overview

Turn the audited+extended suite into runnable Postman requests and produce **attributable** Newman evidence.

## Mandatory anti-cheat artifacts

1. Collection pre-request sets `X-Student-Id: 23127152` on **every** request.
2. Screenshot of console/headers showing that header.
3. Newman report hostname matches deployment (`localhost` / `127.0.0.1` OK).

## Paths

- Collection: `23127152-hw6/postman/EShop-HW06.postman_collection.json`
- Environment: `23127152-hw6/postman/EShop-HW06.postman_environment.json`
- Data: `23127152-hw6/postman/data/`
- Report: `23127152-hw6/postman/reports/newman-report.html`
- Screenshots: `23127152-hw6/postman/screenshots/`
- Runner: `23127152-hw6/scripts/run-newman.sh`

## Process

1. Ensure SUT is up (`http://localhost:3000`).
2. Map each TC → request (or data-driven row) under the correct folder:
   - `API1 — FR-05 …`
   - `API2 — FR-11 …`
   - `API3 — FR-15 …`
3. Assertions in Tests tab: status, JSON fields, negative cases.
4. Exercise Postman features; tick table in `23127152-hw6/README.md`.
5. Run Newman:

```bash
cd 23127152-hw6
./scripts/run-newman.sh
# or data-driven:
newman run postman/EShop-HW06.postman_collection.json \
  -e postman/EShop-HW06.postman_environment.json \
  -d postman/data/products-search-data.csv \
  -r cli,htmlextra \
  --reporter-htmlextra-export postman/reports/newman-report.html
```

6. Capture screenshots (pre-request + Newman CLI).
7. Update test summary counts in README.
8. On genuine fails that are product bugs → `bug-report`.

## Postman features to exercise

Workspace · Collection · Variables · Environment · Pre-request · Tests · Collection Runner + data file · Monitor and/or Mock (list what you actually used).

## Output format

Use [templates/execution-notes-template.md](templates/execution-notes-template.md) for a short run log per API (optional but recommended).

## Self-review checklist

- [ ] `X-Student-Id` on all requests (verify in Newman)
- [ ] HTML report generated
- [ ] Feature list updated in README
- [ ] Pass/fail counts recorded
- [ ] Evidence screenshots saved

## Common mistakes

- Header only on one folder
- Report from mocked responses without real SUT
- Skipping negative-case assertions
