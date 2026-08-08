# HW04 — Test Run Report

**StudentID:** 23127152
**Run date:** 2026-08-08
**Tool:** Playwright `@playwright/test` v1.62.1, 3 browsers (Chromium / Firefox / WebKit)
**Environment:** backend `http://localhost:3000`, frontend-web `http://localhost:5173`, frontend-admin `http://localhost:5174`
**Reports:** `23127152-hw4/reports/<feature>/<browser>/index.html` — mỗi report có banner + `<title>` "Run by: 23127152 | \<ISO timestamp\>" (mục 11, Anti-AI-Cheat)

## Tổng quan

| Feature | Test case | Browser run | Total case-runs | Pass | Fail |
|---|---|---|---|---|---|
| FR-02 — Login and Account Lockout | 13 | 3 | 39 | 36 | 3 |
| FR-10 — Order State Machine | 15 | 3 | 45 | 36 | 9 |
| FR-18 — Order Management (Admin) | 14 | 3 | 42 | 27 | 15 |
| FR-01 — Registration (smoke, ngoài phạm vi chấm điểm) | 3 | 3 | 9 | 6 | 3 |
| **Tổng (3 feature chính)** | **42** | **3** | **126** | **99** | **27** |

Toàn bộ case fail đều **fail có chủ đích** — assertion viết đúng theo spec, và mỗi lần fail trên cả 3 browser đều nhất quán (không flaky), trỏ tới một bug thật trong SUT (xem `23127152-hw4/bug-reports/`).

## FR-02 — Login and Account Lockout (12/13 pass mỗi browser)

| TC | Kết quả (cả 3 browser) | Ghi chú |
|---|---|---|
| FR02-TC01 → TC06, TC08–TC13 | ✅ PASS | |
| FR02-TC07 | ❌ FAIL | BUG-01: lock kích hoạt ở lần sai thứ 2 thay vì thứ 3 |

## FR-10 — Order State Machine (12/15 pass mỗi browser)

| TC | Kết quả (cả 3 browser) | Ghi chú |
|---|---|---|
| FR10-TC01 → TC09, TC11, TC13, TC15 | ✅ PASS | |
| FR10-TC10 | ❌ FAIL | BUG-06: `canceled → delivered` bị lọt |
| FR10-TC12 | ❌ FAIL | BUG-07: User hủy được đơn đang `shipping` |
| FR10-TC14 | ❌ FAIL | BUG-11: không kiểm tra quyền admin ở `/api/admin/*` |

## FR-18 — Order Management (Admin) (9/14 pass mỗi browser)

| TC | Kết quả (cả 3 browser) | Ghi chú |
|---|---|---|
| FR18-TC01, TC03–TC09, TC12 | ✅ PASS | |
| FR18-TC02 | ❌ FAIL | BUG-11: user thường gọi được API admin |
| FR18-TC10, TC11 | ❌ FAIL | BUG-09: doanh thu Dashboard nhân đôi |
| FR18-TC13, TC14 | ❌ FAIL | BUG-08: XSS qua `shipping_address` (dangerouslySetInnerHTML) |

## FR-01 — Registration (smoke test hạ tầng, không tính vào 3 feature chấm điểm)

| TC | Kết quả (cả 3 browser) | Ghi chú |
|---|---|---|
| FR01-SMOKE-01, FR01-SMOKE-03 | ✅ PASS | |
| FR01-SMOKE-02 | ❌ FAIL | BUG-10 (mới): đăng ký được trùng email, bảng `users` thiếu UNIQUE |

## Bug tổng hợp phát hiện qua tự động hoá HW04

| Bug ID | Feature | Trạng thái | Loại |
|---|---|---|---|
| BUG-01 | FR-02 | Reconfirmed | Logic sai (+2 thay vì +1) |
| BUG-06 | FR-10 | Reconfirmed | State machine sai (final state bị lọt) |
| BUG-07 | FR-10 | Reconfirmed | Thiếu check quyền hủy đơn |
| BUG-08 | FR-18 | Reconfirmed | XSS (dangerouslySetInnerHTML) |
| BUG-09 | FR-18 | Reconfirmed | Sai công thức tính doanh thu (×2) |
| **BUG-10** | FR-01 (smoke) | **Mới** | Thiếu UNIQUE constraint trên email |
| **BUG-11** | FR-10 & FR-18 | **Mới, Critical** | Broken Access Control — không có route nào dưới `/api/admin/*` kiểm tra `role === 'admin'` |

Chi tiết từng bug: `23127152-hw4/bug-reports/<feature>/BUG-xx.md`.

## Test case không automate được

Không có test case nào trong 42 case đã chọn phải bỏ qua — toàn bộ 42 case của FR-02/FR-10/FR-18 đều automate và chạy được trên cả 3 browser.

## Ghi chú thiết kế đáng chú ý

- **FR-10** được test hoàn toàn ở mức API (`request` fixture) thay vì click UI — vì đây là business logic thuần backend (state machine), việc dựng fixture (đơn hàng ở nhiều trạng thái khác nhau) qua API nhanh và xác định hơn nhiều so với click UI lặp lại; UI admin chỉ là các nút gọi thẳng các API này.
- **FR-18 TC10–TC12** (doanh thu Dashboard) không thể giả định DB "sạch" (nhiều test/feature dùng chung 1 database), nên được thiết kế theo kiểu **so sánh chênh lệch (delta)** trước/sau thay vì so giá trị tuyệt đối — vẫn phát hiện đúng bug ×2 bất kể đã có bao nhiêu đơn `delivered` từ trước.
- **FR-02 TC10/TC11** (email/password rỗng) ban đầu giả định sẽ gọi tới API, nhưng thực tế bị chặn bởi thuộc tính HTML `required` trên input — phải sửa lại assertion để kiểm tra hành vi chặn phía client thay vì chờ network response.
