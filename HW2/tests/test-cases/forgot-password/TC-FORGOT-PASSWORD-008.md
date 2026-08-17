# TC-FORGOT-PASSWORD-008: Bước 2 - Nhập mã OTP thiếu chữ số (Boundary Value Analysis - 3-Point BVA: Length 5 - Invalid)

## Requirement ID

FR-03, FR-22

## Module / Test type / Technique

forgot-password / Functional / Boundary Value Analysis (OTP length = 5 - Invalid)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2.

## Test data

| Parameter | Value |
| --- | --- |
| otp | 12345 (5 chữ số) |
| newPassword | Reset123! |
| confirmNewPassword | Reset123! |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Nhập mã OTP gồm 5 chữ số `12345` vào trường OTP.
3. Nhập mật khẩu mới hợp lệ `Reset123!` và xác nhận mật khẩu `Reset123!`.
4. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống chặn submit và hiển thị thông báo lỗi: "Mã OTP phải có độ dài đúng 6 chữ số".
- Thông báo lỗi hiển thị ngay **phía trên** nút submit.

## Status / Related bugs

Not Run / None
