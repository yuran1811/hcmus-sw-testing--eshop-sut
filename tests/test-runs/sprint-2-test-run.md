# Sprint 2 — Test Run Report

## 1. Thông tin lần chạy

| Trường             | Giá trị                                                             |
| ------------------ | ------------------------------------------------------------------- |
| **Run ID**         | RUN-SPRINT2-001                                                     |
| **Ngày chạy**      | 2026-07-29                                                          |
| **Người thực thi** | Tester (chạy tay hoàn toàn, không dùng Playwright MCP)              |
| **Loại test**      | Cross-browser compatibility verification — thủ công                 |
| **Nhánh**          | `hw3/23127211`                                                      |
| **Commit**         | `ff96609` (cùng build với RUN-SPRINT1-001, chưa có fix nào được áp) |
| **Kết quả chung**  | ✅ **Passed** — 3/3 item đạt                                        |

## 2. Bối cảnh

Lần chạy `RUN-SPRINT1-001` (xem [sprint-1-test-run.md](sprint-1-test-run.md)) để lại **3 item `Not Run`**: COM-01, COM-02, COM-03. Cả ba đều yêu cầu đối chiếu **hai engine trình duyệt** (Chrome 126 ↔ Firefox 128), trong khi Playwright MCP của phiên đó chỉ lái được Chromium — sandbox chặn `require('playwright')` nên không khởi chạy được Firefox.

Sprint 2 là lần chạy bổ sung nhằm **đóng nốt 3 item đó bằng cách chạy tay trên Firefox 128**, đưa checklist Product Detail về trạng thái đã thực thi đủ 73/73 item.

## 3. Phạm vi

**Trong phạm vi:**

- 3 item nhóm `COM` của `tests/checklist/product-detail/checklist_product-detail.md`: COM-01, COM-02, COM-03

**Ngoài phạm vi:**

- 70 item còn lại của checklist Product Detail — đã chạy ở sprint 1, **không** chạy lại
- Hồi quy 12 bug của sprint 1 — chưa có fix nào được áp lên build này nên chưa có gì để hồi quy
- `tests/usability/U-01/` — usability test, chạy theo quy trình riêng

## 4. Môi trường

| Trường          | Giá trị                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| **Trình duyệt** | Firefox 128 (vế mới) · đối chiếu với ảnh chụp Chromium từ sprint 1      |
| **Công cụ**     | Không dùng automation — tester mở trình duyệt và quan sát trực tiếp     |
| **OS**          | Windows 11                                                              |
| **Viewport**    | 1440×900                                                                |
| **Frontend**    | http://localhost:5173                                                   |
| **Backend**     | http://localhost:3000                                                   |
| **Dữ liệu**     | 5 sản phẩm seed mặc định; sản phẩm mẫu `/product/1` (iPhone 15 Pro Max) |

## 5. Kết quả chi tiết

| ID                | Checklist Item                                                                                     | Expected Result                                                                                                             | Status | Ghi chú                                                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| PRODDETAIL-COM-01 | Mở `/product/1` ở 1440×900 lần lượt trên Chrome 126 và Firefox 128, so sánh ảnh chụp màn hình      | Bố cục, cỡ chữ, màu sắc và vị trí các phần tử giống nhau trên hai trình duyệt                                               | Passed | Tester đối chiếu trực tiếp với ảnh chụp Chromium của sprint 1 — không thấy khác biệt về bố cục, cỡ chữ, màu sắc hay vị trí phần tử. |
| PRODDETAIL-COM-02 | So sánh hiển thị nút tăng/giảm (spinner) của ô số lượng trên Chrome 126 và Firefox 128             | Spinner hiển thị và hoạt động nhất quán trên cả hai; không trình duyệt nào làm ô nhập bị đổi chiều rộng hay che mất giá trị | Passed | Spinner hiển thị và bấm được trên cả hai; ô nhập không bị đổi chiều rộng, giá trị không bị che.                                     |
| PRODDETAIL-COM-03 | Kiểm tra hiển thị dấu tiếng Việt ở tên sản phẩm, mô tả và nhãn "Số lượng:" trên cả hai trình duyệt | Toàn bộ dấu tiếng Việt hiển thị đúng, không có ô vuông, không mất dấu, không lệch chân chữ                                  | Passed | Firefox 128 hiển thị đúng toàn bộ dấu tiếng Việt — không ô vuông, không mất dấu. Vế Chromium đã xác nhận ở sprint 1.                |

**Tổng hợp:** 3 Passed · 0 Failed · 0 Not Run → **không phát sinh bug mới**.

## 6. Tác động lên trạng thái checklist Product Detail

| Mốc                    | ✅ Passed | ❌ Failed | ⬜ Not Run |
| ---------------------- | --------- | --------- | ---------- |
| Sau sprint 1 (chỉ MCP) | 30        | 40        | 3          |
| **Sau sprint 2**       | **33**    | **40**    | **0**      |

Nhóm IA-01 (General UI standards) đi từ 17 → **20 Passed**, `Not Run` về 0. Toàn checklist đạt trạng thái **đã thực thi đủ 73/73 item**.

Số bug và mức độ nghiêm trọng **không đổi** so với sprint 1: vẫn 12 bug report, trong đó 6 bug P0/P1 chưa được xử lý.

## 7. Bằng chứng

- **Checklist đã cập nhật:** `tests/checklist/product-detail/checklist_product-detail.md` — 3 dòng COM-01/02/03 đổi từ `Not Run` sang `Passed`, Notes ghi rõ nguồn là tester chạy tay
- **Đối chiếu:** ảnh chụp Chromium từ sprint 1 trong `tests/bug-reports/screenshots/`
