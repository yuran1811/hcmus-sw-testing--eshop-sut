# FR09-APPLY-SEC-005: XSS payload trong code

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / Security / SEC-04

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 5.1 Áp dụng mã giảm giá trong `api_specification.md`
- Người dùng đã đăng nhập.

- Fixture service đặt lại seed user/coupon/coupon_usage và thiết lập use_count, is_active hoặc mốc ngày theo test_id trước mỗi iteration.

## Test data

| Field    | Value                                                                    |
| -------- | ------------------------------------------------------------------------ |
| API      | `POST /api/apply-coupon`                                                 |
| Method   | `POST`                                                                   |
| Endpoint | `/api/apply-coupon`                                                      |
| Category | Security                                                                 |
| SEC Ref  | SEC-04                                                                   |
| Priority | Medium                                                                   |
| Input    | `{"code":"<script>alert(1)</script>","total_amount":500000,"user_id":2}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/apply-coupon`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Theo execution contract A-FR09: HTTP 400; response khớp schema error_required, không lộ secret/stack trace; coupon và coupon_usage không đổi.

## Status / Related bugs

Not Run / None
