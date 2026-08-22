# TC-FORGOT-020: Từ chối yêu cầu khi trường email truyền kiểu đối tượng lồng nhau (Nested Object)

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
| Body.email | {"address": "test@eshop.com"} |

## Test steps
1. Gửi HTTP POST request với body chứa nested object
2. Kiểm tra phản hồi server

## Expected result
Mã phản hồi HTTP 400 Bad Request (hoặc 404 trên SUT hiện tại).

## Status / Related bugs
Not Run / None
