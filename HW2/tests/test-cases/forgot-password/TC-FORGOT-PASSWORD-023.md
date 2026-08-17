# TC-FORGOT-PASSWORD-023: Xác thực nhãn bắt buộc và vị trí thông báo lỗi (GUI Validation - Form Requirements)

## Requirement ID

FR-22

## Module / Test type / Technique

forgot-password / GUI Validation / GUI Layout Check

## Preconditions

- Người dùng đang ở màn hình Bước 1 hoặc Bước 2 của chức năng Quên mật khẩu.

## Test data

| Parameter | Value |
| --- | --- |
| N/A | N/A |

## Test steps

1. Truy cập trang chủ EShop, đi tới giao diện Quên mật khẩu Bước 1.
2. Quan sát nhãn của trường nhập liệu Email xem có ký tự dấu sao màu đỏ `*` bên cạnh nhãn để biểu thị trường bắt buộc hay không.
3. Nhấp gửi form trống để kích hoạt thông báo lỗi và kiểm tra vị trí hiển thị của thông báo lỗi so với nút submit.
4. Nhập email đúng để đi tới Bước 2.
5. Quan sát nhãn của các trường OTP, Mật khẩu mới, Xác nhận mật khẩu mới xem có ký tự `*` hay không.
6. Nhấp gửi form trống ở Bước 2 và kiểm tra vị trí hiển thị của thông báo lỗi so với nút submit.

## Expected result

- Có ký hiệu `*` màu đỏ hiển thị bên cạnh tất cả các nhãn bắt buộc: "Email *", "Mã OTP *", "Mật khẩu mới *", "Xác nhận mật khẩu mới *".
- Toàn bộ thông báo lỗi ở cả Bước 1 và Bước 2 phải hiển thị ở vị trí nằm **bên trên** nút submit, không hiển thị ở dưới nút.

## Status / Related bugs

Not Run / None
