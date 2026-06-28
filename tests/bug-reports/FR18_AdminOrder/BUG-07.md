# BUG-07: `GET /api/admin/orders` chấp nhận User Token — rò rỉ toàn bộ dữ liệu đơn hàng

**Mã lỗi:** BUG-07  
**Mức độ nghiêm trọng:** Cao  
**Ưu tiên:** P1  
**Phát hiện bởi:** Playwright automated test — FR-18 Domain Testing & BVA  
**Ngày phát hiện:** 2026-06-28  
**Test case liên quan:** DT-FR18-02, BVA-FR18-02  
**Trạng thái:** Mở

---

## Mô tả

Đặc tả FR-12 và SEC-03 quy định: **"API Admin (`/api/admin/*`) phải yêu cầu cả token JWT hợp lệ VÀ `role = 'admin'` trong token"**. Tuy nhiên, endpoint `GET /api/admin/orders` chỉ kiểm tra sự tồn tại của token mà KHÔNG kiểm tra role:

- Không có token → HTTP 401 (đúng)
- User token (role=user) → HTTP **200** + toàn bộ dữ liệu đơn hàng (SAI — vi phạm SEC-03)
- Admin token (role=admin) → HTTP 200 (đúng)

Kết quả: bất kỳ user đã đăng nhập nào cũng có thể xem địa chỉ giao hàng, tổng tiền, lịch sử mua hàng của **tất cả user khác** trong hệ thống.

---

## Các bước tái hiện

1. Đăng nhập tài khoản user thường: `test@eshop.com / Test1234!` → lấy JWT token
2. Gọi API: `GET http://localhost:3000/api/admin/orders` với header `Authorization: Bearer <user_token>`
3. **Kết quả thực tế:** HTTP 200 — trả về mảng đầy đủ tất cả đơn hàng của mọi user

```bash
# Tái hiện bằng curl
USER_TOKEN=$(curl -s -X POST http://localhost:3000/api/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@eshop.com","password":"Test1234!"}' | jq -r .token)

curl -s http://localhost:3000/api/admin/orders \
  -H "Authorization: Bearer $USER_TOKEN" | jq length
# Kết quả: 84 (số lượng đơn hàng của tất cả users)
```

---

## Kết quả mong đợi

- `GET /api/admin/orders` với user token → HTTP **403** `{"error":"Forbidden: admin access required"}`
- Không trả về bất kỳ dữ liệu nào

---

## Kết quả thực tế

- HTTP **200**
- Trả về toàn bộ đơn hàng của tất cả users (84+ records)
- Mỗi record bao gồm: `user_id`, `total_amount`, `shipping_address`, `status`, `created_at`

---

## Bằng chứng (Screenshots)

- [DT-FR18-02-result.png](../test-runs/FR18_AdminOrder/screenshots/DT-FR18-02-result.png) — API response với user token → 200
- [BVA-FR18-02-result.png](../test-runs/FR18_AdminOrder/screenshots/BVA-FR18-02-result.png) — Xác nhận tại biên B1

---

## Phân tích nguyên nhân gốc

Middleware kiểm tra authentication ở `/api/admin/orders` chỉ verify token hợp lệ (chữ ký JWT đúng) nhưng không extract và kiểm tra field `role` trong payload. Code cần thêm:

```javascript
// Hiện tại (sai):
if (!token || !verifyJWT(token)) return res.status(401).json(...)

// Cần sửa thành:
const decoded = verifyJWT(token);
if (!decoded) return res.status(401).json(...);
if (decoded.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
```

---

## Tác động

- **Data breach:** Địa chỉ nhà, số tiền giao dịch của tất cả khách hàng bị lộ cho bất kỳ user nào
- **Privacy violation:** Vi phạm nguyên tắc least privilege — user không được biết thông tin của user khác
- **OWASP Top 10:** Broken Access Control (A01:2021)

---

## Lệnh tạo GitHub Issue

```bash
gh issue create \
  --title "[BUG-07] GET /api/admin/orders chấp nhận user token — rò rỉ toàn bộ dữ liệu đơn hàng (vi phạm SEC-03)" \
  --body "**Mức độ:** Cao | **TC liên quan:** DT-FR18-02, BVA-FR18-02

## Mô tả
\`GET /api/admin/orders\` trả về HTTP 200 khi gọi bằng user token (role=user).
Vi phạm SEC-03: API Admin phải kiểm tra \`role = 'admin'\` trong Token.

## Các bước tái hiện
1. Đăng nhập user thường → lấy token
2. GET /api/admin/orders với user token → HTTP 200 + toàn bộ dữ liệu

## Kết quả mong đợi: HTTP 403 Forbidden

## Fix: thêm role check sau JWT verify trong admin middleware" \
  --label "bug"
```
