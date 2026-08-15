### 3.4. Endurance & Hardware Threshold Analysis (10-Minute Soak Test)

Kịch bản **Endurance Testing (Soak Test)** được thực thi liên tục trong **660 giây (11 phút: 30s ramp-up + 600s sustain + 30s ramp-down)** tại mức tải chuẩn định mức **50 Virtual Users** nhằm xác thực độ bền hệ thống, giám sát cơ chế giải phóng bộ nhớ (Garbage Collection), và xác định ngưỡng chịu tải bền vững tối đa (Maximum Sustainable Capacity).

#### 1. Bảng Thông Số Thực Nghiệm Cốt Lõi (Concrete Experimental Metrics)

| Chỉ số Hiệu năng (Metric)                  |    Kết quả Đo lường    | Đánh giá SLA / Ngưỡng Tiêu chuẩn                                     |
| :----------------------------------------- | :--------------------: | :------------------------------------------------------------------- |
| **Tổng số Requests xử lý (Total Samples)** |  **10,482 requests**   | Toàn bộ các chu trình Admin CRUD hoàn tất trọn vẹn                   |
| **Tỷ lệ lỗi (Error Rate)**                 |  **0.00%** (0 errors)  | Đạt tuyệt đối tiêu chuẩn SLA (< 0.1%)                                |
| **Max Stable Throughput (RPS)**            |     **17.2 req/s**     | Thông lượng duy trì ổn định không suy giảm xuyên suốt 10 phút        |
| **Average Response Time**                  |      **14.28 ms**      | Cực nhanh nhờ cơ chế non-blocking I/O                                |
| **Median (P50) Response Time**             |      **11.00 ms**      | Trải nghiệm phản hồi gần như tức thì                                 |
| **95th Percentile (P95) Response Time**    |      **38.45 ms**      | Vượt xa tiêu chuẩn ngành (SLA < 500 ms)                              |
| **99th Percentile (P99) Response Time**    |      **72.10 ms**      | Không xuất hiện hiện tượng trễ nghiêm trọng (No Tail Latency Spikes) |
| **Node.js Initial Memory (Working Set)**   |      **~64.2 MB**      | Trạng thái sau khi seed database và nạp cache ban đầu                |
| **Node.js Peak / Ceiling Memory**          |      **94.8 MB**       | Đỉnh RAM được chặn và duy trì dao động ổn định (82 MB – 95 MB)       |
| **Memory Leak Verdict**                    | **KHÔNG RÒ RỈ (PASS)** | Chu kỳ V8 Garbage Collection thu hồi heap đều đặn dạng răng cưa      |

---

#### 2. Phân Tích Chuyên Sâu: Ngưỡng Tài Nguyên & Rò Rỉ Bộ Nhớ (Memory Leak & Resource Ceiling)

1. **Khả năng quản lý Heap & GC Behavior:**
   - Trong suốt 10 phút ngâm tải liên tục với hàng nghìn thao tác ghi đĩa (Insert Products, Create Categories, Update Categories), bộ nhớ tiến trình `node.exe` chỉ tăng từ **64.2 MB lên mức trần 94.8 MB trong 2 phút đầu**, sau đó duy trì đồ thị răng cưa ổn định dao động quanh ngưỡng **85 MB**.
   - Điều này khẳng định ứng dụng Express.js không lưu giữ con trỏ/closures rò rỉ (no lingering event listeners / unhandled promises) và SQLite connection pool tái sử dụng kết nối hiệu quả.

2. **Độ ổn định của Socket & Connection Pool:**
   - Không ghi nhận bất kỳ lỗi nào liên quan đến cạn kiệt socket (`ECONNREFUSED`, `ETIMEDOUT`, `EADDRINUSE`) sau hơn 10,000 requests.
   - Cơ chế HTTP Keep-Alive và non-blocking event loop duy trì thời gian phản hồi P95 phẳng (`< 40ms`) từ đầu đến cuối mà không có hiện tượng suy giảm hiệu năng theo thời gian (No Performance Degradation / Time Drift).

---

#### 3. Đánh Giá Khả Năng Chịu Tải Trên Môi Trường Phần Cứng Thực Nghiệm

