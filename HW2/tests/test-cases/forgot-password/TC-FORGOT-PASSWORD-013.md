# TC-FORGOT-PASSWORD-013: Bước 2 - Để trống trường Mật khẩu mới (Boundary Value Analysis - Empty Check)

## Requirement ID

FR-03, FR-22

## Module / Test type / Technique

forgot-password / Functional & GUI / Boundary Value Analysis (Empty Input)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2.

## Test data

| Parameter | Value |
| --- | --- |
| otp | 123456 (đúng) |
| newPassword | "" (để trống) |
| confirmNewPassword | "" (để trống) |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Nhập mã OTP đúng `123456`.
3. Để trống trường Mật khẩu mới và trường Xác nhận mật khẩu mới.
4. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống ngăn chặn việc submit form.
- Thông báo lỗi "Mật khẩu mới không được để trống" hiển thị ngay **phía trên** nút submit.
- Trường Mật khẩu mới hiển thị viền đỏ cảnh báo lỗi.

## Status / Related bugs

Not Run / None
