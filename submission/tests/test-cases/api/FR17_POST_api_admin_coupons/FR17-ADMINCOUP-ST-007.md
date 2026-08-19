# FR17-ADMINCOUP-ST-007: Coupon mới tạo đi qua các trạng thái sử dụng

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / State Transition

## Preconditions

- Admin JWT hợp lệ.
- Có user JWT hợp lệ và dữ liệu coupon mới tạo có `is_active` được xác định.

## Test data

| Field    | Value                                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| API      | `POST /api/admin/coupons`                                                                                                             |
| Method   | `POST`                                                                                                                                |
| Endpoint | `/api/admin/coupons`                                                                                                                  |
| Category | State Transition                                                                                                                      |
| SEC Ref  | N/A                                                                                                                                   |
| Priority | High                                                                                                                                  |
| Input    | `{"code":"LIFECYCLE2026","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` |

## Test steps

1. Admin tạo coupon.
2. Kiểm tra coupon qua API xem danh sách.
3. Nếu coupon active theo contract, user đủ điều kiện thử áp dụng qua `POST /api/apply-coupon`.

## Expected result

Coupon xuất hiện đúng một lần với dữ liệu đã tạo. Khả năng áp dụng phải phù hợp với `is_active`, hạn dùng và contract liên kết FR-09; không tự giả định trạng thái mặc định nếu đặc tả chưa chốt.

## Status / Related bugs

Not Run / None
