# TC-CATEGORY-BVA-006: Xem danh sách khi có 0 danh mục (Boundary Min)

## Requirement ID

FR-14, FR-24

## Module / Test type / Technique

Quản lý Danh mục / Functional / Boundary Value Analysis (Natural Minimum, one-sided 3-Point)

## Preconditions

- Admin đã đăng nhập
- Dùng cơ sở dữ liệu kiểm thử cô lập với bảng `categories` rỗng
- Không có dữ liệu cache danh mục cũ trên client

## Test data

| Field | Value |
| ----- | ----- |
| Category Count | `0` |
| Token | JWT token hợp lệ của admin |

## Test steps

1. Gửi `GET /api/categories`
2. Mở hoặc tải lại trang Admin → Categories
3. Kiểm tra response API và số hàng dữ liệu trong `<tbody>`

## Expected result

- API trả về HTTP 200 OK với mảng rỗng `[]`
- UI tải thành công và hiển thị bảng có 0 hàng dữ liệu
- Không hiển thị danh mục cũ, `null` hoặc hàng giả
- Hiển thị empty state có icon/hình minh họa truy cập được và thông báo tiếng Việt thân thiện, phân biệt với loading/lỗi.
- Không crash dù chưa có danh mục nào

## BVA Coverage

Biên tự nhiên của lực lượng tập hợp: Category Count Min = 0, Test Point: B = 0 (valid). Đây là one-sided 3-Point; B-1 = -1 không khả thi nên không có cặp 2-Point executable. SRS không quy định số lượng tối đa.

## Status / Related bugs

Pass / None
