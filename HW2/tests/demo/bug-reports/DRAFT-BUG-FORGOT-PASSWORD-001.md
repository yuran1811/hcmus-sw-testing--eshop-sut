# [BUG][Forgot Password] Hệ thống sinh mã OTP 4 số thay vì 6 số

## Found by Test Case

TC-FORGOT-PASSWORD-001, TC-FORGOT-PASSWORD-007, TC-FORGOT-PASSWORD-008

## Requirement liên quan

FR-03

## Severity / Priority

Major / P1

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
5. Hệ thống chuyển sang Bước 2 và hiển thị mã OTP trên màn hình (chế độ demo).
6. Quan sát độ dài của mã OTP được tạo ra.

## Expected result

Hệ thống phải sinh mã OTP ngẫu nhiên gồm đúng 6 chữ số (ví dụ: `123456`) theo đúng đặc tả yêu cầu kỹ thuật của FR-03.

## Actual result

Hệ thống sinh mã OTP chỉ gồm 4 chữ số (ví dụ: `7843`), và nhãn trường nhập mã cũng hiển thị là "Mã OTP (4 số)".

## Evidence

- Recorded session: `file:///C:/Users/USER/.gemini/antigravity-ide/brain/74311d47-7ef9-45a5-a32b-c024bed6456a/forgot_password_run_1782640814592.webp`
- Screenshot Step 2: `file:///C:/Users/USER/.gemini/antigravity-ide/brain/74311d47-7ef9-45a5-a32b-c024bed6456a/forgot_password_step_2_1782640864386.png`
