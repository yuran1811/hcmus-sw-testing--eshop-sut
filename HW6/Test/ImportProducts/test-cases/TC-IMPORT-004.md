# TC-IMPORT-004: Xác thực API - Chuỗi JWT Sai Định Dạng (Malformed JWT)

## Requirement ID
FR-16 / SEC-02 (Broken Authentication)

## Module / Test type / Technique
Admin Product Import / Security / Token Integrity Verification

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | `Bearer invalid.malformed.jwttokenstring` |
| Header X-Student-Id | 23127148 |
| Body (JSON) | `{"products": [{"name": "Malformed Token Product", "price": 10000}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với Bearer JWT sai định dạng
2. Kiểm tra HTTP Status Code và Response Body

## Expected result
Mã trạng thái HTTP `403 Forbidden` (`{"error": "Forbidden"}`).

## Status / Related bugs
Not Run / None
