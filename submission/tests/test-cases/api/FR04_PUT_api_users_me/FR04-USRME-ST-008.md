# FR04-USRME-ST-008: Retry sau timeout không nhân bản cập nhật

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / State Transition + Resilience

## Preconditions

- Token hợp lệ của user A; có thể mô phỏng timeout ở client sau khi request đã gửi.

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

Hồ sơ cuối chỉ có một user A với dữ liệu đúng; retry không tạo bản ghi mới, không đổi role/email và không làm hỏng dữ liệu.

## Status / Related bugs

Not Run / None
