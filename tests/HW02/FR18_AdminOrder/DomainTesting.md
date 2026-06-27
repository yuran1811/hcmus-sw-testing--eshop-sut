# FR-18: Quản lý Đơn hàng (Admin) — Domain Testing

## 1. Mô tả tính năng

**Feature:** FR-18 — Admin Order Management  
**Module:** Web Admin  
**File liên quan:**
- Backend: `backend/server.js:510–568`
- Frontend Admin: `frontend-admin/src/App.jsx:777–877`
- DB Schema: `backend/database.js` (bảng `orders`)

**Đặc tả (từ README.md):**
- Admin xem toàn bộ đơn hàng của tất cả người dùng
- Admin chuyển đổi trạng thái theo đúng State Machine (FR-10)
- Địa chỉ giao hàng phải được hiển thị **an toàn** (không render HTML)
- Dashboard hiển thị tổng doanh thu: chỉ tính `total_amount` của đơn có `status='delivered'`

---

## 2. Xác định biến đầu vào (Variable Identification)

| Biến | Kiểu | Nguồn | Ghi chú |
|------|------|-------|---------|
| `auth_token` | JWT | `Authorization: Bearer <token>` | Phải là admin role |
| `order_id` | Integer | `req.params.id` | ID đơn hàng cần thao tác |
| `new_status` | String | `req.body.status` | Trạng thái mới (theo state machine) |
| `shipping_address` | String | `orders.shipping_address` | Hiển thị trong bảng admin |
| `total_amount` | Integer | `orders.total_amount` | Tính vào doanh thu |

---

## 3. Phân vùng tương đương (Equivalence Partitioning)

### 3.1 Phân vùng Authentication & Authorization

| Partition | Token | Role | Expected |
|-----------|-------|------|----------|
| EP-A1 | JWT hợp lệ | admin | Truy cập được |
| EP-A2 | JWT hợp lệ | user (non-admin) | HTTP 403 Forbidden |
| EP-A3 | JWT không hợp lệ / hết hạn | — | HTTP 401 Unauthorized |
| EP-A4 | Không có token | — | HTTP 401 Unauthorized |

### 3.2 Phân vùng Order ID

| Partition | Mô tả | Giá trị đại diện | Expected |
|-----------|-------|-----------------|----------|
| EP-O1 | ID tồn tại và hợp lệ | 1 | 200 OK |
| EP-O2 | ID không tồn tại | 99999 | 404 Not found |
| EP-O3 | ID dạng chuỗi | "abc" | 404 hoặc 400 |
| EP-O4 | ID âm | -1 | 404 hoặc 400 |

### 3.3 Phân vùng chuyển trạng thái (kế thừa từ FR-10)

| Partition | Mô tả | Expected |
|-----------|-------|----------|
| EP-T1 | Chuyển đổi hợp lệ | 200 OK |
| EP-T2 | Chuyển đổi không hợp lệ | 400 Bad Request |
| EP-T3 | Chuyển từ final state | 400 Bad Request |

### 3.4 Phân vùng shipping_address (Display Safety)

| Partition | Giá trị | Expected |
|-----------|---------|----------|
| EP-D1 | Text bình thường | Hiển thị bình thường |
| EP-D2 | HTML thuần | Hiển thị as-is, KHÔNG render thành HTML |
| EP-D3 | XSS payload | Không thực thi script |
| EP-D4 | Rỗng | Hiển thị trống |

### 3.5 Phân vùng Dashboard Revenue

| Partition | Đơn hàng trong DB | Expected Revenue |
|-----------|------------------|-----------------|
| EP-R1 | Tất cả delivered | Tổng đúng bằng sum(total_amount) |
| EP-R2 | Mix (pending + delivered) | Chỉ tính delivered |
| EP-R3 | Không có delivered | 0₫ |
| EP-R4 | Chỉ có canceled | 0₫ |

---

## 4. Test Cases — Domain Testing

### Nhóm 1: GET /api/admin/orders (Xem danh sách)

| TC-ID | Token | Expected | Actual | Status |
|-------|-------|----------|--------|--------|
| DT-FR18-01 | Admin JWT hợp lệ | HTTP 200, array orders với user_name | HTTP 200, array đúng | PASS |
| DT-FR18-02 | User JWT (non-admin) | HTTP 403 Forbidden | HTTP 403 | PASS |
| DT-FR18-03 | Token không hợp lệ | HTTP 401 | HTTP 401 | PASS |
| DT-FR18-04 | Không có token | HTTP 401 | HTTP 401 | PASS |
| DT-FR18-05 | Admin JWT, DB có nhiều users | Orders của TẤT CẢ users, có user_name | Trả về đúng, LEFT JOIN với users | PASS |

### Nhóm 2: PUT /api/admin/orders/:id/status (Cập nhật trạng thái)

| TC-ID | order_id | new_status | Pre-cond | Expected | Actual | Status | Bug? |
|-------|----------|------------|----------|----------|--------|--------|------|
| DT-FR18-06 | Tồn tại | confirmed | pending | HTTP 200, status cập nhật | HTTP 200 | PASS | — |
| DT-FR18-07 | Tồn tại | shipping | confirmed | HTTP 200 | HTTP 200 | PASS | — |
| DT-FR18-08 | Tồn tại | delivered | shipping | HTTP 200, trạng thái kết thúc | HTTP 200 | PASS | — |
| DT-FR18-09 | Tồn tại | canceled | pending | HTTP 200 | HTTP 200 | PASS | — |
| DT-FR18-10 | Tồn tại | canceled | confirmed | HTTP 200 | HTTP 200 | PASS | — |
| DT-FR18-11 | Tồn tại | shipping | pending | HTTP 400, invalid transition | HTTP 400 | PASS | — |
| DT-FR18-12 | Không tồn tại (99999) | confirmed | — | HTTP 404 | HTTP 404 | PASS | — |
| DT-FR18-13 | -1 | confirmed | — | HTTP 404 | HTTP 404 | PASS | — |
| DT-FR18-14 | "abc" | confirmed | — | HTTP 404 hoặc 400 | HTTP 404 | PASS | — |

