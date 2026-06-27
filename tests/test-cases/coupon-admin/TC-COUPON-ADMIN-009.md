# TC-COUPON-ADMIN-009: expired_at = định dạng ngày không hợp lệ ("31-12-2099") → bị từ chối

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Admin / Functional / Domain Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Công cụ kiểm thử API (Postman, cURL, hoặc script kiểm thử) sẵn sàng để gửi yêu cầu trực tiếp.
- Đăng nhập thành công với tài khoản Admin và lấy được JWT Token.

## Test Data

Request Payload (JSON):

```json
{
  "code": "BADEXPIRY",
  "type": "percent",
  "discount_value": 15,
  "min_order_amount": 200000,
  "expired_at": "31-12-2099",
  "max_uses_per_user": 5
}
```

## Test Steps

1. Gửi một yêu cầu `POST` tới địa chỉ `http://localhost:3000/api/admin/coupons`.
2. Đính kèm Token JWT của tài khoản admin vào Header: `Authorization: Bearer <admin_token>`.
3. Truyền Body của yêu cầu theo dữ liệu kiểm thử (loại `expired_at` không đúng định dạng `YYYY-MM-DD`).
4. Quan sát mã phản hồi (status code) và nội dung JSON phản hồi từ Backend.

## Expected Result

- Hệ thống từ chối yêu cầu và trả về lỗi phù hợp (ví dụ: mã lỗi `400 Bad Request` hoặc `500 Internal Server Error` do vi phạm định dạng kiểu ngày hoặc ràng buộc kiểm tra từ DB/backend).
- Cơ sở dữ liệu không lưu trữ mã coupon `BADEXPIRY`.

## Status / Related Bugs

Not Run / None
