# TC-PLAS-011: Từ khóa XSS dạng thẻ ảnh có event handler được hiển thị an toàn

## Requirement ID

FR-05, SEC-04

## Module / Test type / Technique

Product List & Search / Security / Domain Testing (Equivalence Partitioning)

## Preconditions

- Trình duyệt cho phép quan sát Console và DOM; biến `window.__xss` chưa tồn tại.

## Test data

| Field | Value |
| --- | --- |
| search | `<img src=x onerror="window.__xss=1">` |

## Test steps

1. Nhập payload, gửi tìm kiếm và chờ kết quả.
2. Kiểm tra DOM, Console và giá trị `window.__xss`.

## Expected result

- Không tạo/thực thi thẻ `img`; `window.__xss` vẫn là `undefined`.
- Payload chỉ xuất hiện như văn bản, không phát sinh popup hay lỗi script; empty state phù hợp được hiển thị.

## EC / Partition Covered

EC5 (HTML/XSS event-handler payload) + OC3 (render an toàn)

## Status / Related bugs

Not Run / N/A

