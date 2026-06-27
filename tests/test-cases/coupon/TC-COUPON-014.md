# TC-COUPON-014: BIGBUY, tổng đơn hàng 499,999 ₫ (OFF)

## Requirement ID

FR-09

## Module / Test type / Technique

Checkout / Functional / BVA (OFF)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Frontend Web chạy tại `http://localhost:5173`
- Đăng nhập thành công với tài khoản test `test@eshop.com` / `Test1234!`.
- Đã đặt tổng tiền đơn hàng là 499.999 ₫ (dưới ngưỡng tối thiểu 500.000 ₫ của mã BIGBUY đúng 1 đơn vị).

## Test Data

| Field        | Value      |
| ------------ | ---------- |
| code         | `"BIGBUY"` |
| total_amount | `499999`   |

## Test Steps

1. Truy cập vào trang Checkout `http://localhost:5173/checkout`.
2. Tại phần "Mã Giảm Giá", nhập `BIGBUY` vào ô nhập liệu.
3. Bấm nút "Áp dụng".
4. Quan sát thông báo lỗi trên giao diện.

## Expected Result

- Hệ thống từ chối áp dụng mã giảm giá.
- Hiển thị thông báo lỗi phù hợp: "Đơn hàng chưa đủ giá trị tối thiểu 500.000 ₫ để áp dụng mã này".
- Số tiền giảm giá và tổng thanh toán không thay đổi.

## Status / Related Bugs

Not Run / None
