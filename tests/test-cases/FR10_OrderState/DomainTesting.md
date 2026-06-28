# FR-10: Trạng thái Đơn hàng — Kiểm thử Miền (Thiết kế Test Case)

**Tính năng:** FR-10 — Order State Machine  
**Nhóm tính năng:** Pool B — Quản lý Đơn hàng  
**Nguồn đặc tả:** `README.md` §FR-10, §FR-18, §FR-20  
**Phương pháp:** Kiểm thử Miền — Phân vùng tương đương (Equivalence Partitioning)  
**Hướng dẫn kỹ thuật:** `.claude/skills/domain-testing`

---

## Bước 1 — Sơ đồ trạng thái (từ đặc tả)

```
                 [Admin xác nhận]          [Admin giao hàng]      [Admin hoàn tất]
  ┌──────────┐ ─────────────────► ┌───────────┐ ──────────────► ┌──────────┐ ──────────► ┌───────────┐
  │ pending  │                    │ confirmed │                  │ shipping │             │ delivered │
  └──────────┘                    └───────────┘                  └──────────┘             └───────────┘
       │                               │                              │
       │ [User/Admin hủy]              │ [User/Admin hủy]             │ [Admin hủy — User KHÔNG được]
       ▼                               ▼                              ▼
  ┌──────────┐                    ┌──────────┐                  ┌──────────┐
  │ canceled │                    │ canceled │                  │ canceled │
  └──────────┘                    └──────────┘                  └──────────┘
```

**Ràng buộc từ đặc tả:**
- `delivered` và `canceled` là **trạng thái kết thúc** — không được phép chuyển tiếp.
- Khi đơn ở `shipping`, **User không được hủy** — chỉ Admin mới có quyền.
- Mọi chuyển đổi không hợp lệ phải trả về lỗi.

---

## Bước 2 — Xác định biến đầu vào

| # | Biến | Nguồn | Kiểu dữ liệu | Ghi chú |
|---|------|--------|--------------|---------|
| 1 | `current_status` | Trạng thái hiện tại của đơn hàng trong DB | enum | pending / confirmed / shipping / delivered / canceled |
| 2 | `target_status` | Trạng thái mục tiêu muốn chuyển đến | enum | Phải theo đúng state machine |
| 3 | `actor` | Người thực hiện chuyển đổi | enum | user (PUT /api/orders/:id/cancel) hoặc admin (PUT /api/admin/orders/:id/status) |

---

## Bước 3 — Phân vùng tương đương

### 3.1 Biến: `current_status`

| Mã phân vùng | Tên phân vùng | Giá trị | Loại |
|-------------|--------------|---------|------|
| EP-CS1 | Trạng thái khởi tạo | `pending` | Hợp lệ — có thể chuyển đổi |
| EP-CS2 | Trạng thái trung gian 1 | `confirmed` | Hợp lệ — có thể chuyển đổi |
| EP-CS3 | Trạng thái trung gian 2 | `shipping` | Hợp lệ (Admin); User không hủy được |
| EP-CS4 | Trạng thái kết thúc 1 | `delivered` | Không hợp lệ để chuyển — terminal |
| EP-CS5 | Trạng thái kết thúc 2 | `canceled` | Không hợp lệ để chuyển — terminal |

### 3.2 Biến: `actor`

| Mã phân vùng | Tên phân vùng | Mô tả | Loại |
|-------------|--------------|-------|------|
| EP-AC1 | Admin | Tài khoản có role=admin; dùng API `/api/admin/orders/:id/status` | Hợp lệ — quyền đầy đủ |
| EP-AC2 | User | Tài khoản thường; chỉ dùng API `/api/orders/:id/cancel` | Hợp lệ — quyền giới hạn |

### 3.3 Lớp chuyển đổi trạng thái (kết hợp current_status × actor × target_status)

| Mã lớp | Tên lớp | Mô tả | Loại |
|--------|---------|-------|------|
| EP-T1 | Admin chuyển tiếp hợp lệ — luồng chính | pending→confirmed, confirmed→shipping, shipping→delivered | Hợp lệ |
| EP-T2 | Admin hủy hợp lệ | pending→canceled, confirmed→canceled, shipping→canceled | Hợp lệ |
| EP-T3 | User hủy hợp lệ | pending→canceled, confirmed→canceled | Hợp lệ |
| EP-T4 | Chuyển đổi từ trạng thái kết thúc | delivered→any, canceled→any | Không hợp lệ |
| EP-T5 | Vi phạm quyền Actor — User hủy khi đang shipping | shipping→canceled (User) | Không hợp lệ |
| EP-T6 | Bỏ qua trạng thái (skip state) — Admin | pending→shipping, pending→delivered, confirmed→delivered | Không hợp lệ |

---

## Bước 4 — Danh sách Test Case

> **Tài liệu chỉ dành cho thiết kế.** Kết quả thực tế thuộc về `test-runs/FR10_OrderState/DomainTesting.md`.  
> Nguyên tắc cô lập: mỗi TC kiểm thử một lớp chuyển đổi đại diện.

---

