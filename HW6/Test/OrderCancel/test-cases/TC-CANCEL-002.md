# TC-CANCEL-002: Hủy đơn hàng đang ở trạng thái Confirmed (Happy Path)

## Requirement ID
FR-10

## Module / Test type / Technique
Order Cancel / Functional / State Transition Testing

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng có Bearer Token hợp lệ
- Tồn tại đơn hàng thuộc về người dùng đang ở trạng thái `confirmed` (chưa chuyển sang shipping)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/:id/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 2 (Status: confirmed) |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/2/cancel` với Bearer JWT của người dùng
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response cùng nội dung JSON trả về

## Expected result
Mã trạng thái HTTP 200 OK. Response body chứa JSON: `{"message": "Order canceled successfully"}`.

## Status / Related bugs
Not Run / None
