# TC-CATEGORY-BVA-007: Xem danh sách khi có đúng 1 danh mục (B+1)

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Boundary Value Analysis (Natural Boundary, 3-Point)

## Preconditions

- Admin đã đăng nhập
- Dùng cơ sở dữ liệu kiểm thử cô lập có đúng một danh mục `id = 1, name = "Danh mục duy nhất"`
- Không có dữ liệu cache danh mục cũ trên client

## Test data

| Field | Value |
| ----- | ----- |
| Category Count | `1` |
| Category | `{"id":1,"name":"Danh mục duy nhất"}` |
| Token | JWT token hợp lệ của admin |

## Test steps

1. Gửi `GET /api/categories`
2. Mở hoặc tải lại trang Admin → Categories
3. Kiểm tra response API và các hàng dữ liệu trong bảng

## Expected result

- API trả về HTTP 200 OK với mảng có đúng 1 phần tử
- Phần tử có `id = 1` và `name = "Danh mục duy nhất"`
- UI hiển thị đúng 1 hàng dữ liệu, không nhân đôi hoặc bỏ sót

## BVA Coverage

Biên tự nhiên của lực lượng tập hợp: Category Count Min = 0, Test Point: B+1 = 1 (valid), covered by 3-Point. SRS không quy định số lượng tối đa.

## Status / Related bugs

Pass / None

