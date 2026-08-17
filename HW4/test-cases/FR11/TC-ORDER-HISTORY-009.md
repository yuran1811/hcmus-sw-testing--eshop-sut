# TC-ORDER-HISTORY-009: Verify canceled status displays 'Đã hủy' with red styling

## Overview

| Field | Value |
| --- | --- |
| Case ID | F11-TC-009 |
| Feature | FR11 - Order history view (user) |
| Category | Status & Color |
| Purpose | Verify canceled status displays 'Đã hủy' with red styling |
| Preconditions | SUT is running; test account `user_f11_main@eshop.com` and required order fixture/state are prepared. |
| Email | user_f11_main@eshop.com |
| Amount | 500000 |
| Expected label | Đã hủy |
| Expected class | bg-red-100 text-red-800 |
| Automation spec | HW4/tests/FR11_order_history.spec.ts |
| Data source | HW4/test-data/FR11_data.json |

## Test Steps

1. Authenticate or prepare session for `user_f11_main@eshop.com`.
2. Navigate to the user order-history page.
3. Use/verify an order fixture with amount `500000`.
4. Inspect order rows, status labels, action buttons, navigation state, or empty-state content as required by the case.

## Expected Result

Expected label/message: `Đã hủy`. Expected CSS class/styling: `bg-red-100 text-red-800`.

## Automation Mapping

- Case ID in data file: `F11-TC-009`
- Executed by: `HW4/tests/FR11_order_history.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
