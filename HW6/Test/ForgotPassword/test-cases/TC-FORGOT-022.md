# TC-FORGOT-022: Kiểm thử giá trị biên độ dài email tối đa theo RFC 5321 (254 ký tự)

## Requirement ID
FR-03 / RFC 5321

## Module / Test type / Technique
Forgot Password / Boundary Analysis / Boundary Value Analysis

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.com |

## Test steps
1. Gửi HTTP POST request với email có độ dài xấp xỉ 250 ký tự
2. Kiểm tra phản hồi server

## Expected result
Server xử lý chuỗi dài an toàn, không bị tràn bộ đệm hay lỗi 500, trả về 404.

## Status / Related bugs
Not Run / None
