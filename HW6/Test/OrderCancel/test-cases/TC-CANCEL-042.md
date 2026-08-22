# TC-CANCEL-042: Cô lập ranh giới đặc quyền (Role Boundary): Admin Token gọi endpoint hủy đơn hàng người dùng (BFLA/BOLA)

## Requirement ID
FR-10, FR-12

## Module / Test type / Technique
Order Cancel / Security / Broken Object Level Authorization & Role Confusion (SEC-01 & SEC-03)

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản Admin `admin@eshop.com` đã đăng nhập và có Bearer JWT với role `admin` (ID: 1)
- Tồn tại đơn hàng thuộc về Standard User `user@eshop.com` (ID: 2), ví dụ Order ID: 5
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/:id/cancel |
| Header Authorization | Bearer {{adminToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 5 (Order belonging to User ID 2) |

## Test steps
1. Đăng nhập tài khoản Admin để lấy Admin Bearer JWT
2. Gửi HTTP PUT request đến `/api/orders/5/cancel` (vốn là endpoint tự phục vụ của người dùng, truy vấn theo `WHERE id = ? AND user_id = ?`) sử dụng token của Admin
3. Đính kèm header `X-Student-Id: 23127148`
4. Kiểm tra mã trạng thái HTTP response và phân tích hành vi cô lập ngữ cảnh dữ liệu

## Expected result
Mã trạng thái HTTP `404 Not Found` (hoặc `403 Forbidden`). Vì endpoint `/api/orders/:id/cancel` ràng buộc chặt chẽ theo `req.user.id` của người dùng sở hữu đơn hàng, token Admin không được phép can thiệp nhầm vào luồng xử lý của user thông thường mà phải sử dụng endpoint quản trị riêng (`/api/admin/orders/:id`). Không được xảy ra lỗi 500.

## Status / Related bugs
Not Run / None
