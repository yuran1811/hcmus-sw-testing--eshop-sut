# TC-CANCEL-034: ID đơn hàng chứa chuỗi Path Traversal (Boundary & Security)

## Requirement ID
FR-10 / SEC-05

## Module / Test type / Technique
Order Cancel / Boundary Analysis / Path Traversal

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/../../orders/1/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | ../../orders/1 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/..%2F..%2Forders%2F1/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found. Không xảy ra hành vi Directory / Path Traversal hay rò rỉ file hệ thống.

## Status / Related bugs
Not Run / None
