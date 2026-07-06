# TC-CHECKOUT-DTT-002: Thanh toán khi giỏ hàng trống

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Decision Table Testing

## Preconditions

- Người dùng đã đăng nhập thành công
- Giỏ hàng của người dùng hiện tại đang không có sản phẩm nào (trống)
- Rule tương ứng: Rule 2

## Test data

| Field | Value              |
| ----- | ------------------ |
| C1    | Y (Đã đăng nhập)   |
| C2    | N (Giỏ hàng trống) |
| C3    | Không quan tâm     |

## Test steps

1. Truy cập vào trang giỏ hàng (Cart)
2. Quan sát trạng thái giỏ hàng
3. Thử tìm hoặc bấm nút thanh toán (nếu có)

## Expected result

Hệ thống báo lỗi hoặc hiển thị thông báo giỏ hàng trống, không cho phép truy cập trang Checkout hoặc thực hiện thanh toán.

## Status / Related bugs

Pass / None
