# FR-10: Trạng thái Đơn hàng (Order State Machine) — Boundary Value Analysis

## 1. Xác định giá trị biên

### Biên 1: Tập hợp trạng thái hợp lệ (Status Enum Boundary)

Hệ thống chỉ có **5 giá trị hợp lệ** cho `status`. Biên của tập này là:
- Các giá trị đúng trong tập: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`
- Các giá trị ngoài tập: bất kỳ string nào khác

### Biên 2: Order ID (Integer Boundary)

| Điểm biên | Giá trị | Ý nghĩa |
|-----------|---------|---------|
| min - 1 | 0 | Không có order với id=0 |
| min valid | 1 | Order đầu tiên có thể tồn tại |
| existing | n | Order tồn tại trong DB |
| non-existing | 99999 | Order không tồn tại |
| negative | -1 | ID âm, không hợp lệ |

### Biên 3: Chuỗi Status (String Boundary)

| Điểm biên | Giá trị | Ý nghĩa |
|-----------|---------|---------|
| Empty string | "" | Không có giá trị |
| Null | null | Thiếu field |
| Min length valid | "pending" (7 ký tự) | Trạng thái ngắn nhất hợp lệ |
| Max length valid | "confirmed" (9 ký tự) | Trạng thái dài nhất hợp lệ |
| Just over valid | "canceled!" (có ký tự thừa) | Ngoài tập hợp lệ |

---

## 2. Test Cases — BVA

### Nhóm BVA-1: Order ID Boundary

| TC-ID | order_id | Action | Expected | Actual | Status |
|-------|----------|--------|----------|--------|--------|
| BVA-FR10-01 | 0 | PUT /api/admin/orders/0/status | HTTP 404, "Order not found" | HTTP 404 | PASS |
| BVA-FR10-02 | -1 | PUT /api/admin/orders/-1/status | HTTP 404 hoặc 400 | HTTP 404 | PASS |
| BVA-FR10-03 | 1 (nếu tồn tại) | PUT /api/admin/orders/1/status | HTTP 200, cập nhật được | HTTP 200 | PASS |
| BVA-FR10-04 | 99999 (không tồn tại) | PUT /api/admin/orders/99999/status | HTTP 404, "Order not found" | HTTP 404 | PASS |
| BVA-FR10-05 | "abc" (non-integer) | PUT /api/admin/orders/abc/status | HTTP 404 hoặc 400 | HTTP 404 (SQLite coercion) | PASS |

### Nhóm BVA-2: Status String Boundary

| TC-ID | Scenario | new_status | Expected | Actual | Status |
|-------|----------|------------|----------|--------|--------|
| BVA-FR10-06 | Status rỗng | "" | HTTP 400, invalid transition | HTTP 400 | PASS |
| BVA-FR10-07 | Status null (không gửi body) | null | HTTP 400 hoặc 500 | HTTP 500 (thiếu validation) | FAIL (minor) |
| BVA-FR10-08 | Status uppercase | "PENDING" | HTTP 400 | HTTP 400 | PASS |
| BVA-FR10-09 | Status một ký tự | "p" | HTTP 400 | HTTP 400 | PASS |
| BVA-FR10-10 | Status dài nhưng sai | "pendinggg" | HTTP 400 | HTTP 400 | PASS |
| BVA-FR10-11 | Status hợp lệ nhưng sai transition | "pending" (từ delivered) | HTTP 400 | HTTP 400 | PASS |
| BVA-FR10-12 | Status ngoài enum | "returned" | HTTP 400 | HTTP 400 | PASS |
| BVA-FR10-13 | Status chứa khoảng trắng | " pending" | HTTP 400 | HTTP 400 | PASS |

### Nhóm BVA-3: Final State Boundary

Kiểm tra biên của final states (`delivered` và `canceled`):

| TC-ID | Scenario | From | To | Expected | Actual | Status | Bug? |
|-------|----------|------|----|----------|--------|--------|------|
| BVA-FR10-14 | Chuyển đổi ĐẦU TIÊN ra khỏi delivered | delivered | pending | HTTP 400 | HTTP 400 | PASS | — |
| BVA-FR10-15 | Chuyển đổi ĐẦU TIÊN ra khỏi canceled | canceled | pending | HTTP 400 | HTTP 400 | PASS | — |
| BVA-FR10-16 | canceled → delivered (boundary case) | canceled | delivered | HTTP 400 (final state) | HTTP 200 (BUG) | FAIL | **BUG-06** |
| BVA-FR10-17 | Bước ngay trước final state | shipping | delivered | HTTP 200, last valid transition | HTTP 200 | PASS | — |
| BVA-FR10-18 | Bước ngay trước final state (cancel) | confirmed | canceled | HTTP 200 | HTTP 200 | PASS | — |

### Nhóm BVA-4: User Cancel Shipping (Permission Boundary)

| TC-ID | Status | User Action | Expected | Actual | Status | Bug? |
|-------|--------|-------------|----------|--------|--------|------|
| BVA-FR10-19 | confirmed (boundary có thể cancel) | User cancel | HTTP 200, cancel OK | HTTP 200 | PASS | — |
| BVA-FR10-20 | shipping (boundary KHÔNG được cancel) | User cancel | HTTP 400, forbidden | HTTP 200 (BUG) | FAIL | **BUG-07** |
| BVA-FR10-21 | delivered (cannot cancel) | User cancel | HTTP 400 | HTTP 400 | PASS | — |

---

## 3. Tổng kết BVA

| Nhóm | TC Count | PASS | FAIL | Bug |
|------|----------|------|------|-----|
| Order ID Boundary | 5 | 5 | 0 | — |
| Status String Boundary | 8 | 7 | 1 | Minor |
| Final State Boundary | 5 | 4 | 1 | BUG-06 |
| User Cancel Boundary | 3 | 2 | 1 | BUG-07 |
| **Tổng** | **21** | **18** | **3** | **2 bugs** |

---

## 4. AI Gap Analysis — BVA

**AI phát hiện được:**
- Order ID boundary (0, âm, không tồn tại)
- Status string ngoài tập hợp lệ

**AI bỏ sót:**
- Không đề xuất kiểm tra chính xác **boundary giữa confirmed và shipping** đối với user cancellation (BVA-FR10-19 vs BVA-FR10-20)
- Không đề xuất test **canceled → delivered** (BUG-06) vì đây là transition chỉ tồn tại trong code, không trong spec

**Lý do:** AI hoạt động dựa trên spec — khi spec nói `canceled` là final state, AI không tự suy ra rằng code có thể implement sai. Chỉ khi được yêu cầu đọc code trực tiếp, AI mới phát hiện được lỗi này.
