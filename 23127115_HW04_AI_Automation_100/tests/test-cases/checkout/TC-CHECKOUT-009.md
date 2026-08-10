# TC-CHECKOUT-009: Đặc tả hóa hành vi với địa chỉ chỉ chứa khoảng trắng

## Requirement ID

FR-08 / API Specification 4.3 (Specification-gap characterization)

## Module / Test type / Technique

Checkout API / Robustness-Characterization / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng đã đăng nhập và có Token JWT hợp lệ.
- Giỏ hàng phía máy chủ có đúng 1 "Bàn phím cơ Keychron Q1" giá 4.000.000 ₫.

## Test data

| Field                | Value                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| Authorization Header | `Bearer <valid_token>`                                                 |
| `shipping_address`   | `"   "` (3 space characters)                                         |
| Request Body         | `{"total_amount": 4000000, "shipping_address": "   "}`            |

## Test steps

1. Gửi `POST /api/checkout` với dữ liệu trên.
2. Kiểm tra status/response, số đơn được tạo, giá trị địa chỉ lưu trong DB và trạng thái giỏ.
3. Ghi nhận hệ thống có trim input trước khi validate/lưu hay không.

## Expected result

- SRS chưa quy định ràng buộc non-blank; Product Owner cần xác nhận `"   "` phải bị từ chối hay được chấp nhận.
- Hệ thống không được trả `500`, crash hoặc tự biến dữ liệu thành một địa chỉ không liên quan.
- Chính sách khuyến nghị: trim rồi trả `400` với lỗi địa chỉ không hợp lệ; không tạo đơn và giữ nguyên giỏ.
- Nếu chính sách cho phép chuỗi blank, hệ thống phải ghi nhận quyết định này rõ ràng và vẫn bảo đảm tổng tiền/order/cart nhất quán.

## EC / Partition Covered

- EC12 (Specification gap: whitespace-only shipping address)
- OC7 (Deterministic validation/normalization without partial state)

## Status / Related bugs

Pass / None
