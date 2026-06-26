# TC-USER-MANAGEMENT-004: Hiển thị Empty State khi hệ thống không có người dùng nào khác ngoài Admin

## Requirement ID

FR-24

## Module / Test type / Technique

user-management / GUI / Boundary Value Analysis (2-Point BVA)

## Preconditions

- Tài khoản Admin `admin@eshop.com` là tài khoản duy nhất tồn tại trong cơ sở dữ liệu hệ thống (0 người dùng thường khác).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as admin@eshop.com (role = admin) |
| userList | 1 user (only the active logged-in admin) |

## Test steps

1. Đăng nhập vào Admin Portal bằng tài khoản `admin@eshop.com`.
2. Điều hướng đến mục "Quản lý Người dùng" từ thanh bên.
3. Quan sát giao diện hiển thị của trang.

## Expected result

- Bảng danh sách người dùng không hiển thị (hoặc chỉ hiển thị dòng tiêu đề cột trống).
- Trang hiển thị giao diện trống (Empty State) theo tiêu chuẩn FR-24 gồm:
  - Một icon hoặc hình vẽ minh họa thân thiện mô tả danh sách trống.
  - Message tiếng Việt thân thiện rõ ràng (ví dụ: "Chưa có người dùng nào khác đăng ký trên hệ thống").

## Status / Related bugs

Not Run / None
