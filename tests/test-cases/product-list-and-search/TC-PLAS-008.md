# TC-PLAS-008: Đặc tả hóa chế độ tìm kiếm bằng một phần tên

## Requirement ID

FR-05 (Search match-mode specification gap)

## Module / Test type / Technique

Product List & Search / Characterization / Domain Testing (Equivalence Partitioning)

## Preconditions

- CSDL có `MacBook Pro M3`, `MacBook Air M2` và `Tai nghe AirPods Pro 2`.
- Người dùng đang ở trang chủ.

## Test data

| Field | Value |
| --- | --- |
| search | `MacBook` |

## Test steps

1. Nhập `MacBook` vào thanh tìm kiếm và gửi yêu cầu.
2. Đối chiếu danh sách kết quả với dữ liệu trong CSDL.

## Expected result

- FR-05 chưa chốt exact-match hay contains-match, nên ghi nhận policy thay vì tự coi nhánh còn lại là lỗi.
- Nếu contains-match: hiển thị cả hai sản phẩm MacBook và không hiển thị AirPods. Nếu exact-match: hiển thị empty state rõ ràng cho `MacBook` và hành vi phải nhất quán ở UI/API.
- Không nhầm sang sản phẩm không chứa từ khóa, không crash; mọi kết quả có ảnh/alt, tên, giá đúng và trang có một `<h1>`. Product Owner cần chốt match-mode vào SRS.

## EC / Partition Covered

EC21 (Specification gap: exact vs contains match) + EC7 + OC1/OC6 (conditional) + OC2 + OC4

## Status / Related bugs

Not Run / N/A
