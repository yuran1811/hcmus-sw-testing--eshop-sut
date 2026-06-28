# TC-CATEGORY-004: Xem danh sách danh mục thành công

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Admin đã đăng nhập vào hệ thống với tài khoản có quyền Admin
- Có ít nhất 1 danh mục tồn tại trong hệ thống

## Test data

| Field | Value                      |
| ----- | -------------------------- |
| Token | JWT token hợp lệ của admin |

## Test steps

1. Gửi GET request đến `GET /api/categories` với JWT token admin hợp lệ
2. (Hoặc) Mở trang Admin → Categories

## Expected result

- Hệ thống trả về HTTP 200 OK
- Response body chứa mảng danh mục, mỗi phần tử có ít nhất `id` và `name`
- Danh sách hiển thị đúng các danh mục hiện có

## EC / Partition Covered

EC6 (Xem danh sách — token admin hợp lệ) + OC3 (Trả về danh sách danh mục)

## Status / Related bugs

Not Run / None
