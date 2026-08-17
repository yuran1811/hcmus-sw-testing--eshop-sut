# TC-MOBILE-CHECKOUT-005: Áp dụng thành công mã giảm giá percent khi đơn hàng đạt đúng ngưỡng tối thiểu trên Mobile

## Requirement ID

FR-20

## Module / Test type / Technique

mobile-checkout / Functional / Boundary Value Analysis (3-Point BVA)

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Hệ thống có mã giảm giá `SAVE10` (loại percent, giảm 10%, áp dụng cho đơn hàng tối thiểu từ 300.000 ₫).
- Người dùng có giỏ hàng trị giá đúng 300.000 ₫ (đạt đúng ngưỡng tối thiểu).

## Test data

| Parameter | Value |
| --- | --- |
| couponCode | SAVE10 |
| minOrderAmount | 300.000 ₫ |
| cartTotal | 300.000 ₫ (at boundary) |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và truy cập giỏ hàng.
2. Nhấn nút "Thanh toán" để mở màn hình Checkout di động.
3. Tại màn hình Checkout, tìm ô nhập "Mã giảm giá".
4. Nhập chính xác mã `SAVE10` và nhấn nút "Áp dụng".
5. Quan sát số tiền giảm giá và tổng tiền cuối cùng hiển thị trên màn hình.

## Expected result

- Hệ thống áp dụng mã giảm giá thành công.
- Số tiền giảm giá hiển thị chính xác: `30.000 ₫` (10% của 300.000 ₫).
- Tổng tiền thanh toán cuối cùng (Final Amount) được cập nhật ngay lập tức thành: `270.000 ₫`.
- Không có bất kỳ thông báo lỗi nào xuất hiện.

## Status / Related bugs

Not Run / None
