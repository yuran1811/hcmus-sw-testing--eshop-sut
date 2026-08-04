# TC-CHECKOUT-013: Backend tự tính tổng khi client không gửi total_amount

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout API / Functional-Security / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng đã đăng nhập và có Token JWT hợp lệ.
- Giỏ hàng phía máy chủ của user có 1 "Tai nghe AirPods Pro 2" (6.000.000 ₫) và 1 "Bàn phím cơ Keychron Q1" (4.000.000 ₫).
- Tổng tính từ dữ liệu sản phẩm/giỏ phía máy chủ là 10.000.000 ₫.

## Test data

| Field                | Value                                                                 |
| -------------------- | --------------------------------------------------------------------- |
| Authorization Header | `Bearer <valid_token>`                                                |
| Request Body         | `{"shipping_address": "123 Le Loi, Quan 1, TP.HCM"}`               |
| Omitted field        | `total_amount`                                                        |

## Test steps

1. Chụp trạng thái giỏ hàng phía máy chủ và số đơn hiện có của user.
2. Gửi `POST /api/checkout` với body không chứa `total_amount`.
3. Kiểm tra response và đơn hàng vừa tạo.
4. Kiểm tra tổng tiền, trạng thái đơn và trạng thái giỏ.

## Expected result

- Backend không phụ thuộc vào `total_amount` do client cung cấp mà tự tính tổng từ giỏ hàng phía máy chủ.
- Đơn hàng được tạo với tổng `10000000` và trạng thái `pending`; không được lưu `NULL`, `0` hay `NaN` cho tổng tiền.
- Sau thành công, giỏ của user được xóa.

## EC / Partition Covered

- EC16 (Client total omitted; server-authoritative calculation)
- OC11 (Order total derived from authoritative cart)

## Status / Related bugs

Not Run / N/A
