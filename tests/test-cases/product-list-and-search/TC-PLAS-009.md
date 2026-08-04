# TC-PLAS-009: Đặc tả hóa chính sách phân biệt chữ hoa chữ thường

## Requirement ID

FR-05 (Search case-sensitivity specification gap)

## Module / Test type / Technique

Product List & Search / Characterization / Domain Testing (Equivalence Partitioning)

## Preconditions

- CSDL có sản phẩm `MacBook Pro M3`.

## Test data

| Field | Value |
| --- | --- |
| search | `macbook pro m3` |

## Test steps

1. Truy cập trang chủ, nhập từ khóa bằng chữ thường và bấm Tìm.
2. Quan sát kết quả và phần hiển thị từ khóa.

## Expected result

- FR-05 chưa chốt case-sensitive hay case-insensitive. Ghi nhận policy của UI/API và yêu cầu áp dụng nhất quán; không tự gán bug chỉ vì chọn một trong hai.
- Nếu case-insensitive: tìm thấy `MacBook Pro M3`. Nếu case-sensitive: hiển thị empty state rõ ràng cho chuỗi chữ thường.
- Không làm thay đổi từ khóa đã nhập, không trả kết quả không liên quan; kết quả (nếu có) vẫn đủ ảnh/alt, tên, giá và một `<h1>`. Product Owner cần bổ sung case policy vào SRS.

## EC / Partition Covered

EC12 (Specification gap: case variation) + OC1/OC6 (result hoặc empty state theo policy) + OC2 + OC4

## Status / Related bugs

Not Run / N/A
