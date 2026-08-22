# TC-IMPORT-038: Giao Thức HTTP - Thao Túng Phương Thức (HTTP Method Tampering)

## Requirement ID
FR-16 / Protocol Conformance (RFC 7231)

## Module / Test type / Technique
Admin Product Import / Protocol / Method Tampering

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Đã đăng nhập bằng tài khoản admin và có `adminToken` hợp lệ
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint 1 | GET /api/admin/import-products |
| Endpoint 2 | PUT /api/admin/import-products |
| Header Authorization | Bearer {{adminToken}} |
| Header X-Student-Id | 23127148 |

## Test steps
1. Gửi HTTP GET request đến `/api/admin/import-products`
2. Gửi HTTP PUT request đến `/api/admin/import-products`
3. Kiểm tra mã trạng thái trả về cho cả 2 requests

## Expected result
Mã trạng thái HTTP `404 Not Found` (hoặc `405 Method Not Allowed`). Endpoint chỉ chấp nhận phương thức `POST`.

## Status / Related bugs
Not Run / None
