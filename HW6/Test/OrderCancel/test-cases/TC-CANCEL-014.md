# TC-CANCEL-014: Thử nghiệm Role Isolation - Dùng Token Admin gọi API hủy đơn của User thường (SEC-03)

## Requirement ID
SEC-03

## Module / Test type / Technique
Order Cancel / Security / Role-Based Access Control Isolation

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản Admin đăng nhập có Bearer Token (Role: `admin`, `user_id = 1`)
- Đơn hàng thuộc quyền sở hữu của User thường (`user_id = 2`)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1/cancel |
| Header Authorization | Bearer {{adminToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 1 (User's Order) |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1/cancel` sử dụng token của Admin
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found. Do endpoint `/api/orders/:id/cancel` truy vấn đơn hàng thuộc sở hữu của `req.user.id`, Admin không thể hủy đơn của người dùng khác thông qua endpoint người dùng này (Admin phải dùng endpoint chuyên biệt `/api/admin/orders/:id/status`).

## Status / Related bugs
Not Run / None
