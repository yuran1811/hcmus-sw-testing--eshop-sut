# TC-CATEGORY-015: Đặc tả hóa chính sách khi tạo hai danh mục trùng tên

## Requirement ID

FR-14 (Specification-gap characterization)

## Module / Test type / Technique

Quản lý Danh mục / Characterization / Domain Testing (Equivalence Partitioning)

## Preconditions

- Admin đã đăng nhập và có JWT token hợp lệ
- Dữ liệu thử nghiệm chưa có danh mục tên `Đồ sưu tầm`
- README FR-14 không quy định tên danh mục phải duy nhất

## Test data

| Field | Value |
| ----- | ----- |
| name request 1 | `Đồ sưu tầm` |
| name request 2 | `Đồ sưu tầm` |
| Token | JWT token hợp lệ của admin |

## Test steps

1. Gửi request tạo danh mục thứ nhất với tên `Đồ sưu tầm`
2. Gửi request tạo danh mục thứ hai với cùng tên `Đồ sưu tầm`
3. Gửi `GET /api/categories`

## Expected result

- FR-14 không quy định tên danh mục có duy nhất hay không, nên ca này ghi nhận policy thay vì tự coi một nhánh là lỗi.
- Nếu cho phép trùng: cả hai request thành công, tạo hai ID khác nhau và danh sách chứa đủ hai bản ghi.
- Nếu không cho phép trùng: request thứ hai trả `400` hoặc `409` với thông báo rõ ràng; bản ghi thứ nhất vẫn nguyên vẹn.
- Trong cả hai nhánh, không trả `500`, không ghi đè âm thầm và không tạo trạng thái dở dang. Product Owner cần chốt policy vào SRS.

## EC / Partition Covered

EC13 (Specification gap: duplicate name) + OC12 (Deterministic duplicate-name policy)

## Status / Related bugs

Not Run / N/A
