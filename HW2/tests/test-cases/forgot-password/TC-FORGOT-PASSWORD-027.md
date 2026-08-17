# TC-FORGOT-PASSWORD-027: Bước 2 - Đặt lại mật khẩu với mã OTP đã được sử dụng (Replay Attack)

## Requirement ID

FR-03 Step 2, SEC-07

## Module / Test type / Technique

forgot-password / Security / Replay Attack Protection (Reused OTP)

## Preconditions

- Người dùng đã hoàn thành Bước 1 bằng cách nhập email `test@eshop.com` và hệ thống đã gửi mã OTP.
- Người dùng đã thực hiện thành công việc đặt lại mật khẩu bằng mã OTP `123456` một lần trước đó.
- Mã OTP `123456` đã được hệ thống ghi nhận trạng thái đã sử dụng (invalidated).

## Test data

| Parameter | Value |
| --- | --- |
| email | test@eshop.com |
| otp | 123456 (mã OTP đã được sử dụng thành công trước đó) |
| newPassword | NewReset123! |
| confirmNewPassword | NewReset123! |

## Test steps

1. Truy cập trang chủ EShop tại `http://localhost:5173`.
2. Đi tới trang đăng nhập và nhấp vào "Quên mật khẩu?".
3. Thực hiện hoàn tất một luồng đặt lại mật khẩu hợp lệ với mã OTP `123456` được gửi đến email `test@eshop.com` (mật khẩu được cập nhật thành công thành `Reset123!`).
4. Ngay sau đó, cố gắng sử dụng lại chính mã OTP `123456` đó để gửi yêu cầu đặt lại mật khẩu lần thứ hai (thông qua API trực tiếp hoặc bằng cách quay lại trang Bước 2 trước khi phiên làm việc bị xóa).
5. Tại giao diện Bước 2, nhập mã OTP đã dùng `123456`.
6. Nhập mật khẩu mới mới `NewReset123!` và xác nhận mật khẩu `NewReset123!`.
7. Nhấn nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống thực hiện kiểm tra trạng thái sử dụng của mã OTP và phát hiện mã đã được sử dụng.
- Hệ thống chặn hành động đặt lại mật khẩu và hiển thị thông báo lỗi rõ ràng phía trên nút submit: "Mã OTP không hợp lệ hoặc đã được sử dụng!".
- Mật khẩu của tài khoản không bị thay đổi sang `NewReset123!` trong cơ sở dữ liệu (vẫn giữ nguyên mật khẩu từ lần đặt lại thành công đầu tiên `Reset123!`).

## Status / Related bugs

Not Run / None
