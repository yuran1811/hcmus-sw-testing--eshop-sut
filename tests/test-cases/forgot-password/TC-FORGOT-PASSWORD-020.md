# TC-FORGOT-PASSWORD-020: Bước 2 - Để trống trường Xác nhận mật khẩu mới (Boundary Value Analysis - Empty Check)

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
| newPassword | Reset123! (đúng) |
| confirmNewPassword | "" (để trống) |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Nhập mã OTP đúng `123456`.
3. Nhập mật khẩu mới hợp lệ `Reset123!` vào trường Mật khẩu mới.
4. Để trống trường Xác nhận mật khẩu mới.
5. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống chặn submit.
- Thông báo lỗi "Vui lòng xác nhận mật khẩu mới" hiển thị ngay **phía trên** nút submit.
- Trường Xác nhận mật khẩu hiển thị viền đỏ.

## Status / Related bugs

Not Run / None
