# TC-MOBILE-CHECKOUT-008: Áp dụng thành công mã giảm giá fixed khi đơn hàng đạt ngưỡng tối thiểu trên Mobile

## Requirement ID

FR-20

## Module / Test type / Technique

mobile-checkout / Functional / Equivalence Partitioning

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Hệ thống có mã giảm giá `BIGBUY` (loại fixed, giảm cố định 50.000 ₫, áp dụng cho đơn hàng tối thiểu từ 500.000 ₫).
- Người dùng có giỏ hàng trị giá 550.000 ₫.

## Test data

| Parameter | Value |
| --- | --- |
| couponCode | BIGBUY |
| minOrderAmount | 500.000 ₫ |
| cartTotal | 550.000 ₫ |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và điều hướng đến màn hình Checkout.
2. Nhập mã giảm giá `BIGBUY` và nhấn "Áp dụng".
3. Quan sát số tiền giảm giá và tổng tiền cuối cùng hiển thị.

## Expected result

- Hệ thống áp dụng mã giảm giá thành công.
- Số tiền giảm giá hiển thị chính xác: `50.000 ₫`.
- Tổng tiền thanh toán cuối cùng được cập nhật thành: `500.000 ₫`.

## Status / Related bugs

Not Run / None
