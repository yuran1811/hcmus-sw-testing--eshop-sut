# AI Audit Report -- HW03-AI Thiết kế & Thực thi Checklist GUI (Task 1)

## 1. Student Information

| Field | Value |
| --- | --- |
| **Student name (printed)** | Ân Tiến Nguyên An |
| **Student ID** | 23127148 |
| **Class / Cohort** | 23KTPM3 |
| **Assignment ID** | HW03-AI |
| **Assignment date** | 2026-07-31 |
| **AI tool(s) used** | Antigravity IDE (Claude Opus 4.6 Thinking & Gemini 3.6 Flash) |
| **AI used?** | Yes |

## 2. Instructions

Mỗi dòng trong bảng audit đại diện cho một artifact do AI sinh ra (một prompt batch = một artifact). Prompt được ghi nguyên văn (verbatim). Phán quyết: VALID / INVALID / INCOMPLETE. Phần lý luận trích dẫn ISTQB hoặc nội dung bài giảng trên lớp.

## 3. Audit Table

| (1) Prompt + Tool | (2) AI Output | (3) Verdict | (4) Reasoning (ISTQB / course) | (5) Student Fix |
| --- | --- | --- | --- | --- |
| **Tool:** Antigravity IDE (Claude Opus 4.6 Thinking) **Time:** 14:04 30/07/2026 **Prompt:** "Chose 2 SUT screens: Forgot Password, Admin Orders. Use gui-checklist-writer skill to design GUI checklist of 45 items covering IA-01..IA-04. Save to HW3/GUI-Testing/." | Checklist 45 mục (CHECKLIST.md) + báo cáo thiết kế (DESIGN_REPORT.md). Phủ đủ 4 IA (IA-01: 12, IA-02: 12, IA-03: 9, IA-04: 12). Nội dung ban đầu bằng tiếng Anh. | INCOMPLETE | ISTQB FL 3.2 Review Process + bài giảng GUI Testing: checklist cần human gap-pass cho a11y, RTL, dark mode, Vietnamese copy mà AI thường bỏ sót. Tất cả 45 mục đều Origin=AI, chưa có mục STUDENT. | Sinh viên cần thêm mục Origin=STUDENT qua gap-pass, xác minh lại trên SUT thực, và thực thi Pass/Fail. |
| **Tool:** Antigravity IDE (Claude Opus 4.6 Thinking) **Time:** 14:13 30/07/2026 **Prompt:** "Viết bằng tiếng Việt hết đi và có output checklist.csv nữa, để sau này export ra xlsx" | Viết lại toàn bộ CHECKLIST.md + DESIGN_REPORT.md bằng tiếng Việt. Tạo thêm CHECKLIST.csv (UTF-8 BOM) cho Excel. Nội dung checklist giữ nguyên 45 mục. | VALID | FR-21 yêu cầu nhất quán ngôn ngữ tiếng Việt; CSV export hỗ trợ workflow thực tế (import Google Sheets / Excel). Không thay đổi logic kiểm tra, chỉ dịch thuật và định dạng. | Chấp nhận nguyên trạng. |
| **Tool:** Antigravity IDE (Gemini 3.6 Flash) **Time:** 16:00 30/07/2026 **Prompt:** "Please execute Task 1 GUI Checklist (Test Execution Phase) for HW03 end-to-end. Use the gui-checklist-runner skill and Playwright..." | Script Playwright (`run_gui_checklist.js`), kết quả thực thi JSON (`gui_results.json`), cập nhật `CHECKLIST.md` & `CHECKLIST.csv`, 21 ảnh chụp bằng chứng (`HW3/Evidences/`), và 11 báo cáo lỗi (`HW3/Bug Report/`). | INCOMPLETE | ISTQB FL 5.2 (Test Execution & Reporting): Ảnh chụp bằng chứng kiểm thử phải trực quan và chỉ rõ lỗi cụ thể. Ban đầu AI chụp ảnh toàn trang không highlight khiến ảnh bằng chứng bị lặp lại. Sinh viên đã phát hiện và yêu cầu khoanh đỏ viền phần tử lỗi + đính kèm nhãn cảnh báo. | Sinh viên kiểm tra bằng chứng, phản hồi ảnh chụp bị lặp lại. AI đã nâng cấp script khoanh đỏ viền element + đính nhãn badge FAIL trên từng phần tử lỗi, chụp lại 18 ảnh bằng chứng chuẩn xác và commit git. |

