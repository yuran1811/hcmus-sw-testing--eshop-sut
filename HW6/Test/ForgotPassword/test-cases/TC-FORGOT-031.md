# TC-FORGOT-031: Bảo mật (SEC-05): Kiểm thử SQL Injection phá hoại cấu trúc bảng (Stacked Query DROP)

## Requirement ID
SEC-05 / CWE-89

## Module / Test type / Technique
Forgot Password / Security / Injection Testing

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | admin@eshop.com'; DROP TABLE users;-- |

## Test steps
1. Gửi HTTP POST request với payload phá hoại bảng `users`
2. Kiểm tra phản hồi và tính toàn vẹn của database

## Expected result
Server xử lý an toàn không thực thi lệnh phụ, database được bảo vệ, trả về 404.

## Status / Related bugs
Not Run / None
