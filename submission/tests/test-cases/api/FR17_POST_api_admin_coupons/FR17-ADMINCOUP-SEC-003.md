# FR17-ADMINCOUP-SEC-003: JWT bị chỉnh sửa

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / Security / SEC-02

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 6.4 Quản lý Mã Giảm Giá trong `api_specification.md`
- Gửi JWT bị sửa payload thành admin nhưng chữ ký không hợp lệ.

## Test data

| Field    | Value                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| API      | `POST /api/admin/coupons`                                                                                                      |
| Method   | `POST`                                                                                                                         |
| Endpoint | `/api/admin/coupons`                                                                                                           |
| Category | Security                                                                                                                       |
| SEC Ref  | SEC-02                                                                                                                         |
| Priority | High                                                                                                                           |
| Input    | `{"code":"TAMPER","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-01-31","max_uses_per_user":1}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/admin/coupons`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

JWT bị sửa không được chấp nhận; không tạo coupon và không tin role trong token bị sửa. Ghi nhận mã trạng thái thực tế.

## Status / Related bugs

Not Run / None
