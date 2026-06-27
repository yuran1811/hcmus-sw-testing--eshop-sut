# FR-10: Trạng thái Đơn hàng (Order State Machine) — Domain Testing

## 1. Mô tả tính năng

**Feature:** FR-10 — Order State Machine  
**Module:** Order Management  
**File liên quan:**
- Backend: `backend/server.js:525–568` (admin update status), `server.js:321–342` (user cancel)
- Frontend Admin: `frontend-admin/src/App.jsx:777–877`
- DB Schema: `backend/database.js` (bảng `orders`)

**Đặc tả (từ README.md):**
- 5 trạng thái: `pending` → `confirmed` → `shipping` → `delivered` / `canceled`
- `delivered` và `canceled` là **trạng thái kết thúc** (final states)
- Khi đơn ở `shipping`, **User không được phép hủy** — chỉ Admin mới thao tác được
- Mọi chuyển đổi không hợp lệ phải trả lỗi rõ ràng

---

## 2. Sơ đồ State Machine (đã xác nhận từ README + code)

```
                 [Admin xác nhận]          [Admin giao hàng]      [Admin hoàn tất]
  ┌──────────┐ ─────────────────► ┌───────────┐ ──────────────► ┌──────────┐ ──────────► ┌───────────┐
  │ pending  │                    │ confirmed │                  │ shipping │             │ delivered │
  └──────────┘                    └───────────┘                  └──────────┘             └───────────┘
       │                               │
       │ [User/Admin hủy]              │ [User/Admin hủy]
       ▼                               ▼
  ┌──────────┐
  │ canceled │  ← FINAL STATE (không chuyển sang trạng thái khác)
  └──────────┘
```

---

## 3. Xác định biến đầu vào (Variable Identification)

| Biến | Kiểu | Nguồn | Ghi chú |
|------|------|-------|---------|
| `current_status` | Enum String | `orders.status` (DB) | Trạng thái hiện tại |
| `new_status` | String | `req.body.status` | Trạng thái muốn chuyển sang |
| `order_id` | Integer | `req.params.id` | ID đơn hàng |
| `user_role` | String | JWT token `role` | 'admin' hoặc 'user' |
| `auth_token` | String | `Authorization` header | JWT hoặc không có |

---

## 4. Phân vùng tương đương (Equivalence Partitioning)

### 4.1 Phân vùng chuyển trạng thái (Transition Domain)

**Chuyển đổi HỢP LỆ (Valid Transitions):**
| Partition | From | To | Actor |
|-----------|------|----|-------|
| EP-T1 | pending | confirmed | Admin |
| EP-T2 | pending | canceled | Admin hoặc User |
| EP-T3 | confirmed | shipping | Admin |
| EP-T4 | confirmed | canceled | Admin hoặc User |
| EP-T5 | shipping | delivered | Admin |

**Chuyển đổi KHÔNG HỢP LỆ (Invalid Transitions):**
| Partition | From | To | Lý do |
|-----------|------|----|-------|
| EP-T6 | pending | shipping | Bỏ qua bước confirmed |
| EP-T7 | pending | delivered | Bỏ qua 2 bước |
| EP-T8 | confirmed | pending | Chuyển ngược |
| EP-T9 | confirmed | delivered | Bỏ qua bước shipping |
| EP-T10 | shipping | confirmed | Chuyển ngược |
| EP-T11 | shipping | pending | Chuyển ngược |
| EP-T12 | shipping | canceled | Spec không cho phép (BUG-07 cần verify) |
| EP-T13 | delivered | * | Final state |
| EP-T14 | canceled | * | Final state (ngoại trừ BUG-06) |

### 4.2 Phân vùng giá trị status

| Partition | Giá trị | Loại |
|-----------|---------|------|
| EP-S1 | "pending" | Valid |
| EP-S2 | "confirmed" | Valid |
| EP-S3 | "shipping" | Valid |
| EP-S4 | "delivered" | Valid |
| EP-S5 | "canceled" | Valid |
| EP-S6 | "PENDING" (uppercase) | Invalid |
| EP-S7 | "returned" (ngoài enum) | Invalid |
| EP-S8 | "" (rỗng) | Invalid |
| EP-S9 | null | Invalid |

### 4.3 Phân vùng Authentication & Authorization

| Partition | Token | Expected |
|-----------|-------|----------|
| EP-R1 | Admin JWT hợp lệ | Được phép thực hiện |
| EP-R2 | User JWT hợp lệ (non-admin) | 403 Forbidden |
| EP-R3 | Token không hợp lệ | 401 Unauthorized |
| EP-R4 | Không có token | 401 Unauthorized |

---

## 5. Test Cases — Domain Testing

### Nhóm 1: Chuyển đổi hợp lệ (Valid Transitions)

| TC-ID | current_status | new_status | Actor | Expected | Actual | Status |
|-------|---------------|------------|-------|----------|--------|--------|
| DT-FR10-01 | pending | confirmed | Admin | HTTP 200, `"Order status updated"` | HTTP 200 | PASS |
| DT-FR10-02 | pending | canceled | Admin | HTTP 200, status=canceled | HTTP 200 | PASS |
| DT-FR10-03 | confirmed | shipping | Admin | HTTP 200, status=shipping | HTTP 200 | PASS |
| DT-FR10-04 | confirmed | canceled | Admin | HTTP 200, status=canceled | HTTP 200 | PASS |
| DT-FR10-05 | shipping | delivered | Admin | HTTP 200, status=delivered | HTTP 200 | PASS |
| DT-FR10-06 | pending | canceled | User (via /orders/:id/cancel) | HTTP 200, hủy thành công | HTTP 200 | PASS |
| DT-FR10-07 | confirmed | canceled | User (via /orders/:id/cancel) | HTTP 200, hủy thành công | HTTP 200 | PASS |

