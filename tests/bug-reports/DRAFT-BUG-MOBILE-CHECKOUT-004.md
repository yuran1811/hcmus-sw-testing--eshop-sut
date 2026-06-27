# [BUG][Mobile Checkout] Không hiển thị dialog xác nhận khi nhấn xóa sản phẩm khỏi giỏ hàng

## Found by Test Case
TC-MOBILE-CHECKOUT-019, TC-MOBILE-CHECKOUT-020

## Requirement liên quan
FR-20, FR-23

## Severity / Priority
Minor / P2

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:8081
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Đăng nhập và thêm bất kỳ sản phẩm nào vào giỏ hàng.
2. Điều hướng đến màn hình Giỏ hàng.
3. Nhấn vào liên kết "Xóa" bên cạnh sản phẩm.

## Expected result
Hệ thống phải hiển thị một dialog xác nhận (Alert confirm) với câu hỏi: "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?" và hai nút chọn "Xác nhận" và "Hủy" để bảo vệ người dùng khỏi thao tác nhầm lẫn.

## Actual result
Sản phẩm bị xóa ngay lập tức ra khỏi giỏ hàng mà không hiển thị bất kỳ hộp thoại cảnh báo hay yêu cầu xác nhận nào.

## Evidence
- Ảnh chụp màn hình giỏ hàng trống ngay lập tức sau khi nhấn Xóa: [mobile_deleted_immediately.png](evidence/mobile_deleted_immediately.png)
- Video ghi nhận thao tác xóa tức thời: [mobile_cart_delete_bug.webp](evidence/mobile_cart_delete_bug.webp)

