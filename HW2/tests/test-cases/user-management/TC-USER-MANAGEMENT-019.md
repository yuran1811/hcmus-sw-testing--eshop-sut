# TC-USER-MANAGEMENT-019: Chặn API gửi yêu cầu tự xóa chính tài khoản Admin đang đăng nhập (Security Bypass)

## Requirement ID

FR-19, FR-12

## Module / Test type / Technique

user-management / Security / Error Isolation

## Preconditions

- Tài khoản Admin `admin@eshop.com` đang đăng nhập và có token JWT hợp lệ.
- Admin ID của tài khoản này trong cơ sở dữ liệu là `admin_id_123`.

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as admin@eshop.com (role = admin, id = admin_id_123) |
| targetUserId | admin_id_123 (tự xóa chính mình) |

## Test steps

1. Sử dụng công cụ gửi yêu cầu API trực tiếp (như Postman, cURL hoặc một đoạn mã script kiểm thử).
2. Thiết lập header `Authorization: Bearer <JWT_Token_của_Admin>` bằng token JWT hợp lệ của tài khoản admin đang đăng nhập.
3. Gửi yêu cầu HTTP `DELETE` trực tiếp đến endpoint xóa người dùng của backend: `http://localhost:3000/api/admin/users/admin_id_123`.
4. Quan sát mã trạng thái phản hồi HTTP và nội dung trả về từ API backend.

## Expected result

- Backend phát hiện yêu cầu xóa đối tượng người dùng trùng với ID của tài khoản đang đăng nhập hiện tại trong token JWT.
- Backend từ chối thực thi yêu cầu xóa và trả về mã lỗi HTTP `400 Bad Request` hoặc `403 Forbidden`.
- Nội dung lỗi trả về rõ ràng: "Không được phép tự xóa tài khoản đang đăng nhập!".
- Tài khoản Admin không bị xóa khỏi cơ sở dữ liệu và phiên làm việc của Admin vẫn hoạt động bình thường.

## Status / Related bugs

Not Run / None
