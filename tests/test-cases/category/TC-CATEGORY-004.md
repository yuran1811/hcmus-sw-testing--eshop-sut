# TC-CATEGORY-004: Xem danh sách danh mục thành công

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Admin đã đăng nhập vào hệ thống với tài khoản có quyền Admin
- Có ít nhất 2 danh mục tồn tại trong hệ thống

## Test data

| Field | Value                      |
| ----- | -------------------------- |
| Token | JWT token hợp lệ của admin |

## Test steps

1. Gửi GET request đến `GET /api/categories` với JWT token admin hợp lệ
2. (Hoặc) Mở trang Admin → Categories
3. Đếm số phần tử response và số hàng hiển thị, rồi đối chiếu với dữ liệu chuẩn bị.

## Expected result

- Hệ thống trả về HTTP 200 OK
- Response body chứa mảng danh mục, mỗi phần tử có ít nhất `id` và `name`
- Danh sách hiển thị đúng các danh mục hiện có
- Số phần tử/hàng đúng với số danh mục trong CSDL và không bỏ sót bản ghi khi có nhiều danh mục.

## EC / Partition Covered

EC6 (Token admin hợp lệ) + EC21 (Có nhiều danh mục) + OC3 (Trả về danh sách) + OC11 (Đúng số lượng)

## Status / Related bugs

Pass / None
