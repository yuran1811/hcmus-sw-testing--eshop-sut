# TC-FORGOT-PASSWORD-030: Khóa yêu cầu đặt lại mật khẩu sau 5 lần nhập sai mã OTP liên tiếp (Brute Force Protection)

## Requirement ID

FR-03, SEC-07

## Module / Test type / Technique

forgot-password / Security / Boundary Value Analysis (3-Point BVA on failed attempts)

## Preconditions

- Người dùng đã hoàn thành Bước 1 cho email `test@eshop.com` và hệ thống đã gửi OTP thành công.
- Người dùng đang ở giao diện đặt lại mật khẩu Bước 2.

## Test data

| Parameter | Value |
| --- | --- |
| email | test@eshop.com |
| correctOTP | 123456 |
| wrongOTP | 999999 |
| failedAttemptsLimit | 5 |

## Test steps

1. Tại giao diện Bước 2, nhập mã OTP sai `999999`.
2. Điền mật khẩu mới hợp lệ `Reset123!` và xác nhận mật khẩu `Reset123!`.
3. Nhấp nút "Xác nhận đặt lại mật khẩu" để gửi yêu cầu.
4. Lặp lại việc nhập sai OTP và gửi yêu cầu thêm 4 lần nữa (tổng cộng nhập sai liên tiếp đúng 5 lần). Quan sát phản hồi lỗi của hệ thống ở mỗi lần gửi.
5. Tại lần thứ 6, nhập mã OTP đúng `123456` (đúng mã được cấp ban đầu), điền mật khẩu mới và nhấn nút "Xác nhận đặt lại mật khẩu".
6. Quan sát mã phản hồi của hệ thống ở lần thứ 6 này.

## Expected result

- Ở các lần nhập sai từ 1 đến 4, hệ thống từ chối yêu cầu và hiển thị thông báo lỗi OTP không hợp lệ phía trên nút submit (FR-22).
- Ngay sau lần nhập sai liên tiếp thứ 5 (đạt giá trị biên tối đa cho phép), hệ thống kích hoạt cơ chế Brute Force khóa yêu cầu đặt lại mật khẩu của tài khoản này.
- Tại lần thứ 6 (mặc dù nhập đúng mã OTP `123456`), hệ thống vẫn từ chối xử lý đặt lại mật khẩu và hiển thị thông báo lỗi rõ ràng phía trên nút submit: "Tài khoản đã bị khóa tính năng đặt lại mật khẩu do nhập sai OTP quá nhiều lần. Vui lòng thử lại sau!".
- Mật khẩu của tài khoản giữ nguyên, không bị cập nhật trong cơ sở dữ liệu.

## Status / Related bugs

Not Run / None
