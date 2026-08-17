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
- **Nguyên nhân**: Hệ thống không ghi nhận, tích lũy số lần thử nhập sai mã OTP của người dùng và không thực hiện khóa tài khoản/chặn yêu cầu khi phát hiện hành vi nhập sai liên tiếp, cho phép brute-force dò mã OTP 4 chữ số.

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

