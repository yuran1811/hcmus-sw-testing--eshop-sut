# FR09-APPLY-SEC-010: Tampering discount và trạng thái coupon trong body

## Requirement ID

FR-09 / SEC-06

## Module / Test type / Technique

Coupon API / API Testing / Security

## Preconditions

- JWT hợp lệ; SAVE10 đang active.

- Fixture service đặt lại seed user/coupon/coupon_usage và thiết lập use_count, is_active hoặc mốc ngày theo test_id trước mỗi iteration.

## Test data

| Field    | Value                                                                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| API      | `POST /api/apply-coupon`                                                                                                               |
| Method   | `POST`                                                                                                                                 |
| Endpoint | `/api/apply-coupon`                                                                                                                    |
| Category | Security                                                                                                                               |
| SEC Ref  | SEC-06                                                                                                                                 |
| Priority | High                                                                                                                                   |
| Input    | `{"code":"SAVE10","total_amount":500000,"user_id":2,"discount_amount":0,"final_amount":0,"is_active":true,"max_uses_per_user":999999}` |

## Test steps

1. Gửi request với các field ngoài body được đặc tả.
2. Kiểm tra response và dữ liệu coupon/user sau request.

## Expected result

Theo execution contract A-FR09: HTTP 400; response khớp schema error_required, không lộ secret/stack trace; coupon và coupon_usage không đổi.

## Status / Related bugs

Not Run / None
