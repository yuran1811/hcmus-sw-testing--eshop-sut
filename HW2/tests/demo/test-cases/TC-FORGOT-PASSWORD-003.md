# TC-FORGOT-PASSWORD-003: Step 1 - Email field invalid format

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning & Boundary Value Analysis (2-Point)

## Preconditions

- Home page is running and accessible at `http://localhost:5173`.

## Test data

| Parameter | Value |
| --- | --- |
| email | `testeshop.com` |

## Test steps

1. Navigate to EShop home page at `http://localhost:5173`.
2. Click on the "Đăng nhập" link/button to open the Login page.
3. Click on the "Quên mật khẩu?" link.
4. Verify that the Forgot Password form is displayed with Step Indicator "Bước 1 / 2".
5. Enter `testeshop.com` into the Email input field.
6. Click the "Lấy mã OTP" submit button.

## Expected result

- The form is not submitted.
- A validation error message (e.g., "Email không đúng định dạng") appears **above** the submit button.

## Status / Related bugs

Not Run / None
