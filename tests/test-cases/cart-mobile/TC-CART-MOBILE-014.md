# TC-CART-MOBILE-014: Xóa sản phẩm khỏi giỏ hàng -> không hiển thị Dialog xác nhận (Lỗi)

## Requirement ID

FR-20, FR-07, FR-24

## Module / Test type / Technique

Mobile Cart / Functional / Domain Testing

## Preconditions

- Backend đang chạy tại `http://localhost:3000`
- Ứng dụng Expo Mobile đang chạy và kết nối với backend.
- Người dùng đã đăng nhập với tài khoản `test@eshop.com`.
- Giỏ hàng đang có sẵn sản phẩm "Sản phẩm A" với số lượng là 1.

## Test Data

Không có.

## Test Steps

1. Mở ứng dụng mobile EShop và vào màn hình Giỏ hàng.
2. Bấm vào nút "Xóa" bên cạnh sản phẩm "Sản phẩm A".
3. Quan sát hệ thống xử lý (có hiển thị Alert/Dialog xác nhận hay không).

## Expected Result

- Theo đặc tả: Hệ thống phải hiển thị một Dialog xác nhận (ví dụ: "Bạn có chắc chắn muốn xóa sản phẩm này?") trước khi thực hiện xóa.
- Kết quả thực tế (Lỗi phát hiện): Sản phẩm bị xóa ngay lập tức khỏi giỏ hàng mà không hiển thị bất kỳ Dialog xác nhận nào.

## Status / Related Bugs

Not Run / None
