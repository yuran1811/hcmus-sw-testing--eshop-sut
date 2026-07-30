# AI Gap Analysis — GUI Checklist Trang Chủ EShop

**Tham chiếu checklist:** `tests/checklists/home/checklist.md`  
**Ngày thực hiện:** 2026-07-30  
**Người thực hiện review:** _(điền tên sinh viên)_

---

## Mục Đích

Tài liệu này ghi lại **Step 6 — Mandatory Human Review** theo hướng dẫn skill `gui-checklist-ai`.  
Người kiểm thử phải xác định những gì AI **đã bỏ sót**, giải thích **tại sao AI bỏ sót**, và ghi lại các item **do sinh viên tự bổ sung**.

---

## Phân Tích Gap Theo Từng Hạng Mục

### 1. Accessibility (Khả Năng Tiếp Cận)

| Trạng Thái              | Chi Tiết                                                                                                                                                                                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Được xử lý một phần** | AI đã sinh item về `alt` text (HOME-GUI-IA04-034) và focus indicator (HOME-GUI-IA02-017) khi được nhắc trong heuristic seed về WCAG.                                                                                                                   |
| **Bị bỏ qua**           | AI không tự động kiểm tra: ARIA roles (`role="banner"`, `role="main"`, `role="contentinfo"`), ARIA labels cho các icon button, heading order semantic (h1 → h2 → h3), color alone not used as the only conveyor of info.                           |
| **Lý do AI bỏ qua**     | Các prompt IA-01 đến IA-04 không đề cập tường minh đến ARIA attributes. Model không có quyền truy cập DOM runtime để kiểm tra accessibility tree thực tế. Model cũng có xu hướng gợi ý các heuristic phổ biến hơn là các tiêu chuẩn WCAG chi tiết. |
| **Hành động**           | Sinh viên cần chạy thêm công cụ axe-core hoặc Lighthouse Accessibility audit, kiểm tra ARIA tree bằng Chrome DevTools.                                                                                                                             |

### 2. RTL / Internationalisation Layout

| Trạng Thái               | Chi Tiết                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Loại trừ có chủ đích** | EShop là ứng dụng tiếng Việt LTR (Left-to-Right) thuần túy. Không cần RTL layout.                                |
| **Lý do loại trừ**       | Không phải AI bỏ sót — đây là quyết định có chủ đích dựa trên đặc tả FR-21: "Toàn bộ giao diện dùng tiếng Việt". |

### 3. Dark Mode

| Trạng Thái               | Chi Tiết                                                         |
| ------------------------ | ---------------------------------------------------------------- |
| **Loại trừ có chủ đích** | EShop không có dark mode trong đặc tả hiện tại.                  |
| **Lý do loại trừ**       | Không phải gap — giao diện một chủ đề duy nhất theo README v2.0. |

### 4. Keyboard-Only Navigation (Toàn trang)

| Trạng Thái              | Chi Tiết                                                                                                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Được xử lý một phần** | AI sinh item về keyboard access cho thanh tìm kiếm (HOME-GUI-IA02-019) và FR-21 Tab Order.                                                                                                     |
| **Bị bỏ qua**           | AI không sinh item kiểm tra toàn bộ Tab flow từ đầu trang đến cuối trang: logo → navbar → search bar → product cards → footer. Cũng không kiểm tra visible focus indicator trên product cards. |
| **Lý do AI bỏ qua**     | IA-02 prompt seed tập trung vào form fields. Keyboard testing toàn trang cần context rộng hơn — model không có khả năng simulate Tab traversal.                                                |
| **Hành động**           | Sinh viên phải thực thi Tab traversal thủ công từ đầu trang, kiểm tra mỗi element interactive có focus indicator.                                                                              |

### 5. Offline / Slow-Network Behavior

| Trạng Thái                  | Chi Tiết                                                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Được xử lý**              | Item HOME-GUI-IA04-041 đã được thêm: "Khi mạng chậm/lỗi (offline), trang hiển thị thông báo lỗi thay vì màn hình trắng"                       |
| **Lý do AI ban đầu bỏ qua** | Không có prompt seed nào đề cập đến network conditions. Model không thể simulate offline mode. Item này được phát hiện trong gap review. |

### 6. Performance / Page Load Time

| Trạng Thái           | Chi Tiết                                                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Chưa có item**     | Không có item cụ thể về Core Web Vitals (LCP, CLS, FID).                                                                    |
| **Lý do không thêm** | Performance testing vượt ngoài phạm vi GUI usability checklist thuần túy. Nếu cần, tách thành performance test suite riêng. |

---

## Items Hoàn Toàn Do Sinh Viên Tự Bổ Sung

Các item sau **không** xuất phát từ AI output — 100% do người kiểm thử phán đoán và bổ sung:

| ID                | Mô Tả                                                               | Lý Do Bổ Sung                                                                 |
| ----------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| HOME-GUI-IA01-042 | Responsive trên tablet (768px): grid từ 4 cột → 2 cột               | Quan sát thực tế; AI không kiểm tra responsive breakpoints một cách chủ động  |
| HOME-GUI-IA03-043 | Khi chưa đăng nhập, navbar ẩn link Lịch sử đơn hàng / Hồ sơ         | Logic phân quyền UI — AI bỏ qua trạng thái "guest vs logged-in"               |
| HOME-GUI-IA04-044 | Badge giỏ hàng cập nhật real-time sau khi thêm sản phẩm             | Optimistic UI pattern quan trọng nhưng không có trong IA-04 AI pass           |
| HOME-GUI-IA02-045 | Tìm kiếm case-insensitive cho tiếng Việt                            | Đặc thù xử lý chuỗi tiếng Việt — AI không biết SUT có normalize Unicode không |

---

## Kết Luận Review

- **Tổng items AI sinh:** 41 (IA-01: 12, IA-02: 8, IA-03: 10, IA-04: 11)
- **Tổng items sinh viên bổ sung:** 4
- **Tổng items trong checklist:** 45
- **Tỷ lệ gap:** ~8.9% items là gap AI

**Các gap quan trọng nhất:**

1. ARIA attributes / semantic accessibility (cần kiểm tra bằng công cụ)
2. Keyboard Tab traversal toàn trang (cần kiểm thử thủ công)
3. Authentication state (guest vs logged-in) trong navbar

---

_Tài liệu này là bắt buộc (Step 6 không optional) theo skill `gui-checklist-ai` — 2026-07-30_
