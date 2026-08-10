# JMeter Blueprint

Đọc file này khi cần sinh file `.jmx` hoặc giải thích cấu trúc test plan JMeter.

## Mục lục

1. Vai trò từng thành phần
2. Cấu trúc cây chuẩn cho luồng e-commerce
3. Thứ tự đặt phần tử — quy tắc scope
4. Cấu hình từng phần tử theo kịch bản
5. Lệnh CLI và sinh HTML report
6. Cột dữ liệu trong file .jtl

---

## 1. Vai trò từng thành phần

| Thành phần | Vai trò | Thông số chính |
|---|---|---|
| **Test Plan** | Gốc chứa toàn bộ cấu hình, lưu dưới dạng file `.jmx` | User Defined Variables |
| **Thread Group** | Tạo và quản lý Virtual Users (threads) | Number of Threads, Ramp-up Period, Loop Count / Duration |
| **Sampler** | Gửi request đến hệ thống | HTTP Request (Web/API), JDBC Request (DB), FTP/JMS/TCP |
| **Config Element** | Cấu hình và dữ liệu dùng chung | HTTP Request Defaults, HTTP Header Manager, CSV Data Set Config, HTTP Cookie Manager |
| **Controller** | Điều khiển luồng thực thi | Loop, If, Transaction, Throughput Controller |
| **Timer** | Mô phỏng think time | Constant, Uniform Random, Gaussian Random Timer |
| **Assertion** | Kiểm tra tính đúng đắn của response | Response Assertion, JSON Assertion, Duration Assertion |
| **Listener** | Thu thập, hiển thị, phân tích kết quả | Summary Report, Aggregate Report, View Results Tree, HTML Dashboard |
| **Post-Processor** | Trích giá trị từ response để dùng cho request sau | JSON Extractor, Regular Expression Extractor |

## 2. Cấu trúc cây chuẩn cho luồng e-commerce

```
Test Plan
├── User Defined Variables            (BASE_URL, PORT, PROTOCOL)
├── HTTP Request Defaults             (server name, port, protocol, content-type)
├── HTTP Cookie Manager               (giữ session nếu backend dùng cookie)
├── HTTP Header Manager               (Content-Type: application/json)
├── CSV Data Set Config — users.csv
├── CSV Data Set Config — products.csv
│
└── Thread Group  (VU, ramp-up, duration theo kịch bản)
    │
    ├── Transaction Controller: "01 - Login"           [auth-heavy]
    │   ├── HTTP Request: POST /api/auth/login
    │   ├── JSON Extractor: $.token → ${JWT}
    │   ├── Response Assertion: code = 200
    │   └── JSON Assertion: $.token NOT NULL
    │
    ├── Uniform Random Timer (1000ms + 2000ms random)
    │
    ├── Transaction Controller: "02 - Browse/Search"   [read-heavy]
    │   ├── HTTP Request: GET /api/products?search=${keyword}
    │   ├── Header Manager: Authorization: Bearer ${JWT}
    │   └── Response Assertion: code = 200
    │
    ├── Uniform Random Timer (2000ms + 3000ms random)
    │
    ├── Transaction Controller: "03 - Product Detail"  [read-heavy]
    │   └── HTTP Request: GET /api/products/${product_id}
    │
    ├── Uniform Random Timer (1000ms + 1000ms random)
    │
    ├── Transaction Controller: "04 - Add to Cart"     [transactional]
    │   ├── HTTP Request: POST /api/cart
    │   └── Response Assertion: code = 200|201
    │
    ├── Uniform Random Timer (2000ms + 2000ms random)
    │
    ├── Transaction Controller: "05 - Checkout"        [transactional]
    │   ├── HTTP Request: POST /api/orders
    │   ├── Response Assertion: code = 200|201
    │   └── JSON Assertion: $.order_id EXISTS
    │
    └── Listener (chọn 1 loại khác nhau cho mỗi test plan)
```

Dùng **Transaction Controller** cho từng bước nghiệp vụ: nó gộp các sampler con thành một số đo duy nhất, giúp báo cáo đọc theo ngôn ngữ nghiệp vụ ("Checkout p95 = 1.8s") thay vì theo từng URL rời rạc.

## 3. Thứ tự đặt phần tử — quy tắc scope

JMeter áp dụng phần tử theo phạm vi cây, không theo thứ tự thời gian như code. Hiểu sai chỗ này là nguồn gốc của rất nhiều test plan chạy sai mà không báo lỗi:

