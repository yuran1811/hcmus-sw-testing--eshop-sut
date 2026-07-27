# TC-CART-007: Trạng thái giỏ hàng trống (Empty State)

## Requirement ID

FR-07, FR-24

## Module / Test type / Technique

Cart / Functional / Boundary Value Analysis

## Preconditions

- Giỏ hàng chưa có bất kỳ sản phẩm nào (hoặc đã xóa hết)

## Test data

| Cart status | Empty |

## Test steps

1. Truy cập trực tiếp trang Giỏ hàng (`/cart`)

## Expected result

- Giao diện hiển thị Empty State với hình minh họa/icon và thông báo rõ ràng "Giỏ hàng của bạn đang trống".
- Có liên kết **Tiếp tục mua sắm** đưa người dùng về trang chủ (`/`).
- Không hiển thị bảng rỗng hay Tổng tiền `0 ₫`.

## Status / Related bugs

Not Run / None
