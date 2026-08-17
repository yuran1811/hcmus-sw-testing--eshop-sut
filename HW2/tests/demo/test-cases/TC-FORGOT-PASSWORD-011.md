# TC-FORGOT-PASSWORD-011: Step 2 - OTP requested for a different email address

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning & Error Isolation

## Preconditions

- User accounts with email `test@eshop.com` and `other@eshop.com` exist.
- Home page is running and accessible at `http://localhost:5173`.

## Test data

| Parameter | Value |
| --- | --- |
| email | `test@eshop.com` |
| otp | OTP generated for `other@eshop.com` |
| newPassword | `Reset123!` (Baseline) |
| confirmNewPassword | `Reset123!` (Baseline) |

## Test steps

1. Navigate to EShop home page at `http://localhost:5173`.
2. Click on the "Đăng nhập" link/button to open the Login page.
3. Click on the "Quên mật khẩu?" link.
4. Enter `other@eshop.com` into the Email input field and click "Lấy mã OTP".
5. Copy the OTP generated for `other@eshop.com`.
6. Click "Quay lại đăng nhập", then "Quên mật khẩu?" again to start over.
7. Enter `test@eshop.com` into the Email input field and click "Lấy mã OTP".
8. Wait for Step 2 interface to load.
9. Enter the copied OTP (which was generated for `other@eshop.com`) into the OTP input field.
10. Enter `Reset123!` into the "Mật khẩu mới" input field.
11. Enter `Reset123!` into the "Xác nhận mật khẩu mới" input field.
12. Click the "Đặt lại mật khẩu" submit button.

## Expected result

- The form is submitted, but the server rejects the request.
- An error message "Mã OTP không chính xác" (or "Mã OTP không hợp lệ cho email này") appears **above** the submit button.
- The system remains on Step 2 ("Bước 2 / 2").

## Status / Related bugs

Not Run / None
