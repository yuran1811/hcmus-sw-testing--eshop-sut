# TC-CANCEL-029: ID đơn hàng số nguyên âm cực lớn -999999999 (Boundary Value Analysis)

## Requirement ID
FR-10

## Module / Test type / Technique
Order Cancel / Domain Partitioning / Boundary Value Analysis

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/-999999999/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | -999999999 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/-999999999/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found. Response body chứa JSON: `{"error": "Order not found"}`.

## Status / Related bugs
Not Run / None
