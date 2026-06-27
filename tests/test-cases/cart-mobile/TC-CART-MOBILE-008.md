# TC-CART-MOBILE-008: Sửa số lượng trực tiếp trong giỏ thành số hợp lệ (2) -> tăng lên 3 (Do bug)

## Requirement ID

FR-20, FR-07

## Module / Test type / Technique

Mobile Cart / Functional / Domain Testing

## Preconditions

- Backend đang chạy tại `http://localhost:3000`
- Ứng dụng Expo Mobile đang chạy và kết nối với backend.
- Người dùng đã đăng nhập với tài khoản `test@eshop.com`.
- Giỏ hàng đang có sẵn sản phẩm "Sản phẩm A" với số lượng là 1.

## Test Data

| Field    | Value |
| -------- | ----- |
| quantity | `2`   |

## Test Steps

1. Mở ứng dụng mobile EShop và vào màn hình Giỏ hàng.
2. Tại dòng sản phẩm "Sản phẩm A", chọn ô nhập Số lượng.
3. Sử dụng bàn phím để đổi số lượng thành `2`.
4. Quan sát số lượng hiển thị thực tế trên ô nhập và thành tiền.

## Expected Result

- Theo đặc tả: Số lượng hiển thị phải cập nhật thành `2`, và thành tiền là `200.000 ₫`.
- Kết quả thực tế (Lỗi phát hiện): Ô nhập hiển thị giá trị là `3` (do lỗi code `parsed + 1` tăng thêm một lượng dư thừa), thành tiền tính toán sai lệch thành `300.000 ₫`.

## Status / Related Bugs

Not Run / None
