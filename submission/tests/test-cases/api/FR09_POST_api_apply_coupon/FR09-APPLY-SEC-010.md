# FR09-APPLY-SEC-010: Tampering discount và trạng thái coupon trong body

## Requirement ID

FR-09 / SEC-06

## Module / Test type / Technique

Coupon API / API Testing / Security

## Preconditions

- JWT hợp lệ; SAVE10 đang active.

## Test data

| Field    | Value                                                                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| API      | `POST /api/apply-coupon`                                                                                                               |
| Method   | `POST`                                                                                                                                 |
| Endpoint | `/api/apply-coupon`                                                                                                                    |
| Category | Security                                                                                                                               |
| SEC Ref  | SEC-06                                                                                                                                 |
| Priority | High                                                                                                                                   |
| Input    | `{"code":"SAVE10","total_amount":500000,"user_id":1,"discount_amount":0,"final_amount":0,"is_active":true,"max_uses_per_user":999999}` |

## Test steps

1. Gửi request với các field ngoài body được đặc tả.
2. Kiểm tra response và dữ liệu coupon/user sau request.

## Expected result

Server tự tính `discount_amount = 50000` và `final_amount = 450000` từ dữ liệu server; các field thêm vào bị bỏ qua hoặc bị từ chối. Không thay đổi trạng thái coupon, quyền user hoặc giới hạn lượt dùng.

## Status / Related bugs

Not Run / None
