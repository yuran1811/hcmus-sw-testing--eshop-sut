---
name: test-runner
description: Execute GUI checklists and functional test cases against EShop SUT using Playwright, recording Pass/Fail statuses, screenshots, and bug reports.
---

# Test Runner Skill

Skill này dùng để **thực thi các test case và GUI checklist** trên hệ thống EShop thực tế bằng Playwright (hoặc Playwright MCP), ghi nhận kết quả và báo cáo bug.

## 1. Quy trình Thực thi Test (Execution Workflow)

1. **Khởi động & Môi trường:**
   - Kiểm tra Backend running tại `http://localhost:3000`.
   - Frontend Web running tại `http://localhost:5173`.
   - Web Admin running tại `http://localhost:5174`.
2. **Thực thi từng mục Checklist / Test Case:**
   - Mở route tương ứng bằng trình duyệt.
   - Sử dụng locator chuẩn (accessible role/label):
     - Button: `page.getByRole('button', { name: '...' })`
     - Heading: `page.getByRole('heading', { level: 1 })`
     - Input: `page.getByPlaceholder('...')` hoặc `page.getByLabel('...')`
   - Quan sát kết quả hiển thị trên UI và trạng thái Console Log.
3. **Cập nhật Trạng thái Checklist:**
   - Nếu khớp hoàn toàn Kết quả mong đợi -> Cập nhật Status = `✅` (Pass).
   - Nếu không khớp hoặc phát sinh lỗi -> Cập nhật Status = `❌` (Fail), ghi rõ nguyên nhân vào cột `Bug/ghi chú`.
   - Nếu không thể thực hiện do môi trường/phụ thuộc -> Cập nhật Status = `⚠️` (Blocked).

---

## 2. Quy trình Báo cáo Lỗi (Bug Reporting)

Khi một mục checklist hoặc test case bị `Fail`:
1. Chụp ảnh màn hình bằng chứng (lưu vào thư mục `evidence/` hoặc đính kèm GitHub Issue).
2. Trích xuất log lỗi từ Console/Network tab.
3. Tạo file báo cáo lỗi hoặc tạo GitHub Issue với cấu trúc:
   - **Mã Bug:** `BUG-<MODULE>-<ID>` (ví dụ `BUG-CART-001`)
   - **Tiêu đề:** Tóm tắt lỗi ngắn gọn, chính xác
   - **Severity:** `Blocker` | `Critical` | `Major` | `Minor`
   - **Các bước tái hiện (Steps to Reproduce):** Nhập các bước chi tiết
   - **Actual Result vs Expected Result:** Đối chiếu sai lệch
   - **Bằng chứng:** Đường dẫn ảnh màn hình

---

## 3. Tham chiếu Quy chuẩn Context7

Thực hiện kiểm thử chéo trình duyệt (Cross-browser execution) và giả lập thiết bị (Viewport emulation) theo tài liệu Playwright:
- Chromium (Desktop 1440x900)
- WebKit (Mobile Safari 375x812)
- Firefox (Desktop 1440x900)
