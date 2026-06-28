# TC-CATEGORY-BVA-001: Thêm danh mục với tên đúng 1 ký tự (Boundary Min)

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Boundary Value Analysis (3-Point + 2-Point)

## Preconditions

- Admin đã đăng nhập vào hệ thống với tài khoản có quyền Admin
- Trang quản lý danh mục (`/admin/categories`) đang được mở

## Test data

| Field | Value |
| ----- | ----- |
| name  | `A`   |

## Test steps

1. Mở trang Admin → Categories
2. Nhập tên danh mục là `A` (chính xác 1 ký tự) vào trường Name
3. Bấm nút Thêm / Submit

## Expected result

- Hệ thống chấp nhận và trả về HTTP 201 Created hoặc 200 OK
- Danh mục `A` xuất hiện trong danh sách
- Không có thông báo lỗi

## BVA Coverage

Boundary: Name length Min = 1 ký tự, Test Point: B (đúng tại biên), covered by 3-Point (B) and 2-Point (B valid)

## Status / Related bugs

Not Run / None
