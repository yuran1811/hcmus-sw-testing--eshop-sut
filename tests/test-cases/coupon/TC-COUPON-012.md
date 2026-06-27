# TC-COUPON-012: SAVE10, tổng đơn hàng 300,000 ₫ (ON)

## Requirement ID

FR-09

## Module / Test type / Technique

Checkout / Functional / BVA (ON)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Frontend Web chạy tại `http://localhost:5173`
- Đăng nhập thành công với tài khoản test `test@eshop.com` / `Test1234!`.
- Đã đặt tổng tiền đơn hàng đúng bằng 300.000 ₫ (đúng ngưỡng tối thiểu của mã SAVE10).

## Test Data

| Field        | Value      |
| ------------ | ---------- |
| code         | `"SAVE10"` |
| total_amount | `300000`   |

## Test Steps

1. Truy cập vào trang Checkout `http://localhost:5173/checkout`.
2. Tại phần "Mã Giảm Giá", nhập `SAVE10` vào ô nhập liệu.
3. Bấm nút "Áp dụng".
4. Quan sát thông báo và số tiền giảm giá trên giao diện.

## Expected Result

- Áp dụng mã giảm giá thành công.
- Hiển thị thông báo thành công: "Áp dụng thành công! Giảm 10%".
- Tiền giảm giá hiển thị chính xác là `30.000 ₫`.
- Tổng thanh toán hiển thị chính xác là `270.000 ₫`.

## Status / Related Bugs

Not Run / None
