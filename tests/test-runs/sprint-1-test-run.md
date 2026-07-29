# Sprint 1 — Test Run Report

## 1. Thông tin lần chạy

| Trường             | Giá trị                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| **Run ID**         | RUN-SPRINT1-001                                                                                    |
| **Ngày chạy**      | 2026-07-29, khoảng 21:55 – 22:30 (giờ máy, UTC+7)                                                  |
| **Người thực thi** | Claude Code (Claude Opus 5) điều khiển Playwright MCP, dưới giám sát của tester; 3 item COM do tester chạy tay trên Firefox 128 |
| **Loại test**      | GUI Checklist execution (thủ công có hỗ trợ tự động hoá), **không** phải dry-run script Playwright |
| **Nhánh**          | `hw3/23127211`                                                                                     |
| **Commit**         | `ff96609`                                                                                          |
| **Kết quả chung**  | ❌ **Failed** — 40/73 item không đạt (tỉ lệ fail 55%). Đã chạy đủ 73/73 item, không còn `Not Run`   |

## 2. Phạm vi

**Trong phạm vi lần chạy này:**

- `tests/checklist/product-detail/checklist_product-detail.md` — toàn bộ 73 item của màn hình Product Detail

**Ngoài phạm vi (chưa chạy trong sprint này):**

- `tests/usability/U-01/` — usability test, chạy theo quy trình riêng

## 3. Môi trường

| Trường        | Giá trị                                                                           |
| ------------- | --------------------------------------------------------------------------------- |
| **Công cụ**   | Playwright MCP (Chromium) — 70/73 item                                            |
| **Bổ sung**   | Firefox 128, tester chạy tay — 3 item COM-01/02/03                                |
| **OS**        | Windows 11                                                                        |
| **Frontend**  | http://localhost:5173 (Vite dev server)                                           |
| **Backend**   | http://localhost:3000 (Express + SQLite)                                          |
| **Viewport**  | 1440×900 · 768×1024 · 767×1024 · 390×844 · 844×390 · 960×600 (mô phỏng zoom 150%) |
| **Tài khoản** | `test@eshop.com` / `Test1234!` (seed từ `backend/database.js`)                    |
| **Dữ liệu**   | 5 sản phẩm seed mặc định; VIS-07/08 dùng mock API response                        |

## 4. Kết quả tổng hợp

| Aspect                       | Tổng   | ✅ Passed | ❌ Failed | ⬜ Not Run | Tỉ lệ Failed |
| ---------------------------- | ------ | --------- | --------- | ---------- | ------------ |
| IA-01 — General UI standards | 25     | 20        | 5         | 0          | 20%          |
| IA-02 — Forms                | 17     | 3         | 14        | 0          | 82%          |
| IA-03 — Navigation           | 10     | 4         | 6         | 0          | 60%          |
| IA-04 — Feedback / state     | 21     | 6         | 15        | 0          | 71%          |
| **Tổng**                     | **73** | **33**    | **40**    | **0**      | **55%**      |

> Đã chạy đủ 73/73 item, không còn item nào `Not Run`.

**Nhận xét nhanh:** IA-02 (Forms) là vùng vỡ nặng nhất — 14/17 item fail, toàn bộ 10 item validation đều fail. Đây cũng là vùng rủi ro cao nhất vì chạm trực tiếp tới tiền.

## 5. Danh sách item Failed và bug tương ứng

| Bug ID             | Số item fail | Checklist item                         | Severity / Priority |
| ------------------ | ------------ | -------------------------------------- | ------------------- |
| BUG-PRODDETAIL-001 | 5            | FUN-01, FUN-02, FUN-03, FDB-04, USB-04 | Critical / P0       |
| BUG-PRODDETAIL-002 | 10           | VAL-01 → VAL-10                        | Critical / P0       |
| BUG-PRODDETAIL-003 | 1            | FUN-04                                 | Major / P1          |
| BUG-PRODDETAIL-004 | 2            | FDB-01, FDB-02                         | Critical / P1       |
| BUG-PRODDETAIL-005 | 4            | NAV-06, NAV-07, NAV-08, FDB-03         | Major / P1          |
| BUG-PRODDETAIL-006 | 1            | NAV-09                                 | Major / P1          |
| BUG-PRODDETAIL-007 | 4            | ACC-01, ACC-06, ACC-07, ACC-08         | Major / P2          |
| BUG-PRODDETAIL-008 | 2            | VIS-02, COM-04                         | Major / P2          |
| BUG-PRODDETAIL-009 | 3            | FDB-05, FDB-06, FDB-07                 | Minor / P2          |
| BUG-PRODDETAIL-010 | 3            | VIS-01, VIS-04, VIS-10                 | Minor / P3          |
| BUG-PRODDETAIL-011 | 3            | USB-02, USB-03, USB-05                 | Minor / P3          |
| BUG-PRODDETAIL-012 | 2            | NAV-03, NAV-10                         | Minor / P3          |
| **Tổng**           | **40**       |                                        |                     |

