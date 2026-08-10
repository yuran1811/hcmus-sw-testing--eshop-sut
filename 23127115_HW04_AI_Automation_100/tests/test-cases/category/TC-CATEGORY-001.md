# TC-CATEGORY-001: Thêm danh mục thành công với tên hợp lệ

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
| name  | `Điện tử` |

## Test steps

1. Mở trang Admin → Categories
2. Nhập tên danh mục `Điện tử` vào trường Name
3. Bấm nút Thêm / Submit

## Expected result

- Hệ thống trả về HTTP 201 (Created) hoặc 200 (OK)
- Danh mục `Điện tử` xuất hiện trong danh sách danh mục
- Không có thông báo lỗi nào hiển thị

## EC / Partition Covered

EC1 (Name hợp lệ, chuỗi không rỗng) + OC1 (Thêm thành công)

## Status / Related bugs

Pass / None
