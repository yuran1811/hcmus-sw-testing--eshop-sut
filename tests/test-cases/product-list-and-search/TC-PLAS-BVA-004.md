# TC-PLAS-BVA-004: Kiểm tra hiển thị khi cơ sở dữ liệu trống (0 sản phẩm)

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Boundary Value Analysis (Natural Minimum, one-sided 3-Point)

## Preconditions

- Cơ sở dữ liệu EShop hoàn toàn trống (không có sản phẩm nào hoạt động).
- Người dùng đang ở trang chủ EShop.

## Test data

| Field  | Value      |
| ------ | ---------- |
| search | "" (Trống) |

## Test steps

1. Đảm bảo bảng `products` trong SQLite không chứa bản ghi nào.
2. Truy cập trang chủ EShop (`http://localhost:5173`).
3. Quan sát giao diện và thông báo hiển thị trên trang chủ.

## Expected result

- Lưới sản phẩm không hiển thị sản phẩm nào.
- Hiển thị thông báo empty state phù hợp dành cho trường hợp hệ thống chưa có sản phẩm (ví dụ: "Chưa có sản phẩm nào được đăng bán" hoặc "No products available").
- Chỉ có đúng 1 thẻ `<h1>` duy nhất trên trang chủ.

## BVA Coverage

Số lượng sản phẩm trong DB: natural minimum `B = 0`, điểm kiểm thử B. Đây là one-sided 3-Point BVA; `B-1 = -1` bất khả thi nên không tuyên bố có cặp 2-Point executable.

## Status / Related bugs

Fail / BUG-PLAS-004
