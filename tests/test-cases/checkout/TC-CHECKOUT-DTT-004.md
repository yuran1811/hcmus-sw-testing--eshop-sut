# TC-CHECKOUT-DTT-004: Backend tự tính lại tổng tiền, từ chối thao túng client

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Decision Table Testing

## Preconditions

- Người dùng đã đăng nhập thành công
- Giỏ hàng đang có ít nhất 1 sản phẩm
- Rule tương ứng: Rule 4

## Test data

| Field | Value                                                                             |
| ----- | --------------------------------------------------------------------------------- |
| C1    | Y (Đã đăng nhập)                                                                  |
| C2    | Y (Có sản phẩm)                                                                   |
| C3    | Y (Client cố tình sửa đổi payload API để gửi `total_amount` sai lệch, vd: gửi $0) |

## Test steps

1. Truy cập trang giỏ hàng và tiến hành thanh toán
2. Mở trình duyệt DevTools (Network tab) hoặc dùng công cụ như Postman/Burp Suite
3. Chặn request thanh toán (submit order) và chỉnh sửa body payload, thay đổi trường `total_amount` thành một số khác (vd: 1 VND hoặc 0)
4. Gửi request lên server

## Expected result

- Backend bỏ qua/không chấp nhận giá trị `total_amount` do client gửi lên.
- Backend tự động tính lại tổng tiền dựa trên sản phẩm thực tế trong giỏ hàng và áp dụng thanh toán theo giá trị đúng.
- Quá trình thanh toán hoàn tất thành công với giá trị hợp lệ.
- Giỏ hàng được xóa.

## Status / Related bugs

Fail / BUG-CHECKOUT-002
