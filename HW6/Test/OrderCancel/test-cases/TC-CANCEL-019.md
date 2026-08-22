# TC-CANCEL-019: Thử nghiệm Mass Assignment - Chèn trường trạng thái giả mạo trong Body (SEC-07)

## Requirement ID
SEC-07

## Module / Test type / Technique
Order Cancel / Security / Mass Assignment & Parameter Tampering

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Đơn hàng đang ở trạng thái `pending`
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header Content-Type | application/json |
| Header X-Student-Id | 23127148 |
| Body | `{"status": "delivered"}` |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1/cancel` kèm payload body cố tình ép trạng thái sang `delivered`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response cùng trạng thái thực tế sau cập nhật

## Expected result
Mã trạng thái HTTP 200 OK. Body giả mạo bị bỏ qua hoàn toàn; trạng thái đơn hàng được đặt chính xác thành `"canceled"`.

## Status / Related bugs
Not Run / None
