# TC-CART-002: Thêm cùng một sản phẩm nhiều lần (Gộp số lượng)

## Requirement ID

FR-07

## Module / Test type / Technique

Cart / Functional / Equivalence Partitioning

## Preconditions

- Giỏ hàng đã có Sản phẩm A (Số lượng = 1)

## Test data

| Product | Sản phẩm A |
| Quantity added | 2 |

## Test steps

1. Mở trang Chi tiết Sản phẩm A
2. Ô số lượng nhập = 2
3. Bấm nút **Thêm vào giỏ hàng**
4. Mở trang Giỏ hàng (`/cart`)

## Expected result

- Bảng giỏ hàng chỉ có đúng 1 dòng cho Sản phẩm A (không tạo dòng mới trùng lặp).
- Số lượng của Sản phẩm A tăng từ 1 thành 3.
- Thành tiền dòng và Tổng cộng cập nhật chính xác = Đơn giá × 3.

## Status / Related bugs

Not Run / None