### Nhóm 3: Dashboard Revenue (FR-13 liên quan)

| TC-ID | Scenario | Expected | Actual | Status | Bug? |
|-------|----------|----------|--------|--------|------|
| DT-FR18-15 | Có 1 đơn delivered (total=100000) | Revenue = 100,000₫ | Revenue = 200,000₫ | FAIL | **BUG-09** |
| DT-FR18-16 | Có đơn pending + delivered | Chỉ tính delivered | Tính cả pending (x2) | FAIL | **BUG-09** |
| DT-FR18-17 | Không có đơn delivered | Revenue = 0₫ | Revenue = 0₫ | PASS | — |

### Nhóm 4: Hiển thị shipping_address (XSS Safety)

| TC-ID | shipping_address | Expected | Actual | Status | Bug? |
|-------|-----------------|----------|--------|--------|------|
| DT-FR18-18 | "123 Nguyễn Huệ, Q1, HCM" | Hiển thị text bình thường | Hiển thị đúng | PASS | — |
| DT-FR18-19 | `<b>Bold Address</b>` | Hiển thị literal `<b>Bold Address</b>`, không render | Render thành chữ đậm | FAIL | **BUG-08** |
| DT-FR18-20 | `<script>alert('XSS')</script>` | Không thực thi script | Script có thể thực thi | FAIL | **BUG-08** |
| DT-FR18-21 | `<img src=x onerror=alert(1)>` | Không load image, không alert | Có thể trigger alert | FAIL | **BUG-08** |
| DT-FR18-22 | "" (rỗng) | Ô trống, không lỗi | Hiển thị rỗng | PASS | — |

### Nhóm 5: Giao diện Admin (UI verification)

| TC-ID | Scenario | Expected | Actual | Status |
|-------|----------|----------|--------|--------|
| DT-FR18-23 | Đơn pending → hiển thị button "Xác nhận" và "Hủy" | Cả 2 nút hiển thị | Đúng | PASS |
| DT-FR18-24 | Đơn confirmed → hiển thị "Giao hàng" và "Hủy" | Cả 2 nút hiển thị | Đúng | PASS |
| DT-FR18-25 | Đơn shipping → hiển thị "Hoàn thành" | Chỉ 1 nút | Đúng | PASS |
| DT-FR18-26 | Đơn delivered → không hiển thị nút action | Không có nút | Đúng | PASS |
| DT-FR18-27 | Đơn canceled → hiển thị "Đánh dấu Đã giao" | 1 nút (bug: canceled→delivered) | Nút hiển thị | FAIL | **BUG-06** |

---

## 5. Tổng kết Domain Testing

| Nhóm | TC Count | PASS | FAIL | Bug |
|------|----------|------|------|-----|
| GET orders (auth) | 5 | 5 | 0 | — |
| PUT status | 9 | 9 | 0 | — |
| Dashboard revenue | 3 | 1 | 2 | BUG-09 |
| XSS / Display safety | 5 | 2 | 3 | BUG-08 |
| UI verification | 5 | 4 | 1 | BUG-06 (kế thừa) |
| **Tổng** | **27** | **21** | **6** | **2 bugs mới** |

---

## 6. Bugs phát hiện

| Bug ID | File:Line | Mô tả | Severity |
|--------|-----------|-------|---------|
| BUG-08 | `frontend-admin/src/App.jsx:801-803` | `dangerouslySetInnerHTML` cho `shipping_address` → XSS vulnerability | Critical |
| BUG-09 | `frontend-admin/src/App.jsx:218` | Tính doanh thu nhân 2 (`* 2`) thay vì cộng tổng đúng | Major |

### Chi tiết BUG-08 (XSS)
```jsx
// App.jsx line 801-803 — XSS vulnerability
<td dangerouslySetInnerHTML={{ __html: order.shipping_address }} />
// Phải dùng: <td>{order.shipping_address}</td>
```

### Chi tiết BUG-09 (Revenue x2)
```javascript
// App.jsx line 218 — Bug: nhân đôi revenue
const revenue = orders
  .filter(o => o.status === "delivered")
  .reduce((sum, o) => sum + o.total_amount * 2, 0);  // Sai: * 2
// Đúng: .reduce((sum, o) => sum + o.total_amount, 0)
```

---

## 7. AI Gap Analysis

**AI phát hiện được:**
- Phân vùng authentication (admin/user/no token)
- Phân vùng order_id (tồn tại/không tồn tại)

**AI bỏ sót:**
- BUG-08 (XSS) — AI không đề xuất test XSS payload trong shipping_address trừ khi được nhắc đặc biệt về security testing
- BUG-09 (Revenue x2) — AI không đọc frontend code nên không phát hiện được lỗi `* 2`

**Lý do:** AI thường tập trung vào backend API testing và bỏ qua frontend rendering issues. XSS chỉ phát hiện được khi kiểm tra cả lớp presentation.
