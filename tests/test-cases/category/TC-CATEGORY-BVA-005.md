# TC-CATEGORY-BVA-005: Xóa danh mục với category_id ngay trên mốc tham chiếu (R+1)

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Robustness-Characterization / Identifier Reference Analysis

## Preconditions

- Admin đã đăng nhập và có JWT token hợp lệ
- Dùng cơ sở dữ liệu kiểm thử cô lập có hai danh mục `id = 1` và `id = 2`
- Cả hai danh mục không có sản phẩm liên kết

## Test data

| Field | Value |
| ----- | ----- |
| category_id | `2` |
| Token | JWT token hợp lệ của admin |

## Test steps

1. Xác nhận `GET /api/categories` có danh mục `id = 1` và `id = 2`
2. Gửi `DELETE /api/categories/2` bằng JWT admin hợp lệ
3. Gửi lại `GET /api/categories`

## Expected result

- Request DELETE trả về HTTP 200 OK hoặc 204 No Content
- Danh mục `id = 2` bị xóa
- Danh mục `id = 1` vẫn tồn tại và không bị thay đổi

## BVA Coverage

Mốc implementation-derived `R+1 = 2` của fixture SQLite; kết quả xóa thành công chỉ áp dụng vì precondition bảo đảm record tồn tại. Đây là identifier reference, không phải biên nghiệp vụ do FR-14 quy định.

## Status / Related bugs

Not Run / N/A
