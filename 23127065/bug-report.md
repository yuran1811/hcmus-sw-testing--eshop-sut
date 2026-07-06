# FR-09 Coupon Playwright Bug Report

## Execution Summary

| Field           | Value                                                                   |
| --------------- | ----------------------------------------------------------------------- |
| Date            | 2026-07-06                                                              |
| Command         | `bunx playwright test tests/playwright/coupon.spec.mjs --reporter=list` |
| Test source     | `tests/test-cases/coupon/`                                              |
| Target          | `http://localhost:3000`                                                 |
| Result          | 14 cases executed: 3 passed, 11 failed                                  |
| Raw result file | `tests/reports/coupon/coupon-results.json`                              |

## Test Case Status

| Test Case      | Status | Related Bug                |
| -------------- | ------ | -------------------------- |
| TC-FR09-ST-001 | Failed | BUG-FR09-001               |
| TC-FR09-ST-002 | Failed | BUG-FR09-005               |
| TC-FR09-ST-003 | Failed | BUG-FR09-001               |
| TC-FR09-ST-004 | Failed | BUG-FR09-001               |
| TC-FR09-ST-005 | Failed | BUG-FR09-001               |
| TC-FR09-ST-006 | Failed | BUG-FR09-001               |
| TC-FR09-ST-007 | Passed | -                          |
| TC-FR09-ST-008 | Failed | BUG-FR09-001               |
| TC-FR09-UC-001 | Failed | BUG-FR09-001               |
| TC-FR09-UC-002 | Failed | BUG-FR09-003               |
| TC-FR09-UC-003 | Passed | -                          |
| TC-FR09-UC-004 | Failed | BUG-FR09-004, BUG-FR09-002 |
| TC-FR09-UC-005 | Failed | BUG-FR09-002               |
| TC-FR09-UC-006 | Passed | -                          |

## Bugs Found

### BUG-FR09-001: Minimum order boundary uses `>` instead of `>=`

- Severity: High
- Requirement: FR-09 C3 requires `total_amount >= min_order_amount`.
- Affected cases: TC-FR09-ST-001, TC-FR09-ST-003, TC-FR09-ST-004, TC-FR09-ST-005, TC-FR09-ST-006, TC-FR09-ST-008, TC-FR09-UC-001.
- Expected: Coupon at exactly the minimum order amount is eligible, then the system should continue to expiry, usage, and discount checks.
- Actual: Requests with total equal to the coupon minimum are rejected as below minimum.
- Screenshot:

![BUG-FR09-001](screenshots/BUG-FR09-001.png)

### BUG-FR09-002: Percent coupon discount formula is wrong

- Severity: Critical
- Requirement: FR-09 requires `discount_amount = total * discount_value / 100`.
- Affected cases: TC-FR09-UC-004, TC-FR09-UC-005.
- Expected: `SAVE10` on 500,000 VND gives `discount_amount = 50,000` and `final_amount = 450,000`.
- Actual: API returns `discount_amount = -4,500,000` and `final_amount = 5,000,000`.
- Screenshot:

![BUG-FR09-002](screenshots/BUG-FR09-002.png)

### BUG-FR09-003: Apply coupon does not require valid JWT

- Severity: Critical
- Requirement: FR-09 C4 requires a valid authenticated user before applying a coupon.
- Affected case: TC-FR09-UC-002.
- Expected: Unauthenticated coupon application is rejected with a login/authentication message.
- Actual: A no-JWT request above the minimum order succeeds and returns discounted totals. The endpoint also accepts `user_id` from the client body instead of deriving it from the JWT.
- Screenshot:

![BUG-FR09-003](screenshots/BUG-FR09-003.png)

### BUG-FR09-004: Backend trusts client-supplied totals

- Severity: Critical
- Requirement: FR-08/FR-09 require backend-side total calculation, not trusting client `total_amount`.
- Affected case: TC-FR09-UC-004.
- Expected: If the real cart total is 300,000 VND, a tampered client total of 3,000,000 VND must not affect discount or stored order total.
- Actual: Apply-coupon calculates from the tampered total, and checkout stores an order with `total_amount = 3,000,000`.
- Screenshot:

![BUG-FR09-004](screenshots/BUG-FR09-004.png)

### BUG-FR09-005: Orders do not store coupon or discount details

- Severity: Medium
- Requirement: Coupon checkout should create an order with applied coupon/discount information.
- Affected case: TC-FR09-ST-002.
- Expected: Checkout order persists coupon id and discount amount, and usage is recorded.
- Actual: Usage can be recorded, but the order row only contains `id`, `user_id`, `total_amount`, `status`, `shipping_address`, and `created_at`; no `coupon_id` or `discount_amount` fields are stored.
- Screenshot:

![BUG-FR09-005](screenshots/BUG-FR09-005.png)
