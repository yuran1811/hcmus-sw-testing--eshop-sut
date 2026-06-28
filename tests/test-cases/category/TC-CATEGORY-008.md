# TC-CATEGORY-008: Thêm danh mục thất bại khi dùng token của user thường (non-admin)

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- User thường (role = 'user', không phải 'admin') đã đăng nhập
- Có JWT token hợp lệ của user thường

## Test data

| Field | Value                                        |
| ----- | -------------------------------------------- |
| name  | `Điện tử`                                    |
| Token | JWT token hợp lệ của user thường (non-admin) |

## Test steps

1. Gửi POST request đến `POST /api/categories` với body `{"name": "Điện tử"}` và Authorization header chứa JWT token của user thường

## Expected result

- Hệ thống trả về HTTP 403 Forbidden
- Response body chứa thông báo lỗi không đủ quyền
- Không có danh mục nào được thêm vào hệ thống

## EC / Partition Covered

EC5 (Token của user thường — không có quyền Admin) + OC6 (Forbidden)

## Status / Related bugs

Not Run / None
