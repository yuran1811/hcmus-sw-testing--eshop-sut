# TC-ORDER-HISTORY-004: Verify total amount is correctly formatted with ₫ and thousands separator

## Overview

| Field | Value |
| --- | --- |
| Case ID | F11-TC-004 |
| Feature | FR11 - Order history view (user) |
| Category | Data Display |
| Purpose | Verify total amount is correctly formatted with ₫ and thousands separator |
| Preconditions | SUT is running; test account `user_f11_main@eshop.com` and required order fixture/state are prepared. |
| Email | user_f11_main@eshop.com |
| Amount | 100000 |
| Expected label | 100[.,]000 ₫ |
| Expected class | N/A |
| Automation spec | HW4/tests/FR11_order_history.spec.ts |
| Data source | HW4/test-data/FR11_data.json |

## Test Steps

1. Authenticate or prepare session for `user_f11_main@eshop.com`.
2. Navigate to the user order-history page.
3. Use/verify an order fixture with amount `100000`.
4. Inspect order rows, status labels, action buttons, navigation state, or empty-state content as required by the case.

## Expected Result

Expected label/message: `100[.,]000 ₫`.

## Automation Mapping

- Case ID in data file: `F11-TC-004`
- Executed by: `HW4/tests/FR11_order_history.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
