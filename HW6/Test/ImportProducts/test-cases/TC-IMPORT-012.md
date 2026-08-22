# TC-IMPORT-012: Bảo mật - SQL Injection Union trong Category ID

## Requirement ID
FR-16 / SEC-05 (SQL Injection Prevention)

## Module / Test type / Technique
Admin Product Import / Security / Union-Based SQL Injection

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
| Body (JSON) | `{"products": [{"name": "SQLi Union Product", "price": 10000, "category_id": "1 UNION SELECT 1,2,3,4,5"}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` chứa SQLi UNION payload trong `category_id`
2. Kiểm tra HTTP Status Code và Response Body

## Expected result
Hệ thống xử lý an toàn (200 OK), không bị rò rỉ dữ liệu hoặc gặp lỗi Database Error (500).

## Status / Related bugs
Not Run / None
