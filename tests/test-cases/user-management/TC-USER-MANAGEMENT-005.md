# TC-USER-MANAGEMENT-005: Hiển thị bảng danh sách người dùng khi hệ thống có đúng 1 người dùng khác

## Requirement ID

FR-19

## Module / Test type / Technique

user-management / Functional / Boundary Value Analysis (2-Point BVA)

## Preconditions

- Tài khoản Admin `admin@eshop.com` đang đăng nhập.
- Hệ thống có đúng 2 tài khoản trong cơ sở dữ liệu: 1 tài khoản admin đang đăng nhập và đúng 1 tài khoản người dùng thường khác (`user1@eshop.com`).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as admin@eshop.com (role = admin) |
| userList | 2 users (1 admin, 1 other user) |

## Test steps

1. Đăng nhập vào Admin Portal bằng tài khoản `admin@eshop.com`.
2. Điều hướng đến mục "Quản lý Người dùng" từ thanh bên.
3. Quan sát giao diện hiển thị và đếm số lượng người dùng trong danh sách.

## Expected result

- Giao diện Empty State ẩn đi hoàn toàn.
- Hệ thống hiển thị bảng danh sách người dùng chứa chính xác 2 dòng dữ liệu (dòng 1 là tài khoản admin, dòng 2 là tài khoản `user1@eshop.com`).
- Hiển thị đầy đủ thông tin Họ tên, Email, Số điện thoại, Vai trò của cả hai tài khoản.

## Status / Related bugs

Not Run / None
