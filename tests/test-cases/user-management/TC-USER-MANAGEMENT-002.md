# TC-USER-MANAGEMENT-002: Chặn truy cập danh sách người dùng khi chưa đăng nhập

## Requirement ID

FR-12

## Module / Test type / Technique

user-management / Security / Equivalence Partitioning

## Preconditions

- Trình duyệt đang ở trạng thái chưa đăng nhập (khách vãng lai, không có mã JWT Token hợp lệ).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | anonymous (not logged in) |

## Test steps

1. Mở trình duyệt và truy cập trực tiếp vào URL trang quản lý người dùng của phân hệ admin tại `http://localhost:5174/users` hoặc `http://localhost:5173/admin/users`.
2. Quan sát phản ứng và luồng điều hướng của hệ thống.

## Expected result

- Hệ thống chặn quyền truy cập của khách vãng lai.
- Người dùng bị tự động điều hướng quay lại trang Đăng nhập (`http://localhost:5173/login` hoặc cổng đăng nhập admin).
- Hiển thị thông báo lỗi thân thiện (ví dụ: "Vui lòng đăng nhập tài khoản Admin để truy cập trang này").

## Status / Related bugs

Not Run / None
