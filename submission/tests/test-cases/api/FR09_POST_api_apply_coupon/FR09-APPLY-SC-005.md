# FR09-APPLY-SC-005: Schema lỗi validation total_amount

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / Schema Validation

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 5.1 Áp dụng mã giảm giá trong `api_specification.md`
- Request có total_amount sai kiểu.

## Test data

| Field    | Value                                                |
| -------- | ---------------------------------------------------- |
| API      | `POST /api/apply-coupon`                             |
| Method   | `POST`                                               |
| Endpoint | `/api/apply-coupon`                                  |
| Category | Schema Validation                                    |
| SEC Ref  | N/A                                                  |
| Priority | Medium                                               |
| Input    | `{"code":"SAVE10","total_amount":"abc","user_id":1}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/apply-coupon`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Status 400. Body lỗi mô tả validation input và không chứa `discount_amount/final_amount` như response thành công.

## Status / Related bugs

Not Run / None
