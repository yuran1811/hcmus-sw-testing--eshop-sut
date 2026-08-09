# TC-PLAS-BVA-005: Kiểm tra hiển thị khi cơ sở dữ liệu có đúng 1 sản phẩm

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Boundary Value Analysis (3-Point BVA)

## Preconditions

- Cơ sở dữ liệu EShop chỉ chứa duy nhất đúng 1 sản phẩm (ví dụ: "MacBook Pro M3" giá 45.000.000 ₫).
- Người dùng đang ở trang chủ EShop.

## Test data

| Field  | Value      |
| ------ | ---------- |
| search | "" (Trống) |

## Test steps

1. Đảm bảo bảng `products` trong SQLite chỉ chứa duy nhất 1 bản ghi.
2. Truy cập trang chủ EShop (`http://localhost:5173`).
3. Quan sát lưới sản phẩm hiển thị trên trang chủ.

## Expected result

- Lưới sản phẩm hiển thị đúng 1 thẻ sản phẩm duy nhất ("MacBook Pro M3").
- Sản phẩm hiển thị đúng: ảnh (alt text), tên, giá định dạng chuẩn (`45.000.000 ₫`).
- Chỉ tồn tại đúng 1 thẻ `<h1>` duy nhất trên trang chủ.

## BVA Coverage

Số lượng sản phẩm trong DB: Min count boundary (B = 0), điểm kiểm thử B + 1 = 1 sản phẩm. Kỹ thuật áp dụng: 3-Point BVA.

## Status / Related bugs

Fail / BUG-PLAS-001
