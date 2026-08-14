# AI Audit Report -- HW05 Performance Testing

## 1. Student Information

| Field                      | Value                                               |
| -------------------------- | --------------------------------------------------- |
| **Student name (printed)** | Ân Tiến Nguyên An                                   |
| **Student ID**             | 23127148                                            |
| **Class / Cohort**         | 23CLC08                                             |
| **Assignment ID**          | HW05-AI (Performance Testing)                       |
| **Assignment date**        | 2026-08-14                                          |
| **AI tool(s) used**        | Antigravity IDE (Gemini 3.7 Flash, Claude Opus 4.6) |
| **AI used?**               | Yes                                                 |

---

## 2. Instructions

- Mỗi dòng trong bảng kiểm toán tương ứng với **một artifact do AI hỗ trợ sinh ra** (một phiên prompt-response hoàn chỉnh).
- Prompt được lưu **nguyên văn (verbatim)**, không viết lại hay diễn giải lại.
- Mỗi kết quả đều trải qua quy trình **Human Review** nghiêm ngặt bởi sinh viên và được gán nhãn thẩm định: `VALID` (chấp nhận nguyên vẹn), `INVALID` (loại bỏ hoàn toàn), hoặc `INCOMPLETE` (chấp nhận sau khi sinh viên chỉnh sửa, bổ sung).
- Các lý do thẩm định (Reasoning) được đối chiếu trực tiếp với đặc tả đề bài HW05, tài liệu chuẩn ISTQB Foundation Level và bài giảng kiểm thử hiệu năng.

---

## 3. Audit Table

| Prompt + Tool                                                                                                                                                                                       | AI Output                                                                                                                        |    Verdict     | Reasoning (ISTQB / Course)                                                                                                                                                                                   | Student Fix                                                                                                                                                                                                                        |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- | :------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tool:** Antigravity IDE<br>**Time:** 22:55 14/08/2026<br>**Prompt:** `"Quên mất trước tiên tới bước tạo agent skills trước, rồi mới tạo folder structure... ý là đừng nên nhắc tên HW5 kiểu vậy"` | Sinh tệp Agent Skill `performance-testing` tại `.agents/skills/performance-testing/` kèm tài liệu tham chiếu `workload-model.md` | **INCOMPLETE** | **ISTQB FL 4.0 - Test Automation / HW05 Section 7:** Agent Skill cần đạt tính tổng quát (reusable) cho nhiều phân hệ khác nhau trong tương lai, không được bị bó hẹp hay gắn cứng vào một mã bài tập cụ thể. | Sinh viên đã chỉ ra lỗi hardcode `HW5/` và mã sinh viên, yêu cầu AI tái cấu trúc tham số hóa thành `{OUTPUT_DIR}`, `{StudentID}`, chuẩn hóa cấu trúc báo cáo kỹ thuật tiêu chuẩn.                                                  |
| **Tool:** Antigravity IDE<br>**Time:** 22:33 14/08/2026<br>**Prompt:** `"Giờ viết cho tôi plan thật kỹ đi để tôi làm step by step... Nguyen An Admin — quản lý danh mục & sản phẩm..."`             | Sinh kế hoạch thực hiện chi tiết 8 giai đoạn và bộ 8 prompt tuần tự `hw05_prompts.md` cho vai trò Admin                          | **INCOMPLETE** | **HW05 Section 5 (Scope - Endpoint Selection):** Yêu cầu đảm bảo kịch bản kiểm thử không bị trùng lặp giữa các thành viên trong nhóm và phải bao phủ đầy đủ 3 nhóm endpoint (Auth, Read, Transactional).     | Sinh viên đã cập nhật lại đúng phân công vai trò Admin (danh mục & sản phẩm) kèm lý giải đối chiếu rõ ràng với thành viên Khoa Nguyen (Admin đơn hàng/user), yêu cầu AI cập nhật lại toàn bộ 8 prompt theo workflow API chính xác. |

---

### Artifact #1 -- Performance Testing Agent Skill & Workload Model Reference

