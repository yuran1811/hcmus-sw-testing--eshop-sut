# FR-18: Quản lý Đơn hàng (Admin) — Kiểm thử Miền (Thiết kế Test Case)

**Tính năng:** FR-18 — Admin Order Management  
**Nhóm tính năng:** Pool C — Phân hệ Web Admin  
**Nguồn đặc tả:** `README.md` §FR-18, §FR-12, §SEC-03, §SEC-04  
**Phương pháp:** Kiểm thử Miền — Phân vùng tương đương (Equivalence Partitioning)  
**Hướng dẫn kỹ thuật:** `.claude/skills/domain-testing`

---

## Bước 1 — Yêu cầu từ đặc tả

| Yêu cầu | Nguồn | Nội dung |
|---------|-------|---------|
| Xem tất cả đơn hàng | FR-18 | Admin xem toàn bộ đơn hàng của tất cả người dùng |
| Chuyển đổi trạng thái | FR-18 | Admin chuyển đổi trạng thái theo đúng FR-10 State Machine |
| Hiển thị an toàn | FR-18 + SEC-04 | Địa chỉ giao hàng phải được escape — không render HTML |
| Kiểm soát truy cập API | FR-12 + SEC-03 | `/api/admin/*` phải yêu cầu token JWT hợp lệ VÀ `role = 'admin'` |
| Token không đủ quyền | SEC-03 | User token (role=user) phải bị từ chối giống no-token |

---

## Bước 2 — Xác định biến đầu vào

| # | Biến | Nguồn | Kiểu dữ liệu | Ghi chú |
|---|------|--------|--------------|---------|
| 1 | `auth_token` | Header `Authorization: Bearer <token>` | enum | không có / user token / admin token |
| 2 | `order_list_state` | Dữ liệu trong DB | derived | trống / có đơn hàng |
| 3 | `status_transition` | Request body `{status: ...}` | enum | hợp lệ / không hợp lệ / orderId không tồn tại |
| 4 | `shipping_address` | Dữ liệu từ user → hiển thị trên admin UI | string | plain text / HTML thông thường / XSS payload |

---

## Bước 3 — Phân vùng tương đương

### 3.1 Biến: `auth_token`

| Mã phân vùng | Tên phân vùng | Giá trị đại diện | Loại |
|-------------|--------------|-----------------|------|
| EP-A1 | Không có token | Request không có header Authorization | Không hợp lệ — 401 |
| EP-A2 | User token (role=user) | JWT hợp lệ nhưng role=user | Không hợp lệ — 403 (SEC-03) |
| EP-A3 | Admin token (role=admin) | JWT hợp lệ với role=admin | Hợp lệ — 200 |

### 3.2 Biến: `order_list_state`

| Mã phân vùng | Tên phân vùng | Mô tả | Loại |
|-------------|--------------|-------|------|
| EP-O1 | Không có đơn hàng | DB trống (0 orders) | Hợp lệ — hiện empty state |
| EP-O2 | Có đơn hàng đủ 5 trạng thái | Có pending, confirmed, shipping, delivered, canceled | Hợp lệ — hiện đầy đủ |

### 3.3 Biến: `status_transition`

| Mã phân vùng | Tên phân vùng | Giá trị đại diện | Loại |
|-------------|--------------|-----------------|------|
| EP-S1 | Chuyển đổi hợp lệ | pending → confirmed (theo FR-10) | Hợp lệ — 200 |
| EP-S2 | Chuyển đổi không hợp lệ | pending → shipping (skip state) | Không hợp lệ — 400 |
| EP-S3 | Order không tồn tại | orderId = 99999 | Không hợp lệ — 404 |

### 3.4 Biến: `shipping_address` (rendering)

| Mã phân vùng | Tên phân vùng | Giá trị đại diện | Loại |
|-------------|--------------|-----------------|------|
| EP-X1 | Plain text | `123 Lê Lợi, Quận 1, TP.HCM` | Hợp lệ — hiển thị bình thường |
| EP-X2 | HTML tag thông thường | `<b>Địa chỉ</b>` | Không hợp lệ nếu render — phải escape |
| EP-X3 | XSS payload | `<img src=x onerror=alert(1)>` | Không hợp lệ — phải escape hoàn toàn (SEC-04) |

---

## Bước 4 — Danh sách Test Case

> **Tài liệu chỉ dành cho thiết kế.** Kết quả thực tế thuộc về `test-runs/FR18_AdminOrder/DomainTesting.md`.

---

# DT-FR18-01: Từ chối truy cập admin API — không có token

## Requirement ID
FR-12, SEC-03

## Module / Test type / Technique
FR18 Admin Order / Security / Equivalence Partitioning

## Preconditions
- SUT đang chạy

## Test data
| Endpoint | GET /api/admin/orders |
| Authorization | (không có header) |
| Phân vùng | EP-A1 (không có token) |

