# TC-CANCEL-024: ID đơn hàng kiểu chuỗi ký tự chữ cái (Negative Type Partition)

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
| Endpoint | PUT /api/orders/abc/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | abc |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/abc/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found (hoặc 400 Bad Request). Response body chứa `{"error": "Order not found"}`.

## Status / Related bugs
Not Run / None
