# TC-FORGOT-037: Kiểm thử hợp đồng dữ liệu: Kiểm định JSON Schema nghiêm ngặt cho response 200 OK

## Requirement ID
FR-03 / JSON Schema Draft-07

## Module / Test type / Technique
Forgot Password / Contract Testing / JSON Schema Validation

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản `test@eshop.com` hợp lệ

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | test@eshop.com |

## Test steps
1. Gửi HTTP POST request với email hợp lệ
2. Kiểm tra kiểu dữ liệu của `message` (string) và `resetToken` (string) theo JSON Schema Draft-07

## Expected result
Mã trạng thái HTTP 200 OK. Response body khớp hoàn toàn với cấu trúc JSON Schema đã định nghĩa.

## Status / Related bugs
Not Run / None
