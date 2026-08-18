# FR09-APPLY-SC-003: Schema lỗi mã không tồn tại

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / Schema Validation

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 5.1 Áp dụng mã giảm giá trong `api_specification.md`
- Request dùng mã không tồn tại.

## Test data

| Field    | Value                                                   |
| -------- | ------------------------------------------------------- |
| API      | `POST /api/apply-coupon`                                |
| Method   | `POST`                                                  |
| Endpoint | `/api/apply-coupon`                                     |
| Category | Schema Validation                                       |
| SEC Ref  | N/A                                                     |
| Priority | Medium                                                  |
| Input    | `{"code":"NOTFOUND","total_amount":500000,"user_id":1}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/apply-coupon`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Status 400 hoặc 404. Body lỗi là JSON có `message` hoặc `error` dạng string, không trả HTML.

## Status / Related bugs

Not Run / None
