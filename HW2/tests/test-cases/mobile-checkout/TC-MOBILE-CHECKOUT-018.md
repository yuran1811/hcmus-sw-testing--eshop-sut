# TC-MOBILE-CHECKOUT-018: Xử lý mất kết nối mạng đột ngột khi đang gửi yêu cầu đặt hàng trên Mobile

## Requirement ID

FR-20

## Module / Test type / Technique

mobile-checkout / Functional / Error Isolation

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Giỏ hàng di động đang có sản phẩm và người dùng đang ở trên màn hình Checkout.

## Test data

| Parameter | Value |
| --- | --- |
| networkState | active -> lost connection during submission |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và truy cập màn hình Checkout.
2. Nhấn nút "Đặt hàng" để gửi yêu cầu đặt hàng lên server.
3. Ngay lập tức ngắt kết nối mạng của thiết bị di động (bật chế độ máy bay hoặc tắt Wi-Fi/4G) khi vòng xoay loading đang chạy.
4. Quan sát phản ứng và cách xử lý ngoại lệ của ứng dụng di động.

## Expected result

- Ứng dụng di động không bị crash, treo cứng hay hiển thị màn hình trắng.
- Ứng dụng hiển thị thông báo lỗi thân thiện bằng tiếng Việt (ví dụ: "Mất kết nối mạng. Vui lòng kiểm tra lại kết nối đường truyền và thử lại!"). Thông báo lỗi này bắt buộc phải xuất hiện ở phía TRÊN nút hành động đặt hàng theo quy chuẩn thiết kế (FR-22).
- Khi có kết nối mạng trở lại, ứng dụng cho phép người dùng nhấn nút đặt hàng lại mà không làm mất thông tin đã điền trong form và không tạo đơn hàng trùng lặp trên server.

## Status / Related bugs

Not Run / None
