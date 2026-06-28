# Mobile: Lịch sử Đơn hàng — Kiểm thử Miền (Thiết kế Test Case)

**Tính năng:** FR-20 — Mobile Order History  
**Nhóm tính năng:** Pool D — Phân hệ Mobile  
**Nguồn đặc tả:** `README.md` §FR-20, §FR-10  
**Phương pháp:** Kiểm thử Miền — Phân vùng tương đương (Equivalence Partitioning)  
**Hướng dẫn kỹ thuật:** `.claude/skills/domain-testing`

---

## Bước 1 — Yêu cầu từ đặc tả

| Yêu cầu | Nguồn | Nội dung |
|---------|-------|---------|
| Hiển thị lịch sử đơn hàng | FR-20 | Trang lịch sử đơn hàng trong ứng dụng mobile |
| Hiển thị trạng thái tiếng Việt | FR-20 | Trạng thái phải được dịch sang tiếng Việt rõ ràng |
| Phân biệt màu sắc trạng thái | FR-20 (kế thừa FR-10) | Mỗi trạng thái có màu sắc phân biệt |
| Quyền hủy đơn | FR-20 + FR-10 | Chỉ được hủy khi `pending` hoặc `confirmed`; shipping/delivered/canceled không được hủy |
| Nút hủy đúng trạng thái | FR-20 | Nút "Hủy" chỉ hiển thị khi đơn có thể hủy |
| Empty state | FR-20 | Khi không có đơn hàng phải hiển thị thông báo thân thiện |

---

## Bước 2 — Xác định biến đầu vào

| # | Biến | Nguồn | Kiểu dữ liệu | Ghi chú |
|---|------|--------|--------------|---------|
| 1 | `order_status` | Trạng thái đơn hàng trong DB | enum | pending / confirmed / shipping / delivered / canceled |
| 2 | `cancel_eligibility` | Derived từ `order_status` | bool | true: pending/confirmed; false: shipping/delivered/canceled |
| 3 | `order_count` | Số lượng đơn hàng trong DB của user | int | 0 / ≥1 |
| 4 | `status_label` | Nhãn hiển thị trên UI | string | Phải là tiếng Việt đúng theo đặc tả |

---

## Bước 3 — Phân vùng tương đương

### 3.1 Biến: `order_status` (hiển thị)

| Mã phân vùng | Tên phân vùng | Giá trị | Nhãn tiếng Việt mong đợi |
|-------------|--------------|---------|--------------------------|
| EP-S1 | Đang chờ xác nhận | `pending` | "Chờ xác nhận" hoặc tương đương |
| EP-S2 | Đã xác nhận | `confirmed` | "Đã xác nhận" hoặc tương đương |
| EP-S3 | Đang giao | `shipping` | "Đang giao" / "Đang vận chuyển" |
| EP-S4 | Đã giao | `delivered` | "Đã giao" / "Hoàn thành" |
| EP-S5 | Đã hủy | `canceled` | "Đã hủy" |

### 3.2 Biến: `cancel_eligibility` (nút hủy)

| Mã phân vùng | Tên phân vùng | Trạng thái áp dụng | Hành vi mong đợi |
|-------------|--------------|-------------------|-----------------|
| EP-C1 | Có thể hủy | pending, confirmed | Nút "Hủy" / "Hủy đơn" **hiển thị** |
| EP-C2 | Không thể hủy | shipping, delivered, canceled | Nút "Hủy" **ẩn** |

### 3.3 Biến: `order_count`

| Mã phân vùng | Tên phân vùng | Giá trị | Hành vi mong đợi |
|-------------|--------------|---------|-----------------|
| EP-N1 | Không có đơn | 0 | Hiển thị empty state (icon + message thân thiện) |
| EP-N2 | Có đơn hàng | ≥1 | Hiển thị danh sách đơn hàng |

---

## Bước 4 — Danh sách Test Case

> **Tài liệu chỉ dành cho thiết kế.** Kết quả thực tế thuộc về `test-runs/Mobile_OrderHistory/DomainTesting.md`.

---

# DT-MOB-01: Đơn hàng pending hiển thị nhãn tiếng Việt đúng

## Requirement ID
FR-20

## Module / Test type / Technique
Mobile Order History / Functional / Equivalence Partitioning

## Preconditions
- User có đơn hàng ở trạng thái `pending`
- User đăng nhập trên mobile

## Test data
| order_status | pending |
| Phân vùng | EP-S1 |

## Test steps
1. Đăng nhập user trên ứng dụng mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `pending`
4. Quan sát nhãn trạng thái hiển thị

## Expected result
Nhãn tiếng Việt hiển thị đúng (vd: "Chờ xác nhận"); màu sắc phân biệt.

## Status / Related bugs
Not Run / None

---

# DT-MOB-02: Đơn hàng confirmed hiển thị nhãn tiếng Việt đúng

## Requirement ID
FR-20

