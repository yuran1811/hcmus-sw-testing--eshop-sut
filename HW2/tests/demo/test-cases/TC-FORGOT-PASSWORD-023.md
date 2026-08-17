# TC-FORGOT-PASSWORD-023: GUI - Error message positioning validation

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
4. Click the "Lấy mã OTP" submit button without entering any email (triggering validation error).
5. Verify the location of the displayed error message in relation to the "Lấy mã OTP" submit button.
6. Enter `test@eshop.com` and click "Lấy mã OTP" to proceed to Step 2.
7. Click the "Đặt lại mật khẩu" submit button without entering any inputs (triggering validation errors).
8. Verify the location of the displayed error messages in relation to the "Đặt lại mật khẩu" submit button.

## Expected result

- In both Step 1 and Step 2, any validation error messages that appear on the screen must be positioned visually **above** the respective submit button (e.g. "Lấy mã OTP" and "Đặt lại mật khẩu"), not below them.

## Status / Related bugs

Not Run / None
