# TC-CART-MOBILE-019: Thêm sản phẩm từ trang chi tiết với số lượng = 2 (BVA IN) -> thành công

## Requirement ID

FR-20, FR-07, FR-06

## Module / Test type / Technique

Mobile Cart / Functional / BVA

## Preconditions

- Backend đang chạy tại `http://localhost:3000`
- Ứng dụng Expo Mobile đang chạy và kết nối với backend.
- Người dùng đã đăng nhập với tài khoản `test@eshop.com`.
- Có ít nhất một sản phẩm tên "Sản phẩm A" với giá 100,000 ₫ trong hệ thống.

## Test Data

| Field    | Value |
| -------- | ----- |
| quantity | `2`   |

## Test Steps

1. Mở ứng dụng mobile EShop.
2. Từ trang chủ, nhấn vào nút "Xem chi tiết" của sản phẩm "Sản phẩm A".
3. Tại trang chi tiết sản phẩm, nhập số lượng `2` vào ô nhập số lượng.
4. Bấm nút "Thêm vào giỏ hàng".
5. Quan sát Alert thông báo xuất hiện.
6. Bấm tab "Giỏ" trên Navbar để kiểm tra thông tin.

## Expected Result

- Hệ thống hiển thị Alert thông báo: "Thành công - Đã thêm vào giỏ hàng".
- Badge số lượng sản phẩm trên Navbar cập nhật từ "Giỏ (0)" thành "Giỏ (1)".
- Trên màn hình Giỏ hàng, "Sản phẩm A" hiển thị số lượng là 2. Thành tiền hiển thị `200.000 ₫`.

## Status / Related Bugs

Not Run / None
