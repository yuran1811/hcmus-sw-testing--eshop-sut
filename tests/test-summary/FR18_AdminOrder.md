# FR-18: Quản lý Đơn hàng (Admin) — Tóm tắt kiểm thử

**Tính năng:** FR-18 — Admin Order Management  
**Nhóm tính năng:** Pool C — Phân hệ Web Admin  

---

## Kết quả tổng hợp

### Kiểm thử Miền (Domain Testing)

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Tỉ lệ đạt |
|:---:|:---:|:---:|:---:|:---:|
| 11 | 11 | 8 | 3 | 72.7% |

### Phân tích Giá trị Biên (BVA)

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Tỉ lệ đạt |
|:---:|:---:|:---:|:---:|:---:|
| 8 | 8 | 5 | 3 | 62.5% |

### Tổng hợp toàn bộ FR-18

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Lỗi phát hiện |
|:---:|:---:|:---:|:---:|:---:|
| 19 | 19 | 13 | 6 | **2** |

---

## Danh sách lỗi phát hiện

| Mã lỗi | Mức độ | Mô tả | Test case liên quan | Trạng thái |
|--------|--------|-------|---------------------|-----------|
| BUG-07 | Cao | `GET /api/admin/orders` chấp nhận user token (role=user) — rò rỉ toàn bộ dữ liệu đơn hàng cho user thường (vi phạm SEC-03, FR-12) | DT-FR18-02, BVA-FR18-02 | Mở |
| BUG-08 | Nghiêm trọng | Admin UI render `shipping_address` qua innerHTML — XSS thành công: `alert()` thực thi khi admin mở trang orders (vi phạm SEC-04) | DT-FR18-10, DT-FR18-11, BVA-FR18-05, BVA-FR18-06 | Mở |

---

## Chi tiết kết quả theo từng test case

### Domain Testing — Chi tiết

| Mã TC | Mô tả ngắn | Nhóm | Đạt/Không đạt | Ghi chú |
|-------|-----------|------|:---:|---------|
| DT-FR18-01 | Không có token → GET /api/admin/orders | Auth | Đạt | HTTP 401 đúng |
| DT-FR18-02 | User token → GET /api/admin/orders | Auth | Không đạt | **BUG-07**: HTTP 200 thay vì 403 |
| DT-FR18-03 | Admin token → GET /api/admin/orders | Auth | Đạt | HTTP 200; 74 đơn |
| DT-FR18-04 | Admin panel hiển thị bảng đơn hàng | Display | Đạt | Không lỗi UI |
| DT-FR18-05 | Hiển thị đủ 5 trạng thái trong bảng | Display | Đạt | 5/5 đơn tìm thấy |
| DT-FR18-06 | Chuyển trạng thái hợp lệ (pending→confirmed) | Transition | Đạt | HTTP 200; badge cập nhật |
| DT-FR18-07 | Chuyển trạng thái không hợp lệ (skip state) | Transition | Đạt | HTTP 400 đúng |
| DT-FR18-08 | orderId không tồn tại → 404 | Transition | Đạt | HTTP 404 đúng |
| DT-FR18-09 | Địa chỉ plain text hiển thị đúng | Security | Đạt | |
| DT-FR18-10 | Địa chỉ HTML tag → phải escape | Security | Không đạt | **BUG-08**: HTML render thành bold |
| DT-FR18-11 | XSS payload → phải escape | Security | Không đạt | **BUG-08**: alert() thực thi |

### BVA — Chi tiết

| Mã TC | Ranh giới | Điểm BVA | Đạt/Không đạt | Ghi chú |
|-------|-----------|---------|:---:|---------|
| BVA-FR18-01 | B1: role boundary | Dưới biên (no token) | Đạt | 401 đúng |
| BVA-FR18-02 | B1: role boundary | Tại biên dưới (user token) | Không đạt | **BUG-07**: 200 thay vì 403 |
| BVA-FR18-03 | B1: role boundary | Tại biên trên (admin token) | Đạt | 200 đúng |
| BVA-FR18-04 | B2: content safety | Dưới biên (plain text) | Đạt | Hiển thị đúng |
| BVA-FR18-05 | B2: content safety | Tại biên (`<script>`) | Không đạt | **BUG-08**: script thực thi |
| BVA-FR18-06 | B2: content safety | Vượt biên (XSS img) | Không đạt | **BUG-08**: XSS thành công |
| BVA-FR18-07 | B3: order count | Dưới biên (0 orders) | Đạt | API structure đúng |
| BVA-FR18-08 | B3: order count | Tại biên (1 order) | Đạt | Hiển thị đầy đủ |

---

## Quan sát chung về chất lượng FR-18

**Điểm tốt:**
- Luồng hiển thị đơn hàng và cập nhật trạng thái hoạt động đúng cho admin
- State machine validation (skip-state, non-existent order) chặt chẽ
- No-token authentication hoạt động đúng (401)

**Điểm cần sửa ngay (bugs nghiêm trọng):**
- **BUG-08 (Nghiêm trọng — XSS):** Đây là lỗi bảo mật cấp độ cao nhất trong toàn bộ bài kiểm thử. Bất kỳ user nào cũng có thể thực thi JavaScript tùy ý trong trình duyệt của admin bằng cách đặt hàng với địa chỉ giao hàng là XSS payload. Admin chỉ cần mở trang quản lý đơn hàng là script kích hoạt.
- **BUG-07 (Cao — Broken Access Control):** User thường có thể xem toàn bộ đơn hàng của mọi người dùng khác trong hệ thống — rò rỉ thông tin cá nhân (PII) nghiêm trọng (địa chỉ, tổng tiền, lịch sử mua hàng).

**Mối liên hệ giữa 2 bugs:** BUG-07 (user đọc được admin API) kết hợp với BUG-08 (XSS) tạo ra attack chain nguy hiểm: user tạo đơn hàng với XSS payload → admin mở trang → script thực thi với quyền admin trong browser → có thể đánh cắp session token.
