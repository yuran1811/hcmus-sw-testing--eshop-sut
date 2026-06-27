# TC-CART-MOBILE-016: Chưa đăng nhập bấm "Tiến hành thanh toán" -> yêu cầu đăng nhập

## Requirement ID

FR-20, FR-08

## Module / Test type / Technique

Mobile Cart / Security / Domain Testing

## Preconditions

- Backend đang chạy tại `http://localhost:3000`
- Ứng dụng Expo Mobile đang chạy và kết nối với backend.
- Người dùng chưa đăng nhập tài khoản (ở trạng thái khách / Guest).
- Giỏ hàng đang có sẵn sản phẩm "Sản phẩm A".

## Test Data

Không có.

## Test Steps

1. Đảm bảo ứng dụng đang ở trạng thái chưa đăng nhập.
2. Thêm "Sản phẩm A" vào giỏ hàng.
3. Truy cập vào màn hình Giỏ hàng.
4. Bấm nút "Tiến hành thanh toán".
5. Quan sát phản hồi của hệ thống.

## Expected Result

- Hệ thống hiển thị Alert cảnh báo yêu cầu đăng nhập: "Bạn cần đăng nhập để thanh toán!".
- Sau khi bấm xác nhận Alert, hệ thống tự động chuyển hướng người dùng đến màn hình Đăng Nhập.

## Status / Related Bugs

Not Run / None
