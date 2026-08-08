# BUG-14: Missing Role-Based Access Control on All Admin Endpoints (reconfirmed, HW04)

## Thông tin

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-14 (giữ nguyên số hiệu từ HW02 — **không phải bug mới**) |
| Feature | FR-12 / FR-18 / FR-10 |
| Severity | Critical (Broken Access Control — OWASP A01:2021) |
| Priority | P0 |
| Status | Open — đã phát hiện từ HW02 (`tests/HW02/bug-reports/BUG-14.md`, session 4, 2026-06-27) |
| File:Line | `backend/server.js:100-110` (middleware `authenticateToken`), áp dụng cho toàn bộ route `/api/admin/*` |

## ⚠️ Ghi chú sửa lỗi (self-correction)

Ở một bản nháp trước của báo cáo HW04, bug này từng bị ghi nhầm là **"BUG-11 — mới phát hiện"**. Sau khi rà lại toàn bộ `tests/HW02/bug-reports/` (14 file), xác nhận đây **chính là BUG-14 đã có sẵn từ HW02** — chỉ đơn thuần được tái xác nhận (reconfirm) ở HW04 bằng automation mới, không phải phát hiện độc lập. Đã cập nhật lại số hiệu và toàn bộ tham chiếu trong `test-run-report.md` / `traceability-matrix.md` cho khớp.

## Mô tả

Middleware `authenticateToken` chỉ xác minh JWT hợp lệ, **không kiểm tra `req.user.role === 'admin'`**. Mọi route `/api/admin/*` (orders, users, coupons, products...) chỉ dùng middleware này → **bất kỳ user thường nào cũng gọi được toàn bộ API admin**.

## Vì sao KHÔNG automate lại được qua UI thuần ở HW04 (giống trường hợp BUG-08)

HW04 yêu cầu automation phải đi qua UI thật, không gọi thẳng API. Khi thử tái hiện bug này 100% qua UI:

1. Đăng nhập vào Admin Panel (`localhost:5174`) bằng tài khoản **user thường** (`test@eshop.com`).
2. `frontend-admin/src/App.jsx:67-69` có sẵn một **role check phía client**:
   ```jsx
   if (res.data.user.role !== "admin") {
     alert("Bạn không phải là admin!");
     return; // không set token, không vào được dashboard
   }
   ```
3. Vì vậy, đăng nhập qua UI **bị chặn đúng** — dashboard không bao giờ render cho user thường, dù backend phía sau vẫn hoàn toàn không kiểm tra gì.

→ Lớp UI tạo cảm giác an toàn giả (security theater): client tự chặn, nhưng đây **không phải cơ chế bảo mật thật** vì API vẫn mở hoàn toàn nếu gọi trực tiếp (bằng Postman, curl, hoặc một client khác không đi qua `frontend-admin`). Do đó bug **vẫn hoàn toàn có thật và nghiêm trọng**, chỉ là không thể minh hoạ lại bằng automation UI-only theo đúng ràng buộc của HW04.

Xem `e2e/fr10-orderstate/fr10-orderstate.spec.ts` (case `FR10-TC14`) và `e2e/fr18-ordermanagement/fr18-ordermanagement.spec.ts` (case `FR18-TC02`) — cả 2 test này **PASS**, vì chúng chỉ xác minh đúng hành vi của lớp chặn phía client, không chạm được tới lỗ hổng thật ở backend.

## Bằng chứng gốc (HW02, qua API — vẫn còn giá trị tham khảo)

Xem đầy đủ tại `tests/HW02/bug-reports/BUG-14.md`:

```bash
curl -H "Authorization: Bearer <USER_TOKEN>" http://localhost:3000/api/admin/orders
# Trả về HTTP 200 với TOÀN BỘ đơn hàng — thay vì 403 theo spec
```

## Đề xuất Fix

```javascript
const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
};
// Áp dụng cho mọi route /api/admin/*, không chỉ dựa vào check phía client.
```

## Bài học phương pháp luận

Việc UI có sẵn 1 lớp chặn (dù không phải cơ chế bảo mật thật) khiến automation UI-only **không phát hiện lại được** một lỗ hổng backend nghiêm trọng đã biết. Đây là lý do vì sao kiểm thử bảo mật/authorization không nên chỉ dựa vào automation UI — cần bổ sung kiểm thử API trực tiếp (nằm ngoài phạm vi automation UI-only của HW04 lần này, nhưng đã được HW02 thực hiện và vẫn còn giá trị).
