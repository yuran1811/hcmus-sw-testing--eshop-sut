# TC-CANCEL-021: Thử nghiệm HTTP Method Tampering - Sử dụng POST thay vì PUT

## Requirement ID
SEC-03 / Protocol Conformance

## Module / Test type / Technique
Order Cancel / Security & Protocol / Method Tampering

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/orders/1/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |

## Test steps
1. Gửi HTTP POST request đến endpoint hủy đơn `/api/orders/1/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found (hoặc 405 Method Not Allowed). Không thực thi hành động hủy khi dùng sai HTTP method.

## Status / Related bugs
Not Run / None
