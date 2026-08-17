# TC-FORGOT-PASSWORD-001: Khôi phục mật khẩu thành công (End-to-End Happy Path tương thích SUT)

## Overview

| Field | Value |
| --- | --- |
| Case ID | F03-TC-001 |
| Feature | FR03 - Forgot password and password reset (two steps) |
| Category | Positive |
| Purpose | Khôi phục mật khẩu thành công (End-to-End Happy Path tương thích SUT) |
| Preconditions | SUT is running; account or reset-flow fixture is prepared for email `user_f03_01@eshop.com` when the case requires an existing user. |
| Email | user_f03_01@eshop.com |
| New password | New Pass123 |
| Confirm password | New Pass123 |
| OTP type | valid |
| Expected error | N/A |
| Expected route | /login |
| Automation spec | HW4/tests/FR03_forgot_password.spec.ts |
| Data source | HW4/test-data/FR03_data.json |

## Test Steps

1. Open the forgot-password page from the web frontend.
2. Enter email value: `user_f03_01@eshop.com`.
3. Continue to the reset step using OTP mode: `valid`.
4. Enter new password: `New Pass123`.
5. Enter confirm password: `New Pass123`.
6. Submit the form and observe UI, browser validation, alert message, or navigation result.

## Expected Result

The flow should navigate to `/login` and show the expected successful recovery behavior.

## Automation Mapping

- Case ID in data file: `F03-TC-001`
- Executed by: `HW4/tests/FR03_forgot_password.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
