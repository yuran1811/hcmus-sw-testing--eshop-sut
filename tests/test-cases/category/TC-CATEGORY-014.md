# TC-CATEGORY-014: Thêm danh mục Unicode và emoji hợp lệ

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Admin đã đăng nhập và có JWT token hợp lệ
- Chưa tồn tại danh mục có đúng tên trong dữ liệu thử nghiệm

## Test data

| Field | Value |
| ----- | ----- |
| name  | `Đồ gia dụng – Nhà bếp 🍳` |
| Token | JWT token hợp lệ của admin |

## Test steps

1. Gửi `POST /api/categories` với body `{"name":"Đồ gia dụng – Nhà bếp 🍳"}`
2. Ghi nhận ID được cấp trong response
3. Gửi `GET /api/categories`
4. Mở trang Admin → Categories và tìm bản ghi vừa tạo

## Expected result

- Hệ thống trả về HTTP 201 Created hoặc 200 OK
- Danh mục được cấp một ID mới
- Tên tiếng Việt, dấu gạch dài và emoji được lưu/trả về nguyên vẹn
- UI hiển thị đúng nội dung, không xuất hiện ký tự thay thế hoặc lỗi encoding

## EC / Partition Covered

EC12 (Name hợp lệ chứa Unicode/ký tự đa byte) + OC1 (Thêm thành công) + OC3 (Hiển thị đúng)

## Status / Related bugs

Not Run / N/A

