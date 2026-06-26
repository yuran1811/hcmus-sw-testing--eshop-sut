# [BUG][Mobile Checkout] Màn hình Checkout thiếu hoàn toàn các trường thông tin giao hàng và không hỗ trợ di chuyển tiêu điểm Tab

## Found by Test Case
TC-MOBILE-CHECKOUT-024

## Requirement liên quan
FR-21

## Severity / Priority
Minor / P2

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:8081
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Đăng nhập và thêm sản phẩm vào giỏ hàng.
2. Đi tới màn hình Giỏ hàng và nhấn "Tiến hành thanh toán".
3. Nhấn phím Tab hoặc sử dụng bàn phím cứng để di chuyển tiêu điểm.

## Expected result
- Màn hình Checkout phải hiển thị các trường nhập thông tin giao hàng gồm: "Họ và tên", "Số điện thoại", "Địa chỉ giao hàng" để người dùng kiểm tra hoặc sửa đổi trước khi thanh toán.
- Tiêu điểm bàn phím di chuyển tuần tự qua các trường thông tin giao hàng, ô nhập mã giảm giá, nút áp dụng, và nút xác nhận thanh toán.

## Actual result
- Màn hình Checkout hoàn toàn không có các trường nhập liệu thông tin giao hàng (chỉ có nút xác nhận dựa trên thông tin mặc định lấy từ profile trước đó).
- Do thiếu các trường này, người dùng không thể kiểm duyệt hay sửa đổi thông tin trực tiếp khi thanh toán, đồng thời luồng di chuyển tiêu điểm Tab bị bỏ qua hoàn toàn.

## Evidence
Ảnh chụp màn hình Checkout không có các trường thông tin giao hàng: [mobile_checkout_initial.png](evidence/mobile_checkout_initial.png)
