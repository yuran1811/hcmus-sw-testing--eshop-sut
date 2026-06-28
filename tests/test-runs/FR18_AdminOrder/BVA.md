# FR-18: Quản lý Đơn hàng (Admin) — Phân tích Giá trị Biên (Kết quả thực thi)

**Tính năng:** FR-18 — Admin Order Management  
**Phương pháp:** Phân tích Giá trị Biên (BVA) — 3 điểm mỗi biên  
**Thiết kế test case nguồn:** `test-cases/FR18_AdminOrder/BVA.md`  

---

## Tổng kết thực thi

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Lỗi phát hiện |
|:---:|:---:|:---:|:---:|:---:|
| 8 | 8 | 5 | 3 | **2** |

---

## Kết quả chi tiết

### Ranh giới B1 — Role boundary: `no token` ↔ `user token` ↔ `admin token`

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| BVA-FR18-01 | Không có token → `GET /api/admin/orders` (dưới biên B1) | Không có Authorization header | HTTP 401/403; bị từ chối | HTTP 401 — `{"error":"Unauthorized"}` | [BVA-FR18-01-result.png](screenshots/BVA-FR18-01-result.png) | Đạt |
| BVA-FR18-02 | User token (role=user) → `GET /api/admin/orders` (tại biên dưới B1) | JWT hợp lệ nhưng role=user | HTTP 401/403; bị từ chối như no-token (SEC-03) | HTTP **200** — Trả về đầy đủ danh sách đơn hàng của tất cả user. Biên B1 KHÔNG tồn tại giữa "no token" và "user token" — cả hai đáng lẽ phải bị từ chối nhưng chỉ no-token bị từ chối → **BUG-07** | [BVA-FR18-02-result.png](screenshots/BVA-FR18-02-result.png) | Không đạt |
| BVA-FR18-03 | Admin token (role=admin) → `GET /api/admin/orders` (tại biên trên B1) | JWT hợp lệ với role=admin | HTTP 200; trả về danh sách | HTTP 200 — trả về danh sách đơn hàng đầy đủ | [BVA-FR18-03-result.png](screenshots/BVA-FR18-03-result.png) | Đạt |

> **Phân tích biên B1:** Biên thực tế chỉ nằm giữa "no token" và "có token" (bất kể role). API không phân biệt user token vs admin token — đây là lỗi trực tiếp vi phạm SEC-03.

### Ranh giới B2 — Content safety: `plain text` ↔ `<` char ↔ `XSS payload`

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| BVA-FR18-04 | `shipping_address` = `123 Le Loi, Q1, TPHCM` (dưới biên B2 — plain ASCII) | Admin hiển thị order với địa chỉ plain text | Hiển thị đúng như text; không biến dạng | Cell text: _"123 Le Loi, Q1, TPHCM"_ — đúng, không biến dạng | [BVA-FR18-04-result.png](screenshots/BVA-FR18-04-result.png) | Đạt |
| BVA-FR18-05 | `shipping_address` = `<script>alert(1)</script>` (tại biên B2 — ký tự `<` đầu tiên) | Admin hiển thị order với script tag | Escaped; script KHÔNG thực thi | Alert **bắn** — `alert(1)` thực thi khi admin load trang orders. `innerHTML = "<script>alert(1)</script>"` — không được escape → **BUG-08** | [BVA-FR18-05-result.png](screenshots/BVA-FR18-05-result.png) | Không đạt |
| BVA-FR18-06 | `shipping_address` = `<img src=x onerror=alert("XSS")>` (vượt biên B2 — XSS đầy đủ) | Admin hiển thị order với XSS img payload | Escaped hoàn toàn; không alert; không img | Alert **bắn** (`alert("XSS")` thực thi). `<img>` render trong DOM (`innerHTML` chứa `<img src="x" onerror="alert(&quot;XSS&quot;)">`) → Xác nhận **BUG-08** | [BVA-FR18-06-result.png](screenshots/BVA-FR18-06-result.png) | Không đạt |

> **Phân tích biên B2:** Biên không tồn tại — bất kỳ ký tự HTML nào đều được render. Plain text là điểm an toàn duy nhất; ngay từ ký tự `<` đầu tiên đã bị khai thác. XSS hoàn toàn thành công.

### Ranh giới B3 — Order count: `0` ↔ `1`

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| BVA-FR18-07 | 0 orders — API structure + empty state check (dưới biên B3) | Kiểm tra API trả về array kể cả khi empty | API trả về `[]`; UI hiển thị không lỗi | API trả về array hợp lệ (89 orders hiện tại); structure đúng. UI load thành công — bảng hiển thị không lỗi | [BVA-FR18-07-result.png](screenshots/BVA-FR18-07-result.png) | Đạt |
| BVA-FR18-08 | 1 order cụ thể (#90) hiển thị trong bảng (tại biên B3) | Vừa tạo order #90 | Đơn hiển thị đầy đủ: mã ĐH, user, tiền, địa chỉ, trạng thái, nút hành động | Order #90 tìm thấy trong bảng — 6 cột hiển thị đầy đủ | [BVA-FR18-08-result.png](screenshots/BVA-FR18-08-result.png) | Đạt |

---

## Lỗi phát hiện trong đợt thực thi này

| Mã lỗi | Mã TC liên quan | Mức độ | Mô tả ngắn |
|--------|----------------|--------|-----------|
| BUG-07 | BVA-FR18-02, DT-FR18-02 | Cao | `GET /api/admin/orders` chấp nhận user token (role=user) — vi phạm SEC-03, FR-12 |
| BUG-08 | BVA-FR18-05, BVA-FR18-06, DT-FR18-10, DT-FR18-11 | Nghiêm trọng | Admin UI render `shipping_address` qua innerHTML — XSS thành công; vi phạm SEC-04 |

---

## Quan sát bổ sung

- **Biên B1:** Hệ thống phân biệt "có token" vs "không có token" nhưng KHÔNG phân biệt role. Điều này có nghĩa bất kỳ người dùng đã đăng nhập nào cũng có thể xem toàn bộ đơn hàng của mọi user — rò rỉ dữ liệu nghiêm trọng.
- **Biên B2:** Ranh giới an toàn/không an toàn bị phá vỡ hoàn toàn. Không có escape/sanitization nào được áp dụng. Cả `<script>` lẫn `<img onerror>` đều thực thi thành công.
- **BVA-07 ghi chú:** Không thể dễ dàng test DB trống trong bài test tự động (DB đã có 89 orders). Kết quả xác nhận API luôn trả về array hợp lệ — cấu trúc đúng cho trường hợp empty.
