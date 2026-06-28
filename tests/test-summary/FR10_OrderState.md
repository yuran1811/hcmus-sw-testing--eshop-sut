# FR-10: Trạng thái Đơn hàng — Tóm tắt kiểm thử

**Tính năng:** FR-10 — Order State Machine  
**Nhóm tính năng:** Pool B — Quản lý Đơn hàng  

---

## Kết quả tổng hợp

### Kiểm thử Miền (Domain Testing)

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Tỉ lệ đạt |
|:---:|:---:|:---:|:---:|:---:|
| 13 | 13 | 11 | 2 | 84.6% |

### Phân tích Giá trị Biên (BVA)

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Tỉ lệ đạt |
|:---:|:---:|:---:|:---:|:---:|
| 8 | 8 | 7 | 1 | 87.5% |

### Tổng hợp toàn bộ FR-10

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Lỗi phát hiện |
|:---:|:---:|:---:|:---:|:---:|
| 21 | 21 | 18 | 3 | **2** |

---

## Danh sách lỗi phát hiện

| Mã lỗi | Mức độ | Mô tả | Test case liên quan | Trạng thái |
|--------|--------|-------|---------------------|-----------|
| BUG-05 | Cao | User có thể hủy đơn ở trạng thái `shipping` — cả UI và API đều sai (vi phạm FR-10) | DT-FR10-11, BVA-FR10-03 | Mở |
| BUG-06 | Cao | Admin không thể hủy đơn ở trạng thái `shipping` — UI thiếu nút "Hủy", API trả về 400 (vi phạm FR-10) | DT-FR10-06 | Mở |

---

## Chi tiết kết quả theo từng test case

### Domain Testing — Chi tiết

| Mã TC | Mô tả ngắn | Lớp EP | Đạt/Không đạt | Ghi chú |
|-------|-----------|--------|:---:|---------|
| DT-FR10-01 | Admin: pending → confirmed (nút "Xác nhận") | EP-T1 | Đạt | |
| DT-FR10-02 | Admin: confirmed → shipping (nút "Giao hàng") | EP-T1 | Đạt | |
| DT-FR10-03 | Admin: shipping → delivered (nút "Hoàn thành") | EP-T1 | Đạt | Vào terminal |
| DT-FR10-04 | Admin: pending → canceled (nút "Hủy") | EP-T2 | Đạt | |
| DT-FR10-05 | Admin: confirmed → canceled (nút "Hủy") | EP-T2 | Đạt | |
| DT-FR10-06 | Admin: shipping → canceled | EP-T2 | Không đạt | **BUG-06**: UI không có nút Hủy; API từ chối |
| DT-FR10-07 | User: pending → canceled | EP-T3 | Đạt | |
| DT-FR10-08 | User: confirmed → canceled | EP-T3 | Đạt | |
| DT-FR10-09 | Admin: delivered → confirmed (terminal) | EP-T4 | Đạt | API từ chối đúng |
| DT-FR10-10 | Admin: canceled → confirmed (terminal) | EP-T4 | Đạt | API từ chối đúng; UI có nút lạ (minor) |
| DT-FR10-11 | User: shipping → canceled (vi phạm actor) | EP-T5 | Không đạt | **BUG-05**: UI hiện nút; API cho phép |
| DT-FR10-12 | Admin: pending → shipping (skip confirmed) | EP-T6 | Đạt | API từ chối đúng |
| DT-FR10-13 | Admin: confirmed → delivered (skip shipping) | EP-T6 | Đạt | API từ chối đúng |

### BVA — Chi tiết

| Mã TC | Ranh giới | Điểm BVA | Đạt/Không đạt | Ghi chú |
|-------|-----------|---------|:---:|---------|
| BVA-FR10-01 | B1: User cancel (confirmed ↔ shipping) | Dưới biên (pending) | Đạt | User hủy ở pending — đúng |
| BVA-FR10-02 | B1: User cancel | Tại biên (confirmed) | Đạt | User hủy ở confirmed — đúng |
| BVA-FR10-03 | B1: User cancel | Vượt biên (shipping) | Không đạt | **BUG-05**: user hủy được ở shipping |
| BVA-FR10-04 | B2: Admin forward (shipping ↔ delivered) | Dưới biên (confirmed→shipping) | Đạt | |
| BVA-FR10-05 | B2: Admin forward | Tại biên (shipping→delivered) | Đạt | Vào terminal đúng |
| BVA-FR10-06 | B2: Admin forward | Vượt biên (delivered→any) | Đạt | Terminal bảo vệ đúng |
| BVA-FR10-07 | B3: canceled terminal | Tại biên (vào canceled) | Đạt | |
| BVA-FR10-08 | B3: canceled terminal | Vượt biên (từ canceled) | Đạt | Backend đúng; UI có lỗi nhãn nút nhỏ |

---

## Quan sát chung về chất lượng FR-10

**Điểm tốt:**
- Luồng chính (forward path) hoạt động hoàn toàn đúng: pending → confirmed → shipping → delivered
- Skip-state validation chặt chẽ: không cho phép nhảy bước trung gian
- Terminal state (`delivered`, `canceled`) được bảo vệ tốt: không thể chuyển trở lại
- Admin cancel từ pending và confirmed hoạt động đúng

**Điểm cần sửa (bugs):**
- **BUG-05 (Cao):** Quyền hủy của User không được kiểm soát đúng — user có thể hủy đơn đang vận chuyển (`shipping`), ảnh hưởng đến luồng xử lý vật lý của đơn hàng. Đây là lỗi business logic nghiêm trọng.
- **BUG-06 (Cao):** Admin mất khả năng xử lý sự cố — khi đơn đã vào trạng thái `shipping`, admin không thể hủy dù đặc tả cho phép. Ảnh hưởng đến vận hành thực tế.

**Ghi chú kỹ thuật:**
- Admin UI có lỗi nhỏ: đơn ở trạng thái `canceled` vẫn hiển thị nút "Đánh dấu Đã giao". Backend từ chối, nhưng UI gây nhầm lẫn.
- BUG-05 và BUG-06 có vẻ như là kết quả của "hoán đổi logic" — quyền hủy shipping được gán sai cho user thay vì admin.
