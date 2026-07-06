# TC-CHECKOUT-PWS-002: Thanh toán bị chặn (Guest - 1 - Invalid Positive)

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Pairwise Testing

## Preconditions

- Người dùng truy cập dưới dạng Guest
- Bằng cách nào đó giả lập giỏ hàng có 1 sản phẩm

## Test data

| Parameter              | Value                                            |
| ---------------------- | ------------------------------------------------ |
| P1: Trạng thái Login   | Guest                                            |
| P2: Sản phẩm trong giỏ | 1                                                |
| P3: `total_amount`     | Invalid_Positive (Thao túng gửi giá trị sai > 0) |

## Test steps

1. Gửi request thanh toán qua API (POST /checkout)
2. Body payload chứa 1 sản phẩm nhưng sửa trường `total_amount` thành một mức giá sai lệch

## Expected result

Hệ thống chặn thanh toán và yêu cầu đăng nhập trước. (Không cần quan tâm đến lỗi payload vì bị chặn auth từ sớm).

## Status / Related bugs

Pass / None
