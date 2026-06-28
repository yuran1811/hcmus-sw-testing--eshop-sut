# TC-CATEGORY-BVA-002: Thêm danh mục với tên 2 ký tự (B+1 tại biên Min)

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Boundary Value Analysis (3-Point)

## Preconditions

- Admin đã đăng nhập vào hệ thống với tài khoản có quyền Admin
- Trang quản lý danh mục (`/admin/categories`) đang được mở

## Test data

| Field | Value |
| ----- | ----- |
| name  | `AB`  |

## Test steps

1. Mở trang Admin → Categories
2. Nhập tên danh mục là `AB` (chính xác 2 ký tự) vào trường Name
3. Bấm nút Thêm / Submit

## Expected result

- Hệ thống chấp nhận và trả về HTTP 201 Created hoặc 200 OK
- Danh mục `AB` xuất hiện trong danh sách
- Không có thông báo lỗi

## BVA Coverage

Boundary: Name length Min = 1 ký tự, Test Point: B+1 = 2 ký tự (1 bước vào vùng hợp lệ), covered by 3-Point only

## Status / Related bugs

Pass / None
