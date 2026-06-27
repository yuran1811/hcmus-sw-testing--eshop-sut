# TC-COUPON-015: BIGBUY, tổng đơn hàng 500,001 ₫ (IN)

## Requirement ID

FR-09

## Module / Test type / Technique

Checkout / Functional / BVA (IN)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Frontend Web chạy tại `http://localhost:5173`
- Đăng nhập thành công với tài khoản test `test@eshop.com` / `Test1234!`.
- Đã đặt tổng tiền đơn hàng là 500.001 ₫ (vừa trên ngưỡng tối thiểu của mã BIGBUY).

## Test Data

| Field        | Value      |
| ------------ | ---------- |
| code         | `"BIGBUY"` |
| total_amount | `500001`   |

## Test Steps

1. Truy cập vào trang Checkout `http://localhost:5173/checkout`.
2. Tại phần "Mã Giảm Giá", nhập `BIGBUY` vào ô nhập liệu.
3. Bấm nút "Áp dụng".
4. Quan sát thông báo và số tiền giảm giá trên giao diện.

## Expected Result

- Áp dụng mã giảm giá thành công.
- Hiển thị thông báo thành công: "Áp dụng thành công! Giảm 50.000 ₫".
- Tiền giảm giá hiển thị chính xác là `50.000 ₫`.
- Tổng thanh toán hiển thị chính xác là `450.001 ₫`.

## Status / Related Bugs

Not Run / None
