# FR09-APPLY-ST-003: VIP100 cho phép dùng lần thứ hai

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / State Transition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 5.1 Áp dụng mã giảm giá trong `api_specification.md`
- Trước request, dữ liệu đã xác nhận user có `use_count(VIP100) = 1`; `max_uses_per_user = 2`.

- Fixture service đặt lại seed user/coupon/coupon_usage và thiết lập use_count, is_active hoặc mốc ngày theo test_id trước mỗi iteration.

## Test data

| Field    | Value                                                 |
| -------- | ----------------------------------------------------- |
| API      | `POST /api/apply-coupon`                              |
| Method   | `POST`                                                |
| Endpoint | `/api/apply-coupon`                                   |
| Category | State Transition                                      |
| SEC Ref  | N/A                                                   |
| Priority | High                                                  |
| Input    | `{"code":"VIP100","total_amount":500000,"user_id":2}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/apply-coupon`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Theo execution contract A-FR09: HTTP 200; response khớp schema coupon_success_required; discount_amount = 100000 và final_amount = 400000; coupon và coupon_usage không đổi.

## Status / Related bugs

Not Run / None
