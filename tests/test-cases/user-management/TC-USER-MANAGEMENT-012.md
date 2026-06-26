# TC-USER-MANAGEMENT-012: Nhất quán ngôn ngữ tiếng Việt 100% trên giao diện quản lý người dùng

## Requirement ID

FR-21

## Module / Test type / Technique

user-management / GUI / Error Isolation

## Preconditions

- Tài khoản Admin `admin@eshop.com` đang đăng nhập và ở trên trang quản lý người dùng.

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as admin@eshop.com (role = admin) |

## Test steps

1. Đăng nhập Admin Portal và mở trang "Quản lý Người dùng".
2. Quét toàn bộ giao diện từ trên xuống dưới, từ trái sang phải.
3. Kiểm tra ngôn ngữ của: tiêu đề trang, các tiêu đề cột của bảng (Họ tên, Email, SĐT, Vai trò, Thao tác), các nhãn, các nút bấm (Xóa, Hủy, Xác nhận), văn bản trong dialog xác nhận và thông báo toast thành công.

## Expected result

- Toàn bộ giao diện sử dụng ngôn ngữ tiếng Việt nhất quán 100% (trừ các thuật ngữ kỹ thuật chuẩn hoặc email).
- Không xuất hiện các từ tiếng Anh chưa được dịch (như "Delete", "Actions", "Role", "User Management", "Confirm", "Cancel").

## Status / Related bugs

Not Run / None
