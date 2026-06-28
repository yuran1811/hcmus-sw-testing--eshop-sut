# Mobile: Lịch sử Đơn hàng — Phân tích Giá trị Biên (Thiết kế Test Case)

**Tính năng:** FR-20 — Mobile Order History  
**Nhóm tính năng:** Pool D — Phân hệ Mobile  
**Nguồn đặc tả:** `README.md` §FR-20, §FR-10  
**Phương pháp:** BVA — Phân tích Giá trị Biên (3 điểm mỗi biên: dưới biên / tại biên / vượt biên)  
**Hướng dẫn kỹ thuật:** `.claude/skills/bva`

---

## Bước 1 — Xác định biên

| Mã biên | Biến | Điểm biên | Mô tả |
|---------|------|-----------|-------|
| B1 | `cancel_eligibility` | `confirmed` ↔ `shipping` | Biên quyền hủy: `confirmed` là trạng thái cuối cùng user được phép hủy; `shipping` là trạng thái đầu tiên user KHÔNG được hủy |
| B2 | `order_count` | 0 ↔ 1 | Biên empty state: 0 đơn → empty state; 1 đơn → danh sách |

---

## Bước 2 — Chiến lược 3-điểm mỗi biên

| Biên | Dưới biên | Tại biên trên | Vượt biên |
|------|-----------|---------------|-----------|
| B1 | `confirmed` (được hủy) | `shipping` (không được hủy — điểm biên cần kiểm tra) | `delivered` (vẫn không được hủy — terminal) |
| B2 | 0 đơn (empty state) | 1 đơn (hiển thị danh sách tối thiểu) | ≥2 đơn (danh sách đầy đủ) |

> **Lưu ý B1:** Biên giới là giữa `confirmed` và `shipping`. Điểm quan trọng nhất là liệu nút Hủy có ẩn đúng lúc chuyển sang `shipping` không.

---

## Bước 3 — Danh sách Test Case BVA

---

# BVA-MOB-01: Đơn confirmed — dưới biên B1, nút Hủy hiển thị và hoạt động

## Requirement ID
FR-20, FR-10

## Module / Test type / Technique
Mobile Order History / Functional / BVA

## Preconditions
- User có đơn hàng ở trạng thái `confirmed`
- User đăng nhập trên mobile
- Ranh giới B1: `confirmed` là trạng thái cuối cùng có thể hủy

## Test data
| order_status | confirmed |
| Ranh giới | B1: dưới biên (trạng thái được phép hủy) |

## Test steps
1. Đăng nhập user trên mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `confirmed`
4. Kiểm tra nút Hủy có hiển thị không
5. Nhấn nút Hủy — kiểm tra kết quả

## Expected result
Nút "Hủy" **hiển thị**; nhấn hủy thành công; trạng thái chuyển sang `canceled`.

## Status / Related bugs
Not Run / None

---

# BVA-MOB-02: Đơn shipping — tại biên B1, nút Hủy phải ẩn

## Requirement ID
FR-20, FR-10

## Module / Test type / Technique
Mobile Order History / Functional / BVA

## Preconditions
- User có đơn hàng ở trạng thái `shipping`
- User đăng nhập trên mobile
- Ranh giới B1: `shipping` là trạng thái đầu tiên KHÔNG được hủy

## Test data
| order_status | shipping |
| Ranh giới | B1: tại biên trên (trạng thái đầu tiên không được hủy) |

## Test steps
1. Đăng nhập user trên mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `shipping`
4. Kiểm tra sự vắng mặt của nút Hủy

## Expected result
Nút "Hủy" **ẩn**; không có cách nào hủy từ mobile; trạng thái giữ nguyên `shipping`.

## Status / Related bugs
Not Run / None

---

# BVA-MOB-03: Đơn delivered — vượt biên B1, terminal, nút Hủy ẩn

## Requirement ID
FR-20, FR-10

## Module / Test type / Technique
Mobile Order History / Functional / BVA

## Preconditions
- User có đơn hàng ở trạng thái `delivered`
- User đăng nhập trên mobile
- Ranh giới B1: `delivered` vượt qua biên (terminal state)

## Test data
| order_status | delivered |
| Ranh giới | B1: vượt biên (terminal state) |

