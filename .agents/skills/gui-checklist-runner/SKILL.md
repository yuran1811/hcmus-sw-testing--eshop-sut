---
name: gui-checklist-runner
description: Automated end-to-end skill to generate, execute, and report GUI checklists for any screen or flow in the EShop SUT. Reusable across FR-07, FR-17, and future homework tasks.
---

# GUI Checklist Runner Skill (Composite Agent Skill)

Skill tổng hợp **gui-checklist-runner** kết hợp quá trình thiết kế checklist (Task 1), thực thi tự động (Task 1 execution), và tổng hợp báo cáo Usability/Bug (Task 2 & Task 3).

## 1. Mục đích & Phạm vi

Skill này giúp AI Agent tự động hóa quy trình kiểm thử GUI trọn gói cho bất kỳ màn hình hoặc luồng ứng dụng nào trong EShop SUT (ví dụ: Cart Web `/cart`, Coupon Admin `/admin/coupons`, Checkout `/checkout`).

```
 [Đặc tả Requirements] ──► [1. Thiết kế Checklist (>=40 items)] ──► [2. Chạy Checklist & Chụp bằng chứng] ──► [3. Tổng hợp Báo cáo & Bug]
```

---

## 2. Quy trình Thực thi 4 Bước (4-Step Pipeline)

### Bước 1: Khảo sát & Tạo Checklist (Checklist Generation)
- Đọc đặc tả FR từ `README.md` và mã nguồn UI (`.jsx`).
- Tạo danh sách kiểm thử bao phủ đủ 4 khía cạnh giao diện (IA-01 General UI, IA-02 Forms, IA-03 Navigation, IA-04 Feedback/State).
- Bổ sung tối thiểu 5 mục kiểm tra nâng cao mà AI thường bỏ sót (XSS SEC-04, Access control SEC-03, BVA % > 100, Past date validation, RTL/Focus trap).

### Bước 2: Chuẩn bị Môi trường Kiểm thử (Environment Setup)
- Đảm bảo Backend running tại `http://localhost:3000`.
- Khởi chạy Frontend Web (`http://localhost:5173`) hoặc Web Admin (`http://localhost:5174`).
- Chuẩn bị dữ liệu tài khoản test (`test@eshop.com` / `admin@eshop.com`).

### Bước 3: Thực thi & Đánh giá (Execution & Evaluation)
- Lần lượt truy cập từng route, tương tác với các nút bấm, input, dialog, và bảng dữ liệu.
- Đánh giá từng mục checklist thành:
  - `✅` **Pass:** Đạt đầy đủ kết quả mong đợi.
  - `❌` **Fail:** Không đạt, ghi chú mã bug `BUG-xxx`.
  - `⚠️` **Blocked:** Bị chặn do phụ thuộc khác.
- Chụp ảnh bằng chứng cho các mục `Fail`.

### Bước 4: Tổng hợp Báo cáo & Tạo Artifact (Report Generation)
- Đóng gói checklist đã điền đầy đủ vào file Markdown kết quả.
- Đăng danh sách Bug kèm Severity lên GitHub Issues.
- Xuất bảng tổng hợp số lượng checklist items, số lượng Pass/Fail, và danh sách bug.

---

## 3. Tham chiếu Quy chuẩn & Tài nguyên

- Cấu hình Playwright BrowserStack / Local theo Context7 guidelines.
- Đảm bảo tuân thủ nguyên tắc không bỏ qua lỗi exit code hoặc swallowed exceptions.
