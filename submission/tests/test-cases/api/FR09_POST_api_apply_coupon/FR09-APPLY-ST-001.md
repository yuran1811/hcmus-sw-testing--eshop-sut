# FR09-APPLY-ST-001: Chuyển trạng thái từ chưa dùng sang đã dùng một lần

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / State Transition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 5.1 Áp dụng mã giảm giá trong `api_specification.md`
- User chưa từng dùng SAVE10; token hợp lệ.

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

Lần áp dụng đầu tiên thành công và ghi nhận lượt dùng của user cho mã SAVE10 nếu flow checkout xác nhận sử dụng mã.

## Status / Related bugs

Not Run / None
