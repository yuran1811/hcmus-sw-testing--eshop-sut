# TC-COUPON-011: VIP100 lần dùng thứ 3 (đã đạt max_uses_per_user = 2)

## Requirement ID

FR-09

## Module / Test type / Technique

Checkout / Functional / Domain Testing & BVA (OFF)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Frontend Web chạy tại `http://localhost:5173`
- Tài khoản test `test@eshop.com` / `Test1234!` đã đăng nhập thành công.
- Tài khoản test này đã từng đặt hàng thành công 2 lần trước đó có áp dụng mã `VIP100` (lượt sử dụng của user hiện tại đã đạt 2, max_uses_per_user = 2).
- Tổng đơn hàng hiện tại là 400.000 ₫.

## Test Data

| Field        | Value      |
| ------------ | ---------- |
| code         | `"VIP100"` |
| total_amount | `400000`   |

## Test Steps

1. Truy cập vào trang Checkout `http://localhost:5173/checkout`.
2. Tại phần "Mã Giảm Giá", nhập `VIP100` vào ô nhập liệu.
3. Bấm nút "Áp dụng".
4. Quan sát thông báo lỗi trên giao diện.

## Expected Result

- Hệ thống từ chối áp dụng mã giảm giá.
- Hiển thị thông báo lỗi phù hợp: "Bạn đã sử dụng mã này 2 lần (đã đạt giới hạn)".
- Số tiền giảm giá và tổng thanh toán không thay đổi.

## Status / Related Bugs

Not Run / None