- **Config Element / Timer / Assertion đặt ở cấp nào thì áp dụng cho tất cả sampler ở cấp đó và cấp con.** Một Timer đặt ngang hàng Thread Group sẽ chèn delay trước **mọi** sampler, không phải chỉ sampler đứng ngay sau nó.
- Muốn think time chỉ áp dụng cho một bước, đặt Timer **bên trong** Transaction Controller của bước đó.
- Post-Processor chỉ chạy sau sampler cùng cấp hoặc cấp cha của nó.
- Biến trích bằng JSON Extractor có phạm vi theo thread — mỗi VU giữ token riêng, đúng như mong muốn.

## 4. Cấu hình từng phần tử theo kịch bản

### Thread Group

| Kịch bản | Number of Threads | Ramp-up (s) | Cách kiểm soát thời lượng |
|---|---|---|---|
| Load | 50 | 60 | Check `Specify Thread lifetime`, Duration = 300s (60 ramp-up + 180 steady + 60 ramp-down) |
| Stress | Dùng nhiều Thread Group nối tiếp hoặc plugin `Concurrency Thread Group` với schedule bậc thang | 60–120 mỗi bậc | Duration theo từng bậc |
| Spike | 500 | 30 | Duration = 120s |

Với Stress/Spike, plugin **Concurrency Thread Group** (jpgc - Custom Thread Groups) mô tả bậc thang gọn hơn nhiều so với ghép nhiều Thread Group thủ công. Nếu không cài được plugin, ghép Thread Group nối tiếp và ghi rõ trong báo cáo là đã dùng cách thay thế.

### CSV Data Set Config

```
Filename:            data/users.csv
Variable Names:      username,password
Delimiter:           ,
Ignore first line:   true   (nếu file có header)
Recycle on EOF:      true
Stop thread on EOF:  false
Sharing mode:        All threads
```

`Recycle on EOF = false` + `Stop thread on EOF = true` sẽ khiến thread chết dần khi hết dữ liệu — đôi khi đó là điều mong muốn (mỗi VU dùng một tài khoản riêng đúng một lần), nhưng nếu vô tình đặt vậy trong bài Load test thì số VU thực tế sẽ tụt dần và kết quả vô nghĩa.

### Timer

`Uniform Random Timer`: think time 1–3 giây → `Constant Delay Offset = 1000`, `Random Delay Maximum = 2000`.

Spike test: xoá toàn bộ Timer hoặc set về 0.

### Listener khi chạy CLI

Khi chạy `-n` (non-GUI), listener trong file `.jmx` vẫn hoạt động nhưng nên để trống filename và để `-l` quyết định nơi ghi. Nếu để `View Results Tree` bật ghi full response trong lúc chạy tải cao, JMeter sẽ ăn hết RAM và chính nó trở thành bottleneck.

## 5. Lệnh CLI và sinh HTML report

```bash
# Chạy test và sinh luôn HTML dashboard
jmeter -n \
  -t 25127001_Load_20260810.jmx \
  -l results/25127001_Load_20260810.jtl \
  -e -o results/25127001_Load_20260810_report/

# Sinh HTML report từ file .jtl đã có sẵn
jmeter -g results/25127001_Load_20260810.jtl \
       -o results/report_regenerated/
```

Thư mục `-o` phải **rỗng hoặc chưa tồn tại**, nếu không JMeter sẽ báo lỗi và dừng.

Tăng heap khi chạy tải lớn (sửa `JVM_ARGS` hoặc file `jmeter` script):

```bash
export JVM_ARGS="-Xms1g -Xmx4g"
```

Ghi lại giá trị heap đã dùng trong báo cáo — nó ảnh hưởng trực tiếp tới ngưỡng chịu tải của chính máy chạy test.

## 6. Cột dữ liệu trong file .jtl

Định dạng CSV mặc định:

```
timeStamp,elapsed,label,responseCode,responseMessage,threadName,dataType,
success,failureMessage,bytes,sentBytes,grpThreads,allThreads,URL,
Latency,IdleTime,Connect
```

| Cột | Ý nghĩa |
|---|---|
| `timeStamp` | Epoch millis lúc bắt đầu request |
| `elapsed` | **Response time** (ms) — tổng thời gian tới khi nhận xong response |
| `Latency` | Thời gian tới byte đầu tiên (TTFB) |
| `Connect` | Thời gian thiết lập kết nối |
| `success` | `true`/`false` — dùng cột này để tính error rate, **không** dùng `responseCode` |
| `allThreads` | Số thread đang active tại thời điểm đó — dùng để xác định giai đoạn steady-state |

Phân biệt `elapsed` với `Latency` rất quan trọng: `elapsed - Latency` xấp xỉ thời gian truyền nội dung, còn `Latency - Connect` phản ánh thời gian server xử lý. Nhầm hai cột này là lỗi đọc log phổ biến.
