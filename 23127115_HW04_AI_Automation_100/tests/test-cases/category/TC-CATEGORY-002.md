# TC-CATEGORY-002: Thêm danh mục thất bại khi tên để trống

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Admin đã đăng nhập vào hệ thống với tài khoản có quyền Admin
- Trang quản lý danh mục (`/admin/categories`) đang được mở

## Test data

| Field | Value     |
| ----- | --------- |
| name  | `` (rỗng) |

## Test steps

1. Mở trang Admin → Categories
2. Để trống trường Name (không nhập gì)
3. Bấm nút Thêm / Submit

## Expected result

- Hệ thống từ chối yêu cầu (HTTP 400 Bad Request hoặc hiển thị validation error)
- Thông báo lỗi xuất hiện: trường Name là bắt buộc
- Không có danh mục nào được thêm vào danh sách

## EC / Partition Covered

EC2 (Name rỗng — Empty string) + OC2 (Validation error — Name bắt buộc)

## Status / Related bugs

Fail / BUG-CATEGORY-001
