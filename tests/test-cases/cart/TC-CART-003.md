# TC-CART-003: Tăng số lượng sản phẩm bằng nút (+) trong giỏ

## Requirement ID

FR-07

## Module / Test type / Technique

Cart / Functional / Equivalence Partitioning

## Preconditions

- Trang Giỏ hàng đang hiển thị Sản phẩm A với Số lượng = 2

## Test data

| Button | (+) |

## Test steps

1. Mở trang Giỏ hàng (`/cart`)
2. Bấm nút `+` tại dòng Sản phẩm A

## Expected result

- Số lượng Sản phẩm A tăng lên 3 ngay lập tức.
- Thành tiền dòng cập nhật = Đơn giá × 3.
- Tổng cộng giỏ hàng và Badge trên Navbar tăng đồng bộ 1 đơn vị.

## Status / Related bugs

Not Run / None
