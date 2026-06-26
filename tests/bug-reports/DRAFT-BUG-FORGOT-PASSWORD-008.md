# [BUG][Forgot Password] Mã OTP không có cơ chế hết hạn (hết hiệu lực) theo thời gian

## Found by Test Case
- TC-FORGOT-PASSWORD-026

## Requirement liên quan
- FR-03 (Forgot & Reset Password)

## Severity / Priority
- **Severity**: Major
- **Priority**: P1

## Environment
- Browser: N/A (Backend API level)
- OS: Windows 11
- URL: http://localhost:3000/api/reset-password
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Gửi yêu cầu OTP cho email `test@eshop.com` để sinh mã OTP.
2. Đợi một khoảng thời gian dài (ví dụ: 1 tiếng hoặc thậm chí vài ngày).
3. Gửi yêu cầu Đặt lại mật khẩu sử dụng mã OTP đã sinh ra đó.
4. Quan sát phản hồi từ server.

## Expected result
- Mã OTP phải hết hạn sau một khoảng thời gian ngắn quy định (ví dụ: 5 phút). Yêu cầu đặt lại mật khẩu bằng mã OTP đã hết hạn phải bị từ chối với thông báo lỗi rõ ràng.

## Actual result
- Server xử lý đặt lại mật khẩu thành công bất kể thời gian trôi qua bao lâu.
- **Nguyên nhân gốc rễ**: Tại `backend/server.js:73-75`, hệ thống chỉ lưu trường `reset_token` vào bảng `users` mà không lưu thời điểm tạo (`otp_created_at` hoặc `otp_expires_at`).
  Tại `backend/server.js:87-98` (API reset-password), hệ thống chỉ đối chiếu xem `reset_token` gửi lên có khớp với `reset_token` trong cơ sở dữ liệu hay không mà không hề kiểm tra tính hiệu lực về mặt thời gian của mã đó. Điều này tạo ra rủi ro bảo mật nghiêm trọng nếu hacker có được mã OTP cũ.

## Evidence
- Database schema tại [database.js:L50-61](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/backend/database.js#L50-61) thiếu cột lưu thời gian của OTP.
- Code API reset-password tại [server.js:L87-98](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/backend/server.js#L87-98) thiếu kiểm tra thời gian hết hạn.
