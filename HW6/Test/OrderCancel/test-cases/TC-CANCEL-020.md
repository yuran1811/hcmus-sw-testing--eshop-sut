# TC-CANCEL-020: Thử nghiệm Mass Assignment - Chèn trường số tiền và ID người dùng (SEC-07)

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
| Body | `{"total_amount": 0, "user_id": 99}` |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1/cancel` kèm payload body cố tình thay đổi tổng tiền và quyền sở hữu
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 200 OK. Body bị bỏ qua, các trường `total_amount` và `user_id` không bị thay đổi.

## Status / Related bugs
Not Run / None
