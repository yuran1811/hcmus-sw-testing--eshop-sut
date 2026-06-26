# [BUG][User Management] Thiếu hộp thoại xác nhận khi thực hiện hành động xóa người dùng

## Found by Test Case
TC-USER-MANAGEMENT-006, TC-USER-MANAGEMENT-007

## Requirement liên quan
FR-24

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
3. Tìm tài khoản người dùng thường khác trong bảng và click vào nút "Xóa" màu đỏ tương ứng.

## Expected result
- Hệ thống hiển thị hộp thoại (dialog) yêu cầu xác nhận hành động xóa.
- Dialog phải cung cấp hai lựa chọn rõ ràng: "Xác nhận" (để thực hiện xóa thực tế) và "Hủy" (để hủy thao tác và đóng dialog).

## Actual result
- Hệ thống không hiển thị bất kỳ hộp thoại xác nhận nào.
- Tài khoản người dùng bị xóa ngay lập tức khỏi bảng và cơ sở dữ liệu sau khi nhấn nút "Xóa", dẫn đến nguy cơ mất dữ liệu do thao tác nhầm (accidentally click).

## Evidence
- Video ghi nhận phiên kiểm thử: [evidence/user_mgt_test_run.webp](evidence/user_mgt_test_run.webp)
- Ảnh chụp sau khi nhấn nút Xóa: [evidence/after_delete_click.png](evidence/after_delete_click.png)
