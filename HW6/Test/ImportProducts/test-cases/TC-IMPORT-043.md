# TC-IMPORT-043: Kiểm tra giới hạn tải trọng Payload và chống tràn bộ nhớ (Payload Size Limit & Chunking Validation)

## Requirement ID
FR-16, NFR-PERF-01

## Module / Test type / Technique
Admin Product Import / Stress & Volume Testing / Boundary Value Analysis

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản Admin hợp lệ (`Admin Token`)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | Bearer <Admin_Token> |
| Header Content-Type | application/json |
| Header X-Student-Id | 23127148 |
| Payload Size | Mảng JSON chứa 10.000 phần tử sản phẩm (~15MB) |

## Test steps
1. Khởi tạo mảng JSON chứa 10.000 sản phẩm với đầy đủ thông tin `sku`, `name`, `price`, `stock`.
2. Gửi HTTP POST request đến `/api/admin/import-products`.
3. Quan sát mã phản hồi HTTP, thời gian xử lý và mức sử dụng CPU/RAM của server SUT.

## Expected result
- Hệ thống chặn an toàn ngay tại tầng Validation / Payload Limit Middleware.
- Trả về mã HTTP `413 Payload Too Large` hoặc `400 Bad Request`.
- Response Body: `{"success": false, "message": "Số lượng sản phẩm vượt quá giới hạn tối đa (Tối đa: 1,000 sản phẩm/lần).", "errorCode": "ERR_BATCH_SIZE_EXCEEDED"}`.
- Tiến trình Node.js không bị treo hoặc sập do cạn kiệt bộ nhớ (`Out of Memory Crash`).

## Status / Related bugs
Not Run / Infrastructure & Stability Testing (Bảo vệ hệ thống trước tấn công từ chối dịch vụ DoS/OOM)
