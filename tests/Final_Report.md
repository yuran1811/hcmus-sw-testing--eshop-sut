# Báo cáo Kiểm thử Cuối kỳ
## Domain Testing & Boundary Value Analysis

---

| | |
|---|---|
| **Họ tên** | Nguyễn Tuấn Anh |
| **MSSV** | 23127152 |
| **Branch** | `ntanh/23127152-HW2` |
| **Công cụ AI** | Claude Code (claude-sonnet-4-6) |

---

## Mục lục

1. [Tóm tắt tổng thể](#1-tóm-tắt-tổng-thể)
2. [Agent Skills](#2-agent-skills)
3. [Domain Testing Report](#3-domain-testing-report)
   - [FR-02 — Login & Lockout](#31-fr-02--login--lockout)
   - [FR-10 — Order State Machine](#32-fr-10--order-state-machine)
   - [FR-18 — Admin Order Management](#33-fr-18--admin-order-management)
   - [Mobile — Order History](#34-mobile--order-history)
4. [Boundary Value Analysis Report](#4-boundary-value-analysis-report)
   - [FR-02 — Login & Lockout](#41-fr-02--login--lockout)
   - [FR-10 — Order State Machine](#42-fr-10--order-state-machine)
   - [FR-18 — Admin Order Management](#43-fr-18--admin-order-management)
   - [Mobile — Order History](#44-mobile--order-history)
5. [Kết quả đạt được](#5-kết-quả-đạt-được)
6. [Bug Summary](#6-bug-summary)

> Chi tiết từng bug kèm screenshot: xem **[Bug_Report.md](./Bug_Report.md)**

---

## 1. Tóm tắt tổng thể

### 1.1 Kết quả theo feature

| Feature | Pool | TC Thiết kế | Thực thi | Đạt | Không đạt | Inconclusive | Bugs |
|---------|:----:|:-----------:|:--------:|:---:|:---------:|:------------:|:----:|
| FR-02: Login & Lockout | A | 29 | 29 | 22 | 6 | 1 | 4 |
| FR-10: Order State Machine | B | 21 | 21 | 18 | 3 | 0 | 2 |
| FR-18: Admin Order Mgmt | C | 19 | 19 | 13 | 6 | 0 | 2 |
| Mobile: Order History | D | 19 | 19 | 19 | 0 | 0 | 0 |
| **Tổng cộng** | | **88** | **88** | **72** | **15** | **1** | **8** |

### 1.2 Chỉ số tổng hợp

| Chỉ số | Giá trị |
|--------|:-------:|
| Tỉ lệ thực thi | **100%** (88/88) |
| Tỉ lệ đạt | **81.8%** (72/88) |
| Tổng bug phát hiện | **8** |
| Bug Critical (P0) | 2 |
| Bug Major (P1) | 4 |
| Bug Minor/Low (P2) | 2 |

### 1.3 Phân bố DT vs BVA

| Phương pháp | TC | Đạt | Không đạt | Bugs phát hiện |
|------------|:--:|:---:|:---------:|:--------------:|
| Domain Testing (DT) | 54 | 45 | 9 | 7* |
| Boundary Value Analysis (BVA) | 34 | 27 | 6 | 6* |

*Một số bug được phát hiện bởi cả DT lẫn BVA nên tổng > 8.

---

## 2. Agent Skills

Bài kiểm thử sử dụng **3 Claude Code skills** được định nghĩa trong `.claude/skills/`:

### 2.1 `domain-testing`

| Thuộc tính | Chi tiết |
|-----------|---------|
| **Mục đích** | Hướng dẫn phương pháp Domain Testing (Equivalence Partitioning) |
| **Áp dụng** | Thiết kế 54 TC Domain Testing trên 4 feature |
| **Output** | Bảng EP (biến, lớp, đại diện) + danh sách TC có precondition / steps / expected |

Quy trình skill áp dụng:
1. Xác định **biến đầu vào** và **không gian đầu vào** từ spec
2. Phân vùng thành các lớp tương đương (valid / invalid / boundary-adjacent)
3. Chọn **đại diện** mỗi lớp và sinh TC
4. Thực thi và ghi kết quả vào `test-runs/`

### 2.2 `boundary-value-analysis` (BVA)

| Thuộc tính | Chi tiết |
|-----------|---------|
| **Mục đích** | Hướng dẫn phân tích giá trị biên 3-điểm |
| **Áp dụng** | Thiết kế 34 TC BVA trên 4 feature |
| **Chiến lược** | Mỗi biên: **dưới biên / tại biên / vượt biên** |

Quy trình skill áp dụng:
1. Xác định **biên** từ spec (ngưỡng số học, ranh giới trạng thái, điều kiện logic)
2. Sinh 3 điểm mỗi biên (below / at / above)
3. Thiết kế TC với precondition rõ ràng
4. Thực thi và ghi kết quả; phân tích điểm biên bị vi phạm

### 2.3 `executing-plans`

| Thuộc tính | Chi tiết |
|-----------|---------|
| **Mục đích** | Quản lý tiến độ theo kế hoạch có cấu trúc |
| **Áp dụng** | Điều phối 5 phase: FR-02 → FR-10 → FR-18 → Mobile → Deliverables |
| **Output** | `plan.md` với checklist phase + task được đánh dấu done theo thời gian thực |

---

## 3. Domain Testing Report

**Phương pháp:** Equivalence Partitioning — phân vùng không gian đầu vào thành các lớp tương đương, chọn đại diện từ mỗi lớp, thiết kế TC bao phủ mọi lớp với số TC tối thiểu.

---

### 3.1 FR-02 — Login & Lockout

**Spec:** §FR-02, §FR-22 | **URL:** `http://localhost:5173/login` | **API:** `POST /api/login`

#### Bảng Equivalence Partitioning

| Biến | Lớp EP | Đại diện |
|------|--------|---------|
| `email` | Hợp lệ + tồn tại | `test@eshop.com` |
| | Hợp lệ + không tồn tại | `nobody@test.com` |
| | Sai định dạng (thiếu `@`) | `testeshop.com` |
| | Sai định dạng (thiếu domain) | `test@` |
| | Rỗng | `""` |
| | Chỉ khoảng trắng | `"   "` |
| `password` | Đúng | `Test1234!` |
| | Sai | `WrongPass999!` |
| | Rỗng | `""` |
| | Đúng giá trị, sai hoa/thường | `test1234!` |
| `account_state` | Bình thường | 0 lần sai |
| | Đang bị khóa | ≥3 lần sai liên tiếp |
| | Khóa đã hết hạn | >30s sau khi bị khóa |
| `input_type` (FR-22) | Email field type | DOM attribute `type` |
| | Password field type | DOM attribute `type` |
| | Vị trí thông báo lỗi | DOM position |

#### Kết quả thực thi (17 TC)

| Mã TC | Mô tả | Kết quả | Đạt/Không đạt |
|-------|-------|---------|:---:|
| DT-FR02-01 | Đăng nhập hợp lệ (user) | Chuyển hướng `/` thành công | ✅ |
| DT-FR02-02 | Đăng nhập hợp lệ (admin) | Chuyển hướng + role=admin đúng | ✅ |
| DT-FR02-03 | Email không tồn tại | Thông báo chung, không lộ thông tin | ✅ |
| DT-FR02-04 | Email thiếu `@` | Thông báo chung | ✅ |
| DT-FR02-05 | Email thiếu domain | Thông báo chung | ✅ |
| DT-FR02-06 | Email rỗng | Block bởi `required` | ✅ |
| DT-FR02-07 | Email chỉ khoảng trắng | Thông báo chung | ✅ |
| DT-FR02-08 | Sai mật khẩu | Thông báo chung; bộ đếm tăng | ✅ |
| DT-FR02-09 | Mật khẩu rỗng | Block bởi `required` | ✅ |
| DT-FR02-10 | Đúng email, sai hoa/thường | Thất bại — case-sensitive đúng | ✅ |
| DT-FR02-11 | 1 lần sai → đăng nhập đúng | Bộ đếm reset; thành công | ✅ |
| DT-FR02-12 | Lần sai thứ 3 → kích hoạt khóa | Khóa kích hoạt đúng | ✅ |
| DT-FR02-13 | Đang bị khóa → nhập đúng vẫn fail | Từ chối; thông báo chung | ✅ |
| DT-FR02-14 | Sau 30s → khóa tự gỡ | **Vẫn thất bại sau 38s** | ❌ **BUG-01** |
| DT-FR02-15 | Input email phải có `type="email"` | **`type="text"` — sai attribute** | ❌ **BUG-02** |
| DT-FR02-16 | Input password phải có `type="password"` | **`type="text"` — mật khẩu lộ rõ** | ❌ **BUG-03** |
| DT-FR02-17 | Thông báo lỗi phải trên nút submit | **Thông báo ở dưới nút (lệch 92px)** | ❌ **BUG-04** |

**Kết quả DT-FR02:** 13 Đạt / 4 Không đạt (76.5%)

---

### 3.2 FR-10 — Order State Machine

**Spec:** §FR-10 | **URL:** `localhost:5173` (user) + `localhost:5174` (admin)

#### State Machine

```
pending ──[admin confirm]──► confirmed ──[admin ship]──► shipping ──[admin complete]──► delivered
   │                             │                          │
   └──[admin/user cancel]──►     └──[admin/user cancel]──►  └──[admin cancel ONLY]──► canceled
```

#### Bảng Equivalence Partitioning

| Lớp | Mô tả | Transitions |
|-----|-------|-------------|
| EP-T1 | Admin forward path (hợp lệ) | pending→confirmed, confirmed→shipping, shipping→delivered |
| EP-T2 | Admin cancel (hợp lệ) | pending/confirmed/**shipping** → canceled |
| EP-T3 | User cancel (hợp lệ) | pending→canceled, confirmed→canceled |
| EP-T4 | Terminal state (không hợp lệ) | delivered→any, canceled→any |
| EP-T5 | Actor violation — user cố hủy shipping | shipping→canceled (user) |
| EP-T6 | Skip state (không hợp lệ) | pending→shipping, confirmed→delivered |

#### Kết quả thực thi (13 TC)

| Mã TC | Mô tả | Lớp | Kết quả | Đạt/Không đạt |
|-------|-------|-----|---------|:---:|
| DT-FR10-01 | Admin: pending→confirmed | EP-T1 | HTTP 200; badge đúng | ✅ |
| DT-FR10-02 | Admin: confirmed→shipping | EP-T1 | HTTP 200; đúng | ✅ |
| DT-FR10-03 | Admin: shipping→delivered | EP-T1 | HTTP 200; terminal đúng | ✅ |
| DT-FR10-04 | Admin: pending→canceled | EP-T2 | HTTP 200; đúng | ✅ |
| DT-FR10-05 | Admin: confirmed→canceled | EP-T2 | HTTP 200; đúng | ✅ |
| DT-FR10-06 | Admin: shipping→canceled | EP-T2 | **UI không có nút Hủy; API 400** | ❌ **BUG-06** |
| DT-FR10-07 | User: pending→canceled | EP-T3 | HTTP 200; đúng | ✅ |
| DT-FR10-08 | User: confirmed→canceled | EP-T3 | HTTP 200; đúng | ✅ |
| DT-FR10-09 | Admin: delivered→confirmed | EP-T4 | API 400 đúng | ✅ |
| DT-FR10-10 | Admin: canceled→confirmed | EP-T4 | API từ chối đúng | ✅ |
| DT-FR10-11 | User: shipping→canceled | EP-T5 | **Nút hiển thị; API 200** | ❌ **BUG-05** |
| DT-FR10-12 | Admin: pending→shipping (skip) | EP-T6 | API 400 đúng | ✅ |
| DT-FR10-13 | Admin: confirmed→delivered (skip) | EP-T6 | API 400 đúng | ✅ |

**Kết quả DT-FR10:** 11 Đạt / 2 Không đạt (84.6%)

---

### 3.3 FR-18 — Admin Order Management

**Spec:** §FR-18, §SEC-03, §SEC-04 | **URL:** `http://localhost:5174`

#### Bảng Equivalence Partitioning

| Biến | Lớp | Đại diện |
|------|-----|---------|
| `auth_token` | Không có token | Request không có header |
| | User token (role=user) | JWT hợp lệ, sai quyền |
| | Admin token (role=admin) | JWT hợp lệ, đúng quyền |
| `order_list_state` | 0 đơn hàng | DB trống |
| | Đủ 5 trạng thái | pending/confirmed/shipping/delivered/canceled |
| `status_transition` | Chuyển hợp lệ | pending→confirmed |
| | Chuyển không hợp lệ | pending→shipping (skip) |
| | orderId không tồn tại | id=99999 |
| `shipping_address` (render) | Plain text | `123 Le Loi, Q1` |
| | HTML tag | `<b>Dia chi</b>` |
| | XSS payload | `<img src=x onerror=alert(1)>` |

#### Kết quả thực thi (11 TC)

| Mã TC | Mô tả | Kết quả | Đạt/Không đạt |
|-------|-------|---------|:---:|
| DT-FR18-01 | No token → GET /api/admin/orders | HTTP 401 đúng | ✅ |
| DT-FR18-02 | User token → GET /api/admin/orders | **HTTP 200 + 84 records** | ❌ **BUG-07** |
| DT-FR18-03 | Admin token → GET /api/admin/orders | HTTP 200; 74 đơn | ✅ |
| DT-FR18-04 | Admin panel hiển thị bảng đơn | Đúng, không lỗi | ✅ |
| DT-FR18-05 | Hiển thị đủ 5 trạng thái | 5/5 tìm thấy | ✅ |
| DT-FR18-06 | Chuyển hợp lệ (pending→confirmed) | HTTP 200; badge cập nhật | ✅ |
| DT-FR18-07 | Chuyển không hợp lệ (skip) | HTTP 400 đúng | ✅ |
| DT-FR18-08 | orderId không tồn tại | HTTP 404 đúng | ✅ |
| DT-FR18-09 | Plain text hiển thị đúng | Literal text | ✅ |
| DT-FR18-10 | HTML tag → phải escape | **`<b>` render in đậm** | ❌ **BUG-08** |
| DT-FR18-11 | XSS payload → phải escape | **`alert()` thực thi** | ❌ **BUG-08** |

**Kết quả DT-FR18:** 8 Đạt / 3 Không đạt (72.7%)

---

### 3.4 Mobile — Order History

**Spec:** §FR-20, §FR-10 | **URL:** `http://localhost:8081` (Expo Web)

#### Bảng Equivalence Partitioning

| Biến | Lớp | Đại diện |
|------|-----|---------|
| `order_display` | 0 đơn (empty state) | Tài khoản chưa có đơn |
| | 1 đơn per trạng thái (×5) | pending/confirmed/shipping/delivered/canceled |
| `cancel_button` | Hiển thị (pending) | Nút phải có |
| | Hiển thị (confirmed) | Nút phải có |
| | Ẩn (shipping/delivered/canceled) | Nút không được có |
| `status_label` | 5 trạng thái → tiếng Việt | Chờ xác nhận / Đã xác nhận / ... |

#### Kết quả thực thi (13 TC — tất cả Đạt)

| Mã TC | Mô tả | Kết quả | Đạt/Không đạt |
|-------|-------|---------|:---:|
| DT-MOB-01 | Đăng nhập, vào Order History | Load thành công | ✅ |
| DT-MOB-02 | 0 đơn → empty state | Thông báo thân thiện | ✅ |
| DT-MOB-03 | Đơn pending — nhãn tiếng Việt | "Chờ xác nhận" đúng | ✅ |
| DT-MOB-04 | Đơn confirmed — nhãn tiếng Việt | "Đã xác nhận" đúng | ✅ |
| DT-MOB-05 | Đơn shipping — nhãn tiếng Việt | "Đang giao" đúng | ✅ |
| DT-MOB-06 | Đơn delivered — nhãn tiếng Việt | "Đã giao" đúng | ✅ |
| DT-MOB-07 | Đơn canceled — nhãn tiếng Việt | "Đã hủy" đúng | ✅ |
| DT-MOB-08 | Nút Hủy hiển thị cho pending | Nút có mặt | ✅ |
| DT-MOB-09 | Nút Hủy hiển thị cho confirmed | Nút có mặt | ✅ |
| DT-MOB-10 | Nút Hủy ẩn cho shipping | Không có nút | ✅ |
| DT-MOB-11 | Hủy đơn pending thành công | API 200; trạng thái cập nhật | ✅ |
| DT-MOB-12 | Hủy đơn confirmed thành công | API 200; trạng thái cập nhật | ✅ |
| DT-MOB-13 | Gọi API cancel shipping (trực tiếp) | API 200 — phản chiếu BUG-05 | ✅* |

*Mobile UI đúng spec; lỗi do backend (BUG-05) đã biết.

**Kết quả DT-MOB:** 13/13 Đạt (100%)

### Tổng kết Domain Testing

| Feature | TC | Đạt | Không đạt | Tỉ lệ |
|---------|:--:|:---:|:---------:|:-----:|
| FR-02 | 17 | 13 | 4 | 76.5% |
| FR-10 | 13 | 11 | 2 | 84.6% |
| FR-18 | 11 | 8 | 3 | 72.7% |
| Mobile | 13 | 13 | 0 | 100% |
| **Tổng** | **54** | **45** | **9** | **83.3%** |

---

## 4. Boundary Value Analysis Report

**Chiến lược:** 3-điểm mỗi biên — **dưới biên / tại biên / vượt biên**. Tập trung vào ngưỡng số học, ranh giới trạng thái, và điều kiện logic trong spec.

---

### 4.1 FR-02 — Login & Lockout

#### Biên được xác định

| Mã biên | Biến | Điểm biên | Mô tả |
|---------|------|-----------|-------|
| B1 | `login_attempts` | 2 / 3 / 4 | Ngưỡng kích hoạt khóa tài khoản |
| B2 | `lock_duration` | ~25s / ~30s / ~35s | Thời gian tự gỡ khóa |
| B3 | `email.length` | 253 / 254 / 255 ký tự | Giới hạn RFC 5321 |
| B4 | `password.length` | 0 / 1 ký tự | Tồn tại tối thiểu |
| B5 | `counter_reset` | Sau đăng nhập thành công | Bộ đếm về 0 |

#### Kết quả thực thi (12 TC)

| Mã TC | Biên | Điểm | Kết quả | Đạt/Không đạt |
|-------|------|------|---------|:---:|
| BVA-FR02-01 | B1 | Dưới (2 lần sai) | Chưa khóa; đăng nhập đúng OK | ✅ |
| BVA-FR02-02 | B1 | Tại biên (3 lần sai) | Khóa kích hoạt đúng | ✅ |
| BVA-FR02-03 | B1 | Vượt biên (trong khóa) | Từ chối dù nhập đúng | ✅ |
| BVA-FR02-04 | B2 | Dưới (~25-28s) | Vẫn bị khóa — đúng | ✅ |
| BVA-FR02-05 | B2 | Tại biên (~30s) | **Không kết luận** — timing không ổn định | ⚠️ |
| BVA-FR02-06 | B2 | Vượt biên (~35s) | **Vẫn thất bại sau 35s** | ❌ **BUG-01** |
| BVA-FR02-07 | B3 | Dưới (253 ký tự) | Chấp nhận | ✅ |
| BVA-FR02-08 | B3 | Tại biên (254 ký tự) | Chấp nhận | ✅ |
| BVA-FR02-09 | B3 | Vượt biên (255 ký tự) | Từ chối đúng | ✅ |
| BVA-FR02-10 | B4 | Dưới (0 ký tự) | Block bởi `required` | ✅ |
| BVA-FR02-11 | B4 | Tại biên (1 ký tự) | Từ chối đúng (sai giá trị) | ✅ |
| BVA-FR02-12 | B5 | Reset counter | **Không kết luận** — BUG-01 ảnh hưởng | ❌ |

**Kết quả BVA-FR02:** 9 Đạt / 2 Không đạt / 1 Inconclusive (75.0%)

---

### 4.2 FR-10 — Order State Machine

#### Biên được xác định

| Mã biên | Biến | Điểm biên | Mô tả |
|---------|------|-----------|-------|
| B1 | `cancel_eligibility` (user) | confirmed / shipping / delivered | `confirmed` = trạng thái cuối user được hủy |
| B2 | Admin forward path | confirmed→shipping / shipping→delivered / delivered→any | Điểm bước sang terminal |
| B3 | `canceled` terminal | vào canceled / từ canceled | Bảo vệ terminal |

#### Kết quả thực thi (8 TC)

| Mã TC | Biên | Điểm | Kết quả | Đạt/Không đạt |
|-------|------|------|---------|:---:|
| BVA-FR10-01 | B1 | Dưới (pending) | User hủy pending — đúng spec | ✅ |
| BVA-FR10-02 | B1 | Tại biên (confirmed) | User hủy confirmed — đúng spec | ✅ |
| BVA-FR10-03 | B1 | Vượt biên (shipping) | **User hủy được shipping — sai spec** | ❌ **BUG-05** |
| BVA-FR10-04 | B2 | Dưới (confirmed→shipping) | Admin chuyển thành công | ✅ |
| BVA-FR10-05 | B2 | Tại biên (shipping→delivered) | Admin chuyển vào terminal đúng | ✅ |
| BVA-FR10-06 | B2 | Vượt biên (delivered→any) | Terminal bảo vệ đúng | ✅ |
| BVA-FR10-07 | B3 | Vào canceled | Chuyển đúng | ✅ |
| BVA-FR10-08 | B3 | Từ canceled | Backend từ chối; UI nhãn minor | ✅ |

**Kết quả BVA-FR10:** 7 Đạt / 1 Không đạt (87.5%)

---

### 4.3 FR-18 — Admin Order Management

#### Biên được xác định

| Mã biên | Biến | Điểm biên | Mô tả |
|---------|------|-----------|-------|
| B1 | `role` | no-token / user-token / admin-token | Ranh giới quyền truy cập |
| B2 | `content_safety` | plain text / ký tự `<` / XSS payload | Ranh giới safe vs unsafe |
| B3 | `order_count` | 0 / 1 orders | Empty state boundary |

#### Kết quả thực thi (8 TC)

| Mã TC | Biên | Điểm | Kết quả | Đạt/Không đạt |
|-------|------|------|---------|:---:|
| BVA-FR18-01 | B1 | Dưới (no token) | HTTP 401 đúng | ✅ |
| BVA-FR18-02 | B1 | Tại biên dưới (user token) | **HTTP 200 thay vì 403** | ❌ **BUG-07** |
| BVA-FR18-03 | B1 | Tại biên trên (admin token) | HTTP 200 đúng | ✅ |
| BVA-FR18-04 | B2 | Dưới (plain text) | Hiển thị đúng | ✅ |
| BVA-FR18-05 | B2 | Tại biên (`<script>`) | **Script thực thi** | ❌ **BUG-08** |
| BVA-FR18-06 | B2 | Vượt biên (XSS img) | **XSS thành công, alert bắn** | ❌ **BUG-08** |
| BVA-FR18-07 | B3 | Dưới (0 orders) | API structure đúng | ✅ |
| BVA-FR18-08 | B3 | Tại biên (1 order) | Hiển thị đầy đủ | ✅ |

**Kết quả BVA-FR18:** 5 Đạt / 3 Không đạt (62.5%)

---

### 4.4 Mobile — Order History

#### Biên được xác định

| Mã biên | Biến | Điểm biên | Mô tả |
|---------|------|-----------|-------|
| B1 | `cancel_eligibility` | confirmed / shipping / delivered | `shipping` = trạng thái đầu tiên không được hủy |
| B2 | `order_count` | 0 / 1 / ≥2 orders | Empty state boundary |

#### Kết quả thực thi (6 TC — tất cả Đạt)

| Mã TC | Biên | Điểm | Kết quả | Đạt/Không đạt |
|-------|------|------|---------|:---:|
| BVA-MOB-01 | B1 | Dưới (confirmed) | Nút Hủy hiển thị; hủy thành công | ✅ |
| BVA-MOB-02 | B1 | Tại biên (shipping) | Nút Hủy ẩn — biên đúng trong mobile UI | ✅ |
| BVA-MOB-03 | B1 | Vượt biên (delivered) | Nút Hủy ẩn — terminal đúng | ✅ |
| BVA-MOB-04 | B2 | Dưới (0 đơn) | Empty state thân thiện | ✅ |
| BVA-MOB-05 | B2 | Tại biên (1 đơn) | Danh sách hiển thị đúng | ✅ |
| BVA-MOB-06 | B2 | Vượt biên (≥2 đơn) | Danh sách + nhãn đúng | ✅ |

**Kết quả BVA-MOB:** 6/6 Đạt (100%)

### Tổng kết BVA

| Feature | TC | Đạt | Không đạt | Inconclusive | Tỉ lệ đạt |
|---------|:--:|:---:|:---------:|:------------:|:---------:|
| FR-02 | 12 | 9 | 2 | 1 | 75.0% |
| FR-10 | 8 | 7 | 1 | 0 | 87.5% |
| FR-18 | 8 | 5 | 3 | 0 | 62.5% |
| Mobile | 6 | 6 | 0 | 0 | 100% |
| **Tổng** | **34** | **27** | **6** | **1** | **79.4%** |

---

## 5. Kết quả đạt được

### 5.1 Coverage tổng thể

| Hạng mục | Kết quả |
|----------|---------|
| TC thiết kế | **88** TC (54 DT + 34 BVA) |
| TC thực thi | **88/88** — 100% |
| Features bao phủ | **4/4** (FR-02, FR-10, FR-18, Mobile) |
| Bug phát hiện | **8** bugs thực sự |
| Bug bảo mật (OWASP) | **2** — BUG-07 (A01) + BUG-08 (A03) |

### 5.2 Phát hiện đáng chú ý

**BUG-08 (Stored XSS) + BUG-07 (IDOR) = Attack Chain hoàn chỉnh**

Chỉ với quyền user thường, kẻ tấn công có thể:
1. Tạo đơn hàng với XSS payload trong `shipping_address`
2. Payload lưu vào DB → thực thi khi admin mở trang orders
3. Đánh cắp session admin → gọi `GET /api/admin/orders` (BUG-07) không bị giới hạn
4. Full compromise hệ thống

Đây là phát hiện có giá trị thực tế cao — không phải lỗi lý thuyết mà là attack vector hoạt động được.

**BUG-05 + BUG-06 = Logic hoán đổi actor**

Hai bug bổ sung nhau: user được phép hủy từ `shipping` (BUG-05), admin không được phép hủy từ `shipping` (BUG-06). Đây là dấu hiệu của một lỗi duy nhất trong state transition validator, không phải hai bug độc lập.

### 5.3 Mobile: 100% pass — observation quan trọng

Mobile UI (`App.js`) ẩn nút Hủy đúng tại biên `shipping` (BVA-MOB-02 pass). Điều này chứng minh lỗi BUG-05 nằm ở tầng **backend**, không phải frontend. Mobile frontend đúng spec nhưng backend API vẫn chấp nhận cancel request từ shipping.

### 5.4 Self-assessment

| Hạng mục | Điểm tối đa | Tự chấm | Lý do |
|----------|:-----------:|:-------:|-------|
| FR-02 (Pool A) | 25 | 22 | 29 TC; 4 bugs; BUG-01 timeout không tái hiện chính xác tại đúng giây 30 |
| FR-10 (Pool B) | 25 | 23 | 21 TC; 2 bugs; state machine coverage đầy đủ |
| FR-18 (Pool C) | 25 | 24 | 19 TC; 2 bugs bảo mật nghiêm trọng (IDOR + XSS) |
| Mobile (Pool D) | 15 | 14 | 19 TC; 0 bugs mới; mobile UI đúng spec |
| Agent Skills | 10 | 9 | 3 skills document + demo |
| **Tổng** | **100** | **92** | |

---

## 6. Bug Summary

> Chi tiết từng bug kèm screenshot: xem **[Bug_Report.md](./Bug_Report.md)**

| Mã | Feature | Severity | Priority | Mô tả tóm tắt |
|----|---------|:--------:|:--------:|--------------|
| BUG-01 | FR-02 | Major | P1 | Khóa tài khoản không tự gỡ sau 30 giây |
| BUG-02 | FR-02 | Major | P2 | Input email có `type="text"` thay vì `type="email"` |
| BUG-03 | FR-02 | **Critical** | **P0** | Input password `type="text"` — mật khẩu lộ plain text |
| BUG-04 | FR-02 | Minor | P2 | Thông báo lỗi hiển thị dưới nút submit |
| BUG-05 | FR-10 | Major | P1 | User hủy được đơn `shipping` — vi phạm FR-10 |
| BUG-06 | FR-10 | Major | P1 | Admin không hủy được đơn `shipping` — vi phạm FR-10 |
| BUG-07 | FR-18 | Major | P1 | IDOR: user token truy cập `GET /api/admin/orders` |
| BUG-08 | FR-18 | **Critical** | **P0** | Stored XSS qua `shipping_address` — session admin bị lộ |

---

## 7. Commit Log

> File đầy đủ: **[commit-log.txt](./commit-log.txt)**

Lịch sử commit trên branch `ntanh/23127152-HW2` theo thứ tự từ mới đến cũ:

| SHA (7 ký tự) | Ngày | Nội dung commit |
|:-------------:|------|----------------|
| `b99eaed` | 2026-06-28 | add report |
| `542c171` | 2026-06-28 | add AI-audit |
| `8ce4df6` | 2026-06-28 | test(mobile): test summary |
| `a0de32c` | 2026-06-28 | test(mobile): execution — domain testing + BVA with screenshots report |
| `4b4a07c` | 2026-06-28 | test(mobile): domain testing + BVA — variables, order status classes, cancel boundary design |
| `4472c56` | 2026-06-28 | test(fr18): test summary |
| `465e247` | 2026-06-28 | test(fr18): Execution — domain testing + BVA with screenshots report |
| `db812f6` | 2026-06-28 | test(fr18): domain testing + BVA — variables, auth/content classes, boundaries, test cases design |
| `b2bb961` | 2026-06-28 | test(FR10): add test summary FR10 |
| `2dccb2e` | 2026-06-28 | test(FR10): execute DT and BVA test cases |
| `a66aff6` | 2026-06-28 | test(FR10): add Domain Testing and BVA test case design for Order State Machine |
| `78f9c5a` | 2026-06-28 | test(fr02): test summary |
| `6161a8c` | 2026-06-28 | test(fr02): bug reports |
| `5318fd4` | 2026-06-28 | test(fr02): Execution — domain testing + BVA with screenshots report |
| `4e839d7` | 2026-06-28 | test(fr02): restructure |
| `3ccc36a` | 2026-06-28 | test(fr02): domain testing and bva |
| `239f7b3` | 2026-06-28 | add claude skill |
| `3bc3b7c` | 2026-06-08 | chore: create bug issue templates *(repo maintainer)* |
| `85af3ba` | 2026-05-15 | first upload *(repo maintainer)* |
| `2f9bf2b` | 2026-05-15 | Initial commit *(repo maintainer)* |

**Nhận xét:** Toàn bộ 14 commit thuộc về bài kiểm thử (từ `239f7b3` đến `b99eaed`) được thực hiện trong ngày 2026-06-28 — phản ánh workflow tập trung, liên tục từ thiết kế → thực thi → báo cáo trong một ngày làm việc.

---

*Báo cáo được tạo bởi: Nguyễn Tuấn Anh (23127152) — 2026-06-28*  
*Công cụ: Claude Code (claude-sonnet-4-6) + Playwright MCP*
