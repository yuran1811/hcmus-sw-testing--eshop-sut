# FR04-USRME-SEC-015: Token của user A không thể chọn user B qua các khóa định danh

## Requirement ID

FR-04 / SEC-02 / SEC-06

## Module / Test type / Technique

User Profile API / API Testing / Security

## Preconditions

- Có user A và B, lưu snapshot cả hai; token là của A.

- Fixture service đặt lại hai seed user, lưu snapshot hồ sơ và quyền trước mỗi iteration; sau iteration sẽ đối chiếu rồi khôi phục dữ liệu.

## Test data

| Field    | Value                                                                         |
| -------- | ----------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                           |
| Method   | `PUT`                                                                         |
| Endpoint | `/api/users/me`                                                               |
| Category | Security                                                                      |
| SEC Ref  | SEC-02 / SEC-06                                                               |
| Priority | High                                                                          |
| Input    | Body hợp lệ của A kèm đồng thời `id`, `userId`, `user_id` mang giá trị của B. |

## Test steps

1. Gửi `PUT /api/users/me` bằng token A.
2. Đọc hồ sơ của A và B sau request.

## Expected result

Theo execution contract A-FR04: HTTP 400; response khớp schema error_required; hồ sơ, role, email, password/reset token và user khác không thay đổi.

## Status / Related bugs

Not Run / None
