# TC-FORGOT-PASSWORD-021: Bước 2 - Xác nhận mật khẩu không trùng khớp mật khẩu mới (Equivalence Partitioning - Mismatched Passwords)

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning (Mismatched Input)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2.

## Test data

| Parameter | Value |
| --- | --- |
| otp | 123456 (đúng) |
| newPassword | Reset123! |
| confirmNewPassword | Different123! (không trùng khớp) |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Nhập mã OTP đúng `123456`.
3. Nhập mật khẩu mới `Reset123!` vào trường Mật khẩu mới.
4. Nhập mật khẩu xác nhận khác `Different123!` vào trường Xác nhận mật khẩu.
5. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống chặn submit và hiển thị lỗi: "Mật khẩu xác nhận không trùng khớp với mật khẩu mới".
- Thông báo lỗi hiển thị ngay **phía trên** nút submit.

## Status / Related bugs

Not Run / None
