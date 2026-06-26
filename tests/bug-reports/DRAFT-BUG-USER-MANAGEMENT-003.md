# [BUG][User Management] Cho phép Admin tự click nút xóa chính tài khoản đang đăng nhập trên giao diện (UI Self-Deletion)

## Found by Test Case
TC-USER-MANAGEMENT-008

## Requirement liên quan
FR-19

## Severity / Priority
Major / P1

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5174/
- Build/Commit: 004eb40

## Steps to reproduce
1. Đăng nhập Admin Portal tại địa chỉ `http://localhost:5174` bằng tài khoản admin (`admin@eshop.com`).
2. Điều hướng đến mục "Người dùng".
3. Tìm kiếm dòng chứa thông tin của chính tài khoản `admin@eshop.com` đang đăng nhập.
4. Quan sát nút "Xóa" tương ứng với tài khoản này.

## Expected result
- Nút "Xóa" tương ứng với tài khoản admin đang đăng nhập hiện tại phải bị vô hiệu hóa (disabled) hoặc ẩn hoàn toàn khỏi giao diện người dùng để ngăn ngừa việc tự xóa tài khoản gây lỗi hệ thống.

## Actual result
- Nút "Xóa" của chính Admin đang đăng nhập vẫn hiển thị ở trạng thái hoạt động bình thường (màu đỏ, clickable) và cho phép người dùng click để gửi yêu cầu xóa.

## Evidence
- Video ghi nhận phiên kiểm thử: [evidence/user_mgt_test_run.webp](evidence/user_mgt_test_run.webp)
- Ảnh chụp danh sách người dùng hiển thị nút Xóa trên dòng admin: [evidence/user_list_page.png](evidence/user_list_page.png)
