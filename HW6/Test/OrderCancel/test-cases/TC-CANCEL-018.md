# TC-CANCEL-018: Thử nghiệm SQL Injection - Time-Based Blind Injection (SEC-05)

## Requirement ID
SEC-05

## Module / Test type / Technique
Order Cancel / Security / Time-Based Blind SQL Injection

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1' AND (SELECT 1 FROM (SELECT(SLEEP(2)))a)--/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 1' AND (SELECT 1 FROM (SELECT(SLEEP(2)))a)-- |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/:id/cancel` với payload Sleep / Time-Delay
2. Đính kèm header `X-Student-Id: 23127148`
3. Đo lường thời gian phản hồi (Response Time) và mã trạng thái HTTP

## Expected result
Mã trạng thái HTTP 404 Not Found. Thời gian phản hồi tức thì (< 500ms), không bị treo trễ do hàm ngủ/sleep trong database.

## Status / Related bugs
Not Run / None
