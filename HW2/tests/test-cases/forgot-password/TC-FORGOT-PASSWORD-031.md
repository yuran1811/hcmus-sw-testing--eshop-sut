# TC-FORGOT-PASSWORD-031: Kiểm tra hành vi nút Back của trình duyệt sau khi đặt lại mật khẩu thành công

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Flow Validation (Session Invalidation)

## Preconditions

- Tài khoản `test@eshop.com` đã đăng ký trên hệ thống.

## Test data

| Parameter | Value |
| --- | --- |
| email | test@eshop.com |
| otp | 123456 (mã OTP đã dùng để đặt lại mật khẩu thành công trước đó) |

## Test steps

1. Thực hiện toàn bộ quy trình đặt lại mật khẩu hợp lệ cho email `test@eshop.com` thành công (mật khẩu cập nhật thành `Reset123!`).
2. Xác nhận hệ thống hiển thị thông báo thành công và tự động chuyển hướng người dùng về trang Đăng nhập (`http://localhost:5173/login`).
3. Tại trang Đăng nhập, nhấp vào nút "Quay lại" (Back Button) trên trình duyệt để cố gắng quay lại màn hình đặt lại mật khẩu Bước 2.
4. Quan sát giao diện hiển thị của màn hình Bước 2.
5. Nếu giao diện form cũ vẫn hiển thị từ bộ nhớ cache của trình duyệt, cố gắng nhấp chọn lại nút "Xác nhận đặt lại mật khẩu" một lần nữa.
6. Quan sát phản hồi lỗi hiển thị.

## Expected result

- Ngay sau khi đặt lại mật khẩu thành công, phiên làm việc đặt lại mật khẩu của người dùng và hiệu lực mã OTP liên quan phải bị hủy bỏ hoàn toàn trên server.
- Khi người dùng nhấn nút Back trên trình duyệt, ứng dụng phát hiện phiên đã kết thúc, tự động làm sạch form và ngăn chặn người dùng xem lại thông tin cũ (hoặc tự động điều hướng ngược lại về trang Đăng nhập).
- Nếu người dùng cố tình gửi lại yêu cầu bằng dữ liệu cũ từ cache, hệ thống chặn hành động này và báo lỗi rõ ràng phía trên nút submit: "Yêu cầu không hợp lệ hoặc phiên làm việc đã kết thúc!".

## Status / Related bugs

Not Run / None
