# TC-ORDER-HISTORY-018: Verify logout button label is 'Đăng xuất'

## Overview

| Field | Value |
| --- | --- |
| Case ID | F11-TC-018 |
| Feature | FR11 - Order history view (user) |
| Category | Navigation & GUI |
| Purpose | Verify logout button label is 'Đăng xuất' |
| Preconditions | SUT is running; test account `user_f11_main@eshop.com` and required order fixture/state are prepared. |
| Email | user_f11_main@eshop.com |
| Amount | 0 |
| Expected label | Đăng xuất |
| Expected class | N/A |
| Automation spec | HW4/tests/FR11_order_history.spec.ts |
| Data source | HW4/test-data/FR11_data.json |

## Test Steps

1. Authenticate or prepare session for `user_f11_main@eshop.com`.
2. Navigate to the user order-history page.
3. Inspect order rows, status labels, action buttons, navigation state, or empty-state content as required by the case.

## Expected Result

Expected label/message: `Đăng xuất`.

## Automation Mapping

- Case ID in data file: `F11-TC-018`
- Executed by: `HW4/tests/FR11_order_history.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
