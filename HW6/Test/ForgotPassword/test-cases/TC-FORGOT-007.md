# TC-FORGOT-007: Từ chối yêu cầu khi email thiếu ký tự '@' (Missing @ Symbol)

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
| Body.email | testeshop.com |

## Test steps
1. Gửi HTTP POST request với chuỗi email sai cú pháp `testeshop.com`
2. Kiểm tra mã phản hồi HTTP

## Expected result
Hệ thống từ chối cú pháp không hợp lệ với mã trạng thái HTTP 400 Bad Request (hoặc 404 trên SUT hiện tại).

## Status / Related bugs
Not Run / None
