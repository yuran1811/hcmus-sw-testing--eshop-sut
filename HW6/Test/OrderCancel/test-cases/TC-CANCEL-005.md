# TC-CANCEL-005: Hủy đơn hàng đã ở trạng thái Canceled (Double Cancel / Idempotency)

## Requirement ID
FR-10

## Module / Test type / Technique
Order Cancel / Functional / State Transition Testing (Idempotency)

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Đơn hàng đã được hủy trước đó và đang ở trạng thái `canceled`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/:id/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 5 (Status: canceled) |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/5/cancel` đối với đơn hàng đã có trạng thái `canceled`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response cùng nội dung JSON trả về

## Expected result
Mã trạng thái HTTP 400 Bad Request. Response body chứa JSON: `{"error": "Cannot cancel this order."}`.

## Status / Related bugs
Not Run / None
