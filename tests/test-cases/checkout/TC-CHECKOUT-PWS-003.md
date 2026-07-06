# TC-CHECKOUT-PWS-003: Thanh toán bị chặn (Guest - >1 - Invalid Zero)

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Pairwise Testing

## Preconditions

- Người dùng truy cập dưới dạng Guest
- Bằng cách nào đó giả lập giỏ hàng có nhiều sản phẩm

## Test data

| Parameter              | Value                                    |
| ---------------------- | ---------------------------------------- |
| P1: Trạng thái Login   | Guest                                    |
| P2: Sản phẩm trong giỏ | >1                                       |
| P3: `total_amount`     | Invalid_Zero (Thao túng gửi giá trị ≤ 0) |

## Test steps

1. Gửi request thanh toán qua API (POST /checkout)
2. Cố ý sửa đổi payload `total_amount` thành 0 hoặc âm

## Expected result

Hệ thống chặn thanh toán ngay lập tức do chưa đăng nhập.

## Status / Related bugs

Pass / None
