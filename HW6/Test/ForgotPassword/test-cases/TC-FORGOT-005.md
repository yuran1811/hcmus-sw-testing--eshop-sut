# TC-FORGOT-005: Yêu cầu đặt lại mật khẩu với email có tên miền phụ nhiều cấp (Subdomain)

## Requirement ID
FR-03 / RFC 5322

## Module / Test type / Technique
Forgot Password / Functional / Equivalence Partitioning

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | user@mail.eshop.com |

## Test steps
1. Gửi HTTP POST request đến `/api/forgot-password` với email `user@mail.eshop.com`
2. Kiểm tra phản hồi của server

## Expected result
Server phân tích cú pháp email subdomain chuẩn xác, trả về 404 Not Found (User not found).

## Status / Related bugs
Not Run / None
