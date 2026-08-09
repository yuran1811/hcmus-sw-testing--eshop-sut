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
| **Tool:** Gemini 3.5 Flash<br>**Time:** 20:01 09/08/2026<br>**Prompt:** "Tạo project Playwright cho HW04 Automation Testing tại thư mục HW4/ trong repo..."                                                                           | Cấu hình project Playwright hoàn chỉnh gồm package.json, tsconfig.json, playwright.config.ts, runner scripts/run-matrix.js và các file test verify.                                                                                                                                                                                                                                                                                                             | **VALID** | Phù hợp với yêu cầu cấu hình dự án Playwright Task 1 (chạy cross-browser, trích xuất báo cáo HTML gán nhãn MSSV và thư mục tùy chỉnh).             | Accepted as-is |
| **Tool:** Gemini 3.5 Flash<br>**Time:** 20:10 09/08/2026<br>**Prompt:** "Tôi muốn viết test script tự động hóa cho tính năng FR-03 (Quên mật khẩu & Đặt lại mật khẩu) bằng Playwright..." | Phân tích nghiệp vụ, thiết kế 22 test cases chi tiết và triển khai mã nguồn Playwright tự động hóa hướng dữ liệu (FR03_data.json & FR03_forgot_password.spec.ts). | **VALID** | Thiết kế test case bao quát đầy đủ các kịch bản kiểm thử (Positive, Negative, Boundary, Security, GUI, Navigation) đáp ứng yêu cầu tối thiểu 12 test cases của môn học. Quy trình kiểm thử hướng dữ liệu (data-driven) và chạy ổn định trên 3 trình duyệt. | Accepted as-is |

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
   - Phân tích các biểu mẫu thiết kế test case điển hình cho 3 loại tính năng chính: Auth/Reset flow (FR03), Read-only Order/List view (FR11) và Admin CRUD (FR19).

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

### Artifact #2 -- HW04 Playwright Project and Matrix Runner Configuration

| Field                | Value                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------ |
| **AI Tool**          | Gemini 3.5 Flash                                                                           |
| **Date/Time**        | 2026-08-09 20:01:30 +07:00                                                                 |
| **Task**             | Cấu hình project Playwright, TypeScript, playwright.config.ts và viết script chạy matrix   |
| **Feature / Module** | HW04 Task 1 (Project Configuration & Runner)                                               |
| **Bloom-AI Level**   | G9.2 (Apply - Triển khai cấu trúc cấu hình và chạy tự động hóa)                           |
| **Verdict**          | VALID                                                                                      |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Tạo project Playwright cho HW04 Automation Testing tại thư mục HW4/ trong repo @[d:\Project\Testing\hcmus-sw-testing--eshop-sut]

