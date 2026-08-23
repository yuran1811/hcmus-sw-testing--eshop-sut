# FR04-USRME-SEC-016: Unknown field không được ghi vào hồ sơ

## Requirement ID

FR-04 / SEC-06

## Module / Test type / Technique

User Profile API / API Testing / Security

## Preconditions

- Token JWT hợp lệ của user A; lưu snapshot hồ sơ.

- Fixture service đặt lại hai seed user, lưu snapshot hồ sơ và quyền trước mỗi iteration; sau iteration sẽ đối chiếu rồi khôi phục dữ liệu.

## Test data

| Field    | Value                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                                                                 |
| Method   | `PUT`                                                                                                               |
| Endpoint | `/api/users/me`                                                                                                     |
| Category | Security                                                                                                            |
| SEC Ref  | SEC-06                                                                                                              |
| Priority | High                                                                                                                |
| Input    | Body gồm các trường hợp lệ và `is_admin`, `permissions`, `passwordHash`, `resetToken`, `createdAt` với giá trị giả. |

## Test steps

1. Gửi request.
2. Đọc lại hồ sơ và kiểm tra response JSON.

## Expected result

Theo execution contract A-FR04: HTTP 400; response khớp schema error_required; hồ sơ, role, email, password/reset token và user khác không thay đổi.

## Status / Related bugs

Executed on 2026-08-22 — see [official test run](../../../test-runs/api/FR04_PUT_api_users_me/FR04_PUT_api_users_me_test_run.md) for Pass/Fail result and related bugs.
