# TC-FORGOT-PASSWORD-025: Bước 1 - Email đăng ký chữ thường nhưng yêu cầu OTP bằng chữ hoa

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning

## Preconditions

- Tài khoản `test@eshop.com` đã đăng ký trên hệ thống (đăng ký bằng ký tự chữ thường).

## Test data

| Parameter | Value |
| --- | --- |
| email | TEST@ESHOP.COM (uppercase) |

## Test steps

1. Truy cập trang chủ EShop tại `http://localhost:5173`.
2. Chọn đăng nhập và nhấp vào "Quên mật khẩu?".
3. Nhập email bằng ký tự chữ hoa: `TEST@ESHOP.COM`.
4. Nhấn nút "Gửi mã OTP".
5. Quan sát thông báo lỗi hoặc chỉ báo gửi mã thành công.

## Expected result

- Hệ thống thực hiện kiểm tra email không phân biệt chữ hoa chữ thường (case-insensitive).
- Chấp nhận email `TEST@ESHOP.COM` tương khớp với tài khoản `test@eshop.com` trong cơ sở dữ liệu.
- Hệ thống gửi mã OTP thành công, hiển thị chỉ báo bước "Bước 1 / 2" và chuyển hướng người dùng sang giao diện Bước 2.

## Status / Related bugs

Not Run / None
