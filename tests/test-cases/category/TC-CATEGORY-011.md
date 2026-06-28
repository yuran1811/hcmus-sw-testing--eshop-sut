# TC-CATEGORY-011: Xóa danh mục thất bại khi dùng token của user thường (Forbidden)

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng có vai trò thông thường (role = 'user') đã đăng nhập thành công
- Có JWT token hợp lệ của user thường

## Test data

| Field       | Value                                        |
| ----------- | -------------------------------------------- |
| category_id | `1`                                          |
| Token       | JWT token hợp lệ của user thường (non-admin) |

## Test steps

1. Gửi request `DELETE /api/categories/1` với header Authorization chứa JWT token của user thường

## Expected result

- Hệ thống từ chối yêu cầu và trả về mã lỗi HTTP 403 Forbidden (hoặc thông báo không đủ quyền)
- Danh mục không bị xóa khỏi hệ thống

## EC / Partition Covered

EC5 (Token user thường) + OC6 (Unauthorized / Forbidden)

## Status / Related bugs

Fail / BUG-CATEGORY-005
