# TC-COUPON-005: Nhập mã đã hết hạn sử dụng

## Requirement ID

FR-09

## Module / Test type / Technique

Checkout / Functional / Domain Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Frontend Web chạy tại `http://localhost:5173`
- Đăng nhập thành công với tài khoản test `test@eshop.com` / `Test1234!`.
- Trong DB có mã giảm giá `EXPIRED` với hạn sử dụng trong quá khứ (ví dụ: `2020-01-01`).
- Đã thêm sản phẩm vào giỏ hàng với tổng tiền lớn hơn ngưỡng tối thiểu của mã (ví dụ: 400.000 ₫).

## Test Data

| Field        | Value       |
| ------------ | ----------- |
| code         | `"EXPIRED"` |
| total_amount | `400000`    |

## Test Steps

1. Truy cập vào trang Checkout `http://localhost:5173/checkout`.
2. Tại phần "Mã Giảm Giá", nhập `EXPIRED` vào ô nhập liệu.
3. Bấm nút "Áp dụng".
4. Quan sát thông báo lỗi trên giao diện.

## Expected Result

- Hệ thống từ chối áp dụng mã giảm giá.
- Hiển thị thông báo lỗi phù hợp: "Mã giảm giá đã hết hạn".
- Số tiền giảm giá và tổng thanh toán không thay đổi.

## Status / Related Bugs

Not Run / None
