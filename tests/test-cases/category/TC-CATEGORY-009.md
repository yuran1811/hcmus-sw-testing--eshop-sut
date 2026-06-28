# TC-CATEGORY-009: Xóa danh mục thất bại khi danh mục đang chứa sản phẩm liên kết

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Admin đã đăng nhập vào hệ thống với tài khoản có quyền Admin
- Tồn tại một danh mục đang có ít nhất 1 sản phẩm liên kết (Ví dụ: Danh mục ID = 1 có sản phẩm ID = 10)

## Test data

| Field       | Value                         |
| ----------- | ----------------------------- |
| category_id | `1` (ID danh mục có sản phẩm) |
| Token       | JWT token hợp lệ của admin    |

## Test steps

1. Mở trang Admin → Categories
2. Tìm danh mục ID = 1 (đang chứa sản phẩm)
3. Bấm nút Xóa tương ứng với danh mục đó
4. Xác nhận hành động xóa trong dialog (nếu có)

## Expected result

- Hệ thống từ chối xóa và hiển thị thông báo lỗi (ví dụ: Không thể xóa danh mục đang có sản phẩm liên kết hoặc trả về mã lỗi HTTP 400/409/500 do ràng buộc khóa ngoại SQLite)
- Danh mục và các sản phẩm liên kết vẫn tồn tại trong hệ thống

## EC / Partition Covered

EC9 (Xóa danh mục — Danh mục đang chứa sản phẩm) + OC7 (Lỗi ràng buộc dữ liệu / Conflict)

## Status / Related bugs

Not Run / None
