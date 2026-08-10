# TC-CATEGORY-BVA-003: Xóa danh mục với category_id bằng 0 dưới mốc ID tham chiếu

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Robustness-Characterization / Identifier Reference Analysis

## Preconditions

- Admin đã đăng nhập và có JWT token hợp lệ
- Ghi nhận danh sách danh mục trước khi kiểm thử

## Test data

| Field | Value |
| ----- | ----- |
| category_id | `0` |
| Token | JWT token hợp lệ của admin |

## Test steps

1. Gửi `DELETE /api/categories/0` bằng JWT admin hợp lệ
2. Ghi nhận status code và response body
3. Gửi `GET /api/categories` và đối chiếu với danh sách ban đầu

## Expected result

- Vì FR-14 không chốt status cho ID 0, request ưu tiên trả `400` hoặc `404` với thông báo rõ; documented idempotent no-op chỉ hợp lệ khi không tuyên bố sai rằng có bản ghi vừa bị xóa.
- Không có danh mục nào bị xóa hoặc thay đổi

## BVA Coverage

Mốc identifier implementation-derived: SQLite `INTEGER PRIMARY KEY AUTOINCREMENT` sinh ID dương từ 1; điểm tham chiếu `R-1 = 0`. FR-14 không quy định biên số/status riêng, nên oracle cốt lõi là no mutation và phản hồi có kiểm soát.

## Status / Related bugs

Fail / BUG-CATEGORY-009
