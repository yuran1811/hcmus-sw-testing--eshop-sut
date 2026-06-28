# FR-10: Trạng thái Đơn hàng — Phân tích Giá trị Biên (Kết quả thực thi)

**Tính năng:** FR-10 — Order State Machine  
**Phương pháp:** Phân tích Giá trị Biên (BVA) — 3 điểm mỗi biên  
**Thiết kế test case nguồn:** `test-cases/FR10_OrderState/BVA.md`  

---

## Tổng kết thực thi

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Lỗi phát hiện |
|:---:|:---:|:---:|:---:|:---:|
| 8 | 8 | 7 | 1 | **1** |

---

## Kết quả chi tiết

### Ranh giới B1 — Quyền hủy của User: `confirmed` (có thể) ↔ `shipping` (không thể)

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| BVA-FR10-01 | User hủy đơn ở **pending** (dưới biên B1 — trước confirmed) | Đơn hàng user ở `pending` | Hủy thành công; HTTP 200; chuyển sang `canceled` | Nút "Hủy đơn" hiển thị đúng trên /profile — Nhấn thành công — Trạng thái sau: `canceled` | [BVA-FR10-01-before.png](screenshots/BVA-FR10-01-before.png) [BVA-FR10-01-result.png](screenshots/BVA-FR10-01-result.png) | Đạt |
| BVA-FR10-02 | User hủy đơn ở **confirmed** (tại biên trên B1 — trạng thái cuối user có thể hủy) | Đơn hàng user ở `confirmed` | Hủy thành công; HTTP 200; chuyển sang `canceled` | Nút "Hủy đơn" hiển thị đúng — Nhấn thành công — Trạng thái sau: `canceled` | [BVA-FR10-02-before.png](screenshots/BVA-FR10-02-before.png) [BVA-FR10-02-result.png](screenshots/BVA-FR10-02-result.png) | Đạt |
| BVA-FR10-03 | User hủy đơn ở **shipping** (vượt biên B1 — trạng thái đầu tiên user không được hủy) | Đơn hàng user ở `shipping` | Từ chối; nút ẩn trên UI; API 4xx; không chuyển sang `canceled` | Nút "Hủy đơn" **VẪN HIỂN THỊ** cho đơn ở `shipping` trên /profile. API `PUT /api/orders/:id/cancel` trả về HTTP 200 và hủy thành công. Trạng thái sau: `canceled` → Xác nhận **BUG-05** tại điểm biên B1 | [BVA-FR10-03-before.png](screenshots/BVA-FR10-03-before.png) [BVA-FR10-03-result.png](screenshots/BVA-FR10-03-result.png) | Không đạt |

> **Phân tích biên B1:** Hệ thống không phân biệt `confirmed` (được phép) và `shipping` (không được phép) cho user cancel. Biên B1 bị vi phạm hoàn toàn — user có thể hủy tại cả ba điểm dưới, tại, và vượt biên.

### Ranh giới B2 — Trạng thái cuối Admin có thể chuyển tiếp: `shipping` → `delivered`

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| BVA-FR10-04 | Admin: **confirmed** → shipping (dưới biên B2 — trước shipping) | Đơn hàng ở `confirmed` | Chuyển thành công sang `shipping`; HTTP 200 | Nhấn nút "Giao hàng" trên admin UI thành công — Trạng thái sau: `shipping` | [BVA-FR10-04-before.png](screenshots/BVA-FR10-04-before.png) [BVA-FR10-04-result.png](screenshots/BVA-FR10-04-result.png) | Đạt |
| BVA-FR10-05 | Admin: **shipping** → delivered (tại biên B2 — vào terminal `delivered`) | Đơn hàng ở `shipping` | Chuyển thành công sang `delivered`; vào terminal; HTTP 200 | Nhấn nút "Hoàn thành" trên admin UI thành công — Trạng thái sau: `delivered`; admin UI không còn nút hành động | [BVA-FR10-05-before.png](screenshots/BVA-FR10-05-before.png) [BVA-FR10-05-result.png](screenshots/BVA-FR10-05-result.png) | Đạt |
| BVA-FR10-06 | Admin: **delivered** → confirmed (vượt biên B2 — từ terminal `delivered`) | Đơn hàng ở `delivered` (terminal) | Từ chối; HTTP 4xx; không chuyển từ terminal | Admin UI không hiển thị nút hành động cho `delivered`. API: HTTP 400 `{"error":"Invalid state transition from delivered..."}`. Trạng thái vẫn `delivered` | [BVA-FR10-06-before.png](screenshots/BVA-FR10-06-before.png) [BVA-FR10-06-result.png](screenshots/BVA-FR10-06-result.png) | Đạt |

> **Phân tích biên B2:** Biên được thực thi đúng. Hệ thống cho phép chuyển tiếp đến terminal `delivered` nhưng từ chối mọi thao tác từ terminal.

### Ranh giới B3 — Trạng thái terminal `canceled`

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| BVA-FR10-07 | Admin: confirmed → **canceled** (tại biên B3 — vào terminal `canceled`) | Đơn hàng ở `confirmed` | Hủy thành công; HTTP 200; chuyển sang `canceled` (terminal) | Nhấn nút "Hủy" trên admin UI thành công — Trạng thái sau: `canceled` | [BVA-FR10-07-before.png](screenshots/BVA-FR10-07-before.png) [BVA-FR10-07-result.png](screenshots/BVA-FR10-07-result.png) | Đạt |
| BVA-FR10-08 | Admin: **canceled** → confirmed (vượt biên B3 — từ terminal `canceled`) | Đơn hàng ở `canceled` (terminal) | Từ chối; HTTP 4xx; không chuyển từ terminal | Admin UI hiển thị "Đánh dấu Đã giao" (lỗi UI nhỏ — sai nhãn). API: HTTP 400 `{"error":"Invalid state transition from canceled..."}`. Trạng thái vẫn `canceled` — backend xử lý đúng | [BVA-FR10-08-before.png](screenshots/BVA-FR10-08-before.png) [BVA-FR10-08-result.png](screenshots/BVA-FR10-08-result.png) | Đạt |

> **Phân tích biên B3:** Biên `canceled` được bảo vệ đúng bởi backend. Lưu ý lỗi UI nhỏ ở BVA-08: đơn `canceled` vẫn hiển thị nút "Đánh dấu Đã giao" — nút này không có tác dụng (API từ chối) nhưng gây nhầm lẫn cho người dùng.

---

## Lỗi phát hiện trong đợt thực thi này

| Mã lỗi | Mã TC liên quan | Mức độ | Mô tả ngắn |
|--------|----------------|--------|-----------|
| BUG-05 | BVA-FR10-03, DT-FR10-11 | Cao | Biên B1 bị vi phạm: User được phép hủy đơn ở `shipping` — cả UI lẫn API đều sai |

> Lỗi BUG-06 (Admin không hủy được từ shipping) đã phát hiện tại DT-FR10-06 và không kiểm thử lại ở BVA vì biên B1 chỉ tập trung vào quyền của User.

---

## Quan sát bổ sung

- **Biên B1 (User cancel):** Hệ thống không enforce giới hạn `confirmed` vs `shipping` cho user cancel — biên không tồn tại trong thực tế.
- **Biên B2 (Admin forward):** Hoạt động đúng — luồng forward tuần tự được bảo vệ nghiêm ngặt.
- **Biên B3 (canceled terminal):** Backend đúng, nhưng UI có lỗi nhỏ về nhãn nút.
- **BVA-03 vs DT-11:** Cùng phát hiện BUG-05 từ góc độ khác nhau (boundary test vs equivalence class test).