# DT-FR10-01: Admin chuyển đơn từ pending sang confirmed

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / Equivalence Partitioning

## Preconditions
- Tài khoản user có đơn hàng ở trạng thái `pending`
- Admin đăng nhập thành công

## Test data
| current_status | pending |
| target_status | confirmed |
| Actor | Admin |
| Lớp | EP-T1 + EP-CS1 + EP-AC1 |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `pending`
3. Nhấn nút "Xác nhận" hoặc gọi API `PUT /api/admin/orders/:id/status {status:"confirmed"}`
4. Kiểm tra trạng thái đơn hàng sau thao tác

## Expected result
Chuyển thành công sang `confirmed`; HTTP 200; trạng thái cập nhật trong DB.

## Status / Related bugs
Not Run / None

---

# DT-FR10-02: Admin chuyển đơn từ confirmed sang shipping

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng đang ở trạng thái `confirmed`
- Admin đăng nhập thành công

## Test data
| current_status | confirmed |
| target_status | shipping |
| Actor | Admin |
| Lớp | EP-T1 + EP-CS2 + EP-AC1 |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `confirmed`
3. Nhấn nút "Giao hàng" hoặc gọi API tương ứng
4. Kiểm tra trạng thái sau thao tác

## Expected result
Chuyển thành công sang `shipping`; HTTP 200.

## Status / Related bugs
Not Run / None

---

# DT-FR10-03: Admin chuyển đơn từ shipping sang delivered (terminal)

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng đang ở trạng thái `shipping`
- Admin đăng nhập thành công

## Test data
| current_status | shipping |
| target_status | delivered |
| Actor | Admin |
| Lớp | EP-T1 + EP-CS3 + EP-AC1 |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `shipping`
3. Nhấn nút "Hoàn thành" hoặc gọi API tương ứng
4. Kiểm tra trạng thái sau thao tác

## Expected result
Chuyển thành công sang `delivered`; HTTP 200; trạng thái kết thúc.

## Status / Related bugs
Not Run / None

---

# DT-FR10-04: Admin hủy đơn hàng ở trạng thái pending

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng đang ở trạng thái `pending`
- Admin đăng nhập thành công

## Test data
| current_status | pending |
| target_status | canceled |
| Actor | Admin |
| Lớp | EP-T2 + EP-CS1 + EP-AC1 |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `pending`
3. Nhấn nút "Hủy" hoặc gọi API cancel
4. Kiểm tra trạng thái sau thao tác

## Expected result
Hủy thành công; HTTP 200; trạng thái chuyển sang `canceled`.

## Status / Related bugs
Not Run / None

---

# DT-FR10-05: Admin hủy đơn hàng ở trạng thái confirmed

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng đang ở trạng thái `confirmed`
- Admin đăng nhập thành công

## Test data
| current_status | confirmed |
| target_status | canceled |
| Actor | Admin |
| Lớp | EP-T2 + EP-CS2 + EP-AC1 |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `confirmed`
3. Nhấn nút "Hủy"
4. Kiểm tra trạng thái sau thao tác

## Expected result
Hủy thành công; HTTP 200.

## Status / Related bugs
Not Run / None

---

# DT-FR10-06: Admin hủy đơn hàng ở trạng thái shipping

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng đang ở trạng thái `shipping`
- Admin đăng nhập thành công

## Test data
| current_status | shipping |
| target_status | canceled |
| Actor | Admin |
| Lớp | EP-T2 + EP-CS3 + EP-AC1 |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `shipping`
3. Thử nhấn "Hủy" hoặc gọi API `PUT /api/admin/orders/:id/status {status:"canceled"}`
4. Kiểm tra kết quả

## Expected result
Hủy thành công bởi Admin; HTTP 200.

## Status / Related bugs
Not Run / None

---

# DT-FR10-07: User hủy đơn hàng ở trạng thái pending

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng của user đang ở trạng thái `pending`
- User đăng nhập thành công

## Test data
| current_status | pending |
| Actor | User |
| Lớp | EP-T3 + EP-CS1 + EP-AC2 |

## Test steps
1. User đăng nhập
2. Vào trang `/profile` — lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `pending`
4. Nhấn nút "Hủy đơn"
5. Kiểm tra trạng thái sau thao tác

## Expected result
Hủy thành công; HTTP 200; trạng thái chuyển sang `canceled`.

## Status / Related bugs
Not Run / None

---

# DT-FR10-08: User hủy đơn hàng ở trạng thái confirmed

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng của user đang ở trạng thái `confirmed`
- User đăng nhập thành công

## Test data
| current_status | confirmed |
| Actor | User |
| Lớp | EP-T3 + EP-CS2 + EP-AC2 |

## Test steps
1. User đăng nhập
2. Vào trang `/profile` — lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `confirmed`
4. Nhấn nút "Hủy đơn"
5. Kiểm tra trạng thái sau thao tác

## Expected result
Hủy thành công; HTTP 200.

## Status / Related bugs
Not Run / None

---

