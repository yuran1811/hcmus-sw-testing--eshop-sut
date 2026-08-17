# TC-USER-MANAGEMENT-010: Chặn API xóa người dùng khi gửi request trực tiếp từ khách vãng lai

## Requirement ID

FR-12

## Module / Test type / Technique

user-management / Security / Error Isolation

## Preconditions

- Hệ thống có tài khoản người dùng thường với ID là `99` (`other@eshop.com`).
- Request không đính kèm bất kỳ mã token JWT nào trong header.

## Test data

| Parameter | Value |
| --- | --- |
| userSession | anonymous (no JWT token) |
| targetUserIdToDelete | 99 |

## Test steps

1. Sử dụng công cụ gửi request API (như Postman hoặc curl) để gửi một request HTTP DELETE trực tiếp đến API xóa người dùng của admin:
   - URL: `http://localhost:3000/api/admin/users/99`
   - Không đính kèm Header Authorization.
2. Quan sát mã trạng thái phản hồi HTTP (HTTP Status Code) và nội dung phản hồi từ backend.

## Expected result

- Backend chặn hoàn toàn request xóa người dùng từ khách vãng lai.
- HTTP Status Code trả về phải là `401 Unauthorized`.
- Nội dung phản hồi phải thông báo yêu cầu xác thực bằng tiếng Việt hoặc định dạng chuẩn.
- Người dùng có ID `99` không bị xóa khỏi cơ sở dữ liệu.

## Status / Related bugs

Not Run / None
