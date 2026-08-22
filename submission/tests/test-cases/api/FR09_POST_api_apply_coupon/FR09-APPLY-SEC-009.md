# FR09-APPLY-SEC-009: Race condition tại giới hạn lượt dùng

## Requirement ID

FR-09 / SEC-07

## Module / Test type / Technique

Coupon API / API Testing / Security + State Transition

## Preconditions

- User có JWT hợp lệ và `use_count(SAVE10) = 0`, `max_uses_per_user = 1`.
- Có thể gửi hai request hợp lệ đồng thời.

- Fixture service đặt lại seed user/coupon/coupon_usage và thiết lập use_count, is_active hoặc mốc ngày theo test_id trước mỗi iteration.

## Test data

| Field    | Value                                                 |
| -------- | ----------------------------------------------------- |
| API      | `POST /api/apply-coupon`                              |
| Method   | `POST`                                                |
| Endpoint | `/api/apply-coupon`                                   |
| Category | Security                                              |
| SEC Ref  | SEC-07                                                |
| Priority | High                                                  |
| Input    | `{"code":"SAVE10","total_amount":500000,"user_id":2}` |

## Test steps

1. Gửi hai request giống nhau đồng thời bằng cùng user/token.
2. Đối chiếu response và `use_count` sau khi cả hai request hoàn tất.

## Expected result

Theo execution contract A-FR09: hai request đồng thời đều trả HTTP 200 vì endpoint chỉ tính toán; mỗi response đúng công thức SAVE10 và coupon_usage không đổi. Không request nào gây lỗi 5xx hoặc làm vượt giới hạn.

## Status / Related bugs

Not Run / None
