# FR09-APPLY-ST-008: Biên thời gian expired_at

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / Domain Partition + State Transition

## Preconditions

- Có coupon với `expired_at` được kiểm soát đến mức timestamp/timezone.
- JWT hợp lệ và tổng đơn đạt min_order_amount.

## Test data

| Field    | Value                                                                         |
| -------- | ----------------------------------------------------------------------------- |
| API      | `POST /api/apply-coupon`                                                      |
| Method   | `POST`                                                                        |
| Endpoint | `/api/apply-coupon`                                                           |
| Category | Domain Partition + State Transition                                           |
| Priority | High                                                                          |
| Input    | Cùng một coupon và tổng đơn đạt ngưỡng, gửi ở ba thời điểm quanh `expired_at` |

## Test steps

1. Gửi request ngay trước `expired_at`.
2. Gửi request tại đúng `expired_at`.
3. Gửi request ngay sau `expired_at`.

## Expected result

Trước hạn được đánh giá theo C2; tại/sau thời điểm không còn thỏa điều kiện "current date before expired_at". Kết quả không phụ thuộc sai lệch timezone hoặc parse ngày.

## Status / Related bugs

Not Run / None
