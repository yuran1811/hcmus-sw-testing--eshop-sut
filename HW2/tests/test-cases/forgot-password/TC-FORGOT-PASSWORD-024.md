# TC-FORGOT-PASSWORD-024: Bước 2 - Mật khẩu mới có độ dài tối thiểu đạt chuẩn (8 ký tự)

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Boundary Value Analysis (3-Point BVA)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2 (Đặt lại mật khẩu).
- Mã OTP nhập vào là hợp lệ.

## Test data

| Parameter | Value |
| --- | --- |
| email | test@eshop.com |
| otp | 123456 (đúng) |
| newPassword | Reset12! (8 ký tự) |
| confirmNewPassword | Reset12! |

## Test steps

1. Điền mã OTP hợp lệ vào trường OTP.
2. Nhập mật khẩu mới `Reset12!` (độ dài đúng 8 ký tự, chứa chữ hoa, chữ thường, số, và ký tự đặc biệt).
3. Nhập xác nhận mật khẩu là `Reset12!` trùng khớp.
4. Nhấn nút "Xác nhận đặt lại mật khẩu" (Submit).
5. Quan sát phản ứng và thông báo từ hệ thống.

## Expected result

- Mật khẩu mới có độ dài đúng 8 ký tự (đáp ứng chuẩn tối thiểu của 3-Point BVA) và đáp ứng đầy đủ điều kiện về độ mạnh mật khẩu.
- Hệ thống chấp nhận đặt lại mật khẩu thành công, hiển thị thông báo: "Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại!".
- Người dùng được điều hướng tự động về màn hình Đăng nhập.

## Status / Related bugs

Not Run / None
