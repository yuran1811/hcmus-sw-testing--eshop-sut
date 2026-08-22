# TC-FORGOT-018: Từ chối yêu cầu khi trường email truyền kiểu boolean (Boolean Type)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Negative Validation / Type Validation

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | true |

## Test steps
1. Gửi HTTP POST request với body `{"email": true}`
2. Kiểm tra phản hồi server

## Expected result
Mã phản hồi HTTP 400 Bad Request (hoặc 404 trên SUT hiện tại).

## Status / Related bugs
Not Run / None
