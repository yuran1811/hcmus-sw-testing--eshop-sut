# [BUG][Forgot Password] Thiếu trường nhập "Xác nhận mật khẩu mới" ở Bước 2

## Found by Test Case

TC-FORGOT-PASSWORD-001, TC-FORGOT-PASSWORD-019, TC-FORGOT-PASSWORD-020

## Requirement liên quan

FR-03, FR-22

## Severity / Priority

Critical / P0

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/forgot-password
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce

1. Truy cập vào trang chủ EShop tại địa chỉ `http://localhost:5173`.
2. Nhấp vào liên kết "Đăng nhập" để chuyển sang trang Login.
3. Nhấp vào liên kết "Quên mật khẩu?".
4. Nhập email hợp lệ `test@eshop.com` và nhấn nút "Lấy mã OTP".
5. Hệ thống chuyển sang Bước 2.
6. Quan sát các trường nhập mật khẩu trên giao diện.

## Expected result

Giao diện Bước 2 của biểu mẫu Đặt lại mật khẩu phải hiển thị đầy đủ hai trường mật khẩu: "Mật khẩu mới" và "Xác nhận mật khẩu mới" để người dùng xác thực tính chính xác của mật khẩu.

## Actual result

Trường nhập "Xác nhận mật khẩu mới" hoàn toàn bị thiếu trên giao diện, chỉ hiển thị duy nhất trường "Mật khẩu mới". Do thiếu trường này, việc submit biểu mẫu đặt lại mật khẩu bị lỗi hoặc bị chặn.

## Evidence

- Recorded session: `file:///C:/Users/USER/.gemini/antigravity-ide/brain/74311d47-7ef9-45a5-a32b-c024bed6456a/forgot_password_run_1782640814592.webp`
- Screenshot Step 2: `file:///C:/Users/USER/.gemini/antigravity-ide/brain/74311d47-7ef9-45a5-a32b-c024bed6456a/forgot_password_step_2_1782640864386.png`
