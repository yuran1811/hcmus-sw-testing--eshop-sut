# TC-PLAS-BVA-001: Tìm kiếm với từ khóa có độ dài tối thiểu + 1 (1 ký tự)

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Boundary Value Analysis (3-Point BVA)

## Preconditions

- Cơ sở dữ liệu EShop đã có sản phẩm tên "MacBook Pro M3" (giá 45.000.000 ₫).
- Người dùng đang ở trang chủ EShop.

## Test data

| Field  | Value |
| ------ | ----- |
| search | "M"   |

## Test steps

1. Truy cập trang chủ EShop (`http://localhost:5173`).
2. Nhập từ khóa `"M"` vào thanh tìm kiếm.
3. Bấm nút Tìm kiếm (hoặc nhấn Enter).
4. Quan sát lưới sản phẩm hiển thị.

## Expected result

- Lưới sản phẩm hiển thị sản phẩm "MacBook Pro M3". Sản phẩm "Tai nghe AirPods Pro 2" không hiển thị.
- Sản phẩm hiển thị đúng thông tin: ảnh (alt text), tên, giá (đơn vị: ₫, phân cách hàng nghìn).
- Chỉ có đúng 1 thẻ `<h1>` duy nhất trên trang.

## BVA Coverage

Độ dài từ khóa tìm kiếm: Min length boundary (B = 0), điểm kiểm thử B + 1 = 1 ký tự. Kỹ thuật áp dụng: 3-Point BVA.

## Status / Related bugs

Not Run / None
