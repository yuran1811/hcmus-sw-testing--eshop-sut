# FR09-APPLY-ST-006: Request bị từ chối không tiêu lượt dùng

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / State Transition

## Preconditions

- JWT hợp lệ; user có `use_count(SAVE10) = 0`.
- Request dùng code không tồn tại hoặc tổng tiền thấp hơn ngưỡng.

## Test data

| Field    | Value                                                               |
| -------- | ------------------------------------------------------------------- |
| API      | `POST /api/apply-coupon`                                            |
| Method   | `POST`                                                              |
| Endpoint | `/api/apply-coupon`                                                 |
| Category | State Transition                                                    |
| SEC Ref  | N/A                                                                 |
| Priority | High                                                                |
| Input    | Code không tồn tại hoặc `SAVE10` với `total_amount` thấp hơn 300000 |

## Test steps

1. Ghi nhận `use_count` trước request.
2. Gửi request không thỏa C1 hoặc C3.
3. Đọc lại `use_count` sau request.

## Expected result

Coupon không được áp dụng và `use_count` không tăng. Không có dữ liệu sử dụng một phần sau request bị từ chối.

## Status / Related bugs

Not Run / None
