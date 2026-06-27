# TC-COUPON-010: VIP100 lần dùng thứ 2 (dưới giới hạn max = 2)

## Requirement ID

FR-09

## Module / Test type / Technique

Checkout / Functional / Domain Testing & BVA (ON)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Frontend Web chạy tại `http://localhost:5173`
- Tài khoản test `test@eshop.com` / `Test1234!` đã đăng nhập thành công.
- Tài khoản test này đã từng đặt hàng thành công 1 lần trước đó có áp dụng mã `VIP100` (lượt sử dụng của user hiện tại là 1, max_uses_per_user = 2).
- Tổng đơn hàng hiện tại là 300.000 ₫ (ngưỡng tối thiểu của VIP100).

## Test Data

| Field        | Value      |
| ------------ | ---------- |
| code         | `"VIP100"` |
| total_amount | `300000`   |

## Test Steps

1. Truy cập vào trang Checkout `http://localhost:5173/checkout`.
2. Tại phần "Mã Giảm Giá", nhập `VIP100` vào ô nhập liệu.
3. Bấm nút "Áp dụng".
4. Quan sát thông báo và số tiền giảm giá trên giao diện.

## Expected Result

- Áp dụng mã giảm giá thành công.
- Hiển thị thông báo thành công: "Áp dụng thành công! Giảm 100.000 ₫".
- Tiền giảm giá hiển thị chính xác là `100.000 ₫`.
- Tổng thanh toán hiển thị chính xác là `200.000 ₫`.

## Status / Related Bugs

Not Run / None
