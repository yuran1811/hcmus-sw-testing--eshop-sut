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
