# TC-CANCEL-007: Yêu cầu hủy đơn hàng thiếu Authorization Header (SEC-02)

## Requirement ID
SEC-02

## Module / Test type / Technique
Order Cancel / Security / Authentication Bypass

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Request không đính kèm header `Authorization`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1/cancel |
| Header Authorization | (Missing / Not provided) |
| Header X-Student-Id | 23127148 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1/cancel` mà không truyền header Authorization
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response cùng nội dung JSON trả về

## Expected result
Mã trạng thái HTTP 401 Unauthorized. Response body chứa JSON: `{"error": "Unauthorized"}`.

## Status / Related bugs
Not Run / None
