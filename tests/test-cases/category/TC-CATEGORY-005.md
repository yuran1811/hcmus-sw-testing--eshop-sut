# TC-CATEGORY-005: Xóa danh mục thành công

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Admin đã đăng nhập vào hệ thống với tài khoản có quyền Admin
- Tồn tại danh mục cần xóa (ví dụ: id = 1, name = `Thời trang`)

## Test data

| Field       | Value                           |
| ----------- | ------------------------------- |
| category_id | ID danh mục hợp lệ đang tồn tại |
| Token       | JWT token hợp lệ của admin      |

## Test steps

1. Mở trang Admin → Categories
2. Xác định danh mục cần xóa trong danh sách
3. Bấm nút Xóa tương ứng với danh mục đó
4. (Nếu có) Xác nhận hành động xóa trong dialog

## Expected result

- Hệ thống trả về HTTP 200 OK hoặc 204 No Content
- Danh mục đã xóa không còn xuất hiện trong danh sách
- Không có thông báo lỗi nào hiển thị

## EC / Partition Covered

EC7 (Xóa danh mục — ID hợp lệ tồn tại) + OC4 (Xóa thành công)

## Status / Related bugs

Not Run / None
