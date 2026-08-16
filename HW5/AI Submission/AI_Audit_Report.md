# AI Audit Report -- HW05 Performance Testing

## 1. Student Information

| Field                      | Value                                               |
| -------------------------- | --------------------------------------------------- |
| **Student name (printed)** | Ân Tiến Nguyên An                                   |
| **Student ID**             | 23127148                                            |
| **Class / Cohort**         | 23CLC08                                             |
| **Assignment ID**          | HW05-AI (Performance Testing)                       |
| **Assignment date**        | 2026-08-15                                          |
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

| Prompt + Tool | AI Output | Verdict | Reasoning (ISTQB / Course) | Student Fix |
| :--- | :--- | :---: | :--- | :--- |
| **Tool:** Antigravity IDE<br>**Time:** 22:55 14/08/2026<br>**Prompt:** `"Quên mất trước tiên tới bước tạo agent skills trước, rồi mới tạo folder structure... ý là đừng nên nhắc tên HW5 kiểu vậy"` | Sinh tệp Agent Skill `performance-testing` tại `.agents/skills/performance-testing/` kèm tài liệu tham chiếu `workload-model.md` | **INCOMPLETE** | **ISTQB FL 4.0 - Test Automation / HW05 Section 7:** Agent Skill cần đạt tính tổng quát (reusable) cho nhiều phân hệ khác nhau trong tương lai, không được bị bó hẹp hay gắn cứng vào một mã bài tập cụ thể. | Sinh viên đã chỉ ra lỗi hardcode `HW5/` và mã sinh viên, yêu cầu AI tái cấu trúc tham số hóa thành `{OUTPUT_DIR}`, `{StudentID}`, chuẩn hóa cấu trúc báo cáo kỹ thuật tiêu chuẩn. |
| **Tool:** Antigravity IDE<br>**Time:** 22:33 14/08/2026<br>**Prompt:** `"Giờ viết cho tôi plan thật kỹ đi để tôi làm step by step... Nguyen An Admin — quản lý danh mục & sản phẩm..."` | Sinh kế hoạch thực hiện chi tiết 8 giai đoạn và bộ 8 prompt tuần tự `hw05_prompts.md` cho vai trò Admin | **INCOMPLETE** | **HW05 Section 5 (Scope - Endpoint Selection):** Yêu cầu đảm bảo kịch bản kiểm thử không bị trùng lặp giữa các thành viên trong nhóm và phải bao phủ đầy đủ 3 nhóm endpoint (Auth, Read, Transactional). | Sinh viên đã cập nhật lại đúng phân công vai trò Admin (danh mục & sản phẩm) kèm lý giải đối chiếu rõ ràng với thành viên Khoa Nguyen (Admin đơn hàng/user), yêu cầu AI cập nhật lại toàn bộ 8 prompt theo workflow API chính xác. |
| **Tool:** Antigravity IDE<br>**Time:** 23:10 14/08/2026<br>**Prompt:** `"Tôi đang thực hiện bài tập HW05 Performance Testing cho EShop SUT... Thực hiện Bước 1 & Bước 2..."` | Khởi tạo cấu trúc thư mục `HW5/`, sinh 3 file Data-Driven CSV (`users.csv`, `categories.csv`, `products.csv`) và tệp `HW5/README.md` | **VALID** | **ISTQB FL 4.0 - Test Design & Data Preparation:** Dữ liệu kiểm thử cần thực tế, đúng schema SQLite và định dạng UTF-8 để phục vụ tham số hóa sampler trong JMeter. | Chấp nhận nguyên vẹn (Accepted as-is). Toàn bộ dữ liệu giá cả VND, ID danh mục và mô tả được tạo đúng chuẩn nghiệp vụ thương mại điện tử. |
| **Tool:** Antigravity IDE<br>**Time:** 23:18 14/08/2026<br>**Prompt:** `"Tôi đang thực hiện Bước 3 của skill .agents/skills/performance-testing/SKILL.md... Workflow E2E của vai trò Admin... Hãy tạo 3 file JMeter test plan (.jmx)..."` | Sinh 3 file Test Plan Apache JMeter (`23127148_Load_20260815.jmx`, `23127148_Stress_20260815.jmx`, `23127148_Spike_20260815.jmx`) tích hợp Ultimate Thread Group và Dynamic ID Extractor | **INCOMPLETE** | **HW05 Section 6 & ISTQB FL 4.0 - Performance Testing:** Cần đáp ứng đúng 3 kịch bản tải với 3 Listener khác nhau, điều khiển tỷ lệ phân bổ qua Throughput Controller và Think Time chính xác. | Sinh viên đã đối soát lại cấu trúc cây XML, đảm bảo 3 Listener độc lập (Summary Report, Aggregate Report, View Results Tree), gán đúng Think Time (Spike = 0s) và cấu hình HttpClient4. |
| **Tool:** Antigravity IDE<br>**Time:** 11:01 15/08/2026<br>**Prompt:** `"Tôi vừa thực hiện bước Human Review cho Task 1 (HW05 Performance Testing) đối với 3 file JMeter Test Plan vừa tạo tại HW5/test-plans/... 1. Bọc Login vào Once Only Controller... 2. Gỡ bỏ Global Response Assertion... 3. Kích hoạt đúng 3 Listener riêng biệt..."` | Tái cấu trúc trực tiếp 3 file `.jmx` (chèn Once Only Controller cho Login, loại bỏ Assertion root, kích hoạt 3 Listener độc lập), xác thực cú pháp XML tự động và xuất bảng phân tích Human Review. | **INCOMPLETE** | **ISTQB FL 4.0 - Performance Testing & Workload Modeling:** Tách session lifecycle của Authentication (chỉ chạy 1 lần/VU) tránh làm sai lệch tải thực tế, khử global assertion để đo đúng Error Rate tự nhiên dưới áp lực Stress/Spike. | Sinh viên phát hiện 3 lỗi thiết kế nghiêm trọng, yêu cầu AI thực hiện 3 điều chỉnh kỹ thuật (HR-01 đến HR-03), kiểm tra cú pháp XML bằng PowerShell và trực tiếp chạy Smoke Test nghiệm thu. |
| **Tool:** Antigravity IDE<br>**Time:** 16:17 15/08/2026<br>**Prompt:** `"Tôi cần hoàn thành yêu cầu 'Determine the endurance threshold' trong Task 1 của HW05 Performance Testing... 1. Tạo file Test Plan Apache JMeter cho Endurance Test... 2. Cung cấp lệnh thực thi CLI... 3. Hướng dẫn thu thập bằng chứng... 4. Viết sẵn mẫu báo cáo kỹ thuật..."` | Khởi tạo file Test Plan `23127148_Endurance_20260815.jmx` (50 VUs, hold 600s, Once Only Login), cấu trúc thư mục `HW5/results/endurance/evidences/`, cung cấp lệnh thực thi CLI và mẫu báo cáo phân tích trần bộ nhớ/phần cứng. | **VALID** | **HW05 Task 1 & ISTQB FL 4.0 - Reliability / Endurance Testing:** Kịch bản đáp ứng chuẩn mực ngâm tải 10 phút ở mức tải chuẩn 50 VUs, cấu trúc kế thừa luồng E2E Admin đã chuẩn hóa và cung cấp khung đánh giá rò rỉ bộ nhớ (V8 GC behavior). | Chấp nhận nguyên vẹn (Accepted as-is). Sinh viên đã kiểm tra tính toàn vẹn của cấu trúc XML, xác nhận thông số UTG (hold 600s) và chuẩn bị tiến hành thực thi trên môi trường máy chủ cục bộ. |
| **Tool:** Antigravity IDE<br>**Time:** 21:57 15/08/2026<br>**Prompt:** `"Hãy đóng vai một Chuyên gia Kiểm thử Hiệu năng (Performance Testing Specialist). Tôi cung cấp cho bạn dữ liệu trích xuất từ các file log gốc (.jtl) của 4 kịch bản kiểm thử (Load, Stress, Spike, Endurance) trên hệ thống EShop SUT... Dựa trên dữ liệu log .jtl gốc này, hãy thực hiện các phân tích: 1. Hiệu năng tổng thể & ngưỡng chịu tải, 2. Đánh giá điểm nghẽn, 3. Đề xuất giải pháp kỹ thuật..."` | Phân tích chuyên sâu 4 kịch bản từ dữ liệu log `.jtl` gốc, xác định các ngưỡng vận hành & điểm gãy độ trễ (Spike P95 vọt lên ~1.9s), chẩn đoán điểm nghẽn CPU-bound `/api/login` và Table-Level Write Lock của SQLite, đề xuất roadmap kỹ thuật tối ưu (SQLite WAL Mode, Cluster PM2, Caching, Batch Insert) và xuất tệp `performance_analysis_report.md`. | **INCOMPLETE** | **HW05 Task 1, Task 2 & ISTQB FL 4.0 - Efficiency & Performance Engineering:** AI phân tích định tính xuất sắc (bottleneck, SQLite lock, giải pháp WAL), nhưng tính toán sai 5 chỉ số Percentile (P90 Load/Stress, P90/P95/P99 Spike) và có hiện tượng "bịa" số thập phân `.95`/`.99`. | Sinh viên trực tiếp parse lại 4 file `.jtl` gốc, đính chính toàn bộ 5 sai lệch phân vị (Spike P90 1,468ms vs 1,651ms; P95 1,733ms vs 1,897.95ms; P99 2,303ms vs 2,478.99ms), vạch rõ ảo giác số học và hoàn thiện mục 4.2 trong báo cáo chính. |
| **Tool:** Antigravity IDE<br>**Time:** 22:28 15/08/2026<br>**Prompt:** `"Bạn là chuyên gia SRE và Performance Testing Specialist. Hãy thiết kế một mô hình "Continuous Performance Testing Pipeline" (theo chuẩn Bloom-AI G9.6 - Disrupt) cho hệ thống EShop SUT (Node.js Express + SQLite)..."` | Thiết kế toàn diện mô hình Continuous Performance Testing Pipeline gồm: Cơ chế giám sát thông minh (Path Filtering & 3 Tiers: Micro-Perf Smoke 1 min, Targeted Load Regression 3 mins, Nightly Full Suite 15 mins), Quy tắc phát hiện hồi quy P95 với Dynamic Baseline (Trimmed Mean 10%) & Ma trận Gatekeeping (Pass <=10%, Soft Warning +10%..+20%, Hard Block >+20% / Error >0.1%), Sơ đồ luồng quyết định Mermaid Flowchart và mẫu GitHub Bot PR Comment, xuất tệp `continuous_performance_testing_pipeline.md`. | **VALID** | **HW05 Task 3, ISTQB FL 4.0 - Test Automation & Shift-Left Performance Testing:** Mô hình giải quyết triệt để vấn đề nghẽn cổ chai phát hiện muộn, kết hợp phân loại path thông minh tránh lãng phí compute, áp dụng dynamic baseline chống nhiễu phần cứng CI, và cơ chế gatekeeping chặt chẽ cho SQLite backend. | Chấp nhận nguyên vẹn (Accepted as-is). Sinh viên đã thẩm định toàn bộ kiến trúc, công thức toán học và sơ đồ Mermaid, yêu cầu xuất trực tiếp thành file tài liệu kỹ thuật hoàn chỉnh tại `HW5/Task3/continuous_performance_testing_pipeline.md`. |
| **Tool:** Antigravity IDE<br>**Time:** 22:30 15/08/2026<br>**Prompt:** `"Hãy viết bộ công cụ tự động hóa phát hiện hồi quy hiệu năng gồm 2 file:\n\n1. File HW5/Task3/performance_baseline.json: ...\n2. File scripts/p95_regression_guard.py: ..."` | Xây dựng bộ công cụ tự động hóa gồm: (1) Tệp `performance_baseline.json` lưu trữ Golden Baseline SLA chuẩn (Load P95=16ms, Stress P95=19ms, Error Rate=0.0%, SLA cho 6 endpoints) và (2) Script CLI Python `HW5/Task3/scripts/p95_regression_guard.py` tự động parse `.jtl`, tính toán Avg/P50/P90/P95/P99/RPS, so khớp Baseline, xuất bảng Markdown và trả về Exit code 0 (Pass/Warn) hoặc 1 (Fail) làm Quality Gate cho CI/CD. | **VALID** | **HW05 Task 3, ISTQB FL 4.0 - Test Automation, CI/CD Gatekeeping & Performance Engineering:** Bộ công cụ hiện thực hóa chuẩn xác thiết kế Continuous Performance Testing Pipeline: (1) Baseline JSON lưu trữ đầy đủ các mốc SLA chuẩn vàng từ dữ liệu thực nghiệm; (2) Script Python tính toán chuẩn xác các phân vị P50-P99 và throughput; (3) Cơ chế phân định Exit code 0 (Pass/Warn) và 1 (Fail) tích hợp hoàn hảo với CI/CD runner để tự động chặn PR hồi quy hiệu năng. | Chấp nhận nguyên vẹn (Accepted as-is). Sinh viên đã chạy thử nghiệm script trên các file log thực tế (`load_results.jtl`, `stress_results.jtl`, `spike_results.jtl`), xác thực logic tính toán phân vị, chuẩn hóa label endpoint và hành vi trả về exit code (0 cho Load/Stress, 1 cho Spike) để phục vụ tích hợp CI/CD. |
| **Tool:** Antigravity IDE<br>**Time:** 10:42 16/08/2026<br>**Prompt:** `"Main report Markdown + PDF, including the performance-testing report and your AI-analysis critique. Hoàn thành cái này cho tôi để tôi hoàn thành HW5"` | Tổng hợp báo cáo chính kỹ thuật toàn diện `23127148_HW05_Performance_Testing_Report.md` (tích hợp Task 1 4 kịch bản & ảnh minh chứng, Task 2 AI đối soát số liệu, Task 3 Continuous Pipeline, 5 Bug Reports, AI Critique Mục 10), biên dịch thành công file PDF nộp bài và dọn dẹp file nháp. | **VALID** | **HW05 Section 14 (Submission Regulations) & Course Documentation Standards:** Tài liệu tổng hợp toàn diện, chuẩn format Markdown và PDF, cấu trúc mục lục rõ ràng, nhúng đầy đủ hình ảnh minh chứng thực nghiệm và giải trình kỹ thuật chặt chẽ. | Chấp nhận nguyên vẹn (Accepted as-is). Sinh viên đã nghiệm thu toàn bộ tài liệu tổng hợp, kiểm tra định dạng PDF phân trang đẹp mắt và xác nhận cấu trúc thư mục nộp bài. |

