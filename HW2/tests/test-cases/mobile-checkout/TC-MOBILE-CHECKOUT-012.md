# TC-MOBILE-CHECKOUT-012: Ngăn chặn áp dụng mã giảm giá khi đạt ngưỡng giới hạn tối đa lượt sử dụng trên Mobile

## Requirement ID

FR-20

## Module / Test type / Technique

mobile-checkout / Functional / Boundary Value Analysis (3-Point BVA)

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Hệ thống có mã giảm giá `VIP100` (giới hạn tối đa 2 lần sử dụng cho mỗi tài khoản, `max_uses_per_user = 2`).
- Tài khoản `test@eshop.com` đã dùng thành công mã này đúng 2 lần trong các đơn hàng trước đó (đạt ngưỡng giới hạn).
- Giỏ hàng di động hiện tại trị giá 350.000 ₫.

## Test data

| Parameter | Value |
| --- | --- |
| couponCode | VIP100 |
| userPastUsesCount | 2 (limit = 2) |
| cartTotal | 350.000 ₫ |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và điều hướng đến màn hình Checkout.
2. Nhập mã giảm giá `VIP100` và nhấn "Áp dụng".
3. Quan sát phản hồi lỗi hiển thị trên màn hình.

## Expected result

- Hệ thống từ chối áp dụng mã giảm giá (vì số lần dùng 2 đã đạt giới hạn tối đa).
- Hiển thị thông báo lỗi tiếng Việt rõ ràng: "Bạn đã sử dụng hết lượt cho phép của mã giảm giá này!". Thông báo lỗi này bắt buộc phải xuất hiện ở phía TRÊN nút "Áp dụng" / hành động đặt hàng theo quy chuẩn thiết kế (FR-22).
- Tổng tiền thanh toán cuối cùng giữ nguyên là `350.000 ₫`.

## Status / Related bugs

Not Run / None