> **Vì sao 40 item fail chỉ sinh 12 bug:** một lỗi code thường làm hỏng nhiều phép thử. Ví dụ `BUG-PRODDETAIL-001` chỉ là 3 dòng trong `handleAddToCart` nhưng làm fail 5 item.
> Lưu ý: các bug 007, 009, 010, 011, 012 là **gộp theo chủ đề** (nhiều lỗi nhỏ độc lập cùng nhóm), không phải cùng một root cause. Nếu cần chuẩn "1 bug = 1 defect" thì tách ra sẽ thành khoảng 22–24 bug.

## 6. Bug mức chặn (P0/P1) cần xử lý trước

1. **BUG-PRODDETAIL-001 — Lần bấm đầu tiên vào "Thêm vào giỏ hàng" không làm gì cả.** So sánh `document.body.innerHTML` trước và sau 2 giây kể từ lần bấm cho kết quả giống hệt nhau. Người dùng bấm nút mua hàng mà không nhận được bất kỳ phản hồi nào.
2. **BUG-PRODDETAIL-002 — Ô Số lượng không có validation nào.** `-1` → tổng tiền **-30.000.000 ₫**; bỏ trống → **`NaN ₫`**; `999999999` → **29.999.999.970.000.000 ₫**. Lỗi lan sang cả trang Giỏ hàng.
3. **BUG-PRODDETAIL-004 — Kẹt vĩnh viễn ở "Đang tải..." khi API lỗi.** Chờ đủ 30 giây vẫn không có thông báo lỗi, không có nút "Thử lại".
4. **BUG-PRODDETAIL-003 — Giỏ hàng không gộp dòng.** Vi phạm trực tiếp FR-07.
5. **BUG-PRODDETAIL-005 — Lộ ghi chú debug ra người dùng cuối.** Chuỗi `Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)`.
6. **BUG-PRODDETAIL-006 — Giỏ hàng mất sạch sau F5.**

## 7. Item chạy ngoài Playwright MCP

Playwright MCP phiên này chỉ lái được Chromium (sandbox chặn `require('playwright')`), nên toàn bộ nhóm item cần đối chiếu **hai engine trình duyệt** được tester tự mở Firefox 128 chạy tay.

| ID     | Nội dung                                                       | Kết quả | Nguồn kết luận                          |
| ------ | -------------------------------------------------------------- | ------- | ---------------------------------------- |
| COM-01 | So sánh ảnh chụp toàn trang Chrome 126 ↔ Firefox 128           | Passed  | Tester quan sát trực tiếp trên Firefox   |
| COM-02 | So sánh spinner của `input[type=number]` giữa 2 trình duyệt     | Passed  | Tester quan sát trực tiếp trên Firefox   |
| COM-03 | Dấu tiếng Việt trên cả hai trình duyệt                         | Passed  | Chromium: Playwright MCP · Firefox: tester |

> **Lưu ý về bằng chứng:** 3 item này `Passed` dựa trên quan sát của tester, **không có ảnh chụp tự động** kèm theo như 70 item còn lại. Nếu cần bằng chứng chặt hơn cho báo cáo, nên bổ sung ảnh chụp Firefox thủ công vào `tests/bug-reports/screenshots/`.

> COM-04 tuy cùng nhóm Compatibility nhưng **không** cần engine thứ hai (chỉ đổi `locale` trong cùng Chromium) nên đã chạy bằng Playwright MCP và cho kết quả `Failed`.

## 8. Item chạy bằng phương pháp thay thế

Các item dưới đây **có kết luận** nhưng được thực thi bằng cách mô phỏng thay vì thao tác gốc mà checklist mô tả. Ghi ra đây để lần chạy sau xác nhận lại bằng tay nếu cần bằng chứng chặt hơn.

| ID        | Thao tác gốc trong checklist      | Phương pháp đã dùng                                           |
| --------- | --------------------------------- | ------------------------------------------------------------- |
| RES-06    | Zoom trình duyệt 150% bằng Ctrl+= | Viewport tương đương 960×600 CSS px (1440 ÷ 1,5)              |
| VIS-13    | Bật dark mode ở cấp hệ điều hành  | `page.emulateMedia({ colorScheme: 'dark' })`                  |
| FDB-02    | Tắt tiến trình backend cổng 3000  | `route.abort('connectionrefused')` trên `**/api/products/**`  |
| ACC-07    | Chạy NVDA / Narrator và lắng nghe | Đếm vùng `aria-live` / `role=status` / `role=alert` trong DOM |
| VIS-07/08 | Sửa dữ liệu sản phẩm qua API      | Mock response API (tên 102 ký tự, mô tả 675 ký tự)            |

## 9. Bằng chứng

- **Checklist đã điền kết quả:** `tests/checklist/product-detail/checklist_product-detail.md`
- **Bug report:** `tests/bug-reports/product-detail/BUG-PRODDETAIL-001.md` → `BUG-PRODDETAIL-012.md`
- **Screenshot:** `tests/bug-reports/screenshots/` — 16 ảnh, chỉ chụp cho item `Failed`
- **AI audit log:** `docs/anh-khoa/ai audit report.md` — entry ngày 2026-07-29
