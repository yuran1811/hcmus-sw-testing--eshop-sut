# TC-ORDER-HISTORY-001: Verify unauthenticated user cannot view order history and is prompted to login

## Overview

| Field | Value |
| --- | --- |
| Case ID | F11-TC-001 |
| Feature | FR11 - Order history view (user) |
| Category | Access Control |
| Purpose | Verify unauthenticated user cannot view order history and is prompted to login |
| Preconditions | SUT is running and no authenticated session is required for this access-control case. |
| Email | N/A |
| Amount | 0 |
| Expected label | Vui lòng đăng nhập |
| Expected class | N/A |
| Automation spec | HW4/tests/FR11_order_history.spec.ts |
| Data source | HW4/test-data/FR11_data.json |

## Test Steps

1. Open order history without an authenticated user session.
2. Navigate to the user order-history page.
3. Inspect order rows, status labels, action buttons, navigation state, or empty-state content as required by the case.

## Expected Result

Expected label/message: `Vui lòng đăng nhập`.

## Automation Mapping

- Case ID in data file: `F11-TC-001`
- Executed by: `HW4/tests/FR11_order_history.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
