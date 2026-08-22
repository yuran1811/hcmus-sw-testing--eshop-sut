# TC-CANCEL-023: ID đơn hàng không tồn tại - Giá trị số nguyên lớn (Negative EP)

## Requirement ID
FR-10

## Module / Test type / Technique
Order Cancel / Domain Partitioning / Equivalence Partitioning

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- ID `999999` không tồn tại trong database
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/999999/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 999999 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/999999/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response cùng JSON trả về

## Expected result
Mã trạng thái HTTP 404 Not Found. Response body chứa JSON: `{"error": "Order not found"}`.

## Status / Related bugs
Not Run / None
