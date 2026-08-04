# TC-CATEGORY-019: Xử lý an toàn category_id sai cú pháp

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Robustness-Characterization / Domain Testing (Equivalence Partitioning, Data-driven)

## Preconditions

- Admin đã đăng nhập và có JWT token hợp lệ
- Có ít nhất một danh mục trong hệ thống
- Ghi nhận toàn bộ danh sách danh mục trước khi kiểm thử

## Test data

| Variant | category_id trong URL | Miền |
| ------- | ---------------------- | ---- |
| 1 | `abc` | Chuỗi không phải số |
| 2 | `1.5` | Số không nguyên |

## Test steps

1. Gửi `DELETE /api/categories/abc` bằng JWT admin hợp lệ
2. Gửi `GET /api/categories` và đối chiếu dữ liệu
3. Gửi `DELETE /api/categories/1.5` bằng JWT admin hợp lệ
4. Gửi `GET /api/categories` và đối chiếu dữ liệu

## Expected result

- Mỗi request bị từ chối có kiểm soát bằng `400` hoặc `404`; API contract chưa quy định exact status nên không coi khác biệt này là bug.
- Response nêu rõ ID sai/không tồn tại và không tuyên bố đã xóa thành công.
- Không có danh mục nào bị xóa hoặc thay đổi
- API không báo xóa thành công cho ID sai cú pháp

## EC / Partition Covered

EC17 (category_id sai kiểu/cú pháp) + OC10 (Controlled identifier policy, no mutation)

## Status / Related bugs

Not Run / N/A
