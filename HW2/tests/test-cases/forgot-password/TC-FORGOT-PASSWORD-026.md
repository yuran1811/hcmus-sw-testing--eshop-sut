# TC-FORGOT-PASSWORD-026: Bước 2 - Đặt lại mật khẩu với mã OTP đã hết hạn

## Requirement ID

FR-03 Step 2, SEC-07

## Module / Test type / Technique

forgot-password / Security / Temporal Validation (Expired OTP)

## Preconditions

- Người dùng đã hoàn thành Bước 1 bằng cách nhập email `test@eshop.com` và hệ thống đã gửi mã OTP.
- Mã OTP đã được sinh ra nhưng thời gian hiệu lực (ví dụ: 5 phút) đã trôi qua hoàn toàn (OTP đã hết hạn).

## Test data

| Parameter | Value |
| --- | --- |
| email | test@eshop.com |
| otp | 123456 (mã OTP đã hết hạn) |
| newPassword | Reset123! |
| confirmNewPassword | Reset123! |

## Test steps

1. Truy cập trang chủ EShop tại `http://localhost:5173`.
2. Đi tới trang đăng nhập và nhấp vào "Quên mật khẩu?".
3. Nhập địa chỉ email hợp lệ `test@eshop.com` tại Bước 1 và nhấn "Gửi mã OTP".
4. Hệ thống chuyển hướng sang giao diện Bước 2.
5. Chờ thời gian hiệu lực của mã OTP trôi qua hoàn toàn (ví dụ: chờ 5 phút hoặc cấu hình hết hạn phiên OTP trong môi trường thử nghiệm).
6. Nhập mã OTP đã hết hạn `123456` vào trường OTP.
7. Nhập mật khẩu mới `Reset123!` và xác nhận mật khẩu `Reset123!`.
8. Nhấn nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống thực hiện kiểm tra thời gian hiệu lực của OTP và phát hiện OTP đã hết hạn.
- Hệ thống chặn hành động đặt lại mật khẩu và hiển thị thông báo lỗi rõ ràng phía trên nút submit: "Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới!".
- Mật khẩu của tài khoản không bị thay đổi trong cơ sở dữ liệu.

## Status / Related bugs

Not Run / None
