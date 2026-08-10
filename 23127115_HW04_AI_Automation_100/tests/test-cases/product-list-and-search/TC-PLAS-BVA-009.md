# TC-PLAS-BVA-009: Hiển thị lưới khi có hai sản phẩm

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Boundary Value Analysis (Near-boundary extension)

## Preconditions

- Fixture CSDL chỉ có đúng hai sản phẩm hợp lệ.

## Test data

| Variable | Value | Point |
| --- | ---: | --- |
| Product Count | 2 | B+2 quanh min 0 |

## Test steps

1. Mở trang chủ với search rỗng.
2. Đếm thẻ sản phẩm và kiểm tra cấu trúc grid.

## Expected result

- Hiển thị đúng hai thẻ riêng biệt, đủ ảnh/alt, tên, giá; không hiển thị empty state.
- Grid không vỡ và trang có đúng một `<h1>`.

## BVA Coverage

Điểm mở rộng B+2 = 2 để kiểm tra chuyển từ single-card sang multi-card grid quanh giá trị nhỏ nhất tự nhiên 0. Đây là near-boundary extension; bộ 3-point chuẩn tại min vẫn là B-1/B/B+1.

## Status / Related bugs

Pass / None
