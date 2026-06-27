# TC-CART-MOBILE-009: Sửa số lượng trực tiếp trong giỏ thành 0 -> tự chuẩn hóa về 1

## Requirement ID

FR-20, FR-07

## Module / Test type / Technique

Mobile Cart / Functional / Domain Testing (EP + BVA OFF)

## Preconditions

- Backend đang chạy tại `http://localhost:3000`
- Ứng dụng Expo Mobile đang chạy và kết nối với backend.
- Người dùng đã đăng nhập với tài khoản `test@eshop.com`.
- Giỏ hàng đang có sẵn sản phẩm "Sản phẩm A" với số lượng là 1.

## Test Data

| Field    | Value |
| -------- | ----- |
| quantity | `0`   |

## Test Steps

1. Mở ứng dụng mobile EShop và vào màn hình Giỏ hàng.
2. Tại dòng sản phẩm "Sản phẩm A", chọn ô nhập Số lượng.
3. Thay đổi giá trị thành `0`.
4. Quan sát số lượng hiển thị thực tế trên ô nhập và thành tiền.

## Expected Result

- Hệ thống không chấp nhận số lượng 0 và tự động đặt/chuẩn hóa số lượng về giá trị tối thiểu là 1.
- Ô nhập hiển thị số lượng là 1 và thành tiền là `100.000 ₫`.

## Status / Related Bugs

Not Run / None
