# Sprint 1 — Test Run Report (HW04 Automation)

**Sinh viên:** 23127211
**Ngày chạy:** 2026-08-08
**Nhánh / commit:** `hw04/23127211` / `3d2a86d`
**Môi trường:** Windows 11, Node.js, Playwright `1.62.0`, browser Chromium/Firefox/WebKit (cài qua `npx playwright install`)
**Server thật đang chạy song song:**

- Backend (Express + SQLite): `http://localhost:3000`
- Frontend Web (React/Vite): `http://localhost:5173`
- Frontend Admin (React/Vite): `http://localhost:5174`

**Lệnh thực thi** (chạy tuần tự — SUT dùng chung 1 SQLite DB, `workers: 1` trong `playwright.config.ts`):

```bash
for spec in register cart product; do
  for browser in chromium firefox webkit; do
    REPORT_NAME="${spec}-${browser}" npx playwright test "specs/${spec}.spec.ts" --project="$browser"
  done
done
```

> ⚠️ **Ghi chú quan trọng:** lệnh trên **không được** thêm cờ `--reporter=...` trên CLI — cờ này ghi đè hoàn toàn mảng `reporter` khai báo trong `playwright.config.ts` (bỏ qua `outputFolder`/`title` tuỳ chỉnh), khiến report bị lệch chỗ và mất luôn dòng "Run by: 23127211" bắt buộc theo mục 11 (Anti-AI-Cheat) của đề bài. Đã tự phát hiện và chạy lại đúng cách trong phiên làm việc này.

## 1. Tổng quan kết quả — 9 lượt chạy (3 feature × 3 browser)

| Feature | Test file | Số TC | Chromium | Firefox | WebKit |
| :------ | :-------- | ----: | :------- | :------ | :----- |
| FR-01 — Đăng ký | `specs/register.spec.ts` | 17 | 9 Pass / 8 Fail (40.8s) | 9 Pass / 8 Fail (1.4m) | 9 Pass / 8 Fail (46.7s) |
| FR-07 — Giỏ hàng | `specs/cart.spec.ts` | 13 | 1 Pass / 12 Fail (2.0m) | 1 Pass / 12 Fail (3.1m) | 1 Pass / 12 Fail (2.3m) |
| FR-15 — Quản lý Sản phẩm (Admin) | `specs/product.spec.ts` | 18 | 7 Pass / 11 Fail (48.4s) | 8 Pass / 10 Fail (1.7m) | 8 Pass / 10 Fail (50.0s) |

**Tổng cộng:** 48 test case × 3 browser = **144 lượt thực thi** (≥ 9 browser run theo yêu cầu tối thiểu của đề bài, đạt 3×3=9 tổ hợp feature×browser).
**Pass:** 51/144 · **Fail:** 93/144.

Số lượng Fail cao là **có chủ đích**: `expected` trong mỗi file `test-data/*.json` được thiết kế bám đúng SRS (`README.md`), không chỉnh theo hành vi lỗi hiện tại của SUT — mỗi assertion fail chính là bằng chứng cho 1 bug thật (xem mục 3). Đây không phải lỗi của script automation.

## 2. Report HTML (đúng yêu cầu mục 11 — "Run by: {StudentID}" + ISO timestamp)

Toàn bộ 9 report nằm tại `tests/e2e/reports/html/<feature>-<browser>/index.html`, xem bằng:

```bash
npx playwright show-report tests/e2e/reports/html/<feature>-<browser>
```

Đã xác minh trực tiếp bằng Playwright MCP: report hiển thị đúng title **"EShop HW04 | Run by: 23127211 | 2026-08-08T04:59:16.517Z"** (ISO timestamp bơm từ `playwright.config.ts`), kèm khối "Metadata" chứa `Run by`, `Run at (ISO)`, `Homework`, `SUT`.

Danh sách 9 report:

- `register-chromium`, `register-firefox`, `register-webkit`
- `cart-chromium`, `cart-firefox`, `cart-webkit`
- `product-chromium`, `product-firefox`, `product-webkit`

## 3. Tổng hợp bug phát hiện

**22 bug** đã được ghi thành báo cáo riêng dưới `tests/bug-reports/<module>/`, xem chi tiết từng bug tại đó và trong `tests/test-summary/traceability-matrix.md` (cột `Bug Issue`).

| Module | Số bug | Blocker/P0 | Critical/P1 | Major/P2 | Minor/P3 |
| :----- | ----: | ---------: | -----------: | -------: | -------: |
| register (FR-01) | 5 | 1 (plaintext password) | 2 | 2 | 0 |
| cart (FR-07) | 10 | 0 | 4 | 3 | 3 |
| product (FR-15, Admin) | 7 | 2 (thiếu auth) | 2 | 1 | 2 |
| **Tổng** | **22** | **3** | **8** | **6** | **5** |

Chưa tạo GitHub Issue thật cho các bug này (cần xác nhận của sinh viên trước khi đăng công khai) — tiêu đề đề xuất cho từng Issue đã liệt kê trong AI Audit Report (`docs/anh-khoa/ai audit report.md`), nội dung Issue body lấy nguyên phần field trong mỗi file `tests/bug-reports/<module>/BUG-<MODULE>-<NNN>.md`.

