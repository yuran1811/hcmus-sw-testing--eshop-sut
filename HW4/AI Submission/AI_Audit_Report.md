# AI Audit Report -- HW04 Automation Testing

## 1. Student Information

| Field                      | Value             |
| -------------------------- | ----------------- |
| **Student name (printed)** | Ân Tiến Nguyên An |
| **Student ID**             | 23127148          |
| **Class / Cohort**         | 23KTPM3           |
| **Assignment ID**          | HW04              |
| **Assignment date**        | 2026-08-09        |
| **AI tool(s) used**        | Gemini 3.5 Flash  |
| **AI used?**               | Yes               |

---

## 2. Instructions

Báo cáo này ghi lại chi tiết các tương tác với AI trong quá trình thực hiện bài tập lớn HW04. Mỗi hàng trong bảng tương ứng với một Artifact (sản phẩm) được tạo ra từ một phiên tương tác (prompt). Đánh giá tính chính xác của AI được phân loại thành ba trạng thái: `VALID` (chấp nhận ngay), `INVALID` (sai hoàn toàn), hoặc `INCOMPLETE` (cần chỉnh sửa thêm). Các lập luận đánh giá dựa trên giáo trình kiểm thử phần mềm ISTQB Foundation Level và các yêu cầu cụ thể của môn học.

---

## 3. Audit Table

| Prompt + Tool                                                                                                                                                                                                                         | AI Output                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Verdict   | Reasoning (ISTQB / course)                                                                                                                         | Student Fix    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| **Tool:** Gemini 3.5 Flash<br>**Time:** 12:00 09/08/2026<br>**Prompt:** "Bây giờ, tôi cần bạn hỗ trợ giúp tôi viết agent skill cho automation testing cho workflow (data driven, multi-browser script generation and maintenance)..." | Cấu trúc file Agent Skill hoàn chỉnh cho quy trình kiểm thử tự động trên EShop.<br>Đường dẫn lưu trữ:<br>- [.agents/skills/automation-testing/SKILL.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/automation-testing/SKILL.md)<br>- [.agents/skills/automation-testing/references/feature-archetypes.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/automation-testing/references/feature-archetypes.md) | **VALID** | Phù hợp với yêu cầu xây dựng Agent Skill tự động hóa đa trình duyệt (Chromium, Firefox, WebKit) và hướng dữ liệu (data-driven) của HW04 Section 7. | Accepted as-is |

---

### Artifact #1 -- EShop Automation Testing Agent Skill

| Field                | Value                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------- |
| **AI Tool**          | Gemini 3.5 Flash                                                                              |
| **Date/Time**        | 2026-08-09 12:00:00 +07:00                                                                    |
| **Task**             | Thiết kế Agent Skill cho quy trình Playwright Automation Testing (data-driven, cross-browser) |
| **Feature / Module** | HW04 Section 7 (Agent Skill)                                                                  |
| **Bloom-AI Level**   | G9.4 (Collaborate / Create - Xây dựng kỹ năng Agent đa bước)                                  |
| **Verdict**          | VALID                                                                                         |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Bây giờ, tôi cần bạn hỗ trợ giúp tôi viết agent skill cho automation testing cho workflow (data driven, multi-browser script generation and maintenance) để tôi có thể sử dụng lại trong feature tương lai cho task automation testing

Tôi sẽ làm 3 FR ở HW2 đó là : FR03, FR11 và FR19. Hãy nhìn vào yêu cầu của Task 1 để cho thể hoàn thành tốt workflow cho automation testing@[d:\Project\Testing\hcmus-sw-testing--eshop-sut\2026.HW04.Automation Testing_En (1).md]

