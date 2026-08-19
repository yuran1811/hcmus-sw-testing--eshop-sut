# FR17-ADMINCOUP-SEC-007: Prototype pollution và field ngoài allow-list

## Requirement ID

FR-17 / SEC-06

## Module / Test type / Technique

Coupon API / API Testing / Security

## Preconditions

- JWT hợp lệ của admin.
- Code `PROTOCHECK` chưa tồn tại.

## Test data

| Field    | Value                                                                      |
| -------- | -------------------------------------------------------------------------- |
| API      | `POST /api/admin/coupons`                                                  |
| Method   | `POST`                                                                     |
| Endpoint | `/api/admin/coupons`                                                       |
| Category | Security                                                                   |
| SEC Ref  | SEC-06                                                                     |
| Priority | High                                                                       |
| Input    | Body hợp lệ kèm `__proto__`, `constructor`, `role`, `isAdmin` và `user_id` |

## Test steps

1. Gửi request với body hợp lệ và các field ngoài allow-list.
2. Kiểm tra response, coupon được tạo và quyền của user sau request.

## Expected result

Server chỉ xử lý sáu field được đặc tả, bỏ qua hoặc từ chối field ngoài allow-list. Không tạo quyền admin, không thay đổi user/coupon ngoài request và không lỗi 5xx.

## Status / Related bugs

Not Run / None
