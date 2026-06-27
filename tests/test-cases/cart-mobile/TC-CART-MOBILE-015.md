# TC-CART-MOBILE-015: Bấm "Tiếp tục mua sắm" hoặc "← Mua tiếp" -> chuyển hướng về Home screen

## Requirement ID

FR-20, FR-07

## Module / Test type / Technique

Mobile Cart / Navigation / Domain Testing

## Preconditions

- Backend đang chạy tại `http://localhost:3000`
- Ứng dụng Expo Mobile đang chạy và kết nối với backend.
- Người dùng đã đăng nhập với tài khoản `test@eshop.com`.

## Test Data

Không có.

## Test Steps

1. Trường hợp 1 (Giỏ hàng trống):
   - Mở màn hình Giỏ hàng.
   - Nhấn vào liên kết "Tiếp tục mua sắm".
   - Quan sát màn hình được hiển thị.
2. Trường hợp 2 (Giỏ hàng có sản phẩm):
   - Thêm "Sản phẩm A" vào giỏ hàng.
   - Vào màn hình Giỏ hàng.
   - Nhấn vào nút "← Mua tiếp".
   - Quan sát màn hình được hiển thị.

## Expected Result

- Ở cả 2 trường hợp, hệ thống chuyển hướng người dùng quay trở lại trang chủ (Home screen/màn hình danh sách sản phẩm) thành công.

## Status / Related Bugs

Not Run / None
