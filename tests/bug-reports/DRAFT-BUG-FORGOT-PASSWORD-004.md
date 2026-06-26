# [BUG][Forgot Password] Thiếu chỉ báo bước (Step Indicator) "Bước 1 / 2" và "Bước 2 / 2" trên giao diện

## Found by Test Case
- TC-FORGOT-PASSWORD-001
- TC-FORGOT-PASSWORD-002

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
2. Kiểm tra giao diện xem có hiển thị chỉ báo "Bước 1 / 2" hay không.
3. Nhập email hợp lệ và nhấp "Lấy mã OTP" để chuyển sang Bước 2.
4. Kiểm tra giao diện xem có hiển thị chỉ báo "Bước 2 / 2" hay không.

## Expected result
- Giao diện người dùng phải có chỉ báo bước rõ ràng như "Bước 1 / 2" ở Bước 1 và "Bước 2 / 2" ở Bước 2 để hướng dẫn người dùng qua luồng khôi phục mật khẩu.

## Actual result
- Không có bất kỳ chỉ báo bước nào hiển thị trên cả hai giao diện của Bước 1 và Bước 2. Người dùng không biết mình đang ở bước nào của quy trình.

## Evidence
- Browser recording session: [forgot_password_ui_exploration_1782468458161.webp](evidence/forgot_password_ui_exploration_1782468458161.webp)
- File source code: [ForgotPassword.jsx](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/frontend-web/src/pages/ForgotPassword.jsx)
