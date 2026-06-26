# TC-FORGOT-PASSWORD-018: Bước 2 - Mật khẩu mới thiếu ký tự đặc biệt (Equivalence Partitioning - Weak Password)

## Requirement ID

FR-03, FR-22

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning (Weak Password - No Special Char)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2.

## Test data

| Parameter | Value |
| --- | --- |
| otp | 123456 (đúng) |
| newPassword | Reset1234 (thiếu ký tự đặc biệt) |
| confirmNewPassword | Reset1234 (thiếu ký tự đặc biệt) |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Nhập mã OTP đúng `123456`.
3. Nhập mật khẩu mới `Reset1234` vào trường Mật khẩu mới.
4. Nhập mật khẩu xác nhận `Reset1234` vào trường Xác nhận mật khẩu.
5. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống chặn submit và hiển thị lỗi: "Mật khẩu mới phải chứa ít nhất 1 ký tự đặc biệt trong tập hợp [@, $, !, %, *, ?, &]".
- Thông báo lỗi hiển thị ngay **phía trên** nút submit.

## Status / Related bugs

Not Run / None
