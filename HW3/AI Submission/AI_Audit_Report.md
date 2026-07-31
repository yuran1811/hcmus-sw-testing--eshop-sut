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
| **Tool:** Antigravity IDE (Gemini 3.6 Flash) **Time:** 16:00 30/07/2026 **Prompt:** "Please execute Task 1 GUI Checklist (Test Execution Phase) for HW03 end-to-end. Use the gui-checklist-runner skill and Playwright..." | Script Playwright (`run_gui_checklist.js`), kết quả thực thi JSON (`gui_results.json`), cập nhật `CHECKLIST.md` & `CHECKLIST.csv`, 18 ảnh chụp bằng chứng (`HW3/Evidences/`), và 11 báo cáo lỗi (`HW3/Bug Report/`). | INCOMPLETE | ISTQB FL 5.2 (Test Execution & Reporting): Ảnh chụp bằng chứng kiểm thử phải trực quan và chỉ rõ lỗi cụ thể. Ban đầu AI chụp ảnh toàn trang không highlight khiến ảnh bằng chứng bị lặp lại. Sinh viên đã phát hiện và yêu cầu khoanh đỏ viền phần tử lỗi + đính kèm nhãn cảnh báo. | Sinh viên kiểm tra bằng chứng, phản hồi ảnh chụp bị lặp lại. AI đã nâng cấp script khoanh đỏ viền element + đính nhãn badge FAIL trên từng phần tử lỗi, chụp lại 18 ảnh bằng chứng chuẩn xác và commit git. |
| **Tool:** Antigravity IDE (Gemini 3.6 Flash) **Time:** 08:50 31/07/2026 **Prompt:** "I forgot to tell you create test summary for GUI checklist... Tôi cho bạn test summary mẫu từ HW2 nè, hãy chỉnh lại đi... Hãy bỏ hết các git issue draft trong bug report đi" | Báo cáo `TEST_SUMMARY.md` chuẩn mẫu HW02, script `convert_csv_to_excel.py` sinh `CHECKLIST.xlsx`, và script `remove_github_issue_drafts.py` loại bỏ phần GitHub Issue Draft khỏi các file bug report. | INCOMPLETE | ISTQB FL 5.2 (Test Summary Report): Báo cáo tổng kết phải bao gồm tóm tắt kết quả kiểm thử, phạm vi, chỉ số bao phủ, tỷ lệ thành công (Pass rate), danh sách lỗi phát hiện và truy vết tài liệu. AI ban đầu tạo báo cáo chưa đồng bộ mẫu HW02. Sinh viên đã cung cấp template HW02 chuẩn và yêu cầu đồng bộ. | Sinh viên cung cấp mẫu báo cáo HW02 tiêu chuẩn, chỉ đạo AI cập nhật bảng thông tin tổng quan (Summary Information) và chi tiết thực thi (Detailed Execution Results), đồng thời yêu cầu xóa bỏ phần draft không cần thiết trong Bug Reports. |

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

### Artifact #4 -- Lập Test Summary Report theo mẫu HW02, xuất CHECKLIST.xlsx và loại bỏ GitHub Issue Drafts

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Gemini 3.6 Flash) |
| **Date/Time** | 2026-07-31 08:50:00 +07:00 |
| **Task** | Lập Báo cáo Tổng kết Kiểm thử (Test Summary Report) theo đúng bảng mẫu HW02, tạo file Excel `CHECKLIST.xlsx` có định dạng màu trực quan, và tinh chỉnh các Bug Report loại bỏ phần GitHub Issue Draft |
| **Feature / Module** | Task 1 / Test Summary & Report Refinement |
| **Bloom-AI Level** | G9.3 (Analyse) -- Phân tích tổng hợp chỉ số thực thi kiểm thử, đồng bộ hóa định dạng tài liệu báo cáo theo chuẩn môn học và kiểm soát chất lượng danh mục bug reports |
| **Verdict** | INCOMPLETE |

#### (1) Prompt (verbatim)

```text
I forgot to tell you create test summary for GUI checklist with this requirement in HW3 "The Excel checklist (more than 40 items) and the test summary."
Tôi cho bạn test summary mẫu từ HW2 nè, hãy chỉnh lại đi
[HW2 Template markdown content]
Hãy bỏ hết các git issue draft trong bug report đi
```

