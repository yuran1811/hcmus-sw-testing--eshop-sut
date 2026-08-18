# FR09-APPLY-SC-002: Schema và công thức tiền sau giảm

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / Schema Validation

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 5.1 Áp dụng mã giảm giá trong `api_specification.md`
- Request hợp lệ với BIGBUY.

## Test data

| Field    | Value                                                 |
| -------- | ----------------------------------------------------- |
| API      | `POST /api/apply-coupon`                              |
| Method   | `POST`                                                |
| Endpoint | `/api/apply-coupon`                                   |
| Category | Schema Validation                                     |
| SEC Ref  | N/A                                                   |
| Priority | High                                                  |
| Input    | `{"code":"BIGBUY","total_amount":500000,"user_id":1}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/apply-coupon`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Kiểm tra công thức được đặc tả: `final_amount = total_amount - discount_amount`; đồng thời ghi nhận kiểu dữ liệu, làm tròn và behavior khi kết quả âm vì các điểm này chưa được schema đặc tả.

## Status / Related bugs

Not Run / None
