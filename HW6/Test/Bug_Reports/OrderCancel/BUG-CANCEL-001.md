Title: [BUG][Order Cancel] Vi phạm máy trạng thái FSM, cho phép hủy đơn hàng đang ở trạng thái Shipping (Vận chuyển)

## Found by Test Case
TC-CANCEL-003

## Requirement liên quan
FR-10 (Order State Machine & Order Cancellation)

## Severity / Priority
Critical / P1

## Environment
- OS: Windows 11 / Linux Ubuntu 22.04
- SUT Base URL: `http://localhost:3000`
- Target Endpoint: `PUT /api/orders/:id/cancel`
- Tool: Postman v10+ / Newman CLI v6.2.2

## Steps to reproduce
1. Đăng nhập tài khoản người dùng (`test@eshop.com`) để lấy Bearer JWT Token.
2. Xác định một đơn hàng đang ở trạng thái `shipping` (ví dụ Order ID: 3).
3. Gửi HTTP `PUT` request đến `http://localhost:3000/api/orders/3/cancel` với:
   - Header: `Authorization: Bearer {{userToken}}`
   - Header: `X-Student-Id: 23127148`
4. Kiểm tra mã trạng thái HTTP response và trạng thái đơn hàng trong Database.

## Expected result
Theo đặc tả nghiệp vụ **FR-10**, đơn hàng chỉ được phép hủy khi đang ở trạng thái `pending` hoặc `confirmed`. Khi đơn hàng đã chuyển sang `shipping` (đang giao hàng), hệ thống phải **từ chối yêu cầu hủy với mã HTTP 400 Bad Request**:
```json
{
  "error": "Cannot cancel this order."
}
```

## Actual result
Do câu lệnh kiểm tra tại `backend/server.js:329` chỉ kiểm tra `delivered` và `canceled` mà bỏ quên `shipping`:
```javascript
if (order.status === "delivered" || order.status === "canceled") {
  return res.status(400).json({ error: "Cannot cancel this order." });
}
```
Hệ thống **chấp nhận cho phép hủy đơn hàng đang shipping**, trả về **`200 OK`** với `{ "message": "Order canceled successfully" }` và ghi đè trạng thái trong DB thành `canceled`.

## Evidence
- Mã nguồn vi phạm tại `backend/server.js:328-331`:
  ```javascript
  // Lẽ ra phải là: if (order.status !== 'pending' && order.status !== 'confirmed')
  if (order.status === "delivered" || order.status === "canceled") {
    return res.status(400).json({ error: "Cannot cancel this order." });
  }
  ```
- Ghi chú: Chính tác giả mã nguồn SUT đã để lại dòng comment xác nhận lỗi này tại dòng 328.
