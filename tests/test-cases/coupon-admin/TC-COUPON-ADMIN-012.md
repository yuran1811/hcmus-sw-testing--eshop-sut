# TC-COUPON-ADMIN-012: max_uses_per_user = số âm → bị từ chối

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Admin / Functional / Domain Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Web Admin chạy tại `http://localhost:5174`
- Đăng nhập thành công với tài khoản Admin (`admin@eshop.com` / `Admin123!`).

## Test Data

| Field             | Value          |
| ----------------- | -------------- |
| code              | `"MAXUSESNEG"` |
| type              | `"percent"`    |
| discount_value    | `15`           |
| min_order_amount  | `200000`       |
| expired_at        | `"2099-12-31"` |
| max_uses_per_user | `-5`           |

## Test Steps

1. Truy cập vào trang quản trị Web Admin `http://localhost:5174`.
2. Tại thanh menu bên trái, nhấp chọn tab "Mã Giảm Giá".
3. Điền thông tin vào Form "Tạo mã giảm giá mới" theo dữ liệu kiểm thử (max_uses_per_user âm):
   - Mã coupon: `MAXUSESNEG`
   - Loại: `Phần trăm (%)`
   - Giá trị %: `15`
   - Đơn tối thiểu: `200000`
   - Ngày hết hạn: `2099-12-31`
   - Số lần dùng tối đa/người: `-5`
4. Bấm nút "Tạo mã".
5. Quan sát thông báo lỗi/hành vi hệ thống.

## Expected Result

- Hệ thống chặn từ chối tạo mã giảm giá. Trình duyệt báo lỗi min=1 của thẻ input hoặc hệ thống báo lỗi không hợp lệ (status code 4xx/5xx).
- Mã `MAXUSESNEG` không được lưu vào cơ sở dữ liệu.

## Status / Related Bugs

Not Run / None
