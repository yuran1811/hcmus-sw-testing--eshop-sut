# TC-CANCEL-039: Kiểm tra định dạng HTTP Response Headers (Contract & Protocol)

## Requirement ID
FR-10 / Protocol Conformance

## Module / Test type / Technique
Order Cancel / Contract Testing / Response Header Conformance

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 1 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Kiểm tra các header trả về trong HTTP Response

## Expected result
Header `Content-Type` tồn tại và chứa `application/json; charset=utf-8`.

## Status / Related bugs
Not Run / None