| Field                | Value                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------- |
| **AI Tool**          | Antigravity IDE (Gemini 3.7 Flash / Claude Opus 4.6)                                    |
| **Date/Time**        | 2026-08-14 22:55:00 +07:00                                                              |
| **Task**             | Thiết kế Agent Skill cho quy trình Performance Testing & Log Analysis với Apache JMeter |
| **Feature / Module** | HW05 Section 7 (Agent Skill)                                                            |
| **Bloom-AI Level**   | G9.4 (Collaborate / Create - Xây dựng kỹ năng Agent đa bước có khả năng tái sử dụng)    |
| **Verdict**          | INCOMPLETE                                                                              |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Quên mất trước tiên tới bước tạo agent skills trước, rồi mới tạo folder structure

7. Agent Skill
You are encouraged to build an Agent Skill that applies this performance
testing and log-analysis workflow, so that it can be reused on additional
endpoints in future testing tasks.
Submit the skill together with a demonstration video YouTube link) that
shows, end to end, how you used the skill on a complete endpoint group.

Skill chỉ nên focus vào scope này đúng không
ý là đừng nên nhắc tên HW5 kiểu vậy
```

**Execution notes:**

- **Skill(s) active:** ai-audit-report, agy-customizations
- **Mode:** GENERATE & REFACTOR
- **Các bước thực hiện:** AI đã phân tích tài liệu seminar và slide kiểm thử hiệu năng, tạo cấu trúc thư mục skill tại `.agents/skills/performance-testing/` bao gồm hướng dẫn 8 bước (Thu thập workflow, Sinh kịch bản JMX, Chạy non-GUI CLI, Thu thập bằng chứng, Phân tích log `.jtl` và Sinh báo cáo). Sau phản hồi của sinh viên, AI đã gỡ bỏ hoàn toàn các liên kết cứng với HW05 để đạt tính tái sử dụng tuyệt đối.

#### (2) AI Output

AI đã tạo ra 2 tệp cấu trúc hoàn chỉnh cho Agent Skill:

1. **File định nghĩa Skill:** [.agents/skills/performance-testing/SKILL.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/performance-testing/SKILL.md)
   - Định nghĩa quy trình 8 bước chuẩn kỹ nghệ kiểm thử hiệu năng: Pre-requisites check (Java, JMeter, Custom Thread Groups) $\rightarrow$ Thu thập thông tin $\rightarrow$ Sinh 3 test plan (Load, Stress, Spike) $\rightarrow$ Smoke test $\rightarrow$ Chạy CLI $\rightarrow$ Thu thập hardware/Task Manager evidence $\rightarrow$ Đọc tệp log `.jtl` tính toán Percentiles (p50, p90, p95, p99), Throughput, Error Rate $\rightarrow$ Xuất báo cáo kỹ thuật.
2. **File tài liệu tham chiếu:** [.agents/skills/performance-testing/references/workload-model.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/performance-testing/references/workload-model.md)
   - Cung cấp bản đồ toàn bộ API endpoints của EShop SUT (User Flow & Admin Flow), dữ liệu seed mẫu, mô hình phân bổ tải giao dịch (Transaction Distribution: 60/25/10/5%), thời gian nghỉ (Think Time) và cấu hình chi tiết cho các kịch bản kiểm thử.

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect             | Detail                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Verdict**        | **INCOMPLETE**                                                                                                                                                                                                                                                                                                                                                                    |
| **Reasoning**      | Bản dự thảo đầu tiên của AI tuy đầy đủ về mặt kỹ thuật nhưng bị vi phạm tính tổng quát do hardcode tên thư mục `HW5/`, mã số sinh viên `23127148` và các tiêu đề bài tập học thuật (Task 1, Task 2, Task 3) vào trong mẫu báo cáo của Skill. Điều này khiến Skill không thể tái sử dụng trực tiếp cho các dự án/module khác trong tương lai theo đúng tinh thần Mục 7 của đề bài. |
| **Student Fix**    | Sinh viên đã yêu cầu AI tái cấu trúc toàn diện: (1) Tham số hóa đường dẫn thành `{OUTPUT_DIR}` và `{StudentID}`; (2) Loại bỏ các nhãn Task bài tập và chuẩn hóa Bước 8 thành mẫu báo cáo kỹ thuật công nghiệp (**Performance Testing & Log Analysis Report**); (3) Chuẩn hóa chỉ dẫn Git commit theo quy tắc Conventional Commits.                                                |
| **Reviewed by**    | Ân Tiến Nguyên An                                                                                                                                                                                                                                                                                                                                                                 |
| **Review date**    | 2026-08-14                                                                                                                                                                                                                                                                                                                                                                        |
| **Quality rating** | Excellent (Sau khi hoàn thiện sửa đổi)                                                                                                                                                                                                                                                                                                                                            |
| **Issues found**   | Hardcoded homework labels and specific output directory paths (Đã khắc phục hoàn toàn).                                                                                                                                                                                                                                                                                           |

---

### Artifact #2 -- HW05 Performance Testing Implementation Plan & Step-by-Step Prompts

| Field                | Value                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| **AI Tool**          | Antigravity IDE (Gemini 3.7 Flash / Claude Opus 4.6)                                                  |
| **Date/Time**        | 2026-08-14 22:38:00 +07:00                                                                            |
| **Task**             | Lập kế hoạch chi tiết 8 giai đoạn thực hiện HW05 và bộ 8 prompt tuần tự cho quy trình AI Audit Report |
| **Feature / Module** | HW05 Section 5 & 6 (Scope & Requirements)                                                             |
| **Bloom-AI Level**   | G9.3 (Analyse / Plan - Phân tích kiến trúc hệ thống và xây dựng chiến lược kiểm thử hiệu năng)        |
| **Verdict**          | INCOMPLETE                                                                                            |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Giờ viết cho tôi plan thật kỹ đi để tôi làm step by step

Nguyen An	Admin — quản lý danh mục & sản phẩm	POST /api/login (tài khoản admin)	GET /api/products → GET /api/coupons	POST /api/categories → PUT /api/categories/:id (id lấy động từ bước tạo) → POST /api/admin/import-products	6	1
Tôi quên nói bạn đây là luồng và 3 API tôi sẽ sử dụng

Vì có 1 bạn trong nhóm cũng sẽ làm với luồng admin nên là tôi cần bạn thêm giải thích lý do là mục tiêu không trùng với nhóm là chính
```