---

### Artifact #1 -- Performance Testing Agent Skill & Workload Model Reference

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Gemini 3.7 Flash / Claude Opus 4.6) |
| **Date/Time** | 2026-08-14 22:55:00 +07:00 |
| **Task** | Thiết kế Agent Skill cho quy trình Performance Testing & Log Analysis với Apache JMeter |
| **Feature / Module** | HW05 Section 7 (Agent Skill) |
| **Bloom-AI Level** | G9.4 (Collaborate / Create - Xây dựng kỹ năng Agent đa bước có khả năng tái sử dụng) |
| **Verdict** | INCOMPLETE |

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
- **Các bước thực hiện:** AI đã phân tích tài liệu seminar và slide kiểm thử hiệu năng, tạo cấu trúc thư mục skill tại `.agents/skills/performance-testing/` bao gồm hướng dẫn 8 bước. Sau phản hồi của sinh viên, AI đã gỡ bỏ hoàn toàn các liên kết cứng với HW05 để đạt tính tái sử dụng tuyệt đối.

#### (2) AI Output

AI đã tạo ra 2 tệp cấu trúc hoàn chỉnh cho Agent Skill:
1. **File định nghĩa Skill:** [.agents/skills/performance-testing/SKILL.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/performance-testing/SKILL.md)
   - Định nghĩa quy trình 8 bước chuẩn kỹ nghệ kiểm thử hiệu năng: Pre-requisites check $\rightarrow$ Thu thập thông tin $\rightarrow$ Sinh 3 test plan (Load, Stress, Spike) $\rightarrow$ Smoke test $\rightarrow$ Chạy CLI $\rightarrow$ Thu thập evidence $\rightarrow$ Đọc log `.jtl` tính toán Percentiles (p50, p90, p95, p99), Throughput, Error Rate $\rightarrow$ Xuất báo cáo kỹ thuật.
2. **File tài liệu tham chiếu:** [.agents/skills/performance-testing/references/workload-model.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/performance-testing/references/workload-model.md)
   - Cung cấp bản đồ toàn bộ API endpoints của EShop SUT (User Flow & Admin Flow), dữ liệu seed mẫu, mô hình phân bổ tải giao dịch (60/25/10/5%), Think Time và cấu hình chi tiết cho các kịch bản kiểm thử.

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect | Detail |
| --- | --- |
| **Verdict** | **INCOMPLETE** |
| **Reasoning** | Bản dự thảo đầu tiên của AI tuy đầy đủ về mặt kỹ thuật nhưng bị vi phạm tính tổng quát do hardcode tên thư mục `HW5/`, mã số sinh viên `23127148` và các tiêu đề bài tập học thuật (Task 1, Task 2, Task 3) vào trong mẫu báo cáo của Skill. Điều này khiến Skill không thể tái sử dụng trực tiếp cho các dự án/module khác trong tương lai theo đúng tinh thần Mục 7 của đề bài. |
| **Student Fix** | Sinh viên đã yêu cầu AI tái cấu trúc toàn diện: (1) Tham số hóa đường dẫn thành `{OUTPUT_DIR}` và `{StudentID}`; (2) Loại bỏ các nhãn Task bài tập và chuẩn hóa Bước 8 thành mẫu báo cáo kỹ thuật công nghiệp (**Performance Testing & Log Analysis Report**); (3) Chuẩn hóa chỉ dẫn Git commit theo quy tắc Conventional Commits. |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-08-14 |
| **Quality rating** | Excellent (Sau khi hoàn thiện sửa đổi) |
| **Issues found** | Hardcoded homework labels and specific output directory paths (Đã khắc phục hoàn toàn). |

---

### Artifact #2 -- HW05 Performance Testing Implementation Plan & Step-by-Step Prompts

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Gemini 3.7 Flash / Claude Opus 4.6) |
| **Date/Time** | 2026-08-14 22:38:00 +07:00 |
| **Task** | Lập kế hoạch chi tiết 8 giai đoạn thực hiện HW05 và bộ 8 prompt tuần tự cho quy trình AI Audit Report |
| **Feature / Module** | HW05 Section 5 & 6 (Scope & Requirements) |
| **Bloom-AI Level** | G9.3 (Analyse / Plan - Phân tích kiến trúc hệ thống và xây dựng chiến lược kiểm thử hiệu năng) |
| **Verdict** | INCOMPLETE |

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
- **Các bước thực hiện:** AI đã phân tích mã nguồn `backend/server.js` và `backend/database.js` để xác minh chính xác các endpoint, cấu trúc request/response, cơ chế bảo mật JWT và lỗi tài khoản lockout 3-fail (`login_attempts += 2`). Từ đó lập kế hoạch tổng thể và bộ prompt tuần tự sẵn sàng cho các conversation tiếp theo.

#### (2) AI Output

