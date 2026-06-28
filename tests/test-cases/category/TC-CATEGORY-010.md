# TC-CATEGORY-010: Xóa danh mục thất bại khi không có token (Unauthorized)

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng chưa đăng nhập (không có JWT token)

## Test data

| Field       | Value                                      |
| ----------- | ------------------------------------------ |
| category_id | `1`                                        |
| Token       | (không có — header Authorization bị thiếu) |

## Test steps

1. Gửi request `DELETE /api/categories/1` nhưng không đính kèm header Authorization chứa JWT token

## Expected result

- Hệ thống từ chối yêu cầu và trả về mã lỗi HTTP 401 Unauthorized
- Danh mục không bị xóa khỏi hệ thống

## EC / Partition Covered

EC4 (Token không tồn tại) + OC6 (Unauthorized / Forbidden)

## Status / Related bugs

Pass / None