## Test steps
1. Gửi request `GET /api/admin/orders` không kèm Authorization header
2. Kiểm tra HTTP status và response body

## Expected result
HTTP 401/403; không trả dữ liệu đơn hàng.

## Status / Related bugs
Not Run / None

---

# DT-FR18-02: Từ chối truy cập admin API — user token (SEC-03)

## Requirement ID
FR-12, SEC-03

## Module / Test type / Technique
FR18 Admin Order / Security / Equivalence Partitioning

## Preconditions
- Đăng nhập tài khoản user thường

## Test data
| Endpoint | GET /api/admin/orders |
| Authorization | Bearer {user_jwt} (role=user) |
| Phân vùng | EP-A2 (user token) |

## Test steps
1. Đăng nhập user thường, lấy JWT
2. Gửi `GET /api/admin/orders` với user token trong Authorization header
3. Kiểm tra HTTP status và response body

## Expected result
HTTP 401/403; SEC-03: user token bị từ chối giống no-token.

## Status / Related bugs
Not Run / None

---

# DT-FR18-03: Admin truy cập danh sách đơn hàng thành công

## Requirement ID
FR-12, FR-18

## Module / Test type / Technique
FR18 Admin Order / Functional / Equivalence Partitioning

## Preconditions
- Đăng nhập tài khoản admin

## Test data
| Endpoint | GET /api/admin/orders |
| Authorization | Bearer {admin_jwt} (role=admin) |
| Phân vùng | EP-A3 (admin token) |

## Test steps
1. Đăng nhập admin, lấy JWT
2. Gửi `GET /api/admin/orders` với admin token
3. Kiểm tra phản hồi

## Expected result
HTTP 200; trả về danh sách tất cả đơn hàng.

## Status / Related bugs
Not Run / None

---

# DT-FR18-04: Admin panel hiển thị empty state khi không có đơn hàng

## Requirement ID
FR-18

## Module / Test type / Technique
FR18 Admin Order / Functional / Equivalence Partitioning

## Preconditions
- DB trống (reset/seed không có order)
- Admin đăng nhập thành công

## Test data
| Trạng thái DB | 0 đơn hàng |
| Phân vùng | EP-O1 (không có đơn hàng) |

## Test steps
1. Admin đăng nhập
2. Vào admin panel — trang quản lý đơn hàng
3. Quan sát giao diện

## Expected result
Giao diện admin hiển thị trạng thái trống (empty state); không báo lỗi.

## Status / Related bugs
Not Run / None

---

# DT-FR18-05: Admin panel hiển thị đủ 5 trạng thái đơn hàng

## Requirement ID
FR-18

## Module / Test type / Technique
FR18 Admin Order / Functional / Equivalence Partitioning

## Preconditions
- Có orders với 5 trạng thái: pending, confirmed, shipping, delivered, canceled
- Admin đăng nhập thành công

## Test data
| order_statuses | pending, confirmed, shipping, delivered, canceled |
| Phân vùng | EP-O2 (đủ 5 trạng thái) |

## Test steps
1. Admin đăng nhập
2. Vào admin panel — trang quản lý đơn hàng
3. Quan sát danh sách — kiểm tra badge trạng thái và nút hành động từng đơn

## Expected result
Tất cả 5 đơn hiển thị đúng; badge trạng thái đúng màu; các nút hành động đúng cho từng trạng thái.

## Status / Related bugs
Not Run / None

---

# DT-FR18-06: Admin cập nhật trạng thái hợp lệ pending → confirmed

## Requirement ID
FR-18, FR-10

## Module / Test type / Technique
FR18 Admin Order / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng ở trạng thái `pending`
- Admin đăng nhập thành công

## Test data
| Endpoint | PUT /api/admin/orders/:id/status |
| Body | {status: "confirmed"} |
| current_status | pending |
| Phân vùng | EP-S1 (chuyển đổi hợp lệ) |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `pending`
3. Gọi API `PUT /api/admin/orders/:id/status {status:"confirmed"}`
4. Kiểm tra phản hồi và UI

## Expected result
HTTP 200; trạng thái đổi sang `confirmed`; cập nhật ngay trên UI.

## Status / Related bugs
Not Run / None

---

# DT-FR18-07: Từ chối cập nhật trạng thái bỏ qua bước — pending → shipping

## Requirement ID
FR-18, FR-10

## Module / Test type / Technique
FR18 Admin Order / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng ở trạng thái `pending`
- Admin đăng nhập thành công

## Test data
| Endpoint | PUT /api/admin/orders/:id/status |
| Body | {status: "shipping"} |
| current_status | pending |
| Phân vùng | EP-S2 (chuyển đổi không hợp lệ — skip state) |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `pending`
3. Gọi API `PUT /api/admin/orders/:id/status {status:"shipping"}` (bỏ qua `confirmed`)
4. Kiểm tra phản hồi

