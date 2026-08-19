# Phase 4 — Postman & Newman Finalization

**Student ID:** 23127152  
**Date:** 2026-08-19  
**Skill:** `api-test-execute`

---

## Deliverables

| Artifact | Path |
|----------|------|
| Collection (final) | `postman/EShop-HW06.postman_collection.json` |
| Environment | `postman/EShop-HW06.postman_environment.json` |
| Data file | `postman/data/products-search-data.csv` (8 rows) |
| Full Newman HTML | `postman/reports/newman-report.html` |
| Data-driven HTML | `postman/reports/newman-report-data-driven.html` |
| Per-API reports | `newman-api1-fr05.html`, `newman-api2-fr11.html`, `newman-api3-fr15.html` |
| CLI evidence | `postman/screenshots/newman-*-cli.txt` |
| Header evidence | `postman/screenshots/x-student-id-console.html` |
| Mock example | `postman/mock/fr05-list-example.json` + request Examples |
| Runner | `scripts/run-newman.sh` |

---

## Runs (2026-08-19)

### Data-driven (FR-05 search CSV)

| Metric | Value |
|--------|-------|
| Iterations | 8 |
| Requests | 8 |
| Assertions | 32 |
| Failed | **0** |
| Header | `X-Student-Id=23127152` logged each iteration |

### Full collection (Setup + API1 + API2 + API3 + Data-Driven folder)

| Metric | Approx. |
|--------|---------|
| Assertion failures | 19 (known Phase 1–3 product bugs) |
| Hostname | `localhost:3000` |
| Header | `[HW06 pre-request] X-Student-Id=23127152` on every request |

Known assertion failures remain from Phase 1–3 security/validation bugs (SEC-05 SQLi, IDOR, missing CRUD auth, etc.). Report retained as attributable execution evidence against `localhost:3000`.

---

## Postman features exercised

| Feature | How |
|---------|-----|
| Collection | Single HW06 collection, 5 folders |
| Environment | Local tokens/baseUrl/studentId |
| Collection + env variables | `baseUrl`, `studentId`, `search`, tokens, order/product ids |
| Pre-request script | Injects `X-Student-Id` + console log |
| Tests / assertions | Per-request scripts |
| Collection Runner + data file | Newman `-d products-search-data.csv` |
| Examples / Mock seed | Saved example responses on DD + FR-05 list |
| Workspace | Local Postman workspace (import these JSON files) |
| Monitors | Not used (needs Postman Cloud); CI/CD Phase 5 covers scheduled runs |

---

## How to re-run

```bash
cd 23127152-hw6
# backend must be on :3000
./scripts/run-newman.sh
```
