# TC-CATEGORY-009: Chính sách xóa danh mục đang được sản phẩm tham chiếu

## Requirement ID

FR-14, FR-15

## Module / Test type / Technique

Quản lý Danh mục / Characterization-State Integrity / Domain Testing (Equivalence Partitioning)

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
5. Kiểm tra category, product liên kết và khóa tham chiếu trong DB/API sau request.

## Expected result

- README chưa chốt restrict/cascade/reassign policy. Hai nhánh hợp lệ là:
  - Từ chối `400/409`, giữ nguyên category và product; hoặc
  - Xóa `200/204` theo policy có tài liệu, đồng thời cascade/reassign tham chiếu một cách nguyên tử và nhất quán với FR-15.
- Không để product trỏ tới category không còn tồn tại, không `500`/raw SQLite error và không partial state.
- Test **Fail** nếu category bị xóa nhưng product liên kết trở thành bản ghi mồ côi.

## EC / Partition Covered

EC9 (Category được product tham chiếu — policy gap) + OC7 (reference-integrity policy)

## Status / Related bugs

Fail / BUG-CATEGORY-010
