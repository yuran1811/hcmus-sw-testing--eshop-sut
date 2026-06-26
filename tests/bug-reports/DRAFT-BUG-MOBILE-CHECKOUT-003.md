# [BUG][Mobile Checkout] Hệ thống tự động loại bỏ sản phẩm cuối cùng trong giỏ hàng khi nhấn xác nhận thanh toán

## Found by Test Case
TC-MOBILE-CHECKOUT-001

## Requirement liên quan
FR-20, FR-23

## Severity / Priority
Critical / P0

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:8081
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Đăng nhập và thêm 3 sản phẩm khác nhau vào giỏ hàng trên ứng dụng di động.
2. Nhấn biểu tượng Giỏ hàng và chọn "Tiến hành thanh toán".
3. Nhấn "Xác Nhận Thanh Toán".
4. Kiểm tra danh sách sản phẩm trong đơn hàng vừa tạo tại màn hình "Hồ sơ của bạn > Lịch sử đơn hàng".

## Expected result
Đơn hàng được tạo thành công chứa đầy đủ 3 sản phẩm đã thêm vào giỏ hàng.

## Actual result
Đơn hàng chỉ chứa 2 sản phẩm (sản phẩm thứ 3 bị mất). Lỗi nằm ở file `frontend-mobile/App.js` tại dòng 391, code đã cắt bỏ phần tử cuối cùng của mảng giỏ hàng trước khi gửi yêu cầu POST đến `/api/checkout`:
```javascript
items: cart.length > 1 ? cart.slice(0, -1) : cart,
```

## Evidence
- Video ghi nhận phiên kiểm thử: [mobile_checkout_run.webp](evidence/mobile_checkout_run.webp)
- Ảnh chụp màn hình giỏ hàng ban đầu (3 sản phẩm): [mobile_cart_3_items.png](evidence/mobile_cart_3_items.png)
- Ảnh chụp màn hình lịch sử đơn hàng sau thanh toán (chỉ còn 2 sản phẩm): [mobile_order_history_active.png](evidence/mobile_order_history_active.png)
