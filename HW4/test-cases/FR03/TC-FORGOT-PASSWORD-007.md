# TC-FORGOT-PASSWORD-007: Đặt lại mật khẩu với mật khẩu mới quá ngắn (< 8 ký tự)

## Overview

| Field | Value |
| --- | --- |
| Case ID | F03-TC-007 |
| Feature | FR03 - Forgot password and password reset (two steps) |
| Category | Negative |
| Purpose | Đặt lại mật khẩu với mật khẩu mới quá ngắn (< 8 ký tự) |
| Preconditions | SUT is running; account or reset-flow fixture is prepared for email `user_f03_07@eshop.com` when the case requires an existing user. |
| Email | user_f03_07@eshop.com |
| New password | Sh 123 |
| Confirm password | Sh 123 |
| OTP type | valid |
| Expected error | Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT. |
| Expected route | N/A |
| Automation spec | HW4/tests/FR03_forgot_password.spec.ts |
| Data source | HW4/test-data/FR03_data.json |

## Test Steps

1. Open the forgot-password page from the web frontend.
2. Enter email value: `user_f03_07@eshop.com`.
3. Continue to the reset step using OTP mode: `valid`.
4. Enter new password: `Sh 123`.
5. Enter confirm password: `Sh 123`.
6. Submit the form and observe UI, browser validation, alert message, or navigation result.

## Expected Result

The flow should be rejected with expected result/message: `Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.`.

## Automation Mapping

- Case ID in data file: `F03-TC-007`
- Executed by: `HW4/tests/FR03_forgot_password.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
