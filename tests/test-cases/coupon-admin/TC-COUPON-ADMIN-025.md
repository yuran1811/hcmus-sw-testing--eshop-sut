# TC-COUPON-ADMIN-025: Thiếu hoàn toàn trường bắt buộc trong body (field key không có mặt) → bị từ chối

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Admin / Functional / Domain Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Công cụ kiểm thử API sẵn sàng để gửi yêu cầu trực tiếp.
- Đăng nhập thành công với tài khoản Admin và lấy được JWT Token.

## Test Data

- Endpoint: `POST http://localhost:3000/api/admin/coupons`
- Payload (thiếu hoàn toàn thuộc tính `code`):
  ```json
  {
    "type": "percent",
    "discount_value": 15,
    "min_order_amount": 200000,
    "expired_at": "2099-12-31",
    "max_uses_per_user": 5
  }
  ```
- Đính kèm Token JWT của Admin vào Header.

## Test Steps

1. Gửi một yêu cầu `POST` tới `http://localhost:3000/api/admin/coupons` với payload khuyết thiếu trường `code` (không khai báo field).
2. Đính kèm Token JWT admin hợp lệ.
3. Quan sát mã phản hồi (status code) và JSON lỗi phản hồi từ Backend.

## Expected Result

- Hệ thống từ chối yêu cầu và trả về lỗi phù hợp (ví dụ: mã lỗi `400 Bad Request` hoặc `500 Internal Server Error` do vi phạm ràng buộc cơ sở dữ liệu `NOT NULL` của trường `code`).
- Không có dòng dữ liệu lỗi nào được chèn vào bảng coupons.

## Status / Related Bugs

Not Run / None