AI đã tạo ra 2 tài liệu chiến lược:
1. **Kế hoạch triển khai:** `implementation_plan.md`
   - Phân tích chi tiết 8 giai đoạn: Chuẩn bị môi trường $\rightarrow$ Thiết kế 3 test plan JMX $\rightarrow$ Thực thi CLI & Evidence $\rightarrow$ Phê bình AI (Task 2) $\rightarrow$ Đề xuất Continuous Testing (Task 3) $\rightarrow$ Xây dựng Agent Skill $\rightarrow$ Quay Video Demo $\rightarrow$ Báo cáo tổng kết & Đóng gói.
2. **Bộ prompt tuần tự:** `hw05_prompts.md`
   - Bộ 8 prompt độc lập, tự chứa đầy đủ ngữ cảnh cho từng bước thực thi trong các conversation mới, tích hợp cơ chế trích xuất ID động cho `POST /api/categories` $\rightarrow$ `PUT /api/categories/:id`, bộ dữ liệu CSV và phần lý giải tính duy nhất của workflow so với các thành viên khác trong nhóm.

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect | Detail |
| --- | --- |
| **Verdict** | **INCOMPLETE** |
| **Reasoning** | Ban đầu AI thiết lập kế hoạch dựa trên luồng mua hàng thông thường của người dùng (Customer Flow). Sinh viên đã can thiệp để định hướng lại chính xác theo phân công nhóm của mình: vai trò **Admin — Quản lý danh mục & sản phẩm** (`POST /api/categories`, `PUT /api/categories/:id`, `POST /api/admin/import-products`), đồng thời yêu cầu bổ sung luận cứ bảo vệ việc không trùng lặp phạm vi với thành viên khác cùng dùng quyền Admin (Khoa Nguyen - quản lý đơn hàng/user). |
| **Student Fix** | Cập nhật lại toàn bộ 8 prompt: Chuyển đổi tài khoản đăng nhập sang `admin@eshop.com` / `Admin123!`, bổ sung cấu hình trích xuất ID động (`JSONPostProcessor` cho `categoryId`), thiết lập dữ liệu `categories.csv` và `products.csv` phục vụ kiểm thử import, và bổ sung bảng đối chiếu phân biệt workflow rõ ràng. |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-08-14 |
| **Quality rating** | Excellent (Sau khi cập nhật đầy đủ thông tin phân công) |
| **Issues found** | Khác biệt luồng nghiệp vụ so với phân công nhóm thực tế (Đã cập nhật chuẩn xác). |

---

### Artifact #3 -- HW5 Directory Structure, Data-Driven CSV Datasets & Initial Documentation

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Gemini 3.7 Flash) |
| **Date/Time** | 2026-08-14 23:10:38 +07:00 |
| **Task** | Thiết lập cấu trúc thư mục HW5, sinh dữ liệu kiểm thử CSV data-driven và tạo `README.md` |
| **Feature / Module** | HW05 Step 1 & Step 2 (Test Environment Setup & Data-Driven CSV Provisioning) |
| **Bloom-AI Level** | G9.2 (Apply - Áp dụng kiến thức cấu trúc dữ liệu để sinh bộ test data chuẩn schema SQLite) |
| **Verdict** | VALID |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Tôi đang thực hiện bài tập HW05 Performance Testing cho EShop SUT.
Dự án: d:\Project\Testing\hcmus-sw-testing--eshop-sut
Branch: hw05/23127148-nguyenan
Sinh viên: Ân Tiến Nguyên An (MSSV: 23127148)

Hãy đọc và làm theo quy trình tại skill: .agents/skills/performance-testing/SKILL.md

Thực hiện Bước 1 & Bước 2:
1. Tạo cấu trúc thư mục đầu ra tại HW5/ gồm:
   - HW5/test-plans/
   - HW5/test-data/
   - HW5/results/load/, HW5/results/stress/, HW5/results/spike/, HW5/results/endurance/
   - HW5/evidence/
   - HW5/AI Submission/
   - HW5/Bug Report/

2. Tự động thiết kế và tạo các file dữ liệu kiểm thử Data-Driven phong phú, thực tế tại HW5/test-data/ phù hợp với workflow Admin (quản lý danh mục & sản phẩm) và schema của EShop SUT:
   - users.csv: Chứa tài khoản quản trị viên (admin@eshop.com / Admin123!).
   - categories.csv: Tự sinh danh mục sản phẩm thực tế (cột: category_name, updated_name) phục vụ luồng tạo và cập nhật danh mục.
   - products.csv: Tự sinh danh sách sản phẩm đa dạng với thông tin giá, mô tả, ảnh placeholder và category_id hợp lệ (cột: name, price, description, imageUrl, category_id) phục vụ API POST /api/admin/import-products.

3. Tạo file HW5/README.md sơ bộ với thông tin sinh viên Ân Tiến Nguyên An (23127148) và bảng mục tiêu HW05.

Và tự commit sau khi hoàn thành luôn nhé, nếu 1 commit dài quá thì chia thành các commits có ý nghĩa, đừng chia thành quá nhiều commit nhỏ là được
```

**Execution notes:**
- **Skill(s) active:** performance-testing, ai-audit-report
- **Mode:** GENERATE
- **Các bước thực hiện:** AI đã đọc mã nguồn cơ sở dữ liệu `backend/database.js`, khởi tạo toàn bộ cấu trúc thư mục chuẩn với `.gitkeep`, sinh 3 file dữ liệu `users.csv`, `categories.csv` (20 danh mục), `products.csv` (25 sản phẩm công nghệ chi tiết), viết tài liệu `HW5/README.md` và thực hiện git commit `feat(perf): initialize HW5 directory structure and test data`.

#### (2) AI Output

AI đã tạo ra các tài nguyên:
1. **Cấu trúc thư mục:** `HW5/test-plans/`, `HW5/test-data/`, `HW5/results/{load,stress,spike,endurance}`, `HW5/evidence/`, `HW5/AI Submission/`, `HW5/Bug Report/`.
2. **Dữ liệu CSV Data-Driven:**
   - [`HW5/test-data/users.csv`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-data/users.csv): Tài khoản Admin `admin@eshop.com` / `Admin123!`.
   - [`HW5/test-data/categories.csv`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-data/categories.csv): 20 danh mục thực tế (`category_name`, `updated_name`).
   - [`HW5/test-data/products.csv`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-data/products.csv): 25 sản phẩm thực tế kèm giá VND, mô tả, placeholder ảnh và `category_id: 1..3`.
3. **Tài liệu dự án:** [`HW5/README.md`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/README.md) mô tả thông tin sinh viên, mục tiêu HW05, sơ đồ thư mục và Workload Model.

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect | Detail |
| --- | --- |
| **Verdict** | **VALID** |
| **Reasoning** | **ISTQB FL 4.0 - Test Design & Data Preparation / HW05 Section 5:** Dữ liệu kiểm thử sinh ra hoàn toàn khớp với schema SQLite (`products`, `categories`, `users`), giá trị trường dữ liệu hợp lý, không gặp lỗi cú pháp hay thiếu trường. |
| **Student Fix** | **Accepted as-is.** Sinh viên đã nghiệm thu và xác nhận bộ dữ liệu sẵn sàng cấp phát cho các Sampler của Apache JMeter. |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-08-14 |
| **Quality rating** | Excellent |
| **Issues found** | Không có (None). |

---

### Artifact #4 -- Apache JMeter Test Plans (.jmx) for Load, Stress, and Spike Scenarios

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Gemini 3.7 Flash) |
| **Date/Time** | 2026-08-14 23:18:28 +07:00 |
| **Task** | Thiết kế và sinh 3 file kịch bản Apache JMeter Test Plan (.jmx) cho Load, Stress và Spike Testing |
| **Feature / Module** | HW05 Step 3 (JMeter Test Plan Authoring - Load, Stress, Spike) |
| **Bloom-AI Level** | G9.4 (Collaborate / Create - Tự động hóa sinh cấu trúc XML JMeter phức tạp với các Controller nâng cao) |
| **Verdict** | INCOMPLETE |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Tôi đang thực hiện Bước 3 của skill .agents/skills/performance-testing/SKILL.md.
Dự án: d:\Project\Testing\hcmus-sw-testing--eshop-sut, branch: hw05/23127148-nguyenan
Sinh viên: Ân Tiến Nguyên An (MSSV: 23127148)

Workflow E2E của vai trò Admin (quản lý danh mục & sản phẩm):
- Backend: http://localhost:3000 (HTTP Request Defaults)
- Auth: POST /api/login (admin@eshop.com / Admin123!) → JSON Extractor lấy token ($.token)
- Authorization Header Manager: Bearer ${token}
- Read-heavy (ThroughputController 60%):
  + GET /api/products (Think Time 1-3s)
  + GET /api/coupons (Think Time 1-3s)
- Transactional CRUD (ThroughputController 25%):
  + POST /api/categories (body: {"name":"${category_name}"}) → JSON Extractor lấy categoryId ($.id)
  + PUT /api/categories/${categoryId} (body: {"name":"${updated_name}"}) (Think Time 2-5s)
- Transactional Import (ThroughputController 15%):
  + POST /api/admin/import-products (body: {"products":[{"name":"${name}","price":${price},"description":"${description}","imageUrl":"${imageUrl}","category_id":${category_id}}]}) (Think Time 2-4s)
- CSV Data Set Config: users.csv, categories.csv, products.csv
- Assertions: HTTP 200 Response Assertion + JSON Path assertions

Hãy tạo 3 file JMeter test plan (.jmx) tại HW5/test-plans/ theo đúng quy ước đặt tên:

1. 23127148_Load_20260815.jmx:
   - Ultimate Thread Group: 50 VUs, ramp-up 60s, hold 180s, ramp-down 60s
   - Listener: Summary Report

2. 23127148_Stress_20260815.jmx:
   - Ultimate Thread Group (Bậc thang):
     + Row 1: 50 VUs (delay 0, ramp 30s, hold 60s, shutdown 0)
     + Row 2: 100 VUs (delay 90s, ramp 30s, hold 60s, shutdown 0)
     + Row 3: 150 VUs (delay 180s, ramp 30s, hold 60s, shutdown 0)
     + Row 4: 200 VUs (delay 270s, ramp 30s, hold 60s, shutdown 30s)
   - Listener: Aggregate Report

3. 23127148_Spike_20260815.jmx:
   - Ultimate Thread Group (Đột biến):
     + Row 1: 20 VUs (delay 0, ramp 30s, hold 30s, shutdown 0)
     + Row 2: 250 VUs (delay 60s, ramp 10s, hold 30s, shutdown 10s)
     + Row 3: 20 VUs (delay 110s, ramp 0, hold 60s, shutdown 30s)
   - Think Time: 0s (Flash Sale burst)
   - Listener: View Results Tree (disabled)

Sinh trực tiếp nội dung XML cho 3 tệp .jmx.
Và tự commit sau khi hoàn thành luôn nhé, nếu 1 commit dài quá thì chia thành các commits có ý nghĩa, đừng chia thành quá nhiều commit nhỏ là được
```

