# TC-IMPORT-009: Bảo mật - Malicious URI Pseudo-protocol trong Trường ImageUrl

## Requirement ID
FR-16 / SEC-06 (Stored XSS / Malicious URI)

## Module / Test type / Technique
Admin Product Import / Security / Protocol Scheme Injection

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
| Body (JSON) | `{"products": [{"name": "JS URI Product", "price": 50000, "imageUrl": "javascript:alert(document.cookie)"}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` chứa `javascript:` scheme trong `imageUrl`
2. Kiểm tra HTTP Status Code và Response Body

## Expected result
Mã trạng thái HTTP `200 OK`. Hệ thống lưu trữ an toàn mà không làm lỗi backend.

## Status / Related bugs
Not Run / None
