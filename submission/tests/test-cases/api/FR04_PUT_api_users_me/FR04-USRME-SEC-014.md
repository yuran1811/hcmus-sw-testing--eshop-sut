# FR04-USRME-SEC-014: Prototype pollution qua trường ngoài allow-list

## Requirement ID

FR-04 / SEC-06

## Module / Test type / Technique

User Profile API / API Testing / Security

## Preconditions

- Token JWT hợp lệ của user A; lưu snapshot hồ sơ trước request.

- Fixture service đặt lại hai seed user, lưu snapshot hồ sơ và quyền trước mỗi iteration; sau iteration sẽ đối chiếu rồi khôi phục dữ liệu.

## Test data

| Field    | Value                                                                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                                                                                    |
| Method   | `PUT`                                                                                                                                  |
| Endpoint | `/api/users/me`                                                                                                                        |
| Category | Security                                                                                                                               |
| SEC Ref  | SEC-06                                                                                                                                 |
| Priority | High                                                                                                                                   |
| Input    | `{"name":"A","phone":"0912345678","shipping_address":"1 A","__proto__":{"role":"admin"},"constructor":{"prototype":{"role":"admin"}}}` |

## Test steps

1. Gửi request với body trên.
2. Đọc lại hồ sơ bằng `GET /api/users/me` và kiểm tra quyền của user A trong request tiếp theo.

## Expected result

Theo execution contract A-FR04: HTTP 400; response khớp schema error_required; hồ sơ, role, email, password/reset token và user khác không thay đổi.

## Status / Related bugs

Executed on 2026-08-22 — see [official test run](../../../test-runs/api/FR04_PUT_api_users_me/FR04_PUT_api_users_me_test_run.md) for Pass/Fail result and related bugs.
