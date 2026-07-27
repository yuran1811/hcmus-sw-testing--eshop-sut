# TC-CART-005: Xóa sản phẩm khỏi giỏ — Chọn Hủy trong Dialog xác nhận

## Requirement ID

FR-07, FR-24

## Module / Test type / Technique

Cart / Functional / Equivalence Partitioning

## Preconditions

- Giỏ hàng đang có 2 sản phẩm A và B

## Test data

| Target Product | Sản phẩm A |
| Action | Click Xóa -> Click Hủy |

## Test steps

1. Mở trang Giỏ hàng (`/cart`)
2. Bấm nút **Xóa** tại dòng Sản phẩm A
3. Quan sát Dialog xác nhận hiển thị
4. Bấm nút **Hủy** (Cancel) trong Dialog

## Expected result

- Dialog xác nhận đóng lại.
- Sản phẩm A vẫn giữ nguyên trong giỏ hàng, số lượng và tổng tiền không thay đổi.

## Status / Related bugs

Not Run / None
