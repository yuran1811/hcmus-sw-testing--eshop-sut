# TC-IMPORT-005: Xác thực API - Token JWT Hết Hạn (Expired JWT Token)

## Requirement ID
FR-16 / SEC-02 (Broken Authentication)

## Module / Test type / Technique
Admin Product Import / Security / Token Lifecycle Management

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Chuỗi JWT đã hết hạn (exp < current timestamp)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTAwMDAwMDAwLCJleHAiOjE1MDAwMDAwMDB9.invalid` |
| Header X-Student-Id | 23127148 |
| Body (JSON) | `{"products": [{"name": "Expired Token Product", "price": 10000}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với Bearer JWT đã hết hạn
2. Kiểm tra HTTP Status Code và Response Body

## Expected result
Mã trạng thái HTTP `403 Forbidden` (`{"error": "Forbidden"}`).

## Status / Related bugs
Not Run / None
