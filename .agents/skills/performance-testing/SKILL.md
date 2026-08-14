---
name: performance-testing
description: >
  Execute performance testing workflow for EShop SUT using Apache JMeter.
  Covers test plan design (Load/Stress/Spike), CLI execution, .jtl log analysis,
  evidence collection, and Markdown report generation. Reusable across any
  endpoint group by providing a workflow definition.
---

# Performance Testing — Agent Skill

## Khi nào kích hoạt

Kích hoạt skill này khi người dùng yêu cầu bất kỳ điều nào sau đây:
- Thiết kế hoặc tạo kịch bản kiểm thử hiệu năng (Load, Stress, Spike, Endurance)
- Tạo file JMeter test plan (.jmx)
- Chạy JMeter và thu thập kết quả
- Phân tích file .jtl hoặc HTML report
- Viết báo cáo hiệu năng

## Yêu cầu tiên quyết

Trước khi bắt đầu, xác nhận các điều kiện sau:

1. **Java:** Chạy `java -version` — cần JDK/JRE ≥ 8
2. **JMeter:** Chạy `jmeter -v` — cần Apache JMeter ≥ 5.6 trên PATH
3. **Plugin Ultimate Thread Group:** Cần plugin Custom Thread Groups đã cài qua Plugins Manager
4. **Backend SUT:** Chạy `curl http://localhost:3000/api/products` — phải trả HTTP 200 với JSON array

Nếu bất kỳ điều kiện nào chưa đáp ứng, hướng dẫn người dùng cài đặt trước khi tiếp tục.

## Quy trình tổng thể

```
Bước 1: Thu thập thông tin workflow
Bước 2: Tạo cấu trúc thư mục và dữ liệu CSV
Bước 3: Sinh 3 file JMeter test plan (.jmx)
Bước 4: Smoke test (1 VU, 1 loop)
Bước 5: Chạy test chính thức (CLI non-GUI)
Bước 6: Thu thập evidence (hardware specs, Task Manager screenshots)
Bước 7: Phân tích kết quả .jtl
Bước 8: Sinh báo cáo hiệu năng Markdown
```

---

## Bước 1: Thu thập thông tin workflow

Hỏi người dùng hoặc đọc từ context để xác định:

| Thông tin cần thu thập | Mô tả |
|:---|:---|
| **Student ID** | Mã số sinh viên, dùng cho quy ước đặt tên file |
| **Output directory** | Thư mục chứa kết quả (ví dụ: `HW5/`, `perf-test/`,...). Ký hiệu: `{OUTPUT_DIR}` |
| **Vai trò / Câu chuyện** | Mô tả luồng nghiệp vụ mà VU sẽ mô phỏng |
| **Auth-heavy endpoint** | Endpoint xác thực (login, register,...) |
| **Read-heavy endpoints** | Các endpoint đọc dữ liệu (GET) |
| **Transactional endpoints** | Các endpoint ghi dữ liệu (POST/PUT/DELETE) |
| **Tài khoản test** | Email và password dùng cho VU |
| **Phân bổ tải (%)** | Tỷ lệ % giữa Read / Write / Other |
| **Ngày test (YYYYMMDD)** | Để đặt tên file theo quy ước |

Tham khảo file `references/workload-model.md` để lấy thông số mặc định nếu người dùng không chỉ định.

---

## Bước 2: Tạo cấu trúc thư mục và dữ liệu

Tạo cấu trúc trong thư mục `{OUTPUT_DIR}` do người dùng chỉ định:

```
{OUTPUT_DIR}/
├── test-plans/           # 3 file .jmx (Load, Stress, Spike)
├── test-data/            # File CSV cho data-driven test
├── results/
│   ├── load/             # load.jtl + html-report/
│   ├── stress/           # stress.jtl + html-report/
│   ├── spike/            # spike.jtl + html-report/
│   └── endurance/        # endurance.jtl + html-report/
├── evidence/             # Screenshots Task Manager, hardware specs
├── README.md
└── performance_report.md
```

> Người dùng có thể thêm các thư mục phụ tuỳ yêu cầu bài tập (AI Submission, Bug Report,...).

Tạo file CSV phù hợp với workflow đã thu thập ở Bước 1:
- `users.csv`: Chứa email và password của tài khoản test
- Các file CSV bổ sung tuỳ theo endpoint (ví dụ: categories.csv, products.csv)

---

## Bước 3: Sinh 3 file JMeter test plan (.jmx)

### Quy ước đặt tên

```
{StudentID}_{ScenarioType}_{YYYYMMDD}.jmx
```

Ví dụ: `23127148_Load_20260815.jmx` — thay `{StudentID}` bằng MSSV thực tế.

### Cấu trúc chung của mỗi test plan

