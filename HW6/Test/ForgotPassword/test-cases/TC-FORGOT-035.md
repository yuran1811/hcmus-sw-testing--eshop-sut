# TC-FORGOT-035: Giao thức: Kiểm thử can thiệp Content-Type dạng text/plain

## Requirement ID
SEC-01 / RFC 7231

## Module / Test type / Technique
Forgot Password / Protocol Testing / Content-Type Tampering

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | text/plain |
| Raw Body | {"email":"test@eshop.com"} |

## Test steps
1. Gửi HTTP POST request với header `text/plain`
2. Kiểm tra phản hồi của server

## Expected result
Server từ chối phân tích cú pháp JSON không có header hợp lệ, trả về mã lỗi an toàn.

## Status / Related bugs
Not Run / None
