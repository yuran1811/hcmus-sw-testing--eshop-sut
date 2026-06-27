# TC-COUPON-002: Áp dụng mã BIGBUY (fixed) hợp lệ

## Requirement ID

FR-09

## Module / Test type / Technique

Checkout / Functional / Domain Testing & BVA (ON)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Frontend Web chạy tại `http://localhost:5173`
- Tài khoản test `test@eshop.com` / `Test1234!` đã được tạo, chưa từng sử dụng mã `BIGBUY`.
- Đăng nhập thành công với tài khoản test.
- Đã thêm sản phẩm vào giỏ hàng sao cho tổng tiền của giỏ hàng là 500.000 ₫ (đúng bằng ngưỡng tối thiểu của mã BIGBUY).

## Test Data

| Field        | Value      |
| ------------ | ---------- |
| code         | `"BIGBUY"` |
| total_amount | `500000`   |

## Test Steps

1. Truy cập vào trang Checkout `http://localhost:5173/checkout`.
2. Tại phần "Mã Giảm Giá", nhập `BIGBUY` vào ô nhập liệu.
3. Bấm nút "Áp dụng".
4. Quan sát thông báo và số tiền thay đổi trên giao diện.

## Expected Result

- Áp dụng mã giảm giá thành công.
- Hiển thị thông báo thành công: "Áp dụng thành công! Giảm 50.000 ₫".
- Tiền giảm giá hiển thị chính xác là `50.000 ₫`.
- Tổng thanh toán hiển thị chính xác là `450.000 ₫`.

## Status / Related Bugs

Not Run / None
