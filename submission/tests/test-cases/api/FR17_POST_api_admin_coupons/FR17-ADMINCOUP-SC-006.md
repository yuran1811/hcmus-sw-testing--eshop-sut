# FR17-ADMINCOUP-SC-006: Schema lỗi enum type

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / Schema Validation

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 6.4 Quản lý Mã Giảm Giá trong `api_specification.md`
- Admin gửi type ngoài enum.

## Test data

| Field    | Value                                                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| API      | `POST /api/admin/coupons`                                                                                                     |
| Method   | `POST`                                                                                                                        |
| Endpoint | `/api/admin/coupons`                                                                                                          |
| Category | Schema Validation                                                                                                             |
| SEC Ref  | N/A                                                                                                                           |
| Priority | Medium                                                                                                                        |
| Input    | `{"code":"SCHEMATYPE","type":"bad","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/admin/coupons`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Status 400. Response lỗi không chứa object coupon thành công và không có field dư nhạy cảm.

## Status / Related bugs

Not Run / None
