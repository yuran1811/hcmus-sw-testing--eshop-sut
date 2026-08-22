# TC-IMPORT-041: Thiếu tính nguyên tử trong giao dịch (Transaction Atomicity & Rollback Absence) khi import batch có lỗi giữa chừng

## Requirement ID
FR-16

## Module / Test type / Technique
Import Products / Data Integrity & Architecture / Transaction & Partial Failure

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản Admin có Bearer JWT hợp lệ
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | Bearer {{adminToken}} |
| Header X-Student-Id | 23127148 |
| Body.products | Mảng 3 sản phẩm: Item 1 hợp lệ, Item 2 thiếu `name`, Item 3 hợp lệ |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với payload mảng 3 phần tử (Item 1 hợp lệ, Item 2 vi phạm validation không có `name`, Item 3 hợp lệ)
2. Đính kèm header `X-Student-Id: 23127148` và `Authorization: Bearer {{adminToken}}`
3. Nhận response và kiểm tra các trường `inserted`, `errors`
4. Gửi `GET /api/products` để kiểm tra thực tế xem Item 1 và Item 3 có được lưu vào database không, xác định hệ thống hoạt động theo mô hình *Partial Success (Non-atomic)* hay *All-or-Nothing (Atomic Transaction)*

## Expected result
Hệ thống trả về HTTP 200 OK với `inserted: 2`, `errors` chứa lỗi `Hàng 3: Thiếu tên sản phẩm`. Qua GET `/api/products`, xác nhận Item 1 và Item 3 đã được lưu vào database mà không bị rollback toàn bộ batch (ghi nhận hành vi kiến trúc non-atomic của SUT).

## Status / Related bugs
Not Run / Architectural Characteristic (SUT sử dụng batch loop không có BEGIN TRANSACTION / ROLLBACK)
