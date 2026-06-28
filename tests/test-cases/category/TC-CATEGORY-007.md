# TC-CATEGORY-007: Thêm danh mục thất bại khi không có token (Unauthorized)

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng KHÔNG đăng nhập (không có JWT token hợp lệ)

## Test data

| Field | Value                                      |
| ----- | ------------------------------------------ |
| name  | `Điện tử`                                  |
| Token | (không có — header Authorization bị thiếu) |

## Test steps

1. Gửi POST request đến `POST /api/categories` với body `{"name": "Điện tử"}` nhưng KHÔNG kèm header Authorization

## Expected result

- Hệ thống trả về HTTP 401 Unauthorized hoặc 403 Forbidden
- Response body chứa thông báo lỗi xác thực
- Không có danh mục nào được thêm vào hệ thống

## EC / Partition Covered

EC4 (Token không tồn tại / Unauthorized) + OC6 (Unauthorized / Forbidden)

## Status / Related bugs

Not Run / None
