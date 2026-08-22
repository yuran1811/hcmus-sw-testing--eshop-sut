# TC-FORGOT-015: Từ chối yêu cầu khi trường email có giá trị null (Explicit Null)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Negative Validation / Equivalence Partitioning

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | null |

## Test steps
1. Gửi HTTP POST request với body `{"email": null}`
2. Kiểm tra mã trạng thái trả về

## Expected result
Mã phản hồi HTTP 400 Bad Request (hoặc 404 trên SUT hiện tại).

## Status / Related bugs
Not Run / None