# DT-FR10-09: Từ chối chuyển đổi từ trạng thái delivered (terminal)

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng ở trạng thái `delivered` (terminal)
- Admin đăng nhập thành công

## Test data
| current_status | delivered |
| target_status | confirmed |
| Actor | Admin |
| Lớp | EP-T4 + EP-CS4 + EP-AC1 |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `delivered`
3. Gọi API `PUT /api/admin/orders/:id/status {status:"confirmed"}`
4. Kiểm tra phản hồi

## Expected result
Thất bại; HTTP 4xx; thông báo lỗi "không thể chuyển từ trạng thái kết thúc".

## Status / Related bugs
Not Run / None

---

# DT-FR10-10: Từ chối chuyển đổi từ trạng thái canceled (terminal)

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng ở trạng thái `canceled` (terminal)
- Admin đăng nhập thành công

## Test data
| current_status | canceled |
| target_status | confirmed |
| Actor | Admin |
| Lớp | EP-T4 + EP-CS5 + EP-AC1 |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `canceled`
3. Gọi API `PUT /api/admin/orders/:id/status {status:"confirmed"}`
4. Kiểm tra phản hồi

## Expected result
Thất bại; HTTP 4xx; thông báo lỗi phù hợp.

## Status / Related bugs
Not Run / None

---

# DT-FR10-11: Từ chối User hủy đơn khi đang ở shipping (vi phạm quyền)

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Security / Equivalence Partitioning

## Preconditions
- Đơn hàng của user đang ở trạng thái `shipping`
- User đăng nhập thành công

## Test data
| current_status | shipping |
| Actor | User |
| Lớp | EP-T5 + EP-CS3 + EP-AC2 |

## Test steps
1. User đăng nhập
2. Vào trang `/profile` — lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `shipping`
4. Thử nhấn "Hủy đơn" (nếu nút hiển thị) hoặc gọi API `PUT /api/orders/:id/cancel`
5. Kiểm tra kết quả

## Expected result
Thất bại; HTTP 4xx; thông báo "không có quyền hủy đơn ở trạng thái shipping".

## Status / Related bugs
Not Run / None

---

# DT-FR10-12: Từ chối Admin bỏ qua confirmed — pending không thể nhảy sang shipping

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng ở trạng thái `pending`
- Admin đăng nhập thành công

## Test data
| current_status | pending |
| target_status | shipping |
| Actor | Admin |
| Lớp | EP-T6 + EP-CS1 + EP-AC1 |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `pending`
3. Gọi API `PUT /api/admin/orders/:id/status {status:"shipping"}` (bỏ qua `confirmed`)
4. Kiểm tra phản hồi

## Expected result
Thất bại; HTTP 4xx; bỏ qua `confirmed` là không hợp lệ.

## Status / Related bugs
Not Run / None

---

# DT-FR10-13: Từ chối Admin bỏ qua shipping — confirmed không thể nhảy sang delivered

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng ở trạng thái `confirmed`
- Admin đăng nhập thành công

## Test data
| current_status | confirmed |
| target_status | delivered |
| Actor | Admin |
| Lớp | EP-T6 + EP-CS2 + EP-AC1 |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `confirmed`
3. Gọi API `PUT /api/admin/orders/:id/status {status:"delivered"}` (bỏ qua `shipping`)
4. Kiểm tra phản hồi

## Expected result
Thất bại; HTTP 4xx; bỏ qua `shipping` là không hợp lệ.

## Status / Related bugs
Not Run / None

---

## Bước 5 — Ma trận bao phủ phân vùng

| Phân vùng | Test case đại diện | Bao phủ |
|-----------|------------------|---------|
| EP-CS1 (pending) | DT-FR10-01, 04, 07, 12 | Dat |
| EP-CS2 (confirmed) | DT-FR10-02, 05, 08, 13 | Dat |
| EP-CS3 (shipping) | DT-FR10-03, 06, 11 | Dat |
| EP-CS4 (delivered — terminal) | DT-FR10-09 | Dat |
| EP-CS5 (canceled — terminal) | DT-FR10-10 | Dat |
| EP-AC1 (Admin) | DT-FR10-01 đến 06, 09, 10, 12, 13 | Dat |
| EP-AC2 (User) | DT-FR10-07, 08, 11 | Dat |
| EP-T1 (Admin forward) | DT-FR10-01, 02, 03 | Dat |
| EP-T2 (Admin cancel) | DT-FR10-04, 05, 06 | Dat |
| EP-T3 (User cancel valid) | DT-FR10-07, 08 | Dat |
| EP-T4 (from terminal) | DT-FR10-09, 10 | Dat |
| EP-T5 (actor violation) | DT-FR10-11 | Dat |
| EP-T6 (skip state) | DT-FR10-12, 13 | Dat |

---

## Bước 6 — Phân tích khoảng cách AI (AI Gap Analysis)

> _Điền sau khi thực thi test tại `test-runs/`. Ghi lại các test case hoặc lỗi mà AI bỏ sót._

| Khoảng cách | AI bỏ sót? | Nguyên nhân |
|------------|-----------|------------|
| _(điền sau khi thực thi)_ | | |
