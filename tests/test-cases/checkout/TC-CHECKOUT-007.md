# TC-CHECKOUT-007: Địa chỉ giao hàng chứa HTML/XSS phải được hiển thị an toàn

## Requirement ID

FR-08, FR-18, SEC-04

## Module / Test type / Technique

Checkout API + Admin Orders UI / Security-Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Có Token JWT hợp lệ của user và Token/phiên đăng nhập hợp lệ của admin.
- Giỏ hàng của user có đúng 1 "Bàn phím cơ Keychron Q1" giá 4.000.000 ₫.
- Trình duyệt bật DevTools để quan sát dialog, console và DOM.

## Test data

| Field                | Value                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Authorization Header | `Bearer <valid_user_token>`                                                                                       |
| `shipping_address`   | `<img src=x onerror=alert('CHECKOUT-XSS')>`                                                                       |
| Request Body         | `{"total_amount": 4000000, "shipping_address": "<img src=x onerror=alert('CHECKOUT-XSS')>"}`                  |

## Test steps

1. Gửi `POST /api/checkout` bằng user token với body trên.
2. Xác nhận đơn hàng được tạo và ghi lại `orderId`.
3. Đăng nhập Web Admin và mở danh sách/chi tiết đơn hàng chứa `orderId`.
4. Quan sát màn hình, console và kiểm tra DOM tại ô địa chỉ giao hàng.

## Expected result

- Payload chỉ được xem là dữ liệu chuỗi; không xuất hiện alert, không chạy event handler và không tạo phần tử `<img>` từ payload.
- Địa chỉ được hiển thị dưới dạng plain text đã escape (có thể thấy nguyên văn ký tự `<` và `>`).
- Không có script nào được thực thi; dữ liệu của các đơn hàng khác không bị ảnh hưởng.

## EC / Partition Covered

- EC10 (Shipping address containing HTML/script payload)
- OC6 (Untrusted address rendered safely as text)

## Status / Related bugs

Pass / None
