# [BUG][Forgot Password] Thiếu trường nhập liệu "Xác nhận mật khẩu mới" tại Bước 2

## Found by Test Case
- TC-FORGOT-PASSWORD-002
- TC-FORGOT-PASSWORD-020
- TC-FORGOT-PASSWORD-021

## Requirement liên quan
- FR-03 (Forgot & Reset Password)
- FR-22 (Form & GUI specifications)

## Severity / Priority
- **Severity**: Critical
- **Priority**: P0

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/forgot-password
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Truy cập trang chủ EShop tại `http://localhost:5173`.
2. Nhấp vào liên kết "Đăng nhập" để mở trang login.
3. Nhấp vào "Quên mật khẩu?" để chuyển sang giao diện Quên mật khẩu.
4. Nhập email hợp lệ `test@eshop.com` và nhấp "Lấy mã OTP".
5. Sau khi hệ thống chuyển sang Bước 2, quan sát các trường nhập liệu trên giao diện.

## Expected result
- Giao diện phải hiển thị đầy đủ các trường: "Mã OTP", "Mật khẩu mới", và "Xác nhận mật khẩu mới" (Confirm Password) để người dùng xác nhận lại mật khẩu trước khi lưu.

## Actual result
- Hoàn toàn thiếu trường nhập liệu "Xác nhận mật khẩu mới" (Confirm Password). Giao diện chỉ hiển thị trường "Mã OTP (4 số)" và "Mật khẩu mới".

## Evidence
- Browser recording session: [forgot_password_ui_exploration_1782468458161.webp](evidence/forgot_password_ui_exploration_1782468458161.webp)
- Screenshot of Step 2 UI: [forgot_password_step2_1782468494724.png](evidence/forgot_password_step2_1782468494724.png)
