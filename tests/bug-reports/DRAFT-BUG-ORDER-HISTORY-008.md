# [BUG][Order History] Thao tác "Hủy đơn" ngay lập tức thực hiện mà không hiển thị hộp thoại xác nhận (Confirmation Dialog)

## Found by Test Case
- TC-ORDER-HISTORY-027 (and general GUI/Safety check)

## Requirement liên quan
- FR-21 (Tiêu chuẩn giao diện chung), FR-24 (Trạng thái trang phản hồi)

## Severity / Priority
- **Severity**: Minor
- **Priority**: P2

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/profile
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Đăng nhập tài khoản và truy cập trang Lịch sử đơn hàng có ít nhất một đơn hàng ở trạng thái "Chờ xác nhận" (pending).
2. Nhấp vào nút "Hủy đơn" màu đỏ ở cột Thao tác.
3. Quan sát xem hệ thống có hiển thị hộp thoại xác nhận (Confirmation Dialog) hay không.

## Expected result
- Vì hủy đơn hàng là một thao tác quan trọng có thể gây ảnh hưởng lớn đến dữ liệu và trải nghiệm, hệ thống phải hiển thị một hộp thoại xác nhận (Confirmation Dialog) hỏi ý kiến người dùng với hai lựa chọn rõ ràng: "Xác nhận" (tiến hành hủy và cập nhật trạng thái) và "Hủy bỏ" (đóng hộp thoại và giữ nguyên đơn hàng).

## Actual result
- Khi nhấp vào nút "Hủy đơn", hệ thống lập tức thực hiện gửi yêu cầu hủy lên API backend và cập nhật trạng thái đơn hàng thành "Đã hủy" mà không hề đưa ra bất kỳ thông báo hay hộp thoại xác nhận nào trước đó. Điều này rất nguy hiểm nếu người dùng vô tình nhấp nhầm.

## Evidence
- Code file: [Profile.jsx:L66-80](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/frontend-web/src/pages/Profile.jsx#L66-L80) và dòng 202-206 (nút gọi trực tiếp hàm `cancelOrder` mà không có confirm dialog).
- Browser recording session: [order_history_ui_exploration_1782469485421.webp](evidence/order_history_ui_exploration_1782469485421.webp)
