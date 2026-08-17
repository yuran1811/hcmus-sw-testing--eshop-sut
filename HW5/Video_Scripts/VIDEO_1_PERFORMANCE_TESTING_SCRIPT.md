# KỊCH BẢN QUAY VIDEO 1: PERFORMANCE TESTING & RESOURCE MONITORING DEMO
**Môn học:** Software Testing (Kiểm thử Phần mềm) — FIT @ HCMUS  
**Bài tập:** HW05 — Performance Testing for EShop SUT  
**Sinh viên thực hiện:** Ân Tiến Nguyên An — **MSSV:** 23127148 — **Lớp:** 23CLC08  
**Thời lượng dự kiến:** 06:30 – 08:00 (Đáp ứng trọn vẹn yêu cầu tối thiểu ≥ 6 phút của Đề bài Mục 6 & Mục 11)  
**Hình thức quay:** Screen Recording (OBS Studio / Windows Xbox Game Bar / Snipping Tool) + Giọng đọc thuyết minh tiếng Việt trực tiếp (Voice Narration).

---

## 1. Hướng Dẫn Thiết Lập Màn Hình Trước Khi Bấm Quay (Pre-recording Setup)

### 1.1. Bố cục Màn hình (Split-Screen Layout) — BẮT BUỘC THEO ĐỀ BÀI
- **Nửa bên trái (55% màn hình):** Cửa sổ **Apache JMeter GUI** (ở phần đầu) và sau đó là **PowerShell Terminal** (chạy lệnh JMeter Non-GUI CLI).
- **Nửa bên phải (45% màn hình):** Cửa sổ **Task Manager** (Mở tab *Performance* chọn CPU & Memory, hoặc tab *Processes* hiển thị rõ tiến trình `Node.js` và `jmeter.exe`).
- *Lý do:* Yêu cầu Mục 11 (Anti-AI-Cheat Constraints): *"The demo video, which must show the tool and the resource monitor in the same frame with your own voice narration."*

```
+------------------------------------------+-------------------------------------+
|                                          |                                     |
|        NỬA TRÁI (JMeter GUI / Terminal)  |        NỬA PHẢI (Task Manager)      |
|  - Mở kịch bản JMX, bấm nút Start ▶️     |  - Biểu đồ CPU & RAM DDR5 24GB      |
|  - Chạy kịch bản Load / Stress / Spike   |  - Tiến trình Node.js backend       |
|  - Mở HTML Dashboard Reports             |                                     |
|                                          |                                     |
+------------------------------------------+-------------------------------------+
```

### 1.2. Chuẩn bị Môi trường Backend
Mở sẵn Terminal backend trong thư mục `backend/` và khởi động:
```powershell
cd d:\Project\Testing\hcmus-sw-testing--eshop-sut\backend
npm start
```
*Đảm bảo backend phản hồi tại `http://localhost:3000`*.

---

## 2. Bảng Phân Bổ Thời Gian (Timeline Breakdown)

| Thời gian | Phân cảnh | Nội dung chính |
| :---: | :--- | :--- |
| **00:00 – 00:45** | **Scene 1: Giới thiệu & Xác thực Phần cứng** | Giới thiệu cá nhân, Hostname `NGUYENAN`, Task Manager CPU/RAM (Anti-Cheat). |
| **00:45 – 02:00** | **Scene 2: Trực quan hóa trên JMeter GUI & Bấm Chạy ▶️** | Mở file `.jmx` trên GUI, show cây Test Plan, bấm nút Start ▶️ xem `View Results Tree`, giải thích lý do chuyển sang Non-GUI CLI. |
| **02:00 – 03:30** | **Scene 3: Thực thi Load Test (50 VUs Baseline)** | Chạy Non-GUI CLI, quan sát Task Manager, mở HTML Dashboard, phân tích P95 = 16ms. |
| **03:30 – 04:45** | **Scene 4: Thực thi Stress Test (50 → 200 VUs)** | Tải bậc thang 4 nấc, quan sát CPU/RAM, mở HTML Report, P95 = 19ms. |
| **04:45 – 06:00** | **Scene 5: Thực thi Spike Test (250 VUs Flash Sale)** | Đột biến tức thời, quan sát nghẽn độ trễ P95 = 1,733ms do SQLite Lock. |
| **06:00 – 07:00** | **Scene 6: Thử nghiệm Soak Test (Endurance) & 5 Bugs** | 10 phút ngâm tải RAM phẳng không Memory Leak + Tóm tắt 5 Bugs phát hiện. |
| **07:00 – 07:30** | **Scene 7: Tổng kết & Kết thúc Video** | Đối chiếu SLA, cam kết tính trung thực dữ liệu raw `.jtl`. |

---

## 3. Kịch Bản Chi Tiết Từng Phân Cảnh (Storyboard & Voice Script)