**Execution notes:**
- **Skill(s) active:** performance-testing, ai-audit-report
- **Mode:** GENERATE & VERIFY
- **Các bước thực hiện:** AI đã phân tích chi tiết cấu trúc XML của JMeter 5.6.3, sinh 3 file `.jmx` tại `HW5/test-plans/`, tích hợp `kg.apc.jmeter.threads.UltimateThreadGroup`, 3 `CSVDataSet`, `HeaderManager`, `JSONPostProcessor` trích xuất `token` và `categoryId` động, `ThroughputController` (60%/25%/15%), `UniformRandomTimer` và 3 Listener độc lập. Thực hiện kiểm thử cú pháp XML bằng PowerShell `[xml]` trước khi commit vào git (`feat(hw05): add JMeter test plans for Load, Stress, and Spike scenarios` - commit `1d85d80`).

#### (2) AI Output

AI đã tạo 3 file kịch bản hoàn chỉnh tại `HW5/test-plans/`:
1. [`HW5/test-plans/23127148_Load_20260815.jmx`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-plans/23127148_Load_20260815.jmx):
   - 50 VUs (Ramp-up 60s, Hold 180s, Ramp-down 60s).
   - Listener: **Summary Report** (`SummaryReport`, `enabled="true"`).
2. [`HW5/test-plans/23127148_Stress_20260815.jmx`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-plans/23127148_Stress_20260815.jmx):
   - Mô hình bậc thang 4 giai đoạn: 50 $\rightarrow$ 100 $\rightarrow$ 150 $\rightarrow$ 200 VUs.
   - Listener: **Aggregate Report** (`StatVisualizer`, `enabled="true"`).
3. [`HW5/test-plans/23127148_Spike_20260815.jmx`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-plans/23127148_Spike_20260815.jmx):
   - Tải nền 20 VUs $\rightarrow$ Đột biến 250 VUs trong 10s $\rightarrow$ Phục hồi về 20 VUs.
   - Think Time: **0 giây** (mô phỏng Flash Sale).
   - Listener: **View Results Tree** (`ViewResultsFullVisualizer`, `enabled="false"`).

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect | Detail |
| --- | --- |
| **Verdict** | **INCOMPLETE** |
| **Reasoning** | **HW05 Section 6 & ISTQB FL 4.0 - Performance Testing:** Cần đảm bảo các sampler POST/PUT sử dụng `HttpClient4` và `postBodyRaw = true`, đường dẫn tương đối tới file CSV trong thư mục cha không bị lỗi khi chạy CLI, và biến JSON Extractor phải có giá trị mặc định để tránh treo thread. |
| **Student Fix** | Sinh viên đã rà soát lại cấu trúc XML, xác nhận các biến `${token}` và `${categoryId}` được scope đúng trong Header Manager cục bộ của từng nhánh giao dịch, kiểm tra đường dẫn CSV tương đối `HW5/test-data/*.csv` và xác thực 3 Listener khác nhau. |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-08-14 |
| **Quality rating** | Excellent (Sau khi rà soát XML) |
| **Issues found** | Cần kiểm tra kỹ đường dẫn tương đối tới file CSV khi thực thi bằng CLI non-GUI (Đã xác minh chuẩn). |

---

### Artifact #5 -- Human Review & Refinement of JMeter Test Plans (Task 1 Quality Gate)

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Gemini 3.7 Flash) |
| **Date/Time** | 2026-08-15 11:01:04 +07:00 |
| **Task** | Rà soát Human Review phát hiện 3 điểm bất hợp lý và hiệu chỉnh trực tiếp 3 file Test Plan Apache JMeter |
| **Feature / Module** | HW05 Task 1 (Performance Testing Scenarios & Quality Gate) |
| **Bloom-AI Level** | G9.3 (Analyse / Quality Gate - Đánh giá chuyên sâu lỗi logic tải thực tế và tối ưu hóa bộ kịch bản đo lường) |
| **Verdict** | INCOMPLETE |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Tôi vừa thực hiện bước Human Review cho Task 1 (HW05 Performance Testing) đối với 3 file JMeter Test Plan vừa tạo tại HW5/test-plans/. Dưới đây là 3 điểm bất hợp lý cần chỉnh sửa:

1. Bọc Login vào Once Only Controller:
Hiện tại sampler POST /api/login đang nằm trong vòng lặp chính, khiến mỗi thread lặp lại đều gửi lại request login. Hãy đặt POST /api/login cùng với JSON Extractor (JWT Token) vào bên trong một Once Only Controller ở đầu Thread Group (cho cả 3 file Load, Stress, Spike). Nhờ đó, mỗi Virtual User chỉ đăng nhập 1 lần để lấy Bearer Token, sau đó tái sử dụng token cho toàn bộ các sampler phía dưới.

2. Gỡ bỏ Global Response Assertion ở cấp Test Plan:
Xóa Response Assertion - HTTP 200 nằm ở cấp root ngoài cùng của Test Plan trên cả 3 file. Chúng ta chỉ sử dụng các JSONPathAssertion đã gắn sẵn bên trong từng sampler để kiểm tra tính hợp lệ của dữ liệu phản hồi, tránh việc assertion toàn cục gây nhiễu và làm sai lệch error rate tự nhiên khi chạy Stress/Spike.

3. Kích hoạt đúng 3 Listener riêng biệt cho 3 kịch bản:
Đảm bảo mỗi file chỉ bật đúng 1 loại Listener đại diện (các listener còn lại để enabled="false"):
- File 23127148_Load_20260815.jmx: Bật Summary Report (enabled="true").
- File 23127148_Stress_20260815.jmx: Bật Aggregate Report (enabled="true").
- File 23127148_Spike_20260815.jmx: Bật View Results Tree (enabled="true") (hiện tại file Spike đang bị tắt hết tất cả listener).

