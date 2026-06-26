# TC-MOBILE-CHECKOUT-003: Hiển thị Empty State giỏ hàng trên Mobile khi giỏ hàng trống

## Requirement ID

FR-24

## Module / Test type / Technique

mobile-checkout / GUI / Boundary Value Analysis (2-Point BVA)

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Giỏ hàng của người dùng hiện tại đang trống (0 sản phẩm).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com |
| cartState | 0 items |

## Test steps

1. Mở ứng dụng di động EShop và đăng nhập tài khoản.
2. Nhấp chọn biểu tượng "Giỏ hàng" ở thanh điều hướng phía dưới.
3. Quan sát giao diện hiển thị của màn hình giỏ hàng di động.

## Expected result

- Màn hình giỏ hàng di động không hiển thị bảng trống hay danh sách rỗng.
- Hiển thị giao diện Empty State (trang trống) theo tiêu chuẩn FR-24 bao gồm:
  - Hình vẽ minh họa giỏ hàng trống thân thiện.
  - Dòng thông báo tiếng Việt: "Giỏ hàng của bạn đang trống. Hãy chọn sản phẩm để mua sắm ngay!".
  - Nút bấm "Mua sắm ngay" để đưa người dùng quay lại màn hình danh sách sản phẩm.
- Nút "Thanh toán" hoàn toàn bị ẩn đi hoặc bị vô hiệu hóa (disabled) để không cho phép tương tác.

## Status / Related bugs

Not Run / None
