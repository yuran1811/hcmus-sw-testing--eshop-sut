# TC-PLAS-010: Tìm kiếm tên chứa ký tự dành riêng của URL

## Requirement ID

FR-05, SEC-04

## Module / Test type / Technique

Product List & Search / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- CSDL có sản phẩm `Cáp USB-C 100% & Sạc + Hub` và một sản phẩm không liên quan.

## Test data

| Field | Value |
| --- | --- |
| search | `Cáp USB-C 100% & Sạc + Hub` |

## Test steps

1. Nhập nguyên văn tên đầy đủ `Cáp USB-C 100% & Sạc + Hub` và bấm Tìm để cô lập encoding khỏi policy exact/contains.
2. Kiểm tra URL request trong Network và kết quả trả về.

## Expected result

- Giá trị được URL-encode đúng, không bị cắt tại `&` và không đổi dấu `+` thành khoảng trắng ngoài ý muốn.
- Hiển thị đúng sản phẩm phù hợp và hiển thị từ khóa dưới dạng plain text.

## EC / Partition Covered

EC4 (Unicode/ký tự đặc biệt) + EC13 (ký tự dành riêng URL) + OC3

## Status / Related bugs

Fail / BUG-PLAS-008
