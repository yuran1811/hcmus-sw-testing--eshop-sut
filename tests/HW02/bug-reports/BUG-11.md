# BUG-11: Mobile UI và Backend không nhất quán về cancel khi shipping

## Thông tin

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-11 |
| Feature | FR-20 (Mobile) / FR-10: Order State Machine |
| Severity | Major |
| Priority | High |
| Status | Open |
| File:Line | `backend/server.js:329` (kế thừa BUG-07 ảnh hưởng mobile) |

## Mô tả

Mobile UI ẩn nút "Hủy đơn" khi đơn ở trạng thái `shipping` (đúng theo spec). Tuy nhiên, backend API cho phép cancel từ trạng thái `shipping` — tạo ra sự không nhất quán giữa UI và API.

User am hiểu kỹ thuật có thể bypass UI và gọi API trực tiếp để hủy đơn đang giao.

## Reproduce Steps

1. Dùng mobile app đăng nhập với user account
2. Tạo đơn hàng → Admin chuyển sang confirmed → Admin chuyển sang shipping
3. Mở tab Profile → xem đơn hàng: **nút "Hủy đơn" không xuất hiện** (UI đúng)
4. Tuy nhiên, gọi trực tiếp: `PUT http://192.168.10.13:3000/api/orders/:id/cancel`
5. Expected: HTTP 400, "Cannot cancel this order"
6. Actual: HTTP 200, "Order canceled successfully"

## Root Cause

UI Mobile (`App.js:961`):
```javascript
{(o.status === "pending" || o.status === "confirmed") && (
  <TouchableOpacity onPress={() => cancelOrder(o.id)}>Hủy đơn</TouchableOpacity>
)}
// UI đúng: chỉ hiện khi pending hoặc confirmed
```

Backend (`server.js:329`):
```javascript
if (order.status === "delivered" || order.status === "canceled") {
  return res.status(400).json({ error: "Cannot cancel this order." });
}
// BUG: không block shipping → backend cho phép cancel từ shipping
```

## Fix

Xem BUG-07 — cùng root cause, fix ở backend sẽ resolve cả BUG-07 và BUG-11.
