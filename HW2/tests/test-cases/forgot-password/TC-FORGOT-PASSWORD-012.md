# TC-FORGOT-PASSWORD-012: Bước 2 - Sử dụng mã OTP của email khác (Equivalence Partitioning - Cross-Email OTP Violation)

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning (Invalid User OTP context)

## Preconditions

- Hệ thống đã sinh mã OTP `123456` cho email `other@eshop.com`.
- Người dùng hiện tại đã yêu cầu OTP cho email `test@eshop.com`.
- Người dùng đang ở màn hình đặt lại mật khẩu Bước 2 của email `test@eshop.com`.

## Test data

| Parameter | Value |
| --- | --- |
| email | test@eshop.com |
| otp | 123456 (OTP của other@eshop.com) |
| newPassword | Reset123! |
| confirmNewPassword | Reset123! |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2 (yêu cầu đặt lại mật khẩu cho `test@eshop.com`).
2. Nhập mã OTP `123456` (mã thuộc về tài khoản `other@eshop.com`) vào trường OTP.
3. Nhập mật khẩu mới hợp lệ `Reset123!` và xác nhận mật khẩu `Reset123!`.
4. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống đối chiếu sự trùng khớp giữa OTP và Email yêu cầu trên backend, ngăn chặn việc cập nhật mật khẩu.
- Hiển thị thông báo lỗi "Mã OTP không hợp lệ cho tài khoản này" ngay **phía trên** nút submit.

## Status / Related bugs

Not Run / None
