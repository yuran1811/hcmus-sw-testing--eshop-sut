# TC-PLAS-015: Empty state có hình minh họa và thông báo thân thiện

## Requirement ID

FR-05, FR-24

## Module / Test type / Technique

Product List & Search / UI-Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Không sản phẩm nào khớp `KhongCoSanPham987654`.

## Test data

| Field | Value |
| --- | --- |
| search | `KhongCoSanPham987654` |

## Test steps

1. Gửi tìm kiếm không có kết quả.
2. Kiểm tra vùng kết quả bằng mắt và công cụ accessibility.

## Expected result

- Không còn thẻ sản phẩm cũ.
- Empty state có icon/hình minh họa truy cập được và thông báo tiếng Việt thân thiện, phân biệt với trạng thái loading/lỗi.

## EC / Partition Covered

EC3 (không khớp) + OC6 (empty state đầy đủ)

## Status / Related bugs

Pass / None

