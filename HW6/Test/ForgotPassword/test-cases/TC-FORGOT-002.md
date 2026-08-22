# TC-FORGOT-002: Yêu cầu mã đặt lại mật khẩu với email quản trị viên (Admin Account)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Equivalence Partitioning

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản quản trị viên `admin@eshop.com` đã tồn tại trong database
- Header `X-Student-Id: 23127148` được cấu hình

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Header X-Student-Id | 23127148 |
| Body.email | admin@eshop.com |

## Test steps
1. Gửi HTTP POST request đến `/api/forgot-password` với body `{"email": "admin@eshop.com"}`
2. Kiểm tra mã trạng thái và schema của phản hồi

## Expected result
Mã trạng thái HTTP 200 OK. Phản hồi chứa message 'Mã đặt lại mật khẩu đã được tạo' và resetToken hợp lệ.

## Status / Related bugs
Not Run / None
