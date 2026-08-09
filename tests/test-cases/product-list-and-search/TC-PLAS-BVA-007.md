# TC-PLAS-BVA-007: Hiển thị giá đúng tại ngưỡng một nghìn đồng

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Boundary Value Analysis (3-Point + 2-Point BVA)

## Preconditions

- CSDL có fixture sản phẩm giá `1000` ₫.

## Test data

| Variable | Value | Point |
| --- | ---: | --- |
| price | 1000 | B |

## Test steps

1. Tải danh sách và đối chiếu chuỗi giá của fixture.

## Expected result

- Hiển thị chính xác `1.000 ₫`, có một dấu phân cách hàng nghìn và không dùng `VND`.

## BVA Coverage

Ngưỡng phân cách hàng nghìn B = 1000; điểm B.

## Status / Related bugs

Pass / None

