# TC-CANCEL-001: Hủy đơn hàng đang ở trạng thái Pending (Happy Path)

## Requirement ID
FR-10

## Module / Test type / Technique
Order Cancel / Functional / State Transition Testing

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng `test@eshop.com` đã đăng nhập và có Bearer Token hợp lệ
- Tồn tại đơn hàng thuộc về người dùng đang ở trạng thái `pending` (ví dụ: Order ID: 1)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/:id/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 1 (Status: pending) |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1/cancel` với Bearer JWT của người dùng sở hữu đơn hàng
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response cùng nội dung JSON trả về

## Expected result
Mã trạng thái HTTP 200 OK. Response body chứa JSON: `{"message": "Order canceled successfully"}`. Trạng thái đơn hàng được chuyển sang `canceled`.

## Status / Related bugs
Not Run / None
