# TC-FORGOT-PASSWORD-010: Bước 2 - Nhập mã OTP chứa ký tự phi số (Equivalence Partitioning - Invalid Type)

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning (Invalid Input Type)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2.

## Test data

| Parameter | Value |
| --- | --- |
| otp | 123a56 (chứa ký tự phi số 'a') |
| newPassword | Reset123! |
| confirmNewPassword | Reset123! |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Nhập chuỗi `123a56` vào trường OTP.
3. Nhập mật khẩu mới hợp lệ `Reset123!` và xác nhận mật khẩu `Reset123!`.
4. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống chặn submit và báo lỗi: "Mã OTP chỉ được phép chứa các chữ số".
- Thông báo lỗi hiển thị ngay **phía trên** nút submit.

## Status / Related bugs

Not Run / None
