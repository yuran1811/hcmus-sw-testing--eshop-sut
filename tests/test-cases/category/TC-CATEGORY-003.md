# TC-CATEGORY-003: Thêm danh mục thất bại khi tên chỉ gồm khoảng trắng

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Admin đã đăng nhập vào hệ thống với tài khoản có quyền Admin
- Trang quản lý danh mục (`/admin/categories`) đang được mở

## Test data

| Field | Value            |
| ----- | ---------------- |
| name  | `   ` (3 spaces) |

## Test steps

1. Mở trang Admin → Categories
2. Nhập vào trường Name chỉ các khoảng trắng (`   `)
3. Bấm nút Thêm / Submit

## Expected result

- Hệ thống từ chối yêu cầu (HTTP 400 Bad Request hoặc hiển thị validation error)
- Thông báo lỗi xuất hiện: trường Name không hợp lệ hoặc bắt buộc
- Không có danh mục nào được thêm vào danh sách

## EC / Partition Covered

EC3 (Name chỉ chứa whitespace) + OC2 (Validation error)

## Status / Related bugs

Fail / BUG-CATEGORY-002
