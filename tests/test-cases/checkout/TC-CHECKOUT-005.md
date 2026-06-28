# TC-CHECKOUT-005: Thanh toán đơn hàng thất bại khi địa chỉ giao hàng bị để trống

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng đã đăng nhập vào hệ thống và có Token JWT hợp lệ.
- Người dùng đã thêm 1 "Tai nghe AirPods Pro 2" (giá 6.000.000 ₫) và 1 "Bàn phím cơ Keychron Q1" (giá 4.000.000 ₫) vào giỏ hàng.
- Tổng tiền trong giỏ hàng do máy chủ tính toán là 10.000.000 ₫.

## Test data

| Field                | Value                                                |
| -------------------- | ---------------------------------------------------- |
| Authorization Header | `Bearer <valid_token>`                               |
| Request Body         | `{"total_amount": 10000000, "shipping_address": ""}` |

## Test steps

1. Đăng nhập và lấy Token JWT hợp lệ.
2. Thêm sản phẩm vào giỏ hàng để có tổng tiền 10.000.000 ₫.
3. Gửi yêu cầu POST tới `/api/checkout` với Token JWT trong header và Request Body chứa `total_amount = 10000000` và `shipping_address = ""` (hoặc bỏ trống thuộc tính này).
4. Kiểm tra phản hồi trả về từ API.
5. Kiểm tra cơ sở dữ liệu để xác nhận không có đơn hàng mới nào được tạo.

## Expected result

- API phản hồi với mã trạng thái `400 Bad Request` và thông báo lỗi thiếu địa chỉ giao hàng (ví dụ: `"Shipping address is required"`).
- Không có đơn hàng nào được tạo trong cơ sở dữ liệu.

## EC / Partition Covered

- EC9 (Empty shipping address)
- OC5 (Error - Invalid Address)

## Status / Related bugs

Not Run / None
