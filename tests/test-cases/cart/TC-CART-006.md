# TC-CART-006: Xóa sản phẩm khỏi giỏ — Chọn Đồng ý trong Dialog xác nhận

## Requirement ID

FR-07, FR-24

## Module / Test type / Technique

Cart / Functional / Equivalence Partitioning

## Preconditions

- Giỏ hàng đang có 2 sản phẩm A và B

## Test data

| Target Product | Sản phẩm A |
| Action | Click Xóa -> Click Đồng ý |

## Test steps

1. Mở trang Giỏ hàng (`/cart`)
2. Bấm nút **Xóa** tại dòng Sản phẩm A
3. Bấm nút **Xác nhận** (OK/Confirm) trong Dialog

## Expected result

- Đúng dòng Sản phẩm A bị xóa khỏi bảng.
- Dòng Sản phẩm B giữ nguyên.
- Tổng cộng giỏ hàng và Badge Navbar cập nhật lại chính xác.

## Status / Related bugs

Not Run / None
