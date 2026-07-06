# TC-CHECKOUT-PWS-009: Thanh toán thành công nhiều SP (User - >1 - Valid)

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Pairwise Testing

## Preconditions

- Người dùng đã đăng nhập thành công
- Giỏ hàng đang có nhiều hơn 1 sản phẩm (ví dụ: 2-3 sản phẩm khác loại)

## Test data

| Parameter              | Value                          |
| ---------------------- | ------------------------------ |
| P1: Trạng thái Login   | User                           |
| P2: Sản phẩm trong giỏ | >1                             |
| P3: `total_amount`     | Valid (Đúng tổng tiền thực tế) |

## Test steps

1. Truy cập trang giỏ hàng và kiểm tra danh sách nhiều sản phẩm
2. Bấm thanh toán
3. Tại trang Checkout, xác nhận danh sách hiển thị đầy đủ và tổng tiền chính xác
4. Xác nhận đặt hàng

## Expected result

Hệ thống xử lý thanh toán thành công. Đơn hàng lưu lại danh sách đầy đủ sản phẩm. Giỏ hàng hiện tại của User bị xóa trắng.

## Status / Related bugs

Fail / BUG-CHECKOUT-001