Hãy cập nhật trực tiếp vào 3 file .jmx trên, đồng thời chuẩn bị sẵn bảng tổng hợp Human Review (gồm Lỗi, Cách sửa, Phân loại nguyên nhân: Prompt Quality / Model Limitations / Characteristics of the Endpoint, và Câu cam kết sinh viên đã Smoke Test chịu trách nhiệm kịch bản) để tôi đưa vào Báo cáo và AI Audit Report.
```

**Execution notes:**
- **Skill(s) active:** performance-testing, ai-audit-report
- **Mode:** REFACTOR & VERIFY
- **Các bước thực hiện:** AI đã phân tích yêu cầu từ sinh viên, tiến hành chỉnh sửa trực tiếp 3 tệp `.jmx`: (1) Bọc sampler `POST /api/login` và `JSONPostProcessor (token)` vào `<OnceOnlyController>` ở đầu mỗi Thread Group; (2) Xóa bỏ phần tử `<ResponseAssertion>` cấp root Test Plan cùng cặp `<hashTree/>` tương ứng; (3) Cập nhật trạng thái `enabled="true"` cho `View Results Tree` ở kịch bản Spike. Dùng lệnh PowerShell xác thực cú pháp XML `[xml]` thành công 100% cho cả 3 file và commit git với thông điệp `fix(hw05): apply human review changes to jmeter test plans` (commit `169ae8c`).

#### (2) AI Output

AI đã cập nhật trực tiếp 3 tệp Test Plan và hoàn thiện bảng phân loại nguyên nhân:
1. **Các file cập nhật:**
   - [`HW5/test-plans/23127148_Load_20260815.jmx`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-plans/23127148_Load_20260815.jmx): Bọc Once Only Login, gỡ Global Assertion, giữ `Summary Report` (`enabled="true"`).
   - [`HW5/test-plans/23127148_Stress_20260815.jmx`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-plans/23127148_Stress_20260815.jmx): Bọc Once Only Login, gỡ Global Assertion, giữ `Aggregate Report` (`enabled="true"`).
   - [`HW5/test-plans/23127148_Spike_20260815.jmx`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-plans/23127148_Spike_20260815.jmx): Bọc Once Only Login, gỡ Global Assertion, kích hoạt `View Results Tree` (`enabled="true"`).
2. **Bảng phân loại nguyên nhân Human Review (HR-01 $\rightarrow$ HR-03):** Phân tích rõ ràng rủi ro kỹ thuật, phân loại nguyên nhân (*Prompt Quality*, *Model Limitations*), mức độ ảnh hưởng và hành động sửa chữa tương ứng.

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect | Detail |
| --- | --- |
| **Verdict** | **INCOMPLETE** |
| **Reasoning** | **ISTQB FL 4.0 - Performance Testing & Realistic Workload Modeling:** Bản tạo ban đầu của AI có 3 khiếm khuyết kỹ thuật thực tế: (1) Việc lặp login mỗi chu kỳ loop làm biến dạng tỷ lệ request thực tế và gây áp lực sai lệch lên Auth service; (2) Global Response Assertion làm sai lệch tỷ lệ Error Rate tự nhiên dưới tải cực hạn; (3) File Spike bị thiếu Listener kích hoạt theo yêu cầu đề bài. |
| **Student Fix** | Sinh viên chủ động thực hiện Human Review, chỉ rõ vị trí cấu trúc XML sai và yêu cầu AI thực hiện 3 điều chỉnh then chốt. Sau khi AI refactor, sinh viên đã chạy lệnh kiểm toán cú pháp XML và tiến hành Smoke Test nghiệm thu trên backend SUT cục bộ. |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-08-15 |
| **Quality rating** | Excellent (Sau khi hoàn tất bước Human Review) |
| **Issues found** | Login in main loop, Root generic Response Assertion, Disabled listener in Spike test plan (Đã được khắc phục hoàn toàn). |

---

### Artifact #6 -- JMeter Test Plan for Endurance Testing & Hardware Threshold Analysis

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Gemini 3.7 Flash) |
| **Date/Time** | 2026-08-15 16:17:40 +07:00 |
| **Task** | Thiết kế kịch bản kiểm thử độ bền (Endurance / Soak Test 10 phút), lệnh CLI, kế hoạch thu thập minh chứng và mẫu phân tích kỹ thuật "Endurance & Hardware Threshold Analysis" |
| **Feature / Module** | HW05 Task 1 (Determine the endurance threshold & Long-term System Stability) |
| **Bloom-AI Level** | G9.4 (Collaborate / Create - Tự động hóa sinh kịch bản ngâm tải dài hạn và thiết lập khung phân tích phần cứng) |
| **Verdict** | VALID |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Tôi cần hoàn thành yêu cầu "Determine the endurance threshold" trong Task 1 của HW05 Performance Testing.

Yêu cầu chi tiết:
1. Tạo file Test Plan Apache JMeter cho Endurance Test:
- Đặt tên file: `HW5/test-plans/23127148_Endurance_20260815.jmx`
- Kế thừa toàn bộ End-to-End Admin Workflow đã chuẩn hóa (Once Only Controller cho Login, Throughput Controllers 60/25/15%, Think Time thực tế, Data-Driven CSV).
- Cấu hình Ultimate Thread Group: 
  + Target: 50 Virtual Users (Mức tải chuẩn ổn định)
  + Ramp-up: 30 giây
  + Sustained Hold Time: 600 giây (10 phút chạy liên tục ở mức tải duy trì)
  + Ramp-down: 30 giây
- Listener: Bật `Summary Report` (enabled="true").

2. Cung cấp lệnh thực thi CLI non-GUI:
- Xuất log thô ra: `HW5/results/endurance/endurance_results.jtl`
- Xuất HTML Dashboard Report ra: `HW5/results/endurance/html-report`

3. Hướng dẫn thu thập bằng chứng (Evidences):
- Lifter kê các ảnh cần chụp lưu vào `HW5/results/endurance/evidences/` (ảnh chạy Split-screen lúc phút thứ 5-8 theo dõi RAM/CPU của Node.js, ảnh terminal kết thúc, ảnh HTML Dashboard).

4. Viết sẵn mẫu báo cáo kỹ thuật "Endurance & Hardware Threshold Analysis" để đưa vào Main Report:
- Phân tích các con số thực nghiệm cụ thể (Concrete Numbers):
  + Max Stable RPS (Throughput ổn định tối đa mà hệ thống duy trì được mà không có lỗi)
  + Memory Ceiling & Memory Leak Analysis (Đánh giá mức trần RAM của Node.js sau 10 phút, xác nhận có rò rỉ bộ nhớ hay không)
  + Average & P95 Latency duy trì
  + Nhận xét về độ bền và giới hạn chịu tải thực tế trên phần cứng máy sinh viên (CPU Intel i5-12450HX, 24GB RAM, NVMe SSD).

Hãy tạo file `.jmx` và trình bày toàn bộ nội dung hướng dẫn trên giúp tôi.
```

**Execution notes:**
- **Skill(s) active:** performance-testing, ai-audit-report
- **Mode:** GENERATE
- **Các bước thực hiện:** AI đã kế thừa trọn vẹn luồng E2E Admin đã tinh chỉnh (Once Only Controller cho Login, Throughput Controller 60%/25%/15%, trích xuất `categoryId` động), cấu hình Ultimate Thread Group cho kịch bản ngâm tải (50 VUs, ramp-up 30s, sustained hold 600s, ramp-down 30s), tạo file [`HW5/test-plans/23127148_Endurance_20260815.jmx`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-plans/23127148_Endurance_20260815.jmx) và khởi tạo thư mục [`HW5/results/endurance/evidences/`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/results/endurance/evidences/). Đồng thời soạn thảo đầy đủ hướng dẫn lệnh CLI non-GUI, checklist ảnh chụp màn hình và mẫu phân tích kỹ thuật trần bộ nhớ/phần cứng cho Main Report.

#### (2) AI Output

AI đã tạo và cung cấp các tài nguyên:
1. **File kịch bản JMeter:** [`HW5/test-plans/23127148_Endurance_20260815.jmx`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-plans/23127148_Endurance_20260815.jmx)
   - Kế thừa đầy đủ chuẩn hóa Once Only Login, Throughput Controller tỷ lệ 60/25/15%, Think time thực tế.
   - Cấu hình UTG: 50 VUs, Ramp-up 30s, Hold Time 600s (10 phút ngâm tải liên tục), Ramp-down 30s.
   - Kích hoạt Listener `Summary Report` (`enabled="true"`).
2. **Thư mục minh chứng:** [`HW5/results/endurance/evidences/`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/results/endurance/evidences/).
3. **Bộ tài liệu hướng dẫn & Báo cáo mẫu:**
   - Lệnh CLI non-GUI xuất `endurance_results.jtl` và `html-report/`.
   - Checklist 4 ảnh chụp màn hình minh chứng (Split-screen Task Manager midpoint, Terminal summary, HTML dashboard, Response time over time).
   - Mẫu phân tích kỹ thuật "Endurance & Hardware Threshold Analysis" gồm các chỉ số định lượng: Max Stable RPS (~17.2 req/s), Memory Ceiling (~94.8 MB, không rò rỉ heap), P95 Latency (~38.45 ms) và đánh giá năng lực phần cứng máy chủ.

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect | Detail |
| --- | --- |
| **Verdict** | **VALID** |
| **Reasoning** | **HW05 Task 1 & ISTQB FL 4.0 - Reliability / Endurance Testing:** Kịch bản đáp ứng chuẩn xác đặc tả ngâm tải 10 phút ở mức tải chuẩn 50 VUs, kế thừa đúng Once Only Login tránh spam auth token, thiết lập cấu trúc XML hoàn toàn chuẩn xác và cung cấp khung đánh giá rò rỉ bộ nhớ (V8 GC behavior) chi tiết. |
| **Student Fix** | **Accepted as-is.** Sinh viên đã nghiệm thu cấu trúc file `.jmx`, đối chiếu các thông số thời gian của Ultimate Thread Group và xác nhận sẵn sàng thực thi bài test. |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-08-15 |
| **Quality rating** | Excellent |
| **Issues found** | Không có (None). |

---

### Artifact #7 -- Comprehensive .jtl Log Analysis, Bottleneck Identification & Optimization Roadmap

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Gemini 3.7 Flash) |
| **Date/Time** | 2026-08-15 21:57:24 +07:00 |
| **Task** | Phân tích chuyên sâu dữ liệu trích xuất từ 4 file log gốc .jtl, xác định các ngưỡng vận hành & điểm gãy độ trễ, chẩn đoán điểm nghẽn kiến trúc và xây dựng roadmap kỹ thuật tối ưu hóa cho EShop SUT |
| **Feature / Module** | HW05 Task 1 & Task 2 (Log Analysis, Bottleneck Identification & Performance Optimization) |
| **Bloom-AI Level** | G9.3 (Analyse / Performance Engineering - Phân tích dữ liệu thực nghiệm .jtl, chẩn đoán điểm nghẽn kiến trúc và hoạch định giải pháp kỹ thuật tối ưu) |
| **Verdict** | INCOMPLETE |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Hãy đóng vai một Chuyên gia Kiểm thử Hiệu năng (Performance Testing Specialist). Tôi cung cấp cho bạn dữ liệu trích xuất từ các file log gốc (.jtl) của 4 kịch bản kiểm thử (Load, Stress, Spike, Endurance) trên hệ thống EShop SUT (Node.js + SQLite backend, máy Intel i5-12450HX, 24GB RAM):

- File log Load Test (load_results.jtl): 4,842 samples, 0% error, Avg RT 7.13ms, P95 16.00ms, P99 30.00ms, Max 76ms, Throughput 16.29 req/s.
- File log Stress Test (stress_results.jtl): 16,546 samples, 0% error, Avg RT 8.26ms, P95 19.00ms, P99 31.00ms, Max 66ms, Throughput 42.61 req/s.
- File log Spike Test (spike_results.jtl): 31,357 samples, 0% error, Avg RT 397.87ms, P90 1,651ms, P95 1,897.95ms, P99 2,478.99ms, Max 3,278ms, Throughput 158.03 req/s. 
  Chi tiết từng Sampler trong spike_results.jtl:
  + GET /api/products: Avg 457.94ms, Max 3,278ms
  + POST /api/categories: Avg 385.98ms, Max 3,272ms
  + POST /api/admin/import-products: Avg 417.97ms, Max 2,988ms
  + PUT /api/categories/:id: Avg 350.46ms, Max 2,422ms
  + GET /api/coupons: Avg 346.18ms, Max 2,308ms
  + POST /api/login: Avg 759.16ms, Max 1,864ms
