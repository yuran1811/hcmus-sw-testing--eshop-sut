# TC-COUPON-ADMIN-016: Chưa đăng nhập (không có JWT) → 401 Unauthorized

## Requirement ID

FR-12, SEC-02

## Module / Test type / Technique

Coupon Admin / Security / Access Control (Domain Testing)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Công cụ kiểm thử API sẵn sàng.

## Test Data

- Endpoint: `POST http://localhost:3000/api/admin/coupons`
- Payload:
  ```json
  {
    "code": "NOAUTH",
    "type": "percent",
    "discount_value": 10,
    "min_order_amount": 100000,
    "expired_at": "2099-12-31",
    "max_uses_per_user": 1
  }
  ```
- Không đính kèm bất kỳ token nào vào header `Authorization`.

## Test Steps

1. Gửi yêu cầu `POST` tới `http://localhost:3000/api/admin/coupons` với payload dữ liệu kiểm thử.
2. Không cấu hình hoặc loại bỏ trường `Authorization` khỏi Header của yêu cầu.
3. Quan sát mã phản hồi (status code) và JSON lỗi phản hồi.

## Expected Result

- Hệ thống từ chối thực hiện yêu cầu.
- Trả về mã lỗi `401 Unauthorized`.
- Mã `NOAUTH` không được thêm vào cơ sở dữ liệu.

## Status / Related Bugs

Not Run / None
