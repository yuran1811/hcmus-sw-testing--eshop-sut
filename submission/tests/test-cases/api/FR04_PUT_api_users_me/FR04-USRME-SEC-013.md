# FR04-USRME-SEC-013: Authorization scheme không hợp lệ

## Requirement ID

FR-04 / SEC-02

## Module / Test type / Technique

User Profile API / API Testing / Security

## Preconditions

- API đang chạy và có token hợp lệ của user A để làm đối chứng.

- Fixture service đặt lại hai seed user, lưu snapshot hồ sơ và quyền trước mỗi iteration; sau iteration sẽ đối chiếu rồi khôi phục dữ liệu.

## Test data

| Field    | Value                                                                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                                                                                                                  |
| Method   | `PUT`                                                                                                                                                                |
| Endpoint | `/api/users/me`                                                                                                                                                      |
| Category | Security                                                                                                                                                             |
| SEC Ref  | SEC-02                                                                                                                                                               |
| Priority | High                                                                                                                                                                 |
| Input    | `Authorization: Basic <valid-jwt>` hoặc `Authorization: Token <valid-jwt>`; body hợp lệ: `{"name":"A security check","phone":"0912345678","shipping_address":"1 A"}` |

## Test steps

1. Gửi `PUT /api/users/me` với từng scheme nêu trên.
2. Gọi `GET /api/users/me` bằng token hợp lệ để xác nhận dữ liệu trước/sau.

## Expected result

Theo execution contract A-FR04: HTTP 401; response khớp schema error_required; hồ sơ, role, email, password/reset token và user khác không thay đổi.

## Status / Related bugs

Not Run / None
