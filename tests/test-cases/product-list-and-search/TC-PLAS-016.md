# TC-PLAS-016: Mọi ảnh sản phẩm có alt text không rỗng và mô tả đúng

## Requirement ID

FR-05, FR-24

## Module / Test type / Technique

Product List & Search / Accessibility / Domain Testing (Output Partitioning)

## Preconditions

- CSDL có ít nhất ba sản phẩm với tên và ảnh khác nhau.

## Test data

| Field | Value |
| --- | --- |
| search | rỗng |

## Test steps

1. Tải danh sách sản phẩm.
2. Với từng `img` trong thẻ sản phẩm, kiểm tra thuộc tính `alt` bằng DOM/accessibility tree.

## Expected result

- 100% ảnh có `alt` tồn tại, không rỗng/không chỉ khoảng trắng và mô tả đúng sản phẩm tương ứng.
- Ảnh không dùng tên file/URL chung chung làm alt text.

## EC / Partition Covered

OC1 (đủ thuộc tính thẻ sản phẩm) + OC7 (alt text hợp lệ)

## Status / Related bugs

Not Run / N/A

