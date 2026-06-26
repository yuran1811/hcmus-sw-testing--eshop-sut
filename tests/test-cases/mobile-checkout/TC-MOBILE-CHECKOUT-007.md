# TC-MOBILE-CHECKOUT-007: Áp dụng thành công mã giảm giá percent khi đơn hàng trên ngưỡng tối thiểu 1 đơn vị trên Mobile

## Requirement ID

FR-20

## Module / Test type / Technique

mobile-checkout / Functional / Boundary Value Analysis (3-Point BVA)

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Hệ thống có mã giảm giá `SAVE10` (ngưỡng tối thiểu từ 300.000 ₫).
- Người dùng có giỏ hàng trị giá đúng 300.001 ₫ (trên ngưỡng tối thiểu đúng 1 đơn vị).

## Test data

| Parameter | Value |
| --- | --- |
| couponCode | SAVE10 |
| minOrderAmount | 300.000 ₫ |
| cartTotal | 300.001 ₫ (above boundary) |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và điều hướng đến màn hình Checkout.
2. Nhập mã giảm giá `SAVE10` và nhấn "Áp dụng".
3. Quan sát số tiền giảm giá và tổng tiền cuối cùng hiển thị.

## Expected result

- Hệ thống áp dụng mã giảm giá thành công.
- Số tiền giảm giá hiển thị chính xác (làm tròn số): `30.000 ₫` (10% của 300.001 ₫).
- Tổng tiền thanh toán cuối cùng được cập nhật thành: `270.001 ₫`.

## Status / Related bugs

Not Run / None