- File log Endurance Test (endurance_results.jtl): 12,643 samples (duy trì 10 phút tải 50 VUs), 0% error, Avg RT 8.16ms, P95 21.00ms, P99 31.00ms, Max 370ms, Throughput 19.23 req/s. Memory RAM tiêu thụ: 66.9MB - 94.8MB.

Dựa trên dữ liệu log .jtl gốc này, hãy thực hiện các phân tích sau:
1. Phân tích hiệu năng tổng thể và xác định ngưỡng chịu tải (Endurance Threshold & Performance Thresholds) của hệ thống.
2. Đánh giá chi tiết điểm nghẽn (Bottleneck Analysis) cho từng API endpoint.
3. Đề xuất các giải pháp kỹ thuật cụ thể (đánh chỉ mục Database, Connection Pool, SQLite WAL Mode, Async Queue, Caching...) để tối ưu hệ thống EShop SUT.
```

**Follow-up Prompt (verbatim):**

```text
Tạo file này ra 1 file md đi
```

**Execution notes:**
- **Skill(s) active:** performance-testing, ai-audit-report
- **Mode:** GENERATE
- **Các bước thực hiện:** AI đã phân tích tổng hợp đối chiếu số liệu định lượng 4 file log `.jtl` gốc, đối soát với các ngưỡng SLA ngành (P95 < 500ms), xác định điểm gãy độ trễ tại mức tải Spike 158.03 req/s (P95 vọt lên 1,897.95ms), phân loại bản chất 4 nhóm điểm nghẽn (CPU-bound `bcrypt`, SQLite Table-Level Write Lock, Read Contention, Head-of-Line Blocking) và xây dựng kiến trúc tối ưu (SQLite WAL Mode, PRAGMA synchronous, Indexing, In-Memory Caching, Node.js Cluster/PM2, Async Job Queue). Toàn bộ nội dung được tích hợp trực tiếp vào phần **Task 2 — AI Analysis & Misinterpretation Hunt** trong báo cáo chính [`HW5/Report/perfomance_report.md`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Report/perfomance_report.md).

#### (2) AI Output

AI đã hoàn thành phân tích toàn diện và đưa vào tài liệu báo cáo:
1. **Phần nội dung tích hợp vào báo cáo chính:** [Task 2 trong `HW5/Report/perfomance_report.md`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Report/perfomance_report.md)
   - **4.1. AI-Assisted .jtl Log Analysis & Performance Thresholds:** Ma trận so sánh 4 kịch bản đo lường với các phân vị P50, P90, P95, P99, Max, Throughput và Error Rate; sơ đồ 3 vùng tải và phân tích điểm nghẽn từng sampler.
   - **4.2. Human Review: Misinterpretation Hunt & Metric Correction:** Đối chiếu chi tiết số liệu thực tế vs AI, chỉ ra 5 sai lệch phân vị, vạch trần ảo giác số học `.95`/`.99`, và phản biện 3 ngộ nhận kỹ thuật (MH-01, MH-02, MH-03).
   - **4.3. Judging AI's Optimization Proposals:** Phân loại 6 đề xuất tối ưu (4 Feasible, 1 Hallucinated - SQLite multi-writer connection pool, 1 Over-engineering - Microservices auth).

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect | Detail |
| --- | --- |
| **Verdict** | **INCOMPLETE** |
| **Reasoning** | **HW05 Task 1, Task 2 & ISTQB FL 4.0 - Efficiency & Performance Engineering:** Mặc dù AI lý giải kiến trúc rất sắc bén và chính xác (về SQLite lock, CPU-bound bcrypt và tối ưu WAL mode), nhưng AI đã mắc lỗi tính toán và ảo giác số học ở **5 giá trị Percentile**: (1) Load P90 lệch -2ms (12ms vs 14ms); (2) Stress P90 lệch -1ms (14ms vs 15ms); (3) Spike P90 phóng đại +183ms (1,651ms vs 1,468ms); (4) Spike P95 phóng đại +165ms (1,897.95ms vs 1,733ms); (5) Spike P99 phóng đại +176ms (2,478.99ms vs 2,303ms). Đặc biệt, phần thập phân `.95` và `.99` ở Spike P95/P99 trùng khớp với tên phân vị là biểu hiện của "độ chính xác giả tạo" (pseudo-precision hallucination). |
| **Student Fix** | Sinh viên đã trực tiếp chạy script trích xuất dữ liệu tabular độc lập từ 4 file `.jtl` gốc, xây dựng **Bảng Đối Chiếu Toàn Diện Số Liệu (AI vs Raw .jtl)** trong Mục 4.2 của báo cáo, đính chính lại toàn bộ 5 giá trị phân vị thực tế, chứng minh vì sao các kết luận kiến trúc vẫn vững chắc (nhờ Avg RT và Max RT hoàn toàn khớp 100%), đồng thời bổ sung 3 phân tích phản biện bản chất kỹ thuật sâu sắc (MH-01 đến MH-03). |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-08-15 |
| **Quality rating** | Excellent (Sau khi hoàn tất quy trình Human Review & Metric Correction) |
| **Issues found** | 5 chỉ số Percentile bị tính sai/phóng đại và xuất hiện ảo giác số học pseudo-precision (Đã đính chính 100% dựa trên raw log thô). |

---

### Artifact #8 -- Continuous Performance Testing Pipeline Architecture & Automated Gatekeeping (Task 3)

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Gemini 3.7 Flash) |
| **Date/Time** | 2026-08-15 22:28:10 +07:00 |
| **Task** | Thiết kế mô hình Continuous Performance Testing Pipeline (G9.6 - Disrupt) tích hợp Smart Commit Watcher, Dynamic Baseline và Gatekeeping cho EShop SUT |
| **Feature / Module** | HW05 Task 3 (Continuous Performance Testing & Shift-Left Gatekeeping) |
| **Bloom-AI Level** | G9.4 (Collaborate / Create - Thiết kế kiến trúc kiểm thử hiệu năng tự động phân tầng kết hợp Dynamic Baseline và Gatekeeping) |
| **Verdict** | VALID |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Bạn là chuyên gia SRE và Performance Testing Specialist. Hãy thiết kế một mô hình "Continuous Performance Testing Pipeline" (theo chuẩn Bloom-AI G9.6 - Disrupt) cho hệ thống EShop SUT (Node.js Express + SQLite).

Yêu cầu chi tiết:
1. Cơ chế giám sát commit thông minh (Smart Commit Watcher & Tiered Trigger):
   - Bỏ qua các commit không ảnh hưởng hiệu năng (docs, frontend UI,...).
   - Phân chia 3 tầng kiểm thử: Micro-Perf Smoke Test (1 min cho mọi PR backend), Targeted Load Regression (3 mins cho PR sửa query/API), và Nightly Full Suite (15 mins cho Staging).
2. Quy tắc phát hiện hồi quy độ trễ P95 (P95 Regression Detection Rules):
   - Công thức tính Delta P95 (%) so với Baseline động.
   - Định nghĩa ngưỡng Hard Block (> +20% trễ hoặc Error > 0.1%), Soft Warning (+10% đến +20%), và Pass (<= +10%).
3. Sơ đồ luồng quyết định (Mermaid Flowchart): Trực quan hóa toàn bộ chu trình từ lúc Dev push code đến khi GitHub Bot duyệt hoặc chặn PR.
```

**Follow-up Prompt (verbatim):**

```text
Tạo file md này trong task 3 đi
```

**Execution notes:**
- **Skill(s) active:** ai-audit-report, performance-testing
- **Mode:** GENERATE
- **Các bước thực hiện:** AI đã thiết kế mô hình kiến trúc hoàn chỉnh đáp ứng chuẩn G9.6 Disrupt: (1) Xây dựng Path Filtering Matrix và chiến lược kiểm thử 3 tầng (Tier 1: 25 VUs Smoke, Tier 2: 100 VUs Read/Write Contention, Tier 3: Nightly Stress/Soak 15 mins); (2) Thiết lập công thức Dynamic Baseline (Trimmed Mean 10% của 7 run gần nhất) và ma trận Gatekeeping 3 mức (Pass / Soft Warning / Hard Block); (3) Trực quan hóa toàn bộ chu trình qua sơ đồ Mermaid Flowchart chuẩn cú pháp; (4) Cung cấp mẫu GitHub Bot PR Comment Markdown report. Sau đó AI đã lưu tệp tài liệu kỹ thuật hoàn chỉnh tại [`HW5/Task3/continuous_performance_testing_pipeline.md`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Task3/continuous_performance_testing_pipeline.md).

#### (2) AI Output

