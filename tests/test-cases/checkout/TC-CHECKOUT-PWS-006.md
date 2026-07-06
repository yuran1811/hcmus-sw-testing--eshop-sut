# TC-CHECKOUT-PWS-006: Backend tự tính lại tổng tiền (User - >1 - Invalid Positive)

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Pairwise Testing

## Preconditions

- Người dùng đã đăng nhập thành công
- Giỏ hàng đang có nhiều hơn 1 sản phẩm

## Test data

| Parameter              | Value                                        |
| ---------------------- | -------------------------------------------- |
| P1: Trạng thái Login   | User                                         |
| P2: Sản phẩm trong giỏ | >1                                           |
| P3: `total_amount`     | Invalid_Positive (Gửi sai số tiền lớn hơn 0) |

## Test steps

1. Truy cập trang giỏ hàng (có >1 sản phẩm) và bấm thanh toán
2. Chặn request API (POST /checkout) bằng proxy tool (vd: Burp Suite)
3. Chỉnh sửa trường `total_amount` trong payload thành một giá trị dương sai lệch (không khớp với tổng tiền giỏ hàng)
4. Gửi request lên server

## Expected result

Backend tự động tính lại tổng tiền thực tế dựa trên danh sách sản phẩm trong giỏ, bỏ qua giá trị sai của client. Thanh toán diễn ra thành công với số tiền đúng và giỏ hàng bị xóa.

## Status / Related bugs

Fail / BUG-CHECKOUT-002
