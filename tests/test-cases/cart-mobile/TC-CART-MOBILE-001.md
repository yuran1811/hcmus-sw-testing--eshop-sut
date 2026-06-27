# TC-CART-MOBILE-001: Thêm sản phẩm từ Home screen (mặc định = 1) -> thành công

## Requirement ID

FR-20, FR-07

## Module / Test type / Technique

Mobile Cart / Functional / Domain Testing

## Preconditions

- Backend đang chạy tại `http://localhost:3000`
- Ứng dụng Expo Mobile đang chạy và kết nối với backend.
- Người dùng đã đăng nhập với tài khoản `test@eshop.com`.
- Có ít nhất một sản phẩm tên "Sản phẩm A" với giá 100,000 ₫ trong hệ thống.

## Test Data

Không có (sử dụng hành động nhấn trực tiếp).

## Test Steps

1. Mở ứng dụng mobile EShop.
2. Từ trang chủ (Home screen), tìm sản phẩm "Sản phẩm A".
3. Nhấn vào nút "Thêm vào giỏ" trên thẻ sản phẩm của "Sản phẩm A".
4. Quan sát Alert thông báo xuất hiện.
5. Kiểm tra giỏ hàng bằng cách bấm vào tab "Giỏ (1)" trên Navbar.

## Expected Result

- Hệ thống hiển thị Alert với nội dung: "Thành công - Đã thêm vào giỏ hàng".
- Badge số lượng sản phẩm trên Navbar cập nhật từ "Giỏ (0)" thành "Giỏ (1)".
- Khi vào trang Giỏ hàng, hiển thị đúng "Sản phẩm A" với số lượng là 1, đơn giá và thành tiền đều là `100.000 ₫`.

## Status / Related Bugs

Not Run / None
