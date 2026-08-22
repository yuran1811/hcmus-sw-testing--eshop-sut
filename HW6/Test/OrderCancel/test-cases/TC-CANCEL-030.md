# TC-CANCEL-030: ID đơn hàng chứa ký tự đặc biệt và ký hiệu (Domain Partitioning)

## Requirement ID
FR-10

## Module / Test type / Technique
Order Cancel / Domain Partitioning / Character Set & URL Sanitization

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/!@#$%^&*()/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | !@#$%^&*() |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/%21%40%23%24%25%5E%26%2A%28%29/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found. Response body chứa JSON: `{"error": "Order not found"}`.

## Status / Related bugs
Not Run / None
