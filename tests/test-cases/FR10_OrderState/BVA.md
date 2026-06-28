# FR-10: Trạng thái Đơn hàng — Phân tích Giá trị Biên (Thiết kế Test Case)

**Tính năng:** FR-10 — Order State Machine  
**Nhóm tính năng:** Pool B — Quản lý Đơn hàng  
**Nguồn đặc tả:** `README.md` §FR-10  
**Phương pháp:** Phân tích Giá trị Biên (BVA) — 3 điểm mỗi biên  
**Điều kiện tiên quyết:** Các phân vùng đã được xác định trong `test-cases/FR10_OrderState/DomainTesting.md`  
**Hướng dẫn kỹ thuật:** `.claude/skills/boundary-value-analysis`

---

## Bước 1 — Xác định các ranh giới

State machine FR-10 là một tập hợp trạng thái rời rạc. Ranh giới (boundary) trong BVA ở đây là **điểm phân cách giữa hai lớp hành vi khác nhau** — nơi mà thay đổi một bước (một trạng thái) dẫn đến kết quả khác nhau.

| # | Ranh giới | Mô tả | Tham chiếu đặc tả |
|---|-----------|-------|-------------------|
| B1 | Trạng thái cuối cùng User có thể hủy | `confirmed` (có thể hủy) ↔ `shipping` (không thể hủy — User) | FR-10: "Khi đã ở shipping, User không được phép tự hủy" |
| B2 | Trạng thái cuối cùng Admin có thể chuyển tiếp | `shipping` (có thể chuyển) ↔ `delivered` (terminal) | FR-10: "delivered là trạng thái kết thúc" |
| B3 | Trạng thái terminal — không thể chuyển ra ngoài | `canceled` (terminal) ↔ bất kỳ thử chuyển nào | FR-10: "canceled là trạng thái kết thúc" |

### Xác nhận tính bao gồm/loại trừ (từ đặc tả)

| Ranh giới | Nguyên văn đặc tả | Bao gồm biên? |
|-----------|------------------|--------------|
| B1: confirmed vs shipping | "chỉ được hủy khi pending hoặc confirmed" | `confirmed` ∈ tập cancellable; `shipping` ∉ tập cancellable |
| B2: shipping vs delivered | "delivered là trạng thái kết thúc" | `shipping` ∈ tập có thể chuyển; `delivered` ∉ tập có thể chuyển |
| B3: canceled | "canceled là trạng thái kết thúc" | `canceled` ∉ tập có thể chuyển; mọi thử chuyển phải bị từ chối |

---

## Bước 2 — Danh sách Test Case BVA

> **Tài liệu chỉ dành cho thiết kế.** Kết quả thực tế thuộc về `test-runs/FR10_OrderState/BVA.md`.  
> Áp dụng 3-điểm BVA: dưới biên / tại biên / trên biên.

---

# BVA-FR10-01: User hủy đơn ở pending — dưới biên B1, thành công

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / BVA

## Preconditions
- Đơn hàng user ở trạng thái `pending`
- User đăng nhập thành công
- Ranh giới B1: trạng thái cuối cùng User có thể hủy = `confirmed`

## Test data
| current_status | pending |
| Actor | User |
| Ranh giới | B1: dưới biên (trạng thái trước confirmed) |

## Test steps
1. User đăng nhập
2. Tìm đơn hàng ở trạng thái `pending`
3. Nhấn nút "Hủy đơn"
4. Kiểm tra trạng thái sau thao tác

## Expected result
User hủy thành công; HTTP 200; chuyển sang `canceled`.

## Status / Related bugs
Not Run / None

---

# BVA-FR10-02: User hủy đơn ở confirmed — tại biên B1, trạng thái cuối cùng hủy được

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / BVA

## Preconditions
- Đơn hàng user ở trạng thái `confirmed`
- User đăng nhập thành công
- Ranh giới B1: `confirmed` là trạng thái cuối cùng có thể hủy

## Test data
| current_status | confirmed |
| Actor | User |
| Ranh giới | B1: tại biên trên (trạng thái cuối cùng có thể hủy) |

## Test steps
1. User đăng nhập
2. Tìm đơn hàng ở trạng thái `confirmed`
3. Nhấn nút "Hủy đơn"
4. Kiểm tra trạng thái sau thao tác

## Expected result
User hủy thành công; HTTP 200; chuyển sang `canceled`.

## Status / Related bugs
Not Run / None

---

# BVA-FR10-03: User hủy đơn ở shipping — vượt biên B1, bị từ chối

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Security / BVA

## Preconditions
- Đơn hàng user ở trạng thái `shipping`
- User đăng nhập thành công
- Ranh giới B1: `shipping` là trạng thái đầu tiên User KHÔNG được hủy

## Test data
| current_status | shipping |
| Actor | User |
| Ranh giới | B1: vượt biên (trạng thái đầu tiên không thể hủy) |

## Test steps
1. User đăng nhập
2. Tìm đơn hàng ở trạng thái `shipping`
3. Thử hủy qua UI hoặc gọi API `PUT /api/orders/:id/cancel`
4. Kiểm tra kết quả

## Expected result
Từ chối; HTTP 4xx; thông báo "không có quyền hủy đơn ở trạng thái shipping".