---

### Artifact #1 -- Thiết kế checklist GUI ban đầu (Quên Mật Khẩu + Quản lý Đơn hàng)

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Claude Opus 4.6 Thinking) |
| **Date/Time** | 2026-07-30 14:04:19 +07:00 |
| **Task** | Thiết kế checklist kiểm thử GUI cho 2 màn hình SUT |
| **Feature / Module** | Task 1 / Quên Mật Khẩu + Quản lý Đơn hàng Admin / IA-01 đến IA-04 |
| **Bloom-AI Level** | G9.2 (Apply) -- sử dụng skill có cấu trúc để sinh draft đầu tiên; chưa có phân tích gap do sinh viên |
| **Verdict** | INCOMPLETE |

#### (1) Prompt (verbatim)

```text
Oke, so the next step for me is finishing Task 1 GUI Checklist.

I chose 2 SUT screens:

Primary Screen: Forgot Password (/forgot-password)
Secondary Screen: Admin Orders Management (/admin/orders)
Please use the gui-checklist-writer skill to design a GUI checklist of 45 items covering all four interface aspects:

General UI standards (IA-01)
Forms (IA-02)
Navigation (IA-03)
Feedback / State (IA-04)
Output Requirements:

Save artifacts to HW3/GUI-Testing/ (including DESIGN_REPORT.md and CHECKLIST.md).
CHECKLIST.md must include the standard design columns: Checklist ID (e.g. GUI-FORGOT-IA02-01), Screen, IA, Category, Component, Checklist Item, Spec / Source (citing EShop FR-21..24), Expected Result, and Origin (AI).
Leave Status, Actual Result, Notes, and Evidence blank for execution phase later.
```

**Execution notes:**

- Skill: `gui-checklist-writer` (mode GENERATE)
- AI đọc source code thực tế của ForgotPassword.jsx và App.jsx (admin) để xây dựng component inventory
- AI đọc README.md (FR-01..FR-24, SEC-01..SEC-07) làm nguồn đặc tả
- AI đọc skill references: ia_aspects.md, item_catalog.md, sample_checklist_excerpt.md

#### (2) AI Output

Tạo 2 file:

- **CHECKLIST.md:** 45 mục kiểm tra dạng bảng Markdown, chia theo màn hình và IA. Phân bố: IA-01 (12), IA-02 (12), IA-03 (9), IA-04 (12). Tất cả mục có Origin=AI. Mỗi mục có Kết quả mong đợi quan sát được (binary-observable).
- **DESIGN_REPORT.md:** Bao gồm phạm vi, bảng kê thành phần, phương pháp xây dựng (6 phương pháp), ma trận phủ, bảng truy vết, ghi chú mơ hồ.

Đầu ra đầy đủ: [CHECKLIST.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/GUI-Testing/CHECKLIST.md), [DESIGN_REPORT.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/GUI-Testing/DESIGN_REPORT.md)

**Các phát hiện đáng chú ý từ source code:**

| Phát hiện | Checklist ID | Lỗi tiềm ẩn |
| --- | --- | --- |
| `<h2>` thay vì `<h1>` | GUI-FORGOT-IA01-01 | Vi phạm FR-21 |
| Email input dùng `type="text"` | GUI-FORGOT-IA02-01 | Vi phạm FR-22 |
| Thiếu step indicator | GUI-FORGOT-IA02-04 | Vi phạm FR-03, FR-22 |
| Thiếu trường xác nhận mật khẩu | GUI-FORGOT-IA02-05 | Vi phạm FR-03 |
| Nhãn OTP ghi "4 số" (spec: 6) | GUI-FORGOT-IA02-06 | Vi phạm FR-03 |
| `dangerouslySetInnerHTML` cho địa chỉ | GUI-ORDERS-IA01-05 | Vi phạm FR-18, SEC-04 |
| Nút "Đánh dấu Đã giao" trên đơn đã hủy | GUI-ORDERS-IA04-04 | Vi phạm FR-10 |

#### (3)-(5) Review

