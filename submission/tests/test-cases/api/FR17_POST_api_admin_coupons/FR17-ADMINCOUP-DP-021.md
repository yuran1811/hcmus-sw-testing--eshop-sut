# FR17-ADMINCOUP-DP-021: expired_at sai định dạng

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / Domain Partition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 6.4 Quản lý Mã Giảm Giá trong `api_specification.md`
- Admin đã đăng nhập.

## Test data

| Field    | Value                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| API      | `POST /api/admin/coupons`                                                                                                       |
| Method   | `POST`                                                                                                                          |
| Endpoint | `/api/admin/coupons`                                                                                                            |
| Category | Domain Partition                                                                                                                |
| SEC Ref  | N/A                                                                                                                             |
| Priority | High                                                                                                                            |
| Input    | `{"code":"BADDATE","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"31-01-2099","max_uses_per_user":1}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/admin/coupons`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Hệ thống không tạo coupon với giá trị ngày không xử lý được và không lỗi 5xx. Ghi nhận format được chấp nhận vì spec chỉ cung cấp ví dụ ngày, chưa chốt schema ISO bắt buộc.

## Status / Related bugs

Not Run / None
