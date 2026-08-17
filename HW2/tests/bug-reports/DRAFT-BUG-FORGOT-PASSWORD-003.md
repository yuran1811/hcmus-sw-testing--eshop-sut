# [BUG][Forgot Password] Hệ thống sinh mã OTP 4 chữ số thay vì 6 chữ số theo đặc tả yêu cầu

## Found by Test Case

- TC-FORGOT-PASSWORD-001
- TC-FORGOT-PASSWORD-002
- TC-FORGOT-PASSWORD-008
- TC-FORGOT-PASSWORD-009

## Requirement liên quan

- FR-03 (Forgot & Reset Password)

## Severity / Priority

- **Severity**: Major
- **Priority**: P1

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/forgot-password
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce

1. Truy cập trang Quên mật khẩu tại `http://localhost:5173/forgot-password`.
2. Nhập email hợp lệ `test@eshop.com` và nhấp "Lấy mã OTP".
3. Nhìn vào mã OTP hiển thị trên thông báo màu xanh lá cây của môi trường demo.

## Expected result

- Hệ thống phải sinh ra và hiển thị mã OTP ngẫu nhiên gồm đúng 6 chữ số (ví dụ: `123456`).

## Actual result

- Hệ thống chỉ sinh ra mã OTP gồm 4 chữ số (ví dụ: `7268` hoặc `4064`).
- **Nguyên nhân**: Hệ thống chỉ sinh ra các số ngẫu nhiên có độ dài 4 chữ số (trong khoảng từ 1000 đến 9999) thay vì sinh ra mã OTP có độ dài 6 chữ số như quy định của đặc tả yêu cầu.


## Evidence

- Screenshot of Step 2 showing the 4-digit OTP generated in the green banner: [forgot_password_step2_1782468494724.png](evidence/forgot_password_step2_1782468494724.png)
- Browser recording session showing 4-digit OTP: [forgot_password_ui_exploration_1782468458161.webp](evidence/forgot_password_ui_exploration_1782468458161.webp)

