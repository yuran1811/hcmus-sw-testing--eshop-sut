# TC-USER-MANAGEMENT-002: Verify standard user login is rejected on the admin login page

## Overview

| Field | Value |
| --- | --- |
| Case ID | F19-TC-002 |
| Feature | FR19 - Module User Management |
| Category | Access Control |
| Purpose | Verify standard user login is rejected on the admin login page |
| Preconditions | SUT is running; admin fixture is available; test user credential `test@eshop.com` is prepared when required. |
| Email | test@eshop.com |
| Password | (stored in test data for automation) |
| Expected alert | Bạn không phải là admin! |
| Automation spec | HW4/tests/FR19_user_management.spec.ts |
| Data source | HW4/test-data/FR19_data.json |

## Test Steps

1. Open the admin frontend and navigate to the user-management flow required by this case.
2. Use account/email: `test@eshop.com`.
3. Use the configured password from test data for the selected account.
4. Perform the access-control, table, delete, GUI, usability, or security action described by the purpose.
5. Observe UI state, API response, alert message, or persisted data after the action.

## Expected Result

Expected browser alert/message: `Bạn không phải là admin!`.

## Automation Mapping

- Case ID in data file: `F19-TC-002`
- Executed by: `HW4/tests/FR19_user_management.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
