# TC-USER-MANAGEMENT-003: Chặn truy cập danh sách người dùng khi đăng nhập bằng tài khoản thường

## Requirement ID

FR-12

## Module / Test type / Technique

user-management / Security / Equivalence Partitioning

## Preconditions

- Tài khoản người dùng thường `test@eshop.com` đã đăng ký trên hệ thống với quyền thường (`role = 'user'`).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com (role = user) |

## Test steps

1. Truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`.
2. Nhấp chọn "Đăng nhập", nhập email `test@eshop.com` và mật khẩu để đăng nhập tài khoản thường.
3. Sau khi đăng nhập thành công, cố gắng truy cập trực tiếp vào URL trang quản lý người dùng của admin tại `http://localhost:5174/users` hoặc `http://localhost:5173/admin/users`.
4. Quan sát phản ứng và thông báo lỗi hiển thị trên trang.

## Expected result

- Hệ thống chặn quyền truy cập của tài khoản thường.
- Trang hiển thị thông báo lỗi truy cập "403 Forbidden" hoặc báo lỗi không đủ thẩm quyền bằng tiếng Việt (ví dụ: "Bạn không có quyền truy cập vào khu vực quản trị").
- Người dùng không thể xem được bất kỳ thông tin danh sách người dùng nào.

## Status / Related bugs

Not Run / None