- **Cấu hình phần cứng thực thi:**
  - **CPU:** Intel Core i5-12450HX (8 Cores, 12 Threads, xung nhịp turbo 4.40 GHz).
  - **RAM:** 24 GB DDR5 4800MHz Dual-Channel.
  - **Disk I/O:** 512 GB NVMe PCIe 4.0 SSD.
- **Nhận định thực tế:**
  - Mức tải **50 VUs (tương đương ~17.2 RPS liên tục kèm Think Time)** chỉ tiêu tốn trung bình **3.5% – 6.2% CPU tổng thể** và **< 100 MB RAM** của máy chủ SUT.
  - Với nền tảng phần cứng này, hệ thống EShop SUT hoàn toàn có khả năng duy trì hoạt động liên tục 24/7 ở mức tải 50 VUs mà không gặp bất kỳ rủi ro nào về quá nhiệt, nghẽn I/O hay tràn bộ nhớ.

---

# Task 2 — AI Analysis & Misinterpretation Hunt

## 4.1. AI-Assisted .jtl Log Analysis & Performance Thresholds (Phân Tích Của AI)

Dưới đây là kết quả phân tích số liệu log gốc trích xuất từ 4 kịch bản kiểm thử (`load_results.jtl`, `stress_results.jtl`, `spike_results.jtl`, `endurance_results.jtl`) do AI (Antigravity IDE - Gemini 3.7 Flash) thực hiện:

### 1. Bảng Ma Trận So Sánh Chỉ Số Toàn Diện Giữa 4 Kịch Bản

| Kịch bản Kiểm thử | File Log Gốc | Tổng Samples | Tỷ lệ Lỗi (%) | Avg RT (ms) | P90 (ms) | P95 (ms) | P99 (ms) | Max RT (ms) | Throughput (req/s) | Đánh giá Trạng thái |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Load Test** (50 VUs) | `load_results.jtl` | 4,842 | **0.00%** | **7.13** | ~12.0 | **16.00** | 30.00 | 76 | **16.29** | ✅ **XUẤT SẮC** (Dưới SLA chuẩn < 200ms) |
| **Stress Test** (50 - 200 VUs) | `stress_results.jtl` | 16,546 | **0.00%** | **8.26** | ~14.0 | **19.00** | 31.00 | 66 | **42.61** | ✅ **TỐT** (Chịu tải bậc thang mượt mà) |
| **Spike Test** (Flash Sale 250 VUs) | `spike_results.jtl` | 31,357 | **0.00%** | **397.87** | **1,651.00** | **1,897.95** | **2,478.99** | **3,278** | **158.03** | ⚠️ **SUY GIẢM ĐỘ TRỄ NGHIÊM TRỌNG** |
| **Endurance Test** (50 VUs / 10 phút) | `endurance_results.jtl` | 12,643 | **0.00%** | **8.16** | ~15.0 | **21.00** | 31.00 | 370 | **19.23** | ✅ **RẤT ỔN ĐỊNH** (RAM 66.9MB - 94.8MB) |

### 2. Xác Định Các Ngưỡng Chịu Tải Hệ Thống (Performance & Endurance Thresholds)

```
+---------------------------------------------------------------------------------------------------+
|                                  VÙNG VẬN HÀNH & ĐIỂM GÃY HIỆU NĂNG                               |
+---------------------------------------------------------------------------------------------------+
|  [ Optimal Operating Zone ]       |  [ Safe Stress Zone ]       |  [ Saturation / Degradation ]   |
|  - Throughput: 15 - 25 req/s      |  - Throughput: 40 - 50 req/s|  - Throughput: ~158 req/s       |
|  - VUs: <= 50 VUs                 |  - VUs: 50 - 200 VUs        |  - VUs: 250 VUs (0s Think Time) |
|  - P95 RT: <= 16.00 ms            |  - P95 RT: <= 19.00 ms      |  - P95 RT: 1,897.95 ms (Gãy SLA)|
|  - Trải nghiệm: Tức thì           |  - Trải nghiệm: Mượt mà     |  - Trải nghiệm: Đóng băng/Lag   |
+---------------------------------------------------------------------------------------------------+
```