## Module / Test type / Technique
Mobile Order History / Functional / Equivalence Partitioning

## Preconditions
- User có đơn hàng ở trạng thái `confirmed`
- User đăng nhập trên mobile

## Test data
| order_status | confirmed |
| Phân vùng | EP-S2 |

## Test steps
1. Đăng nhập user trên ứng dụng mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `confirmed`
4. Quan sát nhãn trạng thái hiển thị

## Expected result
Nhãn tiếng Việt đúng (vd: "Đã xác nhận").

## Status / Related bugs
Not Run / None

---

# DT-MOB-03: Đơn hàng shipping hiển thị nhãn tiếng Việt đúng

## Requirement ID
FR-20

## Module / Test type / Technique
Mobile Order History / Functional / Equivalence Partitioning

## Preconditions
- User có đơn hàng ở trạng thái `shipping`
- User đăng nhập trên mobile

## Test data
| order_status | shipping |
| Phân vùng | EP-S3 |

## Test steps
1. Đăng nhập user trên ứng dụng mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `shipping`
4. Quan sát nhãn trạng thái hiển thị

## Expected result
Nhãn tiếng Việt đúng (vd: "Đang giao").

## Status / Related bugs
Not Run / None

---

# DT-MOB-04: Đơn hàng delivered hiển thị nhãn tiếng Việt đúng

## Requirement ID
FR-20

## Module / Test type / Technique
Mobile Order History / Functional / Equivalence Partitioning

## Preconditions
- User có đơn hàng ở trạng thái `delivered`
- User đăng nhập trên mobile

## Test data
| order_status | delivered |
| Phân vùng | EP-S4 |

## Test steps
1. Đăng nhập user trên ứng dụng mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `delivered`
4. Quan sát nhãn trạng thái hiển thị

## Expected result
Nhãn tiếng Việt đúng (vd: "Đã giao").

## Status / Related bugs
Not Run / None

---

# DT-MOB-05: Đơn hàng canceled hiển thị nhãn tiếng Việt đúng

## Requirement ID
FR-20

## Module / Test type / Technique
Mobile Order History / Functional / Equivalence Partitioning

## Preconditions
- User có đơn hàng ở trạng thái `canceled`
- User đăng nhập trên mobile

## Test data
| order_status | canceled |
| Phân vùng | EP-S5 |

## Test steps
1. Đăng nhập user trên ứng dụng mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `canceled`
4. Quan sát nhãn trạng thái hiển thị

## Expected result
Nhãn tiếng Việt đúng (vd: "Đã hủy").

## Status / Related bugs
Not Run / None

---

# DT-MOB-06: Nút Hủy hiển thị đúng với đơn ở pending

## Requirement ID
FR-20, FR-10

## Module / Test type / Technique
Mobile Order History / Functional / Equivalence Partitioning

## Preconditions
- User có đơn hàng ở trạng thái `pending`
- User đăng nhập trên mobile

## Test data
| order_status | pending |
| cancel_eligibility | EP-C1 (có thể hủy) |

## Test steps
1. Đăng nhập user trên ứng dụng mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `pending`
4. Kiểm tra sự hiện diện của nút Hủy

## Expected result
Nút "Hủy" / "Hủy đơn" **hiển thị** bên cạnh đơn pending.

## Status / Related bugs
Not Run / None

---

# DT-MOB-07: Nút Hủy hiển thị đúng với đơn ở confirmed

## Requirement ID
FR-20, FR-10

## Module / Test type / Technique
Mobile Order History / Functional / Equivalence Partitioning

## Preconditions
- User có đơn hàng ở trạng thái `confirmed`
- User đăng nhập trên mobile

## Test data
| order_status | confirmed |
| cancel_eligibility | EP-C1 (có thể hủy) |

## Test steps
1. Đăng nhập user trên ứng dụng mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `confirmed`
4. Kiểm tra sự hiện diện của nút Hủy

## Expected result
Nút "Hủy" **hiển thị** bên cạnh đơn confirmed.

## Status / Related bugs
Not Run / None

---

# DT-MOB-08: Nút Hủy ẩn với đơn ở shipping — user không được hủy

## Requirement ID
FR-20, FR-10

## Module / Test type / Technique
Mobile Order History / Functional / Equivalence Partitioning

## Preconditions
- User có đơn hàng ở trạng thái `shipping`
- User đăng nhập trên mobile

## Test data
| order_status | shipping |
| cancel_eligibility | EP-C2 (không thể hủy) |

## Test steps
1. Đăng nhập user trên ứng dụng mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `shipping`
4. Kiểm tra sự hiện diện của nút Hủy

## Expected result
Nút "Hủy" **ẩn** — user không được hủy ở shipping.

## Status / Related bugs
Not Run / None

---

# DT-MOB-09: Nút Hủy ẩn với đơn ở delivered — terminal state

## Requirement ID
FR-20, FR-10

