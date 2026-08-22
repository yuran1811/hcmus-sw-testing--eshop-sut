# FR04-USRME-ST-008: Retry sau timeout không nhân bản cập nhật

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / State Transition + Resilience

## Preconditions

- Token hợp lệ của user A; có thể mô phỏng timeout ở client sau khi request đã gửi.

- Fixture service đặt lại hai seed user, lưu snapshot hồ sơ và quyền trước mỗi iteration; sau iteration sẽ đối chiếu rồi khôi phục dữ liệu.

## Test data

| Field    | Value                                                 |
| -------- | ----------------------------------------------------- |
| API      | `PUT /api/users/me`                                   |
| Method   | `PUT`                                                 |
| Endpoint | `/api/users/me`                                       |
| Category | State Transition + Resilience                         |
| SEC Ref  | N/A                                                   |
| Priority | Medium                                                |
| Input    | Body hợp lệ cố định được gửi lại một lần sau timeout. |

## Test steps

1. Gửi request và mô phỏng client timeout.
2. Retry cùng request một lần.
3. Đọc hồ sơ bằng `GET /api/users/me`.

## Expected result

Theo execution contract A-FR04: HTTP 200; response khớp schema profile_update_required; GET /api/users/me xác nhận các trường được phép khớp request, còn id, email, role và user khác không đổi. Request tiếp theo cũng trả 200 và hồ sơ cuối khớp body cuối cùng.

## Status / Related bugs

Not Run / None
