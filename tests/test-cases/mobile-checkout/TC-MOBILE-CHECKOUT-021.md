# TC-MOBILE-CHECKOUT-021: Nhất quán màu sắc nút hành động trên giao diện Mobile

## Requirement ID

FR-21

## Module / Test type / Technique

mobile-checkout / GUI / Error Isolation

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Giỏ hàng đang có sản phẩm và người dùng đang ở trên màn hình giỏ hàng hoặc Checkout.

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và mở màn hình giỏ hàng di động.
2. Quan sát màu sắc của nút "Xóa" (biểu tượng thùng rác) bên cạnh sản phẩm.
3. Quan sát màu sắc của nút "Thanh toán" ở dưới cùng màn hình giỏ hàng.
4. Điều hướng sang màn hình Checkout, quan sát màu sắc của nút "Đặt hàng" và nút "Áp dụng" mã giảm giá.

## Expected result

- Nút "Xóa" (hành động nguy hiểm/hủy bỏ) phải hiển thị màu đỏ rõ rệt (FR-21).
- Các nút "Thanh toán", "Đặt hàng", "Áp dụng" (hành động tích cực/submit) phải hiển thị màu xanh dương nhất quán (FR-21).
- Không trộn lẫn hoặc sử dụng sai quy định màu sắc cho các nút này.

## Status / Related bugs

Not Run / None
