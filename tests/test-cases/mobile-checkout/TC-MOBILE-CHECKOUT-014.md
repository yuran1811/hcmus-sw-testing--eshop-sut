# TC-MOBILE-CHECKOUT-014: Định dạng tiền tệ cho đơn hàng dưới biên xuất hiện dấu chấm phân cách trên Mobile

## Requirement ID

FR-21

## Module / Test type / Technique

mobile-checkout / GUI / Boundary Value Analysis (3-Point BVA)

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Giỏ hàng hiện tại đang có sản phẩm trị giá đúng 999 ₫ (dưới biên xuất hiện dấu chấm phân cách).

## Test data

| Parameter | Value |
| --- | --- |
| cartTotal | 999 ₫ |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và truy cập màn hình giỏ hàng hoặc Checkout.
2. Quan sát phần hiển thị số tiền tổng cộng trên giao diện di động.

## Expected result

- Số tiền hiển thị đúng định dạng: `999 ₫`.
- Không xuất hiện dấu chấm phân cách hàng nghìn (ví dụ: không hiển thị `.999 ₫` hay `99.9 ₫`).
- Sử dụng đúng ký hiệu tiền tệ `₫` đặt ở phía sau giá trị số.

## Status / Related bugs

Not Run / None
