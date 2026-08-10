# TC-CATEGORY-013: Từ chối name null hoặc không phải chuỗi

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning, Data-driven)

## Preconditions

- Admin đã đăng nhập và có JWT token hợp lệ
- Ghi nhận danh sách danh mục trước khi kiểm thử

## Test data

| Variant | Request body | Miền |
| ------- | ------------ | ---- |
| 1 | `{"name": null}` | Null |
| 2 | `{"name": 123}` | Number |
| 3 | `{"name": true}` | Boolean |
| 4 | `{"name": []}` | Array |
| 5 | `{"name": {"text": "Gia dụng"}}` | Object |

## Test steps

1. Với từng variant, gửi `POST /api/categories` bằng JWT admin hợp lệ
2. Ghi nhận status code và response body
3. Sau mỗi request, gọi `GET /api/categories` để kiểm tra dữ liệu

## Expected result

- Mỗi variant đều bị từ chối với HTTP 400 Bad Request
- Response nêu rõ `name` phải là chuỗi không rỗng
- Không có giá trị `null`, chuỗi ép kiểu hoặc cấu trúc JSON ngoài ý muốn được lưu
- Danh sách danh mục không thay đổi sau toàn bộ variants

## EC / Partition Covered

EC10 (Name null) + EC11 (Name sai kiểu dữ liệu) + OC2 (Validation error)

## Status / Related bugs

Fail / BUG-CATEGORY-007

