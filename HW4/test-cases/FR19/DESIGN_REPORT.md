# FR-19 Module User Management - Test Case Design Report

Feature: Module User Management
Feature code: FR19
Total designed test cases: 16
Automation spec: `HW4/tests/FR19_user_management.spec.ts`
Data file: `HW4/test-data/FR19_data.json`

## Design Summary

| Category | Count |
| --- | ---: |
| Access Control | 3 |
| Access Control (API) | 3 |
| User List | 1 |
| Security | 2 |
| GUI Standards | 3 |
| Functional | 2 |
| Functional (API) | 1 |
| Usability | 1 |

## Traceability

| Case ID | Test case file | Category | Purpose |
| --- | --- | --- | --- |
| F19-TC-001 | [TC-USER-MANAGEMENT-001.md](./TC-USER-MANAGEMENT-001.md) | Access Control | Verify unauthenticated guest cannot access admin dashboard/user list |
| F19-TC-002 | [TC-USER-MANAGEMENT-002.md](./TC-USER-MANAGEMENT-002.md) | Access Control | Verify standard user login is rejected on the admin login page |
| F19-TC-003 | [TC-USER-MANAGEMENT-003.md](./TC-USER-MANAGEMENT-003.md) | Access Control | Verify admin user can log in successfully to the admin console |
| F19-TC-004 | [TC-USER-MANAGEMENT-004.md](./TC-USER-MANAGEMENT-004.md) | Access Control (API) | Verify guest call to GET /api/admin/users returns 401 |
| F19-TC-005 | [TC-USER-MANAGEMENT-005.md](./TC-USER-MANAGEMENT-005.md) | Access Control (API) | Verify standard user call to GET /api/admin/users returns 403 |
| F19-TC-006 | [TC-USER-MANAGEMENT-006.md](./TC-USER-MANAGEMENT-006.md) | Access Control (API) | Verify standard user call to DELETE /api/admin/users/:id returns 403 |
| F19-TC-007 | [TC-USER-MANAGEMENT-007.md](./TC-USER-MANAGEMENT-007.md) | User List | Verify user list table header columns and rows are displayed correctly |
| F19-TC-008 | [TC-USER-MANAGEMENT-008.md](./TC-USER-MANAGEMENT-008.md) | Security | Verify that user passwords are not exposed in frontend UI or API responses |
| F19-TC-009 | [TC-USER-MANAGEMENT-009.md](./TC-USER-MANAGEMENT-009.md) | GUI Standards | Verify Vietnamese language consistency for user list page elements |
| F19-TC-010 | [TC-USER-MANAGEMENT-010.md](./TC-USER-MANAGEMENT-010.md) | Functional | Verify admin can successfully delete a standard user |
| F19-TC-011 | [TC-USER-MANAGEMENT-011.md](./TC-USER-MANAGEMENT-011.md) | Functional | Verify admin is prevented from self-deleting on the user management UI |
| F19-TC-012 | [TC-USER-MANAGEMENT-012.md](./TC-USER-MANAGEMENT-012.md) | Functional (API) | Verify backend API prevents admin from self-deleting (returns 400 or 403) |
| F19-TC-013 | [TC-USER-MANAGEMENT-013.md](./TC-USER-MANAGEMENT-013.md) | GUI Standards | Verify that the delete action button uses red background color |
| F19-TC-014 | [TC-USER-MANAGEMENT-014.md](./TC-USER-MANAGEMENT-014.md) | GUI Standards | Verify page content title uses exactly one h1 describing the content |
| F19-TC-015 | [TC-USER-MANAGEMENT-015.md](./TC-USER-MANAGEMENT-015.md) | Usability | Verify tab key navigation order is top-to-bottom, left-to-right |
| F19-TC-016 | [TC-USER-MANAGEMENT-016.md](./TC-USER-MANAGEMENT-016.md) | Security | Verify user name/phone containing XSS scripts is escaped safely on the UI |

## Automation Notes

- These design files are the human-readable source of the automated scenarios.
- Primitive input and expected values are synchronized with the external JSON data file.
- The Playwright spec converts these cases into executable data-driven tests across Chromium, Firefox, and WebKit.
