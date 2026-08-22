# TC-CANCEL-011: Yêu cầu hủy đơn hàng với JWT Token có chữ ký không hợp lệ (SEC-02)

## Requirement ID
SEC-02

## Module / Test type / Technique
Order Cancel / Security / Token Integrity Testing

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- JWT Token được ký bằng secret key giả mạo / khác với `SECRET_KEY` của hệ thống
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1/cancel |
| Header Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIifQ.tampered_signature |
| Header X-Student-Id | 23127148 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1/cancel` với JWT mang chữ ký sai
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 403 Forbidden. Response body chứa JSON: `{"error": "Forbidden"}`.

## Status / Related bugs
Not Run / None
