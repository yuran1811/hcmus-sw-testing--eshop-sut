# TC-CHECKOUT-003: Thanh toán đơn hàng thất bại khi giỏ hàng trống

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng đã đăng nhập vào hệ thống và có Token JWT hợp lệ.
- Giỏ hàng của người dùng hiện tại đang trống (0 sản phẩm).

## Test data

| Field                | Value                  |
| -------------------- | ---------------------- |
| Authorization Header | `Bearer <valid_token>` |
| Request Body         | `{"total_amount": 0}`  |

## Test steps

1. Đăng nhập và lấy Token JWT hợp lệ.
2. Đảm bảo giỏ hàng trống (xóa toàn bộ sản phẩm nếu có).
3. Gửi yêu cầu POST tới `/api/checkout` với Token JWT trong header và Request Body chứa `total_amount = 0`.
4. Kiểm tra phản hồi trả về từ API.
5. Kiểm tra cơ sở dữ liệu để xác nhận không có đơn hàng mới nào được tạo.

## Expected result

- API phản hồi với mã trạng thái `400 Bad Request` và thông báo lỗi phù hợp (ví dụ: `"Cart is empty"` hoặc `"Cannot checkout with empty cart"`).
- Không có đơn hàng nào được tạo trong cơ sở dữ liệu.

## EC / Partition Covered

- EC5 (Cart is empty)
- OC3 (Error - Empty Cart)

## Status / Related bugs

Fail / BUG-CHECKOUT-003
