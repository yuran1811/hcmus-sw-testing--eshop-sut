# TC-FORGOT-PASSWORD-022: GUI - Input field types validation (email & password)

## Requirement ID

FR-22

## Module / Test type / Technique

forgot-password / GUI / Technical Inspection

## Preconditions

- User account with email `test@eshop.com` exists.
- Home page is running and accessible at `http://localhost:5173`.

## Test data

None

## Test steps

1. Navigate to EShop home page at `http://localhost:5173`.
2. Click on the "Đăng nhập" link/button to open the Login page.
3. Click on the "Quên mật khẩu?" link to open Forgot Password Step 1.
4. Inspect the DOM element for the Email input field. Verify it has the attribute `type="email"`.
5. Enter `test@eshop.com` into the Email field and click "Lấy mã OTP".
6. Wait for Step 2 interface to load.
7. Inspect the DOM element for the "Mật khẩu mới" input field. Verify it has the attribute `type="password"`.
8. Inspect the DOM element for the "Xác nhận mật khẩu mới" input field. Verify it has the attribute `type="password"`.

## Expected result

- The Email input element must have `type="email"`.
- The "Mật khẩu mới" and "Xác nhận mật khẩu mới" input elements must have `type="password"`, ensuring they do not display the password in plain text.

## Status / Related bugs

Not Run / None
