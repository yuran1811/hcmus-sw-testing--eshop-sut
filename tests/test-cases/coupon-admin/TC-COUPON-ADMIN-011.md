# TC-COUPON-ADMIN-011: max_uses_per_user = 0 → bị từ chối

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Admin / Functional / Domain Testing & BVA (B3 OFF)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Web Admin chạy tại `http://localhost:5174`
- Đăng nhập thành công với tài khoản Admin (`admin@eshop.com` / `Admin123!`).

## Test Data

| Field             | Value           |
| ----------------- | --------------- |
| code              | `"MAXUSESZERO"` |
| type              | `"percent"`     |
| discount_value    | `15`            |
| min_order_amount  | `200000`        |
| expired_at        | `"2099-12-31"`  |
| max_uses_per_user | `0`             |

## Test Steps

1. Truy cập vào trang quản trị Web Admin `http://localhost:5174`.
2. Tại thanh menu bên trái, nhấp chọn tab "Mã Giảm Giá".
3. Điền thông tin vào Form "Tạo mã giảm giá mới" theo dữ liệu kiểm thử (max_uses_per_user = 0):
   - Mã coupon: `MAXUSESZERO`
   - Loại: `Phần trăm (%)`
   - Giá trị %: `15`
   - Đơn tối thiểu: `200000`
   - Ngày hết hạn: `2099-12-31`
   - Số lần dùng tối đa/người: `0`
4. Bấm nút "Tạo mã".
5. Quan sát thông báo lỗi/hành vi hệ thống. (Lưu ý: Form UI có thể có thuộc tính `min="1"` trên input số lần dùng tối đa, điều này cũng cấu thành việc chặn từ UI).

## Expected Result

- Giao diện chặn submit (báo lỗi min=1 trên input) hoặc hệ thống từ chối tạo mã giảm giá với lỗi max_uses_per_user phải >= 1.
- Nếu gửi qua API, hệ thống phản hồi `400 Bad Request` hoặc `500 Internal Server Error` từ backend.
- Mã `MAXUSESZERO` không được tạo.

## Status / Related Bugs

Not Run / None
