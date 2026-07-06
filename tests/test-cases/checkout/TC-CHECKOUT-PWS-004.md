# TC-CHECKOUT-PWS-004: Thanh toán thành công (User - 1 - Valid)

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Pairwise Testing

## Preconditions

- Người dùng đã đăng nhập thành công
- Giỏ hàng đang có 1 sản phẩm

## Test data

| Parameter              | Value                            |
| ---------------------- | -------------------------------- |
| P1: Trạng thái Login   | User                             |
| P2: Sản phẩm trong giỏ | 1                                |
| P3: `total_amount`     | Valid (Khớp với giá trị thực tế) |

## Test steps

1. Truy cập trang giỏ hàng
2. Tiến hành thanh toán
3. Xác nhận danh sách sản phẩm hiển thị đúng và tổng tiền khớp
4. Bấm đặt hàng/thanh toán

## Expected result

Thanh toán thành công, đơn hàng được tạo và giỏ hàng được xóa.

## Status / Related bugs

Fail / BUG-CHECKOUT-001