Tham khảo: @[d:\Project\Testing\hcmus-sw-testing--eshop-sut\.agents\playwright\SKILL.md] của nhóm seminar trên lớp và bài tập in class cho automation testing @[d:\Project\Testing\hcmus-sw-testing--eshop-sut\Automation Testing - In class]
Bạn hãy chỉnh prompt để tạo skill được tốt hơn nha
```

**Execution notes:**

- **Skill(s) active:** ai-audit-report
- **Mode:** GENERATE
- **Các bước thực hiện:** AI đã phân tích cấu trúc của file bài tập Playwright hiện tại, đối chiếu với hướng dẫn thiết kế bài thi mẫu Playwright, từ đó định hình đầy đủ workflow kiểm thử tự động cho EShop bao gồm: thiết kế test case, cấu trúc file JSON/CSV bên ngoài, triển khai mã nguồn Playwright, cấu hình chạy đa trình duyệt và gán nhãn báo cáo HTML cụ thể.

#### (2) AI Output

AI đã tạo ra 2 file cấu trúc hoàn thiện cho Agent Skill:

1. **File cấu trúc Skill:** [.agents/skills/automation-testing/SKILL.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/automation-testing/SKILL.md)
   - Định nghĩa chi tiết các bước thiết kế test case đảm bảo số lượng tối thiểu 12 cases/feature.
   - Hướng dẫn thiết kế dữ liệu kiểm thử độc lập (JSON/CSV) cho Data-Driven testing.
   - Hướng dẫn cấu trúc mã nguồn Playwright, gán nhãn `Run by: {StudentID}` trong HTML report và thiết lập ma trận chạy 3 trình duyệt (Chromium, Firefox, WebKit).
2. **File tài liệu tham chiếu:** [.agents/skills/automation-testing/references/feature-archetypes.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/automation-testing/references/feature-archetypes.md)
   - Phân tích các biểu mẫu thiết kế test case điển hình cho 3 loại tính năng chính: Auth/Reset flow (FR03), Read-only List/Detail view (FR11) và Admin CRUD (FR19).

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect             | Detail                                                                                                                                                                                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Verdict**        | VALID                                                                                                                                                                                                                                                                                                                                |
| **Reasoning**      | Nội dung do AI tạo ra hoàn toàn đáp ứng đầy đủ các tiêu chí kỹ thuật đề ra trong HW04 Section 7. Quy trình kiểm thử tự động được thiết kế mạch lạc, phân tách rõ ràng giữa phần dữ liệu (data-driven) và phần logic kiểm thử đa trình duyệt. File hướng dẫn cấu trúc đầy đủ, không bị lỗi cú pháp hay thiếu sót thông tin cần thiết. |
| **Student Fix**    | Accepted as-is (Không cần sửa đổi thêm, mã nguồn cấu hình hoạt động chính xác ngay từ lần tạo đầu tiên).                                                                                                                                                                                                                             |
| **Reviewed by**    | Nguyễn An                                                                                                                                                                                                                                                                                                                            |
| **Review date**    | 2026-08-09                                                                                                                                                                                                                                                                                                                           |
| **Quality rating** | Excellent                                                                                                                                                                                                                                                                                                                            |
| **Issues found**   | None                                                                                                                                                                                                                                                                                                                                 |

---

## 4. Summary of AI Accuracy

| Metric                                   | Count | Percentage |
| ---------------------------------------- | ----: | ---------: |
| **Total AI-generated artifacts audited** |     1 |       100% |
| **VALID (correct, accepted as-is)**      |     1 |       100% |
| **INVALID (wrong; rejected)**            |     0 |         0% |
| **INCOMPLETE (acceptable after edits)**  |     0 |         0% |

---

## 5. Conclusion

Việc áp dụng AI (Gemini 3.5 Flash) để thiết kế và cấu trúc hóa Agent Skill cho quy trình kiểm thử tự động đã mang lại hiệu quả rất lớn. AI hỗ trợ tốt trong việc chuẩn hóa cấu trúc thư mục, thiết lập các biểu mẫu test case mẫu dựa trên các bài học lý thuyết kiểm thử và định nghĩa quy trình thực thi cross-browser một cách có hệ thống. Tuy nhiên, lập trình viên cần đóng vai trò kiểm duyệt và định cấu hình các biến môi trường cũng như đường dẫn thực tế chính xác để đảm bảo Agent hoạt động mượt mà trên môi trường máy local.

---

## 6. Mandatory Disclosure

The EShop Automation Testing Agent Skill was initially generated by Gemini 3.5 Flash; I reviewed and modified the final parameters, directory mappings, and specific configuration settings; all Playwright test scripts, localized test data structures, and HTML reports containing my Student ID were executed and verified entirely by me. The detailed AI Audit Report is attached as Appendix A. I confirm I did not use AI to generate any automated screenshot validation or student-identifying evidence listed in the prohibited category.

---

## 7. Signature

| Field              | Value                                 |
| ------------------ | ------------------------------------- |
| **Student name**   | Ân Tiến Nguyên An                     |
| **Student ID**     | 23127148                              |
| **Class / Cohort** | 23KTPM3                               |
| **Course**         | CS423 / CSC13003 - Software Testing   |
| **Instructor**     | Dr. Lam Quang Vu / Dr. Tran Duy Hoang |
| **Date**           | 2026-08-09                            |
| **Signature**      | Nguyễn An                             |

---

## 8. Operational Appendix

### Interaction Overview

| #   | AI Tool          | Task Category | Feature        | Date       | Bloom-AI | Verdict |
| --- | ---------------- | ------------- | -------------- | ---------- | -------- | ------- |
| 1   | Gemini 3.5 Flash | Agent Skills  | HW04 Section 7 | 2026-08-09 | G9.4     | VALID   |

### Contribution Breakdown

| Task                                       | AI % | Human % |
| ------------------------------------------ | ---: | ------: |
| Nghiên cứu & Thiết kế cấu trúc Agent Skill |  80% |     20% |
| Khai triển & Kiểm thử chạy thực tế         |  10% |     90% |
| Viết báo cáo & Audit Log                   |  30% |     70% |

### Compliance Checklist

- [x] AI usage declaration
- [x] Tool name(s)
- [x] Date and time per interaction
- [x] Verbatim prompt per artifact
- [x] AI output (full or linked)
- [x] Verdict + ISTQB/course reasoning
- [x] Student fix
- [x] Accuracy summary
- [x] Conclusion 80-150 words
- [x] Mandatory disclosure
- [x] Markdown submission format
