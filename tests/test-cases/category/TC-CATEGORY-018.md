# TC-CATEGORY-018: Từ chối tạo danh mục bằng token sai hoặc hết hạn

## Requirement ID

FR-12, FR-14, SEC-02, SEC-03

## Module / Test type / Technique

Quản lý Danh mục / Security-Functional / Domain Testing (Equivalence Partitioning, Data-driven)

## Preconditions

- Ghi nhận danh sách danh mục trước khi kiểm thử
- Chuẩn bị một JWT admin đã hết hạn và một token sai chữ ký

## Test data

| Variant | Authorization | Body |
| ------- | ------------- | ---- |
| 1 | `Bearer invalid.token.signature` | `{"name":"Token sai"}` |
| 2 | `Bearer <expired_admin_token>` | `{"name":"Token hết hạn"}` |

## Test steps

1. Với từng variant, gửi `POST /api/categories` cùng header và body tương ứng
2. Ghi nhận status code và response body
3. Sau mỗi request, gọi `GET /api/categories` để kiểm tra dữ liệu

## Expected result

- Mỗi request đều bị từ chối với HTTP 403 Forbidden (hoặc HTTP 401 nếu API quy ước token hết hiệu lực là unauthenticated)
- Không có danh mục `Token sai` hoặc `Token hết hạn` được tạo
- Dữ liệu danh mục không thay đổi

## EC / Partition Covered

EC16 (Token malformed / expired) + OC6 (Unauthorized / Forbidden, no mutation)

## Status / Related bugs

Not Run / N/A
