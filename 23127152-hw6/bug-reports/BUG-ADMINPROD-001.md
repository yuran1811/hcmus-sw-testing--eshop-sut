# BUG-ADMINPROD-001: Product CRUD endpoints missing auth and admin role checks

## Found by Test Case

TC-C3-024, TC-C3-025, TC-C3-026, TC-C3-027, TC-C3-028, TC-C3-029, TC-C3-030, TC-C3-E01…E05

## Requirement liên quan

FR-15 · SEC-02 · SEC-03

## Severity / Priority

Critical / P0

## Environment

API `http://localhost:3000` · Newman 6.2.2 · Student 23127152 · 2026-08-19

## Steps to reproduce

1. Without Authorization: `POST /api/products` with a valid JSON body.
2. With a normal **user** JWT: `POST` / `PUT` / `DELETE /api/products...`.
3. With malformed `Bearer not-a-jwt`: `POST /api/products`.

## Expected result

- No token → **401**
- Valid user (non-admin) token → **403**
- Only admin JWT may mutate products

## Actual result

All of the above return **HTTP 200** and perform the mutation (create/update/delete).  
`POST/PUT/DELETE /api/products` in `backend/server.js` have **no** `authenticateToken` and **no** `role === 'admin'` check.

## Evidence

- Newman 12 assertion failures (auth subset) — `postman/screenshots/newman-api3-fr15-cli.txt`
- Unauth create response: `bug-reports/screenshots/BUG-ADMINPROD-001-unauth-create.json`
- Report: `postman/reports/newman-api3-fr15.html`
- GitHub Issue: [#303](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/303) (Anhnguyenk835)

## Related HW02 Bug

Same class as BUG-14 (missing admin role enforcement).
