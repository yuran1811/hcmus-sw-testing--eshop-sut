# TC-FORGOT-004: Yêu cầu đặt lại mật khẩu với email có dấu chấm ở phần tên (Dot in Local-Part)

## Requirement ID
FR-03 / RFC 5322

## Module / Test type / Technique
Forgot Password / Functional / Equivalence Partitioning

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Email `test.user@eshop.com` chưa đăng ký trong hệ thống

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | test.user@eshop.com |

## Test steps
1. Gửi HTTP POST request đến `/api/forgot-password` với email chứa dấu chấm `test.user@eshop.com`
2. Kiểm tra mã trạng thái HTTP response

## Expected result
Hệ thống xử lý cú pháp hợp lệ; trả về 404 Not Found do tài khoản chưa tồn tại.

## Status / Related bugs
Not Run / None
