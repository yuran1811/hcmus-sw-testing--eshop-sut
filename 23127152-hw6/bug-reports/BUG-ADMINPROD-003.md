# BUG-ADMINPROD-003: DELETE /api/products/:id returns 200 for missing/invalid ids

## Found by Test Case

TC-C3-016, TC-C3-017

## Requirement liên quan

FR-15

## Severity / Priority

Minor / P2

## Environment

API `http://localhost:3000` · Newman 6.2.2 · Student 23127152 · 2026-08-19

## Steps to reproduce

1. `DELETE /api/products/999999`
2. `DELETE /api/products/abc`

## Expected result

**404** Not found when no row deleted / invalid id.

## Actual result

HTTP **200** `{ "message": "Product deleted" }` even when nothing was deleted (`this.changes` ignored).

## Evidence

- `bug-reports/screenshots/BUG-ADMINPROD-003-delete-missing.txt`
- Newman failures TC-C3-016/017
- GitHub Issue: [#305](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/305) (Anhnguyenk835)
