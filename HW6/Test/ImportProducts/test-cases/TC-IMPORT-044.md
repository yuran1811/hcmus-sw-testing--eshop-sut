# TC-IMPORT-044: Xử lý xung đột trùng lặp SKU nội bộ và tính nguyên tử (Duplicate Key Conflict & Transaction Atomicity)

## Requirement ID
FR-16, NFR-DATA-02

## Module / Test type / Technique
Admin Product Import / Data Integrity & Conflict Handling / Equivalence Partitioning

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Cơ sở dữ liệu đã tồn tại sản phẩm với mã `SKU-100`
- Tài khoản Admin hợp lệ (`Admin Token`)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | Bearer <Admin_Token> |
| Header Content-Type | application/json |
| Header X-Student-Id | 23127148 |
| Body.products | Array gồm 3 dòng: Dòng 1 (SKU-101 hợp lệ), Dòng 2 (SKU-100 trùng DB), Dòng 3 (SKU-101 trùng Dòng 1) |

## Test steps
1. Gửi request `POST /api/admin/import-products` chứa batch 3 sản phẩm như mô tả trong Test data.
2. Kiểm tra mã trạng thái HTTP response và mảng lỗi `errors` trả về.
3. Kiểm tra cơ sở dữ liệu `products` để xác nhận tính nguyên tử (không thêm sản phẩm nào nếu Rollback toàn bộ, hoặc chỉ ghi nhận lỗi chính xác từng dòng).

## Expected result
- Trả về `422 Unprocessable Entity` (nếu Atomic Rollback) hoặc `200/207 Multi-Status` với danh sách lỗi chi tiết theo từng dòng (`errors: [{"row": 2, ...}, {"row": 3, ...}]`).
- Không làm sập database transaction (Unhandled SQLite Unique Constraint Exception).
- Không làm sai lệch dữ liệu sản phẩm `SKU-100` sẵn có.

## Status / Related bugs
Not Run / Data Consistency Testing (Bảo vệ tính toàn vẹn và nhất quán của cơ sở dữ liệu)