| Aspect | Detail |
| --- | --- |
| **Verdict** | INCOMPLETE |
| **Reasoning** | ISTQB FL 3.2 (Review Process): review phải bao gồm gap analysis sau khi tạo draft. Bài giảng GUI Testing nhấn mạnh AI thường bỏ sót accessibility (focus ring, contrast, touch targets), RTL/long Vietnamese text overflow, dark mode, và loading/empty/error states kết hợp. Tất cả 45 mục đều Origin=AI, chưa có mục Origin=STUDENT -- vi phạm yêu cầu HW03 gap-pass. |
| **Student Fix** | Chưa thực hiện. Sinh viên cần: (1) thêm mục STUDENT qua gap-pass, (2) thực thi Pass/Fail trên SUT, (3) ghi bug report cho các mục Fail. |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-07-30 |
| **Quality rating** | Good |
| **Issues found** | Tất cả Origin=AI; chưa có gap-pass; nội dung ban đầu bằng tiếng Anh (đã sửa ở Artifact #2) |

---

### Artifact #2 -- Dịch tiếng Việt + xuất CSV

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Claude Opus 4.6 Thinking) |
| **Date/Time** | 2026-07-30 14:13:18 +07:00 |
| **Task** | Viết lại toàn bộ checklist và design report bằng tiếng Việt, tạo file CSV |
| **Feature / Module** | Task 1 / Định dạng đầu ra |
| **Bloom-AI Level** | G9.1 (Remember/Understand) -- dịch thuật và chuyển đổi định dạng, không thay đổi logic |
| **Verdict** | VALID |

#### (1) Prompt (verbatim)

```text
Viết bằng tiếng việt hết đi và có output checklist.csv nữa, để sau này export ra xlsx
```

#### (2) AI Output

- Viết lại CHECKLIST.md hoàn toàn bằng tiếng Việt (tên cột, mục kiểm tra, kết quả mong đợi)
- Viết lại DESIGN_REPORT.md hoàn toàn bằng tiếng Việt
- Tạo mới CHECKLIST.csv (45 dòng dữ liệu, UTF-8 BOM, dấu ngoặc kép bọc mọi trường theo RFC 4180)

Đầu ra đầy đủ: [CHECKLIST.csv](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/GUI-Testing/CHECKLIST.csv)

#### (3)-(5) Review

| Aspect | Detail |
| --- | --- |
| **Verdict** | VALID |
| **Reasoning** | Chỉ dịch thuật và chuyển đổi định dạng, không thay đổi nội dung kiểm tra. FR-21 yêu cầu nhất quán tiếng Việt -- dịch checklist sang tiếng Việt là phù hợp. CSV với UTF-8 BOM đảm bảo Excel mở đúng dấu tiếng Việt. |
| **Student Fix** | Chấp nhận nguyên trạng. Sinh viên đã chỉnh sửa format bảng markdown cho dễ đọc (chỉnh spacing cột). |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-07-30 |
| **Quality rating** | Excellent |
| **Issues found** | Không có |

---

### Artifact #3 -- Thực thi tự động Playwright GUI Runner, cập nhật báo cáo và tạo Bug Reports

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Gemini 3.6 Flash) |
| **Date/Time** | 2026-07-30 16:00:04 +07:00 |
| **Task** | Thực thi tự động 45 mục GUI Checklist bằng Playwright trong Google Chrome Headed mode, chụp bằng chứng lỗi, cập nhật CHECKLIST.md/.csv và xuất 11 Bug Reports |
| **Feature / Module** | Task 1 / Test Execution Phase / Quên Mật Khẩu + Quản lý Đơn hàng Admin |
| **Bloom-AI Level** | G9.4 (Collaborate / Create) -- phối hợp giữa sinh viên và AI agent để viết Playwright runner script, kiểm thử tự động, khoanh vùng highlight đỏ trên phần tử lỗi, cập nhật báo cáo và tạo bug reports |
| **Verdict** | INCOMPLETE |

#### (1) Prompt (verbatim)

