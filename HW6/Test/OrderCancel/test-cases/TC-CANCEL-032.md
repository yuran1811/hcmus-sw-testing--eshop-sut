# TC-CANCEL-032: ID đơn hàng giá trị cực đại 32-bit Integer (Boundary Value Analysis)

## Requirement ID
FR-10

## Module / Test type / Technique
Order Cancel / Boundary Analysis / Integer Max Limit

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/2147483647/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 2147483647 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/2147483647/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found. Response body chứa `{"error": "Order not found"}`.

## Status / Related bugs
Not Run / None
