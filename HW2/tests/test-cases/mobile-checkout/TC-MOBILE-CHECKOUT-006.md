# TC-MOBILE-CHECKOUT-006: Ngăn chặn áp dụng mã giảm giá percent khi đơn hàng dưới ngưỡng tối thiểu 1 đơn vị trên Mobile

## Requirement ID

FR-20

## Module / Test type / Technique

mobile-checkout / Functional / Boundary Value Analysis (3-Point BVA)

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Hệ thống có mã giảm giá `SAVE10` (ngưỡng tối thiểu từ 300.000 ₫).
- Người dùng có giỏ hàng trị giá đúng 299.999 ₫ (dưới ngưỡng tối thiểu đúng 1 đơn vị).

## Test data

| Parameter | Value |
| --- | --- |
| couponCode | SAVE10 |
| minOrderAmount | 300.000 ₫ |
| cartTotal | 299.999 ₫ (below boundary) |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và điều hướng đến màn hình Checkout.
2. Tại ô nhập mã giảm giá, nhập mã `SAVE10` và nhấn "Áp dụng".
3. Quan sát thông báo phản hồi của hệ thống di động.

## Expected result

- Hệ thống từ chối áp dụng mã giảm giá.
- Hiển thị thông báo lỗi bằng tiếng Việt rõ ràng (ví dụ: "Mã giảm giá chỉ áp dụng cho đơn hàng từ 300.000 ₫ trở lên"). Thông báo lỗi này bắt buộc phải xuất hiện ở phía TRÊN nút "Áp dụng" / hành động đặt hàng theo quy chuẩn thiết kế (FR-22).
- Số tiền giảm giá hiển thị là `0 ₫` và tổng tiền thanh toán giữ nguyên là `299.999 ₫`.

## Status / Related bugs

Not Run / None