---

### PHÂN CẢNH 1 (00:00 – 00:45): GIỚI THIỆU & XÁC THỰC PHẦN CỨNG (ANTI-CHEAT)

**Hành động trên màn hình:**
1. Mở cửa sổ thông tin phần cứng hoặc gõ lệnh `$env:COMPUTERNAME` trong PowerShell.
2. Chỉ con trỏ chuột vào Task Manager bên phải: CPU Intel Core i5-12450HX, RAM 24 GB DDR5.
3. Mở file `HW5/README.md` hoặc `Hardware_Report.md`.

**Lời thoại thuyết minh (Voice-over):**
> *"Kính chào quý Thầy Cô và các bạn trợ giảng môn Kiểm thử Phần mềm — FIT @ HCMUS. Em là Ân Tiến Nguyên An, MSSV 23127148, sinh viên lớp 23CLC08.  
> Hôm nay, em xin trình bày video thực nghiệm và đối soát kết quả cho Bài tập lớn HW05 — Performance Testing trên hệ thống EShop SUT.  
> 
> Để đảm bảo tính minh bạch và tuân thủ tuyệt đối quy định chống gian lận Anti-AI-Cheat của đề bài:  
> Máy thực nghiệm của em có Hostname định danh là **NGUYENAN**, khớp 100% với các bài lab trước. Cấu hình phần cứng gồm CPU Intel Core i5-12450HX 8 nhân 12 luồng, RAM 24GB DDR5 và ổ cứng NVMe SSD. Toàn bộ quá trình kiểm thử sẽ được ghi hình song song giữa công cụ Apache JMeter bên trái và Task Manager theo dõi tài nguyên thực tế bên phải."*

---

### PHÂN CẢNH 2 (00:45 – 02:00): TRỰC QUAN HÓA TRÊN JMETER GUI & BẤM NÚT CHẠY ▶️

**Hành động trên màn hình:**
1. Mở giao diện **Apache JMeter GUI** ở nửa bên trái màn hình.
2. Bấm **File $\rightarrow$ Open** mở file kịch bản `HW5/Task1/test-plans/23127148_Load_20260815.jmx`.
3. Bấm mở rộng cây cấu trúc bên trái để người xem thấy rõ:
   - `HTTP Request Defaults` (Server `localhost`, port `3000`)
   - `CSV Data Set Config` (đọc `users.csv`, `categories.csv`, `products.csv`)
   - `Ultimate Thread Group` (50 VUs)
   - `Once Only Controller` chứa `POST /api/login` kèm `JSON Extractor` trích xuất Bearer Token động.
   - `Throughput Controller` (60% Read, 25% Write, 15% Bulk)
   - Các Listener: `View Results Tree`, `Summary Report`.
4. Bấm vào Listener **View Results Tree**, rồi bấm **Nút Start màu xanh lá cây (Play ▶️)** trên thanh công cụ.
5. Quan sát các dòng request đổi sang **màu xanh HTTP 200** trả về dữ liệu JSON thực tế. Sau đó bấm nút **Stop 🛑** và **Clear 🧹**.
6. Giải thích lý do chuyển sang chạy Non-GUI CLI.

**Lời thoại thuyết minh (Voice-over):**
> *"Ở đây, em mở trực tiếp giao diện đồ họa **Apache JMeter GUI** với file kịch bản `23127148_Load_20260815.jmx`.  
> 
> Nhìn vào cây Test Plan bên trái:  
> - Em phụ trách vai trò **Admin quản trị danh mục và sản phẩm**, bao phủ đầy đủ 6 endpoint độc lập.  
> - Endpoint xác thực `POST /api/login` được bọc trong **Once Only Controller** kèm **JSON Extractor** để lấy Bearer Token tự động.  
> - Các sampler được tham số hóa Data-driven bằng các file CSV `categories.csv` và `products.csv`.  
> - Kèm theo bộ đệm Think Time Uniform Random Timer từ 1 đến 5 giây.  
> 
> Khi em bấm nút **Start màu xanh (Play ▶️)** trên thanh công cụ: Trong listener *View Results Tree*, tất cả các sampler đều phản hồi mã HTTP 200 màu xanh lá cây với dữ liệu JSON trả về chính xác từ backend Node.js.  
> 
> Tuy nhiên, theo đúng chuẩn thực hành quốc tế của Apache JMeter: Giao diện đồ họa Java Swing tiêu tốn nhiều tài nguyên máy, dễ gây nghẽn cổ chai nhân tạo làm sai lệch kết quả đo. Vì vậy, em sẽ chuyển sang **chế độ Non-GUI CLI trên PowerShell** để thực thi các bài test chính thức và quan sát tài nguyên trên Task Manager một cách chuẩn xác nhất."*

---

