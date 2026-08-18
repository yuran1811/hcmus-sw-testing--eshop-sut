# FR09-APPLY-SEC-009: Race condition tại giới hạn lượt dùng

## Requirement ID

FR-09 / SEC-07

## Module / Test type / Technique

Coupon API / API Testing / Security + State Transition

## Preconditions

- User có JWT hợp lệ và `use_count(SAVE10) = 0`, `max_uses_per_user = 1`.
- Có thể gửi hai request hợp lệ đồng thời.

## Test data

| Field    | Value                                                 |
| -------- | ----------------------------------------------------- |
| API      | `POST /api/apply-coupon`                              |
| Method   | `POST`                                                |
| Endpoint | `/api/apply-coupon`                                   |
| Category | Security                                              |
| Priority | High                                                  |
| Input    | `{"code":"SAVE10","total_amount":500000,"user_id":1}` |

## Test steps

1. Gửi hai request giống nhau đồng thời bằng cùng user/token.
2. Đối chiếu response và `use_count` sau khi cả hai request hoàn tất.

## Expected result

Không có đường đi nào làm vượt `max_uses_per_user`. Nếu endpoint chỉ tính toán, bộ đếm không bị tăng; nếu flow ghi nhận lượt dùng, việc kiểm tra và ghi nhận phải nguyên tử.

## Status / Related bugs

Not Run / None
