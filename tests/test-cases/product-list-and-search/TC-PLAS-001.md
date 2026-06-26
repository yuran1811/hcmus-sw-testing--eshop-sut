# TC-PLAS-001: Xem toàn bộ danh sách sản phẩm thành công

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Cơ sở dữ liệu EShop đã có các sản phẩm (ví dụ: Keyboard, Mouse, Monitor).
- Người dùng đang ở trang chủ EShop.

## Test data

| Field  | Value      |
| ------ | ---------- |
| search | "" (Trống) |

## Test steps

1. Truy cập trang chủ EShop (`http://localhost:5173`).
2. Quan sát thanh tìm kiếm và lưới sản phẩm hiển thị trên màn hình.
3. Kiểm tra số lượng thẻ `<h1>` trên trang.

## Expected result

- Lưới sản phẩm hiển thị đầy đủ danh sách các sản phẩm đang có trong cơ sở dữ liệu.
- Mỗi sản phẩm hiển thị đúng:
  - Ảnh sản phẩm (có alt text mô tả).
  - Tên sản phẩm.
  - Giá sản phẩm có định dạng phân cách hàng nghìn và ký hiệu ₫ (ví dụ: `150.000 ₫`).
- Chỉ tồn tại đúng 1 thẻ `<h1>` duy nhất trên trang chủ.

## EC / Partition Covered

EC2 (search = "") + EC7 (DB có sản phẩm) + EC11 (tải dữ liệu hoàn tất) + OC1 (hiển thị đủ thuộc tính sản phẩm) + OC2 (giá định dạng đúng) + OC4 (đúng 1 thẻ `<h1>`)

## Status / Related bugs

Not Run / None
