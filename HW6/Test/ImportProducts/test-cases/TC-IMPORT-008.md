# TC-IMPORT-008: Bảo mật - Stored XSS Payload trong Trường Mô Tả (Description)

## Requirement ID
FR-16 / SEC-06 (Stored Cross-Site Scripting / XSS)

## Module / Test type / Technique
Admin Product Import / Security / HTML Event Handler Injection

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
| Body (JSON) | `{"products": [{"name": "XSS Description Product", "price": 50000, "description": "<img src=x onerror=alert('xss-desc')>"}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` chứa HTML event handler payload trong `description`
2. Kiểm tra HTTP Status Code và Response Body

## Expected result
Mã trạng thái HTTP `200 OK`. Hệ thống lưu trữ an toàn mà không làm lỗi backend.

## Status / Related bugs
Not Run / None
