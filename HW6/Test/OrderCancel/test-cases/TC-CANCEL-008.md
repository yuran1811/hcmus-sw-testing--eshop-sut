# TC-CANCEL-008: Yêu cầu hủy đơn hàng với Bearer Token rỗng (SEC-02)

## Requirement ID
SEC-02

## Module / Test type / Technique
Order Cancel / Security / Authentication Bypass

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1/cancel |
| Header Authorization | Bearer |
| Header X-Student-Id | 23127148 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1/cancel` với header `Authorization: Bearer ` (không chứa chuỗi token)
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 401 Unauthorized hoặc 403 Forbidden.

## Status / Related bugs
Not Run / None
