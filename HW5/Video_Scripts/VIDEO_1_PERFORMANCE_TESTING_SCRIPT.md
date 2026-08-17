# KỊCH BẢN QUAY VIDEO 1: PERFORMANCE TESTING & RESOURCE MONITORING DEMO (100% JMETER GUI)
**Môn học:** Software Testing (Kiểm thử Phần mềm) — FIT @ HCMUS  
**Bài tập:** HW05 — Performance Testing for EShop SUT  
**Sinh viên thực hiện:** Ân Tiến Nguyên An — **MSSV:** 23127148 — **Lớp:** 23CLC08  
**Thời lượng dự kiến:** 06:30 – 07:30 (Đáp ứng trọn vẹn yêu cầu tối thiểu ≥ 6 phút của Đề bài Mục 6 & Mục 11)  
**Hình thức quay:** Screen Recording (Snipping Tool / Xbox Game Bar / OBS) + Thuyết minh giọng đọc tiếng Việt trực tiếp.

---

## 1. Hướng Dẫn Thiết Lập Màn Hình Trước Khi Bấm Quay (Pre-recording Setup)

### 1.1. Bố cục Màn hình (Split-Screen Layout) — BẮT BUỘC THEO ĐỀ BÀI
- **Nửa bên trái (55% màn hình):** Cửa sổ phần mềm **Apache JMeter GUI** (mở sẵn các file `.jmx`, bấm nút Start ▶️ và xem các bảng kết quả *View Results Tree*, *Summary Report*, *Aggregate Report*).
- **Nửa bên phải (45% màn hình):** Cửa sổ **Task Manager** (Mở tab *Performance* chọn CPU & Memory, hoặc tab *Processes* hiển thị rõ tiến trình `Node.js` và `jmeter.exe`).
- *Lý do:* Yêu cầu Mục 11 (Anti-AI-Cheat Constraints): *"The demo video, which must show the tool and the resource monitor in the same frame with your own voice narration."*

```
+------------------------------------------+-------------------------------------+
|                                          |                                     |
|        NỬA TRÁI (Apache JMeter GUI)      |        NỬA PHẢI (Task Manager)      |
|  - Cây Test Plan, Sampler, CSV Config    |  - Biểu đồ sóng CPU & RAM DDR5      |
|  - Bấm nút Start ▶️ màu xanh lá cây      |  - Tiến trình Node.js backend       |
|  - Bảng kết quả Summary / Aggregate      |                                     |
|                                          |                                     |
+------------------------------------------+-------------------------------------+
```

### 1.2. Chuẩn bị Môi trường Backend
Mở sẵn Terminal phụ chạy ngầm backend:
```powershell
cd d:\Project\Testing\hcmus-sw-testing--eshop-sut\backend
npm start
```
*Đảm bảo backend đang chạy tại `http://localhost:3000`*.

---

## 2. Bảng Phân Bổ Thời Gian (Timeline Breakdown)

| Thời gian | Phân cảnh | Nội dung chính |
| :---: | :--- | :--- |
| **00:00 – 00:45** | **Scene 1: Giới thiệu & Xác thực Phần cứng** | Giới thiệu bản thân, Hostname `NGUYENAN`, Task Manager CPU/RAM (Anti-Cheat). |
| **00:45 – 02:00** | **Scene 2: Giới thiệu Kịch bản & Chạy Thử trên GUI** | Mở `23127148_Load_20260815.jmx`, giải thích 6 endpoint Admin, bấm Start ▶️ xem `View Results Tree`. |
| **02:00 – 03:30** | **Scene 3: Chạy Load Test (50 VUs Baseline)** | Bấm Start ▶️ trên GUI, xem bảng `Summary Report`, nhìn Task Manager, mở HTML Dashboard (P95 = 16ms). |
| **03:30 – 04:45** | **Scene 4: Chạy Stress Test (50 → 200 VUs)** | Mở file Stress, bấm Start ▶️ xem `Aggregate Report` bậc thang, nhìn Task Manager, mở HTML Report (P95 = 19ms). |
| **04:45 – 06:00** | **Scene 5: Chạy Spike Test (250 VUs Flash Sale)** | Mở file Spike, bấm Start ▶️, quan sát Task Manager CPU vọt 70%, mở HTML Dashboard phân tích P95 = 1,733ms do SQLite Lock. |
| **06:00 – 07:00** | **Scene 6: Thử nghiệm Soak Test (Endurance) & 5 Bugs** | Xem biểu đồ RAM ngâm tải 10 phút phẳng không Memory Leak + Tóm tắt 5 Bugs phát hiện. |
| **07:00 – 07:30** | **Scene 7: Tổng kết & Cam kết Trung thực** | Đối chiếu SLA, cam kết tính toàn vẹn dữ liệu raw log `.jtl`. |

