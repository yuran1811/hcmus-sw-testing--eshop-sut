# TC-USER-MANAGEMENT-011: Đảm bảo mật khẩu không bao giờ bị lộ trên giao diện quản lý người dùng

## Requirement ID

FR-19

## Module / Test type / Technique

user-management / GUI / Error Isolation

## Preconditions

- Tài khoản Admin `admin@eshop.com` đang đăng nhập và truy cập trang quản lý người dùng.
- Có nhiều tài khoản người dùng thường hiển thị trong bảng.

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as admin@eshop.com (role = admin) |

## Test steps

1. Đăng nhập Admin Portal và truy cập mục "Quản lý Người dùng".
2. Quan sát kỹ toàn bộ các cột trong bảng danh sách hiển thị.
3. Nhấp chuột phải trên trang, chọn "Inspect Element" (Kiểm tra phần tử) hoặc xem Source Code của trang.
4. Tìm kiếm các thuộc tính, thẻ HTML hoặc dữ liệu JSON được tải về client liên quan đến trường `password` hoặc mật khẩu của người dùng.

## Expected result

- Trên giao diện trực quan: Hoàn toàn không có bất kỳ cột nào tên là "Mật khẩu" hoặc hiển thị mật khẩu dưới dạng che ẩn (dạng `******`).
- Trong Source Code, DOM, và Network Payload: Trường dữ liệu mật khẩu (`password`, `password_hash`, v.v.) không được gửi kèm trong phản hồi API của danh sách người dùng từ server. Mật khẩu không tồn tại ở bất kỳ dạng nào phía client.

## Status / Related bugs

Not Run / None
