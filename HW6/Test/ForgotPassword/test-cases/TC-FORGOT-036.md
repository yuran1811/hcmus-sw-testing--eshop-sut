# TC-FORGOT-036: Cú pháp Schema: Kiểm thử payload JSON sai định dạng cú pháp (Malformed JSON)

## Requirement ID
RFC 8259

## Module / Test type / Technique
Forgot Password / Schema Validation / Syntax Error

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Malformed Body | {"email": "test@eshop.com",,,} |

## Test steps
1. Gửi HTTP POST request chứa JSON lỗi cú pháp
2. Kiểm tra cơ chế bắt lỗi cú pháp của middleware express.json()

## Expected result
Mã trạng thái HTTP 400 Bad Request do lỗi cú pháp JSON.

## Status / Related bugs
Not Run / None