```
Test Plan
├── HTTP Request Defaults (localhost:3000, http, UTF-8)
├── HTTP Header Manager (Content-Type: application/json)
├── CSV Data Set Config (cho mỗi file CSV)
├── Ultimate Thread Group (cấu hình tuỳ kịch bản)
│   ├── HTTP Request: Login
│   │   ├── JSON Extractor: Extract JWT token ($.token)
│   │   └── Assertion: Token exists
│   ├── Header Manager: Authorization = Bearer ${token}
│   ├── ThroughputController: Read-heavy (60%)
│   │   ├── Timer (Think Time)
│   │   └── HTTP Requests cho các read endpoints
│   ├── ThroughputController: Transactional-A (25%)
│   │   ├── Timer (Think Time)
│   │   └── HTTP Requests (POST/PUT với JSON Extractor cho ID động)
│   └── ThroughputController: Transactional-B (15%)
│       ├── Timer (Think Time)
│       └── HTTP Requests
├── Response Assertion — HTTP 200
└── Listener (khác nhau cho mỗi kịch bản)
```

### Cấu hình 3 kịch bản

**Load Test:**
- Ultimate Thread Group: 50 VUs, ramp-up 60s, hold 180s, ramp-down 60s
- Think Time: Uniform Random Timer (tuỳ action: 1-3s, 2-5s, 2-4s)
- Listener: **Summary Report**

**Stress Test:**
- Ultimate Thread Group bậc thang (tìm breaking point):

  | Start Threads | Initial Delay | Startup Time | Hold Load | Shutdown Time |
  |---:|---:|---:|---:|---:|
  | 50 | 0 | 30 | 60 | 0 |
  | 100 | 90 | 30 | 60 | 0 |
  | 150 | 180 | 30 | 60 | 0 |
  | 200 | 270 | 30 | 60 | 30 |

- Listener: **Aggregate Report**

**Spike Test:**
- Ultimate Thread Group (đột biến Flash Sale):

  | Start Threads | Initial Delay | Startup Time | Hold Load | Shutdown Time |
  |---:|---:|---:|---:|---:|
  | 20 | 0 | 30 | 30 | 0 |
  | 250 | 60 | 10 | 30 | 10 |
  | 20 | 110 | 0 | 60 | 30 |

- Think Time: **0 giây** (mô phỏng tranh mua)
- Listener: **View Results Tree** (disable khi chạy thật)

### Lưu ý quan trọng khi sinh .jmx

- Dùng `HttpClient4` cho implementation
- POST body dùng `postBodyRaw = true` với JSON string
- JSON Extractor cho ID động: đặt `match_numbers = 1`, `defaultValues = NOT_FOUND`
- Assertion `JSONPathAssertion` để validate response structure
- **3 Listener khác nhau** cho 3 kịch bản (yêu cầu đề bài)

---

## Bước 4: Smoke test

Trước khi chạy test thật, chạy smoke test với **1 VU, 1 Loop**:

1. Mở JMeter GUI: `jmeter`
2. Mở file .jmx vừa tạo
3. Đổi Ultimate Thread Group: 1 thread, ramp 0, hold 10s, shutdown 0
4. Chạy và kiểm tra tất cả HTTP request trả 200
5. Kiểm tra JSON Extractor lấy được token và ID động
6. Nếu có lỗi, debug và sửa .jmx trước khi tiếp tục

---

## Bước 5: Chạy test chính thức

Chạy bằng CLI non-GUI để tối ưu tài nguyên máy:

```powershell
# Load Test
jmeter -n -t {OUTPUT_DIR}/test-plans/{StudentID}_Load_{DATE}.jmx `
       -l {OUTPUT_DIR}/results/load/load.jtl `
       -e -o {OUTPUT_DIR}/results/load/html-report

# Restart backend giữa các lượt (reset DB + lockout)

# Stress Test
jmeter -n -t {OUTPUT_DIR}/test-plans/{StudentID}_Stress_{DATE}.jmx `
       -l {OUTPUT_DIR}/results/stress/stress.jtl `
       -e -o {OUTPUT_DIR}/results/stress/html-report

# Restart backend

# Spike Test
jmeter -n -t {OUTPUT_DIR}/test-plans/{StudentID}_Spike_{DATE}.jmx `
       -l {OUTPUT_DIR}/results/spike/spike.jtl `
       -e -o {OUTPUT_DIR}/results/spike/html-report
```

**Quan trọng:** Giữa mỗi lần chạy, restart backend (`node server.js`) để:
- Reset `login_attempts` và `locked_until` (tránh bị lockout)
- Reset dữ liệu DB về trạng thái seed ban đầu

---

## Bước 6: Thu thập evidence

1. **Hardware specs:**
   ```powershell
   systeminfo > {OUTPUT_DIR}/evidence/systeminfo.txt
   ```
   Hoặc chạy `dxdiag` và chụp screenshot

