# TC-FORGOT-PASSWORD-012: Đặt lại mật khẩu với Xác nhận mật khẩu không khớp

## Overview

| Field | Value |
| --- | --- |
| Case ID | F03-TC-012 |
| Feature | FR03 - Forgot password and password reset (two steps) |
| Category | Negative |
| Purpose | Đặt lại mật khẩu với Xác nhận mật khẩu không khớp |
| Preconditions | SUT is running; account or reset-flow fixture is prepared for email `user_f03_12@eshop.com` when the case requires an existing user. |
| Email | user_f03_12@eshop.com |
| New password | New Pass123 |
| Confirm password | Different Pass |
| OTP type | valid |
| Expected error | Mật khẩu không khớp |
| Expected route | N/A |
| Automation spec | HW4/tests/FR03_forgot_password.spec.ts |
| Data source | HW4/test-data/FR03_data.json |

## Test Steps

1. Open the forgot-password page from the web frontend.
2. Enter email value: `user_f03_12@eshop.com`.
3. Continue to the reset step using OTP mode: `valid`.
4. Enter new password: `New Pass123`.
5. Enter confirm password: `Different Pass`.
6. Submit the form and observe UI, browser validation, alert message, or navigation result.

## Expected Result

The flow should be rejected with expected result/message: `Mật khẩu không khớp`.

## Automation Mapping

- Case ID in data file: `F03-TC-012`
- Executed by: `HW4/tests/FR03_forgot_password.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
