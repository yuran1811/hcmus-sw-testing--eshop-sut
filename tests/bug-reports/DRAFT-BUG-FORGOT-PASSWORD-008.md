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
- **Nguyên nhân**: Hệ thống chỉ thực hiện đối khớp mã OTP gửi lên với dữ liệu lưu trữ mà không hề lưu hoặc kiểm tra mốc thời gian hết hạn hay thời điểm tạo của OTP đó, dẫn đến mã OTP có hiệu lực vĩnh viễn và không bao giờ hết hạn.

## Evidence

- Kết quả truy vấn cấu trúc bảng `users` (`PRAGMA table_info(users)`):
  ```json
  [
    { "cid": 0, "name": "id", "type": "INTEGER" },
    { "cid": 1, "name": "name", "type": "TEXT" },
    { "cid": 2, "name": "email", "type": "TEXT" },
    { "cid": 3, "name": "password", "type": "TEXT" },
    { "cid": 4, "name": "role", "type": "TEXT" },
    { "cid": 5, "name": "login_attempts", "type": "INTEGER" },
    { "cid": 6, "name": "locked_until", "type": "DATETIME" },
    { "cid": 7, "name": "reset_token", "type": "TEXT" }, // Chỉ lưu OTP dưới dạng text
    { "cid": 8, "name": "shipping_address", "type": "TEXT" },
    { "cid": 9, "name": "phone", "type": "TEXT" }
  ]
  ```
  _(Quan sát: Bảng `users` hoàn toàn không có bất kỳ cột nào như `otp_created_at` hoặc `otp_expires_at` để đối chiếu thời gian hết hạn)._
