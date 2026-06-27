# Mobile — Lịch sử Đơn hàng — Boundary Value Analysis

## 1. Xác định giá trị biên

### Biên 1: Số lượng đơn hàng (List Count)

| Điểm biên | Giá trị | Ý nghĩa |
|-----------|---------|---------|
| 0 | 0 đơn | Empty state |
| 1 | 1 đơn | Tối thiểu hiển thị |
| Typical | 5–20 đơn | Sử dụng bình thường |
| Large | 100+ đơn | Không có pagination |

### Biên 2: total_amount (Integer, đơn vị VND)

| Điểm biên | Giá trị | Ý nghĩa |
|-----------|---------|---------|
| 0 | 0₫ | Đơn miễn phí |
| 1 | 1₫ | Giá trị tối thiểu dương |
| Typical | 100,000₫ | Đơn hàng bình thường |
| Large | 1,000,000,000₫ | Đơn hàng lớn (1 tỷ) |
| Max safe JS int | 9,007,199,254,740,991 | Giới hạn JavaScript Number |

### Biên 3: created_at (DateTime string)

| Điểm biên | Giá trị | Ý nghĩa |
|-----------|---------|---------|
| null / undefined | null | Không có ngày |
| Empty | "" | Chuỗi rỗng |
| Valid ISO | "2025-01-01T00:00:00Z" | Định dạng chuẩn |
| Invalid format | "not-a-date" | Chuỗi không phải date |

### Biên 4: Cancel Permission (Status Boundary)

| Điểm biên | Status | Can Cancel (spec) |
|-----------|--------|------------------|
| Last cancellable | confirmed | YES |
| First non-cancellable | shipping | NO |

---

## 2. Test Cases — BVA

### Nhóm BVA-1: Order List Count Boundary

| TC-ID | Orders Count | Expected | Actual | Status | Bug? |
|-------|-------------|----------|--------|--------|------|
| BVA-MOB-01 | 0 đơn hàng | "Bạn chưa có đơn hàng nào." — không crash | Đúng | PASS | — |
| BVA-MOB-02 | 1 đơn hàng (boundary) | Hiển thị 1 card, đầy đủ thông tin | Đúng | PASS | — |
| BVA-MOB-03 | 2 đơn hàng | Hiển thị 2 card, đúng thứ tự mới nhất | Đúng | PASS | — |
| BVA-MOB-04 | 50+ đơn hàng | Tất cả hiển thị (scroll), không pagination | Hiển thị đủ nhưng không có phân trang | PASS (minor: no pagination) | BUG-12 |

### Nhóm BVA-2: Total Amount Boundary

| TC-ID | total_amount | Expected Display | Actual | Status | Bug? |
|-------|-------------|-----------------|--------|--------|------|
| BVA-MOB-05 | 0 | "0 ₫" hoặc "0đ" | Đúng (formatMoney(0)) | PASS | — |
| BVA-MOB-06 | 1 | "1 ₫" | Đúng | PASS | — |
| BVA-MOB-07 | 999 | "999 ₫" | Đúng | PASS | — |
| BVA-MOB-08 | 1000 | "1.000 ₫" (phân cách nghìn) | Đúng (formatMoney dùng toLocaleString) | PASS | — |
| BVA-MOB-09 | 1000000000 | "1.000.000.000 ₫" | Kiểm tra không overflow | PASS | — |
| BVA-MOB-10 | null / undefined | "0 ₫" (vì code: `formatMoney(o.total_amount \|\| 0)`) | Hiển thị "0 ₫" | PASS | — |

### Nhóm BVA-3: Created_at Boundary

