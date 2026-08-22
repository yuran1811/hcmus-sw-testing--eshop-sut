# TC-IMPORT-007: Bảo mật - Stored XSS Payload trong Trường Tên Sản Phẩm (Name)

## Requirement ID
FR-16 / SEC-06 (Stored Cross-Site Scripting / XSS)

## Module / Test type / Technique
Admin Product Import / Security / Script Injection Testing

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
| Body (JSON) | `{"products": [{"name": "<script>alert('xss-name')</script>", "price": 50000, "category_id": 1}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` chứa XSS payload `<script>alert('xss-name')</script>` trong thuộc tính `name`
2. Kiểm tra HTTP Status Code và Response Body

## Expected result
Mã trạng thái HTTP `200 OK`. Hệ thống xử lý an toàn, chèn vào database mà không gây unhandled exception (500).

## Status / Related bugs
Not Run / None
