# TC-COUPON-ADMIN-008: expired_at = rỗng → bị từ chối

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Admin / Functional / Domain Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Web Admin chạy tại `http://localhost:5174`
- Đăng nhập thành công với tài khoản Admin (`admin@eshop.com` / `Admin123!`).

## Test Data

| Field             | Value        |
| ----------------- | ------------ |
| code              | `"NOEXPIRY"` |
| type              | `"percent"`  |
| discount_value    | `15`         |
| min_order_amount  | `200000`     |
| expired_at        | `""`         |
| max_uses_per_user | `5`          |

## Test Steps

1. Truy cập vào trang quản trị Web Admin `http://localhost:5174`.
2. Tại thanh menu bên trái, nhấp chọn tab "Mã Giảm Giá".
3. Điền thông tin vào Form "Tạo mã giảm giá mới" theo dữ liệu kiểm thử (giữ ngày hết hạn rỗng):
   - Mã coupon: `NOEXPIRY`
   - Loại: `Phần trăm (%)`
   - Giá trị %: `15`
   - Đơn tối thiểu: `200000`
   - Ngày hết hạn: Để trống (`""`)
   - Số lần dùng tối đa/người: `5`
4. Bấm nút "Tạo mã".
5. Quan sát thông báo lỗi/hành vi hệ thống.

## Expected Result

- Hệ thống từ chối submit form do trường Ngày hết hạn có thuộc tính `required` (HTML5 validation), trình duyệt hiển thị thông báo nhắc nhở điền vào trường này.
- Nếu gửi qua API (endpoint `POST /api/admin/coupons`), backend phản hồi mã lỗi `400 Bad Request` hoặc `500 Internal Server Error` kèm thông điệp báo lỗi rõ ràng.
- Mã `NOEXPIRY` không xuất hiện trong danh sách.

## Status / Related Bugs

Not Run / None
