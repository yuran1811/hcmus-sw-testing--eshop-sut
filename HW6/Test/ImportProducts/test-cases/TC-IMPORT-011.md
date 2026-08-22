# TC-IMPORT-011: Bảo mật - SQL Injection Stacked DROP TABLE trong Description

## Requirement ID
FR-16 / SEC-05 (SQL Injection Prevention)

## Module / Test type / Technique
Admin Product Import / Security / Destructive SQL Injection

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
| Body (JSON) | `{"products": [{"name": "SQLi DROP Test", "price": 10000, "description": "Desc'; DROP TABLE products;--"}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` chứa stacked query payload trong `description`
2. Kiểm tra HTTP Status Code và Response Body
3. Kiểm tra tính toàn vẹn của bảng products

## Expected result
Mã trạng thái HTTP `200 OK`. Tham số hóa câu lệnh SQL ngăn chặn việc thực thi chuỗi lệnh `DROP TABLE`. Dữ liệu bảng products được bảo toàn.

## Status / Related bugs
Not Run / None
