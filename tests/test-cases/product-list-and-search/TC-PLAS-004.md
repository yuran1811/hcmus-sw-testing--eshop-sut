# TC-PLAS-004: Tìm kiếm sản phẩm bằng từ khóa có dấu tiếng Việt và ký tự đặc biệt

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Cơ sở dữ liệu EShop đã có sản phẩm tên "Bàn phím cơ Keychron Q1" và "Chuột máy tính".
- Người dùng đang ở trang chủ EShop.

## Test data

| Field  | Value      |
| ------ | ---------- |
| search | "Bàn phím cơ Keychron Q1" |

## Test steps

1. Truy cập trang chủ EShop (`http://localhost:5173`).
2. Nhập đầy đủ từ khóa `"Bàn phím cơ Keychron Q1"` vào thanh tìm kiếm để exact-match và contains-match cùng có một oracle.
3. Bấm nút Tìm kiếm (hoặc nhấn Enter).
4. Quan sát lưới sản phẩm hiển thị và kiểm tra độ chính xác của bộ lọc tìm kiếm hỗ trợ tiếng Việt có dấu.

## Expected result

- Lưới sản phẩm hiển thị đúng sản phẩm "Bàn phím cơ Keychron Q1". Sản phẩm "Chuột máy tính" không hiển thị.
- Sản phẩm hiển thị đúng thông tin: ảnh (alt text), tên, giá (đơn vị: ₫, phân cách hàng nghìn).
- Từ khóa `"Bàn phím cơ Keychron Q1"` hiển thị an toàn trên giao diện.
- Chỉ có đúng 1 thẻ `<h1>` duy nhất trên trang.

## EC / Partition Covered

EC4 (search Unicode exact-name) + EC7 (DB có sản phẩm) + EC11 (tải dữ liệu hoàn tất) + OC1 (hiển thị đủ thuộc tính) + OC2 (giá định dạng đúng) + OC4 (đúng 1 thẻ `<h1>`)

## Status / Related bugs

Fail / BUG-PLAS-001, BUG-PLAS-002, BUG-PLAS-003
