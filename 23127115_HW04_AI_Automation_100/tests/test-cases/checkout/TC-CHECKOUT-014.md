# TC-CHECKOUT-014: Backend không tin danh sách, giá và số lượng sản phẩm bị giả mạo từ client

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout API / Negative-Security / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng đã đăng nhập và có Token JWT hợp lệ.
- Giỏ hàng phía máy chủ có AirPods Pro 2 x1 (6.000.000 ₫) và Keychron Q1 x1 (4.000.000 ₫), tổng 10.000.000 ₫.

## Test data

| Field                | Value                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Authorization Header | `Bearer <valid_token>`                                                                                                   |
| Forged `items`       | Chỉ gửi AirPods với `price = 1`, `quantity = 1`; cố tình bỏ Keychron                                                     |
| Forged total         | `1`                                                                                                                      |
| Request Body         | `{"items":[{"id":4,"name":"Tai nghe AirPods Pro 2","price":1,"quantity":1}],"total_amount":1,"shipping_address":"123 Le Loi"}` |

## Test steps

1. Gọi `GET /api/cart` và lưu snapshot giỏ thật có hai sản phẩm/tổng 10.000.000 ₫.
2. Gửi `POST /api/checkout` với payload giả mạo trên.
3. Kiểm tra response, đơn hàng/order items và giỏ sau request.

## Expected result

- Backend không được tạo đơn có tổng `1` hoặc dùng giá AirPods `1` chỉ vì payload client bị sửa.
- Nếu hệ thống chấp nhận request, phép tính phải dùng đủ dữ liệu authoritative của giỏ/sản phẩm phía máy chủ để cho tổng `10000000`, sau đó xóa đúng giỏ.
- Nếu chính sách là từ chối sai lệch, API trả `400`, không tạo đơn và giữ nguyên giỏ.
- Không có trạng thái trung gian trong đó đơn sai được tạo nhưng giỏ vẫn bị thay đổi.

## EC / Partition Covered

- EC17 (Forged client item list, price, quantity and total)
- OC11 (Server-authoritative items and total; tampered data never persisted)

## Status / Related bugs

Fail / BUG-CHECKOUT-005
