# TC-MOBILE-CHECKOUT-015: Định dạng tiền tệ cho đơn hàng tại biên bắt đầu xuất hiện dấu chấm phân cách trên Mobile

## Requirement ID

FR-21

## Module / Test type / Technique

mobile-checkout / GUI / Boundary Value Analysis (3-Point BVA)

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Giỏ hàng hiện tại đang có sản phẩm trị giá đúng 1.000 ₫ (tại biên xuất hiện dấu chấm phân cách).

## Test data

| Parameter | Value |
| --- | --- |
| cartTotal | 1.000 ₫ |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và truy cập màn hình giỏ hàng hoặc Checkout.
2. Quan sát phần hiển thị số tiền tổng cộng trên giao diện di động.

## Expected result

- Số tiền hiển thị đúng định dạng phân cách hàng nghìn có dấu chấm: `1.000 ₫`.
- Không hiển thị dạng số thô không có dấu chấm (như `1000 ₫`) hoặc sai ký hiệu.

## Status / Related bugs

Not Run / None
