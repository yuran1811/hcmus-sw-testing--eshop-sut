# TC-FORGOT-PASSWORD-007: Bước 2 - Để trống trường mã OTP (Boundary Value Analysis - Empty Check)

## Requirement ID

FR-03, FR-22

## Module / Test type / Technique

forgot-password / Functional & GUI / Boundary Value Analysis (Empty Input)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2 (`Bước 2 / 2`).

## Test data

| Parameter | Value |
| --- | --- |
| otp | "" (để trống) |
| newPassword | Reset123! |
| confirmNewPassword | Reset123! |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Để trống trường mã OTP.
3. Nhập mật khẩu mới hợp lệ `Reset123!` và xác nhận mật khẩu `Reset123!`.
4. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống ngăn chặn việc gửi form.
- Thông báo lỗi "Mã OTP không được để trống" hiển thị ngay **phía trên** nút submit.
- Trường OTP hiển thị trạng thái cảnh báo viền đỏ.

## Status / Related bugs

Not Run / None
