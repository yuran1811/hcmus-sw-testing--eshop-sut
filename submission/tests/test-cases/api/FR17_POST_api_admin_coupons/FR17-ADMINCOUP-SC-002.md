# FR17-ADMINCOUP-SC-002: Schema lỗi thiếu field

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / Schema Validation

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 6.4 Quản lý Mã Giảm Giá trong `api_specification.md`
- Admin gửi request thiếu field bắt buộc.

- Fixture service đặt lại seed user/coupon, bảo đảm code thử nghiệm chưa tồn tại, lưu snapshot và xóa dữ liệu tạo trong iteration khi hoàn tất.

## Test data

| Field    | Value                                                        |
| -------- | ------------------------------------------------------------ |
| API      | `POST /api/admin/coupons`                                    |
| Method   | `POST`                                                       |
| Endpoint | `/api/admin/coupons`                                         |
| Category | Schema Validation                                            |
| SEC Ref  | N/A                                                          |
| Priority | Medium                                                       |
| Input    | `{"code":"SCHEMABAD","type":"fixed","discount_value":10000}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/admin/coupons`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Theo execution contract A-FR17: HTTP 400; response khớp schema error_exact, không lộ secret/stack trace; không tạo coupon và không thay đổi dữ liệu seed.

## Status / Related bugs

Not Run / None
