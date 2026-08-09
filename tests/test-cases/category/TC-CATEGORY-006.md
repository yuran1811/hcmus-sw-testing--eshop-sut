# TC-CATEGORY-006: Xử lý có kiểm soát khi xóa category_id không tồn tại

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Characterization / Domain Testing (Equivalence Partitioning)

## Preconditions

- Admin đã đăng nhập vào hệ thống với tài khoản có quyền Admin

## Test data

| Field       | Value                      |
| ----------- | -------------------------- |
| category_id | `99999` (ID không tồn tại) |
| Token       | JWT token hợp lệ của admin |

## Test steps

1. Chụp snapshot danh sách danh mục trước test.
2. Gửi DELETE request đến `DELETE /api/categories/99999` với JWT token admin hợp lệ.
3. Ghi nhận status/body/deleted-count (nếu có) và đối chiếu danh sách sau test.

## Expected result

- FR-14 không quy định status cho resource không tồn tại. Hợp lệ nếu hệ thống trả `404/410` với thông báo rõ; hoặc dùng `200/204` idempotent theo policy có tài liệu nhưng không tuyên bố sai rằng một record vừa được xóa (`deletedCount = 0` nếu có trường này).
- Không có danh mục nào bị xóa/thay đổi; không `500`, raw DB error hay trạng thái dở dang.
- Test **Fail** nếu response báo sai rằng đã xóa record, báo affected count dương, hoặc làm thay đổi dữ liệu.

## EC / Partition Covered

EC8 (ID không tồn tại — specification gap) + OC5 (missing/stale resource policy)

## Status / Related bugs

Fail / BUG-CATEGORY-003
