# TC-CHECKOUT-001: Thanh toán đơn hàng thành công với thông tin hợp lệ

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng đã đăng nhập vào hệ thống và có Token JWT hợp lệ.
- Người dùng đã thêm 1 "Tai nghe AirPods Pro 2" (giá 6.000.000 ₫) và 1 "Bàn phím cơ Keychron Q1" (giá 4.000.000 ₫) vào giỏ hàng.
- Tổng tiền trong giỏ hàng do máy chủ tính toán là 10.000.000 ₫.

## Test data

| Field                | Value                        |
| -------------------- | ---------------------------- |
| Authorization Header | `Bearer <valid_token>`       |
| Request Body         | `{"total_amount": 10000000}` |

## Test steps

1. Đăng nhập và lấy Token JWT hợp lệ.
2. Thêm 1 "Tai nghe AirPods Pro 2" (6.000.000 ₫) và 1 "Bàn phím cơ Keychron Q1" (4.000.000 ₫) vào giỏ hàng (tổng tiền 10.000.000 ₫).
3. Gửi yêu cầu POST tới `/api/checkout` với Token JWT trong header và Request Body chứa `total_amount = 10000000`.
4. Kiểm tra phản hồi trả về từ API.
5. Kiểm tra cơ sở dữ liệu để xác nhận đơn hàng đã được tạo.
6. Gửi yêu cầu GET tới `/api/cart` để kiểm tra trạng thái giỏ hàng.

## Expected result

- API phản hồi với mã trạng thái `200 OK` và thông báo `"Checkout successful"`.
- Đơn hàng được tạo trong cơ sở dữ liệu với trạng thái `"pending"`, tổng tiền lưu trong DB là `10000000`.
- Giỏ hàng của người dùng được xóa sạch (GET `/api/cart` trả về giỏ hàng trống).

## EC / Partition Covered

- EC1 (Valid token)
- EC4 (Cart contains >= 1 items)
- EC6 (total_amount matches server total)
- EC8 (Non-empty shipping address)
- OC1 (Success response, order pending, cart cleared)

## Status / Related bugs

Not Run / None
