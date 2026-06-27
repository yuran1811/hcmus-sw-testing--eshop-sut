# TC-COUPON-ADMIN-015: Admin lấy danh sách coupon (GET /api/coupons) → trả về đầy đủ các trường

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Admin / Functional / Domain Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Tài khoản admin (`admin@eshop.com` / `Admin123!`) đã sẵn sàng.
- Đã đăng nhập và lấy Token JWT thành công.
- Có ít nhất một mã giảm giá mẫu đã được lưu trong cơ sở dữ liệu (ví dụ mã `SAVE10`).

## Test Data

- Endpoint: `GET http://localhost:3000/api/coupons`

## Test Steps

1. Gửi một yêu cầu `GET` tới địa chỉ `http://localhost:3000/api/coupons`.
2. Đính kèm Token JWT của tài khoản admin vào Header: `Authorization: Bearer <admin_token>`.
3. Quan sát mã phản hồi (status code) và cấu trúc dữ liệu JSON phản hồi.

## Expected Result

- Hệ thống phản hồi thành công với mã `200 OK`.
- Phản hồi trả về một mảng chứa các đối tượng coupon.
- Mỗi đối tượng coupon phải chứa đầy đủ các trường: `id`, `code`, `type`, `discount_value`, `min_order_amount`, `expired_at`, `max_uses_per_user`, `is_active` (nếu có).

## Status / Related Bugs

Not Run / None