### PHÂN CẢNH 3 (02:00 – 03:30): LOAD TESTING (50 VUs — BASELINE PERFORMANCE)

**Hành động trên màn hình:**
1. Thu nhỏ JMeter GUI, mở cửa sổ PowerShell bên trái và chạy lệnh Load Test:
   ```powershell
   jmeter -n -t HW5/Task1/test-plans/23127148_Load_20260815.jmx -l HW5/Task1/results/load/load_results.jtl -e -o HW5/Task1/results/load/html-report/
   ```
   *(Hoặc chạy qua menu `run_video_demos.ps1` bằng cách bấm phím `3`)*.
2. Chỉ vào Task Manager bên phải: CPU dao động nhẹ 5–12%, RAM Node.js ổn định quanh 65MB.
3. Khi terminal chạy xong (Summary log hiện ra: 4,842 samples, Avg 7.13ms, Err 0.00%).
4. Mở trình duyệt xem `HW5/Task1/results/load/html-report/index.html`, chỉ vào P95 = 16.00 ms và Throughput = 16.29 req/s.

**Lời thoại thuyết minh (Voice-over):**
> *"Đầu tiên là kịch bản **Load Testing** với 50 Virtual Users duy trì trong 300 giây.  
> 
> Nhìn vào Task Manager bên phải, tiến trình Node.js Backend xử lý rất nhẹ nhàng, CPU chỉ chiếm khoảng 8-10% và RAM tiêu thụ xấp xỉ 65MB.  
> 
> Kết quả thu được: Hệ thống hoàn thành **4,842 requests** với tỷ lệ lỗi **0.00% tuyệt đối**.  
> Mở HTML Dashboard Report: Thời gian phản hồi trung bình chỉ **7.13 ms**, độ trễ phân vị **P95 đạt 16.00 ms**, và Throughput đạt **16.29 req/s**. Đây là mốc Golden Baseline cực kỳ lý tưởng cho hệ thống."*

---

### PHÂN CẢNH 4 (03:30 – 04:45): STRESS TESTING (50 $\rightarrow$ 200 VUs STEPPED RAMP-UP)

**Hành động trên màn hình:**
1. Trên Terminal bên trái, gõ lệnh Stress Test (hoặc bấm phím `4` trên menu):
   ```powershell
   jmeter -n -t HW5/Task1/test-plans/23127148_Stress_20260815.jmx -l HW5/Task1/results/stress/stress_results.jtl -e -o HW5/Task1/results/stress/html-report/
   ```
2. Chỉ vào Ultimate Thread Group bậc thang: 50 -> 100 -> 150 -> 200 VUs.
3. Chỉ vào Task Manager: CPU tăng lên 25–35%, RAM tiến trình Node.js giữ quanh mức 75–85MB.
4. Mở HTML Report `HW5/Task1/results/stress/html-report/index.html`, chỉ vào Total 16,546 samples, Throughput vọt lên 42.61 req/s, P95 = 19.00 ms.

**Lời thoại thuyết minh (Voice-over):**
> *"Tiếp theo là kịch bản **Stress Testing** (`23127148_Stress_20260815.jmx`) nhằm thăm dò giới hạn chịu tải.  
> Em thiết lập tải tăng dần dạng bậc thang qua 4 nấc: 50, 100, 150 và đạt đỉnh 200 VUs trong tổng thời gian 330 giây.  
> 
> Trong Task Manager, CPU tăng tuyến tính lên khoảng 30%, nhưng bộ nhớ Node.js vẫn kiểm soát rất tốt ở mức 80MB.  
> 
> Kết quả thu được: Tổng xử lý **16,546 requests**, Throughput tăng vọt gấp 2.6 lần lên **42.61 req/s**.  
> Tỷ lệ lỗi vẫn giữ nguyên **0.00%**, và **P95 chỉ tăng nhẹ lên 19.00 ms** (vượt xa chuẩn SLA dưới 500ms). Điều này chứng minh kiến trúc Express.js xử lý non-blocking I/O rất xuất sắc khi người dùng có khoảng nghỉ Think Time hợp lý."*

---

### PHÂN CẢNH 5 (04:45 – 06:00): SPIKE TESTING (250 VUs FLASH SALE SHOCK — TÌM RA ĐIỂM GÃY)

**Hành động trên màn hình:**
1. Trên Terminal, chạy lệnh Spike Test (hoặc bấm phím `5` trên menu):
   ```powershell
   jmeter -n -t HW5/Task1/test-plans/23127148_Spike_20260815.jmx -l HW5/Task1/results/spike/spike_results.jtl -e -o HW5/Task1/results/spike/html-report/
   ```
