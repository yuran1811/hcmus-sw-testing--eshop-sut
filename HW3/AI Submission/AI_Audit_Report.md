# AI Audit Report -- HW03-AI Thiết kế Checklist GUI (Task 1)

## 1. Student Information

| Field | Value |
| --- | --- |
| **Student name (printed)** | Ân Tiến Nguyên An |
| **Student ID** | 23127148 |
| **Class / Cohort** | 23KTPM3 |
| **Assignment ID** | HW03-AI |
| **Assignment date** | 2026-07-30 |
| **AI tool(s) used** | Antigravity IDE (Claude Opus 4.6 Thinking) |
| **AI used?** | Yes |

## 2. Instructions

Mỗi dòng trong bảng audit đại diện cho một artifact do AI sinh ra (một prompt batch = một artifact). Prompt được ghi nguyên văn (verbatim). Phán quyết: VALID / INVALID / INCOMPLETE. Phần lý luận trích dẫn ISTQB hoặc nội dung bài giảng trên lớp.

## 3. Audit Table

| (1) Prompt + Tool | (2) AI Output | (3) Verdict | (4) Reasoning (ISTQB / course) | (5) Student Fix |
| --- | --- | --- | --- | --- |
| **Tool:** Antigravity IDE (Claude Opus 4.6 Thinking) **Time:** 14:04 30/07/2026 **Prompt:** "Chose 2 SUT screens: Forgot Password, Admin Orders. Use gui-checklist-writer skill to design GUI checklist of 45 items covering IA-01..IA-04. Save to HW3/GUI-Testing/." | Checklist 45 mục (CHECKLIST.md) + báo cáo thiết kế (DESIGN_REPORT.md). Phủ đủ 4 IA (IA-01: 12, IA-02: 12, IA-03: 9, IA-04: 12). Nội dung ban đầu bằng tiếng Anh. | INCOMPLETE | ISTQB FL 3.2 Review Process + bài giảng GUI Testing: checklist cần human gap-pass cho a11y, RTL, dark mode, Vietnamese copy mà AI thường bỏ sót. Tất cả 45 mục đều Origin=AI, chưa có mục STUDENT. | Sinh viên cần thêm mục Origin=STUDENT qua gap-pass, xác minh lại trên SUT thực, và thực thi Pass/Fail. |
| **Tool:** Antigravity IDE (Claude Opus 4.6 Thinking) **Time:** 14:13 30/07/2026 **Prompt:** "Viết bằng tiếng Việt hết đi và có output checklist.csv nữa, để sau này export ra xlsx" | Viết lại toàn bộ CHECKLIST.md + DESIGN_REPORT.md bằng tiếng Việt. Tạo thêm CHECKLIST.csv (UTF-8 BOM) cho Excel. Nội dung checklist giữ nguyên 45 mục. | VALID | FR-21 yêu cầu nhất quán ngôn ngữ tiếng Việt; CSV export hỗ trợ workflow thực tế (import Google Sheets / Excel). Không thay đổi logic kiểm tra, chỉ dịch thuật và định dạng. | Chấp nhận nguyên trạng. |

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

## 4. Summary of AI Accuracy

| Metric | Count | Percentage |
| --- | ---: | ---: |
| **Total AI-generated artifacts audited** | 2 | 100% |
| **VALID (correct, accepted as-is)** | 1 | 50.0% |
| **INVALID (wrong; rejected)** | 0 | 0.0% |
| **INCOMPLETE (acceptable after edits)** | 1 | 50.0% |

## 5. Conclusion -- When should AI be used (or not)?

AI hiệu quả trong việc tạo draft checklist GUI số lượng lớn (45 mục) với cấu trúc chuẩn và trích dẫn đặc tả (FR-21..FR-24). Đặc biệt mạnh khi đọc source code thực tế để phát hiện lỗi triển khai (ví dụ: `type="text"` thay vì `type="email"`, `dangerouslySetInnerHTML`, nút chuyển trạng thái không hợp lệ). Tuy nhiên, AI có xu hướng bỏ sót accessibility (focus ring, contrast ratio, screen reader), các trạng thái kết hợp (loading + empty + error cùng lúc), và dark mode. Nên dùng AI để brainstorm draft đầu tiên, sau đó bắt buộc gap-pass bằng tay đối chiếu IA-01..IA-04 trên SUT thực. Không dùng AI để thực thi Pass/Fail, chụp screenshot, hoặc ghi bug report -- đó phải do sinh viên thực hiện trực tiếp.

## 6. Mandatory Disclosure

"Checklist kiểm thử GUI (45 mục) và báo cáo thiết kế được sinh ban đầu bởi Antigravity IDE (Claude Opus 4.6 Thinking); tôi đã xem xét và sẽ bổ sung các mục mà AI bỏ sót (gap-pass), thực thi Pass/Fail trên SUT thực, và ghi bug report cho các mục Fail. Việc dịch sang tiếng Việt và xuất CSV cũng được thực hiện bởi AI và tôi chấp nhận nguyên trạng. Giai đoạn thực thi checklist, chụp screenshot bằng chứng, và phân tích lỗi được thực hiện hoàn toàn bởi tôi. Báo cáo AI Audit chi tiết được đính kèm. Tôi xác nhận không sử dụng AI để tạo bất kỳ artifact nào thuộc danh mục cấm (danh sách người tham gia, ảnh chụp cross-platform với thông tin cá nhân, kết quả phiên usability)."

## 7. Signature

| Field | Value |
| --- | --- |
| Student name | Ân Tiến Nguyên An |
| Student ID | 23127148 |
| Class / Cohort | 23KTPM3 |
| Course | CSC13003 - Software Testing |
| Instructor | |
| Date | 2026-07-30 |
| Signature | Ân Tiến Nguyên An |

## 8. Operational Appendix

### Interaction Overview

| # | AI Tool | Task Category | Feature | Date | Bloom-AI | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Antigravity IDE (Claude Opus 4.6 Thinking) | Task 1 GUI Checklist | Thiết kế checklist (Quên Mật Khẩu + Quản lý Đơn hàng) | 2026-07-30 | G9.2 | INCOMPLETE |
| 2 | Antigravity IDE (Claude Opus 4.6 Thinking) | Task 1 GUI Checklist | Dịch tiếng Việt + xuất CSV | 2026-07-30 | G9.1 | VALID |

### Contribution Breakdown

| Task | AI % | Human % | Ghi chú |
| --- | ---: | ---: | --- |
| Thiết kế checklist (draft 45 mục) | 90% | 10% | AI sinh draft, sinh viên cung cấp yêu cầu và chọn màn hình |
| Dịch tiếng Việt + CSV | 95% | 5% | AI dịch, sinh viên chỉnh format bảng |
| Gap-pass (thêm mục STUDENT) | 0% | 100% | Chưa thực hiện -- hoàn toàn do sinh viên |
| Thực thi Pass/Fail | 0% | 100% | Chưa thực hiện -- hoàn toàn do sinh viên |
| Bug report | 0% | 100% | Chưa thực hiện -- hoàn toàn do sinh viên |

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
