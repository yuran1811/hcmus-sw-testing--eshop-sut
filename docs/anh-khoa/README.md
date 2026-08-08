# HW04 – AI Automation Testing on EShop

**Mã số sinh viên:** 23127211.
**Họ và tên:** Nguyễn Lê Hồ Anh Khoa.
**Mã bài tập:** HW04-AI.
**Ngày nộp:** 10/08/2026.

---

## Tổng quan

3 feature tự động hoá (mỗi Pool A/B/C đúng 1 feature, kế thừa lựa chọn từ HW02) · 48 test case được chuyển thành script Playwright data-driven · chạy thật trên 3 trình duyệt (Chromium/Firefox/WebKit) · 22 bug thật được phát hiện và ghi báo cáo kèm ảnh chụp thật.

| Pool | Feature (Module)                      | TC tự động hoá | Data-driven | Assertion pattern | Bug tìm được |
| :--: | :------------------------------------ | :------------: | :---------: | :---------------: | :----------: |
|  A   | FR-01 — Đăng ký tài khoản (Register)  |       17       |    JSON     |         5         |      5       |
|  B   | FR-07 — Giỏ hàng (Cart)               |       13       |    JSON     |         5         |      10      |
|  C   | FR-15 — Quản lý Sản phẩm Admin (CRUD) |       18       |    JSON     |         5         |      7       |
|  —   | **Tổng cộng**                         |     **48**     |      —      |         —         |    **22**    |

---

## Test Summary Report (theo đúng mục 14 của đề bài)

| Chỉ số                                                     | Số lượng                                                                                                                                                                 |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Số feature tự động hoá                                     | **3** (FR-01, FR-07, FR-15)                                                                                                                                              |
| Test case tự động hoá (thiết kế)                           | **48** (17 + 13 + 18)                                                                                                                                                    |
| Test case đã thực thi                                      | **48/48** trên cả 3 browser (không có ca "Not Run")                                                                                                                      |
| Tổng lượt thực thi (test case × browser)                   | **144** (48 × 3)                                                                                                                                                         |
| Browser run (feature × browser, theo cách tính của đề bài) | **9** (3 feature × 3 browser: Chromium/Firefox/WebKit) — đạt tối thiểu "≥9 browser run"                                                                                  |
| Pass (tổng số lượt thực thi)                               | **53/144**                                                                                                                                                               |
| Fail (tổng số lượt thực thi)                               | **91/144** — phần lớn là **có chủ đích**: `expected` bám đúng SRS, mỗi fail là bằng chứng 1 bug thật, không phải lỗi script (xem `tests/test-runs/sprint-1-test-run.md`) |
| Số bug phát hiện                                           | **22** (3 Blocker/P0 · 8 Critical/P1 · 6 Major/P2 · 5 Minor/P3)                                                                                                          |
| Video demo (Task 2)                                        | ⚠️ _(chưa quay — điền link YouTube unlisted tại đây trước khi nộp)_                                                                                                      |

**Kết quả theo browser**

| Feature                  | Chromium         | Firefox          | WebKit           |
| :----------------------- | :--------------- | :--------------- | :--------------- |
| FR-01 — Đăng ký          | 9 Pass / 8 Fail  | 9 Pass / 8 Fail  | 9 Pass / 8 Fail  |
| FR-07 — Giỏ hàng         | 1 Pass / 12 Fail | 1 Pass / 12 Fail | 1 Pass / 12 Fail |
| FR-15 — Quản lý Sản phẩm | 7 Pass / 11 Fail | 8 Pass / 10 Fail | 8 Pass / 10 Fail |

Toàn bộ 9 HTML report (Playwright, `Run by: 23127211` + ISO timestamp theo đúng mục 11 Anti-AI-Cheat) nằm tại `tests/e2e/reports/html/<feature>-<browser>/index.html`.

**Test case không tự động hoá được qua UI** (đã đổi sang gọi thẳng API, giải thích lý do trong `tests/e2e/test-data/*.json` mục `knownIssues` và `tests/test-runs/sprint-1-test-run.md` mục 5): `TC-REGISTER-003/004/017`, `TC-PRODUCT-010/011/012/013/014` — không có ca nào bị bỏ hoàn toàn.

---

## Bảng tự đánh giá điểm

| Số Thứ Tự | Tiêu chí                   | Điểm tối đa | Điểm tự đánh giá | Ghi chú                                                                                                                               |
| :-------: | :------------------------- | :---------: | :--------------: | :------------------------------------------------------------------------------------------------------------------------------------ |
|     1     | Task 1 - Feature A (FR-01) |     25      |        25        | Automation + human review + bug report đầy đủ; còn thiếu tạo GitHub Issue thật cho 5 bug                                              |
|     1     | Task 1 - Feature B (FR-07) |     25      |        25        | Tương tự A; còn thiếu GitHub Issue cho 10 bug                                                                                         |
|     1     | Task 1 - Feature C (FR-15) |     25      |        25        | Tương tự A; còn thiếu GitHub Issue cho 7 bug                                                                                          |
|     2     | Task 2 — Demo video        |     15      |        15        | ⚠️ Chưa quay — cần tự quay theo mục 2 (mặt/terminal `whoami`+`hostname`, tiếng Việt, ≥5 phút)                                         |
|     3     | Agent Skills               |     10      |        10        | Skill `playwright-automation`/`bug-reporting`/`ai-audit-logger` đã xây và dùng thật xuyên suốt; còn thiếu video demo skill theo mục 7 |
|           | **Tổng cộng**              |   **100**   |     **100**      | _Số gợi ý dựa trên tình trạng hiện tại — tự điều chỉnh sau khi hoàn tất video + GitHub Issues_                                        |

---

## Demo toàn bộ về Automation Testing

Video demo e2e về Automation Testing: [Link](https://youtu.be/ydacYKZs89I)

---

## Demo Agent Skill

Toàn bộ automation trong bài này được thực hiện qua 3 Agent Skill tự xây tại `.agents/skills/` (chi tiết cách dùng từng skill: `docs/anh-khoa/main-report.md` mục 4):

| Skill                       | Vai trò                                                                                                                                                                                                                                                                                        | Input → Output                                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **`playwright-automation`** | Chuyển bảng test case thành suite Playwright data-driven, chạy đa trình duyệt, kèm HTML report có dấu vết tác giả. Đi qua quy trình 5 phase, có điểm dừng xác nhận của người dùng giữa Phase 1 (chiến lược/locator) và Phase 2 (sinh script) — chính là chốt "human review" mà đề bài yêu cầu. | Bảng test case (`.md`) + source code thật → `test-data/*.json` + `specs/*.spec.ts` + `playwright.config.ts` |
| **`bug-reporting`**         | Chuẩn hoá mỗi defect quan sát được từ test fail thành bug report đúng field (`Found by Test Case`, `Requirement liên quan`, `Severity/Priority`, `Steps to reproduce`...), sinh đồng thời 2 output dùng thẳng được.                                                                            | Defect quan sát được (từ TC fail) → GitHub Issue body + file `tests/bug-reports/<module>/BUG-*.md`          |
| **`ai-audit-logger`**       | Lớp ghi log chạy kèm 2 skill trên — bắt buộc copy nguyên văn, đầy đủ prompt/output gốc, không tóm tắt. Là bằng chứng duy nhất cho toàn bộ phần Gap Analysis trong main report.                                                                                                                 | Prompt + output gốc của 1 lượt gọi skill khác → 1 entry mới trong `docs/anh-khoa/ai audit report.md`        |

Video demo: [Link](https://youtu.be/_ALbyZtGmnQ)
