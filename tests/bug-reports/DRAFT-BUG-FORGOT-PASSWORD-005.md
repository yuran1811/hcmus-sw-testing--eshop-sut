# [BUG][Forgot Password] Thiếu nhãn dấu sao đỏ (*) biểu thị trường bắt buộc nhập

## Found by Test Case
- TC-FORGOT-PASSWORD-023

## Requirement liên quan
- FR-22 (Form & GUI specifications)

## Severity / Priority
- **Severity**: Minor
- **Priority**: P2

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/forgot-password
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Truy cập trang Quên mật khẩu tại `http://localhost:5173/forgot-password`.
2. Xem nhãn của trường "Nhập Email của bạn" tại Bước 1.
3. Đi tới Bước 2, xem nhãn các trường "Mã OTP", "Mật khẩu mới".

## Expected result
- Các trường bắt buộc nhập phải có dấu sao màu đỏ (`*`) hiển thị kế bên nhãn để biểu thị rõ ràng đó là trường bắt buộc (ví dụ: `Email *`, `Mã OTP *`, `Mật khẩu mới *`).

## Actual result
- Các nhãn hiển thị bình thường không có dấu sao đỏ (`*`) hay bất kỳ chỉ báo bắt buộc nào khác.

## Evidence
- Browser recording session: [forgot_password_ui_exploration_1782468458161.webp](evidence/forgot_password_ui_exploration_1782468458161.webp)
- File source code: [ForgotPassword.jsx](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/frontend-web/src/pages/ForgotPassword.jsx)
