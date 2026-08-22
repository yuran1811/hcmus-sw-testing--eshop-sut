# TC-FORGOT-025: Kiểm thử xử lý ký tự tiếng Việt có dấu trong email (Unicode / Diacritics)

## Requirement ID
FR-03 / RFC 6530

## Module / Test type / Technique
Forgot Password / Functional / Internationalization

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | nguyễn.văn.a@eshop.vn |

## Test steps
1. Gửi HTTP POST request với email tiếng Việt có dấu
2. Kiểm tra khả năng tương thích UTF-8 của server

## Expected result
Server xử lý chuỗi UTF-8 an toàn không bị lỗi mã hóa, trả về 404 hoặc 400.

## Status / Related bugs
Not Run / None
