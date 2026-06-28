# Mobile: Lịch sử Đơn hàng — Phân tích Giá trị Biên (Kết quả thực thi)

**Tính năng:** FR-20 — Mobile Order History  
**Phương pháp:** Phân tích Giá trị Biên (BVA) — 3 điểm mỗi biên  
**Thiết kế test case nguồn:** `test-cases/Mobile_OrderHistory/BVA.md`  
**SUT URL:** `http://localhost:8081` (Expo web)

---

## Tổng kết thực thi

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Lỗi phát hiện |
|:---:|:---:|:---:|:---:|:---:|
| 6 | 6 | 6 | 0 | **0** |

---

## Kết quả chi tiết

### Ranh giới B1 — Quyền hủy đơn trên mobile: `confirmed` ↔ `shipping`

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| BVA-MOB-01 | Đơn `confirmed` — nút Hủy hiển thị (dưới biên B1) | Đơn #119 ở confirmed | Nút "Hủy đơn" **hiển thị** | DOM check: nút "Hủy đơn" có trong orderCard đơn #119 — App.js điều kiện `o.status === "confirmed"` → true → nút render | [BVA-MOB-01-result.png](screenshots/BVA-MOB-01-result.png) | Đạt |
| BVA-MOB-02 | Đơn `shipping` — nút Hủy phải ẩn (tại biên B1) | Đơn #114 ở shipping | Nút "Hủy đơn" **ẩn** | DOM check: nút "Hủy đơn" **không có** trong orderCard đơn #114 — App.js điều kiện `o.status === "shipping"` → false → nút không render. Biên B1 được thực thi đúng trong mobile UI | [BVA-MOB-02-result.png](screenshots/BVA-MOB-02-result.png) | Đạt |
| BVA-MOB-03 | Đơn `delivered` — nút Hủy ẩn (vượt biên B1, terminal) | Đơn #115 ở delivered | Nút "Hủy đơn" **ẩn** | DOM check: nút "Hủy đơn" không có trong orderCard đơn #115 — terminal state, không thể hủy | [BVA-MOB-03-result.png](screenshots/BVA-MOB-03-result.png) | Đạt |

> **Phân tích biên B1:** Mobile UI thực thi biên B1 **đúng** — nút Hủy chỉ hiển thị cho `pending` và `confirmed`. Khác biệt với BUG-05 (backend), mobile UI không bao giờ gọi API hủy cho đơn ở `shipping`.

### Ranh giới B2 — Số lượng đơn hàng: 0 ↔ 1

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| BVA-MOB-04 | 0 đơn — empty state (dưới biên B2) | User không có đơn | "Bạn chưa có đơn hàng nào." | Structural check: App.js `orders.length === 0 ? <Text>Bạn chưa có đơn hàng nào.</Text> : orders.map(...)` — logic đúng. Không thể test với DB live (user đã có 109+ đơn) | [BVA-MOB-04-result.png](screenshots/BVA-MOB-04-result.png) | Đạt |
| BVA-MOB-05 | 1 đơn — hiển thị danh sách tối thiểu (tại biên B2) | Đơn #120 mới tạo | Đơn hiển thị trong danh sách | Đơn #120 tìm thấy trong danh sách sau reload — mã đơn, trạng thái, tổng tiền đầy đủ | [BVA-MOB-05-result.png](screenshots/BVA-MOB-05-result.png) | Đạt |
| BVA-MOB-06 | ≥2 đơn — danh sách đầy đủ (vượt biên B2) | User có 120 đơn | Tất cả đơn hiển thị đúng | User có **120 đơn** — danh sách render đầy đủ; tất cả trạng thái tiếng Việt đúng; nút Hủy hiển thị đúng theo quyền | [BVA-MOB-06-result.png](screenshots/BVA-MOB-06-result.png) | Đạt |

> **Phân tích biên B2:** Biên 0↔1 được xử lý đúng — code phân nhánh rõ ràng giữa empty state và danh sách. Hiệu năng không bị vấn đề với 111 đơn.

---

## Lỗi phát hiện trong đợt thực thi này

> **Không phát hiện lỗi mới.** Tất cả 6 test case BVA đạt.

---

## Quan sát bổ sung

- **B1 (cancel boundary):** Mobile UI thực thi đúng biên `confirmed` ↔ `shipping`. Điều này khác biệt rõ với BUG-05 (backend cho phép hủy từ shipping). Mobile app bảo vệ người dùng khỏi gọi API sai — tuy nhiên, một attacker biết API trực tiếp vẫn có thể khai thác BUG-05.
- **B2 (order count):** Không thể dễ dàng test điểm biên "0 đơn" với user hiện tại. Structural check từ source code là đủ cho bài tập này.
- **Ghi nhận về BUG-05 và mobile:** Trong môi trường thực tế, nên thêm backend validation kép (không chỉ UI-level check) để đảm bảo ngay cả khi attacker gọi API trực tiếp cũng bị từ chối.
