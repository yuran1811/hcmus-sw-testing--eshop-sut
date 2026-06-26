# TC-MOBILE-CHECKOUT-011: Áp dụng thành công mã giảm giá có giới hạn lượt sử dụng khi dưới ngưỡng giới hạn trên Mobile

## Requirement ID

FR-20

## Module / Test type / Technique

mobile-checkout / Functional / Boundary Value Analysis (3-Point BVA)

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Hệ thống có mã giảm giá `VIP100` (giới hạn tối đa 2 lần sử dụng cho mỗi tài khoản, `max_uses_per_user = 2`).
- Tài khoản `test@eshop.com` đã từng áp dụng thành công mã này đúng 1 lần trước đó (số lần dùng hiện tại = 1, dưới biên giới hạn).
- Giỏ hàng di động hiện tại trị giá 350.000 ₫.

## Test data

| Parameter | Value |
| --- | --- |
| couponCode | VIP100 |
| userPastUsesCount | 1 (limit = 2) |
| cartTotal | 350.000 ₫ |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và điều hướng đến màn hình Checkout.
2. Nhập mã giảm giá `VIP100` và nhấn "Áp dụng".
3. Quan sát phản hồi hiển thị trên màn hình.

## Expected result

- Hệ thống áp dụng thành công mã giảm giá (vì số lần đã dùng 1 < 2).
- Số tiền giảm giá hiển thị chính xác: `100.000 ₫` (giảm cố định).
- Tổng tiền thanh toán được cập nhật thành: `250.000 ₫`.

## Status / Related bugs

Not Run / None
