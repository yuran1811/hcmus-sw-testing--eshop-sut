# TC-FORGOT-PASSWORD-009: Bước 2 - Nhập mã OTP thừa chữ số (Boundary Value Analysis - 3-Point BVA: Length 7 - Invalid)

## Requirement ID

FR-03, FR-22

## Module / Test type / Technique

forgot-password / Functional / Boundary Value Analysis (OTP length = 7 - Invalid)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2.

## Test data

| Parameter | Value |
| --- | --- |
| otp | 1234567 (7 chữ số) |
| newPassword | Reset123! |
| confirmNewPassword | Reset123! |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Nhập mã OTP gồm 7 chữ số `1234567` vào trường OTP.
3. Nhập mật khẩu mới hợp lệ `Reset123!` và xác nhận mật khẩu `Reset123!`.
4. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống chặn submit (hoặc không cho phép nhập ký tự thứ 7 nếu trường giới hạn `maxlength="6"`).
- Hiển thị thông báo lỗi "Mã OTP phải có độ dài đúng 6 chữ số" ngay **phía trên** nút submit.

## Status / Related bugs

Not Run / None
