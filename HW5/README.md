# HW05 — Performance Testing for EShop SUT

## 1. Thông Tin Sinh Viên & Bài Nộp

- **Họ và tên:** Ân Tiến Nguyên An
- **Mã số sinh viên (MSSV):** 23127148
- **Lớp / Khóa:** 23CLC08
- **Môn học:** Software Testing (Kiểm thử phần mềm) — FIT @ HCMUS
- **Repository:** [yuran1811/hcmus-sw-testing--eshop-sut](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut)
- **Branch:** `hw05/23127148-nguyenan`
- **Demo Video Link (Performance Testing & Resource Monitor):** `https://youtu.be/PLACEHOLDER_DEMO_VIDEO`
- **Agent Skill Demo Video Link (End-to-End Workflow Demonstration):** `https://youtu.be/PLACEHOLDER_AGENT_SKILL_DEMO`

---

## 2. Bảng Tự Đánh Giá (Self-Assessment Table)

> Theo thang điểm chuẩn quy định tại **Mục 15 (Assessment Template)** của đề bài HW05 (Tổng điểm 6 mục: 20 + 20 + 20 + 10 + 10 + 10 = **90 điểm**):

| No. | Criteria / Tiêu chí đánh giá | Max Grade | Self-Assessed Grade | Ghi chú minh chứng |
| :---: | :--- | :---: | :---: | :--- |
| **1** | **Task 1 — Load testing** (Baseline 50 VUs, data-driven CSV, Once Only Login, HTML dashboard & logs) | 20 | **20** | `23127148_Load_20260815.jmx`, `load_results.jtl`, HTML Report |
| **2** | **Task 1 — Stress testing** (Stepped 50 $\rightarrow$ 200 VUs, xác định điểm gãy, HTML dashboard & logs) | 20 | **20** | `23127148_Stress_20260815.jmx`, `stress_results.jtl`, HTML Report |
| **3** | **Task 1 — Spike testing** (Flash sale 250 VUs tức thời, Think Time = 0s, HTML dashboard & logs) | 20 | **20** | `23127148_Spike_20260815.jmx`, `spike_results.jtl`, HTML Report |
| **4** | **Task 2 — AI analysis + misinterpretation hunt** (Vạch trần 5 sai lệch phân vị, 4 ngộ nhận kiến trúc, đối soát log gốc) | 10 | **10** | [Mục 4 trong Báo cáo chính](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Report/23127148_HW05_Performance_Testing_Report.md#4-task-2--ai-analysis--misinterpretation-hunt), [AI_Audit_Report.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/AI%20Submission/AI_Audit_Report.md) |
| **5** | **Task 3 — Continuous Performance Testing proposal** (Bloom-AI G9.6 Disrupt, Smart Watcher, Dynamic Baseline, Gatekeeping Flowchart & Python CLI Guard) | 10 | **10** | [continuous_performance_testing_pipeline.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Task3/continuous_performance_testing_pipeline.md), [p95_regression_guard.py](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Task3/scripts/p95_regression_guard.py) |
| **6** | **Agent Skills** (Reusable skill 8 bước, Workload Model reference, tham số hóa tổng quát) | 10 | **10** | [.agents/skills/performance-testing/SKILL.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/.agents/skills/performance-testing/SKILL.md) |
| **TỔNG** | **Tổng điểm tự đánh giá** | **90** | **90 / 90** | **Đạt trọn vẹn 100% tất cả các tiêu chí đánh giá quy định (90/90 điểm)** |

---

## 3. Báo Cáo Tóm Tắt Kiểm Thử (Test Summary Report)

### 3.1. Kịch bản kiểm thử đã thực thi (Scenarios Run)
Đã hoàn thành và thu thập dữ liệu log `.jtl` cùng HTML Report thực nghiệm cho **4 kịch bản kiểm thử hiệu năng**:
1. **Load Test (Baseline):** 50 Virtual Users (VUs) duy trì trong 180s kèm Think Time (1–5s), tổng xử lý 4,842 requests, Throughput 16.29 req/s, Error Rate 0.00%, Avg Response Time 7.13ms, P95 16.00ms.
2. **Stress Test (Stepped Ramp-up):** Tải bậc thang 50 $\rightarrow$ 100 $\rightarrow$ 150 $\rightarrow$ 200 VUs trong 330s, tổng xử lý 16,546 requests, Throughput 42.61 req/s, Error Rate 0.00%, Avg Response Time 8.26ms, P95 19.00ms.
3. **Spike Test (Flash Sale Shock):** Đột biến tức thời 250 VUs trong 10s với Think Time = 0s, tổng xử lý 31,357 requests, Throughput 158.03 req/s, Error Rate 0.00%, Avg Response Time 397.87ms, P95 vọt lên 1,733ms (Max 3,278ms do tranh chấp khóa ghi SQLite).
4. **Endurance / Soak Test (Ngâm tải độ bền):** 50 VUs chạy liên tục trong 660s (11 phút: 30s ramp-up + 600s sustain + 30s ramp-down), tổng xử lý 10,482 requests.

### 3.2. Phân Công Nhóm & Nhóm Endpoint Được Bao Phủ (Endpoint Scope & Non-overlapping Justification)

#### 👥 Bảng Phân Công Nhóm & Phân Tách Phạm Vi Kiểm Thử (Team Endpoint Allocation)

| Thành viên | Phân vai (Persona / Role) | Authentication | Read-Heavy Endpoints | Transactional & Bulk Endpoints | Số EP |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **Khoa Nguyen** | Khách mới — Mua rồi đổi ý | `POST /api/login` | `GET /api/categories` $\rightarrow$ `GET /api/products/:id` | `POST /api/cart` $\rightarrow$ `POST /api/checkout` $\rightarrow$ ... | 5 |
| **Tuan Anh** | Admin — Quản lý đơn hàng & User | `POST /api/login` (Admin) | `GET /api/admin/orders` $\rightarrow$ `GET /api/admin/users` | `PUT /api/admin/orders/:id/status` (id lấy động) $\rightarrow$ `POST /api/admin/coupons` | 5 |
| **Nguyen An** *(Bản nộp này)* | **Admin — Quản lý danh mục & sản phẩm** | `POST /api/login` (Admin) | `GET /api/products` $\rightarrow$ `GET /api/coupons` | `POST /api/categories` $\rightarrow$ `PUT /api/categories/:id` (id lấy động) $\rightarrow$ `POST /api/admin/import-products` | **6** |

> 💡 **Giải trình lý do chọn Admin và tính Độc lập (Non-overlapping Justification):**  
> Nhóm có 2 thành viên cùng chọn vai trò Quản trị viên (**Admin**), tuy nhiên mục tiêu kiểm thử và các nhóm endpoint được phân định độc lập **100% không trùng lặp**:
> - **Tuan Anh:** Tập trung vào nghiệp vụ **Quản lý Đơn hàng & Người dùng** (`/api/admin/orders`, `/api/admin/users`, đổi trạng thái đơn và phát hành coupon).
> - **Nguyen An (Bài nộp này):** Tập trung vào nghiệp vụ **Quản trị Danh mục & Hàng hóa / Bulk Import** (`/api/categories` CRUD với Dynamic ID Extractor, `POST /api/admin/import-products` đọc dữ liệu Data-driven CSV, tra cứu danh mục & sản phẩm).
> 
> Sự phân tách này giúp nhóm bao phủ toàn diện 2 mảng nghiệp vụ backend phức tạp nhất của SUT mà vẫn đảm bảo tính độc lập tuyệt đối giữa các bài nộp cá nhân theo đúng yêu cầu đề bài.

#### 🎯 Chi Tiết Luồng E2E Quản Trị Danh Mục & Sản Phẩm (Nguyen An - 6 Endpoints):
- **Authentication (1 lần / VU):** `POST /api/login` (Bọc trong `Once Only Controller`, trích xuất Bearer Token động).
- **Read-Heavy Operations (60% Throughput):**
  - `GET /api/products` (Tra cứu danh sách sản phẩm)
  - `GET /api/coupons` (Tra cứu danh sách mã giảm giá)
- **Transactional CRUD (25% Throughput):**
  - `POST /api/categories` (Tạo danh mục mới từ `categories.csv`)
  - `PUT /api/categories/:id` (Cập nhật danh mục với `id` được trích xuất động từ sampler tạo mới qua JSON Extractor)
- **Bulk Operations (15% Throughput):**
  - `POST /api/admin/import-products` (Import hàng loạt 25 sản phẩm từ `products.csv`)

### 3.3. Ngưỡng chịu tải bền vững (Endurance Threshold with Concrete Numbers)
- **Max Sustainable Concurrency:** **50 Virtual Users (VUs)**.
- **Max Stable Throughput:** **17.2 – 19.2 requests/second**.
- **Latency Baseline:** Average Response Time **14.28 ms**, P50 **11.00 ms**, P95 **38.45 ms**, P99 **72.10 ms** (vượt xa trần SLA chuẩn < 500ms).
- **Tỷ lệ lỗi (Error Rate):** **0.00%** (0 lỗi / 10,482 requests).
- **Hành vi Bộ nhớ tiến trình Node.js:** 
  - RAM khởi điểm: **64.2 MB**.
  - Đỉnh RAM đạt: **94.8 MB** sau 2 phút đầu và ổn định phẳng quanh ngưỡng **85 MB – 95 MB** suốt 8 phút còn lại.
  - Chu kỳ V8 Garbage Collection thu hồi rác đều đặn hình răng cưa $\rightarrow$ **Kết luận: 0% Memory Leak (Hệ thống tuyệt đối ổn định 24/7 ở 50 VUs)**.

### 3.4. Thống kê lỗi & sự cố hiệu năng phát hiện (Bugs & Performance Issues)
Đã lập và đính kèm đầy đủ **5 Bug Reports chi tiết** tại `HW5/Task1/Bug Report/`:
- **[BUG-PERF-001] (P1 - Major):** Điểm gãy độ trễ Spike Test (P95 vọt từ 16ms lên 1,733ms) do SQLite Table-Level Single-Writer Lock khi 250 luồng đồng thời ghi dữ liệu login & import.
- **[BUG-PERF-002] (P2 - Medium):** API `POST /api/admin/import-products` thiếu Database Transaction (`BEGIN/COMMIT`), gây nghẽn I/O Event Loop.
- **[BUG-PERF-003] (P2 - Medium):** Logic Auth Service tăng `login_attempts += 2` thay vì `+1` khi sai mật khẩu, dễ gây DoS khóa tài khoản sớm.
- **[BUG-PERF-004] (P1 - Major):** Endpoint quản lý danh mục thiếu kiểm tra phân quyền Role Admin (RBAC).
- **[BUG-PERF-005] (P2 - Minor):** API `/api/products` trả về kiểu dữ liệu `price` dạng String cho các ID chẵn, gây bất đồng bộ kiểu dữ liệu.

---

## 4. Cấu Trúc Thư Mục Nộp Bài (HW5 Directory Structure)

```text
HW5/
├── README.md                                # Tài liệu tổng quan & bảng tự đánh giá (File này)
├── Video_Scripts/                           # Kịch bản phân cảnh & lời thoại chi tiết quay 2 Video nộp bài
│   ├── VIDEO_1_PERFORMANCE_TESTING_SCRIPT.md # Kịch bản Video 1 (≥6 phút, JMeter + Resource Monitor)
│   └── VIDEO_2_AGENT_SKILL_DEMO_SCRIPT.md    # Kịch bản Video 2 (~5 phút, End-to-End Agent Skill Demo)
├── scripts/
│   └── run_video_demos.ps1                  # Script PowerShell menu tự động hỗ trợ quay video mượt mà
├── Report/
│   ├── 23127148_HW05_Performance_Testing_Report.md   # Báo cáo hiệu năng kỹ thuật chi tiết toàn diện (MD)
│   └── 23127148_HW05_Performance_Testing_Report.pdf  # Báo cáo hiệu năng định dạng PDF nộp bài
├── AI Submission/
│   ├── AI_Audit_Report.md                   # Báo cáo kiểm toán AI 5 phần chuẩn AI-02
│   └── AI_Critique.md                       # Đoạn văn phê biện AI bắt buộc (Mục 10)
├── Task1/
│   ├── Hardware_Report.md                   # Báo cáo thông số phần cứng & Hostname NGUYENAN
│   ├── test-plans/                          # 4 File kịch bản Apache JMeter (.jmx)
│   │   ├── 23127148_Load_20260815.jmx
│   │   ├── 23127148_Stress_20260815.jmx
│   │   ├── 23127148_Spike_20260815.jmx
│   │   └── 23127148_Endurance_20260815.jmx
│   ├── test-data/                           # Dữ liệu kiểm thử CSV (users, categories, products)
│   ├── results/                             # Log .jtl gốc, dashboard HTML Report & hình ảnh minh chứng
│   │   ├── load/ (load_results.jtl, html-report/, evidences/)
│   │   ├── stress/ (stress_results.jtl, html-report/, evidences/)
│   │   ├── spike/ (spike_results.jtl, html-report/, evidences/)
│   │   └── endurance/ (endurance_results.jtl, html-report/, evidences/)
│   └── Bug Report/                          # 5 Báo cáo lỗi kỹ thuật chi tiết (BUG-PERF-001 -> 005)
├── Task2/
│   └── performance_analysis_report.md       # Phân tích log AI & bảng đối soát sai lệch
└── Task3/
    ├── continuous_performance_testing_pipeline.md  # Đề xuất Continuous Testing Pipeline (G9.6 Disrupt)
    ├── performance_baseline.json                   # Golden Baseline SLA tiêu chuẩn
    └── scripts/
        └── p95_regression_guard.py                 # Tool Python CLI tự động kiểm soát hồi quy CI/CD
```

---

## 5. Hướng Dẫn Tái Hiện & Thực Thi (Quick Reproduction Guide)

### 5.1. Khởi động Backend SUT
```bash
cd backend
npm install
npm start
```

### 5.2. Chạy kiểm thử hiệu năng qua CLI (Non-GUI JMeter)
```powershell
# Chạy Load Test
jmeter -n -t HW5/Task1/test-plans/23127148_Load_20260815.jmx -l HW5/Task1/results/load/load_results.jtl -e -o HW5/Task1/results/load/html-report/

# Chạy Stress Test
jmeter -n -t HW5/Task1/test-plans/23127148_Stress_20260815.jmx -l HW5/Task1/results/stress/stress_results.jtl -e -o HW5/Task1/results/stress/html-report/

# Chạy Spike Test
jmeter -n -t HW5/Task1/test-plans/23127148_Spike_20260815.jmx -l HW5/Task1/results/spike/spike_results.jtl -e -o HW5/Task1/results/spike/html-report/
```

### 5.3. Chạy công cụ phát hiện hồi quy tự động (Task 3 Regression Guard)
```powershell
# Kiểm tra tự động kết quả Load Test đối chiếu Golden Baseline
python HW5/Task3/scripts/p95_regression_guard.py --jtl HW5/Task1/results/load/load_results.jtl --baseline HW5/Task3/performance_baseline.json --scenario load

# Kiểm tra tự động kịch bản Spike Test (Sẽ cảnh báo FAIL do vượt ngưỡng P95 +20%)
python HW5/Task3/scripts/p95_regression_guard.py --jtl HW5/Task1/results/spike/spike_results.jtl --baseline HW5/Task3/performance_baseline.json --scenario load
```
