# TC-CANCEL-031: ID đơn hàng giá trị cực đại 64-bit Integer (Boundary Value Analysis)

## Requirement ID
FR-10

## Module / Test type / Technique
Order Cancel / Boundary Analysis / Integer Overflow Limit

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/9223372036854775807/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 9223372036854775807 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/9223372036854775807/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found. Hệ thống xử lý số nguyên 64-bit an toàn, không bị tràn số bộ nhớ hay phát sinh lỗi 500.

## Status / Related bugs
Not Run / None
