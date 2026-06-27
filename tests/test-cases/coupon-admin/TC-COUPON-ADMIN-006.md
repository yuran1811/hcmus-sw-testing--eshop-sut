# TC-COUPON-ADMIN-006: discount_value = 0 → bị từ chối

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Admin / Functional / Domain Testing & BVA (B1 OFF)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Web Admin chạy tại `http://localhost:5174`
- Đăng nhập thành công với tài khoản Admin (`admin@eshop.com` / `Admin123!`).

## Test Data

| Field             | Value            |
| ----------------- | ---------------- |
| code              | `"DISCOUNTZERO"` |
| type              | `"percent"`      |
| discount_value    | `0`              |
| min_order_amount  | `200000`         |
| expired_at        | `"2099-12-31"`   |
| max_uses_per_user | `5`              |

## Test Steps

1. Truy cập vào trang quản trị Web Admin `http://localhost:5174`.
2. Tại thanh menu bên trái, nhấp chọn tab "Mã Giảm Giá".
3. Điền thông tin vào Form "Tạo mã giảm giá mới" theo dữ liệu kiểm thử (giá trị discount_value = 0):
   - Mã coupon: `DISCOUNTZERO`
   - Loại: `Phần trăm (%)`
   - Giá trị %: `0`
   - Đơn tối thiểu: `200000`
   - Ngày hết hạn: `2099-12-31`
   - Số lần dùng tối đa/người: `5`
4. Bấm nút "Tạo mã".
5. Quan sát thông báo lỗi/hành vi hệ thống.

## Expected Result

- Hệ thống từ chối tạo mã giảm giá.
- Hiển thị thông báo lỗi trên UI hoặc trả về status code `400 Bad Request` chỉ ra giá trị giảm phải lớn hơn 0 (dương).
- Mã `DISCOUNTZERO` không xuất hiện trong danh sách.

## Status / Related Bugs

Not Run / None
