# TC-CANCEL-006: Kiểm tra tính bền vững trạng thái Canceled (Chained Verification)

## Requirement ID
FR-10

## Module / Test type / Technique
Order Cancel / Functional / State Verification & API Chaining

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Đơn hàng đã được thực hiện hủy thành công (ví dụ: Order ID: 1)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | GET /api/orders/:id |
| Param.id | 1 |
| Header X-Student-Id | 23127148 |

## Test steps
1. Gửi HTTP GET request đến `/api/orders/1` để truy vấn chi tiết đơn hàng vừa hủy
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response cùng trường `status` trong body

## Expected result
Mã trạng thái HTTP 200 OK. Response body JSON trả về object đơn hàng với trường `status` mang giá trị chính xác là `"canceled"`.

## Status / Related bugs
Not Run / None