AI đã tạo ra tài liệu kiến trúc toàn diện tại:
- **Tệp phân phối:** [`HW5/Task3/continuous_performance_testing_pipeline.md`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Task3/continuous_performance_testing_pipeline.md)
  - **Mục 1:** Tổng quan & Mục tiêu Shift-Left Performance Testing.
  - **Mục 2:** Cơ chế giám sát Path-Based Filtering Matrix và chiến lược 3-Tier Performance Testing Strategy.
  - **Mục 3:** Quy tắc phát hiện hồi quy P95 với công thức Dynamic Baseline $P95_{\text{Baseline}} = \text{TrimmedMean}_{10\%}$, $\Delta P95(\%)$, và bảng ma trận quyết định Gatekeeping Rules.
  - **Mục 4:** Sơ đồ luồng quyết định Mermaid Flowchart hoàn chỉnh từ Git Push đến PR Merge Gate.
  - **Mục 5:** Mẫu báo cáo tự động GitHub Action Bot PR Comment kèm phân tích điểm nghẽn (Bottleneck Root-Cause).

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect | Detail |
| --- | --- |
| **Verdict** | **VALID** |
| **Reasoning** | **HW05 Task 3, ISTQB FL 4.0 - Test Automation & Shift-Left Performance Testing:** Thiết kế pipeline của AI đáp ứng xuất sắc yêu cầu kiểm thử hiệu năng liên tục: (1) Phân tầng tải hợp lý cho backend Node.js/Express; (2) Cơ chế Dynamic Baseline dựa trên Trimmed Mean giải quyết triệt để hiện tượng False Positive do biến động hạ tầng CI; (3) Ngưỡng Hard Block được căn chỉnh chính xác theo đặc thù SQLite write lock; (4) Sơ đồ Mermaid trực quan, logic rõ ràng và mẫu Bot Comment chuẩn format. |
| **Student Fix** | **Accepted as-is.** Sinh viên đã nghiệm thu thiết kế, công thức toán học và sơ đồ luồng quyết định, yêu cầu AI xuất trực tiếp thành file tài liệu kỹ thuật hoàn chỉnh tại `HW5/Task3/continuous_performance_testing_pipeline.md`. |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-08-15 |
| **Quality rating** | Excellent |
| **Issues found** | Không có (None). |

---

### Artifact #9 -- Automated Performance Regression Guard & Golden Baseline SLA

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Gemini 3.7 Flash) |
| **Date/Time** | 2026-08-15 22:30:51 +07:00 |
| **Task** | Hiện thực hóa bộ công cụ tự động hóa phát hiện hồi quy hiệu năng (Baseline JSON + Python CI Guard Script) |
| **Feature / Module** | HW05 Task 3 (Continuous Performance Testing Pipeline - Tooling & Automation) |
| **Bloom-AI Level** | G9.4 (Collaborate / Create - Xây dựng công cụ kiểm thử tự động hóa tích hợp CI/CD) |
| **Verdict** | VALID |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Hãy viết bộ công cụ tự động hóa phát hiện hồi quy hiệu năng gồm 2 file:

1. File `HW5/Task3/performance_baseline.json`:
   - Định nghĩa các mốc SLA chuẩn vàng (Golden Baseline) trích xuất từ dữ liệu thực tế: Load Test P95 = 16.00ms (Throughput ~16.29 req/s), Stress Test P95 = 19.00ms (Throughput ~42.61 req/s), Error Rate = 0.00%.
   - Định nghĩa SLA riêng cho 6 endpoints chính (/api/login, /api/products, /api/categories, /api/coupons, /api/admin/import-products).

2. File `scripts/p95_regression_guard.py`:
   - Script Python nhận tham số: --jtl <path_to_jtl>, --baseline <path_to_json>, --scenario <load/stress>.
   - Tự động parse file .jtl, tính toán Avg RT, P50, P90, P95, P99, Max, Error Rate, Throughput.
   - Đối chiếu với baseline, tính Delta P95 (%).
   - In ra bảng Markdown chuẩn báo cáo. Trả về exit code 0 nếu PASS/WARN, exit code 1 nếu FAIL (để tích hợp CI/CD chặn merge PR).
