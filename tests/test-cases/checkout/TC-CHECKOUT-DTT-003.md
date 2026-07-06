# TC-CHECKOUT-DTT-003: Thanh toán hợp lệ thành công

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Decision Table Testing

## Preconditions

- Người dùng đã đăng nhập thành công
- Giỏ hàng đang có ít nhất 1 sản phẩm
- Rule tương ứng: Rule 3

## Test data

| Field | Value                                          |
| ----- | ---------------------------------------------- |
| C1    | Y (Đã đăng nhập)                               |
| C2    | Y (Có sản phẩm)                                |
| C3    | N (Client gửi `total_amount` đúng với thực tế) |

## Test steps

1. Truy cập trang giỏ hàng
2. Bấm Tiến hành thanh toán
3. Tại trang Checkout, xác nhận danh sách sản phẩm hiển thị đầy đủ
4. Thực hiện các bước thanh toán bình thường (submit order)

## Expected result

- Giao diện hiển thị đầy đủ danh sách sản phẩm đặt mua.
- Backend tự động tính toán tổng tiền khớp với giỏ hàng.
- Thanh toán thành công, đơn hàng được tạo.
- Giỏ hàng của người dùng được tự động xóa sau khi thanh toán.

## Status / Related bugs

Fail / BUG-CHECKOUT-001
