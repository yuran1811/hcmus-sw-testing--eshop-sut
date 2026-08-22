# TC-CANCEL-026: ID đơn hàng kiểu số thập phân / số thực (Negative Type Partition)

## Requirement ID
FR-10

## Module / Test type / Technique
Order Cancel / Domain Partitioning / Type Violation

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1.5/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 1.5 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1.5/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found (hoặc 400 Bad Request). Response body chứa `{"error": "Order not found"}`.

## Status / Related bugs
Not Run / None
