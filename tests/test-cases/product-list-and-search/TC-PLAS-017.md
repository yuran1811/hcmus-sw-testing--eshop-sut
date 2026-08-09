# TC-PLAS-017: Giá mọi sản phẩm dùng phân cách hàng nghìn và ký hiệu đồng

## Requirement ID

FR-05, FR-21

## Module / Test type / Technique

Product List & Search / UI-Functional / Domain Testing (Output Partitioning)

## Preconditions

- CSDL có sản phẩm giá `999`, `1000`, `150000` và `45000000`.

## Test data

| Price | Expected display |
| ---: | --- |
| 999 | `999 ₫` |
| 1000 | `1.000 ₫` |
| 150000 | `150.000 ₫` |
| 45000000 | `45.000.000 ₫` |

## Test steps

1. Tải danh sách sản phẩm.
2. Đối chiếu giá hiển thị của từng sản phẩm với bảng test data.

## Expected result

- Tất cả giá dùng dấu phân cách hàng nghìn nhất quán và đúng ký hiệu `₫`, không dùng `VND`.
- Không thay đổi giá trị số khi định dạng.

## EC / Partition Covered

EC19 (giá dưới 1000) + EC20 (giá tại/trên 1000) + OC2 (định dạng giá) + OC8 (nhất quán đơn vị tiền)

## Status / Related bugs

Pass / None
