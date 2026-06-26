# TC-PLAS-007: Kiểm tra cấu trúc thẻ H1 duy nhất trên trang chủ

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng truy cập trang chủ EShop.

## Test data

| Field  | Value      |
| ------ | ---------- |
| search | "" (Trống) |

## Test steps

1. Truy cập trang chủ EShop (`http://localhost:5173`).
2. Mở Chrome Developer Tools (nhấn F12), chuyển sang tab Console hoặc Elements.
3. Chạy lệnh Console: `document.querySelectorAll('h1').length` (hoặc đếm thủ công các thẻ `<h1>` trong cây DOM).
4. Xác nhận số lượng thẻ `<h1>` tìm thấy.

## Expected result

- Lệnh console trả về kết quả là `1`.
- Chỉ có đúng 1 thẻ `<h1>` duy nhất trên trang chủ để đảm bảo tính thẩm mỹ và chuẩn SEO (Search Engine Optimization).

## EC / Partition Covered

EC11 (tải dữ liệu hoàn tất) + OC4 (đúng 1 thẻ `<h1>` duy nhất)

## Status / Related bugs

Not Run / None
