# FR17-ADMINCOUP-SEC-008: Race condition khi tạo trùng code

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / Security

## Preconditions

- Hai request đồng thời dùng JWT admin hợp lệ.
- Code `RACE2026` chưa tồn tại.

## Test data

| Field    | Value                                                                                                                            |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| API      | `POST /api/admin/coupons`                                                                                                        |
| Method   | `POST`                                                                                                                           |
| Endpoint | `/api/admin/coupons`                                                                                                             |
| Category | Security                                                                                                                         |
| SEC Ref  | SEC-06                                                                                                                           |
| Priority | High                                                                                                                             |
| Input    | `{"code":"RACE2026","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` |

## Test steps

1. Gửi hai request giống nhau đồng thời.
2. Kiểm tra số bản ghi `RACE2026` sau khi cả hai request hoàn tất.

## Expected result

Không có hơn một coupon active với code `RACE2026`. Một request có thể thành công và request còn lại bị từ chối; unique check và insert phải được bảo vệ nguyên tử.

## Status / Related bugs

Not Run / None