## Status / Related bugs
Not Run / None

---

# BVA-FR10-04: Admin chuyển confirmed sang shipping — dưới biên B2, thành công

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / BVA

## Preconditions
- Đơn hàng ở trạng thái `confirmed`
- Admin đăng nhập thành công
- Ranh giới B2: `shipping` là trạng thái cuối cùng Admin có thể chuyển tiếp

## Test data
| current_status | confirmed |
| target_status | shipping |
| Actor | Admin |
| Ranh giới | B2: dưới biên (trạng thái trước shipping) |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `confirmed`
3. Gọi API `PUT /api/admin/orders/:id/status {status:"shipping"}`
4. Kiểm tra trạng thái sau thao tác

## Expected result
Chuyển thành công; HTTP 200; chuyển sang `shipping`.

## Status / Related bugs
Not Run / None

---

# BVA-FR10-05: Admin chuyển shipping sang delivered — tại biên B2, vào terminal

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / BVA

## Preconditions
- Đơn hàng ở trạng thái `shipping`
- Admin đăng nhập thành công
- Ranh giới B2: `shipping` là trạng thái cuối cùng có thể chuyển tiếp

## Test data
| current_status | shipping |
| target_status | delivered |
| Actor | Admin |
| Ranh giới | B2: tại biên (trạng thái cuối cùng có thể chuyển tiếp) |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `shipping`
3. Gọi API `PUT /api/admin/orders/:id/status {status:"delivered"}`
4. Kiểm tra trạng thái sau thao tác

## Expected result
Chuyển thành công sang terminal; HTTP 200; chuyển sang `delivered`.

## Status / Related bugs
Not Run / None

---

# BVA-FR10-06: Admin thử chuyển từ delivered — vượt biên B2, bị từ chối

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / BVA

## Preconditions
- Đơn hàng ở trạng thái `delivered` (terminal)
- Admin đăng nhập thành công
- Ranh giới B2: `delivered` là terminal, không thể chuyển tiếp

## Test data
| current_status | delivered |
| target_status | confirmed |
| Actor | Admin |
| Ranh giới | B2: vượt biên (từ trạng thái terminal) |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `delivered`
3. Gọi API `PUT /api/admin/orders/:id/status {status:"confirmed"}`
4. Kiểm tra phản hồi

## Expected result
Từ chối; HTTP 4xx; không được phép chuyển từ trạng thái kết thúc.

## Status / Related bugs
Not Run / None

---

# BVA-FR10-07: Admin hủy đơn ở confirmed — chuyển vào canceled (tại biên B3)

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / BVA

## Preconditions
- Đơn hàng ở trạng thái `confirmed`
- Admin đăng nhập thành công
- Ranh giới B3: chuyển vào trạng thái terminal `canceled`

## Test data
| current_status | confirmed |
| target_status | canceled |
| Actor | Admin |
| Ranh giới | B3: tại biên (chuyển vào terminal) |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `confirmed`
3. Gọi API hủy đơn
4. Kiểm tra trạng thái sau thao tác

## Expected result
Hủy thành công; HTTP 200; chuyển sang `canceled` (terminal).

## Status / Related bugs
Not Run / None

---

# BVA-FR10-08: Admin thử chuyển từ canceled — terminal không thể chuyển tiếp (vượt biên B3)

## Requirement ID
FR-10

## Module / Test type / Technique
FR10 Order State / Functional / BVA

## Preconditions
- Đơn hàng ở trạng thái `canceled` (terminal)
- Admin đăng nhập thành công
- Ranh giới B3: `canceled` là terminal, mọi thử chuyển phải bị từ chối

## Test data
| current_status | canceled |
| target_status | confirmed |
| Actor | Admin |
| Ranh giới | B3: vượt biên (thử chuyển từ terminal) |

## Test steps
1. Admin đăng nhập
2. Tìm đơn hàng ở trạng thái `canceled`
3. Gọi API `PUT /api/admin/orders/:id/status {status:"confirmed"}`
4. Kiểm tra phản hồi

## Expected result
Từ chối; HTTP 4xx; không được phép chuyển từ trạng thái kết thúc.

## Status / Related bugs
Not Run / None

---

## Bước 3 — Danh sách kiểm tra độ phủ ranh giới

- [x] B1: Quyền hủy User (confirmed ↔ shipping) — đủ 3 điểm (BVA-FR10-01, 02, 03)
- [x] B2: Trạng thái cuối Admin forward (shipping ↔ delivered) — đủ 3 điểm (BVA-FR10-04, 05, 06)
- [x] B3: Terminal canceled — 2 điểm (BVA-FR10-07, 08): vào và từ canceled — không có điểm "dưới biên" riêng vì đây là trạng thái rời rạc
- [x] Đã xác nhận tính bao gồm/loại trừ cho tất cả ranh giới
- [x] Không kiểm thử hai biên đồng thời trong một test case

---

## Bước 4 — Phân tích khoảng cách AI (AI Gap Analysis)

> _Điền sau khi thực thi test tại `test-runs/`. Ghi lại các test case biên mà AI bỏ sót._

| Khoảng cách | AI bỏ sót? | Nguyên nhân |
|------------|-----------|------------|
| _(điền sau khi thực thi)_ | | |
