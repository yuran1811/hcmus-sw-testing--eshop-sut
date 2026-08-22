# TC-FORGOT-032: Bảo mật (SEC-06): Kiểm thử chèn mã kịch bản độc hại Cross-Site Scripting (XSS)

## Requirement ID
SEC-06 / CWE-79

## Module / Test type / Technique
Forgot Password / Security / Injection Testing

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | <script>alert('xss')</script>@eshop.com |

## Test steps
1. Gửi HTTP POST request chứa thẻ `<script>` trong email
2. Kiểm tra server xử lý an toàn không bị phản chiếu script

## Expected result
Server xử lý an toàn, không có lỗ hổng thực thi script, trả về 404.

## Status / Related bugs
Not Run / None
