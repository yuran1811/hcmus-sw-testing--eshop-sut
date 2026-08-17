# TC-USER-MANAGEMENT-001: Verify unauthenticated guest cannot access admin dashboard/user list

## Overview

| Field | Value |
| --- | --- |
| Case ID | F19-TC-001 |
| Feature | FR19 - Module User Management |
| Category | Access Control |
| Purpose | Verify unauthenticated guest cannot access admin dashboard/user list |
| Preconditions | SUT is running; admin fixture and user-management data are prepared when required. |
| Email | N/A |
| Password | N/A |
| Expected alert | N/A |
| Automation spec | HW4/tests/FR19_user_management.spec.ts |
| Data source | HW4/test-data/FR19_data.json |

## Test Steps

1. Open the admin frontend and navigate to the user-management flow required by this case.
2. Perform the access-control, table, delete, GUI, usability, or security action described by the purpose.
3. Observe UI state, API response, alert message, or persisted data after the action.

## Expected Result

The UI/API should satisfy the feature-specific oracle described by the purpose without exposing unsafe admin behavior.

## Automation Mapping

- Case ID in data file: `F19-TC-001`
- Executed by: `HW4/tests/FR19_user_management.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
