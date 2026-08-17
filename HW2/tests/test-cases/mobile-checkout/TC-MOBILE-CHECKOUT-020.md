# TC-MOBILE-CHECKOUT-020: Hủy thao tác xóa sản phẩm khỏi giỏ hàng trên Mobile khi chọn Hủy trên dialog xác nhận

## Requirement ID

FR-24

## Module / Test type / Technique

mobile-checkout / GUI / Boundary Value Analysis (2-Point BVA)

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Giỏ hàng hiện tại đang có sản phẩm.

## Test data

| Parameter | Value |
| --- | --- |
| deleteAction | click Cancel in dialog |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và mở màn hình giỏ hàng.
2. Tìm một sản phẩm trong giỏ hàng.
3. Nhấp vào nút "Xóa" (biểu tượng thùng rác màu đỏ) của sản phẩm đó.
4. Quan sát dialog xác nhận xuất hiện trên màn hình di động.
5. Nhấn nút "Hủy" (hoặc "Quay lại") trên dialog.
6. Quan sát danh sách sản phẩm và tổng tiền trong giỏ hàng.

## Expected result

- Dialog xác nhận đóng lại mà không có thay đổi nào xảy ra.
- Sản phẩm đó vẫn được giữ nguyên vị trí trong giỏ hàng di động và tổng tiền không đổi.

## Status / Related bugs

Not Run / None
