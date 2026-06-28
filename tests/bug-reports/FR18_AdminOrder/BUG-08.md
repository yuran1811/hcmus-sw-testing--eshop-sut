# BUG-08: Admin UI render `shipping_address` qua innerHTML — XSS thành công

**Mã lỗi:** BUG-08  
**Mức độ nghiêm trọng:** Nghiêm trọng (Critical)  
**Ưu tiên:** P0 — Cần sửa ngay lập tức  
**Phát hiện bởi:** Playwright automated test — FR-18 Domain Testing & BVA  
**Ngày phát hiện:** 2026-06-28  
**Test case liên quan:** DT-FR18-10, DT-FR18-11, BVA-FR18-05, BVA-FR18-06  
**Trạng thái:** Mở

---

## Mô tả

Đặc tả SEC-04 quy định: **"Mọi dữ liệu từ user nhập vào khi hiển thị trên UI phải được escape đúng cách, không dùng `innerHTML` trực tiếp."** Tuy nhiên, Admin UI hiển thị trường `shipping_address` (do user nhập khi checkout) trực tiếp qua `innerHTML` mà không escape, cho phép:

1. **HTML injection:** Tag `<b>` được render thành chữ in đậm
2. **XSS (Cross-Site Scripting):** `<script>alert(1)</script>` thực thi JavaScript
3. **XSS via img onerror:** `<img src=x onerror=alert(1)>` thực thi ngay khi admin mở trang orders

Đây là lỗi **stored XSS** — payload được lưu vào DB (khi user tạo đơn hàng) và thực thi mỗi khi admin mở trang quản lý đơn hàng.

---

## Các bước tái hiện

1. Đăng nhập tài khoản user: `test@eshop.com / Test1234!`
2. Thêm sản phẩm vào giỏ → Checkout với địa chỉ giao hàng:
   ```
   <img src=x onerror=alert(document.cookie)>
   ```
3. Đăng nhập admin: `admin@eshop.com / Admin123!`
4. Vào admin panel → Tab "Đơn hàng"
5. **Kết quả thực tế:** `alert()` bắn ngay lập tức, hiển thị cookie của admin

```bash
# Tạo order với XSS payload
USER_TOKEN=<lấy token user>
curl -s -X POST http://localhost:3000/api/cart \
  -H 'Content-Type: application/json' -H "Authorization: Bearer $USER_TOKEN" \
  -d '{"id":1,"name":"iPhone","price":30000000,"quantity":1}'

curl -s -X POST http://localhost:3000/api/checkout \
  -H 'Content-Type: application/json' -H "Authorization: Bearer $USER_TOKEN" \
  -d '{"total_amount":30000000,"shipping_address":"<img src=x onerror=alert(document.cookie)>"}'

# Sau đó admin mở localhost:5174 → alert bắn
```

---

## Kết quả mong đợi

- Admin UI hiển thị địa chỉ như literal text: `<img src=x onerror=alert(1)>`
- Không có JavaScript nào được thực thi
- `innerHTML` của cell phải chứa `&lt;img src=x onerror=alert(1)&gt;` (HTML-encoded)

---

## Kết quả thực tế

| Test | Payload | Kết quả |
|------|---------|---------|
| DT-FR18-10 | `<b>Địa chỉ test</b>` | Text render in đậm; `innerHTML` = `<b>Địa chỉ test</b>` |
| DT-FR18-11 | `<img src=x onerror=alert(1)>` | Alert bắn; `<img>` trong DOM |
| BVA-FR18-05 | `<script>alert(1)</script>` | Alert bắn; `<script>` trong innerHTML |
| BVA-FR18-06 | `<img src=x onerror=alert("XSS")>` | Alert bắn với message "XSS" |

---

## Bằng chứng (Screenshots)

- [DT-FR18-10-result.png](../test-runs/FR18_AdminOrder/screenshots/DT-FR18-10-result.png) — `<b>` render thành in đậm
- [DT-FR18-11-result.png](../test-runs/FR18_AdminOrder/screenshots/DT-FR18-11-result.png) — XSS img alert bắn
- [BVA-FR18-05-result.png](../test-runs/FR18_AdminOrder/screenshots/BVA-FR18-05-result.png) — script tag thực thi
- [BVA-FR18-06-result.png](../test-runs/FR18_AdminOrder/screenshots/BVA-FR18-06-result.png) — XSS img "XSS" alert

---

## Phân tích nguyên nhân gốc

Frontend admin (React component hiển thị bảng orders) sử dụng `dangerouslySetInnerHTML` hoặc `.innerHTML` trực tiếp:

```jsx
// Code lỗi (ví dụ):
<td dangerouslySetInnerHTML={{ __html: order.shipping_address }} />
// hoặc:
tdElement.innerHTML = order.shipping_address;
```

Fix cần thiết — sử dụng textContent hoặc React render mặc định:

```jsx
// Fix đúng (React):
<td>{order.shipping_address}</td>
// hoặc JS thuần:
tdElement.textContent = order.shipping_address;
```

---

## Attack Chain với BUG-07

Kết hợp với BUG-07 (user token được chấp nhận bởi admin API), attack chain như sau:

1. User A tạo đơn với XSS payload trong địa chỉ giao hàng
2. Admin mở trang → payload thực thi → script đánh cắp `document.cookie` (session token của admin)
3. User A dùng session token của admin để gọi các API admin khác

---

## Tác động

- **Session hijacking:** Đánh cắp JWT token của admin → kiểm soát hoàn toàn admin panel
- **Data exfiltration:** Đọc toàn bộ dữ liệu hệ thống
- **Defacement:** Thay đổi giao diện admin
- **OWASP Top 10:** Injection (A03:2021) — Stored XSS

---

## Lệnh tạo GitHub Issue

```bash
gh issue create \
  --title "[BUG-08] Admin UI bị XSS: shipping_address render qua innerHTML — stored XSS thành công (vi phạm SEC-04)" \
  --body "**Mức độ:** Nghiêm trọng (Critical) | **TC:** DT-FR18-10, DT-FR18-11, BVA-FR18-05, BVA-FR18-06

## Mô tả
Admin UI render trường \`shipping_address\` (do user nhập) qua innerHTML/dangerouslySetInnerHTML.
Stored XSS: payload lưu khi user checkout, thực thi khi admin mở trang orders.

## PoC
Address khi checkout: \`<img src=x onerror=alert(document.cookie)>\`
Mở admin panel → alert bắn ngay với cookie của admin.

## Kết quả mong đợi: address hiển thị như literal text (escaped)

## Fix: dùng \`<td>{order.shipping_address}</td>\` thay vì dangerouslySetInnerHTML

## Kết hợp với BUG-07 tạo thành attack chain hoàn chỉnh (session hijack)" \
  --label "bug"
```
