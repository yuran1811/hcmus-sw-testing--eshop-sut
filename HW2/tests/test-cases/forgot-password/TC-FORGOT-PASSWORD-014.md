# TC-FORGOT-PASSWORD-014: Bước 2 - Mật khẩu mới quá ngắn (Boundary Value Analysis - 3-Point BVA: Length 7 - Invalid)

## Requirement ID

FR-03, FR-22

## Module / Test type / Technique

forgot-password / Functional / Boundary Value Analysis (Password length = 7 - Invalid)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2.

## Test data

| Parameter | Value |
| --- | --- |
| otp | 123456 (đúng) |
| newPassword | Res123! (7 ký tự) |
| confirmNewPassword | Res123! (7 ký tự) |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Nhập mã OTP đúng `123456`.
3. Nhập mật khẩu mới gồm 7 ký tự `Res123!` vào trường Mật khẩu mới.
4. Nhập mật khẩu xác nhận `Res123!` vào trường Xác nhận mật khẩu.
5. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống chặn submit và hiển thị lỗi: "Mật khẩu phải có độ dài tối thiểu từ 8 ký tự trở lên".
- Thông báo lỗi hiển thị ngay **phía trên** nút submit.

## Status / Related bugs

Not Run / None
