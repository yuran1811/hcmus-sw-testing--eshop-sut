# TC-FORGOT-PASSWORD-019: Kiểm tra vị trí hiển thị thông báo lỗi trên nút submit

## Overview

| Field | Value |
| --- | --- |
| Case ID | F03-TC-019 |
| Feature | FR03 - Forgot password and password reset (two steps) |
| Category | GUI |
| Purpose | Kiểm tra vị trí hiển thị thông báo lỗi trên nút submit |
| Preconditions | SUT is running; account or reset-flow fixture is prepared for email `user_f03_19@eshop.com` when the case requires an existing user. |
| Email | user_f03_19@eshop.com |
| New password | N/A |
| Confirm password | N/A |
| OTP type | none |
| Expected error | N/A |
| Expected route | N/A |
| Automation spec | HW4/tests/FR03_forgot_password.spec.ts |
| Data source | HW4/test-data/FR03_data.json |

## Test Steps

1. Open the forgot-password page from the web frontend.
2. Enter email value: `user_f03_19@eshop.com`.
3. Submit the form and observe UI, browser validation, alert message, or navigation result.

## Expected Result

The UI/API should satisfy the feature-specific oracle described by the purpose without unexpected navigation or unhandled errors.

## Automation Mapping

- Case ID in data file: `F03-TC-019`
- Executed by: `HW4/tests/FR03_forgot_password.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