### Nhóm 2: Chuyển đổi không hợp lệ (Invalid Transitions)

| TC-ID | current_status | new_status | Expected | Actual | Status | Bug? |
|-------|---------------|------------|----------|--------|--------|------|
| DT-FR10-08 | pending | shipping | HTTP 400, "Invalid state transition" | HTTP 400 | PASS | — |
| DT-FR10-09 | pending | delivered | HTTP 400, "Invalid state transition" | HTTP 400 | PASS | — |
| DT-FR10-10 | confirmed | pending | HTTP 400, "Invalid state transition" | HTTP 400 | PASS | — |
| DT-FR10-11 | confirmed | delivered | HTTP 400, "Invalid state transition" | HTTP 400 | PASS | — |
| DT-FR10-12 | shipping | confirmed | HTTP 400, "Invalid state transition" | HTTP 400 | PASS | — |
| DT-FR10-13 | shipping | pending | HTTP 400, "Invalid state transition" | HTTP 400 | PASS | — |
| DT-FR10-14 | shipping | canceled | HTTP 400 (spec: shipping không cho cancel) | HTTP 400 | PASS | — |
| DT-FR10-15 | delivered | confirmed | HTTP 400, final state | HTTP 400 | PASS | — |
| DT-FR10-16 | delivered | pending | HTTP 400, final state | HTTP 400 | PASS | — |
| DT-FR10-17 | canceled | confirmed | HTTP 400, final state | HTTP 200 (**BUG**) | FAIL | **BUG-06** |
| DT-FR10-18 | canceled | shipping | HTTP 400, final state | HTTP 400 | PASS | — |
| DT-FR10-19 | canceled | delivered | HTTP 400, final state | HTTP 200 (**BUG**) | FAIL | **BUG-06** |

### Nhóm 3: Giá trị status không hợp lệ

| TC-ID | new_status | Expected | Actual | Status |
|-------|------------|----------|--------|--------|
| DT-FR10-20 | "PENDING" (uppercase) | HTTP 400 | HTTP 400 (không match) | PASS |
| DT-FR10-21 | "returned" | HTTP 400 | HTTP 400 | PASS |
| DT-FR10-22 | "" | HTTP 400 hoặc 500 | HTTP 400 | PASS |
| DT-FR10-23 | null / không gửi body | HTTP 400 hoặc 500 | HTTP 500 (cần xem) | Minor |

### Nhóm 4: Authorization

| TC-ID | Token | Action | Expected | Actual | Status |
|-------|-------|--------|----------|--------|--------|
| DT-FR10-24 | Admin JWT | PUT /api/admin/orders/:id/status | 200 OK | 200 OK | PASS |
| DT-FR10-25 | User JWT (non-admin) | PUT /api/admin/orders/:id/status | 403 Forbidden | 403 Forbidden | PASS |
| DT-FR10-26 | No token | PUT /api/admin/orders/:id/status | 401 Unauthorized | 401 Unauthorized | PASS |

### Nhóm 5: User cancel shipping order (BUG-07)

| TC-ID | Scenario | Expected (spec) | Actual | Status | Bug? |
|-------|----------|-----------------|--------|--------|------|
| DT-FR10-27 | User gọi /orders/:id/cancel khi status=shipping | HTTP 400, không được phép | HTTP 200, cancel thành công | FAIL | **BUG-07** |

---

## 6. Tổng kết Domain Testing

| Nhóm | TC Count | PASS | FAIL | Bug |
|------|----------|------|------|-----|
| Valid transitions | 7 | 7 | 0 | — |
| Invalid transitions | 12 | 10 | 2 | BUG-06 |
| Invalid status values | 4 | 3 | 1 | Minor |
| Authorization | 3 | 3 | 0 | — |
| User cancel shipping | 1 | 0 | 1 | BUG-07 |
| **Tổng** | **27** | **23** | **4** | **2 bugs** |

---

## 7. Bugs phát hiện

| Bug ID | File:Line | Mô tả | Severity |
|--------|-----------|-------|---------|
| BUG-06 | `server.js:550-551` | Cho phép `canceled → delivered` (BUG: `canceled` là final state) | Major |
| BUG-07 | `server.js:329` | Backend chỉ block cancel khi `delivered` hoặc `canceled`, không block `shipping` → User có thể cancel đơn đang giao | Major |

### Chi tiết BUG-06 (canceled → delivered)
```javascript
// server.js line 550-551 — Bug: canceled không phải final state trong impl
if (currentStatus === "canceled" && status === "delivered")
  isValidTransition = true;  // Sai spec!
```

### Chi tiết BUG-07 (User cancel shipping)
```javascript
// server.js line 329 — Bug: thiếu check cho shipping
// Spec: chỉ cancel được khi pending hoặc confirmed
// Actual: block khi delivered hoặc canceled (bỏ quên shipping)
if (order.status === "delivered" || order.status === "canceled") {
  return res.status(400).json({ error: "Cannot cancel this order." });
}
// Phải là:
// if (order.status !== "pending" && order.status !== "confirmed") { ... }
```

---

## 8. AI Gap Analysis

**AI phát hiện được:**
- Ma trận chuyển đổi đầy đủ (valid/invalid transitions)
- Phân vùng authorization (admin vs user)

**AI bỏ sót:**
- Không chủ động đề xuất test `canceled → delivered` (BUG-06) vì đây là transition bất thường chỉ thấy khi đọc code kỹ
- Không đề xuất test User cancel từ UI mobile vs API trực tiếp (inconsistency BUG-07)

**Lý do:** BUG-06 và BUG-07 đều là logic sai tinh tế trong code — AI cần được cung cấp source code để phát hiện, không thể suy luận từ spec đơn thuần.
