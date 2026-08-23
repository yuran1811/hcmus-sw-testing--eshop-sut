# FR04-USRME-ST-007: Hai request liên tiếp không tạo bản ghi hoặc đổi chủ sở hữu

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / State Transition

## Preconditions

- Token hợp lệ của user A; biết `id` hồ sơ trước test.

- Fixture service đặt lại hai seed user, lưu snapshot hồ sơ và quyền trước mỗi iteration; sau iteration sẽ đối chiếu rồi khôi phục dữ liệu.

## Test data

| Field    | Value                                                     |
| -------- | --------------------------------------------------------- |
| API      | `PUT /api/users/me`                                       |
| Method   | `PUT`                                                     |
| Endpoint | `/api/users/me`                                           |
| Category | State Transition                                          |
| SEC Ref  | N/A                                                       |
| Priority | High                                                      |
| Input    | Hai body hợp lệ khác nhau gửi liên tiếp với cùng token A. |

## Test steps

1. Gửi body 1, đọc lại hồ sơ.
2. Gửi body 2, đọc lại hồ sơ và kiểm tra `id`.

## Expected result

Theo execution contract A-FR04: HTTP 200; response khớp schema profile_update_required; GET /api/users/me xác nhận các trường được phép khớp request, còn id, email, role và user khác không đổi. Request tiếp theo cũng trả 200 và hồ sơ cuối khớp body cuối cùng.

## Status / Related bugs

Executed on 2026-08-22 — see [official test run](../../../test-runs/api/FR04_PUT_api_users_me/FR04_PUT_api_users_me_test_run.md) for Pass/Fail result and related bugs.
