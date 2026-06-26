# TC-FORGOT-PASSWORD-004: Bước 1 - Nhập email chưa đăng ký hệ thống (Equivalence Partitioning - Invalid Input)

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning (Invalid Input)

## Preconditions

- Người dùng đang ở giao diện Quên mật khẩu Bước 1.
- Email `unregistered@eshop.com` chưa từng được đăng ký trong hệ thống.

## Test data

| Parameter | Value |
| --- | --- |
| email | unregistered@eshop.com |

## Test steps

1. Truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`.
2. Đi tới trang đăng nhập và chọn "Quên mật khẩu?".
3. Nhập email `unregistered@eshop.com` vào trường Email.
4. Nhấp vào nút "Gửi mã OTP".

## Expected result

- Hệ thống hiển thị thông báo lỗi "Email này chưa được đăng ký trong hệ thống".
- Thông báo lỗi hiển thị rõ ràng ngay **phía trên** nút submit.
- Không có mã OTP nào được sinh ra hay hiển thị trên màn hình.

## Status / Related bugs

Not Run / None
