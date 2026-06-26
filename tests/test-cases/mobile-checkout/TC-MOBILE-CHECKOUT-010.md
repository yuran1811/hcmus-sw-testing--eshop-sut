# TC-MOBILE-CHECKOUT-010: Ngăn chặn áp dụng mã giảm giá không tồn tại hoặc ngưng hoạt động trên Mobile

## Requirement ID

FR-20

## Module / Test type / Technique

mobile-checkout / Functional / Error Isolation

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập.
- Giỏ hàng di động hiện tại trị giá 350.000 ₫.

## Test data

| Parameter | Value |
| --- | --- |
| couponCode | FAKECOUPON |
| cartTotal | 350.000 ₫ |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và điều hướng đến màn hình Checkout.
2. Nhập mã giảm giá không tồn tại `FAKECOUPON` và nhấn "Áp dụng".
3. Quan sát phản hồi lỗi trên màn hình di động.

## Expected result

- Hệ thống từ chối áp dụng mã.
- Hiển thị thông báo lỗi bằng tiếng Việt: "Mã giảm giá không tồn tại hoặc đã bị ngừng kích hoạt!". Thông báo lỗi này bắt buộc phải xuất hiện ở phía TRÊN nút "Áp dụng" / hành động đặt hàng theo quy chuẩn thiết kế (FR-22).
- Tổng tiền giữ nguyên không đổi.

## Status / Related bugs

Not Run / None
