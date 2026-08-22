# TC-IMPORT-010: Bảo mật - SQL Injection Boolean Tautology trong Name

## Requirement ID
FR-16 / SEC-05 (SQL Injection Prevention)

## Module / Test type / Technique
Admin Product Import / Security / SQL Injection Testing

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Đã đăng nhập bằng tài khoản admin và có `adminToken` hợp lệ
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | Bearer {{adminToken}} |
| Header X-Student-Id | 23127148 |
| Body (JSON) | `{"products": [{"name": "SP SQLi' OR '1'='1", "price": 10000}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` chứa SQLi boolean tautology payload trong `name`
2. Kiểm tra HTTP Status Code và Response Body

## Expected result
Mã trạng thái HTTP `200 OK` (`inserted: 1`). SQLite parameterized statement bảo vệ hệ thống, chèn chuỗi ký tự an toàn mà không làm lỗi cú pháp SQL.

## Status / Related bugs
Not Run / None
