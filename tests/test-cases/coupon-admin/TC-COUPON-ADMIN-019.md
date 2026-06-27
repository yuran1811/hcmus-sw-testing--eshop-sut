# TC-COUPON-ADMIN-019: discount_value = 2 (IN, vừa trên min) → được chấp nhận

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Admin / Functional / BVA (B1 IN)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Web Admin chạy tại `http://localhost:5174`
- Đăng nhập thành công với tài khoản Admin (`admin@eshop.com` / `Admin123!`).
- Mã `BVA_DV_IN` chưa tồn tại trong hệ thống.

## Test Data

| Field             | Value          |
| ----------------- | -------------- |
| code              | `"BVA_DV_IN"`  |
| type              | `"percent"`    |
| discount_value    | `2`            |
| min_order_amount  | `200000`       |
| expired_at        | `"2099-12-31"` |
| max_uses_per_user | `5`            |

## Test Steps

1. Truy cập vào trang quản trị Web Admin `http://localhost:5174`.
2. Tại thanh menu bên trái, nhấp chọn tab "Mã Giảm Giá".
3. Điền đầy đủ thông tin vào Form "Tạo mã giảm giá mới" theo dữ liệu kiểm thử (giá trị discount_value = 2):
   - Mã coupon: `BVA_DV_IN`
   - Loại: `Phần trăm (%)`
   - Giá trị %: `2`
   - Đơn tối thiểu: `200000`
   - Ngày hết hạn: `2099-12-31`
   - Số lần dùng tối đa/người: `5`
4. Bấm nút "Tạo mã".
5. Quan sát thông báo của hệ thống và danh sách hiển thị phía dưới.

## Expected Result

- Hệ thống thực hiện thành công mà không báo lỗi.
- Mã giảm giá `BVA_DV_IN` được tạo thành công và xuất hiện trong danh sách hiển thị với giá trị giảm `2%`.

## Status / Related Bugs

Not Run / None
