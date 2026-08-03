# FR-18: Quản lý Đơn hàng (Admin) — Boundary Value Analysis

## 1. Xác định giá trị biên

### Biên 1: Order ID (Integer)

| Điểm biên | Giá trị | Ý nghĩa |
|-----------|---------|---------|
| Âm (invalid) | -1 | ID không thể âm |
| Zero (invalid) | 0 | ID bắt đầu từ 1 (AUTOINCREMENT) |
| Min valid | 1 | Order ID đầu tiên |
| Existing | n | Order có trong DB |
| Non-existing | 99999 | Vượt quá order có thật |
| Max SQLite int | 9223372036854775807 | Giới hạn INTEGER của SQLite |

### Biên 2: total_amount (Integer, tính revenue)

| Điểm biên | Giá trị | Ý nghĩa |
|-----------|---------|---------|
| 0 | 0 | Đơn không có giá trị |
| 1 | 1 | Giá trị tối thiểu hợp lệ (1₫) |
| Typical | 100000 | Đơn hàng bình thường |
| Large | 999999999 | Đơn hàng lớn |

### Biên 3: shipping_address (String length)

| Điểm biên | Giá trị | Ý nghĩa |
|-----------|---------|---------|
| Empty | "" | Địa chỉ rỗng |
| Single char | "A" | 1 ký tự |
| Typical | "123 Đường ABC" | Độ dài bình thường |
| Long (>255) | 256+ ký tự | Vượt giới hạn thông thường |

### Biên 4: Số lượng đơn hàng trong DB

| Điểm biên | Giá trị | Ý nghĩa |
|-----------|---------|---------|
| 0 orders | DB trống | Không có đơn nào |
| 1 order | 1 đơn | Tối thiểu |
| Many orders | 100+ đơn | Kiểm tra hiển thị |

---

## 2. Test Cases — BVA

### Nhóm BVA-1: Order ID Boundary

| TC-ID | order_id | Expected | Actual | Status |
|-------|----------|----------|--------|--------|
| BVA-FR18-01 | -1 | HTTP 404 | HTTP 404 | PASS |
| BVA-FR18-02 | 0 | HTTP 404 | HTTP 404 | PASS |
| BVA-FR18-03 | 1 (nếu tồn tại) | HTTP 200 | HTTP 200 | PASS |
| BVA-FR18-04 | 99999 (không tồn tại) | HTTP 404 | HTTP 404 | PASS |
| BVA-FR18-05 | 9999999999 (rất lớn) | HTTP 404 | HTTP 404 | PASS |

### Nhóm BVA-2: Total Amount Boundary (Dashboard Revenue)

| TC-ID | Scenario | total_amount (delivered order) | Expected Revenue | Actual Revenue | Status | Bug? |
|-------|----------|-------------------------------|-----------------|----------------|--------|------|
| BVA-FR18-06 | 0 orders delivered | — | 0₫ | 0₫ | PASS | — |
| BVA-FR18-07 | 1 order, amount=0 | 0 | 0₫ | 0₫ | PASS | — |
| BVA-FR18-08 | 1 order, amount=1 | 1 | 1₫ | 2₫ (bug *2) | FAIL | **BUG-09** |
| BVA-FR18-09 | 1 order, amount=100000 | 100000 | 100,000₫ | 200,000₫ (bug *2) | FAIL | **BUG-09** |
| BVA-FR18-10 | 2 orders delivered | 50000 + 50000 | 100,000₫ | 200,000₫ (bug *2) | FAIL | **BUG-09** |
| BVA-FR18-11 | 1 order, amount=999999999 | 999999999 | Hiển thị đúng | Nhân 2 → overflow risk | FAIL | **BUG-09** |

### Nhóm BVA-3: Shipping Address Boundary

| TC-ID | shipping_address | Expected Display | Actual | Status | Bug? |
|-------|-----------------|-----------------|--------|--------|------|
| BVA-FR18-12 | "" | Ô trống | Ô trống | PASS | — |
| BVA-FR18-13 | "A" (1 ký tự) | "A" | "A" | PASS | — |
| BVA-FR18-14 | 255 ký tự bình thường | Hiển thị đủ | Hiển thị đủ | PASS | — |
| BVA-FR18-15 | `<b>test</b>` (HTML tag) | Hiển thị `<b>test</b>` dạng text | Render `test` đậm | FAIL | **BUG-08** |
| BVA-FR18-16 | `<script>alert(1)</script>` | Không thực thi | Thực thi script | FAIL | **BUG-08** |
| BVA-FR18-17 | 256+ ký tự | Hiển thị đủ hoặc truncate | Hiển thị đủ (TEXT field) | PASS | — |

### Nhóm BVA-4: Orders Count Boundary (List Display)

| TC-ID | Orders Count | Expected | Actual | Status |
|-------|-------------|----------|--------|--------|
| BVA-FR18-18 | 0 orders trong DB | List rỗng, không lỗi | [] | PASS |
| BVA-FR18-19 | 1 order | 1 row trong table | 1 row | PASS |
| BVA-FR18-20 | 100+ orders | Tất cả hiển thị (no pagination) | Hiển thị tất cả | PASS (minor: no pagination) |

---

## 3. Tổng kết BVA

| Nhóm | TC Count | PASS | FAIL | Bug |
|------|----------|------|------|-----|
| Order ID Boundary | 5 | 5 | 0 | — |
| Total Amount / Revenue | 6 | 2 | 4 | BUG-09 |
| Shipping Address | 6 | 4 | 2 | BUG-08 |
| Orders Count | 3 | 3 | 0 | — |
| **Tổng** | **20** | **14** | **6** | **2 bugs** |

---

## 4. AI Gap Analysis — BVA

**AI phát hiện được:**
- Order ID boundary (0, âm, không tồn tại)
- Shipping address rỗng

**AI bỏ sót:**
- Không đề xuất test **XSS payload** trong shipping_address — đây là security testing boundary mà AI cần được nhắc rõ
- Không phát hiện **revenue * 2 bug** vì không đọc frontend code
- Không đề xuất **boundary kết hợp** giữa status filter và revenue calculation (chỉ tính delivered, không phải tất cả)

**Lý do:** AI không có context về frontend code khi chỉ được yêu cầu test API. Cần cung cấp cả frontend code để AI phát hiện XSS và UI calculation bugs.
