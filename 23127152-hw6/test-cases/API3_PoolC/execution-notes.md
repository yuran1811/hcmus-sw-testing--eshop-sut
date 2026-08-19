# Execution notes — API3 FR-15

**Student ID:** 23127152  
**Date:** 2026-08-19  
**Folder:** `API3 — FR-15 Product CRUD (Admin)`  
**Newman report:** `postman/reports/newman-api3-fr15.html`

## Run summary

| Metric | Value |
|--------|-------|
| Designed TCs (AI) | 40 |
| Extended TCs | 6 |
| Newman requests | 22 |
| Assertions | 25 |
| Passed | 13 |
| Failed | 12 |
| Bugs filed | 3 |

## Notable failures → bugs

| TCs | Bug |
|-----|-----|
| TC-C3-024/025/026/027/028/029/030/E01–E05 | BUG-ADMINPROD-001 [#297] missing auth/role |
| TC-C3-005, TC-C3-038 | BUG-ADMINPROD-002 [#298] no validation |
| TC-C3-016, TC-C3-017 | BUG-ADMINPROD-003 [#299] DELETE 200 on missing |

## Evidence

- CLI: `postman/screenshots/newman-api3-fr15-cli.txt` (`X-Student-Id=23127152`)
- HTML: `postman/reports/newman-api3-fr15.html`
