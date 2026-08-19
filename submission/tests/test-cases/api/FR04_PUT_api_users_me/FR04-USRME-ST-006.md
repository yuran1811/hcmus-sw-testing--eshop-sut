# FR04-USRME-ST-006: Request validation lỗi không làm đổi bất kỳ trường nào

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / State Transition

## Preconditions

- Token hợp lệ của user A; lưu snapshot `name`, `phone`, `shipping_address`.

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

Request bị từ chối do phone không hợp lệ; cả ba trường vẫn đúng snapshot trước request, không xảy ra cập nhật một phần.

## Status / Related bugs

Not Run / None
