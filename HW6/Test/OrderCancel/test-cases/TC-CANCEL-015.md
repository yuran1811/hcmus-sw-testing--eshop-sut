# TC-CANCEL-015: Thử nghiệm SQL Injection - Boolean Tautology trên Path Parameter (SEC-05)

## Requirement ID
SEC-05

## Module / Test type / Technique
Order Cancel / Security / SQL Injection Testing

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng có Bearer Token hợp lệ
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1' OR '1'='1/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 1' OR '1'='1 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1%27%20OR%20%271%27=%271/cancel` chứa payload Boolean Tautology
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found (hoặc 400). Không xảy ra lỗi máy chủ nội bộ 500 Internal Server Error, không rò rỉ database error stack trace.

## Status / Related bugs
Pass (SUT sử dụng SQLite Parameterized Query)
