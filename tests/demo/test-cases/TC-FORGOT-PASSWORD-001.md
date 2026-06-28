# TC-FORGOT-PASSWORD-001: Happy Path - Successful Forgot Password and Reset Flow

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning & Boundary Value Analysis

## Preconditions

- User account with email `test@eshop.com` exists in the database.
- Home page is running and accessible at `http://localhost:5173`.

## Test data

| Parameter | Value |
| --- | --- |
| email | `test@eshop.com` |
| otp | `123456` (representing correct generated OTP) |
| newPassword | `Reset123!` |
| confirmNewPassword | `Reset123!` |

## Test steps

1. Navigate to EShop home page at `http://localhost:5173`.
2. Click on the "Đăng nhập" (Login) link/button to open the Login page.
3. Click on the "Quên mật khẩu?" (Forgot Password) link.
4. Verify that the Forgot Password form is displayed with Step Indicator "Bước 1 / 2".
5. Verify that the "Quay lại đăng nhập" button is present and visible.
6. Enter `test@eshop.com` into the Email input field.
7. Click the "Lấy mã OTP" (Get OTP) submit button.
8. Verify that the system generates a 6-digit random OTP (displayed on screen in demo mode) and transitions to Step 2.
9. Verify that the Step Indicator now displays "Bước 2 / 2".
10. Enter the generated OTP (`123456`) into the OTP input field.
11. Enter `Reset123!` into the "Mật khẩu mới" (New Password) input field.
12. Enter `Reset123!` into the "Xác nhận mật khẩu mới" (Confirm New Password) input field.
13. Click the "Đặt lại mật khẩu" (Reset Password) submit button.

## Expected result

- Step 1: Transitions successfully to Step 2, displaying "Bước 2 / 2", showing the generated 6-digit OTP on screen.
- Step 2: The password is reset successfully in the system. The user is redirected to the Login page with a success message.

## Status / Related bugs

Not Run / None
