# TC-CHECKOUT-011: Trang Checkout hiển thị đầy đủ mọi dòng sản phẩm đặt mua

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout Web UI / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng đã đăng nhập trên Frontend Web.
- Giỏ hàng có 2 "Tai nghe AirPods Pro 2" (6.000.000 ₫/sản phẩm) và 1 "Bàn phím cơ Keychron Q1" (4.000.000 ₫).
- Tổng tiền chính xác là 16.000.000 ₫.

## Test data

| Product                    | Unit price  | Quantity | Line total   |
| -------------------------- | ----------- | -------- | ------------ |
| Tai nghe AirPods Pro 2     | 6.000.000 ₫ | 2        | 12.000.000 ₫ |
| Bàn phím cơ Keychron Q1    | 4.000.000 ₫ | 1        | 4.000.000 ₫  |

## Test steps

1. Mở trang Giỏ hàng và xác nhận hai dòng dữ liệu trên.
2. Chọn **Tiến hành thanh toán**.
3. Đối chiếu từng dòng sản phẩm trên trang Checkout với snapshot giỏ ngay trước khi chuyển trang.
4. Đối chiếu tổng tiền hiển thị.

## Expected result

- Trang Checkout hiển thị đủ cả hai sản phẩm, đúng tên, đơn giá, số lượng và thành tiền từng dòng.
- Không có dòng nào bị thiếu, lặp thêm hoặc sai dữ liệu. Đối chiếu theo multiset `(product, unit price, quantity, line total)`; việc đổi thứ tự hiển thị không làm test Fail nếu UI contract không quy định sorting.
- Tổng tiền thanh toán được tính tự động là `16.000.000 ₫`.

## EC / Partition Covered

- EC14 (Valid cart containing multiple product lines and quantity > 1)
- OC9 (Complete checkout product list)

## Status / Related bugs

Fail / BUG-CHECKOUT-008
