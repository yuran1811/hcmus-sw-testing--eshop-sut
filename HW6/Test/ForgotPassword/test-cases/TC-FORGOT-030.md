# TC-FORGOT-030: Bảo mật (SEC-05): Kiểm thử SQL Injection với payload hằng đúng (Boolean Tautology)

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
| Body.email | test@eshop.com' OR '1'='1 |

## Test steps
1. Gửi HTTP POST request với payload SQL Injection `' OR '1'='1`
2. Kiểm tra server có sử dụng Prepared Statement để ngăn chặn tấn công hay không

## Expected result
Server sử dụng Parameterized Query an toàn, không bị chèn mã SQL, không bị lỗi 500, trả về 404.

## Status / Related bugs
Not Run / None
