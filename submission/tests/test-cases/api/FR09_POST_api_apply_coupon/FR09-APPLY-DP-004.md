# FR09-APPLY-DP-004: Tổng tiền đúng bằng ngưỡng tối thiểu

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / Domain Partition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 5.1 Áp dụng mã giảm giá trong `api_specification.md`
- Người dùng đã đăng nhập; mã SAVE10 active và user chưa dùng.

- Fixture service đặt lại seed user/coupon/coupon_usage và thiết lập use_count, is_active hoặc mốc ngày theo test_id trước mỗi iteration.

## Test data

| Field    | Value                                                 |
| -------- | ----------------------------------------------------- |
| API      | `POST /api/apply-coupon`                              |
| Method   | `POST`                                                |
| Endpoint | `/api/apply-coupon`                                   |
| Category | Domain Partition                                      |
| SEC Ref  | N/A                                                   |
| Priority | High                                                  |
| Input    | `{"code":"SAVE10","total_amount":300000,"user_id":2}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/apply-coupon`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Theo execution contract A-FR09: HTTP 200; response khớp schema coupon_success_required; discount_amount = 30000 và final_amount = 270000; coupon và coupon_usage không đổi.

## Status / Related bugs

Executed on 2026-08-22 — see [official test run](../../../test-runs/api/FR09_POST_api_apply_coupon/FR09_POST_api_apply_coupon_test_run.md) for Pass/Fail result and related bugs.
