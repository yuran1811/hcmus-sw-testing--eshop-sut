# BUG-ORDERS-001: IDOR on GET /api/orders/:id leaks any order including PII

## Found by Test Case

TC-B2-025, TC-B2-026, TC-B2-E01, TC-B2-E02, TC-B2-E03, TC-B2-E04

## Requirement liên quan

FR-11 · SEC-02 (related) · Broken Access Control / IDOR

## Severity / Priority

Critical / P0

## Environment

API `http://localhost:3000` · Newman 6.2.2 · Student 23127152 · 2026-08-19

## Steps to reproduce

1. Create users A and B; checkout so each has an order (`orderIdB`).
2. Without Authorization: `GET /api/orders/{orderIdB}`.
3. Optionally: `GET /api/orders/{orderIdB}` with Bearer token of user A (or admin).

## Expected result

Order detail must enforce authentication and ownership (or equivalent access control). Unauthenticated clients and other users must receive 401/403/404 — not another user’s `shipping_address` / order data.

## Actual result

HTTP **200** for:
- No auth
- User A reading User B’s order
- Admin token on the public user detail route

Response includes PII, e.g. `"shipping_address":"Addr B Secret"`.

Root cause: `app.get("/api/orders/:id", …)` in `backend/server.js` has **no** `authenticateToken` and **no** `user_id` ownership check.

## Evidence

- Newman: 5 failed assertions in `postman/screenshots/newman-api2-fr11-cli.txt`
- Dump: `bug-reports/screenshots/BUG-ORDERS-001-idor.json`
- Report: `postman/reports/newman-api2-fr11.html`
- GitHub Issue: [#302](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/302) (Anhnguyenk835)

## Related HW02 Bug

Same class as access-control gaps (e.g. BUG-14 admin role); this is horizontal IDOR on user order detail.
