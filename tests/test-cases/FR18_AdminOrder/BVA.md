# FR-18: Quản lý Đơn hàng (Admin) — Phân tích Giá trị Biên (Thiết kế Test Case)

**Tính năng:** FR-18 — Admin Order Management  
**Nhóm tính năng:** Pool C — Phân hệ Web Admin  
**Nguồn đặc tả:** `README.md` §FR-18, §FR-12, §SEC-03, §SEC-04  
**Phương pháp:** Phân tích Giá trị Biên (BVA) — 3 điểm mỗi biên  
**Điều kiện tiên quyết:** Các phân vùng đã được xác định trong `test-cases/FR18_AdminOrder/DomainTesting.md`  
**Hướng dẫn kỹ thuật:** `.claude/skills/boundary-value-analysis`

---

## Bước 1 — Xác định các ranh giới

| # | Ranh giới | Mô tả | Tham chiếu đặc tả |
|---|-----------|-------|-------------------|
| B1 | Role threshold (no-token → user → admin) | Ranh giới giữa "không có quyền" và "có quyền admin" — FR-12 yêu cầu cả token hợp lệ VÀ role=admin | FR-12, SEC-03 |
| B2 | Safe vs unsafe content (plain → HTML → XSS) | Ranh giới giữa nội dung an toàn và nội dung có khả năng inject HTML/script | SEC-04 |
| B3 | Order count (empty → non-empty) | Ranh giới giữa "không có đơn nào" (empty state) và "có ít nhất 1 đơn" | FR-18 |

### Xác nhận tính bao gồm/loại trừ

| Ranh giới | Nguyên văn đặc tả | Bao gồm biên? |
|-----------|------------------|--------------|
| B1: user token vs admin token | "API Admin phải kiểm tra `role = 'admin'` trong Token" — SEC-03 | user ∉ tập hợp lệ; admin ∈ tập hợp lệ |
| B2: `<` char | "không dùng `innerHTML` trực tiếp" — SEC-04 | Ký tự `<` là điểm khởi đầu của HTML injection |
| B3: 0 vs 1 order | "Admin xem toàn bộ đơn hàng" — FR-18 | 0 orders → empty state; 1 order → phải hiển thị |

---

## Bước 2 — Danh sách Test Case BVA

> **Tài liệu chỉ dành cho thiết kế.** Kết quả thực tế thuộc về `test-runs/FR18_AdminOrder/BVA.md`.

---

# BVA-FR18-01: Không có Authorization token — dưới biên B1, từ chối

## Requirement ID
FR-12, SEC-03

## Module / Test type / Technique
FR18 Admin Order / Security / BVA

## Preconditions
- SUT đang chạy
- Ranh giới B1: role boundary — no-token < user < admin

## Test data
| Authorization | (không có header) |
| Ranh giới | B1: dưới biên (không có token) |

## Test steps
1. Gửi `GET /api/admin/orders` không kèm Authorization header
2. Kiểm tra HTTP status và response body

## Expected result
HTTP 401; không trả dữ liệu.

## Status / Related bugs
Not Run / None

---

# BVA-FR18-02: User token ngay dưới admin role — bị từ chối như no-token (SEC-03)

## Requirement ID
FR-12, SEC-03

## Module / Test type / Technique
FR18 Admin Order / Security / BVA

## Preconditions
- Đăng nhập user thường
- Ranh giới B1: user token ngay dưới admin trong trục quyền

## Test data
| Authorization | Bearer {user_jwt} |
| role | user |
| Ranh giới | B1: tại biên dưới (user token) |

## Test steps
1. Đăng nhập user thường, lấy JWT
2. Gửi `GET /api/admin/orders` với user token
3. Kiểm tra HTTP status

## Expected result
HTTP 401/403; bị từ chối như no-token (SEC-03).

## Status / Related bugs
Not Run / None

---

# BVA-FR18-03: Admin token ngay trên boundary — truy cập thành công

## Requirement ID
FR-12

## Module / Test type / Technique
FR18 Admin Order / Security / BVA

## Preconditions
- Đăng nhập admin
- Ranh giới B1: admin token ngay trên boundary

## Test data
| Authorization | Bearer {admin_jwt} |
| role | admin |
| Ranh giới | B1: tại biên trên (admin token) |

## Test steps
1. Đăng nhập admin, lấy JWT
2. Gửi `GET /api/admin/orders` với admin token
3. Kiểm tra phản hồi

## Expected result
HTTP 200; trả về danh sách đơn hàng.

## Status / Related bugs
Not Run / None

---

# BVA-FR18-04: Địa chỉ plain ASCII — dưới biên B2, hiển thị bình thường

## Requirement ID
SEC-04

## Module / Test type / Technique
FR18 Admin Order / Security / BVA

## Preconditions
- Admin panel hiển thị order với địa chỉ plain text
- Ranh giới B2: plain text < ký tự `<` < XSS payload

