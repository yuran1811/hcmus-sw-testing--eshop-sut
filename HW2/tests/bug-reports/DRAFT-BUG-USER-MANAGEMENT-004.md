# [BUG][User Management] Lỗ hổng bảo mật phân quyền - Người dùng thường có thể gửi API request xóa bất kỳ tài khoản nào

## Found by Test Case
TC-USER-MANAGEMENT-009

## Requirement liên quan
FR-12

## Severity / Priority
Critical / P0

## Environment
- Browser: N/A (Kiểm thử mức API)
- OS: Windows 11
- URL: http://localhost:3000/api/admin/users/:id
- Build/Commit: 004eb40

## Steps to reproduce
1. Đăng nhập hoặc đăng ký một tài khoản người dùng thường (ví dụ: `test@eshop.com`, role = `user`) để lấy token JWT hợp lệ.
2. Gửi một request HTTP `DELETE` trực tiếp bằng công cụ (cURL, Postman, hoặc script) đến endpoint xóa người dùng:
   - URL: `http://localhost:3000/api/admin/users/<user_id_cần_xóa>`
   - Header: `Authorization: Bearer <Token_Của_User_Thường>`
3. Kiểm tra mã phản hồi HTTP và kiểm tra cơ sở dữ liệu xem tài khoản đích có bị xóa hay không.

## Expected result
- API backend phải từ chối yêu cầu xóa do token không thuộc về tài khoản có quyền Admin.
- HTTP Status Code trả về phải là `403 Forbidden`.
- Nội dung phản hồi phải là thông báo lỗi tiếng Việt: "Quyền truy cập bị từ chối. Yêu cầu quyền Admin." hoặc tương tự.
- Tài khoản mục tiêu không bị xóa khỏi cơ sở dữ liệu.

## Actual result
- API backend thực hiện xóa tài khoản thành công và trả về trạng thái `200 OK` cùng nội dung `{ message: "User deleted" }`.
- Bất kỳ tài khoản thường nào có token hợp lệ cũng có thể xóa bất kỳ tài khoản người dùng nào khác trong hệ thống (bao gồm cả Admin).

## Evidence
- Kết quả chạy script kiểm thử API tự động:
  ```text
  DELETE /api/admin/users/<id> sử dụng token của người dùng thường trả về:
  Status code: 200 OK
  Body: { message: 'User deleted' }
  ```
  Tài khoản bị xóa hoàn toàn khỏi cơ sở dữ liệu SQLite mà không có kiểm tra phân quyền `role === 'admin'`.
