# TC-IMPORT-003: Xác thực API - Header Bearer Rỗng

## Requirement ID
FR-16 / SEC-02 (Broken Authentication)

## Module / Test type / Technique
Admin Product Import / Security / Token Format Validation

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | `Bearer ` *(Khoảng trắng không token)* |
| Header X-Student-Id | 23127148 |
| Body (JSON) | `{"products": [{"name": "Empty Bearer Product", "price": 10000}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với header `Authorization: Bearer `
2. Kiểm tra HTTP Status Code và Response Body

## Expected result
Mã trạng thái HTTP `401 Unauthorized` hoặc `403 Forbidden`. SUT từ chối xử lý request.

## Status / Related bugs
Not Run / None
