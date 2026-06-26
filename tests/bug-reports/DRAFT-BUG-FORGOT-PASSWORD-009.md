# [BUG][Forgot Password] Thiếu cơ chế khóa tài khoản sau 5 lần nhập sai mã OTP liên tiếp (Brute Force Protection)

## Found by Test Case
- TC-FORGOT-PASSWORD-030

## Requirement liên quan
- FR-03 (Forgot & Reset Password)

## Severity / Priority
- **Severity**: Critical
- **Priority**: P0

## Environment
- Browser: N/A (Backend API level)
- OS: Windows 11
- URL: http://localhost:3000/api/reset-password
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Yêu cầu gửi mã OTP cho email `test@eshop.com`.
2. Gửi liên tiếp 6 yêu cầu đặt lại mật khẩu với mã OTP sai (ví dụ: `9999`) và mật khẩu mới bất kỳ.
3. Thử đăng nhập lại vào tài khoản `test@eshop.com` bằng mật khẩu hiện tại (hoặc mật khẩu mới).
4. Quan sát xem tài khoản có bị khóa hay không.

## Expected result
- Sau 5 lần nhập sai mã OTP liên tiếp, hệ thống phải khóa tài khoản (hoặc chặn yêu cầu đặt lại mật khẩu) và báo lỗi tài khoản bị khóa để ngăn chặn tấn công dò mã OTP (Brute Force).

## Actual result
- Hệ thống không khóa tài khoản. Sau 5 hoặc thậm chí nhiều lần thử sai hơn, người dùng vẫn có thể thực hiện đăng nhập bình thường và tiếp tục thử các mã OTP khác.
- **Nguyên nhân gốc rễ**: API `/api/reset-password` tại `backend/server.js` không hề ghi nhận, tích lũy số lần thử sai của người dùng (`login_attempts` hay `otp_attempts`) cũng như không cập nhật trường `locked_until` khi phát hiện các yêu cầu sai liên tiếp. Người dùng có thể vô tư thực hiện brute-force đoán mã OTP 4 chữ số (chỉ có 10.000 khả năng) vô cùng dễ dàng và nhanh chóng.

## Evidence
- API Test execution output:
  ```
  Testing TC-FORGOT-PASSWORD-030: Khóa yêu cầu đặt lại mật khẩu sau 5 lần nhập sai mã OTP liên tiếp...
  Submitting 5 wrong OTPs...
  Submitted 6 attempts. Successes: 0, Failures: 6
  Failure responses: [ 400, 400, 400, 400, 400, 400 ]
  Login attempt result after wrong OTPs: 200 { message: 'Login successful', ... }
  FAILED: Account is NOT locked after 5 wrong OTP attempts (Login succeeded).
  ```
- Code file: [server.js:L87-98](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/backend/server.js#L87-98) thiếu logic xử lý tăng số lần nhập sai hoặc kiểm tra khóa tài khoản.
