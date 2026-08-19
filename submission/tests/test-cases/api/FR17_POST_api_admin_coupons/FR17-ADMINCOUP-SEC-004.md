# FR17-ADMINCOUP-SEC-004: SQL injection trong code khi tạo coupon

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / Security / SEC-05

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 6.4 Quản lý Mã Giảm Giá trong `api_specification.md`
- Admin đã đăng nhập.

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

Không bypass unique check, không lỗi SQL/5xx và không cập nhật nhầm bản ghi; payload được xử lý như dữ liệu literal nếu request được chấp nhận. Việc dùng parameterized query cần source review bổ sung.

## Status / Related bugs

Not Run / None
