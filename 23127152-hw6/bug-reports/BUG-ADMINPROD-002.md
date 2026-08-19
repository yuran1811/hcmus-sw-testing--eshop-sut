# BUG-ADMINPROD-002: Product create accepts invalid/empty payloads (no domain validation)

## Found by Test Case

TC-C3-005, TC-C3-038

## Requirement liên quan

FR-15 (domain partitions: price > 0, required fields)

## Severity / Priority

Major / P1

## Environment

API `http://localhost:3000` · Newman 6.2.2 · Student 23127152 · 2026-08-19

## Steps to reproduce

1. As admin (or even unauthenticated): `POST /api/products` with `price: -1`.
2. `POST /api/products` with body `{}`.

## Expected result

**400** with validation error — price must be > 0; required fields must be present.

## Actual result

HTTP **200** `Product created` for negative price and empty body (null columns inserted).

## Evidence

- Newman failures TC-C3-005, TC-C3-038
- Related unauth create with `price:-99`: `screenshots/BUG-ADMINPROD-001-unauth-create.json`
- GitHub Issue: [#298](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/298)
