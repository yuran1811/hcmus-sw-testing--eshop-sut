# [BUG][User Management] Lỗi tiếp cận bàn phím - Thanh bên (Sidebar) điều hướng bị bỏ qua hoàn toàn trong Tab Order

## Found by Test Case
TC-USER-MANAGEMENT-021

## Requirement liên quan
FR-21

## Severity / Priority
Minor / P2

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5174/
- Build/Commit: 004eb40

## Steps to reproduce
1. Truy cập Admin Portal tại địa chỉ `http://localhost:5174` và đăng nhập bằng tài khoản admin.
2. Đặt con trỏ chuột lên thanh địa chỉ của trình duyệt, sau đó nhấn liên tục phím `Tab` để di chuyển tiêu điểm bàn phím (Keyboard Focus) trên trang.
3. Quan sát đường viền tiêu điểm (focus outline/ring) khi di chuyển qua thanh bên (Sidebar).
4. Thử kích hoạt các tab "Danh mục", "Sản phẩm", "Người dùng" bằng phím `Enter` hoặc `Space`.

## Expected result
- Tiêu điểm bàn phím phải di chuyển tuần tự qua các liên kết menu điều hướng ở sidebar (gồm: Dashboard, Danh mục, Sản phẩm, Mã Giảm Giá, Đơn hàng, Người dùng, Đăng xuất).
- Các mục đang nhận tiêu điểm phải hiển thị đường viền tiêu điểm rõ ràng (focus ring/outline).
- Nhấn phím `Enter` hoặc `Space` khi mục đang nhận tiêu điểm phải chuyển đổi trang tương ứng.

## Actual result
- Tiêu điểm bàn phím bỏ qua hoàn toàn tất cả các mục điều hướng ở sidebar và nhảy thẳng xuống phần nội dung chính (nội dung tab đang hiển thị).
- Người dùng chỉ sử dụng bàn phím không thể điều hướng hoặc chuyển đổi giữa các tab quản trị vì các mục sidebar được viết bằng thẻ `<li>` thuần không có thuộc tính `tabIndex="0"` và không lắng nghe sự kiện phím `KeyDown` (Enter/Space).

## Evidence
- Video ghi nhận phiên kiểm thử: [evidence/user_mgt_test_run.webp](evidence/user_mgt_test_run.webp)
- Ảnh chụp minh chứng tiêu điểm nhảy qua sidebar và tập trung vào nội dung chính: [evidence/tab_focus_1.png](evidence/tab_focus_1.png)
