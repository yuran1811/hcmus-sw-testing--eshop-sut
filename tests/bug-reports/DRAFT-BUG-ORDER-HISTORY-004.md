# [BUG][Order History] Thiếu chức năng và giao diện Phân trang đơn hàng (Pagination)

## Found by Test Case
- TC-ORDER-HISTORY-001
- TC-ORDER-HISTORY-005
- TC-ORDER-HISTORY-021
- TC-ORDER-HISTORY-022

## Requirement liên quan
- FR-11 (Xem lịch sử đơn hàng)

## Severity / Priority
- **Severity**: Major
- **Priority**: P1

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/profile
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Đăng nhập hệ thống bằng tài khoản có từ 6 đơn hàng trở lên trong hệ thống.
2. Truy cập màn hình Lịch sử đơn hàng.
3. Quan sát số lượng đơn hàng hiển thị trong bảng và khu vực phía dưới bảng để tìm nút chuyển trang.

## Expected result
- Số lượng đơn hàng hiển thị mặc định trên một trang là tối đa 5 đơn hàng.
- Nếu người dùng có từ 6 đơn hàng trở lên (vượt quá kích thước trang), hệ thống phải hiển thị điều khiển phân trang (nút "Trang trước", "Trang sau", hoặc số trang) và cho phép bấm chuyển đổi giữa các trang dữ liệu.

## Actual result
- Hệ thống hiển thị toàn bộ tất cả đơn hàng trên một danh sách kéo dài duy nhất (không giới hạn 5 đơn hàng).
- Hoàn toàn không có giao diện điều khiển phân trang hay logic xử lý phân trang ở cả frontend và backend.

## Evidence
- Code file: [Profile.jsx](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/frontend-web/src/pages/Profile.jsx) (dữ liệu `orders` được duyệt qua trực tiếp bằng `.map()` và render toàn bộ bảng).
- Browser recording session: [order_history_ui_exploration_1782469485421.webp](evidence/order_history_ui_exploration_1782469485421.webp)
- Screenshot of UI: [profile_page_with_order_1782469582409.png](evidence/profile_page_with_order_1782469582409.png)
