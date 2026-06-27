# TC-CART-MOBILE-011: Sửa số lượng trực tiếp trong giỏ thành số thập phân (1.5) -> tự chuẩn hóa về 2 (Do bug)

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
| quantity | `1.5` |

## Test Steps

1. Mở ứng dụng mobile EShop và vào màn hình Giỏ hàng.
2. Tại dòng sản phẩm "Sản phẩm A", chọn ô nhập Số lượng.
3. Thay đổi giá trị thành `1.5`.
4. Quan sát số lượng hiển thị thực tế trên ô nhập và thành tiền.

## Expected Result

- Theo đặc tả: Số lượng nên được lấy phần nguyên thành 1 và hiển thị 1 (nếu là số lượng nguyên dương tối thiểu).
- Kết quả thực tế (Lỗi phát hiện): Ô nhập hiển thị giá trị là `2` (do lấy `parseInt('1.5')` bằng `1`, sau đó cộng thêm `1` thành `2` bởi bug `parsed + 1`). Thành tiền tương ứng đổi thành `200.000 ₫`.

## Status / Related Bugs

Not Run / None
