# TC-PLAS-012: Từ khóa chứa dấu nháy đơn không phá vỡ truy vấn

## Requirement ID

FR-05, SEC-05

## Module / Test type / Technique

Product List & Search / Security / Domain Testing + Code Review

## Preconditions

- CSDL có sản phẩm `O'Reilly Keyboard`.

## Test data

| Field | Value |
| --- | --- |
| search | `O'Reilly Keyboard` |

## Test steps

1. Tìm kiếm bằng tên đầy đủ `O'Reilly Keyboard` có dấu nháy đơn để cô lập SQL safety khỏi policy exact/contains.
2. Kiểm tra response API và giao diện.
3. Review handler `GET /api/products` và xác nhận giá trị search được truyền qua placeholder/binding của driver, không nối trực tiếp vào SQL.

## Expected result

- Request không gây lỗi SQL/HTTP 500 và không lộ câu truy vấn hay chi tiết CSDL.
- Hệ thống dùng truy vấn tham số hóa và trả đúng sản phẩm `O'Reilly Keyboard`.

## EC / Partition Covered

EC14 (siêu ký tự SQL hợp lệ trong tên) + OC5 (xử lý lỗi/dữ liệu an toàn)

## Status / Related bugs

Not Run / N/A
