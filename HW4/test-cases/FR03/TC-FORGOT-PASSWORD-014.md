# TC-FORGOT-PASSWORD-014: SQL Injection trong trường Email ở Bước 1

## Overview

| Field | Value |
| --- | --- |
| Case ID | F03-TC-014 |
| Feature | FR03 - Forgot password and password reset (two steps) |
| Category | Security |
| Purpose | SQL Injection trong trường Email ở Bước 1 |
| Preconditions | SUT is running; account or reset-flow fixture is prepared for email `' OR '1'='1` when the case requires an existing user. |
| Email | ' OR '1'='1 |
| New password | N/A |
| Confirm password | N/A |
| OTP type | none |
| Expected error | User not found |
| Expected route | N/A |
| Automation spec | HW4/tests/FR03_forgot_password.spec.ts |
| Data source | HW4/test-data/FR03_data.json |

## Test Steps

1. Open the forgot-password page from the web frontend.
2. Enter email value: `' OR '1'='1`.
3. Submit the form and observe UI, browser validation, alert message, or navigation result.

## Expected Result

The flow should be rejected with expected result/message: `User not found`.

## Automation Mapping

- Case ID in data file: `F03-TC-014`
- Executed by: `HW4/tests/FR03_forgot_password.spec.ts`
- Browser matrix: Chromium, Firefox, WebKit through `npm run test:matrix`.
