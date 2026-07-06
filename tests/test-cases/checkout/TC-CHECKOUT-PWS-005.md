# TC-CHECKOUT-PWS-005: Báo lỗi giỏ hàng trống (User - 0 - Invalid Positive)

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Pairwise Testing

## Preconditions

- Người dùng đã đăng nhập thành công
- Giỏ hàng hiện đang rỗng

## Test data

| Parameter              | Value                                |
| ---------------------- | ------------------------------------ |
| P1: Trạng thái Login   | User                                 |
| P2: Sản phẩm trong giỏ | 0                                    |
| P3: `total_amount`     | Invalid_Positive (Thao túng giá > 0) |

## Test steps

1. Sử dụng API (POST /checkout) để tạo request thanh toán cho giỏ hàng trống
2. Sửa payload `total_amount` thành một số dương lớn hơn 0
3. Gửi request lên server

## Expected result

Hệ thống báo lỗi giỏ hàng trống và không cho phép tiến hành thanh toán, bất kể giá trị `total_amount` gửi lên là bao nhiêu.

## Status / Related bugs

Fail / BUG-CHECKOUT-003