**Execution notes:**

- **Skill(s) active:** ai-audit-report
- **Mode:** GENERATE & UPDATE
- **Các bước thực hiện:** AI đã phân tích mã nguồn `backend/server.js` và `backend/database.js` để xác minh chính xác các endpoint, cấu trúc request/response, cơ chế bảo mật JWT và lỗi tài khoản lockout 3-fail (`login_attempts += 2`). Từ đó lập kế hoạch tổng thể và bộ prompt tuần tự sẵn sàng cho phiên làm việc tiếp theo.

#### (2) AI Output

AI đã tạo ra 2 tài liệu chiến lược:

1. **Kế hoạch triển khai:** `implementation_plan.md`
   - Phân tích chi tiết 8 giai đoạn: Chuẩn bị môi trường $\rightarrow$ Thiết kế 3 test plan JMX $\rightarrow$ Thực thi CLI & Evidence $\rightarrow$ Phê bình AI (Task 2) $\rightarrow$ Đề xuất Continuous Testing (Task 3) $\rightarrow$ Xây dựng Agent Skill $\rightarrow$ Quay Video Demo $\rightarrow$ Báo cáo tổng kết & Đóng gói.
2. **Bộ prompt tuần tự:** `hw05_prompts.md`
   - Bộ 8 prompt độc lập, tự chứa đầy đủ ngữ cảnh cho từng bước thực thi trong các conversation mới, tích hợp cơ chế trích xuất ID động cho `POST /api/categories` $\rightarrow$ `PUT /api/categories/:id`, bộ dữ liệu CSV và phần lý giải tính duy nhất của workflow so với các thành viên khác trong nhóm.

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect             | Detail                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Verdict**        | **INCOMPLETE**                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Reasoning**      | Ban đầu AI thiết lập kế hoạch dựa trên luồng mua hàng thông thường của người dùng (Customer Flow). Sinh viên đã can thiệp để định hướng lại chính xác theo phân công nhóm của mình: vai trò **Admin — Quản lý danh mục & sản phẩm** (`POST /api/categories`, `PUT /api/categories/:id`, `POST /api/admin/import-products`), đồng thời yêu cầu bổ sung luận cứ bảo vệ việc không trùng lặp phạm vi với thành viên khác cùng dùng quyền Admin (Khoa Nguyen - quản lý đơn hàng/user). |
| **Student Fix**    | Cập nhật lại toàn bộ 8 prompt: Chuyển đổi tài khoản đăng nhập sang `admin@eshop.com` / `Admin123!`, bổ sung cấu hình trích xuất ID động (`JSONPostProcessor` cho `categoryId`), thiết lập dữ liệu `categories.csv` và `products.csv` phục vụ kiểm thử import, và bổ sung bảng đối chiếu phân biệt workflow rõ ràng.                                                                                                                                                                |
| **Reviewed by**    | Ân Tiến Nguyên An                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Review date**    | 2026-08-14                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Quality rating** | Excellent (Sau khi cập nhật đầy đủ thông tin phân công)                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Issues found**   | Khác biệt luồng nghiệp vụ so với phân công nhóm thực tế (Đã cập nhật chuẩn xác).                                                                                                                                                                                                                                                                                                                                                                                                   |

