# TC-MOBILE-CHECKOUT-002: Ngăn chặn truy cập màn hình thanh toán trên Mobile khi chưa đăng nhập

## Requirement ID

FR-20

## Module / Test type / Technique

mobile-checkout / Security / Equivalence Partitioning

## Preconditions

- Ứng dụng di động EShop đang mở.
- Người dùng chưa đăng nhập tài khoản (khách vãng lai).
- Giỏ hàng di động đang có 1 sản phẩm (được thêm dưới dạng guest).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | anonymous (not logged in) |

## Test steps

1. Mở ứng dụng di động EShop.
2. Nhấp chọn biểu tượng "Giỏ hàng" ở thanh điều hướng phía dưới.
3. Nhấn nút "Thanh toán" ở dưới cùng màn hình giỏ hàng.
4. Quan sát phản ứng và luồng điều hướng của ứng dụng di động.

## Expected result

- Hệ thống chặn không cho người dùng tiến hành thanh toán.
- Ứng dụng hiển thị một hộp thoại thông báo yêu cầu đăng nhập bằng tiếng Việt (ví dụ: "Vui lòng đăng nhập để tiến hành thanh toán").
- Sau khi nhấn đồng ý trên thông báo, người dùng được tự động chuyển hướng đến màn hình Đăng nhập của ứng dụng di động.

## Status / Related bugs

Not Run / None
