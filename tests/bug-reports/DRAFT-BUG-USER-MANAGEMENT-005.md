# [BUG][User Management] Ngôn ngữ không nhất quán, pha trộn tiếng Anh trên giao diện Admin Portal

## Found by Test Case
TC-USER-MANAGEMENT-012

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
1. Truy cập trang đăng nhập của Admin Portal tại `http://localhost:5174`.
2. Quan sát tiêu đề form đăng nhập, các placeholder của ô input và nút đăng nhập.
3. Đăng nhập với tài khoản admin và quan sát các menu trên thanh bên (sidebar).
4. Nhấp chọn tab "Người dùng" và quan sát tiêu đề các cột của bảng cũng như các giá trị hiển thị bên trong bảng.

## Expected result
- Giao diện Admin Portal phải hiển thị tiếng Việt nhất quán 100% (theo tiêu chuẩn FR-21).
- Các cụm từ tiếng Anh phải được dịch nghĩa tiếng Việt tương ứng (ví dụ: "Đăng nhập Admin", "Mật khẩu", "Bảng điều khiển", "Vai trò", "quản trị viên", "người dùng").

## Actual result
- Giao diện hiển thị pha trộn tiếng Anh và tiếng Việt không đồng nhất ở nhiều vị trí:
  - Trên màn hình Login: Tiêu đề `Admin Login`, placeholder `Email` và `Password`, nút bấm `Login`.
  - Trên Sidebar: Tên ứng dụng `EShop Admin`, menu `Dashboard`.
  - Trong bảng quản lý người dùng: Tiêu đề cột `Role`, giá trị cột Role là `admin` hoặc `user`.

## Evidence
- Video ghi nhận phiên kiểm thử: [evidence/user_mgt_test_run.webp](evidence/user_mgt_test_run.webp)
- Ảnh chụp màn hình đăng nhập: [evidence/login_page.png](evidence/login_page.png)
- Ảnh chụp danh sách người dùng: [evidence/user_list_page.png](evidence/user_list_page.png)
