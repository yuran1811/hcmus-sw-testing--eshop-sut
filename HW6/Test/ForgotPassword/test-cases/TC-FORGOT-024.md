# TC-FORGOT-024: Xử lý khoảng trắng đầu và cuối chuỗi email (Whitespace Trimming)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Input Sanitization

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản `test@eshop.com` đã đăng ký

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email |   test@eshop.com   |

## Test steps
1. Gửi HTTP POST request với email có chứa khoảng trắng ở 2 đầu
2. Kiểm tra xem hệ thống có tự động cắt bỏ khoảng trắng (trim) để tìm user hay không

## Expected result
Nếu server có hàm trim: trả về 200 OK. Nếu không trim: trả về 404 Not Found.

## Status / Related bugs
Not Run / None
