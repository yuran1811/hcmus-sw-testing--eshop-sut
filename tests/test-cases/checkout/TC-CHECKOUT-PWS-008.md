# TC-CHECKOUT-PWS-008: Backend xử lý payload giá âm/không (User - 1 - Invalid Zero)

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Pairwise Testing

## Preconditions

- Người dùng đã đăng nhập thành công
- Giỏ hàng có duy nhất 1 sản phẩm

## Test data

| Parameter              | Value                           |
| ---------------------- | ------------------------------- |
| P1: Trạng thái Login   | User                            |
| P2: Sản phẩm trong giỏ | 1                               |
| P3: `total_amount`     | Invalid_Zero (Gửi 0 hoặc số âm) |

## Test steps

1. Vào trang giỏ hàng và thực hiện checkout
2. Chặn request API và chỉnh sửa `total_amount` thành 0 hoặc -100
3. Gửi request đã chỉnh sửa

## Expected result

Backend phát hiện `total_amount` không hợp lệ nhưng vẫn tự động tính lại tổng tiền đúng theo giá của 1 sản phẩm. Quá trình thanh toán hoàn tất với giá đúng, giỏ hàng bị xóa.

## Status / Related bugs

Fail / BUG-CHECKOUT-002
