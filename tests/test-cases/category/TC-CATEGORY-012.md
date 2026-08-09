# TC-CATEGORY-012: Thêm danh mục thất bại khi thiếu thuộc tính name

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Admin đã đăng nhập và có JWT token hợp lệ
- Ghi nhận số lượng danh mục hiện có trước khi kiểm thử

## Test data

| Field | Value |
| ----- | ----- |
| Body  | `{}` (không có thuộc tính `name`) |
| Token | JWT token hợp lệ của admin |

## Test steps

1. Gửi `POST /api/categories` với header `Authorization: Bearer <admin_token>`
2. Gửi body JSON `{}`
3. Gửi `GET /api/categories` và đối chiếu với danh sách trước bước 1

## Expected result

- Hệ thống trả về HTTP 400 Bad Request
- Response nêu rõ `name` là trường bắt buộc
- Không tạo bản ghi có `name = null` và số lượng danh mục không thay đổi

## EC / Partition Covered

EC2 (Name bị bỏ sót — missing required field) + OC2 (Validation error)

## Status / Related bugs

Fail / BUG-CATEGORY-006

