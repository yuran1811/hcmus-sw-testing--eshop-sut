# TC-CATEGORY-017: Xử lý an toàn tên danh mục chứa payload SQL

## Requirement ID

FR-14, SEC-05

## Module / Test type / Technique

Quản lý Danh mục / Security-Functional / Domain Testing (Malicious Input Partition)

## Preconditions

- Admin đã đăng nhập và có JWT token hợp lệ
- Ghi nhận ít nhất một danh mục đối chứng đang tồn tại

## Test data

| Field | Value |
| ----- | ----- |
| name | `'); DROP TABLE categories; --` |
| Token | JWT token hợp lệ của admin |

## Test steps

1. Gửi `POST /api/categories` với `name` là payload trong bảng
2. Gửi `GET /api/categories`
3. Tạo thêm một danh mục hợp lệ tên `Đối chứng sau SQLi`
4. Gửi lại `GET /api/categories`

## Expected result

- Payload không được thực thi như câu lệnh SQL
- Bảng `categories` và các danh mục đối chứng vẫn tồn tại
- Hệ thống có thể chấp nhận và lưu nguyên payload như literal, hoặc từ chối bằng `400` với thông báo validation rõ ràng; không coi safe rejection là lỗi vì SRS không buộc phải chấp nhận mọi ký tự.
- Không trả raw SQL error/HTTP 500 và không có mutation một phần.
- Request tạo `Đối chứng sau SQLi` vẫn thành công

## EC / Partition Covered

EC15 (Name chứa SQL metacharacters) + OC9 (Parameterized query / database integrity)

## Status / Related bugs

Pass / None