**Execution notes:**

- Tạo script `scripts/convert_csv_to_excel.py` (sử dụng Python pandas + openpyxl) để chuyển đổi `CHECKLIST.csv` thành `CHECKLIST.xlsx` với định dạng font Segoe UI, viền bảng và tô màu xanh/đỏ cho Pass/Fail.
- Tạo báo cáo `TEST_SUMMARY.md` tại `HW3/GUI-Testing/` và `HW3/Main Report/` tuân thủ chính xác mẫu HW02 (có bảng 📊 Summary Information và 📋 Detailed Execution Results).
- Tạo script `scripts/remove_github_issue_drafts.py` cắt bỏ phần draft không cần thiết khỏi tất cả 13 file bug report trong `HW3/Bug Report/`.

#### (2) AI Output

- **Excel Checklist:** [CHECKLIST.xlsx](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/GUI-Testing/CHECKLIST.xlsx)
- **Test Summary Report:** [TEST_SUMMARY.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/GUI-Testing/TEST_SUMMARY.md) và [TEST_SUMMARY.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Main%20Report/TEST_SUMMARY.md)
- **Trimmed Bug Reports:** 13 file bug report sạch sẽ trong [HW3/Bug Report/](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Bug%20Report/)

#### (3)-(5) Review

| Aspect | Detail |
| --- | --- |
| **Verdict** | INCOMPLETE |
| **Reasoning** | ISTQB FL 5.2 (Test Summary Report): Báo cáo tổng kết kiểm thử phải có cấu trúc chuẩn hóa, thể hiện rõ tỷ lệ bao phủ (Test Coverage) và tỷ lệ thành công (Successful Test Coverage), phục vụ công tác nghiệm thu. AI ban đầu tạo báo cáo mở rộng nhưng chưa khớp mẫu HW02. Sinh viên đã can thiệp cung cấp mẫu chuẩn HW02, yêu cầu bổ sung giảng viên hướng dẫn/TAs vào bảng thông tin và loại bỏ các phần dư thừa trong bug report. |
| **Student Fix** | Sinh viên cung cấp bảng mẫu HW02, chỉ đạo AI cập nhật chính xác các thông tin Reviewer, Creator, chỉ số Pass/Fail, đồng thời yêu cầu xóa bỏ phần GitHub Issue Draft để các file bug report đạt chuẩn trình nộp chính thức. |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-07-31 |
| **Quality rating** | Excellent |
| **Issues found** | Báo cáo ban đầu chưa khớp mẫu HW02; bug report dư thừa phần issue draft. Đã được sinh viên điều chỉnh và hoàn thiện. |

---

## 4. Summary of AI Accuracy

| Metric | Count | Percentage |
| --- | ---: | ---: |
| **Total AI-generated artifacts audited** | 4 | 100% |
| **VALID (correct, accepted as-is)** | 1 | 25.0% |
| **INVALID (wrong; rejected)** | 0 | 0.0% |
| **INCOMPLETE (acceptable after edits)** | 3 | 75.0% |

## 5. Conclusion -- When should AI be used (or not)?

AI tỏ ra rất hiệu quả trong việc thiết kế draft GUI checklist 45 mục trích dẫn đặc tả FR-21..24, viết mã tự động hóa Playwright để thực thi kiểm thử trên trình duyệt Google Chrome thực tế, tự động xuất file Excel (.xlsx) được tô màu định dạng chuyên nghiệp, và tổng hợp báo cáo Test Summary Report. Tuy nhiên, AI có hạn chế về tính chính xác trong việc tự định dạng bằng chứng hình ảnh (chụp toàn trang không highlight) và tuân thủ định dạng báo cáo tiêu chuẩn của môn học nếu không có mẫu đối chiếu. Sự giám sát và điều chỉnh của sinh viên là bắt buộc: sinh viên đã phát hiện ảnh chụp bị lặp lại, yêu cầu khoanh viền đỏ phần tử lỗi, cung cấp mẫu HW2 chuẩn để đồng bộ báo cáo Test Summary, và loại bỏ các phần draft dư thừa khỏi bug report. Khuyến nghị sử dụng AI để hỗ trợ tự động hóa và tổng hợp số liệu, nhưng sinh viên phải trực tiếp định hướng cấu trúc báo cáo và duyệt lại toàn bộ sản phẩm đầu ra.

