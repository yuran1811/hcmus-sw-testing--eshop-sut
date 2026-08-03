# BUG-06: Cho phép chuyển trạng thái canceled → delivered (vi phạm final state)

## Thông tin

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-06 |
| Feature | FR-10: Order State Machine, FR-18: Admin Order Management |
| Severity | Major |
| Priority | High |
| Status | Open |
| File:Line | `backend/server.js:550-551` |

## Mô tả

Spec định nghĩa `canceled` là **trạng thái kết thúc (final state)** — không được chuyển sang bất kỳ trạng thái nào khác. Tuy nhiên, backend cho phép Admin chuyển đơn từ `canceled` sang `delivered`.

Hậu quả:
- Đơn hàng đã hủy bỗng nhiên trở thành "Đã giao" → ảnh hưởng doanh thu, báo cáo, trải nghiệm người dùng
- Admin UI hiển thị nút "Đánh dấu Đã giao" cho đơn đã hủy

## Reproduce Steps

1. Tạo đơn hàng (status = pending)
2. Admin cancel đơn: `PUT /api/admin/orders/:id/status` với `{ "status": "canceled" }`
3. Gọi lại: `PUT /api/admin/orders/:id/status` với `{ "status": "delivered" }`
4. Expected: HTTP 400, "Invalid state transition from canceled to delivered"
5. Actual: HTTP 200, status chuyển thành "delivered"

## Root Cause

```javascript
// backend/server.js:550-551
if (currentStatus === "canceled" && status === "delivered")
  isValidTransition = true;  // BUG: phải là false, canceled là final state
```

## Fix

```javascript
// Xóa hoặc comment out 2 dòng trên
// canceled là final state, không cho phép bất kỳ transition nào
```

## State Machine Đúng

```
canceled ──X──► (bất kỳ trạng thái nào)  // BLOCKED
```
