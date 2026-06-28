# BUG-06: Admin không thể hủy đơn hàng đang ở trạng thái `shipping`

**Mã lỗi:** BUG-06  
**Mức độ nghiêm trọng:** Cao  
**Ưu tiên:** P1  
**Phát hiện bởi:** Playwright automated test — FR-10 Domain Testing  
**Ngày phát hiện:** 2026-06-28  
**Test case liên quan:** DT-FR10-06  
**Trạng thái:** Mở

---

## Mô tả

Đặc tả FR-10 quy định: **"Admin có thể hủy đơn hàng ở bất kỳ trạng thái nào (pending, confirmed, hoặc shipping)"**. Tuy nhiên, khi đơn hàng ở trạng thái `shipping`:

1. **Admin UI:** Không hiển thị nút "Hủy" — chỉ có nút "Hoàn thành"
2. **Admin API:** `PUT /api/admin/orders/:id/status {status:"canceled"}` trả về HTTP 400 `{"error":"Invalid state transition from shipping to canceled"}`

Admin không có cách nào hủy đơn hàng đang ở `shipping`, kể cả qua UI lẫn API.

---

## Các bước tái hiện

1. Đăng nhập tài khoản admin: `admin@eshop.com / Admin123!`
2. Tạo đơn hàng, nâng lên trạng thái `shipping` (pending → confirmed → shipping)
3. Vào admin panel → tab "Đơn hàng"
4. **Kết quả thực tế:** Đơn ở `shipping` chỉ có nút "Hoàn thành", không có nút "Hủy"
5. Thử gọi API: `PUT /api/admin/orders/:id/status {"status":"canceled"}`
6. **Kết quả thực tế:** HTTP 400 `{"error":"Invalid state transition from shipping to canceled"}`

---

## Kết quả mong đợi

- Admin UI hiển thị nút "Hủy" cho đơn ở `shipping`
- API `PUT /api/admin/orders/:id/status {status:"canceled"}` trả về HTTP 200 khi đơn ở `shipping`
- Đơn hàng chuyển sang trạng thái `canceled`

---

## Kết quả thực tế

- Admin UI **không hiển thị** nút "Hủy" cho đơn `shipping` (chỉ có "Hoàn thành")
- API: HTTP 400 `{"error":"Invalid state transition from shipping to canceled"}`
- Đơn hàng giữ nguyên trạng thái `shipping`

---

## Bằng chứng (Screenshots)

- [DT-FR10-06-before.png](../test-runs/FR10_OrderState/screenshots/DT-FR10-06-before.png) — Admin UI: đơn shipping, chỉ có nút "Hoàn thành"
- [DT-FR10-06-result.png](../test-runs/FR10_OrderState/screenshots/DT-FR10-06-result.png) — Sau API call: trạng thái không thay đổi

---

## Phân tích nguyên nhân gốc (Root Cause Analysis)

Trong backend, hàm xác thực chuyển đổi trạng thái (`state transition validator`) không bao gồm `shipping → canceled` trong danh sách các chuyển đổi hợp lệ cho admin. Có thể biến `VALID_TRANSITIONS` chỉ chứa:

```
pending → confirmed
confirmed → shipping
shipping → delivered
pending → canceled (admin)
confirmed → canceled (admin)
```

mà thiếu `shipping → canceled (admin)`.

---

## Mối liên hệ với BUG-05

BUG-05 và BUG-06 có thể là biểu hiện của cùng một lỗi logic:
- Hệ thống cấp quyền hủy từ `shipping` cho **User** (sai — BUG-05)
- Hệ thống không cấp quyền hủy từ `shipping` cho **Admin** (sai — BUG-06)

Đây có thể là lỗi "hoán đổi actor" trong logic kiểm tra quyền.

---

## Tác động

- **Operational impact:** Admin không thể can thiệp khi có sự cố trong quá trình vận chuyển (hàng hỏng, địa chỉ sai, khách từ chối nhận)
- **Business impact:** Không có luồng xử lý ngoại lệ trong giai đoạn vận chuyển — mọi đơn đang vận chuyển buộc phải hoàn tất

---

## Lệnh tạo GitHub Issue

```bash
gh issue create \
  --title "[BUG-06] Admin không thể hủy đơn hàng ở trạng thái shipping (vi phạm FR-10)" \
  --body "**Mức độ:** Cao | **TC liên quan:** DT-FR10-06

## Mô tả
Admin không thể hủy đơn hàng khi đơn đang ở trạng thái \`shipping\` — vi phạm FR-10.
Admin UI không hiển thị nút 'Hủy', API trả về HTTP 400.

## Các bước tái hiện
1. Tạo đơn hàng → Admin nâng lên shipping
2. Admin vào panel → tab Đơn hàng → chỉ thấy nút 'Hoàn thành'
3. Gọi API: PUT /api/admin/orders/:id/status {status:'canceled'} → HTTP 400

## Kết quả mong đợi
Admin có thể hủy đơn từ bất kỳ trạng thái nào (pending, confirmed, shipping).

## Fix đề xuất
- Backend: thêm \`shipping → canceled\` vào valid transitions cho admin
- Frontend: thêm nút 'Hủy' cho đơn ở shipping trong admin panel

## Ghi chú
Có thể liên quan đến BUG-05 (user hủy được ở shipping khi không nên) — logic actor bị hoán đổi." \
  --label "bug,high,FR-10"
```
