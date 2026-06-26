# TC-FORGOT-PASSWORD-002: Đặt lại mật khẩu thành công với OTP đúng và mật khẩu mới hợp lệ (Happy Path - Step 2)

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning (Valid Input)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2 (`Bước 2 / 2`).
- Hệ thống đã hiển thị mã OTP 6 chữ số hợp lệ dành cho email `test@eshop.com`.

## Test data

| Parameter | Value |
| --- | --- |
| email | test@eshop.com |
| otp | 123456 (mã OTP đúng hiển thị ở demo) |
| newPassword | Reset123! |
| confirmNewPassword | Reset123! |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2 (`http://localhost:5173/forgot-password/step-2`).
2. Nhập mã OTP đúng `123456` vào trường OTP.
3. Nhập mật khẩu mới `Reset123!` vào trường Mật khẩu mới.
4. Nhập lại mật khẩu mới `Reset123!` vào trường Xác nhận mật khẩu mới.
5. Nhấp vào nút "Xác nhận đặt lại mật khẩu" (Submit).

## Expected result

- Hệ thống xử lý đặt lại mật khẩu thành công và cập nhật mật khẩu mới vào cơ sở dữ liệu.
- Hiển thị thông báo thành công: "Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại!".
- Hệ thống tự động điều hướng người dùng quay trở lại trang Đăng nhập (`http://localhost:5173/login`).

## Status / Related bugs

Not Run / None
