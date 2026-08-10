# TC-ORDER-HISTORY-008: Verify delivered status displays 'Đã giao' with green styling

## Overview

| Field | Value |
| --- | --- |
| Case ID | F11-TC-008 |
| Feature | FR11 - Order history view (user) |
| Category | Status & Color |
| Purpose | Verify delivered status displays 'Đã giao' with green styling |
| Preconditions | SUT is running; test account `user_f11_main@eshop.com` and required order fixture/state are prepared. |
| Email | user_f11_main@eshop.com |
| Amount | 400000 |
| Expected label | Đã giao |
| Expected class | bg-green-100 text-green-800 |
| Automation spec | HW4/tests/FR11_order_history.spec.ts |
| Data source | HW4/test-data/FR11_data.json |

## Test Steps

1. Authenticate or prepare session for `user_f11_main@eshop.com`.
2. Navigate to the user order-history page.
3. Use/verify an order fixture with amount `400000`.
4. Inspect order rows, status labels, action buttons, navigation state, or empty-state content as required by the case.

## Expected Result

Expected label/message: `Đã giao`. Expected CSS class/styling: `bg-green-100 text-green-800`.

## Automation Mapping

- Case ID in data file: `F11-TC-008`
- Executed by: `HW4/tests/FR11_order_history.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
