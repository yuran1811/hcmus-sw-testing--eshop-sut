# TC-USER-MANAGEMENT-009: Chặn API xóa người dùng khi gửi request trực tiếp từ tài khoản thường

## Requirement ID

FR-12

## Module / Test type / Technique

user-management / Security / Error Isolation

## Preconditions

- Tài khoản người dùng thường `test@eshop.com` (role = 'user') đã đăng nhập và có JWT Token hợp lệ.
- Hệ thống có tài khoản người dùng thường khác với ID là `99` (`other@eshop.com`).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com (role = user) |
| targetUserIdToDelete | 99 |

## Test steps

1. Đăng nhập tài khoản thường `test@eshop.com` trên client và lấy mã JWT Token từ LocalStorage/Cookie.
2. Sử dụng công cụ gửi request API (như Postman hoặc curl) để gửi một request HTTP DELETE trực tiếp đến API xóa người dùng của admin:
   - URL: `http://localhost:3000/api/admin/users/99`
   - Header: `Authorization: Bearer <JWT_Token_Cua_User_Thuong>`
3. Quan sát mã trạng thái phản hồi HTTP (HTTP Status Code) và nội dung phản hồi từ backend.

## Expected result

- Backend chặn request xóa người dùng từ tài khoản thường.
- HTTP Status Code trả về phải là `403 Forbidden` (hoặc `401 Unauthorized` nếu token không hợp lệ).
- Nội dung phản hồi phải chứa thông báo lỗi tiếng Việt bảo mật (ví dụ: "Quyền truy cập bị từ chối. Yêu cầu quyền Admin.").
- Người dùng có ID `99` không bị xóa khỏi cơ sở dữ liệu.

## Status / Related bugs

Not Run / None
