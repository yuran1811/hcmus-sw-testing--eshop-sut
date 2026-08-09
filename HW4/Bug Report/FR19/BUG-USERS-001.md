# [BUG][Quản Lý Người Dùng Admin] API danh sách người dùng và API xóa người dùng thiếu phân quyền Admin

## Found by Test Case

- F19-TC-005 & F19-TC-006

## Requirement liên quan

- FR-19

## Severity / Priority

- **Severity**: Critical
- **Priority**: P0

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:3000/api/admin/users
- Build/Commit: 3aa95b1

## Steps to reproduce

1. Đăng nhập hệ thống bằng một tài khoản khách hàng thông thường không phải admin (ví dụ: `test@eshop.com`).
2. Trích xuất mã JWT Token từ phản hồi đăng nhập thành công.
3. Sử dụng một công cụ HTTP Client hoặc script API gửi một yêu cầu GET tới API danh sách quản trị: `http://localhost:3000/api/admin/users` kèm theo header `Authorization: Bearer <user_token>`.
4. Gửi yêu cầu DELETE tới API xóa người dùng: `http://localhost:3000/api/admin/users/<user_id>` kèm theo header `Authorization: Bearer <user_token>`.

## Expected result

- Cả hai yêu cầu đều phải bị chặn lại ở phía máy chủ và trả về mã trạng thái lỗi `403 Forbidden` (hoặc `401 Unauthorized`) do tài khoản thực hiện không có vai trò quản trị (role không phải `admin`).

## Actual result

- Máy chủ vẫn xử lý thành công, trả về danh sách toàn bộ người dùng (kèm các thông tin bảo mật) hoặc xóa người dùng thành công với mã trạng thái `200 OK`. 
- Nguyên nhân: Trong file `backend/server.js`, các endpoint `/api/admin/users` chỉ áp dụng middleware `authenticateToken` để kiểm tra token hợp lệ mà hoàn toàn bỏ qua việc xác thực vai trò quản trị (`req.user.role === 'admin'`).

## Evidence

- Screenshot: ![Screenshot](../Evidences/FR19/F19-TC-005.png)

