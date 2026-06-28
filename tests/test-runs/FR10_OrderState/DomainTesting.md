# FR-10: Trạng thái Đơn hàng — Kiểm thử Miền (Kết quả thực thi)

**Tính năng:** FR-10 — Order State Machine  
**Phương pháp:** Kiểm thử Miền — Phân vùng tương đương  
**Thiết kế test case nguồn:** `test-cases/FR10_OrderState/DomainTesting.md`  
**Tài khoản thử nghiệm:** `admin@eshop.com / Admin123!` · `test@eshop.com / Test1234!`

---

## Tổng kết thực thi

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Lỗi phát hiện |
|:---:|:---:|:---:|:---:|:---:|
| 13 | 13 | 11 | 2 | **2** |

---

## Kết quả chi tiết

### Lớp EP-T1 — Admin chuyển tiếp hợp lệ (luồng chính)

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR10-01 | Admin nhấn nút "Xác nhận" trên đơn hàng ở pending | Đơn hàng pending tồn tại trong admin panel | Chuyển thành công sang confirmed; HTTP 200 | Nhấn nút "Xác nhận" thành công — Badge chuyển từ _"Chờ xác nhận"_ sang _"Đã xác nhận"_; API xác nhận trạng thái `confirmed` | [DT-FR10-01-before.png](screenshots/DT-FR10-01-before.png) [DT-FR10-01-result.png](screenshots/DT-FR10-01-result.png) | Đạt |
| DT-FR10-02 | Admin nhấn nút "Giao hàng" trên đơn hàng ở confirmed | Đơn hàng ở trạng thái confirmed | Chuyển thành công sang shipping; HTTP 200 | Nhấn nút "Giao hàng" thành công — Trạng thái chuyển sang `shipping`; API xác nhận | [DT-FR10-02-before.png](screenshots/DT-FR10-02-before.png) [DT-FR10-02-result.png](screenshots/DT-FR10-02-result.png) | Đạt |
| DT-FR10-03 | Admin nhấn nút "Hoàn thành" trên đơn hàng ở shipping | Đơn hàng ở trạng thái shipping | Chuyển thành công sang delivered; HTTP 200; vào terminal | Nhấn nút "Hoàn thành" thành công — Trạng thái chuyển sang `delivered`; đơn hàng ở trạng thái kết thúc; admin UI không còn hiển thị nút hành động | [DT-FR10-03-before.png](screenshots/DT-FR10-03-before.png) [DT-FR10-03-result.png](screenshots/DT-FR10-03-result.png) | Đạt |

### Lớp EP-T2 — Admin hủy hợp lệ

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR10-04 | Admin nhấn nút "Hủy" trên đơn hàng ở pending | Đơn hàng ở trạng thái pending | Hủy thành công; HTTP 200; chuyển sang canceled | Nhấn "Hủy" thành công — Trạng thái chuyển sang `canceled` | [DT-FR10-04-before.png](screenshots/DT-FR10-04-before.png) [DT-FR10-04-result.png](screenshots/DT-FR10-04-result.png) | Đạt |
| DT-FR10-05 | Admin nhấn nút "Hủy" trên đơn hàng ở confirmed | Đơn hàng ở trạng thái confirmed | Hủy thành công; HTTP 200 | Nhấn "Hủy" thành công — Trạng thái chuyển sang `canceled` | [DT-FR10-05-before.png](screenshots/DT-FR10-05-before.png) [DT-FR10-05-result.png](screenshots/DT-FR10-05-result.png) | Đạt |
| DT-FR10-06 | Admin thử hủy đơn hàng ở shipping | Đơn hàng ở trạng thái shipping | Hủy thành công bởi Admin; HTTP 200; chuyển sang canceled | Admin UI **không hiển thị nút "Hủy"** cho đơn ở shipping (chỉ có "Hoàn thành"). Gọi API `PUT /api/admin/orders/:id/status {status:"canceled"}` cũng bị từ chối: HTTP 400 `{"error":"Invalid state transition from shipping to canceled"}`. Trạng thái vẫn giữ `shipping` → **BUG-06** | [DT-FR10-06-before.png](screenshots/DT-FR10-06-before.png) [DT-FR10-06-result.png](screenshots/DT-FR10-06-result.png) | Không đạt |

### Lớp EP-T3 — User hủy hợp lệ

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR10-07 | User nhấn nút "Hủy đơn" trên đơn ở pending tại /profile | Đơn hàng ở pending; đăng nhập user | Hủy thành công; HTTP 200; chuyển sang canceled | Nút "Hủy đơn" hiển thị đúng — Nhấn thành công — Trạng thái sau: `canceled` | [DT-FR10-07-before.png](screenshots/DT-FR10-07-before.png) [DT-FR10-07-result.png](screenshots/DT-FR10-07-result.png) | Đạt |
| DT-FR10-08 | User nhấn nút "Hủy đơn" trên đơn ở confirmed | Đơn hàng ở confirmed; đăng nhập user | Hủy thành công; HTTP 200 | Nút "Hủy đơn" hiển thị đúng — Nhấn thành công — Trạng thái sau: `canceled` | [DT-FR10-08-before.png](screenshots/DT-FR10-08-before.png) [DT-FR10-08-result.png](screenshots/DT-FR10-08-result.png) | Đạt |

