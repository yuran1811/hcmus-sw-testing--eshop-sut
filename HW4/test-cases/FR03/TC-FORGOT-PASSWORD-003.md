# TC-FORGOT-PASSWORD-003: Yêu cầu OTP với email trống

## Overview

| Field | Value |
| --- | --- |
| Case ID | F03-TC-003 |
| Feature | FR03 - Forgot password and password reset (two steps) |
| Category | Negative |
| Purpose | Yêu cầu OTP với email trống |
| Preconditions | SUT is running and the forgot-password page is accessible. |
| Email | N/A |
| New password | N/A |
| Confirm password | N/A |
| OTP type | none |
| Expected error | browser-validation-required |
| Expected route | N/A |
| Automation spec | HW4/tests/FR03_forgot_password.spec.ts |
| Data source | HW4/test-data/FR03_data.json |

## Test Steps

1. Open the forgot-password page from the web frontend.
2. Enter email value: `(empty)`.
3. Submit the form and observe UI, browser validation, alert message, or navigation result.

## Expected Result

The flow should be rejected with expected result/message: `browser-validation-required`.

## Automation Mapping

- Case ID in data file: `F03-TC-003`
- Executed by: `HW4/tests/FR03_forgot_password.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
