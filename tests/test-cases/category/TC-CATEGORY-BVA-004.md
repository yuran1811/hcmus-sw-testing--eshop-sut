# TC-CATEGORY-BVA-004: Xóa danh mục với category_id tại mốc tham chiếu 1 (R)

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Robustness-Characterization / Identifier Reference Analysis

## Preconditions

- Admin đã đăng nhập và có JWT token hợp lệ
- Dùng cơ sở dữ liệu kiểm thử cô lập có danh mục `id = 1`
- Danh mục `id = 1` không có sản phẩm liên kết

## Test data

| Field | Value |
| ----- | ----- |
| category_id | `1` |
| Token | JWT token hợp lệ của admin |

## Test steps

1. Xác nhận `GET /api/categories` có đúng danh mục `id = 1`
2. Gửi `DELETE /api/categories/1` bằng JWT admin hợp lệ
3. Gửi lại `GET /api/categories`

## Expected result

- Request DELETE trả về HTTP 200 OK hoặc 204 No Content
- Danh mục `id = 1` không còn trong danh sách
- Không có bản ghi nào khác bị thay đổi

## BVA Coverage

Mốc implementation-derived `R = 1` của fixture SQLite; kết quả xóa thành công chỉ áp dụng vì precondition bảo đảm record tồn tại. Đây là identifier reference, không phải biên nghiệp vụ do FR-14 quy định.

## Status / Related bugs

Not Run / N/A