```text
Please execute Task 1 GUI Checklist (Test Execution Phase) for HW03 end-to-end.

Use the `gui-checklist-runner` skill and Playwright to perform the following:

1. Generate and run the Playwright GUI runner script:
   - Create `scripts/run_gui_checklist.js` using `require('./Automation-testing/node_modules/playwright')`.
   - Configure Google Chrome browser in HEADED mode (`chromium.launch({ headless: false, channel: 'chrome' })`) so the actual Google Chrome window visibly pops up on screen during execution.
   - Attach a dialog handler `page.on('dialog')` to catch native `window.alert()` messages on `/forgot-password`.
   - Run `node scripts/run_gui_checklist.js` to evaluate all 45 GUI checklist items in `HW3/GUI-Testing/CHECKLIST.md` across Forgot Password (/forgot-password) and Admin Orders (/admin/orders).
   - Mark each checklist item as Passed or Failed, record the failure reason in Notes for Failed items, and capture evidence screenshots FOR FAILED ITEMS ONLY into `HW3/Evidences/`.

2. Update execution results in both checklist artifacts:
   - `HW3/GUI-Testing/CHECKLIST.md`
   - `HW3/GUI-Testing/CHECKLIST.csv` (preserve UTF-8 BOM encoding)

3. Report all discovered bugs:
   - Create Markdown bug report files in `HW3/Bug Report/` following `bug-report-template.md` (English section headers + Vietnamese body content).
   - Include GitHub Issues draft format for each bug with evidence screenshot references.
```

**Execution notes:**

- Skill: `gui-checklist-runner`
- Script: `scripts/run_gui_checklist.js` sử dụng Playwright Chromium Headed mode (`channel: 'chrome'`)
- Đánh giá 45 mục checklist (28 mục Quên Mật Khẩu, 17 mục Admin Orders)
- Cập nhật kết quả: 27 Pass (60.0%), 18 Fail (40.0%)
- Tạo 11 Bug Report Markdown files (`BUG-FORGOT-001` đến `BUG-FORGOT-008`, `BUG-ORDERS-001` đến `BUG-ORDERS-003`)

#### (2) AI Output

- **Playwright Runner Script:** [run_gui_checklist.js](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/scripts/run_gui_checklist.js)
- **Checklist Artifacts:** Cập nhật trạng thái Pass/Fail, Kết quả thực tế, Ghi chú và Bằng chứng cho 45 mục tại [CHECKLIST.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/GUI-Testing/CHECKLIST.md) và [CHECKLIST.csv](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/GUI-Testing/CHECKLIST.csv).
- **Evidence Screenshots:** 18 ảnh PNG lưu tại [HW3/Evidences/](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Evidences/).
- **Bug Reports:** 11 file Markdown theo đúng chuẩn template tại [HW3/Bug Report/](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Bug%20Report/).

#### (3)-(5) Review

| Aspect | Detail |
| --- | --- |
| **Verdict** | INCOMPLETE |
| **Reasoning** | ISTQB FL 5.2 (Test Execution & Reporting): Bằng chứng hình ảnh kiểm thử phải có tính trực quan cao và thể hiện rõ ràng thành phần bị lỗi. Ban đầu, AI chụp ảnh màn hình toàn trang (full page screenshot) mà không highlight làm cho các ảnh bằng chứng của các lỗi cùng trang bị lặp lại giống hệt nhau. Sinh viên đã phát hiện, kiểm tra và yêu cầu khoanh đỏ viền phần tử lỗi (`4px solid red`) + đính kèm nhãn cảnh báo `❌ FAIL`. |
| **Student Fix** | Sinh viên xem lại ảnh bằng chứng, phản hồi ảnh chụp bị lặp lại do thiếu highlight. AI đã cập nhật script `run_gui_checklist.js` chèn CSS highlight đỏ và badge cảnh báo lên từng element bị lỗi, thực thi lại Playwright runner, cập nhật lại 18 ảnh bằng chứng chính xác và commit git (`6f35f7c`). |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-07-30 |
| **Quality rating** | Acceptable |
| **Issues found** | Ảnh bằng chứng ban đầu bị lặp lại do thiếu visual highlight; đã được nâng cấp script và chụp lại chuẩn xác. |

---

## 4. Summary of AI Accuracy

| Metric | Count | Percentage |
| --- | ---: | ---: |
| **Total AI-generated artifacts audited** | 3 | 100% |
| **VALID (correct, accepted as-is)** | 1 | 33.3% |
| **INVALID (wrong; rejected)** | 0 | 0.0% |
| **INCOMPLETE (acceptable after edits)** | 2 | 66.7% |

## 5. Conclusion -- When should AI be used (or not)?

