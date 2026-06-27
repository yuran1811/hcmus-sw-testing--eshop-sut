# TC-CART-MOBILE-023: Kiểm tra badge số lượng sản phẩm hiển thị trên Navbar (Lỗi đếm số lượng)

## Requirement ID

FR-20, FR-23

## Module / Test type / Technique

Mobile Cart / GUI / Ad-hoc

## Preconditions

- Backend đang chạy tại `http://localhost:3000`
- Ứng dụng Expo Mobile đang chạy và kết nối với backend.
- Người dùng đã đăng nhập với tài khoản `test@eshop.com`.
- Có sẵn sản phẩm "Sản phẩm A" và "Sản phẩm B" trong hệ thống.

## Test Data

Không có.

## Test Steps

1. Mở ứng dụng mobile EShop.
2. Thêm "Sản phẩm A" vào giỏ hàng với số lượng là 2.
3. Quan sát badge hiển thị số lượng giỏ hàng trên Navbar (phía trên bên phải).
4. Thêm tiếp "Sản phẩm B" vào giỏ hàng với số lượng là 1.
5. Quan sát badge hiển thị số lượng giỏ hàng trên Navbar một lần nữa.

## Expected Result

- Theo đặc tả (FR-23): Badge giỏ hàng phải phản ánh chính xác số lượng sản phẩm đang có trong giỏ (tổng số lượng các mặt hàng).
  - Sau bước 2 (2 sản phẩm A): Badge phải hiển thị `Giỏ (2)`.
  - Sau bước 4 (2 sản phẩm A + 1 sản phẩm B): Badge phải hiển thị `Giỏ (3)`.
- Kết quả thực tế (Lỗi phát hiện): Badge chỉ hiển thị số dòng sản phẩm (`cart.length`).
  - Sau bước 2: Badge hiển thị `Giỏ (1)`.
  - Sau bước 4: Badge hiển thị `Giỏ (2)`.

## Status / Related Bugs

Not Run / None
