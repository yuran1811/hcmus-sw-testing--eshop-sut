# TC-CHECKOUT-PWS-007: Thanh toán bị chặn (Guest - 0 - Invalid Zero)

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Pairwise Testing

## Preconditions

- Người dùng truy cập hệ thống dưới dạng Guest
- Giỏ hàng trống

## Test data

| Parameter              | Value                                 |
| ---------------------- | ------------------------------------- |
| P1: Trạng thái Login   | Guest                                 |
| P2: Sản phẩm trong giỏ | 0                                     |
| P3: `total_amount`     | Invalid_Zero (Giá trị bằng 0 hoặc âm) |

## Test steps

1. Gọi trực tiếp API thanh toán (POST /checkout) do không thể đi qua UI
2. Đính kèm payload giỏ hàng trống và `total_amount` bằng 0 hoặc số âm

## Expected result

Hệ thống trả về lỗi yêu cầu đăng nhập trước tiên (mặc dù payload cũng không hợp lệ).

## Status / Related bugs

Pass / None
