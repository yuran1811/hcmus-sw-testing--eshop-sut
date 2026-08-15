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

## 4. Accuracy Summary & Contribution Breakdown

### Thống kê thẩm định chất lượng (Verdict Breakdown)

| Verdict | Số lượng | Tỷ lệ (%) | Ý nghĩa đánh giá |
| :---: | :---: | :---: | :--- |
| **VALID** | 1 | 20.0% | Chấp nhận nguyên vẹn không cần chỉnh sửa |
| **INCOMPLETE** | 4 | 80.0% | Sử dụng bản thảo AI và hoàn thiện qua rà soát của sinh viên (Human-in-the-loop) |
| **INVALID** | 0 | 0.0% | Loại bỏ hoàn toàn do sai lệch bản chất |
| **TỔNG CỘNG** | **5** | **100%** | **100% các artifact đều được kiểm duyệt và hiệu chỉnh nghiêm ngặt** |

### Đánh giá đóng góp (Contribution Breakdown)

- **AI đóng góp (Drafting, XML Refactoring & Automation):** ~45% (Hỗ trợ cấu trúc định dạng chuẩn, sinh dữ liệu CSV thực tế, sinh nhanh cấu trúc XML phức tạp của JMeter Test Plans và thực thi chỉnh sửa theo yêu cầu).
- **Sinh viên đóng góp (Human Oversight & Engineering Review):** ~55% (Định hình phạm vi workflow thực tế, phát hiện và khử hardcode, rà soát logic mô phỏng người dùng thực tế với Once Only Controller, kiểm soát assertion, đảm bảo tính phân lập của Listener và trực tiếp Smoke Test nghiệm thu).

---

## 5. Mandatory AI Disclosure & Compliance Checklist

### Checklist tuân thủ quy chế AI

- [x] Đã khai báo đầy đủ tên công cụ AI và phiên bản sử dụng.
- [x] Đã lưu trữ nguyên văn (verbatim) 100% prompt đầu vào, không tóm tắt hay viết lại.
- [x] 100% kết quả đầu ra của AI đều có kết luận thẩm định (`VALID` / `INCOMPLETE` / `INVALID`) kèm lý do đối chiếu học thuật.
- [x] Tất cả các chỉnh sửa của sinh viên (`Student Fix`) đều được ghi nhận chi tiết, minh bạch qua các bước Human Review.
- [x] Kịch bản kiểm thử hiệu năng và Agent Skill phản ánh kết quả làm việc thực tế, không ngụy tạo dữ liệu.

### Tuyên bố bắt buộc (Mandatory Disclosure)

> _"Tôi xin cam đoan đã ghi nhận đầy đủ, trung thực toàn bộ quá trình sử dụng các công cụ AI hỗ trợ trong quá trình thực hiện bài tập này. Tất cả các nội dung do AI đề xuất đều đã được tôi trực tiếp rà soát (Human Review), kiểm tra độc lập (Smoke Test) và chịu hoàn toàn trách nhiệm về tính chính xác kỹ thuật của sản phẩm cuối cùng."_

**Chữ ký sinh viên:**  
_Ân Tiến Nguyên An_ (MSSV: 23127148)
