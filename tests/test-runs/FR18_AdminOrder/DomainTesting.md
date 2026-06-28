# FR-18: Quản lý Đơn hàng (Admin) — Kiểm thử Miền (Kết quả thực thi)

**Tính năng:** FR-18 — Admin Order Management  
**Phương pháp:** Kiểm thử Miền — Phân vùng tương đương  
**Thiết kế test case nguồn:** `test-cases/FR18_AdminOrder/DomainTesting.md`  

---

## Tổng kết thực thi

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Lỗi phát hiện |
|:---:|:---:|:---:|:---:|:---:|
| 11 | 11 | 8 | 3 | **2** |

---

## Kết quả chi tiết

### Nhóm A — Kiểm soát truy cập (FR-12 + SEC-03)

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR18-01 | Không có token → `GET /api/admin/orders` | Không có Authorization header | HTTP 401/403; không trả dữ liệu | HTTP 401 — `{"error":"Unauthorized"}` | [DT-FR18-01-result.png](screenshots/DT-FR18-01-result.png) | Đạt |
| DT-FR18-02 | User token (role=user) → `GET /api/admin/orders` | JWT hợp lệ nhưng role=user | HTTP 401/403; bị từ chối (SEC-03) | HTTP **200** — trả về toàn bộ danh sách đơn hàng! User token không bị từ chối bởi admin API → **BUG-07** | [DT-FR18-02-result.png](screenshots/DT-FR18-02-result.png) | Không đạt |
| DT-FR18-03 | Admin token (role=admin) → `GET /api/admin/orders` | JWT hợp lệ với role=admin | HTTP 200; trả về danh sách tất cả đơn hàng | HTTP 200 — trả về 74 đơn hàng; đầy đủ thông tin | [DT-FR18-03-result.png](screenshots/DT-FR18-03-result.png) | Đạt |

### Nhóm B — Hiển thị danh sách đơn hàng (FR-18)

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR18-04 | Admin panel hiển thị danh sách đơn hàng | Admin đăng nhập; DB có orders | Giao diện hiển thị đúng — có bảng đơn hàng; không lỗi JS | Bảng đơn hàng hiển thị đầy đủ; không có lỗi UI; layout đúng | [DT-FR18-04-result.png](screenshots/DT-FR18-04-result.png) | Đạt |
| DT-FR18-05 | Admin panel với đơn ở cả 5 trạng thái | Tạo sẵn 5 orders: pending (#75), confirmed (#76), shipping (#77), delivered (#78), canceled (#79) | Tất cả 5 đơn hiển thị; badge trạng thái đúng; nút hành động đúng | Tìm thấy 5/5 đơn trong bảng; badge "Chờ xác nhận"/"Đã xác nhận"/"Đang giao"/"Đã giao"/"Đã hủy" hiển thị đúng | [DT-FR18-05-result.png](screenshots/DT-FR18-05-result.png) | Đạt |

### Nhóm C — Cập nhật trạng thái đơn hàng (FR-18 + FR-10)

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR18-06 | `PUT /api/admin/orders/:id/status {status:"confirmed"}` — đơn ở pending | Đơn hàng ở `pending` | HTTP 200; trạng thái chuyển; UI cập nhật | HTTP 200 — `{"message":"Order status updated"}` — Badge UI đổi thành _"Đã xác nhận"_ | [DT-FR18-06-before.png](screenshots/DT-FR18-06-before.png) [DT-FR18-06-result.png](screenshots/DT-FR18-06-result.png) | Đạt |
| DT-FR18-07 | `PUT /api/admin/orders/:id/status {status:"shipping"}` — đơn ở pending (skip confirmed) | Đơn hàng ở `pending` | HTTP 400; thông báo lỗi; trạng thái không đổi | HTTP 400 — `{"error":"Invalid state transition from pending to shipping"}` | [DT-FR18-07-result.png](screenshots/DT-FR18-07-result.png) | Đạt |
| DT-FR18-08 | `PUT /api/admin/orders/99999/status {status:"confirmed"}` — orderId không tồn tại | Không có order id=99999 | HTTP 404; "order not found" | HTTP 404 — `{"error":"Order not found"}` | [DT-FR18-08-result.png](screenshots/DT-FR18-08-result.png) | Đạt |

### Nhóm D — Bảo mật hiển thị địa chỉ giao hàng (SEC-04)

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR18-09 | Địa chỉ plain text: `123 Lê Lợi, Quận 1, TP.HCM` | Admin đăng nhập | Hiển thị đúng như text gốc | Hiển thị đúng — _"123 Lê Lợi, Quận 1, TP.HCM"_; không biến dạng | [DT-FR18-09-result.png](screenshots/DT-FR18-09-result.png) | Đạt |
| DT-FR18-10 | Địa chỉ có HTML tag: `<b>Địa chỉ test</b>` | Admin đăng nhập; order với địa chỉ này | Admin UI hiển thị literal `<b>Địa chỉ test</b>`; HTML được escape | Admin UI **render HTML** — text hiển thị là _"Địa chỉ test"_ **in đậm**; `innerHTML = "<b>Địa chỉ test</b>"` — HTML không được escape → **BUG-08** | [DT-FR18-10-result.png](screenshots/DT-FR18-10-result.png) | Không đạt |
| DT-FR18-11 | XSS payload: `<img src=x onerror=alert(1)>` | Admin đăng nhập; order với payload | Nội dung escaped; không alert; không img | Alert **BẮN NGAY** khi admin mở trang orders — `alert(1)` được thực thi. `<img>` render trong DOM. Xác nhận **BUG-08** (XSS thành công) | [DT-FR18-11-result.png](screenshots/DT-FR18-11-result.png) | Không đạt |

---

## Lỗi phát hiện trong đợt thực thi này

| Mã lỗi | Mã TC liên quan | Mức độ | Mô tả ngắn |
|--------|----------------|--------|-----------|
| BUG-07 | DT-FR18-02, BVA-FR18-02 | Cao | `GET /api/admin/orders` chấp nhận user token (role=user) — vi phạm SEC-03, FR-12 |
| BUG-08 | DT-FR18-10, DT-FR18-11, BVA-FR18-05, BVA-FR18-06 | Nghiêm trọng | Admin UI render `shipping_address` qua innerHTML — XSS thành công; alert() được thực thi — vi phạm SEC-04 |

---

## Quan sát bổ sung

- **DT-FR18-02 vs DT-FR18-01:** API `/api/admin/orders` kiểm tra sự tồn tại của token (no-token → 401) nhưng KHÔNG kiểm tra role (user-token → 200). Đây là lỗi kiểm soát truy cập điển hình.
- **DT-FR18-10/11 root cause:** Giao diện admin gần như chắc chắn dùng `element.innerHTML = order.shipping_address` thay vì `element.textContent`. Bất kỳ nội dung nào trong shipping_address đều được render như HTML thuần.
- **DT-FR18-05:** 5 trạng thái đều hiển thị đúng badge màu; các nút hành động đúng theo từng trạng thái (xem kết quả FR-10 để chi tiết).
