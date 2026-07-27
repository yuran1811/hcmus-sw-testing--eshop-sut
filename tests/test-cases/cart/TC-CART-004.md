# TC-CART-004: Giảm số lượng sản phẩm bằng nút (-) khi số lượng = 1 (Boundary)

## Requirement ID

FR-07

## Module / Test type / Technique

Cart / Functional / Boundary Value Analysis

## Preconditions

- Trang Giỏ hàng đang hiển thị Sản phẩm A với Số lượng = 1

## Test data

| Button | (-) |

## Test steps

1. Mở trang Giỏ hàng (`/cart`)
2. Bấm nút `−` tại dòng Sản phẩm A

## Expected result

- Số lượng không bị âm hoặc về 0.
- Nút `−` giữ tối thiểu là 1 hoặc hiển thị dialog xác nhận xóa sản phẩm rõ ràng.

## Status / Related bugs

Not Run / None