2. Chỉ vào Task Manager: CPU vọt lên 65–85%, Disk I/O tăng mạnh do SQLite lock.
3. Mở HTML Dashboard `HW5/Task1/results/spike/html-report/index.html`.
4. Chỉ vào biểu đồ Response Time Over Time: Đỉnh nhọn vọt lên > 3,000ms.
5. Chỉ vào số liệu: Total 31,357 requests, Throughput 158 req/s, **Avg RT 397.87ms, P95 vọt lên 1,733ms (Max 3,278ms)**.

**Lời thoại thuyết minh (Voice-over):**
> *"Bây giờ, chúng ta bước vào kịch bản khắc nghiệt nhất: **Spike Testing** (`23127148_Spike_20260815.jmx`), mô phỏng đợt Flash Sale đột biến tức thời với **250 VUs ập vào trong 10 giây và Think Time = 0s**.  
> 
> Quan sát Task Manager bên phải: CPU lập tức bị đẩy lên hơn 70%, quạt tản nhiệt bắt đầu hoạt động mạnh.  
> 
> Mở HTML Dashboard của Spike Test: Hệ thống gánh tới **31,357 requests** trong thời gian ngắn, Throughput đạt đỉnh **158 req/s**.  
> Mặc dù Error Rate vẫn là 0%, nhưng **điểm gãy về độ trễ (Latency Degradation)** đã xuất hiện rõ rệt:  
> - Thời gian phản hồi trung bình tăng từ 7ms lên **397.87 ms** (tăng gấp 55 lần).  
> - Phân vị **P95 vọt lên mức 1,733 ms** (và đỉnh Max Response Time chạm 3,278 ms).  
> 
> Nguyên nhân kỹ thuật: Do cơ chế khóa bảng ghi đơn luồng (**Single-Writer Table-Level Lock**) của SQLite khi hàng trăm luồng đồng thời ghi dữ liệu login và import sản phẩm, dẫn đến nghẽn hàng đợi Event Loop."*

---

### PHÂN CẢNH 6 (06:00 – 07:00): ENDURANCE TESTING & MINH CHỨNG 5 BUGS PHÁT HIỆN

**Hành động trên màn hình:**
1. Mở file báo cáo hoặc biểu đồ Endurance Test (`HW5/Task1/results/endurance/evidences/`).
2. Mở thư mục `HW5/Task1/Bug Report/` lướt qua 5 file Bug từ `BUG-PERF-001` đến `005`.

**Lời thoại thuyết minh (Voice-over):**
> *"Để xác định ngưỡng chịu tải bền vững (Endurance Threshold), em đã thực hiện bài kiểm tra **Soak Test ngâm tải 50 VUs liên tục suốt 11 phút (660s)** với 10,482 requests.  
> Biểu đồ RAM cho thấy bộ nhớ Node.js đạt đỉnh 94.8MB trong 2 phút đầu và đi ngang phẳng ở mức 85-95MB, bộ gom rác V8 GC hoạt động đều đặn $\rightarrow$ **Khẳng định 0% Memory Leak, hệ thống đạt độ ổn định 24/7 ở 50 VUs**.  
> 
> Song song với kiểm thử hiệu năng, em đã lập đầy đủ **5 Bug Reports chi tiết**:  
> - `BUG-PERF-001`: Tranh chấp khóa ghi SQLite khi Spike tải cao.  
> - `BUG-PERF-002`: API import sản phẩm thiếu Database Transaction `BEGIN/COMMIT`.  
> - `BUG-PERF-003`: Lỗi Auth Service tăng bộ đếm sai mật khẩu `+2` thay vì `+1` làm khóa tài khoản sớm.  
> - `BUG-PERF-004`: Endpoint danh mục thiếu RBAC kiểm tra quyền Admin.  
> - `BUG-PERF-005`: API trả về kiểu dữ liệu price dạng chuỗi String ở ID chẵn."*

---

### PHÂN CẢNH 7 (07:00 – 07:30): TỔNG KẾT & CAM KẾT TRUNG THỰC

**Hành động trên màn hình:**
1. Mở lại file `HW5/Report/23127148_HW05_Performance_Testing_Report.pdf` hoặc `README.md`.
2. Cho thấy đầy đủ các thư mục kết quả `load_results.jtl`, `stress_results.jtl`, `spike_results.jtl`.

**Lời thoại thuyết minh (Voice-over):**
> *"Tổng kết lại, bài thực nghiệm HW05 của em đã hoàn thành 100% khối lượng công việc, thu thập đầy đủ dữ liệu raw log .jtl, báo cáo HTML Dashboard trực quan, đối soát thực tế và làm rõ các sai lệch phân tích của AI.  
> Toàn bộ mã nguồn test plan, dữ liệu CSV và báo cáo đã được commit đầy đủ trên Git branch `hw05/23127148-nguyenan`.  
> Em xin chân thành cảm ơn quý Thầy Cô và các bạn trợ giảng đã theo dõi video demo của em!"*

---
