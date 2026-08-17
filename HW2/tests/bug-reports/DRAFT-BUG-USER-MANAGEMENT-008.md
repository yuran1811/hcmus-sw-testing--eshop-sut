# [BUG][User Management] Tranh chấp đồng thời - Hai request xóa cùng một người dùng đồng thời đều trả về 200 OK thay vì báo lỗi cho request thứ hai

## Found by Test Case
TC-USER-MANAGEMENT-020

## Requirement liên quan
FR-19

## Severity / Priority
Major / P2

## Environment
- Browser: N/A (Kiểm thử API Concurrency)
- OS: Windows 11
- URL: http://localhost:3000/api/admin/users/:id
- Build/Commit: 004eb40

## Steps to reproduce
1. Đăng ký một người dùng tạm thời (ví dụ: `concurrency_temp@eshop.com`) để lấy ID (ví dụ: `3`).
2. Gửi đồng thời (trong cùng một thời điểm thông qua Promise.all) hai yêu cầu HTTP `DELETE` từ tài khoản Admin đến endpoint xóa tài khoản đó:
   - URL: `http://localhost:3000/api/admin/users/3`
   - Header: `Authorization: Bearer <Token_Của_Admin>`
3. Kiểm tra mã phản hồi HTTP của cả hai yêu cầu.

## Expected result
- Yêu cầu đầu tiên thực hiện thành công (mã 200 OK).
- Yêu cầu thứ hai gửi đến sau (hoặc đồng thời nhưng xử lý sau) phải bị backend chặn lại và phản hồi lỗi do người dùng không còn tồn tại.
- Backend trả về mã lỗi HTTP `404 Not Found` hoặc `400 Bad Request`.
- Body phản hồi lỗi rõ ràng bằng tiếng Việt: "Người dùng không tồn tại hoặc đã bị xóa trước đó!".

## Actual result
- Cả hai yêu cầu xóa gửi đồng thời đều trả về mã trạng thái thành công `200 OK` cùng body `{ message: "User deleted" }`.
- Backend không có cơ chế kiểm tra sự tồn tại của bản ghi trước khi xóa (hoặc không kiểm tra số dòng bị thay đổi `this.changes === 0` trong SQLite), dẫn đến việc báo cáo kết quả xóa thành công ảo cho Admin thứ hai.

## Evidence
- Kết quả chạy script kiểm thử API tự động:
  ```text
  --- TEST 3: Concurrency (Race Conditions) ---
  Creating a temporary user for concurrency test...
  Temporary user created. ID: 3
  Sending two parallel DELETE requests for user ID: 3...
  Request 1 Status: 200, Body: { message: 'User deleted' }
  Request 2 Status: 200, Body: { message: 'User deleted' }
  ❌ TEST 3 FAILED: Both parallel delete requests returned 200 OK (no concurrency handling, second request did not notice the user was already deleted)!
  ```
