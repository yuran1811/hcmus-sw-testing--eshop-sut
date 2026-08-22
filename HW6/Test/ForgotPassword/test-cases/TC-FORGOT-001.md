# TC-FORGOT-001: Yêu cầu mã đặt lại mật khẩu với email người dùng chuẩn hợp lệ (Happy Path)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Equivalence Partitioning

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng `test@eshop.com` đã tồn tại hợp lệ trong database
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Header X-Student-Id | 23127148 |
| Body.email | test@eshop.com |

## Test steps
1. Gửi HTTP POST request đến `/api/forgot-password` với email `test@eshop.com`
2. Đính kèm header `Content-Type: application/json` và `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response cùng nội dung JSON trả về

## Expected result
Mã trạng thái HTTP 200 OK. Response body chứa message 'Mã đặt lại mật khẩu đã được tạo' và resetToken dạng chuỗi không rỗng.

## Status / Related bugs
Not Run / None