| TC-ID | created_at | Expected | Actual | Status | Bug? |
|-------|-----------|----------|--------|--------|------|
| BVA-MOB-11 | null | Hiển thị trống "", không crash | Hiển thị "" (code: `o.created_at ? ... : ""`) | PASS | — |
| BVA-MOB-12 | "" (empty string) | Hiển thị trống | Hiển thị "" (truthy check fails) | PASS | — |
| BVA-MOB-13 | "2025-01-01T00:00:00.000Z" | Ngày hợp lệ | new Date("2025-01-01...").toLocaleDateString() → đúng | PASS | — |
| BVA-MOB-14 | "not-a-date" | Hiển thị "Invalid Date" hoặc trống | `new Date("not-a-date").toLocaleDateString()` → "Invalid Date" | FAIL (minor) | Minor |
| BVA-MOB-15 | "2025-13-01" (tháng 13) | Xử lý gracefully | Có thể ra "Invalid Date" | FAIL (minor) | Minor |

### Nhóm BVA-4: Cancel Permission Boundary (Status)

| TC-ID | Status | User Action | Expected (spec) | Actual | Status | Bug? |
|-------|--------|-------------|-----------------|--------|--------|------|
| BVA-MOB-16 | confirmed (last cancellable) | Nhấn "Hủy đơn" trên mobile | Cancel thành công | HTTP 200, cancel OK | PASS | — |
| BVA-MOB-17 | shipping (first non-cancellable per spec) | UI: không có nút | Nút ẩn | Nút ẩn đúng | PASS (UI) | — |
| BVA-MOB-18 | shipping (boundary) | Gọi API trực tiếp PUT /orders/:id/cancel | HTTP 400 (spec) | HTTP 200 (backend bug) | FAIL | **BUG-11** |
| BVA-MOB-19 | delivered (past boundary) | UI: không có nút | Nút ẩn | Nút ẩn đúng | PASS | — |
| BVA-MOB-20 | delivered | Gọi API trực tiếp | HTTP 400 | HTTP 400 | PASS | — |

---

## 3. Tổng kết BVA

| Nhóm | TC Count | PASS | FAIL | Bug |
|------|----------|------|------|-----|
| Order List Count | 4 | 4 | 0 | BUG-12 (minor) |
| Total Amount | 6 | 6 | 0 | — |
| Created_at Date | 5 | 3 | 2 | Minor |
| Cancel Permission | 5 | 4 | 1 | BUG-11 |
| **Tổng** | **20** | **17** | **3** | **1 major bug** |

---

## 4. Screenshots từ Playwright

**BVA-MOB-01 — 0 đơn hàng (empty state):**
```
API: GET /api/orders/my-orders → HTTP 200, [] (empty array)
```

**BVA-MOB-02 — 1 đơn hàng (boundary):**

Web order list với 1 order (mobile viewport):
![1 Order Boundary](../playwright-tests/screenshots/Mobile/MOB-02-profile-orders.png)

**BVA — Cancel permission boundary (BUG-11):**

Nút Hủy hiện cho pending/confirmed (UI đúng):
![Cancel Buttons](../playwright-tests/screenshots/Mobile/MOB-03-cancel-buttons.png)

Sau khi user cancel đơn shipping qua API (backend sai):
![After Cancel BVA](../playwright-tests/screenshots/Mobile/MOB-04-after-cancel.png)

*Playwright script: `playwright-tests/mobile-order-history.spec.js` (mobile viewport: 390×844)*

---

## 5. AI Gap Analysis — BVA

**AI phát hiện được:**
- Boundary 0 orders (empty state)
- Boundary total_amount = 0 và giá trị lớn
- Cancel permission boundary (confirmed vs shipping)

**AI bỏ sót:**
- Không đề xuất test **created_at = "not-a-date"** — AI biết cần test invalid dates nhưng bỏ qua giá trị format sai cụ thể
- Không đề xuất test **API bypass** tại cancel boundary — đây là security-conscious BVA mà AI không tự suy ra
- Không đề xuất test **total_amount = null** khi từ API response có thể không đủ fields

**Lý do:** AI tập trung vào happy path boundaries. Security boundaries (bypass UI via API) và data integrity boundaries (null fields từ API) cần được thêm thủ công sau khi review code.