## Test steps
1. Đăng nhập user trên mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `delivered`
4. Kiểm tra sự vắng mặt của nút Hủy

## Expected result
Nút "Hủy" **ẩn**; terminal state; không thể hủy.

## Status / Related bugs
Not Run / None

---

# BVA-MOB-04: 0 đơn hàng — dưới biên B2, empty state hiển thị

## Requirement ID
FR-20

## Module / Test type / Technique
Mobile Order History / Functional / BVA

## Preconditions
- User không có đơn hàng trong DB
- Ranh giới B2: 0 orders < 1 order

## Test data
| order_count | 0 |
| Ranh giới | B2: dưới biên (0 đơn hàng) |

## Test steps
1. Đăng nhập user không có đơn hàng nào
2. Vào trang lịch sử đơn hàng trên mobile
3. Quan sát giao diện

## Expected result
Empty state hiển thị: icon hoặc hình minh họa + thông báo thân thiện; không lỗi JS; không crash.

## Status / Related bugs
Not Run / None

---

# BVA-MOB-05: 1 đơn hàng — tại biên B2, danh sách tối thiểu hiển thị

## Requirement ID
FR-20

## Module / Test type / Technique
Mobile Order History / Functional / BVA

## Preconditions
- User có đúng 1 đơn hàng
- Ranh giới B2: 1 order là điểm biên tối thiểu

## Test data
| order_count | 1 |
| Ranh giới | B2: tại biên (1 đơn hàng) |

## Test steps
1. Đăng nhập user có đúng 1 đơn hàng
2. Vào trang lịch sử đơn hàng trên mobile
3. Kiểm tra danh sách hiển thị

## Expected result
Danh sách hiển thị đúng 1 đơn: mã đơn, trạng thái tiếng Việt, thông tin đầy đủ; không hiển thị empty state.

## Status / Related bugs
Not Run / None

---

# BVA-MOB-06: Nhiều đơn hàng — vượt biên B2, danh sách đầy đủ

## Requirement ID
FR-20

## Module / Test type / Technique
Mobile Order History / Functional / BVA

## Preconditions
- User có nhiều đơn hàng các trạng thái khác nhau
- Ranh giới B2: ≥2 orders vượt qua điểm biên

## Test data
| order_count | ≥2 |
| Ranh giới | B2: vượt biên (nhiều đơn hàng) |

## Test steps
1. Đăng nhập user có nhiều đơn hàng
2. Vào trang lịch sử đơn hàng trên mobile
3. Kiểm tra danh sách hiển thị

## Expected result
Danh sách hiển thị đầy đủ tất cả đơn; mỗi đơn đúng trạng thái tiếng Việt và nút hủy phù hợp.

## Status / Related bugs
Not Run / None

---

## Bước 4 — Ma trận bao phủ biên

| Biên | Dưới biên | Tại biên trên | Vượt biên | Bao phủ |
|------|-----------|---------------|-----------|---------|
| B1 (cancel_eligibility) | BVA-MOB-01 | BVA-MOB-02 | BVA-MOB-03 | Dat |
| B2 (order_count) | BVA-MOB-04 | BVA-MOB-05 | BVA-MOB-06 | Dat |

---

## Bước 5 — Phân tích khoảng cách AI (AI Gap Analysis)

> _Điền sau khi thực thi test tại `test-runs/`. Ghi lại các điểm biên hoặc lỗi mà AI bỏ sót._

| Khoảng cách | AI bỏ sót? | Nguyên nhân |
|------------|-----------|------------|
| _(điền sau khi thực thi)_ | | |

---

## Ghi chú thiết kế

- **B1 liên quan BUG-05:** Từ FR-10 và FR-18 đã phát hiện backend cho phép user hủy từ `shipping` (BUG-05). BVA-MOB-02 sẽ kiểm tra liệu mobile app có phản ánh đúng hành vi mong đợi (ẩn nút Hủy) hay cũng bị ảnh hưởng bởi BUG-05 ở tầng backend.
- **B2 setup:** Để test BVA-MOB-04 (0 đơn) cần dùng tài khoản user mới hoặc tài khoản chưa tạo đơn hàng nào.
