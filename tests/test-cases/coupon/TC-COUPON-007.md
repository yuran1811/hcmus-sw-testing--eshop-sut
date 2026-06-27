# TC-COUPON-007: Tổng đơn hàng bằng 0 ₫

## Requirement ID

FR-09

## Module / Test type / Technique

Checkout / Functional / Domain Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Frontend Web chạy tại `http://localhost:5173`
- Đăng nhập thành công với tài khoản test `test@eshop.com` / `Test1234!`.
- Tổng giỏ hàng hiện tại bằng 0 ₫.

## Test Data

| Field        | Value      |
| ------------ | ---------- |
| code         | `"SAVE10"` |
| total_amount | `0`        |

## Test Steps

1. Truy cập vào trang Checkout `http://localhost:5173/checkout`.
2. Tại phần "Mã Giảm Giá", nhập `SAVE10` vào ô nhập liệu.
3. Bấm nút "Áp dụng".
4. Quan sát thông báo lỗi trên giao diện.

## Expected Result

- Hệ thống từ chối áp dụng mã giảm giá.
- Hiển thị thông báo lỗi phù hợp: "Đơn hàng chưa đủ giá trị tối thiểu 300.000 ₫ để áp dụng mã này" (hoặc thông báo lỗi tổng giá trị không hợp lệ).
- Số tiền giảm giá và tổng thanh toán không thay đổi.

## Status / Related Bugs

Not Run / None
