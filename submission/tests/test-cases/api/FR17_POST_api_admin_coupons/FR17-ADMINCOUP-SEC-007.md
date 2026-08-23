# FR17-ADMINCOUP-SEC-007: Prototype pollution và field ngoài allow-list

## Requirement ID

FR-17 / SEC-06

## Module / Test type / Technique

Coupon API / API Testing / Security

## Preconditions

- JWT hợp lệ của admin.
- Code `PROTOCHECK` chưa tồn tại.

- Fixture service đặt lại seed user/coupon, bảo đảm code thử nghiệm chưa tồn tại, lưu snapshot và xóa dữ liệu tạo trong iteration khi hoàn tất.

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

Theo execution contract A-FR17: HTTP 400; response khớp schema error_required, không lộ secret/stack trace; không tạo coupon và không thay đổi dữ liệu seed.

## Status / Related bugs

Executed on 2026-08-22 — see [official test run](../../../test-runs/api/FR17_POST_api_admin_coupons/FR17_POST_api_admin_coupons_test_run.md) for Pass/Fail result and related bugs.
