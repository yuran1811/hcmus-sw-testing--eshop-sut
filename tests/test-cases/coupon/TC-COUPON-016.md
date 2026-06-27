# TC-COUPON-016: Nhất quán đơn vị tiền khi áp dụng mã giảm giá

## Requirement ID

FR-21 (Giao diện chung / Đơn vị tiền), FR-09

## Module / Test type / Technique

Checkout / UI-UX / GUI Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Frontend Web chạy tại `http://localhost:5173`
- Đăng nhập thành công với tài khoản test `test@eshop.com` / `Test1234!`.
- Đã thêm sản phẩm vào giỏ hàng sao cho tổng tiền của giỏ hàng là 500.000 ₫.

## Test Data

| Field        | Value      |
| ------------ | ---------- |
| code         | `"BIGBUY"` |
| total_amount | `500000`   |

## Test Steps

1. Truy cập vào trang Checkout `http://localhost:5173/checkout`.
2. Tại phần "Mã Giảm Giá", nhập `BIGBUY` vào ô nhập liệu.
3. Bấm nút "Áp dụng".
4. Quan sát cách hiển thị các số tiền (Tiền giảm giá, Tổng thanh toán) sau khi áp dụng mã thành công.

## Expected Result

- Toàn bộ các giá trị tiền tệ trên giao diện phải sử dụng định dạng phân cách hàng nghìn và có ký hiệu `₫` đi kèm ở phía sau:
  - Giá tiền sản phẩm trong danh sách: Ví dụ `500.000 ₫`.
  - Tiết kiệm / Giảm giá: Hiển thị chính xác `50.000 ₫`.
  - Tổng thanh toán: Hiển thị chính xác `450.000 ₫`.
- Không chấp nhận các dạng hiển thị không chuẩn như "50000", "50000đ", "50000 VND", hoặc "50,000".

## Status / Related Bugs

Not Run / None
