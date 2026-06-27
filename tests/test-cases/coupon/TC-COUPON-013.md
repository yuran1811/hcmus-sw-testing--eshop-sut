# TC-COUPON-013: SAVE10, tổng đơn hàng 300,001 ₫ (IN)

## Requirement ID

FR-09

## Module / Test type / Technique

Checkout / Functional / BVA (IN)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Frontend Web chạy tại `http://localhost:5173`
- Đăng nhập thành công với tài khoản test `test@eshop.com` / `Test1234!`.
- Đã đặt tổng tiền đơn hàng là 300.001 ₫ (vừa trên ngưỡng tối thiểu của mã SAVE10).

## Test Data

| Field        | Value      |
| ------------ | ---------- |
| code         | `"SAVE10"` |
| total_amount | `300001`   |

## Test Steps

1. Truy cập vào trang Checkout `http://localhost:5173/checkout`.
2. Tại phần "Mã Giảm Giá", nhập `SAVE10` vào ô nhập liệu.
3. Bấm nút "Áp dụng".
4. Quan sát thông báo và số tiền giảm giá trên giao diện.

## Expected Result

- Áp dụng mã giảm giá thành công.
- Hiển thị thông báo thành công: "Áp dụng thành công! Giảm 10%".
- Tiền giảm giá hiển thị chính xác là `30.000 ₫` (sau khi làm tròn phần nguyên `Math.floor(300001 * 0.1) = 30000`).
- Tổng thanh toán hiển thị chính xác là `270.001 ₫`.

## Status / Related Bugs

Not Run / None
