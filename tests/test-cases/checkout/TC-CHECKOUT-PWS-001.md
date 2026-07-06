# TC-CHECKOUT-PWS-001: Thanh toán bị chặn (Guest - 0 - Valid)

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Pairwise Testing

## Preconditions

- Người dùng truy cập hệ thống dưới dạng Guest (Chưa đăng nhập)
- Giỏ hàng ở trạng thái rỗng (0 sản phẩm)

## Test data

| Parameter              | Value |
| ---------------------- | ----- |
| P1: Trạng thái Login   | Guest |
| P2: Sản phẩm trong giỏ | 0     |
| P3: `total_amount`     | Valid |

## Test steps

1. Truy cập vào trang giỏ hàng (Cart) hoặc gửi API POST /checkout
2. Đính kèm payload `total_amount` khớp với hệ thống (bằng 0)

## Expected result

Hệ thống chặn thanh toán và trả về lỗi hoặc yêu cầu người dùng đăng nhập.

## Status / Related bugs

Pass / None
