# BUG-PRODUCTS-001: SQL injection in product search dumps full catalog

## Found by Test Case

TC-A1-021, TC-A1-E01, TC-A1-E03

## Requirement liên quan

FR-05 · SEC-05

## Severity / Priority

Critical / P0

## Environment

API `http://localhost:3000` · Newman 6.2.2 · macOS · Student 23127152 · 2026-08-19

## Steps to reproduce

1. Baseline: `GET /api/products` → note count (seed = 5).
2. `GET /api/products?search=' OR '1'='1` (or URL-encoded `%27%20OR%20%271%27%3D%271`).
3. Compare result length to baseline.

## Expected result

Search input is parameterized / sanitized. A tautology payload must **not** return the full product catalog.

## Actual result

HTTP 200 with **all 5 products** — same as unfiltered list. Confirms string-concatenated SQL:

`SELECT * FROM products WHERE name LIKE '%${searchQuery}%'` in `backend/server.js`.

## Evidence

- Newman failures: TC-A1-021, TC-A1-E01 (`postman/screenshots/newman-api1-fr05-cli.txt`)
- Response dump: `bug-reports/screenshots/BUG-PRODUCTS-001-sqli.json`
- HTML report: `postman/reports/newman-api1-fr05.html`
- GitHub Issue: [#294](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/294)

## Root Cause (if known)

`backend/server.js` ~line 144: query built via template string interpolation instead of bound parameters.
