# BUG-07: User hủy được đơn đang ở trạng thái shipping (reconfirmed, HW04)

## Thông tin

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-07 |
| Feature | FR-10: Order State Machine |
| Severity | Major |
| Priority | High |
| Status | Open (đã phát hiện từ HW02, vẫn còn ở HW04) |
| Phát hiện lại bởi | `e2e/fr10-orderstate/fr10-orderstate.spec.ts` — FR10-TC12 (Playwright, 3 browser) |
| File:Line | `backend/server.js:329` |

## Mô tả

Spec: User chỉ được tự hủy đơn khi đang ở `pending` hoặc `confirmed`; khi đơn đã `shipping`, chỉ Admin mới thao tác được. Code chỉ chặn hủy khi `delivered` hoặc `canceled`, quên chặn `shipping`.

## Bằng chứng tự động hoá (HW04)

`FR10-TC12` tạo đơn, đưa qua `confirmed → shipping` bằng API admin hợp lệ, sau đó gọi `PUT /api/orders/:id/cancel` bằng token của chính chủ đơn và assert theo spec (`400`). Test fail nhất quán trên cả 3 browser:

```
Expected: 400
Received: 200
```

## Root Cause

```javascript
// backend/server.js:329
if (order.status === "delivered" || order.status === "canceled") {
  return res.status(400).json({ error: "Cannot cancel this order." });
}
// Thiếu check cho "shipping" — phải là:
// if (order.status !== "pending" && order.status !== "confirmed") { ... }
```

## Screenshot

![BUG-07 evidence](../screenshots/BUG-07-fr10-user-cancel-shipping.png)

*Nguồn: `23127152-hw4/reports/fr10-orderstate/{chromium,firefox,webkit}/index.html`, test case FR10-TC12. Dữ liệu trong ảnh lấy từ lần gọi API thật (curl) ngay trên môi trường dev. Ảnh chụp UI đầy đủ đã có tại `tests/HW02/bug-reports/BUG-07.md`.*

---

## Lỗi liên quan: BUG-14 (Broken Access Control, reconfirmed từ HW02)

`FR10-TC14` ban đầu định dùng để tái hiện BUG-14 (`/api/admin/*` không kiểm tra role) qua UI, nhưng phát hiện Admin Panel có role check phía client chặn đúng trước khi chạm tới bug thật — xem chi tiết đầy đủ (root cause, vì sao không automate lại được qua UI) tại `23127152-hw4/bug-reports/fr18-ordermanagement/BUG-14.md`.
