# TC-PLAS-018: Tên sản phẩm chứa HTML được hiển thị dưới dạng văn bản

## Requirement ID

FR-05, SEC-04

## Module / Test type / Technique

Product List & Search / Security / Domain Testing (Output Partitioning)

## Preconditions

- Bằng fixture quản trị, CSDL có sản phẩm tên `<img src=x onerror="window.__productXss=1">`.

## Test data

| Field | Value |
| --- | --- |
| search | rỗng |
| untrusted product name | `<img src=x onerror="window.__productXss=1">` |

## Test steps

1. Tải trang chủ và kiểm tra thẻ sản phẩm chứa fixture.
2. Kiểm tra DOM và `window.__productXss`.

## Expected result

- Tên hiển thị nguyên văn; không tạo thêm phần tử `img` và không chạy event handler.
- `window.__productXss` vẫn là `undefined`; cấu trúc lưới và một `<h1>` không bị phá vỡ.

## EC / Partition Covered

EC17 (dữ liệu sản phẩm không tin cậy) + OC9 (tên được escape)

## Status / Related bugs

Pass / None

