# TC-CANCEL-013: Thử nghiệm BOLA - Người dùng thông thường cố gắng hủy đơn hàng của Admin (SEC-04)

## Requirement ID
SEC-04

## Module / Test type / Technique
Order Cancel / Security / Privilege Escalation & Object Authorization

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Đơn hàng thuộc quyền sở hữu của tài khoản Admin (`user_id = 1`)
- Người dùng thông thường (`user_id = 2`) đăng nhập lấy token
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/:admin_order_id/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | ID đơn hàng của Admin |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/:admin_order_id/cancel` bằng token của người dùng chuẩn
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found. Response body chứa `{"error": "Order not found"}`.

## Status / Related bugs
Not Run / None
