# TC-MOBILE-CHECKOUT-004: Cho phép thanh toán trên Mobile khi giỏ hàng có đúng 1 sản phẩm

## Requirement ID

FR-20

## Module / Test type / Technique

mobile-checkout / Functional / Boundary Value Analysis (2-Point BVA)

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Giỏ hàng di động hiện có đúng 1 sản phẩm trị giá 150.000 ₫.

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com |
| cartState | 1 item (150.000 ₫) |

## Test steps

1. Mở ứng dụng di động EShop và đăng nhập tài khoản.
2. Nhấp chọn biểu tượng "Giỏ hàng" ở thanh điều hướng phía dưới.
3. Quan sát danh sách sản phẩm hiển thị trong giỏ hàng (chỉ có 1 sản phẩm).
4. Nhấn nút "Thanh toán" để mở màn hình Checkout.
5. Nhấn nút "Đặt hàng" để hoàn tất giao dịch.

## Expected result

- Giao diện Empty State ẩn đi hoàn toàn.
- Giỏ hàng hiển thị đúng 1 dòng sản phẩm và tổng tiền là `150.000 ₫`.
- Nút "Thanh toán" hoạt động bình thường, cho phép điều hướng đến màn hình đặt hàng và hoàn tất đặt hàng thành công.
- Màn hình Thanh toán hiển thị Breadcrumb dạng: "Trang chủ > Giỏ hàng > Thanh toán" và cho phép nhấn quay lại (FR-23).
- Trường hiển thị "Tổng tiền" trên màn hình Checkout là trường tĩnh (read-only), không cho phép chỉnh sửa hay nhập dữ liệu thủ công (FR-08).

## Status / Related bugs

Not Run / None
