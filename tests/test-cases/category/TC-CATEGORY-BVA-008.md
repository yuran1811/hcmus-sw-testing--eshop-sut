# TC-CATEGORY-BVA-008: Xem danh sách khi có đúng 2 danh mục (Near-boundary extension)

## Requirement ID

FR-14

## Module / Test type / Technique

Quản lý Danh mục / Functional / Boundary Value Analysis (Near-boundary extension)

## Preconditions

- Admin đã đăng nhập và có JWT token hợp lệ.
- Dùng CSDL kiểm thử cô lập chứa đúng hai danh mục `Điện tử` và `Gia dụng`.
- Không có cache danh mục cũ trên client.

## Test data

| Field | Value |
| --- | --- |
| Category Count | `2` |
| Expected names | `Điện tử`, `Gia dụng` |

## Test steps

1. Gửi `GET /api/categories` bằng token admin.
2. Mở/tải lại trang Admin → Categories.
3. Đếm response items và các hàng danh mục; đối chiếu ID/tên với fixture.

## Expected result

- API trả HTTP 200 với đúng hai phần tử, không thiếu/trùng bản ghi.
- UI hiển thị đúng hai hàng và không hiển thị empty state.
- Mỗi hàng giữ nguyên ID/tên tương ứng; trang không vỡ layout.

## BVA Coverage

Category Count Min = 0; đây là điểm mở rộng B+2 = 2 nhằm kiểm tra chuyển từ single-row sang multiple-row. Bộ 3-point chuẩn ở min vẫn là B-1/B/B+1; SRS không quy định maximum count.

## Status / Related bugs

Not Run / N/A
