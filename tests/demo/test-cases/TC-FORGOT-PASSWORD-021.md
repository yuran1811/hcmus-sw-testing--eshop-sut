# TC-FORGOT-PASSWORD-021: GUI - Required fields asterisk validation

## Requirement ID

FR-22

## Module / Test type / Technique

forgot-password / GUI / Visual Inspection

## Preconditions

- User account with email `test@eshop.com` exists.
- Home page is running and accessible at `http://localhost:5173`.

## Test data

None

## Test steps

1. Navigate to EShop home page at `http://localhost:5173`.
2. Click on the "Đăng nhập" link/button to open the Login page.
3. Click on the "Quên mật khẩu?" link to open Forgot Password Step 1.
4. Verify that the label next to the Email input field has a red asterisk `*` (e.g., "Email *").
5. Enter `test@eshop.com` into the Email field and click "Lấy mã OTP".
6. Wait for Step 2 interface to load.
7. Verify that the label next to the OTP input field has a red asterisk `*` (e.g., "Mã OTP *").
8. Verify that the label next to the "Mật khẩu mới" input field has a red asterisk `*` (e.g., "Mật khẩu mới *").
9. Verify that the label next to the "Xác nhận mật khẩu mới" input field has a red asterisk `*` (e.g., "Xác nhận mật khẩu mới *").

## Expected result

- All mandatory input fields (Email in Step 1, and OTP, Mật khẩu mới, Xác nhận mật khẩu mới in Step 2) display the required asterisk `*` next to their respective labels.

## Status / Related bugs

Not Run / None
