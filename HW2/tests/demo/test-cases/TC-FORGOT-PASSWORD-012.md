# TC-FORGOT-PASSWORD-012: Step 2 - Password field is empty

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Boundary Value Analysis (2-Point) & Error Isolation

## Preconditions

- User account with email `test@eshop.com` exists.
- Home page is running and accessible at `http://localhost:5173`.
- Step 1 has been completed successfully using `test@eshop.com`, and Step 2 form is displayed.

## Test data

| Parameter | Value |
| --- | --- |
| email | `test@eshop.com` (Baseline) |
| otp | `123456` (Baseline) |
| newPassword | `""` (Empty string) |
| confirmNewPassword | `Reset123!` (Baseline) |

## Test steps

1. Navigate to EShop home page at `http://localhost:5173`.
2. Click on the "Đăng nhập" link/button to open the Login page.
3. Click on the "Quên mật khẩu?" link.
4. Enter `test@eshop.com` into the Email input field and click "Lấy mã OTP".
5. Wait for Step 2 interface to load.
6. Enter `123456` into the OTP input field.
7. Leave the "Mật khẩu mới" input field empty.
8. Enter `Reset123!` into the "Xác nhận mật khẩu mới" input field.
9. Click the "Đặt lại mật khẩu" submit button.

## Expected result

- The form is not submitted.
- A validation error message (e.g., "Mật khẩu mới không được để trống") appears **above** the submit button.

## Status / Related bugs

Not Run / None
