# TC-CANCEL-033: ID đơn hàng có chiều dài cực lớn >1000 ký tự (Buffer & Stress Boundary)

## Requirement ID
FR-10 / Reliability

## Module / Test type / Technique
Order Cancel / Boundary Analysis / Buffer Limit

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/{{longId1000Chars}}/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | Chuỗi 1,000 ký tự số "9" |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/:id/cancel` với ID chứa chuỗi 1,000 ký tự số
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found hoặc 414 URI Too Long. Server xử lý ổn định, không bị crash.

## Status / Related bugs
Not Run / None
