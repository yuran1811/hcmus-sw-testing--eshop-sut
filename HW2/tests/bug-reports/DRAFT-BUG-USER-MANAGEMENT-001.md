# [BUG][User Management] Thiếu giao diện Empty State khi không có người dùng nào khác trong hệ thống

## Found by Test Case
TC-USER-MANAGEMENT-004

## Requirement liên quan
FR-24

## Severity / Priority
Minor / P2

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5174/
- Build/Commit: 004eb40

## Steps to reproduce
1. Đăng nhập Admin Portal tại địa chỉ `http://localhost:5174` bằng tài khoản admin (`admin@eshop.com`).
2. Điều hướng đến mục "Người dùng" trên thanh bên để xem danh sách.
3. Nếu cơ sở dữ liệu không có tài khoản thường nào khác (hoặc sau khi đã xóa hết), quan sát giao diện hiển thị.

## Expected result
- Bảng danh sách người dùng không hiển thị (hoặc chỉ hiển thị dòng tiêu đề trống).
- Trang hiển thị giao diện trống (Empty State) theo tiêu chuẩn FR-24 gồm:
  - Một icon hoặc hình vẽ minh họa thân thiện mô tả danh sách trống.
  - Thông điệp tiếng Việt thân thiện: "Chưa có người dùng nào khác đăng ký trên hệ thống".

## Actual result
- Hệ thống không có giao diện Empty State chuyên biệt nào. 
- Nó chỉ hiển thị một dòng duy nhất chứa thông tin tài khoản của chính admin trong bảng, không hiển thị bất kỳ thông báo hay hình ảnh minh họa nào cho việc chưa có người dùng khác.

## Evidence
- Video ghi nhận danh sách trống (chỉ có Admin): [evidence/user_mgt_empty_state.webp](evidence/user_mgt_empty_state.webp)
- Ảnh chụp bảng danh sách chỉ có tài khoản Admin mà không có giao diện Empty State: [evidence/user_list_only_admin.png](evidence/user_list_only_admin.png)
- Video ghi nhận phiên kiểm thử toàn bộ: [evidence/user_mgt_test_run.webp](evidence/user_mgt_test_run.webp)