AI tỏ ra rất hiệu quả trong việc thiết kế draft GUI checklist 45 mục trích dẫn đặc tả FR-21..24, viết mã tự động hóa Playwright để thực thi kiểm thử trên trình duyệt Google Chrome thực tế, và tự động xuất các báo cáo Bug Report theo chuẩn template. Tuy nhiên, AI có hạn chế ở việc tạo bằng chứng hình ảnh trực quan ban đầu (chụp ảnh toàn trang mà không tự động khoanh vùng highlight lỗi làm ảnh bị lặp lại). Sự giám sát và can thiệp của sinh viên là bắt buộc: sinh viên đã phát hiện sự lặp lại của bằng chứng, yêu cầu AI bổ sung CSS red-highlight overlay và badge lỗi trên từng phần tử HTML trước khi chụp lại. Khuyến nghị dùng AI để dựng framework automation và draft báo cáo, nhưng bắt buộc sinh viên phải kiểm tra trực quan từng ảnh bằng chứng và kết quả thực tế trên SUT.

## 6. Mandatory Disclosure

"Checklist kiểm thử GUI (45 mục), kịch bản tự động hóa Playwright (`run_gui_checklist.js`), việc thực thi Pass/Fail tự động, và 11 báo cáo lỗi Markdown được sinh ban đầu bởi Antigravity IDE (Claude Opus 4.6 Thinking & Gemini 3.6 Flash). Tôi đã kiểm tra kỹ lưỡng kết quả thực thi và phát hiện ảnh bằng chứng ban đầu bị lặp lại do thiếu visual highlight; tôi đã yêu cầu AI bổ sung viền khung đỏ và nhãn cảnh báo lỗi trên từng phần tử HTML bị lỗi trước khi chụp lại 18 file bằng chứng chuẩn xác. Báo cáo AI Audit chi tiết được đính kèm. Tôi xác nhận không sử dụng AI để tạo bất kỳ artifact nào thuộc danh mục cấm (danh sách người tham gia, ảnh chụp cross-platform với thông tin cá nhân, kết quả phiên usability)."

## 7. Signature

| Field | Value |
| --- | --- |
| Student name | Ân Tiến Nguyên An |
| Student ID | 23127148 |
| Class / Cohort | 23KTPM3 |
| Course | CSC13003 - Software Testing |
| Instructor | |
| Date | 2026-07-31 |
| Signature | Ân Tiến Nguyên An |

## 8. Operational Appendix

### Interaction Overview

| # | AI Tool | Task Category | Feature | Date | Bloom-AI | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Antigravity IDE (Claude Opus 4.6 Thinking) | Task 1 GUI Checklist | Thiết kế checklist (Quên Mật Khẩu + Quản lý Đơn hàng) | 2026-07-30 | G9.2 | INCOMPLETE |
| 2 | Antigravity IDE (Claude Opus 4.6 Thinking) | Task 1 GUI Checklist | Dịch tiếng Việt + xuất CSV | 2026-07-30 | G9.1 | VALID |
| 3 | Antigravity IDE (Gemini 3.6 Flash) | Task 1 GUI Checklist | Thực thi Playwright + Chụp bằng chứng Highlight + Bug Reports | 2026-07-30 | G9.4 | INCOMPLETE |

### Contribution Breakdown

| Task | AI % | Human % | Ghi chú |
| --- | ---: | ---: | --- |
| Thiết kế checklist (draft 45 mục) | 90% | 10% | AI sinh draft, sinh viên cung cấp yêu cầu và chọn màn hình |
| Dịch tiếng Việt + CSV | 95% | 5% | AI dịch, sinh viên chỉnh format bảng |
| Thực thi Playwright GUI Runner | 85% | 15% | AI viết script & chạy, sinh viên xác minh kết quả trên Chrome |
| Kiểm tra & khoanh vùng bằng chứng lỗi | 40% | 60% | Sinh viên phát hiện ảnh lặp lại, chỉ đạo khoanh viền đỏ + badge |
| Lập báo cáo lỗi Bug Reports | 90% | 10% | AI sinh 11 bug reports Markdown & GitHub drafts, sinh viên rà soát |

### Compliance Checklist

- [x] AI usage declaration
- [x] Tool name(s)
- [x] Date and time per interaction
- [x] Verbatim prompt per artifact
- [x] AI output (full or linked)
- [x] Verdict + course/ISTQB reasoning
- [x] Student fix
- [x] Accuracy summary
- [x] Conclusion 80-150 words
- [x] Mandatory disclosure
- [x] Markdown submission format
