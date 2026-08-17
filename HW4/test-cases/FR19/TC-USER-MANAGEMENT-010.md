# TC-USER-MANAGEMENT-010: Verify admin can successfully delete a standard user

## Overview

| Field | Value |
| --- | --- |
| Case ID | F19-TC-010 |
| Feature | FR19 - Module User Management |
| Category | Functional |
| Purpose | Verify admin can successfully delete a standard user |
| Preconditions | SUT is running; admin fixture is available; test user credential `user_f19_delete@eshop.com` is prepared when required. |
| Email | user_f19_delete@eshop.com |
| Password | (stored in test data for automation) |
| Expected alert | N/A |
| Automation spec | HW4/tests/FR19_user_management.spec.ts |
| Data source | HW4/test-data/FR19_data.json |

## Test Steps

1. Open the admin frontend and navigate to the user-management flow required by this case.
2. Use account/email: `user_f19_delete@eshop.com`.
3. Use the configured password from test data for the selected account.
4. Perform the access-control, table, delete, GUI, usability, or security action described by the purpose.
5. Observe UI state, API response, alert message, or persisted data after the action.

## Expected Result

The UI/API should satisfy the feature-specific oracle described by the purpose without exposing unsafe admin behavior.

## Automation Mapping

- Case ID in data file: `F19-TC-010`
- Executed by: `HW4/tests/FR19_user_management.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
