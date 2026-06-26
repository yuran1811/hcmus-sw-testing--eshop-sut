# TC-FORGOT-PASSWORD-019: Bước 2 - Mật khẩu chứa ký tự đặc biệt không hợp lệ (Equivalence Partitioning - Weak Password)

## Requirement ID

FR-03, FR-22

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning (Invalid Special Char)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2.

## Test data

| Parameter | Value |
| --- | --- |
| otp | 123456 (đúng) |
| newPassword | Reset123# (ký tự '#' không thuộc tập hợp [@, $, !, %, *, ?, &]) |
| confirmNewPassword | Reset123# |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Nhập mã OTP đúng `123456`.
3. Nhập mật khẩu mới `Reset123#` vào trường Mật khẩu mới.
4. Nhập mật khẩu xác nhận `Reset123#` vào trường Xác nhận mật khẩu.
5. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống chặn submit và hiển thị lỗi: "Mật khẩu mới chứa ký tự đặc biệt không được cho phép (chỉ chấp nhận @, $, !, %, *, ?, &)".
- Thông báo lỗi hiển thị ngay **phía trên** nút submit.

## Status / Related bugs

Not Run / None
