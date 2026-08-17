# [BUG][User Management] Lỗ hổng bảo mật - API Backend cho phép Admin gửi request tự xóa chính tài khoản đang đăng nhập

## Found by Test Case
TC-USER-MANAGEMENT-019

## Requirement liên quan
FR-19, FR-12

## Severity / Priority
Critical / P1

## Environment
- Browser: N/A (Kiểm thử API bảo mật)
- OS: Windows 11
- URL: http://localhost:3000/api/admin/users/:id
- Build/Commit: 004eb40

## Steps to reproduce
1. Đăng nhập tài khoản Admin (`admin@eshop.com`, role = `admin`) để lấy mã JWT token hợp lệ và xác định admin_id (ví dụ: `1`).
2. Gửi một request HTTP `DELETE` trực tiếp đến API xóa người dùng bằng công cụ gửi request API:
   - URL: `http://localhost:3000/api/admin/users/1`
   - Header: `Authorization: Bearer <Token_Của_Admin>`
3. Kiểm tra mã phản hồi HTTP và kiểm tra xem tài khoản admin trong database có bị xóa hay không.

## Expected result
- Backend nhận diện ID người dùng bị xóa trùng khớp với ID trong JWT token đang thực hiện request.
- Backend từ chối thực thi yêu cầu xóa tài khoản, trả về mã lỗi HTTP `400 Bad Request` hoặc `403 Forbidden`.
- Nội dung phản hồi thông báo lỗi rõ ràng bằng tiếng Việt: "Không được phép tự xóa tài khoản đang đăng nhập!".
- Tài khoản Admin không bị xóa khỏi cơ sở dữ liệu.

## Actual result
- Backend thực hiện xóa tài khoản thành công và trả về trạng thái `200 OK` cùng nội dung `{ message: "User deleted" }`.
- Tài khoản Admin bị xóa hoàn toàn khỏi cơ sở dữ liệu SQLite, phá vỡ phiên đăng nhập hiện tại và gây sập dữ liệu quản trị viên.

## Evidence
- Kết quả chạy script kiểm thử API tự động:
  ```text
  --- TEST 2: API Self-Deletion Bypass ---
  Attempting to self-delete Admin account (ID: 1)...
  DELETE response status: 200
  DELETE response body: { message: 'User deleted' }
  ❌ TEST 2 FAILED: Admin self-deleted successfully (Self-Deletion Bypass)!
  ```
