# TC-FORGOT-014: Từ chối yêu cầu khi trường email là chuỗi rỗng (Empty String)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Negative Validation / Boundary Value Analysis

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email |  |

## Test steps
1. Gửi HTTP POST request với body `{"email": ""}`
2. Kiểm tra phản hồi của server

## Expected result
Mã phản hồi HTTP 400 Bad Request (hoặc 404 trên SUT hiện tại), thông báo email bắt buộc.

## Status / Related bugs
Not Run / None
