# [BUG][Order History] Thiếu giao diện Chi tiết đơn hàng và các liên kết Mã đơn hàng không thể nhấp

## Found by Test Case
- TC-ORDER-HISTORY-001
- TC-ORDER-HISTORY-005
- TC-ORDER-HISTORY-024
- TC-ORDER-HISTORY-025

## Requirement liên quan
- FR-11 (Xem lịch sử đơn hàng)

## Severity / Priority
- **Severity**: Critical
- **Priority**: P0

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/profile
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Đăng nhập bằng tài khoản `test@eshop.com`.
2. Truy cập màn hình Hồ sơ & Lịch sử đơn hàng (`http://localhost:5173/profile`).
3. Nhìn vào cột "Mã ĐH" trong bảng danh sách đơn hàng.
4. Thử rê chuột và nhấp vào Mã đơn hàng (ví dụ: `#2`) hoặc tìm kiếm nút "Xem chi tiết".

## Expected result
- Mã đơn hàng hoặc nút "Xem chi tiết" phải là một liên kết/nút có thể nhấp được (clickable). 
- Khi người dùng nhấp vào, hệ thống phải điều hướng thành công đến trang Chi tiết đơn hàng (ví dụ: `/orders/<order_id>` hoặc `/order-detail?id=<order_id>`) để xem chi tiết tài chính (phí vận chuyển, mã giảm giá, phương thức thanh toán).

## Actual result
- Cột "Mã ĐH" chỉ hiển thị văn bản thô dạng chuỗi chữ (plain text) hoàn toàn không có thuộc tính liên kết hay tính năng tương tác. Không có nút "Xem chi tiết" hay bất kỳ cách nào để chuyển tiếp sang trang chi tiết.
- Trên thực tế, dự án hoàn toàn thiếu trang "Chi tiết đơn hàng" (Order Details component) ở cả frontend router (`App.jsx`) và mã nguồn.

## Evidence
- Code file: [Profile.jsx:L184](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/frontend-web/src/pages/Profile.jsx#L184) (Mã ĐH chỉ là thẻ `<td>` thô).
- Router file: [App.jsx](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/frontend-web/src/App.jsx) (không có route cho trang chi tiết đơn hàng).
- Browser recording session: [order_history_ui_exploration_1782469485421.webp](evidence/order_history_ui_exploration_1782469485421.webp)
- Screenshot of list table: [profile_page_with_order_1782469582409.png](evidence/profile_page_with_order_1782469582409.png)