## Expected result
HTTP 400; thông báo lỗi chuyển đổi không hợp lệ; trạng thái không đổi.

## Status / Related bugs
Not Run / None

---

# DT-FR18-08: Từ chối cập nhật khi orderId không tồn tại — 404

## Requirement ID
FR-18

## Module / Test type / Technique
FR18 Admin Order / Functional / Equivalence Partitioning

## Preconditions
- Không có order id=99999
- Admin đăng nhập thành công

## Test data
| Endpoint | PUT /api/admin/orders/99999/status |
| Body | {status: "confirmed"} |
| orderId | 99999 (không tồn tại) |
| Phân vùng | EP-S3 (order không tồn tại) |

## Test steps
1. Admin đăng nhập
2. Gọi API với orderId = 99999 (không tồn tại)
3. Kiểm tra phản hồi

## Expected result
HTTP 404; thông báo "order not found".

## Status / Related bugs
Not Run / None

---

# DT-FR18-09: Địa chỉ giao hàng plain text hiển thị đúng trên admin panel

## Requirement ID
SEC-04

## Module / Test type / Technique
FR18 Admin Order / Security / Equivalence Partitioning

## Preconditions
- Admin đăng nhập thành công
- Order được tạo với địa chỉ plain text

## Test data
| shipping_address | 123 Le Loi, Quan 1, TP.HCM |
| Phân vùng | EP-X1 (plain text) |

## Test steps
1. Tạo order với địa chỉ plain text `123 Le Loi, Quan 1, TP.HCM`
2. Admin đăng nhập, vào admin panel
3. Tìm order và quan sát hiển thị địa chỉ giao hàng

## Expected result
Hiển thị đúng như text gốc; không biến dạng.

## Status / Related bugs
Not Run / None

---

# DT-FR18-10: Địa chỉ chứa HTML tag phải được escape — không render HTML

## Requirement ID
SEC-04

## Module / Test type / Technique
FR18 Admin Order / Security / Equivalence Partitioning

## Preconditions
- Admin đăng nhập thành công
- Tạo order với địa chỉ có HTML tag

## Test data
| shipping_address | `<b>Dia chi test</b>` |
| Phân vùng | EP-X2 (HTML tag thông thường) |

## Test steps
1. Tạo order với địa chỉ `<b>Dia chi test</b>`
2. Admin đăng nhập, vào admin panel
3. Tìm order và quan sát hiển thị địa chỉ giao hàng

## Expected result
Admin UI hiển thị literal `<b>Dia chi test</b>` — không in đậm; HTML được escape.

## Status / Related bugs
Not Run / None

---

# DT-FR18-11: XSS payload trong địa chỉ giao hàng phải bị escape — SEC-04

## Requirement ID
SEC-04

## Module / Test type / Technique
FR18 Admin Order / Security / Equivalence Partitioning

## Preconditions
- Admin đăng nhập thành công
- Tạo order với XSS payload trong địa chỉ

## Test data
| shipping_address | `<img src=x onerror=alert(1)>` |
| Phân vùng | EP-X3 (XSS payload) |

## Test steps
1. Tạo order với XSS payload trong shipping_address
2. Admin đăng nhập, vào admin panel
3. Tìm order — quan sát xem có alert/popup nào xuất hiện không
4. Inspect DOM — kiểm tra địa chỉ được escaped hay không

## Expected result
Admin UI hiển thị escaped text; không có alert/popup nào xảy ra; SEC-04.

## Status / Related bugs
Not Run / None

---

## Bước 5 — Ma trận bao phủ phân vùng

| Phân vùng | Test case đại diện | Bao phủ |
|-----------|------------------|---------|
| EP-A1 (no token) | DT-FR18-01 | Dat |
| EP-A2 (user token) | DT-FR18-02 | Dat |
| EP-A3 (admin token) | DT-FR18-03 | Dat |
| EP-O1 (0 orders) | DT-FR18-04 | Dat |
| EP-O2 (all statuses) | DT-FR18-05 | Dat |
| EP-S1 (valid transition) | DT-FR18-06 | Dat |
| EP-S2 (invalid transition) | DT-FR18-07 | Dat |
| EP-S3 (non-existent order) | DT-FR18-08 | Dat |
| EP-X1 (plain text) | DT-FR18-09 | Dat |
| EP-X2 (HTML tag) | DT-FR18-10 | Dat |
| EP-X3 (XSS payload) | DT-FR18-11 | Dat |

---

## Bước 6 — Phân tích khoảng cách AI (AI Gap Analysis)

> _Điền sau khi thực thi test tại `test-runs/`. Ghi lại các test case hoặc lỗi mà AI bỏ sót._

| Khoảng cách | AI bỏ sót? | Nguyên nhân |
|------------|-----------|------------|
| _(điền sau khi thực thi)_ | | |
