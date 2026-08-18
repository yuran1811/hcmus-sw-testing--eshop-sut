# FR09-APPLY-ST-002: Không cho dùng SAVE10 lần thứ hai

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / State Transition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 5.1 Áp dụng mã giảm giá trong `api_specification.md`
- Trước request, dữ liệu đã xác nhận user có `use_count(SAVE10) = 1`; không dùng một request trước đó trong cùng test để tạo state.

## Test data

| Field    | Value                                                 |
| -------- | ----------------------------------------------------- |
| API      | `POST /api/apply-coupon`                              |
| Method   | `POST`                                                |
| Endpoint | `/api/apply-coupon`                                   |
| Category | State Transition                                      |
| SEC Ref  | N/A                                                   |
| Priority | High                                                  |
| Input    | `{"code":"SAVE10","total_amount":500000,"user_id":1}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/apply-coupon`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Hệ thống không áp dụng giảm giá vì tại thời điểm kiểm tra `use_count(SAVE10) = max_uses_per_user = 1`. Ghi nhận status code thực tế; không được trả kết quả giảm giá thành công.

## Status / Related bugs

Not Run / None
