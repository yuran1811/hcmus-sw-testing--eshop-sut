# TC-PLAS-002: Tìm kiếm sản phẩm bằng từ khóa hợp lệ có kết quả

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Cơ sở dữ liệu EShop đã có sản phẩm tên "Keyboard" (giá 150.000 ₫) và "Mouse" (giá 80.000 ₫).
- Người dùng đang ở trang chủ EShop.

## Test data

| Field  | Value      |
| ------ | ---------- |
| search | "Keyboard" |

## Test steps

1. Truy cập trang chủ EShop (`http://localhost:5173`).
2. Nhập từ khóa `"Keyboard"` vào thanh tìm kiếm.
3. Bấm nút Tìm kiếm (hoặc nhấn Enter).
4. Quan sát lưới sản phẩm hiển thị và từ khóa tìm kiếm hiển thị trên giao diện.

## Expected result

- Lưới sản phẩm chỉ hiển thị sản phẩm "Keyboard". Sản phẩm "Mouse" không hiển thị.
- Sản phẩm "Keyboard" hiển thị đúng các thông tin: ảnh (alt text), tên, giá định dạng đúng (`150.000 ₫`).
- Từ khóa `"Keyboard"` hiển thị đúng trên thanh tìm kiếm hoặc phần mô tả kết quả tìm kiếm.
- Chỉ có đúng 1 thẻ `<h1>` duy nhất trên trang.

## EC / Partition Covered

EC1 (search = "Keyboard") + EC7 (DB có nhiều sản phẩm) + EC11 (tải dữ liệu hoàn tất) + OC1 (hiển thị đủ thuộc tính) + OC2 (giá định dạng đúng) + OC4 (đúng 1 thẻ `<h1>`)

## Status / Related bugs

Not Run / None