---

## 4. Accuracy Summary & Contribution Breakdown

### Thống kê thẩm định chất lượng (Verdict Breakdown)

|    Verdict     | Số lượng | Tỷ lệ (%) | Ý nghĩa đánh giá                                                                |
| :------------: | :------: | :-------: | :------------------------------------------------------------------------------ |
|   **VALID**    |    0     |   0.0%    | Chấp nhận nguyên vẹn không cần chỉnh sửa                                        |
| **INCOMPLETE** |    2     |  100.0%   | Sử dụng bản thảo AI và hoàn thiện qua rà soát của sinh viên (Human-in-the-loop) |
|  **INVALID**   |    0     |   0.0%    | Loại bỏ hoàn toàn do sai lệch bản chất                                          |
| **TỔNG CỘNG**  |  **2**   | **100%**  | **100% các artifact đều được kiểm duyệt và hiệu chỉnh nghiêm ngặt**             |

### Đánh giá đóng góp (Contribution Breakdown)

- **AI đóng góp (Drafting & Scaffolding):** ~45% (Hỗ trợ cấu trúc định dạng chuẩn, tổng hợp nhanh API map từ mã nguồn, tạo khung tài liệu kỹ thuật).
- **Sinh viên đóng góp (Human Oversight & Domain Alignment):** ~55% (Định hình phạm vi workflow thực tế, phát hiện và khử hardcode để đảm bảo tính tái sử dụng của Agent Skill, đối soát chống trùng lặp kịch bản trong nhóm, kiểm soát tính đúng đắn của tham số kỹ thuật).

---

## 5. Mandatory AI Disclosure & Compliance Checklist

### Checklist tuân thủ quy chế AI

- [x] Đã khai báo đầy đủ tên công cụ AI và phiên bản sử dụng.
- [x] Đã lưu trữ nguyên văn (verbatim) 100% prompt đầu vào, không tóm tắt hay viết lại.
- [x] 100% kết quả đầu ra của AI đều có kết luận thẩm định (`VALID` / `INCOMPLETE` / `INVALID`) kèm lý do đối chiếu học thuật.
- [x] Tất cả các chỉnh sửa của sinh viên (`Student Fix`) đều được ghi nhận chi tiết, minh bạch.
- [x] Kịch bản kiểm thử hiệu năng và Agent Skill phản ánh kết quả làm việc thực tế, không ngụy tạo dữ liệu.

### Tuyên bố bắt buộc (Mandatory Disclosure)

> _"Tôi xin cam đoan đã ghi nhận đầy đủ, trung thực toàn bộ quá trình sử dụng các công cụ AI hỗ trợ trong quá trình thực hiện bài tập này. Tất cả các nội dung do AI đề xuất đều đã được tôi rà soát, kiểm tra độc lập và chịu hoàn toàn trách nhiệm về tính chính xác kỹ thuật của sản phẩm cuối cùng."_

**Chữ ký sinh viên:**  
_Ân Tiến Nguyên An_ (MSSV: 23127148)
