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
- **Nguyên nhân gốc rễ**: SQLite thực hiện so khớp chuỗi phân biệt chữ hoa/chữ thường theo mặc định đối với các so sánh bằng (`=`). Trong `backend/server.js:70`, câu lệnh SQL là:
  `db.get("SELECT * FROM users WHERE email = ?", [email], ...)`
  Do đó, khi so khớp `TEST@ESHOP.COM` với `test@eshop.com` trong cơ sở dữ liệu, kết quả trả về là rỗng. Server báo lỗi không tìm thấy người dùng.
  Để sửa lỗi này, nên chuẩn hóa email về dạng chữ thường (`email.toLowerCase()`) trước khi truy vấn hoặc đăng ký, hoặc dùng từ khóa `COLLATE NOCASE` trong định nghĩa bảng/câu lệnh SQL.

## Evidence
- API Test execution output:
  ```
  Testing TC-FORGOT-PASSWORD-025: Email đăng ký chữ thường nhưng yêu cầu bằng chữ hoa...
  FAILED: Error requesting OTP: 404
  ```
- Code file: [server.js:L70](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/backend/server.js#L70)
