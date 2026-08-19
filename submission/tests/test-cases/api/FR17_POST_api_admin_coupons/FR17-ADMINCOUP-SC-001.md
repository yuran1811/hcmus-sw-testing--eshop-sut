# FR17-ADMINCOUP-SC-001: Schema response tạo thành công

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / Schema Validation

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 6.4 Quản lý Mã Giảm Giá trong `api_specification.md`
- Admin gửi request tạo coupon hợp lệ.

## Test data

| Field    | Value                                                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| API      | `POST /api/admin/coupons`                                                                                                            |
| Method   | `POST`                                                                                                                               |
| Endpoint | `/api/admin/coupons`                                                                                                                 |
| Category | Schema Validation                                                                                                                    |
| SEC Ref  | N/A                                                                                                                                  |
| Priority | High                                                                                                                                 |
| Input    | `{"code":"SCHEMAOK","type":"percent","discount_value":15,"min_order_amount":200000,"expired_at":"2099-01-31","max_uses_per_user":1}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/admin/coupons`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Response thành công phải được parse theo content type thực tế và không lộ dữ liệu nhạy cảm. Status, field bắt buộc, kiểu dữ liệu và extra-field policy cần được bổ sung vào API specification trước khi kiểm tra exact schema.

## Status / Related bugs

Not Run / None
