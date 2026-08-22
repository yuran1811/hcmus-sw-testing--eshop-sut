# TC-FORGOT-038: Kiểm thử hợp đồng dữ liệu: Kiểm định JSON Schema cho response lỗi 4xx

## Requirement ID
FR-03 / JSON Schema Draft-07

## Module / Test type / Technique
Forgot Password / Contract Testing / JSON Schema Validation

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | nonexistent_schema_check@eshop.com |

## Test steps
1. Gửi HTTP POST request với email không tồn tại
2. Kiểm tra cấu trúc phản hồi lỗi

## Expected result
Mã trạng thái HTTP 404 Not Found. Response body có thuộc tính `error` dạng chuỗi.

## Status / Related bugs
Not Run / None
