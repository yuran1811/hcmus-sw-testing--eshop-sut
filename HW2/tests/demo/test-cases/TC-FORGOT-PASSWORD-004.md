# TC-FORGOT-PASSWORD-004: Step 1 - Email is unregistered in database

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning

## Preconditions

- The email `unregistered@eshop.com` does not exist in the database.
- Home page is running and accessible at `http://localhost:5173`.

## Test data

| Parameter | Value |
| --- | --- |
| email | `unregistered@eshop.com` |

## Test steps

1. Navigate to EShop home page at `http://localhost:5173`.
2. Click on the "Đăng nhập" link/button to open the Login page.
3. Click on the "Quên mật khẩu?" link.
4. Verify that the Forgot Password form is displayed with Step Indicator "Bước 1 / 2".
5. Enter `unregistered@eshop.com` into the Email input field.
6. Click the "Lấy mã OTP" submit button.

## Expected result

- The form submits, but the server returns an error.
- An error message "Email không tồn tại trong hệ thống" appears **above** the submit button.
- The system remains on Step 1 ("Bước 1 / 2").

## Status / Related bugs

Not Run / None