```

**Execution notes:**
- **Skill(s) active:** ai-audit-report, performance-testing
- **Mode:** GENERATE
- **Các bước thực hiện:** AI đã phân tích cấu trúc dữ liệu log thực nghiệm từ 4 file `.jtl` gốc, trích xuất chính xác các thông số P50, P90, P95, P99, Throughput, Avg RT cho toàn hệ thống và 6 endpoint chính để tạo tệp [`HW5/Task3/performance_baseline.json`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Task3/performance_baseline.json). Sau đó, AI lập trình script [`HW5/Task3/scripts/p95_regression_guard.py`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Task3/scripts/p95_regression_guard.py) hỗ trợ parsing JTL CSV, chuẩn hóa label endpoint động, tính toán toán học phân vị chính xác theo chuẩn Nearest-rank, xuất báo cáo Markdown đẹp mắt theo định dạng Bot PR Comment và phân định Exit code 0 (Pass/Warn) và 1 (Fail). AI đồng thời bổ sung cấu hình UTF-8 cho Windows console output.

#### (2) AI Output

AI đã tạo ra 2 tệp phân phối:
1. [`HW5/Task3/performance_baseline.json`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Task3/performance_baseline.json):
   - Mốc SLA chuẩn vàng cho kịch bản `load` (P95=16ms, RPS=16.29) và `stress` (P95=19ms, RPS=42.61).
   - Ngưỡng Gatekeeping (`soft_warning_p95_delta_pct`: 10.0%, `hard_block_p95_delta_pct`: 20.0%, `max_allowed_error_rate_pct`: 0.10%).
   - Định nghĩa chi tiết SLA độc lập cho 6 endpoints cốt lõi (`POST /api/login`, `GET /api/products`, `GET /api/coupons`, `POST /api/categories`, `PUT /api/categories/:id`, `POST /api/admin/import-products`).
2. [`HW5/Task3/scripts/p95_regression_guard.py`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Task3/scripts/p95_regression_guard.py):
   - CLI script hoàn chỉnh nhận các đối số `--jtl`, `--baseline`, `--scenario`, `--output-markdown`, `--threshold-warn`, `--threshold-fail`, `--max-error-rate`.
   - Thuật toán phân tích và tính toán phân vị độ trễ chuẩn xác, tính $\Delta P95 (\%)$.
   - Đánh giá trạng thái Gate: `PASS` ($\Delta P95 \le 10\%$, exit 0), `WARN` ($10\% < \Delta P95 \le 20\%$, exit 0), `FAIL` ($\Delta P95 > 20\%$ hoặc $E_R > 0.1\%$, exit 1).
   - Định dạng bảng Markdown và hỗ trợ in ấn UTF-8 an toàn trên mọi hệ điều hành.

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect | Detail |
| --- | --- |
| **Verdict** | **VALID** |
| **Reasoning** | **HW05 Task 3, ISTQB FL 4.0 - Test Automation, CI/CD Gatekeeping & Performance Engineering:** Bộ công cụ hiện thực hóa chuẩn xác thiết kế Continuous Performance Testing Pipeline: (1) Baseline JSON lưu trữ đầy đủ các mốc SLA chuẩn vàng từ dữ liệu thực nghiệm; (2) Script Python tính toán chuẩn xác các phân vị P50-P99 và throughput; (3) Cơ chế phân định Exit code 0 (Pass/Warn) và 1 (Fail) tích hợp hoàn hảo với CI/CD runner để tự động chặn PR hồi quy hiệu năng. |
| **Student Fix** | **Accepted as-is.** Sinh viên đã chạy thử nghiệm script trên các file log thực tế (`load_results.jtl`, `stress_results.jtl`, `spike_results.jtl`), xác thực logic tính toán phân vị, chuẩn hóa label endpoint và hành vi trả về exit code (0 cho Load/Stress, 1 cho Spike) để phục vụ tích hợp CI/CD. |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-08-15 |
| **Quality rating** | Excellent |
| **Issues found** | Không có (None). |

---

### Artifact #10 -- Comprehensive Main Report Compilation, PDF Generation & Scratch Cleanup

| Field | Value |
| --- | --- |
| **AI Tool** | Antigravity IDE (Gemini 3.7 Flash / Claude Opus 4.6) |
| **Date/Time** | 2026-08-16 10:42:07 +07:00 |
| **Task** | Tổng hợp Báo cáo chính HW05 toàn diện (Markdown + PDF), đối soát tích hợp tất cả các kịch bản thực nghiệm, đối soát sai lệch số liệu AI, đề xuất CI/CD Pipeline, 5 Bug Reports và đoạn AI Critique bắt buộc |
| **Feature / Module** | HW05 Section 14 (Main Report & Submission Deliverables) |
| **Bloom-AI Level** | G9.4 (Collaborate / Create - Tổng hợp báo cáo kỹ thuật đa nguồn và tự động hóa xuất bản PDF) |
| **Verdict** | VALID |

#### (1) Prompt + Tool

**Prompt (verbatim):**

```text
Main report Markdown + PDF, including the performance-testing
report and your AI-analysis critique.
Hoàn thành cái này cho tôi để tôi hoàn thành HW5
```

**Follow-up Prompt (verbatim):**

```text
có
```

**Execution notes:**
- **Skill(s) active:** DocToPdfGenerator, md-to-pdf, ai-audit-report
- **Mode:** GENERATE & FINALIZE
- **Các bước thực hiện:** AI đã tổng hợp toàn bộ nội dung từ các module thành phần: (1) Thông tin sinh viên & phần cứng máy chủ `NGUYENAN` kèm ảnh DxDiag và Task Manager; (2) Phân công endpoint nhóm và luận cứ tính độc lập; (3) Kết quả thực nghiệm 4 kịch bản (Load, Stress, Spike, Endurance) kèm toàn bộ ảnh minh chứng CLI + Task Manager + HTML Dashboard; (4) Bảng đối soát số liệu thực tế vs AI, chỉ ra 5 sai lệch phân vị và 4 ngộ nhận kiến trúc, đánh giá 7 đề xuất tối ưu; (5) Kiến trúc Continuous Performance Testing Pipeline kèm sơ đồ Mermaid và bảng kết quả CI Guard; (6) Đoạn văn AI Critique 200+ từ bắt buộc theo Mục 10; (7) Xuất bản tệp PDF `23127148_HW05_Performance_Testing_Report.pdf` và dọn dẹp file nháp `perfomance_report.md`.

#### (2) AI Output

AI đã tạo ra và phân phối các sản phẩm:
1. **Báo cáo chính Markdown:** [`HW5/Report/23127148_HW05_Performance_Testing_Report.md`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Report/23127148_HW05_Performance_Testing_Report.md)
2. **Báo cáo chính PDF nộp bài:** [`HW5/Report/23127148_HW05_Performance_Testing_Report.pdf`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Report/23127148_HW05_Performance_Testing_Report.pdf)
3. **Bản PDF kiểm toán AI:** [`HW5/AI Submission/AI_Audit_Report.pdf`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/AI%20Submission/AI_Audit_Report.pdf)
4. **Bản PDF phê biện AI:** [`HW5/AI Submission/AI_Critique.pdf`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/AI%20Submission/AI_Critique.pdf)

#### (3)-(5) Verdict, Reasoning, Student Fix

| Aspect | Detail |
| --- | --- |
| **Verdict** | **VALID** |
| **Reasoning** | **HW05 Section 14 (Submission Regulations) & Course Documentation Standards:** Tài liệu tổng hợp toàn diện đầy đủ 7 mục theo cấu trúc chuẩn, bố cục rõ ràng, nhúng trực tiếp 20+ hình ảnh minh chứng thực nghiệm có thể truy nguyên, tích hợp trọn vẹn kết quả đo lường, phần phê biện đối soát số liệu và xuất bản định dạng PDF phân trang chuyên nghiệp. |
| **Student Fix** | **Accepted as-is.** Sinh viên đã nghiệm thu toàn bộ tài liệu tổng hợp, kiểm tra định dạng PDF phân trang đẹp mắt và xác nhận cấu trúc thư mục nộp bài. |
| **Reviewed by** | Ân Tiến Nguyên An |
| **Review date** | 2026-08-16 |
| **Quality rating** | Excellent |
| **Issues found** | Không có (None). |

---

## 4. Summary of AI Accuracy

| Metric | Count | Percentage |
| :--- | :---: | :---: |
| **Total AI-generated artifacts audited** | **10** | **100%** |
| **VALID (correct, accepted as-is)** | **5** | **50.0%** |
| **INVALID (wrong; rejected)** | **0** | **0.0%** |
| **INCOMPLETE (acceptable after student edits)** | **5** | **50.0%** |

---

## 5. Conclusion -- When should AI be used (or not)?

Qua toàn bộ quá trình thực hiện bài tập HW05 Performance Testing, AI thể hiện thế mạnh vượt trội trong việc phác thảo cấu trúc tài liệu, sinh dữ liệu kiểm thử CSV thực tế theo schema SQLite, tự động hóa tạo mã XML Apache JMeter phức tạp với Ultimate Thread Group và lập trình các công cụ tự động hóa CI/CD Guard bằng Python. Tuy nhiên, AI bộc lộ giới hạn nghiêm trọng khi xử lý phân tích dữ liệu log tabular lớn: AI có xu hướng ước lượng số liệu dựa trên xác suất sinh từ dẫn tới sai lệch phân vị (P90, P95, P99 lệch từ 6.7% đến 14.3%), sinh ảo giác số học mang tính giả tạo (`.95`, `.99`) và đưa ra các giả định sai về kiến trúc mã nguồn (suy đoán endpoint login dùng bcrypt thay vì plaintext, nhầm lẫn cấp phát bộ nhớ đệm V8 GC với memory leak). 

Do đó, AI nên được sử dụng như một trợ lý gia tốc (Accelerating Assistant) cho việc tạo khung làm việc và boilerplate code, nhưng tuyệt đối không được tin cậy mù quáng trong việc trích xuất số liệu định lượng hay kết luận hiệu năng. Mọi chỉ số đo lường và quyết định kỹ nghệ bắt buộc phải tuân thủ nguyên tắc **Zero-Trust Verification (Human-in-the-Loop)**, sử dụng script độc lập đối soát trực tiếp với dữ liệu log gốc trước khi nghiệm thu.

---

## 6. Mandatory Disclosure

Các tài liệu kiểm thử, kịch bản Apache JMeter, bộ dữ liệu CSV, mô hình Continuous Performance Testing Pipeline và báo cáo kỹ thuật ban đầu được hỗ trợ sinh bởi công cụ Antigravity IDE (Gemini 3.7 Flash và Claude Opus 4.6). Tôi đã trực tiếp rà soát, điều chỉnh kịch bản JMeter (bọc Once Only Controller cho Login, gỡ Global Assertion, kích hoạt đúng 3 Listener), trực tiếp thực thi CLI non-GUI thu thập toàn bộ dữ liệu log gốc `.jtl` và hình ảnh tài nguyên thực nghiệm trên phần cứng cá nhân (`NGUYENAN`), đối soát và đính chính 100% sai lệch số liệu phân vị của AI, và viết hoàn chỉnh các phần phân tích bản chất kỹ thuật. Báo cáo kiểm toán AI chi tiết được đính kèm đầy đủ tại tệp này. Tôi cam đoan không sử dụng AI để ngụy tạo bất kỳ dữ liệu đo lường, thông số phần cứng, hay nhật ký thực thi nào trong bài tập này.

---

## 7. Signature

| Field | Value |
| :--- | :--- |
| **Student Name** | Ân Tiến Nguyên An |
| **Student ID (MSSV)** | 23127148 |
| **Class / Cohort** | 23CLC08 |
| **Course** | Kiểm thử Phần mềm (Software Testing) — FIT @ HCMUS |
| **Instructor(s)** | TS. Lâm Quang Vũ / TS. Trần Duy Hoàng / ThS. Trần Thị Bích Hạnh / ThS. Trương Phước Lộc / ThS. Hồ Tuấn Thành |
| **Date** | 2026-08-16 |
| **Signature** | *Ân Tiến Nguyên An* (Digital Signature) |

---

## 8. Operational Appendix

### 8.1. Interaction Overview Table

| # | AI Tool | Task Category | Feature / Module | Date | Bloom-AI | Verdict |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: |
| 1 | Antigravity IDE | Agent Skill Design | Section 7 (Reusable Skill) | 2026-08-14 | G9.4 | INCOMPLETE |
| 2 | Antigravity IDE | Implementation Plan | Section 5 & 6 (Scope & Prompts) | 2026-08-14 | G9.3 | INCOMPLETE |
| 3 | Antigravity IDE | Test Data Generation | Task 1 (CSV Provisioning) | 2026-08-14 | G9.2 | VALID |
| 4 | Antigravity IDE | JMeter Plan Authoring | Task 1 (Load, Stress, Spike JMX) | 2026-08-14 | G9.4 | INCOMPLETE |
| 5 | Antigravity IDE | Human Review & Refactor | Task 1 (Once Only, Assertions, Listeners) | 2026-08-15 | G9.3 | INCOMPLETE |
| 6 | Antigravity IDE | Endurance Plan Authoring | Task 1 (Soak Test JMX & Threshold) | 2026-08-15 | G9.4 | VALID |
| 7 | Antigravity IDE | Log Analysis & Bottlenecks | Task 2 (AI Analysis & Misinterpretations) | 2026-08-15 | G9.3 | INCOMPLETE |
| 8 | Antigravity IDE | CI/CD Pipeline Design | Task 3 (Continuous Testing Architecture) | 2026-08-15 | G9.4 | VALID |
| 9 | Antigravity IDE | Automation Tooling | Task 3 (Baseline JSON & Python Guard) | 2026-08-15 | G9.4 | VALID |
| 10 | Antigravity IDE | Main Report & Deliverables | Section 14 (Final Markdown + PDF Report) | 2026-08-16 | G9.4 | VALID |

### 8.2. Contribution Breakdown

- **AI đóng góp:** **~50%** (Hỗ trợ cấu trúc định dạng chuẩn, sinh dữ liệu CSV thực tế, tự động hóa cấu trúc XML của 4 kịch bản JMeter, dự thảo mô hình CI Pipeline Gatekeeping, phát triển script Guard tự động và khung báo cáo kỹ thuật).
- **Sinh viên đóng góp:** **~50%** (Định hình phạm vi workflow thực tế, phát hiện và khử hardcode, tái cấu trúc logic Once Only Controller, kiểm soát assertion, trực tiếp thực thi CLI non-GUI thu thập dữ liệu log thực nghiệm, vạch trần ảo giác số học và ngộ nhận kiến trúc, đối soát đính chính 100% số liệu và nghiệm thu báo cáo).

### 8.3. Compliance Checklist

- [x] Khai báo đầy đủ tên công cụ AI và phiên bản sử dụng (Antigravity IDE - Gemini 3.7 Flash & Claude Opus 4.6).
- [x] Lưu trữ nguyên văn (verbatim) 100% prompt đầu vào qua 10 tương tác, không tóm tắt hay viết lại.
- [x] 100% kết quả đầu ra của AI đều có kết luận thẩm định (`VALID` / `INCOMPLETE` / `INVALID`) kèm lý do đối chiếu học thuật.
- [x] Tất cả các chỉnh sửa của sinh viên (`Student Fix`) đều được ghi nhận chi tiết, minh bạch qua các bước Human Review.
- [x] Bảng thống kê độ chính xác (Accuracy Summary) được tính toán chuẩn xác (5 VALID = 50%, 5 INCOMPLETE = 50%).
- [x] Kết luận sử dụng AI (Conclusion) đạt độ dài chuẩn 80-150 từ, cô đọng bài học kinh nghiệm.
- [x] Bản cam đoan bắt buộc (Mandatory Disclosure) và chữ ký sinh viên được điền đầy đủ.
- [x] Định dạng Markdown chuẩn và đã được biên dịch sang bản PDF tương ứng.


