# Execution notes — API2 FR-11

**Student ID:** 23127152  
**Date:** 2026-08-19  
**Base URL:** http://localhost:3000  
**Folder:** `API2 — FR-11 Order History & Detail`  
**Newman report:** `postman/reports/newman-api2-fr11.html`

## Run summary

| Metric | Value |
|--------|-------|
| Designed TCs (AI) | 40 |
| Extended TCs | 6 |
| Newman requests | 26 (incl. setup) |
| Assertions | 35 |
| Passed | 30 |
| Failed | 5 |
| Bugs filed | 1 (BUG-ORDERS-001) |

## Evidence

| Artifact | Path |
|----------|------|
| X-Student-Id | `postman/screenshots/newman-api2-fr11-cli.txt` |
| HTML report | `postman/reports/newman-api2-fr11.html` |

## Notable failures

| TC ID | Observation | Bug ID |
|-------|-------------|--------|
| TC-B2-025 | Unauth detail → 200 | BUG-ORDERS-001 |
| TC-B2-E01 | Leaks `Addr B Secret` | BUG-ORDERS-001 |
| TC-B2-026/E02 | User A reads B → 200 | BUG-ORDERS-001 |
| TC-B2-E03 | Admin reads B → 200 | BUG-ORDERS-001 |
| TC-B2-E04 | User B reads A → 200 | BUG-ORDERS-001 |