## 4. Ghi chú thực thi đáng lưu ý

- **Nhất quán cross-browser:** register (8/17 fail) và cart (12/13 fail) cho kết quả **giống hệt nhau tuyệt đối** trên cả 3 browser — không có sai lệch do đặc thù engine trình duyệt.
- **1 test flaky (không phải do browser):** `TC-PRODUCT-015` (BUG-PRODUCT-006 — sửa 1 sản phẩm làm đổi tên hiển thị tất cả sản phẩm khác) cho kết quả dao động giữa các lần chạy full suite (có lần Fail cả 3 browser, có lần Pass ở firefox/webkit nhưng Fail ở chromium), không cố định theo browser cụ thể. Nguyên nhân nghi ngờ: race condition giữa `alert("Cập nhật thành công!")` chặn luồng JS đồng bộ và thời điểm Playwright đọc DOM để assert (`expect.soft`). Bug chức năng (mass-rename) đã xác nhận là có thật qua đọc source (`frontend-admin/src/App.jsx:110-114`), độc lập với tính flaky của assertion.
- **2 test case được thiết kế lại để tránh false-negative** (đã sửa trong phiên làm việc này, xem chi tiết trong `docs/anh-khoa/ai audit report.md`):
  - `TC-REGISTER-003`/`004`: ban đầu dùng chung mật khẩu `Abcd123!` với `TC-REGISTER-001` — mật khẩu này bị BUG-REGISTER-001 (regex lỗi) chặn trước, khiến 2 case này luôn fail SAI LÝ DO (báo lỗi mật khẩu thay vì lỗi email). Đã tách sang gọi thẳng API để cô lập đúng bug cần kiểm.
  - `TC-CART-010`: ban đầu seed sẵn 1 sản phẩm trước khi tìm nút "Tiếp tục mua sắm", nhưng nhãn đó chỉ đúng ở trạng thái giỏ RỖNG (giỏ có hàng nút tên "← Mua tiếp" — BUG-CART-007). Đã sửa setup về giỏ rỗng để thực sự kiểm được hành vi điều hướng mà test case này nhắm tới.
- **1 lỗi locator thật đã sửa:** `productRow()` trong `product.spec.ts` dùng `hasText` (khớp chuỗi con, không phân biệt hoa/thường) khiến tên sản phẩm 1 ký tự "A" (`TC-PRODUCT-003`) khớp nhầm 5-6 dòng khác trong bảng. Đã đổi sang khớp chính xác nội dung cell qua `getByRole('cell', { name, exact: true })`.
- **Dọn dẹp môi trường sau khi chạy:** `backend/database.sqlite` (file có commit trong git) bị các lượt chạy ghi đè dữ liệu tạm (user/sản phẩm test) — đã `git checkout` khôi phục về baseline sau mỗi đợt chạy. `tests/e2e/playwright-report/` (thư mục report mặc định phát sinh do lỗi dùng `--reporter` ở lượt chạy đầu) đã được thêm vào `.gitignore`.

## 5. Test case không automate được / phải đổi cách kiểm

Xem chi tiết đầy đủ trong mục `knownIssues` của từng file `tests/e2e/test-data/*.json`. Tóm tắt:

| Test Case | Vấn đề | Cách xử lý |
| :-------- | :----- | :---------- |
| TC-REGISTER-013, 014 | Form không có trường "Xác nhận mật khẩu" | Đổi sang assert sự TỒN TẠI của field (kind `confirmField`) |
| TC-REGISTER-017 (SEC-01) | Không thể đăng ký qua UI vì bug mật khẩu chặn hết | Gọi thẳng API `/api/register` → `/api/login` → `/api/users/me` |
| TC-REGISTER-003, 004 | Mật khẩu hợp lệ theo FR-01 luôn bị chặn bởi bug regex trước khi chạm tới logic cần kiểm | Gọi thẳng API, tách khỏi vòng lặp UI chính |
| TC-PRODUCT-010 | `input type="number"` không cho nhập ký tự `abc` qua UI | Gọi thẳng `POST /api/products` |
| TC-PRODUCT-011 | Không thể tạo trạng thái "chưa chọn danh mục" qua UI (select luôn có giá trị mặc định) | Đổi sang assert sự TỒN TẠI của option rỗng (kind `categoryRequired`) |
| TC-PRODUCT-012 | Chỉ có thể chọn category từ danh sách có sẵn qua UI | Gọi thẳng API với `category_id` không tồn tại |
| TC-PRODUCT-013, 014 | Cần kiểm response code khi thiếu token / sai role — không thao tác qua form | Dùng `request` fixture gọi thẳng API |

Không có test case nào trong 48 case bị bỏ hoàn toàn — toàn bộ đều automate được, chỉ khác nhau ở tầng thao tác (UI trực tiếp hoặc API) tuỳ theo việc UI có cho phép tái hiện đúng điều kiện cần kiểm hay không.

## 6. Liên kết

- Traceability matrix: `tests/test-summary/traceability-matrix.md`
- Bug reports: `tests/bug-reports/{register,cart,product}/`
- AI Audit Report: `docs/anh-khoa/ai audit report.md`
- Test data (data-driven, tách rời khỏi script): `tests/e2e/test-data/{register,cart,product}.json`
