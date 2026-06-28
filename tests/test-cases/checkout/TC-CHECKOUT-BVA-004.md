# TC-CHECKOUT-BVA-004: Thanh toán đơn hàng thành công khi địa chỉ giao hàng chỉ có đúng 1 ký tự (Cực tiểu biên)

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Boundary Value Analysis (3-point + 2-point)

## Preconditions

- Người dùng đã đăng nhập vào hệ thống và có Token JWT hợp lệ.
- Người dùng đã thêm 1 "Tai nghe AirPods Pro 2" (giá 6.000.000 ₫) và 1 "Bàn phím cơ Keychron Q1" (giá 4.000.000 ₫) vào giỏ hàng.
- Tổng tiền trong giỏ hàng do máy chủ tính toán là 10.000.000 ₫.

## Test data

| Field                | Value                                                 |
| -------------------- | ----------------------------------------------------- |
| Authorization Header | `Bearer <valid_token>`                                |
| Request Body         | `{"total_amount": 10000000, "shipping_address": "A"}` |

## Test steps

1. Đăng nhập và lấy Token JWT hợp lệ.
2. Thêm sản phẩm vào giỏ hàng để tổng tiền đạt 10.000.000 ₫.
3. Gửi yêu cầu POST tới `/api/checkout` với Token JWT và Request Body chứa `total_amount = 10000000` và `shipping_address = "A"` (đúng 1 ký tự).
4. Kiểm tra phản hồi trả về từ API.
5. Kiểm tra cơ sở dữ liệu để xác nhận đơn hàng đã được tạo với địa chỉ giao hàng `"A"`.

## Expected result

- API phản hồi với mã trạng thái `200 OK` và thông báo `"Checkout successful"`.
- Đơn hàng được tạo thành công trong DB với trạng thái `"pending"`, địa chỉ giao hàng `"A"`.

## BVA Coverage

- Độ dài địa chỉ giao hàng `shipping_address` = 1 (Điểm biên B - valid cực tiểu).
- Bao phủ bởi kỹ thuật 3-Point BVA và 2-Point BVA.

## Status / Related bugs

Not Run / None
