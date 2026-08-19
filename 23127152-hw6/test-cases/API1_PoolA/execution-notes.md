# Execution notes — API1 FR-05

**Student ID:** 23127152  
**Date:** 2026-08-19  
**Base URL:** http://localhost:3000  
**Collection:** `postman/EShop-HW06.postman_collection.json`  
**Folder:** `API1 — FR-05 Products List/Search`  
**Newman report:** `postman/reports/newman-api1-fr05.html`

## Run summary

| Metric | Value |
|--------|-------|
| Designed TCs (AI) | 40 |
| Extended TCs | 6 |
| Newman requests executed | 20 |
| Assertions executed | 26 |
| Assertions passed | 22 |
| Assertions failed | 4 |
| Bugs filed | 2 (BUG-PRODUCTS-001, BUG-PRODUCTS-002) |

## Evidence

| Artifact | Path |
|----------|------|
| X-Student-Id (Newman console) | `postman/screenshots/newman-api1-fr05-cli.txt` (`X-Student-Id=23127152`) |
| Newman CLI full output | `postman/screenshots/newman-api1-fr05-cli.txt` |
| HTML report | `postman/reports/newman-api1-fr05.html` |

> Postman GUI console screenshot: capture from Postman Desktop when importing collection (CLI evidence already proves header via pre-request + assertion).

## Notable failures

| TC ID | Observation | Bug ID |
|-------|-------------|--------|
| TC-A1-021 | SQLi OR returns full catalog (5=5) | BUG-PRODUCTS-001 |
| TC-A1-E01 | Encoded SQLi same dump | BUG-PRODUCTS-001 |
| TC-A1-023 | `search='` → HTTP 500 HTML | BUG-PRODUCTS-002 |
| TC-A1-E02/E06 | HTML `<h1>Database Error</h1>` | BUG-PRODUCTS-002 |

## Postman features used (API1)

- [x] Collections
- [x] Environment variables
- [x] Collection pre-request (`X-Student-Id`)
- [x] Tests / assertions
- [x] Newman CLI + htmlextra reporter
- [ ] Data-driven CSV run (file ready: `postman/data/products-search-data.csv` — optional follow-up)
- [ ] Monitors / Mock servers