---

## 3. Kịch Bản Chi Tiết Từng Phân Cảnh (Storyboard & Voice Script)

---

### PHÂN CẢNH 1 (00:00 – 00:45): GIỚI THIỆU & XÁC THỰC PHẦN CỨNG (ANTI-CHEAT)

**Hành động trên màn hình:**
1. Chỉ con trỏ chuột vào Task Manager bên phải: Hostname `NGUYENAN`, CPU Intel Core i5-12450HX, RAM 24 GB DDR5.
2. Mở file `HW5/README.md` hoặc `Hardware_Report.md` trên màn hình.

**Lời thoại thuyết minh (Voice-over):**
> *"Kính chào quý Thầy Cô và các bạn trợ giảng môn Kiểm thử Phần mềm — FIT @ HCMUS. Em là Ân Tiến Nguyên An, MSSV 23127148, sinh viên lớp 23CLC08.  
> Hôm nay, em xin trình bày video thực nghiệm và đối soát kết quả cho Bài tập lớn HW05 — Performance Testing trên hệ thống EShop SUT.  
> 
> Để đảm bảo tính minh bạch và tuân thủ tuyệt đối quy định chống gian lận Anti-AI-Cheat của đề bài:  
> Máy thực nghiệm của em có Hostname định danh là **NGUYENAN**, khớp 100% với các bài lab trước. Cấu hình phần cứng gồm CPU Intel Core i5-12450HX 8 nhân 12 luồng, RAM 24GB DDR5 và ổ cứng NVMe SSD. Toàn bộ quá trình kiểm thử sẽ được ghi hình song song giữa công cụ Apache JMeter bên trái và Task Manager theo dõi tài nguyên thực tế bên phải."*

---

### PHÂN CẢNH 2 (00:45 – 02:00): TRỰC QUAN HÓA TEST PLAN & CHẠY THỬ TRÊN GUI

**Hành động trên màn hình:**
1. Trên giao diện **Apache JMeter GUI** bên trái, bấm `File -> Open` mở file `HW5/Task1/test-plans/23127148_Load_20260815.jmx`.
2. Mở rộng cây cấu trúc bên trái cho người xem thấy:
   - `HTTP Request Defaults` (Server `localhost`, port `3000`)
   - `CSV Data Set Config` (đọc dữ liệu `users.csv`, `categories.csv`, `products.csv`)
   - `Once Only Controller` chứa `POST /api/login` kèm `JSON Extractor` trích xuất Bearer Token động.
   - `Throughput Controller` (60% Read, 25% Write, 15% Bulk)
   - Listener `View Results Tree`.
3. Bấm vào Listener **View Results Tree**, rồi bấm **Nút Start màu xanh lá cây (Play ▶️)** trên thanh công cụ.
4. Cho thấy các request đổi sang **màu xanh HTTP 200** với dữ liệu JSON trả về từ SUT. Sau đó bấm nút **Stop 🛑** và nút **2 Cây chổi (Clear All 🧹)** để chuẩn bị chạy bài chính thức.

