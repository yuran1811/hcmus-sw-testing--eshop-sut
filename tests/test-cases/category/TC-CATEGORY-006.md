# TC-CATEGORY-006: Xóa danh mục thất bại với ID không tồn tại

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Admin đã đăng nhập vào hệ thống với tài khoản có quyền Admin

## Test data

| Field       | Value                      |
| ----------- | -------------------------- |
| category_id | `99999` (ID không tồn tại) |
| Token       | JWT token hợp lệ của admin |

## Test steps

1. Gửi DELETE request đến `DELETE /api/categories/99999` với JWT token admin hợp lệ

## Expected result

- Hệ thống trả về HTTP 404 Not Found
- Response body chứa thông báo lỗi danh mục không tìm thấy
- Không có thay đổi nào trong danh sách danh mục

## EC / Partition Covered

EC8 (Xóa danh mục — ID không tồn tại) + OC5 (Not Found error)

## Status / Related bugs

Fail / BUG-CATEGORY-002
