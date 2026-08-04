# TC-PLAS-BVA-006: Hiển thị giá ngay dưới ngưỡng phân cách hàng nghìn

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Boundary Value Analysis (3-Point + 2-Point BVA)

## Preconditions

- CSDL có đúng một fixture sản phẩm giá `999` ₫ trong tập đối chiếu.

## Test data

| Variable | Value | Point |
| --- | ---: | --- |
| price | 999 | B-1 |

## Test steps

1. Tải danh sách và tìm thẻ sản phẩm fixture.
2. Đối chiếu chuỗi giá hiển thị.

## Expected result

- Hiển thị `999 ₫`, không có dấu phân cách thừa và không dùng `VND`.

## BVA Coverage

Ngưỡng bắt đầu cần phân cách hàng nghìn B = 1000; điểm B-1 = 999. Điểm này tham gia cả bộ 3-Point (999/1000/1001) và cặp 2-Point (999/1000) cùng TC-PLAS-BVA-007.

## Status / Related bugs

Not Run / N/A
