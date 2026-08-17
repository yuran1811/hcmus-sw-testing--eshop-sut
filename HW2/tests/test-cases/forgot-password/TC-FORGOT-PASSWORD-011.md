# TC-FORGOT-PASSWORD-011: Bước 2 - Nhập mã OTP sai giá trị (Equivalence Partitioning - Incorrect Value)

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Equivalence Partitioning (Incorrect Value)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2.
- Mã OTP thực sự được sinh ra là `123456`.

## Test data

| Parameter | Value |
| --- | --- |
| otp | 999999 (6 chữ số nhưng sai giá trị) |
| newPassword | Reset123! |
| confirmNewPassword | Reset123! |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Nhập mã OTP sai `999999` vào trường OTP.
3. Nhập mật khẩu mới hợp lệ `Reset123!` và xác nhận mật khẩu `Reset123!`.
4. Nhấp vào nút "Xác nhận đặt lại mật khẩu".

## Expected result

- Hệ thống xử lý yêu cầu và kiểm tra trên backend, sau đó trả về lỗi: "Mã OTP không chính xác hoặc đã hết hạn".
- Thông báo lỗi hiển thị rõ ràng ngay **phía trên** nút submit.

## Status / Related bugs

Not Run / None
