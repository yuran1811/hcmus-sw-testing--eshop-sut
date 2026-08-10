# TC-CHECKOUT-015: Thanh toán chỉ xóa giỏ của đúng người dùng thực hiện

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout API / Functional-Data Isolation / Domain Testing (Equivalence Partitioning)

## Preconditions

- Có hai tài khoản user độc lập A và B, mỗi tài khoản có Token JWT hợp lệ.
- Giỏ A có Keychron Q1 x1, tổng 4.000.000 ₫.
- Giỏ B có AirPods Pro 2 x1, tổng 6.000.000 ₫.
- Lưu snapshot hai giỏ và số đơn của hai user trước test.

## Test data

| Actor | Cart before checkout        | Action                                      |
| ----- | --------------------------- | ------------------------------------------- |
| A     | Keychron Q1 x1 = 4.000.000 ₫ | `POST /api/checkout` bằng Token A          |
| B     | AirPods Pro 2 x1 = 6.000.000 ₫ | Không checkout trong test này             |

## Test steps

1. Dùng Token A và B gọi `GET /api/cart`, xác nhận hai snapshot khác nhau.
2. Dùng Token A thực hiện checkout hợp lệ.
3. Dùng từng token gọi lại `GET /api/cart`.
4. Kiểm tra đơn hàng mới của A và B.

## Expected result

- Chỉ tạo một đơn `pending` thuộc user A với tổng 4.000.000 ₫.
- Giỏ A được xóa sau thành công.
- Giỏ B vẫn còn nguyên AirPods x1; không có đơn mới thuộc B và dữ liệu B không bị đọc/sửa bởi checkout của A.

## EC / Partition Covered

- EC18 (Two authenticated users with isolated cart states)
- OC12 (Successful checkout clears only the actor's cart)

## Status / Related bugs

Fail / BUG-CHECKOUT-007
