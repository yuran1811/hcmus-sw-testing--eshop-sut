# TC-CANCEL-012: Thử nghiệm BOLA / IDOR - Người dùng A cố gắng hủy đơn hàng của Người dùng B (SEC-04)

## Requirement ID
SEC-04

## Module / Test type / Technique
Order Cancel / Security / Broken Object Level Authorization (IDOR)

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Người dùng A (`test@eshop.com`, `user_id = 2`) đăng nhập lấy token A
- Người dùng B (`user_b@eshop.com`, `user_id = 3` hoặc khác) có đơn hàng (ví dụ: `order_id = 99`)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/99/cancel |
| Header Authorization | Bearer {{userAToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 99 (Belongs to User B) |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/99/cancel` sử dụng token của User A để thao tác trên đơn hàng của User B
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response cùng phản hồi JSON

## Expected result
Mã trạng thái HTTP 404 Not Found (hoặc 403 Forbidden). Response body chứa `{"error": "Order not found"}`. SUT bảo vệ toàn vẹn quyền sở hữu đơn hàng dựa trên mệnh đề `WHERE id = ? AND user_id = ?`.

## Status / Related bugs
Pass (SUT áp dụng ràng buộc scoped query `user_id = req.user.id`)
