# TC-MOBILE-CHECKOUT-017: Nhất quán ngôn ngữ tiếng Việt 100% trên giao diện thanh toán Mobile

## Requirement ID

FR-21

## Module / Test type / Technique

mobile-checkout / GUI / Error Isolation

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và điều hướng đến màn hình Checkout.
2. Quét và quan sát toàn bộ giao diện màn hình Checkout từ trên xuống dưới.
3. Kiểm tra ngôn ngữ hiển thị của tất cả tiêu đề, nhãn (như Họ tên, Địa chỉ, Số điện thoại), mô tả sản phẩm, nhãn nút bấm ("Áp dụng", "Đặt hàng"), các placeholder và thông báo lỗi.

## Expected result

- Toàn bộ giao diện màn hình Thanh toán hiển thị bằng tiếng Việt nhất quán 100% (FR-21).
- Không xuất hiện các từ tiếng Anh chưa được dịch (ví dụ: không có "Checkout", "Shipping Address", "Total", "Discount", "Apply", "Place Order").

## Status / Related bugs

Not Run / None
