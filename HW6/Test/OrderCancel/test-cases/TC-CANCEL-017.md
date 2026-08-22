# TC-CANCEL-017: Thử nghiệm SQL Injection - Union-Based Injection (SEC-05)

## Requirement ID
SEC-05

## Module / Test type / Technique
Order Cancel / Security / Union-Based SQL Injection

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng có Bearer Token hợp lệ
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1 UNION SELECT 1,2,3,4--/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 1 UNION SELECT 1,2,3,4-- |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1%20UNION%20SELECT%201,2,3,4--/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found. Không xảy ra lỗi 500 hay rò rỉ dữ liệu qua UNION query.

## Status / Related bugs
Not Run / None
