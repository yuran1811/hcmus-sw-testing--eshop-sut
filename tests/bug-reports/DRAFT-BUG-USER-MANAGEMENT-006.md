# [BUG][User Management] Bỏ qua ràng buộc khóa ngoại - Cho phép xóa người dùng đang có đơn hàng hoạt động

## Found by Test Case
TC-USER-MANAGEMENT-018

## Requirement liên quan
FR-19

## Severity / Priority
Critical / P1

## Environment
- Browser: N/A (Kiểm thử API và Database)
- OS: Windows 11
- URL: http://localhost:3000/api/admin/users/:id
- Build/Commit: 004eb40

## Steps to reproduce
1. Đăng ký/đăng nhập một người dùng thường (ví dụ: `test@eshop.com`).
2. Gửi request checkout tạo một đơn hàng ở trạng thái hoạt động (ví dụ: `pending` - Chờ xác nhận) cho tài khoản này.
3. Đăng nhập Admin và gọi API xóa người dùng trên (hoặc nhấn nút "Xóa" tương ứng trong bảng người dùng tại Admin UI).
4. Quan sát mã phản hồi HTTP và kiểm tra cơ sở dữ liệu SQLite.

## Expected result
- Hệ thống từ chối thực hiện hành động xóa để bảo toàn tính toàn vẹn dữ liệu (tránh mồ côi đơn hàng).
- Trả về mã lỗi HTTP `400 Bad Request` hoặc `403 Forbidden`.
- Phản hồi thông báo lỗi rõ ràng bằng tiếng Việt: "Không thể xóa người dùng đang có giao dịch hoặc đơn hàng hoạt động!".
- Tài khoản người dùng và đơn hàng liên kết vẫn phải được bảo toàn trong cơ sở dữ liệu.

## Actual result
- Hệ thống thực hiện xóa người dùng thành công, trả về trạng thái `200 OK` với body `{ message: "User deleted" }`.
- Tài khoản người dùng bị xóa khỏi bảng `users` trong khi đơn hàng liên quan vẫn tồn tại trong bảng `orders` dưới dạng mồ côi (user_id trỏ đến một ID không còn tồn tại), gây phá vỡ tính toàn vẹn cơ sở dữ liệu.

## Evidence
- Kết quả chạy script kiểm thử API tự động:
  ```text
  --- TEST 1: Foreign Key Constraints ---
  Creating an active order for the Test User...
  Order created successfully. Order ID: 1
  Attempting to delete Test User (ID: 2) who has an active order...
  DELETE response status: 200
  DELETE response body: { message: 'User deleted' }
  ❌ TEST 1 FAILED: User with active orders was successfully deleted (Foreign Key Constraint bypass)!
  ```
