# FR04-USRME-ST-007: Hai request liên tiếp không tạo bản ghi hoặc đổi chủ sở hữu

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / State Transition

## Preconditions

- Token hợp lệ của user A; biết `id` hồ sơ trước test.

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

Trạng thái cuối phản ánh body 2, `id` vẫn là của A, không sinh thêm user và hồ sơ B không đổi.

## Status / Related bugs

Not Run / None
