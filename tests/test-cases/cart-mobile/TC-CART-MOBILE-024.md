# TC-CART-MOBILE-024: Kiểm tra giao diện khi giỏ hàng trống (Lỗi thiếu hình minh họa)

## Requirement ID

FR-20, FR-07, FR-24

## Module / Test type / Technique

Mobile Cart / GUI / Ad-hoc

## Preconditions

- Backend đang chạy tại `http://localhost:3000`
- Ứng dụng Expo Mobile đang chạy và kết nối với backend.
- Người dùng đã đăng nhập với tài khoản `test@eshop.com`.
- Giỏ hàng hiện tại đang trống (không có sản phẩm nào).

## Test Data

Không có.

## Test Steps

1. Mở ứng dụng mobile EShop.
2. Đảm bảo giỏ hàng trống (nếu có sản phẩm, thực hiện xóa hết).
3. Truy cập vào màn hình Giỏ hàng.
4. Quan sát cấu trúc giao diện hiển thị của màn hình giỏ hàng trống.

## Expected Result

- Giao diện giỏ hàng trống (Empty State) phải hiển thị:
  - Thông báo rõ ràng thân thiện (ví dụ: "Giỏ hàng của bạn đang trống").
  - Hình ảnh minh họa hoặc Icon rõ ràng biểu thị giỏ hàng trống (FR-07 và FR-24).
  - Có liên kết/nút bấm "Tiếp tục mua sắm" hoặc tương tự để quay lại trang chủ.
- Kết quả thực tế (Lỗi phát hiện): Màn hình chỉ hiển thị văn bản thuần và liên kết, hoàn toàn thiếu hình ảnh hoặc icon minh họa như yêu cầu đặc tả.

## Status / Related Bugs

Not Run / None
