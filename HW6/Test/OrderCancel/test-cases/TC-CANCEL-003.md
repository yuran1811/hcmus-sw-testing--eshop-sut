# TC-CANCEL-003: Hủy đơn hàng đang ở trạng thái Shipping (Negative / SUT Bug)

## Requirement ID
FR-10

## Module / Test type / Technique
Order Cancel / Functional / State Transition Testing (Invalid Transition)

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng có Bearer Token hợp lệ
- Tồn tại đơn hàng thuộc về người dùng đang ở trạng thái `shipping` (đang giao hàng)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/:id/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 3 (Status: shipping) |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/3/cancel` đối với đơn hàng có trạng thái `shipping`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response cùng nội dung JSON trả về

## Expected result
Mã trạng thái HTTP 400 Bad Request. Response body chứa JSON: `{"error": "Cannot cancel this order."}`. Đơn hàng đang vận chuyển không được phép hủy theo quy tắc nghiệp vụ FR-10.

## Status / Related bugs
Fail (SUT Defect Line 329: SUT cho phép hủy đơn hàng `shipping` trả về 200 OK thay vì 400 Bad Request)
