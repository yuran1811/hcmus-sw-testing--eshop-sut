# FR09-APPLY-ST-008: Biên thời gian expired_at

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / Domain Partition + State Transition

## Preconditions

- Có coupon với `expired_at` được kiểm soát đến mức timestamp/timezone.
- JWT hợp lệ và tổng đơn đạt min_order_amount.

- Fixture service đặt lại seed user/coupon/coupon_usage và thiết lập use_count, is_active hoặc mốc ngày theo test_id trước mỗi iteration.

## Test data

| Field    | Value                                                                         |
| -------- | ----------------------------------------------------------------------------- |
| API      | `POST /api/apply-coupon`                                                      |
| Method   | `POST`                                                                        |
| Endpoint | `/api/apply-coupon`                                                           |
| Category | Domain Partition + State Transition                                           |
| SEC Ref  | N/A                                                                           |
| Priority | High                                                                          |
| Input    | Cùng một coupon và tổng đơn đạt ngưỡng, gửi ở ba thời điểm quanh `expired_at` |

## Test steps

1. Gửi request ngay trước `expired_at`.
2. Gửi request tại đúng `expired_at`.
3. Gửi request ngay sau `expired_at`.

## Expected result

Theo execution contract A-FR09: coupon hết hạn ngày mai trả HTTP 200; coupon hết hạn đúng ngày hiện tại và ngày hôm qua trả HTTP 400. Cả ba response dùng JSON error/success đúng schema và không thay đổi coupon_usage.

## Status / Related bugs

Not Run / None
