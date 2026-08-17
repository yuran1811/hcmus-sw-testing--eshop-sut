# TC-FORGOT-PASSWORD-016: Bước 2 - Mật khẩu mới thiếu chữ thường (Equivalence Partitioning - Weak Password)

## Requirement ID

FR-03, FR-22

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning (Weak Password - No Lowercase)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2.

## Test data

| Parameter | Value |
| --- | --- |
| otp | 123456 (đúng) |
| newPassword | RESET123! (thiếu chữ viết thường) |
| confirmNewPassword | RESET123! (thiếu chữ viết thường) |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Nhập mã OTP đúng `123456`.
3. Nhập mật khẩu mới `RESET123!` vào trường Mật khẩu mới.
4. Nhập mật khẩu xác nhận `RESET123!` vào trường Xác nhận mật khẩu.
5. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống chặn submit và hiển thị lỗi: "Mật khẩu mới phải chứa ít nhất 1 ký tự viết thường".
- Thông báo lỗi hiển thị ngay **phía trên** nút submit.

## Status / Related bugs

Not Run / None
