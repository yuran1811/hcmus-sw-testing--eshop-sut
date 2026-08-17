# TC-FORGOT-PASSWORD-020: Đặt lại mật khẩu với mật khẩu mới cực dài (Boundary)

## Overview

| Field | Value |
| --- | --- |
| Case ID | F03-TC-020 |
| Feature | FR03 - Forgot password and password reset (two steps) |
| Category | Positive |
| Purpose | Đặt lại mật khẩu với mật khẩu mới cực dài (Boundary) |
| Preconditions | SUT is running; account or reset-flow fixture is prepared for email `user_f03_20@eshop.com` when the case requires an existing user. |
| Email | user_f03_20@eshop.com |
| New password | A bcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1 |
| Confirm password | A bcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1 |
| OTP type | valid |
| Expected error | N/A |
| Expected route | /login |
| Automation spec | HW4/tests/FR03_forgot_password.spec.ts |
| Data source | HW4/test-data/FR03_data.json |

## Test Steps

1. Open the forgot-password page from the web frontend.
2. Enter email value: `user_f03_20@eshop.com`.
3. Continue to the reset step using OTP mode: `valid`.
4. Enter new password: `A bcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1`.
5. Enter confirm password: `A bcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1`.
6. Submit the form and observe UI, browser validation, alert message, or navigation result.

## Expected Result

The flow should navigate to `/login` and show the expected successful recovery behavior.

## Automation Mapping

- Case ID in data file: `F03-TC-020`
- Executed by: `HW4/tests/FR03_forgot_password.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
