# [BUG][Order History] Lỗ hổng bảo mật nghiêm trọng IDOR tại API lấy chi tiết đơn hàng

## Found by Test Case

- TC-ORDER-HISTORY-003
- TC-ORDER-HISTORY-026

## Requirement liên quan

- FR-11 (Xem lịch sử đơn hàng)

## Severity / Priority

- **Severity**: Critical
- **Priority**: P0

## Environment

- Browser: N/A (Backend API level)
- OS: Windows 11
- URL: http://localhost:3000/api/orders/:id
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce

1. Tạo một đơn hàng bất kỳ bằng tài khoản Admin (ID người dùng = 1) để lấy một `orderId` hợp lệ (ví dụ: `orderId = 1`).
2. Gửi một yêu cầu GET không kèm theo mã xác thực (Anonymous) tới địa chỉ: `/api/orders/1`.
3. Gửi một yêu cầu GET kèm theo token của tài khoản người dùng thường `test@eshop.com` (ID người dùng = 2) tới cùng địa chỉ `/api/orders/1`.
4. Quan sát phản hồi từ server cho cả hai trường hợp.

## Expected result

- API lấy chi tiết đơn hàng phải được bảo vệ bằng cơ chế xác thực và phân quyền (Authorization).
- Yêu cầu xem đơn hàng của người dùng khác hoặc yêu cầu nặc danh phải bị chặn lại với mã lỗi `403 Forbidden` hoặc `404 Not Found` kèm thông điệp cảnh báo bảo mật tiếng Việt: "Bạn không có quyền xem đơn hàng này!".

## Actual result

- Cả hai yêu cầu (nặc danh và tài khoản khác) đều thành công vượt qua kiểm tra, trả về mã trạng thái `200 OK` cùng với toàn bộ thông tin chi tiết đơn hàng của Admin (bao gồm địa chỉ giao hàng, tổng tiền, ngày đặt).
- **Nguyên nhân gốc rễ**: Tại `backend/server.js:344`, API `/api/orders/:id` hoàn toàn không sử dụng middleware `authenticateToken` và không hề có bước so sánh trường `user_id` của đơn hàng với `id` của người dùng gửi yêu cầu.

## Evidence

- HTTP Request & Response (Truy cập nặc danh không cần token):

  ```http
  GET /api/orders/1 HTTP/1.1
  Host: localhost:3000

  HTTP/1.1 200 OK
  Content-Type: application/json; charset=utf-8

  {
    "id": 1,
    "user_id": 2,
    "total_amount": 150000,
    "status": "pending",
    "shipping_address": null,
    "created_at": "2026-06-26 15:45:09"
  }
  ```

- Kết xuất chạy kịch bản tự động:
  ```text
  Testing TC-ORDER-HISTORY-026: IDOR Security on GET /api/orders/:id...
  Created admin order with ID: 1
  Anonymous request to GET /api/orders/:id result: 200 { id: 1, user_id: 1, total_amount: 150000, ... }
  Test User request to GET /api/orders/:id result: 200 { id: 1, user_id: 1, total_amount: 150000, ... }
  FAILED: IDOR vulnerability detected! Anyone can view order details of order ID: 1
  ```
- Browser recording session showing UI exploration: [order_history_ui_exploration_1782469485421.webp](evidence/order_history_ui_exploration_1782469485421.webp)
