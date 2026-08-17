# [BUG][Forgot Password] API Quên mật khẩu phân biệt chữ hoa/chữ thường đối với Email đăng ký

## Found by Test Case
- TC-FORGOT-PASSWORD-025

## Requirement liên quan
- FR-03 (Forgot & Reset Password)

## Severity / Priority
- **Severity**: Major
- **Priority**: P1

## Environment
- Browser: N/A (Backend API level)
- OS: Windows 11
- URL: http://localhost:3000/api/forgot-password
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Gửi một yêu cầu POST tới địa chỉ `/api/forgot-password` với email viết hoa hoàn toàn: `{ "email": "TEST@ESHOP.COM" }`. (Tài khoản `test@eshop.com` đã tồn tại trong database ở dạng chữ thường).
2. Quan sát phản hồi từ server.

## Expected result
- Hệ thống phải xử lý email không phân biệt chữ hoa/chữ thường (case-insensitive). Yêu cầu OTP cho `TEST@ESHOP.COM` phải thành công vì `test@eshop.com` đã đăng ký.

## Actual result
- Server trả về mã lỗi 404 với thông điệp: `{ "error": "User not found" }`.
- **Nguyên nhân**: Hệ thống thực hiện kiểm tra so khớp email có phân biệt chữ hoa/chữ thường (case-sensitive) khi truy vấn tài khoản để gửi OTP. Do đó, email nhập dạng chữ hoa `TEST@ESHOP.COM` không khớp được với email đã lưu trong cơ sở dữ liệu dưới dạng chữ thường `test@eshop.com`.


## Evidence
- HTTP API Network Request & Response:
  ```http
  POST /api/forgot-password HTTP/1.1
  Content-Type: application/json

  { "email": "TEST@ESHOP.COM" }

  HTTP/1.1 404 Not Found
  Content-Type: application/json

  { "error": "User not found" }
  ```
- Kết xuất từ công cụ kiểm thử:
  ```text
  Testing TC-FORGOT-PASSWORD-025: Email đăng ký chữ thường nhưng yêu cầu bằng chữ hoa...
  FAILED: Error requesting OTP: 404
  ```
- Browser recording session showing validation block: [forgot_password_ui_exploration_1782468458161.webp](evidence/forgot_password_ui_exploration_1782468458161.webp)
