# TC-CANCEL-009: Yêu cầu hủy đơn hàng với JWT Token không đúng định dạng (SEC-02)

## Requirement ID
SEC-02

## Module / Test type / Technique
Order Cancel / Security / Broken Authentication

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Chuỗi JWT Token bị hỏng / không đúng cấu trúc (ví dụ: `invalid.jwt.token`)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1/cancel |
| Header Authorization | Bearer invalid.jwt.string |
| Header X-Student-Id | 23127148 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1/cancel` với Bearer JWT có giá trị `invalid.jwt.string`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response cùng JSON trả về

## Expected result
Mã trạng thái HTTP 403 Forbidden. Response body chứa JSON: `{"error": "Forbidden"}`.

## Status / Related bugs
Not Run / None
