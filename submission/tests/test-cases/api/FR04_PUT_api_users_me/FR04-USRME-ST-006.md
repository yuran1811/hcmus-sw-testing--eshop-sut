# FR04-USRME-ST-006: Request validation lỗi không làm đổi bất kỳ trường nào

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / State Transition

## Preconditions

- Token hợp lệ của user A; lưu snapshot `name`, `phone`, `shipping_address`.

- Fixture service đặt lại hai seed user, lưu snapshot hồ sơ và quyền trước mỗi iteration; sau iteration sẽ đối chiếu rồi khôi phục dữ liệu.

## Test data

| Field    | Value                                                                 |
| -------- | --------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                   |
| Method   | `PUT`                                                                 |
| Endpoint | `/api/users/me`                                                       |
| Category | State Transition                                                      |
| SEC Ref  | N/A                                                                   |
| Priority | High                                                                  |
| Input    | `{"name":"Tên mới","phone":"09ABC","shipping_address":"Địa chỉ mới"}` |

## Test steps

1. Gửi request với body trên.
2. Gọi `GET /api/users/me` bằng token A.

## Expected result

Theo execution contract A-FR04: HTTP 400; response khớp schema error_required; hồ sơ, role, email, password/reset token và user khác không thay đổi.

## Status / Related bugs

Not Run / None
