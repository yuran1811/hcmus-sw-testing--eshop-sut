# TC-PLAS-BVA-008: Hiển thị giá ngay trên ngưỡng phân cách hàng nghìn

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Boundary Value Analysis (3-Point BVA)

## Preconditions

- CSDL có fixture sản phẩm giá `1001` ₫.

## Test data

| Variable | Value | Point |
| --- | ---: | --- |
| price | 1001 | B+1 |

## Test steps

1. Tải danh sách và đối chiếu chuỗi giá của fixture.

## Expected result

- Hiển thị chính xác `1.001 ₫`, không làm tròn và không dùng `VND`.

## BVA Coverage

Ngưỡng phân cách hàng nghìn B = 1000; điểm B+1 = 1001.

## Status / Related bugs

Not Run / N/A

