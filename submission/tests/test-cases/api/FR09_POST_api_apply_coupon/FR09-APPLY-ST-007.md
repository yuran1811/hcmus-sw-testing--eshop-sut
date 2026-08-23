# FR09-APPLY-ST-007: Áp dụng phép tính không tự làm thay đổi lượt dùng

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / State Transition

## Preconditions

- JWT hợp lệ; user có `use_count(SAVE10) = 0`.
- Theo mô tả API, endpoint đang được kiểm tra như phép tính tổng tiền, chưa có bước checkout xác nhận.

- Fixture service đặt lại seed user/coupon/coupon_usage và thiết lập use_count, is_active hoặc mốc ngày theo test_id trước mỗi iteration.

## Test data

| Field    | Value                                                 |
| -------- | ----------------------------------------------------- |
| API      | `POST /api/apply-coupon`                              |
| Method   | `POST`                                                |
| Endpoint | `/api/apply-coupon`                                   |
| Category | State Transition                                      |
| SEC Ref  | N/A                                                   |
| Priority | Medium                                                |
| Input    | `{"code":"SAVE10","total_amount":500000,"user_id":2}` |

## Test steps

1. Ghi nhận `use_count` trước request.
2. Gửi request hợp lệ một lần.
3. Đọc lại `use_count` sau request.

## Expected result

Theo execution contract A-FR09: HTTP 200; response khớp schema coupon_success_required; discount_amount = 50000 và final_amount = 450000; coupon và coupon_usage không đổi.

## Status / Related bugs

Executed on 2026-08-22 — see [official test run](../../../test-runs/api/FR09_POST_api_apply_coupon/FR09_POST_api_apply_coupon_test_run.md) for Pass/Fail result and related bugs.
