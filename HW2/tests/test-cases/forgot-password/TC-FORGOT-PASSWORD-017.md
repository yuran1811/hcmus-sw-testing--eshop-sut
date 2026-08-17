# TC-FORGOT-PASSWORD-017: Bước 2 - Mật khẩu mới thiếu chữ số (Equivalence Partitioning - Weak Password)

## Requirement ID

FR-03, FR-22

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning (Weak Password - No Digit)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2.

## Test data

| Parameter | Value |
| --- | --- |
| otp | 123456 (đúng) |
| newPassword | Resetxyz! (thiếu chữ số) |
| confirmNewPassword | Resetxyz! (thiếu chữ số) |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Nhập mã OTP đúng `123456`.
3. Nhập mật khẩu mới `Resetxyz!` vào trường Mật khẩu mới.
4. Nhập mật khẩu xác nhận `Resetxyz!` vào trường Xác nhận mật khẩu.
5. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống chặn submit và hiển thị lỗi: "Mật khẩu mới phải chứa ít nhất 1 chữ số".
- Thông báo lỗi hiển thị ngay **phía trên** nút submit.

## Status / Related bugs

Not Run / None