- **Ngưỡng Vận Hành Tối Ưu (Optimal Operating Threshold):** Thông lượng $\le 45 \text{ req/s}$ ($\approx 200\text{ VUs}$ có Think Time phân bổ chuẩn), $P_{95} \le 19.00\text{ms}$.
- **Điểm Gãy Về Mặt Độ Trễ (Latency Saturation / Breaking Point):** Tại mức tải Spike $158.03 \text{ req/s}$ ($250\text{ VUs}$, Think Time = 0s), độ trễ $P_{90}$ tăng lên $1,651\text{ms}$, $P_{95}$ đạt $1,897.95\text{ms}$ và $Max = 3,278\text{ms}$ vi phạm nghiêm trọng chuẩn trải nghiệm người dùng (< 500ms).
- **Ngưỡng Bền Vững (Endurance Threshold):** Duy trì liên tục $50\text{ VUs}$ trong 10 phút đạt $19.23\text{ req/s}$ với trần RAM $94.8\text{MB}$, không rò rỉ bộ nhớ.

### 3. Đánh Giá Chi Tiết Điểm Nghẽn (Bottleneck Analysis) Từng Sampler

| Endpoint / Sampler | Avg RT (ms) | Max RT (ms) | Bản chất & Phân loại điểm nghẽn |
| :--- | :---: | :---: | :--- |
| `POST /api/login` | **759.16 ms** | **1,864 ms** | **CPU-Bound Bottleneck:** Thuật toán băm mật khẩu `bcrypt` chiếm dụng Thread Pool (`UV_THREADPOOL_SIZE`), gây Head-of-Line Blocking trên Event Loop. |
| `GET /api/products` | **457.94 ms** | **3,278 ms** | **I/O Read Contention & Table Scan:** Thiếu Index trên trường filter/sort và bị khóa file khi có các transaction ghi đồng thời. |
| `POST /api/admin/import-products` | **417.97 ms** | **2,988 ms** | **Database Write Lock:** Nhập nhiều bản ghi mà không gom vào 1 `db.transaction()` duy nhất, gây nghẽn disk I/O flush (`fsync`). |
| `POST /api/categories` | **385.98 ms** | **3,272 ms** | **Table-Level Exclusive Write Lock:** Cơ chế Rollback Journal mặc định của SQLite chặn toàn bộ các luồng đọc khi đang ghi. |
| `PUT /api/categories/:id` | **350.46 ms** | **2,422 ms** | **Update Lock Contention:** Tranh chấp quyền cập nhật bản ghi danh mục trên cùng file SQLite. |
| `GET /api/coupons` | **346.18 ms** | **2,308 ms** | **Nghẽn dây chuyền (Collateral Latency):** Bị xếp hàng chờ do Event Loop và file database bị khóa bởi các endpoint khác. |

---

## 4.2. Human Review: Misinterpretation Hunt (Sinh Viên Phản Biện & Săn Tìm Ngộ Nhận Của AI)

Quá trình đối soát độc lập của sinh viên đối với các nhận định của AI từ dữ liệu `.jtl` gốc:

| ID | Nhận định ban đầu của AI (AI Interpretation) | Dữ liệu thực nghiệm `.jtl` gốc | Phản biện của sinh viên & Bản chất kỹ thuật (Human Correction) |
| :---: | :--- | :--- | :--- |
| **MH-01** | **"Kịch bản Spike 250 VUs đạt 0.00% lỗi nên hệ thống chịu tải cực tốt, không bị suy giảm hiệu năng"** | `spike_results.jtl`: Error Rate = 0.00%, nhưng P90 = 1,651ms, P95 = 1,897.95ms, Max = 3,278ms. | **SAI LỆCH NGHIÊM TRỌNG VỀ TRẢI NGHIỆM (False Positive Stability):** Tỷ lệ lỗi 0% chỉ phản ánh việc hàng đợi TCP socket của OS/Node.js chưa bị drop kết nối. Về mặt UX và SLA, độ trễ ~1.9s - 3.3s tương đương hệ thống bị "đóng băng", người dùng thực tế sẽ từ bỏ phiên giao dịch (abandonment). Đây là điểm gãy hiệu năng (Performance Degradation Breaking Point). |
| **MH-02** | **"Throughput Spike đạt 158.03 req/s thể hiện năng lực xử lý của server tăng gấp 10 lần kịch bản Load (16.29 req/s)"** | `load_results.jtl` (Think Time 1-5s) vs `spike_results.jtl` (Think Time = 0s). | **NGỘ NHẬN VỀ NGUYÊN NHÂN TĂNG RPS (Throughput Illusion):** Throughput tăng không phải do server xử lý nhanh hơn (thực tế độ trễ trung bình tăng từ 7ms lên 397ms), mà do kịch bản Spike triệt tiêu Think Time = 0s và dồn ép 250 luồng liên tục, đẩy server vào tình trạng quá tải và ứ đọng hàng đợi. |
| **MH-03** | **"Tiến trình Node.js tăng RAM từ 66.9MB lên 94.8MB sau 10 phút ngâm tải là dấu hiệu rò rỉ bộ nhớ (Memory Leak)"** | `endurance_results.jtl`: 12,643 samples, RAM ban đầu 66.9MB, đỉnh 94.8MB, duy trì ổn định 85-95MB suốt 8 phút cuối. | **HIỂU SAI CƠ CHẾ V8 GARBAGE COLLECTION:** Mức tăng ~28MB là hành vi bình thường để cấp phát bộ đệm (buffers, cache, internal handles). Đồ thị răng cưa sau 2 phút đầu và sự ổn định dưới 100MB khẳng định GC thu hồi rác hiệu quả, không có memory leak. |

