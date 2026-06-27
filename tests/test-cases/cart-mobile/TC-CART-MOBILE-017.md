# TC-CART-MOBILE-017: Đã đăng nhập bấm "Tiến hành thanh toán" -> chuyển sang Checkout page thành công

## Requirement ID

FR-20, FR-08

## Module / Test type / Technique

Mobile Cart / Functional / Domain Testing

## Preconditions

- Backend đang chạy tại `http://localhost:3000`
- Ứng dụng Expo Mobile đang chạy và kết nối với backend.
- Người dùng đã đăng nhập với tài khoản `test@eshop.com`.
- Giỏ hàng đang có sẵn sản phẩm "Sản phẩm A".

## Test Data

Không có.

## Test Steps

1. Mở ứng dụng mobile EShop.
2. Thêm "Sản phẩm A" vào giỏ hàng.
3. Truy cập vào màn hình Giỏ hàng.
4. Bấm nút "Tiến hành thanh toán".
5. Quan sát phản hồi của hệ thống.

## Expected Result

- Hệ thống chuyển hướng người dùng sang màn hình Xác Nhận Đơn Hàng (Checkout screen) thành công.
- Không hiển thị bất kỳ thông báo lỗi hay yêu cầu đăng nhập nào.
- Hiển thị đúng thông tin các sản phẩm đã chọn và tổng tiền cần thanh toán.

## Status / Related Bugs

Not Run / None
