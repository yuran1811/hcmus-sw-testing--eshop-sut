# TC-MOBILE-CHECKOUT-026: Áp dụng mã giảm giá fixed có giá trị vượt quá tổng tiền giỏ hàng trên Mobile

## Requirement ID

FR-20, FR-09

## Module / Test type / Technique

mobile-checkout / Functional / Boundary Value Analysis (Edge Case)

## Preconditions

- Tài khoản `test@eshop.com` đã đăng nhập trên ứng dụng di động EShop.
- Hệ thống tồn tại mã giảm giá `BIGGIFT` (loại fixed, giảm cố định 100.000 ₫, áp dụng cho đơn hàng tối thiểu từ 50.000 ₫ trở lên).
- Người dùng có giỏ hàng trị giá đúng 90.000 ₫ (thỏa mãn điều kiện đơn hàng tối thiểu 50.000 ₫ nhưng nhỏ hơn giá trị giảm giá 100.000 ₫).

## Test data

| Parameter | Value |
| --- | --- |
| couponCode | BIGGIFT |
| discountValue | 100.000 ₫ |
| cartTotal | 90.000 ₫ |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và điều hướng đến màn hình Checkout.
2. Tại ô nhập mã giảm giá, nhập mã `BIGGIFT` và nhấn nút "Áp dụng".
3. Quan sát số tiền giảm giá và tổng tiền thanh toán cuối cùng hiển thị trên màn hình Checkout di động.

## Expected result

- Hệ thống áp dụng mã giảm giá thành công vì đơn hàng 90.000 ₫ đã đạt ngưỡng tối thiểu 50.000 ₫.
- Số tiền giảm giá hiển thị là `90.000 ₫` (hoặc hiển thị số tiền giảm `100.000 ₫` nhưng khống chế giá trị thanh toán cuối cùng).
- Tổng tiền thanh toán cuối cùng (Final Amount) được cập nhật chính xác thành: **`0 ₫`**.
- Hệ thống tuyệt đối không tính ra số tiền âm (ví dụ: `-10.000 ₫`), không gây lỗi hiển thị hoặc lỗi logic nghiệp vụ ở backend.

## Status / Related bugs

Not Run / None