### Lớp EP-T4 — Chuyển đổi từ trạng thái kết thúc

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR10-09 | Gọi API `PUT /api/admin/orders/:id/status {status:"confirmed"}` khi đơn ở delivered | Đơn hàng ở trạng thái terminal `delivered` | Từ chối; HTTP 4xx; không chuyển từ terminal | Admin UI không hiển thị nút hành động cho delivered. API: HTTP 400 `{"error":"Invalid state transition from delivered to confirmed"}`. Trạng thái vẫn là `delivered` | [DT-FR10-09-before.png](screenshots/DT-FR10-09-before.png) [DT-FR10-09-result.png](screenshots/DT-FR10-09-result.png) | Đạt |
| DT-FR10-10 | Gọi API `PUT /api/admin/orders/:id/status {status:"confirmed"}` khi đơn ở canceled | Đơn hàng ở trạng thái terminal `canceled` | Từ chối; HTTP 4xx | API: HTTP 400 `{"error":"Invalid state transition from canceled to confirmed"}`. Trạng thái vẫn là `canceled`. Ghi chú: Admin UI hiển thị nút "Đánh dấu Đã giao" cho đơn canceled — đây là lỗi UI nhỏ (nút không đúng trạng thái) nhưng không ảnh hưởng đến tính đúng đắn của back-end | [DT-FR10-10-before.png](screenshots/DT-FR10-10-before.png) [DT-FR10-10-result.png](screenshots/DT-FR10-10-result.png) | Đạt |

### Lớp EP-T5 — Vi phạm quyền Actor

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR10-11 | User nhấn nút "Hủy đơn" trên đơn ở shipping tại /profile | Đơn hàng ở shipping; đăng nhập user | Từ chối; nút ẩn trên UI; API 4xx; thông báo "không có quyền hủy" | Nút "Hủy đơn" **VẪN HIỂN THỊ** cho đơn ở shipping trên profile user (lỗi UI). Gọi API `PUT /api/orders/:id/cancel` trả về HTTP 200 và thực sự hủy đơn hàng (lỗi backend). Trạng thái sau: `canceled` → **BUG-05** | [DT-FR10-11-before.png](screenshots/DT-FR10-11-before.png) [DT-FR10-11-result.png](screenshots/DT-FR10-11-result.png) | Không đạt |

### Lớp EP-T6 — Bỏ qua trạng thái (skip state)

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR10-12 | Gọi API `PUT /api/admin/orders/:id/status {status:"shipping"}` khi đơn ở pending | Đơn hàng ở pending; bỏ qua confirmed | Từ chối; HTTP 4xx; không bỏ qua confirmed | API: HTTP 400 `{"error":"Invalid state transition from pending to shipping"}`. Trạng thái vẫn là `pending` | [DT-FR10-12-before.png](screenshots/DT-FR10-12-before.png) [DT-FR10-12-result.png](screenshots/DT-FR10-12-result.png) | Đạt |
| DT-FR10-13 | Gọi API `PUT /api/admin/orders/:id/status {status:"delivered"}` khi đơn ở confirmed | Đơn hàng ở confirmed; bỏ qua shipping | Từ chối; HTTP 4xx; không bỏ qua shipping | API: HTTP 400 `{"error":"Invalid state transition from confirmed to delivered"}`. Trạng thái vẫn là `confirmed` | [DT-FR10-13-before.png](screenshots/DT-FR10-13-before.png) [DT-FR10-13-result.png](screenshots/DT-FR10-13-result.png) | Đạt |

---

## Lỗi phát hiện trong đợt thực thi này

| Mã lỗi | Mã TC liên quan | Mức độ | Mô tả ngắn |
|--------|----------------|--------|-----------|
| BUG-05 | DT-FR10-11 | Cao | User có thể hủy đơn ở trạng thái `shipping` (cả UI và API đều sai — vi phạm đặc tả FR-10) |
| BUG-06 | DT-FR10-06 | Cao | Admin không thể hủy đơn ở trạng thái `shipping` — UI thiếu nút "Hủy", API trả về 400 (vi phạm đặc tả FR-10) |

---

## Quan sát bổ sung

- **Nhãn nút admin UI:** pending → "Xác nhận" + "Hủy"; confirmed → "Giao hàng" + "Hủy"; shipping → "Hoàn thành" (không có Hủy); delivered/canceled → không có nút.
- **DT-10 anomaly:** Admin UI hiển thị nút "Đánh dấu Đã giao" cho đơn ở trạng thái `canceled`. Đây là lỗi giao diện nhỏ, nhưng backend xử lý đúng khi từ chối API call.
- **Skip-state validation:** Backend xác thực đúng thứ tự chuyển đổi trạng thái — không cho phép nhảy cóc qua các bước trung gian.
- **Terminal state protection:** Backend từ chối mọi thử chuyển đổi từ `delivered` hoặc `canceled`.
