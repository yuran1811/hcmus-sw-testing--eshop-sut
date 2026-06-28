# TC-PLAS-003: Tìm kiếm sản phẩm bằng từ khóa không khớp với sản phẩm nào

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Cơ sở dữ liệu EShop đã có các sản phẩm (ví dụ: iPhone 15 Pro Max, MacBook Pro M3, Tai nghe AirPods Pro 2).
- Người dùng đang ở trang chủ EShop.

## Test data

| Field  | Value                     |
| ------ | ------------------------- |
| search | "NonExistentProduct12345" |

## Test steps

1. Truy cập trang chủ EShop (`http://localhost:5173`).
2. Nhập từ khóa `"NonExistentProduct12345"` vào thanh tìm kiếm.
3. Bấm nút Tìm kiếm (hoặc nhấn Enter).
4. Quan sát lưới sản phẩm hiển thị và thông báo empty state.

## Expected result

- Lưới sản phẩm trống (không có sản phẩm nào hiển thị).
- Hiển thị thông báo empty state phù hợp (ví dụ: "Không tìm thấy sản phẩm nào" hoặc "No products found").
- Từ khóa `"NonExistentProduct12345"` hiển thị đúng trên thanh tìm kiếm hoặc phần kết quả.
- Chỉ có đúng 1 thẻ `<h1>` duy nhất trên trang.

## EC / Partition Covered

EC3 (search = "NonExistentProduct12345") + EC7 (DB có sản phẩm) + EC11 (tải dữ liệu hoàn tất) + OC4 (đúng 1 thẻ `<h1>`)

## Status / Related bugs

Fail / BUG-PLAS-004