## Module / Test type / Technique
Mobile Order History / Functional / Equivalence Partitioning

## Preconditions
- User có đơn hàng ở trạng thái `delivered`
- User đăng nhập trên mobile

## Test data
| order_status | delivered |
| cancel_eligibility | EP-C2 (không thể hủy) |

## Test steps
1. Đăng nhập user trên ứng dụng mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `delivered`
4. Kiểm tra sự hiện diện của nút Hủy

## Expected result
Nút "Hủy" **ẩn** — terminal state.

## Status / Related bugs
Not Run / None

---

# DT-MOB-10: Nút Hủy ẩn với đơn đã canceled — không hủy lại

## Requirement ID
FR-20, FR-10

## Module / Test type / Technique
Mobile Order History / Functional / Equivalence Partitioning

## Preconditions
- User có đơn hàng ở trạng thái `canceled`
- User đăng nhập trên mobile

## Test data
| order_status | canceled |
| cancel_eligibility | EP-C2 (không thể hủy) |

## Test steps
1. Đăng nhập user trên ứng dụng mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `canceled`
4. Kiểm tra sự hiện diện của nút Hủy

## Expected result
Nút "Hủy" **ẩn** — đã hủy rồi.

## Status / Related bugs
Not Run / None

---

# DT-MOB-11: User nhấn Hủy trên đơn pending qua mobile UI — hủy thành công

## Requirement ID
FR-20, FR-10

## Module / Test type / Technique
Mobile Order History / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng ở trạng thái `pending`
- User đăng nhập trên mobile

## Test data
| order_status | pending |
| Thao tác | Nhấn nút Hủy đơn |
| Phân vùng | EP-C1 |

## Test steps
1. Đăng nhập user trên ứng dụng mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `pending`
4. Nhấn nút "Hủy đơn"
5. Xác nhận kết quả — kiểm tra trạng thái đơn hàng

## Expected result
Hủy thành công; trạng thái đổi sang `canceled`; UI cập nhật.

## Status / Related bugs
Not Run / None

---

# DT-MOB-12: User nhấn Hủy trên đơn confirmed qua mobile UI — hủy thành công

## Requirement ID
FR-20, FR-10

## Module / Test type / Technique
Mobile Order History / Functional / Equivalence Partitioning

## Preconditions
- Đơn hàng ở trạng thái `confirmed`
- User đăng nhập trên mobile

## Test data
| order_status | confirmed |
| Thao tác | Nhấn nút Hủy đơn |
| Phân vùng | EP-C1 |

## Test steps
1. Đăng nhập user trên ứng dụng mobile
2. Vào trang lịch sử đơn hàng
3. Tìm đơn hàng ở trạng thái `confirmed`
4. Nhấn nút "Hủy đơn"
5. Xác nhận kết quả — kiểm tra trạng thái đơn hàng

## Expected result
Hủy thành công; trạng thái đổi sang `canceled`; UI cập nhật.

## Status / Related bugs
Not Run / None

---

# DT-MOB-13: Trang lịch sử mobile khi user không có đơn hàng — empty state

## Requirement ID
FR-20

## Module / Test type / Technique
Mobile Order History / Functional / Equivalence Partitioning

## Preconditions
- User chưa tạo đơn hàng nào

## Test data
| order_count | 0 |
| Phân vùng | EP-N1 (không có đơn) |

## Test steps
1. Đăng nhập user không có đơn hàng nào
2. Vào trang lịch sử đơn hàng trên mobile
3. Quan sát giao diện

## Expected result
Hiển thị empty state: icon/hình minh họa + message thân thiện; không có lỗi.

## Status / Related bugs
Not Run / None

---

## Bước 5 — Ma trận bao phủ phân vùng

| Phân vùng | Test case đại diện | Bao phủ |
|-----------|------------------|---------|
| EP-S1 (pending label) | DT-MOB-01 | Dat |
| EP-S2 (confirmed label) | DT-MOB-02 | Dat |
| EP-S3 (shipping label) | DT-MOB-03 | Dat |
| EP-S4 (delivered label) | DT-MOB-04 | Dat |
| EP-S5 (canceled label) | DT-MOB-05 | Dat |
| EP-C1 (cancellable) | DT-MOB-06, 07, 11, 12 | Dat |
| EP-C2 (non-cancellable) | DT-MOB-08, 09, 10 | Dat |
| EP-N1 (0 orders) | DT-MOB-13 | Dat |
| EP-N2 (≥1 orders) | DT-MOB-01 → 12 | Dat |

---

## Bước 6 — Phân tích khoảng cách AI (AI Gap Analysis)

> _Điền sau khi thực thi test tại `test-runs/`. Ghi lại các test case hoặc lỗi mà AI bỏ sót._

| Khoảng cách | AI bỏ sót? | Nguyên nhân |
|------------|-----------|------------|
| _(điền sau khi thực thi)_ | | |
