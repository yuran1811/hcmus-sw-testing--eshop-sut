# TC-CANCEL-004: Hủy đơn hàng đã ở trạng thái Delivered (Terminal State)

## Requirement ID
FR-10

## Module / Test type / Technique
Order Cancel / Functional / State Transition Testing (Terminal State)

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng có Bearer Token hợp lệ
- Tồn tại đơn hàng thuộc về người dùng đang ở trạng thái `delivered` (đã giao thành công)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/:id/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 4 (Status: delivered) |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/4/cancel` đối với đơn hàng `delivered`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response cùng nội dung JSON trả về

## Expected result
Mã trạng thái HTTP 400 Bad Request. Response body chứa JSON: `{"error": "Cannot cancel this order."}`. Trạng thái kết thúc không thể chuyển tiếp sang `canceled`.

## Status / Related bugs
Not Run / None
