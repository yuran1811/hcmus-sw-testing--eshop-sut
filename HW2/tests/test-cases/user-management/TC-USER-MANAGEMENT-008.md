# TC-USER-MANAGEMENT-008: Ngăn chặn Admin tự xóa chính tài khoản đang đăng nhập

## Requirement ID

FR-19

## Module / Test type / Technique

user-management / Functional / Error Isolation

## Preconditions

- Tài khoản Admin `admin@eshop.com` đang đăng nhập và truy cập giao diện quản lý người dùng.

## Test data

| Parameter | Value |
| --- | --- |
| targetUserToDelete | admin@eshop.com (active admin session) |

## Test steps

1. Đăng nhập vào Admin Portal bằng tài khoản `admin@eshop.com` và mở trang "Quản lý Người dùng".
2. Tìm dòng chứa thông tin của chính tài khoản `admin@eshop.com` trong danh sách.
3. Quan sát nút hành động "Xóa" tại dòng này trên giao diện.
4. Cố gắng tương tác hoặc gửi request xóa chính tài khoản admin đang đăng nhập qua API nếu nút bị ẩn/vô hiệu hóa.

## Expected result

- Trên giao diện: Dòng chứa tài khoản `admin@eshop.com` đang đăng nhập không hiển thị nút "Xóa", hoặc nút "Xóa" hiển thị dưới trạng thái bị vô hiệu hóa (disabled / xám mờ) để ngăn chặn click.
- Nếu gửi request DELETE trực tiếp bằng công cụ bên ngoài đến API xóa của chính mình, hệ thống backend phải chặn lại và trả về lỗi: "Không thể tự xóa tài khoản đang đăng nhập!" với mã lỗi HTTP 400 Bad Request.

## Status / Related bugs

Not Run / None
