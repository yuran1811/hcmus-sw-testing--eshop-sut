# TC-MOBILE-CHECKOUT-001: Happy Path - Thanh toán thành công trên Mobile không dùng mã giảm giá

## Requirement ID

FR-20

## Module / Test type / Technique

mobile-checkout / Functional / Equivalence Partitioning

## Preconditions

- Ứng dụng di động EShop đã được cài đặt và đang mở.
- Tài khoản người dùng thường `test@eshop.com` đã đăng ký trên hệ thống.
- Đã đăng nhập tài khoản `test@eshop.com` trên ứng dụng di động.
- Giỏ hàng hiện tại đang có 3 sản phẩm với tổng trị giá là 450.000 ₫.

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com |
| cartState | 3 items (450.000 ₫) |
| couponCode | None |

## Test steps

1. Mở ứng dụng di động EShop trên thiết bị.
2. Từ màn hình chính (Màn hình Home), nhấp vào biểu tượng "Giỏ hàng" trên thanh điều hướng phía dưới (bottom navigation bar).
3. Quan sát danh sách sản phẩm trong giỏ hàng di động.
4. Nhấn nút "Thanh toán" (nút màu xanh dương) ở phía dưới cùng màn hình giỏ hàng.
5. Tại màn hình "Thanh toán" (Checkout Screen), kiểm tra thông tin giao hàng mặc định và danh sách sản phẩm hiển thị.
6. Nhấn nút "Đặt hàng" (nút màu xanh dương).
7. Quan sát thông báo phản hồi và trạng thái của giỏ hàng.

## Expected result

- Hệ thống điều hướng thành công người dùng đến màn hình Thanh toán.
- Màn hình Thanh toán hiển thị Breadcrumb dạng: "Trang chủ > Giỏ hàng > Thanh toán" và cho phép nhấn quay lại (FR-23).
- Màn hình hiển thị đầy đủ danh sách 3 sản phẩm, thông tin giao hàng mặc định và tổng tiền thanh toán hiển thị đúng định dạng: `450.000 ₫`.
- Trường hiển thị "Tổng tiền" là trường tĩnh (read-only/static label), người dùng không thể tự chỉnh sửa hoặc nhập số liệu trực tiếp trên giao diện (FR-08).
- Sau khi nhấn "Đặt hàng", hệ thống gửi yêu cầu đặt hàng thành công lên backend, hiển thị thông báo toast: "Đặt hàng thành công!".
- Giỏ hàng di động tự động được xóa trống (0 sản phẩm), đồng thời badge hiển thị số lượng sản phẩm giỏ hàng trên thanh điều hướng (bottom navigation bar) tự động cập nhật về 0 hoặc ẩn đi (FR-23).
- Ứng dụng điều hướng người dùng đến màn hình lịch sử đơn hàng. Đơn hàng mới đặt hiển thị trong danh sách lịch sử đơn hàng với trạng thái mặc định là "Chờ xác nhận" (pending) và có màu sắc trạng thái phân biệt rõ ràng (FR-10, FR-11).

## Status / Related bugs

Not Run / None
