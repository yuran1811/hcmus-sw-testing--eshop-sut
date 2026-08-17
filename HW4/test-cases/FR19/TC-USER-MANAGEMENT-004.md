# TC-USER-MANAGEMENT-004: Verify guest call to GET /api/admin/users returns 401

## Overview

| Field | Value |
| --- | --- |
| Case ID | F19-TC-004 |
| Feature | FR19 - Module User Management |
| Category | Access Control (API) |
| Purpose | Verify guest call to GET /api/admin/users returns 401 |
| Preconditions | SUT is running; admin fixture and user-management data are prepared when required. |
| Email | N/A |
| Password | N/A |
| Expected alert | N/A |
| Automation spec | HW4/tests/FR19_user_management.spec.ts |
| Data source | HW4/test-data/FR19_data.json |

## Test Steps

1. Call the related backend admin API endpoint using the role/session required by this case.
2. Perform the access-control, table, delete, GUI, usability, or security action described by the purpose.
3. Observe UI state, API response, alert message, or persisted data after the action.

## Expected Result

The request should be rejected as unauthenticated with HTTP 401.

## Automation Mapping

- Case ID in data file: `F19-TC-004`
- Executed by: `HW4/tests/FR19_user_management.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
