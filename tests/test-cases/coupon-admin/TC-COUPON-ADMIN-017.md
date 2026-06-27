# TC-COUPON-ADMIN-017: Đăng nhập với role = user (non-admin) → 403 Forbidden

## Requirement ID

FR-12, SEC-03

## Module / Test type / Technique

Coupon Admin / Security / Access Control (Domain Testing)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Tài khoản người dùng thường (`test@eshop.com` / `Test1234!`) đã sẵn sàng.
- Đã đăng nhập bằng tài khoản này và nhận được Token JWT dành cho vai trò `user`.

## Test Data

- Endpoint: `POST http://localhost:3000/api/admin/coupons`
- Payload:
  ```json
  {
    "code": "USERTRY",
    "type": "percent",
    "discount_value": 10,
    "min_order_amount": 100000,
    "expired_at": "2099-12-31",
    "max_uses_per_user": 1
  }
  ```
- Đính kèm Token JWT của người dùng thường vào Header: `Authorization: Bearer <user_token>`.

## Test Steps

1. Gửi yêu cầu `POST` tới `http://localhost:3000/api/admin/coupons` với payload dữ liệu kiểm thử.
2. Đính kèm Token JWT của tài khoản `test@eshop.com` (vai trò `user`) vào Header.
3. Quan sát mã phản hồi (status code) và JSON lỗi phản hồi.

## Expected Result

- Hệ thống từ chối thực hiện yêu cầu.
- Trả về mã lỗi `403 Forbidden` (hoặc chặn truy cập trái phép).
- Mã `USERTRY` không được thêm vào cơ sở dữ liệu.

## Status / Related Bugs

Not Run / None