**Lời thoại thuyết minh (Voice-over):**
> *"Về phạm vi kiểm thử: Trong nhóm của em, em phụ trách vai trò **Quản trị viên (Admin) — Quản lý Danh mục và Sản phẩm**, hoàn toàn độc lập và không trùng lặp endpoint với các thành viên khác.  
> 
> Nhìn vào cây cấu trúc Test Plan trên giao diện JMeter:  
> - Em đã thiết kế luồng End-to-End bao phủ đầy đủ 6 endpoint:  
>   1. Xác thực `POST /api/login` bọc trong **Once Only Controller** kèm **JSON Extractor** để lấy Bearer Token tự động.  
>   2. Read-heavy (60% tải): `GET /api/products` và `GET /api/coupons`.  
>   3. Transactional & Bulk (40% tải): Tạo danh mục `POST /api/categories`, cập nhật `PUT /api/categories/:id` bằng dynamic ID, và import hàng loạt qua `POST /api/admin/import-products` đọc từ `products.csv`.  
> 
> Khi em bấm nút **Start màu xanh (Play ▶️)** trên thanh công cụ: Trong listener *View Results Tree*, các sampler lập tức phản hồi mã **HTTP 200 màu xanh lá cây** với dữ liệu JSON thực tế từ Backend Node.js, chứng minh luồng kịch bản đã hoạt động hoàn toàn chính xác."*

---

### PHÂN CẢNH 3 (02:00 – 03:30): LOAD TESTING (50 VUs — BASELINE PERFORMANCE)

**Hành động trên màn hình:**
1. Trong cây Test Plan của file Load, bấm chọn vào Listener **Summary Report**.
2. Bấm nút **Start màu xanh lá cây (Play ▶️)** để bắt đầu chạy kịch bản Load Test.
3. Quan sát các dòng dữ liệu trong bảng Summary Report nhảy số liệu thời gian thực.
4. Chỉ con trỏ chuột sang Task Manager bên phải: CPU Node.js chỉ 5–12%, RAM ổn định quanh 65MB.
5. Mở trình duyệt xem file `HW5/Task1/results/load/html-report/index.html`, chỉ chuột vào:
   - Total Samples: 4,842
   - Error Rate: **0.00%**
   - Average RT: **7.13 ms**
   - **P95: 16.00 ms**
   - Throughput: **16.29 req/s**

**Lời thoại thuyết minh (Voice-over):**
> *"Bây giờ, em thực hiện kịch bản **Load Testing** (`23127148_Load_20260815.jmx`) với 50 Virtual Users duy trì trong 300 giây kèm Think Time từ 1 đến 5 giây.  
> 
> Bấm nút Start trên thanh công cụ: Bảng *Summary Report* bắt đầu ghi nhận các lượt request liên tục.  
> Nhìn vào Task Manager bên phải: Tiến trình Node.js Backend xử lý rất mượt mà, CPU chỉ dao động quanh mức 8-10% và RAM tiêu thụ xấp xỉ 65MB.  
> 
> Kết quả đo đạc trên HTML Dashboard Report:  
> - Tổng xử lý **4,842 requests** với tỷ lệ lỗi **0.00% tuyệt đối**.  
> - Thời gian phản hồi trung bình chỉ **7.13 ms**, phân vị **P95 đạt 16.00 ms**, và Throughput đạt **16.29 req/s**.  
> Đây là mốc Golden Baseline chuẩn mực để so sánh với các kịch bản tải cao tiếp theo."*

---

### PHÂN CẢNH 4 (03:30 – 04:45): STRESS TESTING (50 $\rightarrow$ 200 VUs STEPPED RAMP-UP)

**Hành động trên màn hình:**
1. Bấm `File -> Open` mở file `HW5/Task1/test-plans/23127148_Stress_20260815.jmx`.
2. Bấm chọn vào Listener **Aggregate Report** ở cây bên trái.
3. Bấm nút **Start màu xanh lá cây (Play ▶️)** để chạy.
4. Quan sát Task Manager bên phải: CPU tăng dần lên 25–35%, RAM Node.js giữ ổn định ở mức 75–85MB.
5. Mở file HTML Dashboard `HW5/Task1/results/stress/html-report/index.html`, chỉ chuột vào:
   - Total Samples: 16,546
   - Error Rate: **0.00%**
   - Throughput tăng vọt: **42.61 req/s**
   - **P95: 19.00 ms**

