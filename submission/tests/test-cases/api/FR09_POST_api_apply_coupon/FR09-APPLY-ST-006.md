# FR09-APPLY-ST-006: Request bị từ chối không tiêu lượt dùng

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / State Transition

## Preconditions

- JWT hợp lệ; user có `use_count(SAVE10) = 0`.
- Request dùng code không tồn tại hoặc tổng tiền thấp hơn ngưỡng.

- Fixture service đặt lại seed user/coupon/coupon_usage và thiết lập use_count, is_active hoặc mốc ngày theo test_id trước mỗi iteration.

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

Theo execution contract A-FR09: HTTP 404; response khớp schema error_required, không lộ secret/stack trace; coupon và coupon_usage không đổi.

## Status / Related bugs

Executed on 2026-08-22 — see [official test run](../../../test-runs/api/FR09_POST_api_apply_coupon/FR09_POST_api_apply_coupon_test_run.md) for Pass/Fail result and related bugs.
