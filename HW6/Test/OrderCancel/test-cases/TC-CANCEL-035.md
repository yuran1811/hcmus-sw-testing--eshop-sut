# TC-CANCEL-035: ID đơn hàng chứa ký tự Null Byte Poisoning (Boundary & Sanitization)

## Requirement ID
FR-10 / SEC-05

## Module / Test type / Technique
Order Cancel / Boundary Analysis / Null Byte Poisoning

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1%00cancel/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 1%00cancel |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1%00cancel/cancel` chứa mã Null Byte `%00`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found (hoặc 400). Null byte bị vô hiệu hóa an toàn, không gây crash hoặc truncate chuỗi.

## Status / Related bugs
Not Run / None
