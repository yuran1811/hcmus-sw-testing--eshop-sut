# TC-MOBILE-CHECKOUT-009: Ngăn chặn áp dụng mã giảm giá đã hết hạn trên Mobile

## Requirement ID

FR-20

## Module / Test type / Technique

mobile-checkout / Functional / Error Isolation

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Hệ thống có mã giảm giá `EXPIRED` (đã hết hạn sử dụng, ví dụ: hạn dùng là 2020-01-01).
- Đơn hàng trị giá 200.000 ₫ (đủ ngưỡng tối thiểu 100.000 ₫ của mã này).

## Test data

| Parameter | Value |
| --- | --- |
| couponCode | EXPIRED |
| cartTotal | 200.000 ₫ |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và điều hướng đến màn hình Checkout.
2. Nhập mã giảm giá `EXPIRED` và nhấn "Áp dụng".
3. Quan sát phản hồi lỗi hiển thị trên màn hình ứng dụng.

## Expected result

- Hệ thống từ chối áp dụng mã giảm giá.
- Hiển thị thông báo lỗi bằng tiếng Việt: "Mã giảm giá đã hết hạn sử dụng!". Thông báo lỗi này bắt buộc phải xuất hiện ở phía TRÊN nút "Áp dụng" / hành động đặt hàng theo quy chuẩn thiết kế (FR-22).
- Không thực hiện trừ tiền đơn hàng, tổng tiền giữ nguyên là `200.000 ₫`.

## Status / Related bugs

Not Run / None
