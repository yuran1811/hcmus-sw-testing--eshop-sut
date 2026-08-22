# TC-FORGOT-017: Từ chối yêu cầu khi trường email truyền kiểu số nguyên (Integer Type)

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
| Body.email | 123456 |

## Test steps
1. Gửi HTTP POST request với body `{"email": 123456}`
2. Kiểm tra mã trạng thái phản hồi

## Expected result
Mã phản hồi HTTP 400 Bad Request (hoặc 404 trên SUT hiện tại), từ chối kiểu dữ liệu không phải string.

## Status / Related bugs
Not Run / None
