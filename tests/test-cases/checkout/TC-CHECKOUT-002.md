# TC-CHECKOUT-002: Thanh toán đơn hàng thất bại khi chưa đăng nhập hoặc token không hợp lệ

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng chưa đăng nhập hoặc token JWT không hợp lệ/đã hết hạn.
- Người dùng (hoặc khách vãng lai) đang có sản phẩm trong giỏ hàng.

## Test data

| Field                | Value                                                                |
| -------------------- | -------------------------------------------------------------------- |
| Authorization Header | Omitted hoặc `Bearer invalid-token-12345`                            |
| Request Body         | `{"total_amount": 200000, "shipping_address": "123 Le Loi, TP.HCM"}` |

## Test steps

1. Không đăng nhập hoặc sử dụng một Token JWT giả mạo/hết hạn.
2. Gửi yêu cầu POST tới `/api/checkout` với Token trên (hoặc không truyền) và Request Body chứa thông tin thanh toán.
3. Kiểm tra phản hồi trả về từ API.
4. Kiểm tra cơ sở dữ liệu để xác nhận không có đơn hàng mới nào được tạo.

## Expected result

- API phản hồi với mã trạng thái `401 Unauthorized` (hoặc thông báo lỗi xác thực phù hợp).
- Không có đơn hàng nào được tạo trong cơ sở dữ liệu.

## EC / Partition Covered

- EC2 (Missing Authorization header) hoặc EC3 (Invalid JWT token)
- OC2 (Error - Unauthorized)

## Status / Related bugs

Not Run / None
