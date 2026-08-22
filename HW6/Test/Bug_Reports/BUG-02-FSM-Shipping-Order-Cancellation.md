# BUG-02: Order State Machine Violation Allowing Cancellation in Shipping Transit

## 1. General Information

| Field | Value |
| :--- | :--- |
| **Bug ID** | `BUG-CANCEL-01` (FSM-Violation) |
| **Feature / Module** | FR-10: Order State Machine & Cancellation Rules |
| **Endpoint** | `PUT /api/orders/:id/cancel` |
| **Severity** | **HIGH** |
| **Priority** | **HIGH** |
| **Defect Type** | Business Logic Defect / Finite State Machine Violation |
| **Discovered By** | Antigravity AI & Nguyen An (Student ID: 23127148) |
| **Related Test Case** | `TC-CANCEL-003: Cancel Order in 'shipping' status (Catch SUT Line 329 Defect)` |

---

## 2. Description & Impact

According to business specification **FR-10**, order cancellation is **strictly restricted to orders in `pending` or `confirmed` status**. Once an order has entered the `shipping` transit phase or has been `delivered`/`canceled`, cancellation must be rejected.

In `backend/server.js:329`, the cancellation guard only checks:
```javascript
if (order.status === "delivered" || order.status === "canceled")
```
It **completely omits the `"shipping"` status**. Consequently, customers can cancel orders that have already been shipped and are in physical transit, causing financial and logistical loss.

---

## 3. Steps to Reproduce

1. Create and authenticate a customer account (`test@eshop.com`).
2. Have an existing order in `shipping` status (e.g. Order ID: 3).
3. Send an HTTP `PUT` request to `http://localhost:3000/api/orders/3/cancel` with:
   - Header: `Authorization: Bearer <user_token>`
   - Header: `X-Student-Id: 23127148`
4. Inspect the HTTP response and database order status.

---

## 4. Expected vs Actual Result

- **Expected Result:** HTTP `400 Bad Request` with `{ "error": "Cannot cancel this order." }`. Status remains `shipping`.
- **Actual Result:** HTTP `200 OK` with `{ "message": "Order canceled successfully" }`. Status is illegally overwritten to `canceled`.

---

## 5. Vulnerable Code Location & Recommended Fix

### Vulnerable Code (`backend/server.js:329`):
```javascript
// Lẽ ra phải là: if (order.status !== 'pending' && order.status !== 'confirmed')
if (order.status === "delivered" || order.status === "canceled") {
  return res.status(400).json({ error: "Cannot cancel this order." });
}
```

### Recommended Fix:
```javascript
if (order.status !== "pending" && order.status !== "confirmed") {
  return res.status(400).json({ error: "Cannot cancel this order." });
}
```
