# TC-USER-MANAGEMENT-001: Happy Path - Xem danh sách người dùng thành công

## Requirement ID

FR-19

## Module / Test type / Technique

user-management / Functional / Equivalence Partitioning

## Preconditions

- Tài khoản Admin `admin@eshop.com` đã đăng ký trên hệ thống với quyền admin (`role = 'admin'`).
- Hệ thống hiện có 5 người dùng trong cơ sở dữ liệu (gồm 1 admin đang đăng nhập và 4 người dùng thường khác).
- Thông tin của các người dùng thường khác gồm: Họ tên, Email, Số điện thoại, Vai trò (role = 'user').

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as admin@eshop.com (role = admin) |
| userList | 5 users (1 admin, 4 other users) |

## Test steps

1. Truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`.
2. Nhấp chọn liên kết "Đăng nhập" trên thanh điều hướng.
3. Nhập email `admin@eshop.com` và mật khẩu `Admin123!`, sau đó nhấn nút "Đăng nhập".
4. Sau khi đăng nhập thành công, hệ thống hiển thị liên kết truy cập trang quản trị hoặc tự động mở Admin Portal tại `http://localhost:5174`.
5. Tại thanh bên (sidebar) của Admin Portal, nhấp vào mục "Quản lý Người dùng".
6. Quan sát danh sách người dùng hiển thị trên màn hình.

## Expected result

- Hệ thống hiển thị bảng danh sách chứa toàn bộ 5 người dùng (bao gồm chính tài khoản admin đang đăng nhập và 4 người dùng khác).
- Mỗi người dùng hiển thị đầy đủ các cột thông tin: Họ Tên, Email, Số điện thoại, Vai trò.
- Cột mật khẩu tuyệt đối không xuất hiện trên giao diện, và không lộ dưới dạng văn bản thô hay ký tự ẩn (như dấu sao hoặc mã hóa) trong HTML.
- Giao diện sử dụng tiếng Việt nhất quán 100% (FR-21).

## Status / Related bugs

Not Run / None
