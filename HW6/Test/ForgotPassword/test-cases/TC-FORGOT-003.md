# TC-FORGOT-003: Yêu cầu đặt lại mật khẩu với email có gắn thẻ phụ (RFC 5233 Plus Addressing)

## Requirement ID
FR-03 / RFC 5233

## Module / Test type / Technique
Forgot Password / Functional / Equivalence Partitioning

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Email `test+reset@eshop.com` chưa được đăng ký trong hệ thống

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | test+reset@eshop.com |

## Test steps
1. Gửi HTTP POST request đến `/api/forgot-password` với email `test+reset@eshop.com`
2. Kiểm tra mã trạng thái HTTP response

## Expected result
Hệ thống xử lý định dạng email hợp lệ theo chuẩn RFC 5233; trả về 404 Not Found (User not found) do email chưa có trong DB.

## Status / Related bugs
Not Run / None
