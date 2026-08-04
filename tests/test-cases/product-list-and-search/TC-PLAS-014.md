# TC-PLAS-014: Lỗi API được xử lý bằng trạng thái lỗi an toàn

## Requirement ID

FR-05, FR-21, SEC-04

## Module / Test type / Technique

Product List & Search / Reliability / Domain Testing (Equivalence Partitioning)

## Preconditions

- Có thể mô phỏng `GET /api/products` trả `500` hoặc ngắt kết nối.

## Test data

| Field | Value |
| --- | --- |
| API state | HTTP 500 / network failure |

## Test steps

1. Mô phỏng lỗi API rồi tải trang chủ.
2. Quan sát trạng thái loading, thông báo lỗi và DOM.

## Expected result

- Loading kết thúc; hiển thị thông báo lỗi thân thiện bằng tiếng Việt. Nút/thao tác thử lại là enhancement nên ghi nhận nếu có, không dùng làm oracle bắt buộc của FR-05.
- Không render raw HTML/stack trace từ server; trang không crash và vẫn chỉ có một `<h1>`.

## EC / Partition Covered

EC16 (API lỗi) + OC4 + OC5 (error state an toàn)

## Status / Related bugs

Not Run / N/A
