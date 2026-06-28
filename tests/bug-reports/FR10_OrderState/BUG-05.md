# BUG-05: User có thể hủy đơn hàng đang ở trạng thái `shipping`

**Mã lỗi:** BUG-05  
**Mức độ nghiêm trọng:** Cao  
**Ưu tiên:** P1  
**Phát hiện bởi:** Playwright automated test — FR-10 Domain Testing & BVA  
**Ngày phát hiện:** 2026-06-28  
**Test case liên quan:** DT-FR10-11, BVA-FR10-03  
**Trạng thái:** Mở

---

## Mô tả

Đặc tả FR-10 quy định: **"Khi đơn hàng đã ở trạng thái `shipping`, User không được phép tự hủy"**. Tuy nhiên, hệ thống hiện tại vi phạm quy định này theo cả hai lớp:

1. **Giao diện người dùng (UI):** Nút "Hủy đơn" vẫn hiển thị trên trang `/profile` cho đơn hàng đang ở `shipping`.
2. **Backend API:** `PUT /api/orders/:id/cancel` trả về HTTP 200 và thực sự hủy đơn hàng dù đơn đang ở `shipping`.

Điều này có nghĩa là user có thể hủy đơn ngay cả khi hàng đang được giao — gây ra hậu quả thực tế nghiêm trọng (giao hàng viên đang trên đường, đơn hàng trong kho vẫn bị hủy trong hệ thống).

---

## Các bước tái hiện

1. Đăng nhập tài khoản user: `test@eshop.com / Test1234!`
2. Tạo đơn hàng mới
3. Admin nâng đơn lên `confirmed` → `shipping`
4. Vào `/profile` → Lịch sử đơn hàng
5. **Kết quả thực tế:** Nút "Hủy đơn" hiển thị cho đơn ở `shipping`
6. Nhấn nút "Hủy đơn"
7. **Kết quả thực tế:** Đơn hàng bị hủy thành công — API trả về `{"message":"Order canceled successfully"}`, trạng thái chuyển sang `canceled`

---

## Kết quả mong đợi

- Nút "Hủy đơn" KHÔNG hiển thị cho đơn ở trạng thái `shipping`
- Gọi API `PUT /api/orders/:id/cancel` khi đơn ở `shipping` phải trả về HTTP 4xx với thông báo lỗi phù hợp

---

## Kết quả thực tế

- Nút "Hủy đơn" **hiển thị** trên UI cho đơn `shipping`
- API: HTTP 200 `{"message":"Order canceled successfully"}`
- Trạng thái đơn hàng thay đổi từ `shipping` → `canceled`

---

## Bằng chứng (Screenshots)

- [DT-FR10-11-before.png](../test-runs/FR10_OrderState/screenshots/DT-FR10-11-before.png) — User profile khi đơn ở shipping: nút Hủy đơn hiển thị
- [DT-FR10-11-result.png](../test-runs/FR10_OrderState/screenshots/DT-FR10-11-result.png) — Sau khi hủy: đơn chuyển sang canceled
- [BVA-FR10-03-before.png](../test-runs/FR10_OrderState/screenshots/BVA-FR10-03-before.png) — Xác nhận biên B1 bị vi phạm

---

## Phân tích nguyên nhân gốc (Root Cause Analysis)

- Trong `PUT /api/orders/:id/cancel` (backend), **không có kiểm tra trạng thái hiện tại** của đơn hàng trước khi hủy. Endpoint chỉ kiểm tra quyền sở hữu (đơn của đúng user) nhưng không kiểm tra xem trạng thái có cho phép hủy không.
- Trên frontend `/profile`, component hiển thị nút Hủy dựa trên điều kiện sai: chỉ kiểm tra `status !== 'canceled'` và `status !== 'delivered'` thay vì phải là `status === 'pending' || status === 'confirmed'`.

---

## Tác động

- **Business impact:** Giao hàng viên đang trên đường nhưng đơn bị hủy trong hệ thống → thiệt hại vật chất, ảnh hưởng uy tín
- **Data integrity:** Trạng thái vật lý (hàng đang vận chuyển) và trạng thái hệ thống không đồng bộ

---

## Lệnh tạo GitHub Issue

```bash
gh issue create \
  --title "[BUG-05] User có thể hủy đơn hàng đang ở trạng thái shipping (vi phạm FR-10)" \
  --body "**Mức độ:** Cao | **TC liên quan:** DT-FR10-11, BVA-FR10-03

## Mô tả
User có thể hủy đơn hàng ngay cả khi đơn đang ở trạng thái \`shipping\` — vi phạm FR-10.
Cả UI (nút Hủy đơn hiển thị) lẫn API (\`PUT /api/orders/:id/cancel\` → HTTP 200) đều sai.

## Các bước tái hiện
1. Tạo đơn hàng → Admin nâng lên shipping
2. User vào /profile → thấy nút 'Hủy đơn' cho đơn shipping
3. Nhấn nút → đơn bị hủy thành công (HTTP 200)

## Kết quả mong đợi
Nút ẩn; API trả về 4xx với thông báo lỗi.

## Fix đề xuất
- Backend: thêm điều kiện \`if (order.status !== 'pending' && order.status !== 'confirmed') return 403\`
- Frontend: hiện nút Hủy chỉ khi \`status === 'pending' || status === 'confirmed'\`" \
  --label "bug,high,FR-10"
```
