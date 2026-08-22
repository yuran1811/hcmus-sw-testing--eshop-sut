# TC-FORGOT-021: Kiểm thử giá trị biên độ dài email tối thiểu theo chuẩn RFC (6 ký tự: a@b.co)

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
| Body.email | a@b.co |

## Test steps
1. Gửi HTTP POST request với email có độ dài tối thiểu hợp lệ `a@b.co`
2. Kiểm tra phản hồi server

## Expected result
Server xử lý chuỗi email biên hợp lệ, không gây lỗi crash, trả về 404 (do tài khoản chưa đăng ký).

## Status / Related bugs
Not Run / None