2. **Task Manager screenshots:**
   Trong lúc mỗi test chạy, chụp screenshot sao cho thấy **đồng thời**:
   - Terminal JMeter đang chạy
   - Task Manager tab Processes → `node.exe` (CPU, Memory, Disk, Network)

   Lưu vào:
   - `{OUTPUT_DIR}/evidence/load_taskmanager.png`
   - `{OUTPUT_DIR}/evidence/stress_taskmanager.png`
   - `{OUTPUT_DIR}/evidence/spike_taskmanager.png`

3. **Endurance test (10-15 phút):** (tuỳ chọn nhưng nên làm)
   Copy Load test, đổi `hold_load_sec` thành 600-900, chạy và ghi nhận:
   - Max stable RPS (Throughput ổn định suốt test)
   - Memory ceiling (đỉnh RAM của node.exe)

---

## Bước 7: Phân tích kết quả .jtl

### Đọc file .jtl

File `.jtl` là CSV với các cột chính:
```
timeStamp,elapsed,label,responseCode,responseMessage,threadName,success,bytes,grpThreads,allThreads,URL,Latency,IdleTime,Connect
```

### Các chỉ số cần tính

| Chỉ số | Cách tính | Ý nghĩa |
|:---|:---|:---|
| **Total Samples** | Đếm số dòng (trừ header) | Tổng request đã gửi |
| **Error Rate** | (Số dòng `success=false` / Total) × 100 | Tỷ lệ lỗi |
| **Avg Response Time** | Trung bình cột `elapsed` | Thời gian phản hồi TB |
| **p50 (Median)** | Percentile 50 của `elapsed` | Trải nghiệm người dùng trung bình |
| **p90** | Percentile 90 của `elapsed` | Trải nghiệm đại đa số |
| **p95** | Percentile 95 của `elapsed` | Ngưỡng SLA phổ biến |
| **p99** | Percentile 99 của `elapsed` | Worst-case (loại trừ outlier) |
| **Throughput** | Total Samples / (Thời gian test tính bằng giây) | Năng lực xử lý (RPS) |

### Phân tích theo sampler

Nhóm các dòng theo cột `label` và tính riêng chỉ số cho từng sampler:
- Login, Get Products, Get Coupons, Create Category, Update Category, Import Products

### So sánh 3 kịch bản

| Chỉ số | Load | Stress | Spike |
|:---|:---|:---|:---|
| Total Samples | | | |
| Error Rate | | | |
| Avg Response Time | | | |
| p95 | | | |
| Throughput (RPS) | | | |

### Xác định breaking point

- Stress test: Tại mốc VU nào Error Rate > 5% hoặc p95 > 5000ms?
- Spike test: Hệ thống có phục hồi sau đỉnh tải không? (Error Rate trở về < 1% sau spike)

---

## Bước 8: Sinh báo cáo phân tích hiệu năng (Performance Test Report)

Tạo file `{OUTPUT_DIR}/performance_report.md` với cấu trúc báo cáo kỹ thuật tiêu chuẩn:

```markdown
# Performance Testing & Log Analysis Report

## 1. Executive Summary
- **Target System (SUT):** Thông tin hệ thống kiểm thử
- **Endpoint Group:** Danh sách API endpoints được kiểm thử
- **Execution Date & Hardware:** Môi trường và thời gian thực thi
- **Overall Verdict:** Tóm tắt kết quả (Pass/Fail theo SLA)

## 2. Workload Model & Scenario Profiles
- **Transaction Distribution:** Tỷ lệ phân bổ giữa các API
- **Think Time:** Cấu hình thời gian nghỉ giữa các thao tác
- **Test Scenarios:** Cấu hình chi tiết cho Load, Stress, Spike và Soak/Endurance

## 3. Execution Results & Metrics Analysis
- **Throughput & Error Rate:** Bảng so sánh RPS và % lỗi qua các kịch bản
- **Response Time Distribution:** Bảng chi tiết Average, p50, p90, p95, p99
- **Per-Sampler Breakdown:** Phân tích độ trễ của từng endpoint riêng lẻ
- **Endurance & Stability:** Ngưỡng chịu tải ổn định tối đa (Max Stable RPS, Memory ceiling)

## 4. Bottleneck & Log Analysis
- **Breaking Point Analysis:** Phân tích điểm gãy của hệ thống dưới tải cao
- **Resource Utilization:** Đánh giá mức độ tiêu thụ CPU, RAM, Disk I/O của tiến trình backend
- **Error Log Classification:** Phân loại các mã lỗi HTTP (4xx, 5xx, timeouts)

## 5. Performance Insights & Recommendations
- **Identified Bottlenecks:** Các điểm nghẽn hiệu năng phát hiện được
- **Optimization Proposals:** Các đề xuất tối ưu hóa kiến trúc, database, caching kèm đánh giá mức độ khả thi
```

---

## Git commit sau mỗi bước chính

Thực hiện commit rõ ràng theo chuẩn Conventional Commits sau khi hoàn thành mỗi mốc công việc:
```bash
git add <các file đã thay đổi>
git commit -m "feat(perf): <mô tả ngắn gọn công việc hoàn thành>"
```

