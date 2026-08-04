# TC-CHECKOUT-005: Thanh toán thành công với địa chỉ giao hàng thông thường

## Requirement ID

FR-08 / API Specification 4.3

## Module / Test type / Technique

Checkout API / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng đã đăng nhập và có Token JWT hợp lệ.
- Giỏ hàng phía máy chủ có 1 "Tai nghe AirPods Pro 2" (6.000.000 ₫) và 1 "Bàn phím cơ Keychron Q1" (4.000.000 ₫).
- Tổng tiền máy chủ tính từ giỏ hàng là 10.000.000 ₫.

## Test data

| Field                | Value                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Authorization Header | `Bearer <valid_token>`                                                                    |
| `shipping_address`   | `123 Le Loi, Quan 1, TP.HCM`                                                              |
| Request Body         | `{"total_amount": 10000000, "shipping_address": "123 Le Loi, Quan 1, TP.HCM"}`        |

## Test steps

1. Đăng nhập và chuẩn bị giỏ hàng đúng như Preconditions.
2. Gửi `POST /api/checkout` với header và body trong Test data.
3. Kiểm tra HTTP response và lấy `orderId`.
4. Đối chiếu đơn hàng vừa tạo trong DB hoặc qua API đọc đơn hàng.
5. Gọi `GET /api/cart` để kiểm tra trạng thái giỏ sau thanh toán.

## Expected result

- API trả `200 OK` và thông báo thanh toán thành công.
- Đơn hàng có trạng thái `pending`, tổng tiền do máy chủ xác định là `10000000`.
- `shipping_address` được lưu nguyên vẹn là `123 Le Loi, Quan 1, TP.HCM`.
- Giỏ hàng của người dùng được xóa sau khi thanh toán thành công.

## EC / Partition Covered

- EC8 (Valid non-empty shipping address - normal text)
- OC5 (Address accepted and preserved in the created order)

## Status / Related bugs

Not Run / N/A
