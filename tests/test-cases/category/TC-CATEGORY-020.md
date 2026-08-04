# TC-CATEGORY-020: Đặc tả hóa hành vi khi xóa lặp cùng category_id

## Requirement ID

FR-14 (Specification-gap / idempotency characterization)

## Module / Test type / Technique

Quản lý Danh mục / Characterization / Domain Testing (State-based Negative Case)

## Preconditions

- Admin đã đăng nhập và có JWT token hợp lệ
- Tạo một danh mục cô lập tên `Dùng để kiểm tra xóa lặp`, không có sản phẩm liên kết
- Ghi nhận `category_id` được trả về khi tạo

## Test data

| Field | Value |
| ----- | ----- |
| category_id | ID của `Dùng để kiểm tra xóa lặp` |
| Token | JWT token hợp lệ của admin |

## Test steps

1. Gửi `DELETE /api/categories/{category_id}` lần thứ nhất
2. Xác nhận danh mục không còn trong `GET /api/categories`
3. Gửi lại đúng request DELETE đó lần thứ hai
4. Gọi `GET /api/categories` lần cuối

## Expected result

- Lần xóa thứ nhất trả về HTTP 200 OK hoặc 204 No Content
- Lần xóa thứ hai tuân theo policy đã tài liệu hóa: ưu tiên `404/410` cho resource không còn tồn tại; `200/204` idempotent chỉ hợp lệ khi API contract công bố rõ và response không khẳng định sai rằng vừa xóa thêm một bản ghi.
- Nếu chưa có policy, ghi nhận đây là khoảng trống cần Product Owner chốt; không tự gán bug chỉ theo status code.
- Lần hai không trả `500`, không tạo lại danh mục và không báo số lượng bản ghi bị xóa lớn hơn 0.
- Không có danh mục khác bị ảnh hưởng

## EC / Partition Covered

EC18 (Specification gap: stale/already-deleted ID) + OC5 (Deterministic missing-resource policy)

## Status / Related bugs

Not Run / N/A
