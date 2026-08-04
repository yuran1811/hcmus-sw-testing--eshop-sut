# TC-PLAS-BVA-010: Tìm kiếm với 254 ký tự ngay dưới biên tham chiếu

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Robustness / 3-Point Reference Analysis (`R = 255`)

## Preconditions

- CSDL có sản phẩm; test harness tạo được chuỗi chính xác 254 ký tự.

## Test data

| Variable | Value | Point |
| --- | ---: | --- |
| search length | 254 | B-1 |

## Test steps

1. Nhập chuỗi `A` lặp 254 lần và gửi tìm kiếm.
2. Kiểm tra độ dài query thực tế, response và giao diện.

## Expected result

- Hệ thống nhận/xử lý an toàn toàn bộ chuỗi, không HTTP 500 hoặc crash; hiển thị empty state phù hợp.
- Đây là biên độ bền tham chiếu quanh 255, không phải giới hạn tối đa được FR-05 quy định.

## BVA Coverage

Mốc tham chiếu độ bền `R = 255`; điểm `R-1 = 254`, hoàn chỉnh bộ robustness `254–255–256`. Đây không phải biên SRS.

## Status / Related bugs

Not Run / N/A
