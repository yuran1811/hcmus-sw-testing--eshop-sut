# TC-CHECKOUT-BVA-001: Thanh toán đơn hàng thành công khi giỏ hàng có đúng 1 sản phẩm (Cực tiểu biên)

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Boundary Value Analysis (3-point + 2-point)

## Preconditions

- Người dùng đã đăng nhập vào hệ thống và có Token JWT hợp lệ.
- Người dùng đã thêm đúng 1 "Bàn phím cơ Keychron Q1" (giá 4.000.000 ₫) vào giỏ hàng.
- Tổng tiền trong giỏ hàng do máy chủ tính toán là 4.000.000 ₫.

## Test data

| Field                | Value                       |
| -------------------- | --------------------------- |
| Authorization Header | `Bearer <valid_token>`      |
| Request Body         | `{"total_amount": 4000000}` |

## Test steps

1. Đăng nhập và lấy Token JWT hợp lệ.
2. Thêm đúng 1 "Bàn phím cơ Keychron Q1" có giá 4.000.000 ₫ vào giỏ hàng.
3. Gửi yêu cầu POST tới `/api/checkout` với Token JWT trong header và Request Body chứa `total_amount = 4000000`.
4. Kiểm tra phản hồi trả về từ API.
5. Kiểm tra cơ sở dữ liệu để xác nhận đơn hàng đã được tạo với giá trị đúng.
6. Gửi yêu cầu GET tới `/api/cart` để kiểm tra giỏ hàng đã sạch chưa.

## Expected result

- API phản hồi với mã trạng thái `200 OK` và thông báo `"Checkout successful"`.
- Đơn hàng được tạo thành công trong DB với trạng thái `"pending"`, tổng tiền `4000000`.
- Giỏ hàng của người dùng được xóa sạch.

## BVA Coverage

- Số sản phẩm trong giỏ hàng (Cart Item Count) = 1 (Điểm biên B - valid cực tiểu).
- Bao phủ bởi kỹ thuật 3-Point BVA và 2-Point BVA.

## Status / Related bugs

Fail / BUG-CHECKOUT-006