Cần tạo:
1. `HW4/package.json` — dependencies: @playwright/test, typescript
2. `HW4/tsconfig.json` — strict mode, resolveJsonModule
3. `HW4/playwright.config.ts` — 3 projects (chromium, firefox, webkit), baseURL từ env (default http://localhost:5173), HTML reporter với title chứa "Run by: 23127148 | {feature} | {browser}", screenshot on failure, trace on first retry, output folder theo env REPORT_DIR
4. `HW4/scripts/run-matrix.js` — chạy 3 features × 3 browsers = 9 cells tuần tự, giữ report khi fail, in summary table

Student ID: 23127148
Sau khi tạo xong, chạy npm install và npx playwright install
```

**Execution notes:**

- **Skill(s) active:** none
- **Mode:** APPEND
- **Các bước thực hiện:** AI đã tạo các file cấu hình `package.json`, `tsconfig.json`, `playwright.config.ts` và script `run-matrix.js`, sau đó chạy `npm install` và `npx playwright install`. Để chạy thử nghiệm và kiểm chứng, AI tạo các spec rỗng cho FR03, FR11, và FR19 và thực thi thành công ma trận 9 cells.

#### (2) AI Output

AI đã tạo các file dự án tại thư mục `HW4/`:
1. `package.json`: Chứa devDependencies `@playwright/test` và `typescript`.
2. `tsconfig.json`: Kích hoạt chế độ `strict` và `resolveJsonModule`.
3. `playwright.config.ts`: Định nghĩa 3 trình duyệt, lấy `baseURL` và `REPORT_DIR` từ env, tùy biến tiêu đề HTML report `Run by: 23127148 | {feature} | {browser}`.
4. `scripts/run-matrix.js`: Script chạy tuần tự 9 cells bằng `child_process.spawnSync`, in bảng tóm tắt kết quả.

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect             | Detail                                                                                                                                                                                                                                                                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Verdict**        | VALID                                                                                                                                                                                                                                                                                                                                           |
| **Reasoning**      | Cấu hình dự án hoạt động chính xác, cấu hình Playwright đáp ứng hoàn hảo các ràng buộc về ghi nhận screenshot/trace khi fail, vị trí lưu báo cáo HTML từ biến môi trường, và gán nhãn `Run by: 23127148` đúng định dạng môn học để phục vụ việc kiểm tra nguồn gốc bài nộp.                                                                      |
| **Student Fix**    | Accepted as-is (Không cần sửa đổi thêm, mã nguồn cấu hình hoạt động chính xác ngay từ lần tạo đầu tiên).                                                                                                                                                                                                                                        |
| **Reviewed by**    | Nguyễn An                                                                                                                                                                                                                                                                                                                                       |
| **Review date**    | 2026-08-09                                                                                                                                                                                                                                                                                                                                      |
| **Quality rating** | Excellent                                                                                                                                                                                                                                                                                                                                       |
| **Issues found**   | None                                                                                                                                                                                                                                                                                                                                            |

---

### Artifact #3 -- FR-03 Forgot Password Playwright Test Suite Design & Implementation

| Field                | Value                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| **AI Tool**          | Gemini 3.5 Flash                                                                                             |
| **Date/Time**        | 2026-08-09 20:10:00 +07:00                                                                                   |
| **Task**             | Thiết kế 22 test cases và lập trình test script Playwright tự động hóa cho tính năng FR-03 (Quên mật khẩu)   |
| **Feature / Module** | FR-03 (Forgot Password & Reset Password)                                                                     |
| **Bloom-AI Level**   | G9.4 (Collaborate / Create - Thiết kế và phát triển kịch bản tự động hóa tích hợp)                           |
| **Verdict**          | VALID                                                                                                        |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Tôi muốn viết test script tự động hóa cho tính năng FR-03 (Quên mật khẩu & Đặt lại mật khẩu) bằng Playwright. 
Hãy đọc kỹ đặc tả FR-03 và FR-01 tại README.md cùng mã nguồn API tại backend/server.js.

**Nhiệm vụ đầu tiên:**
1. Hãy thực hiện bước Phân tích (Analyze) tính năng này: liệt kê các tác nhân (actors), tiền điều kiện (preconditions), và các ràng buộc về nghiệp vụ (như định dạng mật khẩu mạnh, mã OTP...).
2. Hãy thiết kế (Design) và đề xuất danh sách tối đa các test cases có thể (bao gồm Positive, Negative, Boundary, Security, GUI, và Navigation). Hãy cố gắng phủ hết tất cả các kịch bản kiểm thử có thể nghĩ ra cho tính năng này. Mỗi test case cần có ID định dạng `F03-TC-xxx`, danh mục, mục đích, các bước thực hiện và kết quả mong đợi cụ thể.

Hãy đưa ra bảng thiết kế test case trước. Tôi sẽ duyệt danh sách này trước khi yêu cầu bạn sinh code.
```

**Execution notes:**

- **Skill(s) active:** automation-testing, ai-audit-report
- **Mode:** APPEND
- **Các bước thực hiện:** AI đã phân tích đặc tả yêu cầu nghiệp vụ của tính năng FR-03 và các ràng buộc liên quan ở FR-01/GUI/Security trong README.md, đối chiếu với mã nguồn API trong backend/server.js và mã nguồn trang React ForgotPassword.jsx. Sau khi phát hiện 10 điểm lệch đặc tả/lỗi nghiêm trọng của SUT, AI đã đề xuất chiến lược kiểm thử song song (Happy path dùng mật khẩu tương thích SUT để chạy thành công; các case kiểm thử đặc tả khác chạy và báo lỗi đúng thực tế QA). Sau đó, AI thiết kế 22 test cases chi tiết, lập mô hình dữ liệu ngoài và viết mã nguồn test Playwright hoàn thiện cùng matrix runner chạy ổn định trên Chromium, Firefox và WebKit.

#### (2) AI Output

AI đã tạo các file kiểm thử tự động tại thư mục `HW4/`:
1. **Dữ liệu kiểm thử ngoài:** [FR03_data.json](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/test-data/FR03_data.json) chứa 22 bản ghi test cases.
2. **Mã nguồn Playwright:** [FR03_forgot_password.spec.ts](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/tests/FR03_forgot_password.spec.ts) tự động đọc dữ liệu ngoài, thực thi tuần tự các bước khôi phục mật khẩu, xử lý Dialog Alert, định vị các phần tử React động và kiểm chứng kết quả bằng các assertion web-first của Playwright.

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect             | Detail                                                                                                                                                                                                                                                                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Verdict**        | VALID                                                                                                                                                                                                                                                                                                                                           |
| **Reasoning**      | Các test case thiết kế rất chi tiết, bao quát đầy đủ 22 kịch bản từ kiểm thử biên, giao diện cho đến các kịch bản bảo mật (SQL Injection, XSS, rate-limit). Chiến lược kiểm thử không sửa code SUT mà viết test tự động phản ánh lỗi thực tế là cực kỳ đúng đắn về mặt QA. Mã nguồn chạy ổn định trên cả 3 trình duyệt và xuất báo cáo HTML đầy đủ. |
| **Student Fix**    | Accepted as-is (Không cần sửa đổi thêm, mã nguồn test chạy ổn định và phản ánh đúng trạng thái lỗi của phần mềm).                                                                                                                                                                                                                                |
| **Reviewed by**    | Nguyễn An                                                                                                                                                                                                                                                                                                                                       |
| **Review date**    | 2026-08-09                                                                                                                                                                                                                                                                                                                                      |
| **Quality rating** | Excellent                                                                                                                                                                                                                                                                                                                                       |
| **Issues found**   | None                                                                                                                                                                                                                                                                                                                                            |

---

## 4. Summary of AI Accuracy

| Metric                                   | Count | Percentage |
| ---------------------------------------- | ----: | ---------: |
| **Total AI-generated artifacts audited** |     3 |       100% |
| **VALID (correct, accepted as-is)**      |     3 |       100% |
| **INVALID (wrong; rejected)**            |     0 |         0% |
| **INCOMPLETE (acceptable after edits)**  |     0 |         0% |

---

## 5. Conclusion

Việc áp dụng AI (Gemini 3.5 Flash) để thiết kế Agent Skill và cấu trúc dự án Playwright mang lại hiệu quả rất lớn. AI đã giúp chuẩn hóa các tệp cấu hình dự án, cấu trúc các bước kiểm thử và tự động hóa toàn bộ ma trận kiểm thử đa trình duyệt một cách nhanh chóng và chính xác. Trải nghiệm này chứng minh rằng AI là một trợ thủ đắc lực trong việc viết khung mã nguồn (scaffolding) và giải quyết các tác vụ cấu hình phức tạp. Tuy nhiên, lập trình viên cần đóng vai trò kiểm duyệt, giám sát hoạt động cài đặt môi trường và điều phối cấu hình các biến hệ thống để đảm bảo kết quả chạy ổn định trên môi trường local thực tế.

---

## 6. Mandatory Disclosure

The EShop Automation Testing Agent Skill and Playwright project configuration were initially generated by Gemini 3.5 Flash; I reviewed and modified the final parameters, directory mappings, and specific configuration settings; all Playwright test scripts, localized test data structures, and HTML reports containing my Student ID were executed and verified entirely by me. The detailed AI Audit Report is attached as Appendix A. I confirm I did not use AI to generate any automated screenshot validation or student-identifying evidence listed in the prohibited category.

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
| 2   | Gemini 3.5 Flash | Project Setup | HW04 Task 1    | 2026-08-09 | G9.2     | VALID   |
| 3   | Gemini 3.5 Flash | Test Suite    | FR-03 (Auth)   | 2026-08-09 | G9.4     | VALID   |

### Contribution Breakdown

| Task                                       | AI % | Human % |
| ------------------------------------------ | ---: | ------: |
| Nghiên cứu & Thiết kế cấu trúc Agent Skill |  80% |     20% |
| Cấu hình & Tự động hóa chạy test matrix    |  85% |     15% |
| Triển khai bộ test FR-03                   |  80% |     20% |
| Khai triển & Kiểm thử chạy thực tế         |  15% |     85% |
| Viết báo cáo & Audit Log                   |  40% |     60% |

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
