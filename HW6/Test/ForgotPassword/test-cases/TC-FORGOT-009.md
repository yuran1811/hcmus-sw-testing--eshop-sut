# TC-FORGOT-009: Từ chối yêu cầu khi email thiếu phần tên người dùng (Missing Local-Part)

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
| Body.email | @eshop.com |

## Test steps
1. Gửi HTTP POST request với body `{"email": "@eshop.com"}`
2. Kiểm tra phản hồi từ server

## Expected result
Mã phản hồi HTTP 400 Bad Request (hoặc 404 trên SUT hiện tại).

## Status / Related bugs
Not Run / None
