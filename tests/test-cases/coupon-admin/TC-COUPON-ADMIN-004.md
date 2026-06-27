# TC-COUPON-ADMIN-004: code trùng với mã đã tồn tại → bị từ chối (unique constraint)

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Admin / Functional / Domain Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Web Admin chạy tại `http://localhost:5174`
- Đăng nhập thành công với tài khoản Admin (`admin@eshop.com` / `Admin123!`).
- Mã coupon `SAVE10` đã có sẵn trong hệ thống (được tạo trước đó).

## Test Data

| Field             | Value          |
| ----------------- | -------------- |
| code              | `"SAVE10"`     |
| type              | `"percent"`    |
| discount_value    | `15`           |
| min_order_amount  | `200000`       |
| expired_at        | `"2099-12-31"` |
| max_uses_per_user | `5`            |

## Test Steps

1. Truy cập vào trang quản trị Web Admin `http://localhost:5174`.
2. Tại thanh menu bên trái, nhấp chọn tab "Mã Giảm Giá".
3. Điền thông tin vào Form "Tạo mã giảm giá mới" theo dữ liệu kiểm thử (dùng lại mã trùng):
   - Mã coupon: `SAVE10`
   - Loại: `Phần trăm (%)`
   - Giá trị %: `15`
   - Đơn tối thiểu: `200000`
   - Ngày hết hạn: `2099-12-31`
   - Số lần dùng tối đa/người: `5`
4. Bấm nút "Tạo mã".
5. Quan sát thông báo lỗi hiển thị trên giao diện hoặc trong console/network tab.

## Expected Result

- Hệ thống từ chối tạo mã và hiển thị thông báo lỗi chỉ ra rằng mã coupon đã tồn tại (ví dụ: "Lỗi: SQLITE_CONSTRAINT: UNIQUE constraint failed: coupons.code").
- Không có dòng mới nào của mã `SAVE10` được thêm vào danh sách mã giảm giá.

## Status / Related Bugs

Not Run / None
