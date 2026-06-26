# TC-USER-MANAGEMENT-018: Chặn xóa người dùng đang có giao dịch hoặc đơn hàng hoạt động (Ràng buộc Khóa ngoại)

## Requirement ID

FR-19

## Module / Test type / Technique

user-management / Functional / Boundary Value Analysis

## Preconditions

- Tài khoản Admin `admin@eshop.com` đã đăng ký và đăng nhập trên hệ thống với quyền admin (`role = 'admin'`).
- Người dùng `normal_user@eshop.com` đang có ít nhất một đơn hàng ở trạng thái hoạt động trong cơ sở dữ liệu (`pending` - Chờ xác nhận, `confirmed` - Đã xác nhận, hoặc `shipping` - Đang giao hàng).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as admin@eshop.com (role = admin) |
| targetUser | normal_user@eshop.com |
| activeOrdersCount | 1 (đơn hàng ở trạng thái hoạt động) |

## Test steps

1. Truy cập Admin Portal tại địa chỉ `http://localhost:5174` và đăng nhập bằng tài khoản admin.
2. Tại thanh bên (sidebar) của Admin Portal, nhấp vào mục "Quản lý Người dùng".
3. Tìm kiếm tài khoản của người dùng `normal_user@eshop.com` trong danh sách hiển thị.
4. Nhấn vào nút "Xóa" màu đỏ tương ứng với tài khoản này.
5. Trên hộp thoại (dialog) xác nhận xóa hiển thị trên màn hình, nhấn vào nút "Xác nhận".
6. Quan sát thông báo phản hồi hiển thị trên giao diện người dùng.

## Expected result

- Hệ thống từ chối thực hiện hành động xóa tài khoản này để bảo toàn tính toàn vẹn dữ liệu cơ sở dữ liệu (khóa ngoại của bảng đơn hàng).
- Hiển thị thông báo lỗi bằng tiếng Việt rõ ràng và nổi bật: "Không thể xóa người dùng đang có giao dịch hoặc đơn hàng hoạt động!".
- Tài khoản người dùng `normal_user@eshop.com` và tất cả các đơn hàng liên quan vẫn được giữ nguyên vẹn trong cơ sở dữ liệu, không bị xóa hay thay đổi trạng thái bất thường.

## Status / Related bugs

Not Run / None
