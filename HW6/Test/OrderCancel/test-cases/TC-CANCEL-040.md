# TC-CANCEL-040: Kiểm tra tính bắt buộc và truy vết của Header X-Student-Id (Audit Compliance)

## Requirement ID
Academic Traceability / HW06 §6.1

## Module / Test type / Technique
Order Cancel / Audit & Traceability / Header Verification

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Mã số sinh viên thực hiện kiểm thử: `23127148`

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 1 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1/cancel` với header `X-Student-Id: 23127148`
2. Kiểm tra header được gửi đi trong request thông qua Pre-request script
3. Nhận phản hồi và ghi log kiểm toán

## Expected result
Header `X-Student-Id: 23127148` được gửi đi kèm mọi request trong test suite và được ghi nhận đầy đủ cho mục đích kiểm toán.

## Status / Related bugs
Pass (Audit Header verified)
