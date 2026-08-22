# FR17-ADMINCOUP-SEC-004: SQL injection trong code khi tạo coupon

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / Security / SEC-05

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 6.4 Quản lý Mã Giảm Giá trong `api_specification.md`
- Admin đã đăng nhập.

- Fixture service đặt lại seed user/coupon, bảo đảm code thử nghiệm chưa tồn tại, lưu snapshot và xóa dữ liệu tạo trong iteration khi hoàn tất.

## Test data

| Field    | Value                                                                                                                                    |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| API      | `POST /api/admin/coupons`                                                                                                                |
| Method   | `POST`                                                                                                                                   |
| Endpoint | `/api/admin/coupons`                                                                                                                     |
| Category | Security                                                                                                                                 |
| SEC Ref  | SEC-05                                                                                                                                   |
| Priority | High                                                                                                                                     |
| Input    | `{"code":"X' OR '1'='1' --","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-01-31","max_uses_per_user":1}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/admin/coupons`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Theo execution contract A-FR17: HTTP 400; response khớp schema error_required, không lộ secret/stack trace; không tạo coupon và không thay đổi dữ liệu seed.

## Status / Related bugs

Not Run / None