## 6. Mandatory Disclosure

"Checklist kiểm thử GUI (45 mục), kịch bản tự động hóa Playwright (`run_gui_checklist.js`), file Excel định dạng (`CHECKLIST.xlsx`), Báo cáo tổng kết kiểm thử (`TEST_SUMMARY.md`), và 13 báo cáo lỗi Markdown được sinh ban đầu với sự hỗ trợ của Antigravity IDE (Claude Opus 4.6 Thinking & Gemini 3.6 Flash). Tôi đã kiểm tra kỹ lưỡng kết quả thực thi, phát hiện và sửa đổi các hạn chế của AI (yêu cầu chèn highlight đỏ lên ảnh bằng chứng lỗi, cung cấp mẫu tiêu chuẩn HW02 để đồng bộ báo cáo Test Summary, và xóa bỏ phần draft không cần thiết khỏi bug report). Báo cáo AI Audit chi tiết được đính kèm. Tôi xác nhận không sử dụng AI để tạo bất kỳ artifact nào thuộc danh mục cấm (danh sách người tham gia, ảnh chụp cross-platform với thông tin cá nhân, kết quả phiên usability)."

## 7. Signature

| Field | Value |
| --- | --- |
| Student name | Ân Tiến Nguyên An |
| Student ID | 23127148 |
| Class / Cohort | 23KTPM3 |
| Course | CSC13003 - Software Testing |
| Instructor | Dr. Lam Quang Vu / Dr. Tran Duy Hoang |
| Date | 2026-07-31 |
| Signature | Ân Tiến Nguyên An |

## 8. Operational Appendix

### Interaction Overview

| # | AI Tool | Task Category | Feature | Date | Bloom-AI | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Antigravity IDE (Claude Opus 4.6 Thinking) | Task 1 GUI Checklist | Thiết kế checklist (Quên Mật Khẩu + Quản lý Đơn hàng) | 2026-07-30 | G9.2 | INCOMPLETE |
| 2 | Antigravity IDE (Claude Opus 4.6 Thinking) | Task 1 GUI Checklist | Dịch tiếng Việt + xuất CSV | 2026-07-30 | G9.1 | VALID |
| 3 | Antigravity IDE (Gemini 3.6 Flash) | Task 1 GUI Checklist | Thực thi Playwright + Chụp bằng chứng Highlight + Bug Reports | 2026-07-30 | G9.4 | INCOMPLETE |
| 4 | Antigravity IDE (Gemini 3.6 Flash) | Task 1 GUI Checklist | Lập Test Summary (mẫu HW02) + Excel XLSX + Tinh chỉnh Bug Reports | 2026-07-31 | G9.3 | INCOMPLETE |

### Contribution Breakdown

| Task | AI % | Human % | Ghi chú |
| --- | ---: | ---: | --- |
| Thiết kế checklist (draft 45 mục) | 90% | 10% | AI sinh draft, sinh viên cung cấp yêu cầu và chọn màn hình |
| Dịch tiếng Việt + CSV | 95% | 5% | AI dịch, sinh viên chỉnh format bảng |
| Thực thi Playwright GUI Runner | 85% | 15% | AI viết script & chạy, sinh viên xác minh kết quả trên Chrome |
| Kiểm tra & khoanh vùng bằng chứng lỗi | 40% | 60% | Sinh viên phát hiện ảnh lặp lại, chỉ đạo khoanh viền đỏ + badge |
| Xuất file Excel `CHECKLIST.xlsx` | 90% | 10% | AI viết script Python openpyxl tô màu bảng, sinh viên duyệt |
| Lập báo cáo `TEST_SUMMARY.md` | 70% | 30% | Sinh viên cung cấp template HW02 chuẩn, AI tổng hợp chỉ số |
| Tinh chỉnh Bug Reports (bỏ draft) | 80% | 20% | Sinh viên chỉ đạo xóa git issue draft, AI chạy script làm sạch |

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
