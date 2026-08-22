# TC-FORGOT-034: Giao thức: Kiểm thử can thiệp Content-Type dạng application/x-www-form-urlencoded

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
| Header Content-Type | application/x-www-form-urlencoded |
| Raw Body | email=test%40eshop.com |

## Test steps
1. Gửi HTTP POST request với header `application/x-www-form-urlencoded`
2. Kiểm tra phản hồi của server khi nhận sai định dạng Content-Type

## Expected result
Server trả về mã lỗi thích hợp (400, 404 hoặc 415 Unsupported Media Type), không bị lỗi 500.

## Status / Related bugs
Not Run / None
