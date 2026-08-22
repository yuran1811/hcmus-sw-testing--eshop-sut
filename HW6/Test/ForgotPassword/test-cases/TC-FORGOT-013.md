# TC-FORGOT-013: Từ chối yêu cầu khi tên miền chứa ký tự đặc biệt không hợp lệ (Special Char in Domain)

## Requirement ID
FR-03 / RFC 5322

## Module / Test type / Technique
Forgot Password / Negative Validation / Equivalence Partitioning

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | test@es#hop.com |

## Test steps
1. Gửi HTTP POST request với email chứa ký tự `#` trong domain
2. Kiểm tra phản hồi của server

## Expected result
Mã phản hồi HTTP 400 Bad Request (hoặc 404 trên SUT hiện tại).

## Status / Related bugs
Not Run / None