## Test data
| shipping_address | 123 Le Loi, Q1 |
| Ranh giới | B2: dưới biên (plain ASCII, không có ký tự đặc biệt) |

## Test steps
1. Tạo order với địa chỉ plain ASCII `123 Le Loi, Q1`
2. Admin đăng nhập, vào admin panel
3. Tìm order và kiểm tra hiển thị địa chỉ

## Expected result
Hiển thị đúng như text gốc; không biến dạng.

## Status / Related bugs
Not Run / None

---

# BVA-FR18-05: Địa chỉ chứa ký tự < — tại biên B2, phải escape

## Requirement ID
SEC-04

## Module / Test type / Technique
FR18 Admin Order / Security / BVA

## Preconditions
- Admin panel hiển thị order có địa chỉ chứa tag
- Ranh giới B2: ký tự `<` là biên giữa safe và unsafe

## Test data
| shipping_address | `<script>` (1 tag đơn giản) |
| Ranh giới | B2: tại biên (ký tự `<` đầu tiên của HTML tag) |

## Test steps
1. Tạo order với địa chỉ `<script>`
2. Admin đăng nhập, vào admin panel
3. Tìm order — quan sát hiển thị và kiểm tra DOM

## Expected result
Hiển thị `&lt;script&gt;` hoặc literal `<script>` — không thực thi.

## Status / Related bugs
Not Run / None

---

# BVA-FR18-06: XSS payload đầy đủ — vượt biên B2, phải escape hoàn toàn (SEC-04)

## Requirement ID
SEC-04

## Module / Test type / Technique
FR18 Admin Order / Security / BVA

## Preconditions
- Admin panel hiển thị order có XSS payload
- Ranh giới B2: XSS payload vượt qua biên safe

## Test data
| shipping_address | `<img src=x onerror=alert(1)>` |
| Ranh giới | B2: vượt biên (XSS payload đầy đủ) |

## Test steps
1. Tạo order với XSS payload trong địa chỉ
2. Admin đăng nhập, vào admin panel
3. Tìm order — kiểm tra không có alert/popup
4. Inspect DOM — kiểm tra escaped text

## Expected result
Nội dung được escape hoàn toàn; không có alert/popup nào xảy ra; SEC-04.

## Status / Related bugs
Not Run / None

---

# BVA-FR18-07: Admin panel với 0 đơn hàng — dưới biên B3, empty state

## Requirement ID
FR-18

## Module / Test type / Technique
FR18 Admin Order / Functional / BVA

## Preconditions
- DB trống
- Admin đăng nhập thành công
- Ranh giới B3: 0 orders < 1 order

## Test data
| order_count | 0 |
| Ranh giới | B3: dưới biên (0 orders) |

## Test steps
1. Đảm bảo DB không có đơn hàng nào
2. Admin đăng nhập
3. Vào admin panel — trang quản lý đơn hàng
4. Quan sát giao diện

## Expected result
UI hiển thị empty state; không báo lỗi; bảng orders trống hoặc có thông báo "Chưa có đơn hàng".

## Status / Related bugs
Not Run / None

---

# BVA-FR18-08: Admin panel với đúng 1 đơn hàng — tại biên B3, hiển thị đầy đủ

## Requirement ID
FR-18

## Module / Test type / Technique
FR18 Admin Order / Functional / BVA

## Preconditions
- DB có đúng 1 đơn hàng
- Admin đăng nhập thành công
- Ranh giới B3: 1 order là điểm biên tối thiểu

## Test data
| order_count | 1 |
| Ranh giới | B3: tại biên (1 order) |

## Test steps
1. Tạo đúng 1 đơn hàng
2. Admin đăng nhập
3. Vào admin panel — trang quản lý đơn hàng
4. Quan sát danh sách

## Expected result
UI hiển thị 1 dòng trong bảng; thông tin đầy đủ (mã ĐH, user, tổng tiền, địa chỉ, trạng thái, nút hành động).

## Status / Related bugs
Not Run / None

---

## Bước 3 — Danh sách kiểm tra độ phủ ranh giới

- [x] B1: Role boundary — đủ 3 điểm (BVA-FR18-01, 02, 03)
- [x] B2: Content safety — đủ 3 điểm (BVA-FR18-04, 05, 06)
- [x] B3: Order count — 2 điểm (BVA-FR18-07, 08) — điểm "trên biên" không cần thiết (đã cover bởi DT-FR18-05)
- [x] Đã xác nhận tính bao gồm/loại trừ cho tất cả ranh giới

---

## Bước 4 — Phân tích khoảng cách AI (AI Gap Analysis)

> _Điền sau khi thực thi test tại `test-runs/`. Ghi lại các test case biên mà AI bỏ sót._

| Khoảng cách | AI bỏ sót? | Nguyên nhân |
|------------|-----------|------------|
| _(điền sau khi thực thi)_ | | |
