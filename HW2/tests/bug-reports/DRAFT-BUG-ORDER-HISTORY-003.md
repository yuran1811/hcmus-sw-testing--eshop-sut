# [BUG][Order History] Thiếu hoàn toàn bộ lọc đơn hàng theo Trạng thái (Filter UI)

## Found by Test Case

- TC-ORDER-HISTORY-001
- TC-ORDER-HISTORY-005
- TC-ORDER-HISTORY-020

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

1. Đăng nhập hệ thống và truy cập trang Lịch sử đơn hàng (`http://localhost:5173/profile`).
2. Quan sát phần đầu trang và phía trên bảng danh sách đơn hàng để tìm bộ lọc trạng thái.

## Expected result

- Giao diện phải có bộ lọc trạng thái (ví dụ: dropdown hoặc các tab bộ lọc "Tất cả", "Chờ xác nhận", "Đang giao", "Đã giao", "Đã hủy") để người dùng dễ dàng phân loại và quản lý danh sách đơn hàng của mình.

## Actual result

- Giao diện hoàn toàn trống trơn không có bất kỳ công cụ lọc nào. Bảng danh sách hiển thị dồn toàn bộ đơn hàng hiện có mà không cho phép phân loại.

## Evidence

- Screenshot of UI: [profile_page_with_order_1782469582409.png](evidence/profile_page_with_order_1782469582409.png)
- Browser recording session: [order_history_ui_exploration_1782469485421.webp](evidence/order_history_ui_exploration_1782469485421.webp)