**Lời thoại thuyết minh (Voice-over):**
> *"Tiếp theo là kịch bản **Stress Testing** (`23127148_Stress_20260815.jmx`) nhằm tìm giới hạn chịu tải của hệ thống.  
> Kịch bản sử dụng Ultimate Thread Group tăng tải dạng bậc thang qua 4 giai đoạn: 50, 100, 150 và đạt đỉnh 200 VUs.  
> 
> Bấm nút Start: Bảng *Aggregate Report* ghi nhận Throughput tăng vọt.  
> Trong Task Manager: CPU tăng tuyến tính lên khoảng 30%, nhưng bộ nhớ Node.js vẫn được giải phóng tốt ở mức 80MB.  
> 
> Kết quả thực nghiệm: Tổng xử lý **16,546 requests**, Throughput tăng gấp 2.6 lần lên **42.61 req/s**.  
> Hệ thống vẫn giữ vững **Error Rate 0.00%** và **P95 chỉ tăng nhẹ lên 19.00 ms** (vượt xa chuẩn SLA < 500ms). Điều này chứng minh kiến trúc Express.js xử lý non-blocking I/O rất xuất sắc khi có khoảng nghỉ Think Time hợp lý."*

---

### PHÂN CẢNH 5 (04:45 – 06:00): SPIKE TESTING (250 VUs FLASH SALE SHOCK — TÌM RA ĐIỂM GÃY)

**Hành động trên màn hình:**
1. Bấm `File -> Open` mở file `HW5/Task1/test-plans/23127148_Spike_20260815.jmx`.
2. Bấm chọn vào Listener bên trái, rồi bấm nút **Start màu xanh lá cây (Play ▶️)**.
3. Quan sát Task Manager bên phải: CPU lập tức vọt lên **65–85%**, Disk I/O tăng mạnh do SQLite lock.
4. Mở HTML Dashboard `HW5/Task1/results/spike/html-report/index.html`.
5. Chỉ vào biểu đồ *Response Time Over Time* có đỉnh nhọn vọt lên > 3,000ms.
6. Chỉ vào số liệu: Total 31,357 requests, Throughput 158 req/s, **Avg RT 397.87ms, P95 vọt lên 1,733ms (Max 3,278ms)**.

**Lời thoại thuyết minh (Voice-over):**
> *"Bây giờ, chúng ta bước vào kịch bản khắc nghiệt nhất: **Spike Testing** (`23127148_Spike_20260815.jmx`), mô phỏng đợt Flash Sale đột biến tức thời với **250 VUs ập vào trong 10 giây và Think Time = 0s**.  
> 
> Ngay khi bấm nút Start: Quan sát Task Manager bên phải, CPU lập tức bị đẩy lên hơn 70%, quạt tản nhiệt bắt đầu hoạt động mạnh.  
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
1. Mở ảnh biểu đồ Endurance Test (`HW5/Task1/results/endurance/evidences/`).
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
1. Mở file `HW5/README.md` phần Bảng tự đánh giá (90/90 điểm).
2. Cho thấy đầy đủ các thư mục kết quả `load_results.jtl`, `stress_results.jtl`, `spike_results.jtl`.

**Lời thoại thuyết minh (Voice-over):**
> *"Tổng kết lại, bài thực nghiệm HW05 của em đã hoàn thành 100% khối lượng công việc, thu thập đầy đủ dữ liệu raw log .jtl, báo cáo HTML Dashboard trực quan, đối soát thực tế và làm rõ các sai lệch phân tích của AI.  
> Toàn bộ mã nguồn test plan, dữ liệu CSV và báo cáo đã được commit đầy đủ trên Git branch `hw05/23127148-nguyenan`.  
> Em xin chân thành cảm ơn quý Thầy Cô và các bạn trợ giảng đã theo dõi video demo của em!"*

---
