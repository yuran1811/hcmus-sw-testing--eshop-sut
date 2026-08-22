# TC-IMPORT-002: Xác thực API - Thiếu Header Authorization (Authentication Bypass)

## Requirement ID
FR-16 / SEC-02 (Authentication Bypass)

## Module / Test type / Technique
Admin Product Import / Security / Missing Authentication

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | *(Không gửi header Authorization)* |
| Header X-Student-Id | 23127148 |
| Body (JSON) | `{"products": [{"name": "No Auth Product", "price": 10000}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` mà không đính kèm header `Authorization`
2. Đính kèm header `X-Student-Id: 23127148`
3. Kiểm tra HTTP Status Code và Response Body

## Expected result
Mã trạng thái HTTP `401 Unauthorized`. Body trả về JSON `{"error": "Unauthorized"}`.

## Status / Related bugs
Not Run / None
