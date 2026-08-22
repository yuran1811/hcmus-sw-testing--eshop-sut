# TC-IMPORT-006: Xác thực API - Chữ Ký Token Bị Giả Mạo (Tampered Signature)

## Requirement ID
FR-16 / SEC-02 (Broken Authentication)

## Module / Test type / Technique
Admin Product Import / Security / Cryptographic Signature Verification

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Token JWT được ký bằng secret key không chính xác
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | `Bearer <jwt_signed_with_wrong_secret>` |
| Header X-Student-Id | 23127148 |
| Body (JSON) | `{"products": [{"name": "Tampered Signature Product", "price": 10000}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với Bearer JWT có chữ ký sai
2. Kiểm tra HTTP Status Code và Response Body

## Expected result
Mã trạng thái HTTP `403 Forbidden` (`{"error": "Forbidden"}`).

## Status / Related bugs
Not Run / None
