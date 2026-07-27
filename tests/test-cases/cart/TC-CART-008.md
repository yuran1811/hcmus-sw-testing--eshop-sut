# TC-CART-008: Tiến hành thanh toán khi chưa đăng nhập

## Requirement ID

FR-07, FR-08

## Module / Test type / Technique

Cart / Functional / Security & Access Control

## Preconditions

- Người dùng chưa đăng nhập hệ thống
- Giỏ hàng đang có ít nhất 1 sản phẩm

## Test data

| User State | Guest (Unauthenticated) |

## Test steps

1. Mở trang Giỏ hàng (`/cart`)
2. Bấm nút **Tiến hành thanh toán**

## Expected result

- Hệ thống hiển thị thông báo cần đăng nhập trước khi thanh toán.
- Người dùng được chuyển hướng về trang Đăng nhập (`/login`).
- Không thể vào thẳng trang Thanh toán (`/checkout`).

## Status / Related bugs

Not Run / None