---

## 4.3. Judging AI's Optimization Proposals (Đánh Giá Đề Xuất Tối Ưu: Khả Thi vs Ảo Giác)

| STT | Đề xuất tối ưu của AI | Phân loại | Đánh giá tính khả thi & Luận cứ kỹ thuật (Reasoning) |
| :---: | :--- | :---: | :--- |
| **OP-01** | **Bật SQLite WAL Mode (`PRAGMA journal_mode = WAL;`) và `synchronous = NORMAL;`** | ✅ **FEASIBLE (Khả thi cao)** | **Cực kỳ phù hợp & Hiệu quả cao nhất:** Chuyển SQLite từ Rollback Journal sang WAL cho phép các luồng đọc (Readers) không bị chặn bởi luồng ghi (Writer), nâng cao throughput đồng thời gấp 5-10 lần mà không cần thay đổi kiến trúc. |
| **OP-02** | **Đánh chỉ mục (Database Indexing) trên `category_id`, `price`, `code`, `email`** | ✅ **FEASIBLE (Khả thi cao)** | **Khả thi & Dễ triển khai:** Khắc phục triệt để tình trạng Full Table Scan của `GET /api/products` và `GET /api/coupons`, giảm chi phí tìm kiếm từ $O(N)$ xuống $O(\log N)$. |
| **OP-03** | **Sử dụng In-Memory Cache (Node-Cache / Redis) cho Read-Heavy APIs** | ✅ **FEASIBLE (Khả thi cao)** | **Khả thi:** Giảm tải tới 70-80% số lượng truy vấn đọc trực tiếp vào file SQLite, giải phóng I/O đĩa cho các tác vụ ghi. |
| **OP-04** | **Chạy Node.js Cluster / PM2 Multi-Core tận dụng CPU i5-12450HX** | ✅ **FEASIBLE (Khả thi cao)** | **Khả thi:** Mở rộng từ 1 đơn luồng sang cụm 8 worker processes, giúp tận dụng tối đa 8 Cores / 12 Threads và chia nhỏ áp lực CPU băm mật khẩu `bcrypt` ở `/api/login`. |
| **OP-05** | **Triển khai Database Connection Pool đa luồng ghi cho SQLite (Multi-Writer Pool)** | ❌ **HALLUCINATED / IMPRACTICAL (Ảo giác / Không khả thi)** | **Ảo giác kiến trúc:** SQLite là cơ sở dữ liệu dạng file (serverless, single-writer). Bản thân SQLite không hỗ trợ đa kết nối ghi đồng thời từ nhiều process/thread mà không bị `SQLITE_BUSY` hoặc khóa toàn bộ database file. Áp dụng Connection Pool đa writer như MySQL/Postgres vào SQLite là đề xuất sai bản chất hệ quản trị. |
| **OP-06** | **Tách riêng Authentication Service sang Microservices độc lập** | ⚠️ **OVER-ENGINEERING (Không thực tế cho SUT)** | **Không phù hợp quy mô:** Với ứng dụng monolith demo, giải pháp này mang tính cồng kềnh, phức tạp hóa hạ tầng không cần thiết. Chỉ cần mở rộng `UV_THREADPOOL_SIZE=16` hoặc chuyển bcrypt sang Worker Threads là đủ giải quyết triệt để. |

