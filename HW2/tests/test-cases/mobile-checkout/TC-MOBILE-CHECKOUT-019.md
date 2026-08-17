# TC-MOBILE-CHECKOUT-019: Hiển thị dialog xác nhận khi xóa sản phẩm khỏi giỏ hàng trên Mobile - Nhánh xác nhận xóa

## Requirement ID

FR-24

## Module / Test type / Technique

mobile-checkout / GUI / Boundary Value Analysis (2-Point BVA)

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Giỏ hàng hiện tại đang có 2 sản phẩm khác nhau.

## Test data

| Parameter | Value |
| --- | --- |
| deleteAction | click Confirm in dialog |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và mở màn hình giỏ hàng di động.
2. Tìm sản phẩm đầu tiên trong giỏ hàng.
3. Nhấp vào nút "Xóa" (biểu tượng thùng rác màu đỏ) của sản phẩm đó.
4. Quan sát sự xuất hiện của dialog xác nhận trên màn hình di động.
5. Nhấn nút "Xác nhận" (hoặc "Đồng ý") trên dialog.
6. Quan sát danh sách sản phẩm và tổng tiền giỏ hàng di động.

## Expected result

- Khi nhấp nút Xóa, một dialog xác nhận xuất hiện hỏi bằng tiếng Việt: "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?" (FR-24).
- Sau khi chọn "Xác nhận", dialog đóng lại, sản phẩm đó lập tức biến mất khỏi giỏ hàng.
- Tổng số lượng sản phẩm và tổng tiền của giỏ hàng di động được tính toán và cập nhật giảm tương ứng ngay trên giao diện.

## Status / Related bugs

Not Run / None
