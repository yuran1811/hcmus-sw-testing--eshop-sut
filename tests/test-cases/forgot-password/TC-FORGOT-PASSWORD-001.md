# TC-FORGOT-PASSWORD-001: Yêu cầu gửi mã OTP thành công với email hợp lệ (Happy Path - Step 1)

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning (Valid Input)

## Preconditions

- Người dùng chưa đăng nhập.
- Địa chỉ email `test@eshop.com` đã được đăng ký trên hệ thống.

## Test data

| Parameter | Value |
| --- | --- |
| email | test@eshop.com |

## Test steps

1. Truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`.
2. Nhấp vào liên kết "Đăng nhập" (Login) trên thanh điều hướng để mở trang đăng nhập (`http://localhost:5173/login`).
3. Nhấp vào liên kết "Quên mật khẩu?" (Forgot Password?) để chuyển sang giao diện Quên mật khẩu Bước 1.
4. Kiểm tra sự xuất hiện của chỉ báo bước (Step Indicator) "Bước 1 / 2" và nút "Quay lại đăng nhập".
5. Nhập địa chỉ email `test@eshop.com` vào trường nhập liệu Email.
6. Nhấp vào nút "Gửi mã OTP" (Submit).

## Expected result

- Hệ thống xử lý thành công, hiển thị thông báo gửi mã OTP thành công.
- Mã OTP 6 chữ số ngẫu nhiên hiển thị trực tiếp trên màn hình (môi trường demo).
- Giao diện tự động chuyển đổi sang Bước 2 (Đặt lại mật khẩu) với chỉ báo bước cập nhật thành "Bước 2 / 2".

## Status / Related bugs

Not Run / None
