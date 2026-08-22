Title: [BUG][Forgot Password] Bỏ qua kiểm tra khóa tài khoản, cho phép reset mật khẩu mà không xóa trạng thái khóa

## Found by Test Case
TC-FORGOT-041 (Human Extended Test Case)

## Requirement liên quan
FR-02 (Account Lockout), FR-03 (Password Reset), OWASP ASVS V3.2

## Severity / Priority
Major / P2

## Environment
- OS: Windows 11 / Linux Ubuntu 22.04
- SUT Base URL: `http://localhost:3000`
- Target Endpoint: `POST /api/forgot-password` & `POST /api/reset-password`
- Tool: Postman v10+ / Newman CLI v6.2.2

## Steps to reproduce
1. Gửi 3 lần đăng nhập sai mật khẩu liên tiếp đến `/api/login` để tài khoản rơi vào trạng thái khóa tạm thời (`locked_until > now`, `login_attempts >= 3`).
2. Gửi request `POST /api/forgot-password` với email của tài khoản đang bị khóa.
3. Lấy `resetToken` nhận được và gọi tiếp `POST /api/reset-password` với mật khẩu mới.
4. Kiểm tra trường `locked_until` và `login_attempts` trong database sau khi reset mật khẩu thành công.

## Expected result
- Hoặc hệ thống phải từ chối yêu cầu reset mật khẩu khi tài khoản đang bị khóa (`403 Forbidden` / `423 Locked`).
- Hoặc nếu cho phép reset mật khẩu thì sau khi reset thành công, hệ thống phải **xóa bỏ cờ `locked_until` và reset `login_attempts = 0`** để người dùng có thể đăng nhập lại bình thường.

## Actual result
- `POST /api/forgot-password` tại `server.js:68` không kiểm tra `locked_until`, vẫn cấp OTP bình thường.
- `POST /api/reset-password` tại `server.js:90` chỉ cập nhật:
  ```sql
  UPDATE users SET password = ?, reset_token = NULL WHERE email = ? AND reset_token = ?
  ```
  Hệ thống **không hề xóa cờ `locked_until` hay `login_attempts`**, khiến tài khoản sau khi đổi mật khẩu mới xong vẫn tiếp tục bị khóa và không thể đăng nhập được.

## Evidence
- Mã nguồn tại `backend/server.js:68-98`:
  - Dòng 68: Thiếu kiểm tra `user.locked_until`.
  - Dòng 90: Thiếu cập nhật `login_attempts = 0, locked_until = NULL`.
