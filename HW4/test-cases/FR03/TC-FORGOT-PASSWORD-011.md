# TC-FORGOT-PASSWORD-011: Đặt lại mật khẩu đúng đặc tả nhưng bị SUT từ chối do lỗi regex (Kiểm tra Bug Regex)

## Overview

| Field | Value |
| --- | --- |
| Case ID | F03-TC-011 |
| Feature | FR03 - Forgot password and password reset (two steps) |
| Category | Negative |
| Purpose | Đặt lại mật khẩu đúng đặc tả nhưng bị SUT từ chối do lỗi regex (Kiểm tra Bug Regex) |
| Preconditions | SUT is running; account or reset-flow fixture is prepared for email `user_f03_11@eshop.com` when the case requires an existing user. |
| Email | user_f03_11@eshop.com |
| New password | NewPass123! |
| Confirm password | NewPass123! |
| OTP type | valid |
| Expected error | N/A |
| Expected route | /login |
| Automation spec | HW4/tests/FR03_forgot_password.spec.ts |
| Data source | HW4/test-data/FR03_data.json |

## Test Steps

1. Open the forgot-password page from the web frontend.
2. Enter email value: `user_f03_11@eshop.com`.
3. Continue to the reset step using OTP mode: `valid`.
4. Enter new password: `NewPass123!`.
5. Enter confirm password: `NewPass123!`.
6. Submit the form and observe UI, browser validation, alert message, or navigation result.

## Expected Result

The flow should navigate to `/login` and show the expected successful recovery behavior.

## Automation Mapping

- Case ID in data file: `F03-TC-011`
- Executed by: `HW4/tests/FR03_forgot_password.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
