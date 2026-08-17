# HW05 - Hướng dẫn nhanh (JMeter Load Test)

## Mục tiêu

Chạy được JMeter read-heavy load test cho các API đọc dữ liệu sản phẩm của
eShop và tạo được:

- `results/load.jtl`
- `html-reports/load/index.html`

## Cấu trúc thư mục đề xuất

Đặt các file JMeter ở thư mục gốc của project `eshop-sut` để khi chạy lệnh
không cần nhập đường dẫn dài:

```text
eshop-sut/
├── test-plan.jmx
├── jmeter-data/
│   └── products.csv
├── results/
│   └── load.jtl
└── html-reports/
    └── load/
        └── index.html
```

Ý nghĩa các file/thư mục chính:

- `test-plan.jmx`: test script JMeter, có thể mở bằng GUI hoặc chạy bằng
  command line.
- `jmeter-data/products.csv`: dữ liệu data-driven cho search keyword và
  product id.
- `results/load.jtl`: raw result sinh ra sau khi chạy load test.
- `html-reports/load/index.html`: báo cáo HTML để xem biểu đồ và thống kê.

Khi chạy lệnh JMeter, nên đứng tại thư mục gốc `eshop-sut`:

```powershell
cd E:\Testing_23CLC\DemoHW3\eshop-sut
```

## Bước 1. Chuẩn bị

- Chạy Backend + Database.
- Đảm bảo API hoạt động.

### 1.1 Tải và cài JMeter

JMeter cần Java để chạy. Trước khi cài JMeter, mở **Command Prompt** hoặc
**PowerShell** và kiểm tra:

```powershell
java -version
```

Nếu máy chưa có Java, cài JDK/JRE trước rồi kiểm tra lại lệnh trên.

Tải JMeter từ trang chính thức:

```text
https://jmeter.apache.org/download_jmeter.cgi
```

Chọn file dạng **Binaries** `.zip`, ví dụ `apache-jmeter-x.y.z.zip`. Sau khi
tải xong, giải nén vào một thư mục dễ nhớ, ví dụ:

```text
C:\tools\apache-jmeter
```

Trong thư mục này phải có thư mục con `bin`, ví dụ:

```text
C:\tools\apache-jmeter\bin
```

### 1.2 Add JMeter vào PATH trên Windows

Để dùng được lệnh `jmeter` ở mọi thư mục:

1.  Mở **Start Menu** và tìm `Environment Variables`.
2.  Chọn **Edit the system environment variables**.
3.  Bấm **Environment Variables...**.
4.  Trong phần **User variables**, chọn biến `Path` rồi bấm **Edit**.
5.  Bấm **New** và thêm đường dẫn thư mục `bin` của JMeter:

```text
C:\tools\apache-jmeter\bin
```

6.  Bấm **OK** để lưu tất cả cửa sổ.
7.  Đóng Command Prompt/PowerShell cũ và mở cửa sổ mới.

Kiểm tra JMeter đã nhận PATH chưa:

```powershell
jmeter -v
```

Nếu thấy thông tin phiên bản JMeter, nghĩa là cấu hình thành công.

### 1.3 Cài plugin để dùng Ultimate Thread Group

File `test-plan.jmx` sử dụng **Ultimate Thread Group**, đây là Thread Group mở rộng từ bộ plugin **Custom Thread Groups** của JMeter Plugins. Nếu chưa cài plugin này, JMeter có thể báo lỗi thiếu class `kg.apc.jmeter.threads.UltimateThreadGroup` khi mở file.

#### Cài JMeter Plugins Manager

1. Tải file `jmeter-plugins-manager-x.y.jar` từ trang chính thức:

```text
https://jmeter-plugins.org/install/Install/
```

2. Copy file `.jar` vừa tải vào thư mục:

```text
C:\tools\apache-jmeter\lib\ext
```

3. Đóng và mở lại JMeter.
4. Trên menu JMeter, chọn:

```text
Options -> Plugins Manager
```

#### Cài Custom Thread Groups

Trong cửa sổ **Plugins Manager**:

1. Chọn tab **Available Plugins**.
2. Tìm plugin:

```text
Custom Thread Groups
```

3. Tick chọn plugin này.
4. Bấm **Apply Changes and Restart JMeter**.

Sau khi JMeter khởi động lại, có thể thêm Ultimate Thread Group bằng menu:

```text
Add -> Threads (Users) -> jp@gc - Ultimate Thread Group
```

Kiểm tra nhanh: nếu mở được `test-plan.jmx` và thấy node **Product Browsing Users - Ultimate Thread Group** thì plugin đã được nhận.

### 1.4 Mở JMeter bằng GUI

Dùng GUI để tạo và debug test plan:

```powershell
jmeter
```

Hoặc mở trực tiếp file:

```text
C:\tools\apache-jmeter\bin\jmeter.bat
```

Sau khi giao diện JMeter mở lên, làm tiếp **Bước 2. Tạo Test Plan**.

### 1.5 Chạy JMeter bằng lệnh

Dùng command line để chạy load test thật và xuất báo cáo:

```powershell
jmeter -n -t test-plan.jmx -l results/load.jtl -e -o html-reports/load
```

Ý nghĩa các tham số:

- `-n`: chạy non-GUI/command line.
- `-t test-plan.jmx`: dùng file test plan đã tạo.
- `-l results/load.jtl`: lưu raw result.
- `-e -o html-reports/load`: tạo HTML report sau khi chạy.

Khi chạy load test thật, nên dùng command line thay vì GUI để giảm tốn RAM và
CPU cho máy chạy test.

## Bước 2. Tạo Test Plan

Tạo một test plan mô phỏng người dùng đang xem và tìm kiếm sản phẩm trên
eShop. Dựa trên `api_specification.md`, kịch bản này chỉ dùng các API đọc dữ
liệu sản phẩm:

- `GET /api/products`
- `GET /api/products?search=keyword`
- `GET /api/products/:id`

Không dùng API danh mục, không dùng các API yêu cầu token như
user/cart/orders/admin, và không dùng các API ghi dữ liệu như đăng ký, thêm
giỏ hàng, checkout, thêm/sửa/xóa sản phẩm.

### 2.1 Tạo Ultimate Thread Group

Trong JMeter, bấm chuột phải vào **Test Plan**:

`Add` → `Threads (Users)` → `jp@gc - Ultimate Thread Group`

Nếu không thấy menu `jp@gc - Ultimate Thread Group`, quay lại mục **1.3 Cài plugin để dùng Ultimate Thread Group** và cài plugin **Custom Thread Groups** trước.

Cấu hình lịch tải read-heavy trong bảng **Thread Schedule**:

| Start Threads Count | Initial Delay, sec | Startup Time, sec | Hold Load For, sec | Shutdown Time, sec |
| ------------------- | -----------------: | ----------------: | -----------------: | -----------------: |
| `50`                |                `0` |              `60` |              `180` |               `60` |

Cấu hình **Loop Controller** bên trong Ultimate Thread Group:

- **Loop Count:** `Forever` hoặc `-1`

Ý nghĩa lịch tải:

- JMeter tăng dần lên `50` users trong `60` giây.
- Giữ tải `50` users trong `180` giây để đo response time và throughput ổn định hơn.
- Giảm tải về `0` trong `60` giây để kết thúc test nhẹ nhàng.

### 2.2 Tạo HTTP Request Defaults

Bấm chuột phải vào **Thread Group**:

`Add` → `Config Element` → `HTTP Request Defaults`

Cấu hình:

- **Protocol:** `http`
- **Server Name or IP:** `localhost`
- **Port Number:** `3000`

Sau khi cấu hình phần này, các HTTP Request bên dưới chỉ cần nhập đường dẫn
API, không cần nhập lại host và port.

### 2.3 Tạo dữ liệu CSV cho data-driven test

Tạo thư mục và file CSV trong project:

```text
jmeter-data/products.csv
```

Nội dung mẫu:

```csv
search_keyword,product_id
iPhone,1
Samsung,2
MacBook,3
AirPods,4
Keychron,5
```

Ý nghĩa:

- `search_keyword`: từ khóa dùng cho API search sản phẩm.
- `product_id`: id sản phẩm dùng cho API xem chi tiết.

Với data-driven test, JMeter sẽ đọc từng dòng trong CSV. Ví dụ dòng
`iPhone,1` sẽ làm request search với từ khóa `iPhone` và xem chi tiết sản phẩm
id `1`.

### 2.4 Thêm CSV Data Set Config

Bấm chuột phải vào **Thread Group**:

`Add` → `Config Element` → `CSV Data Set Config`

Cấu hình:

- **Filename:** `jmeter-data/products.csv`
- **File encoding:** `UTF-8`
- **Variable Names:** `search_keyword,product_id`
- **Ignore first line:** `True`
- **Delimiter:** `,`
- **Recycle on EOF:** `True`
- **Stop thread on EOF:** `False`
- **Sharing mode:** `All threads`

Sau bước này, có thể dùng biến `${search_keyword}` và `${product_id}` trong
các HTTP Request.

### 2.5 Tạo các HTTP Request cho luồng đọc sản phẩm

Thêm từng request bằng cách bấm chuột phải vào **Thread Group**:

`Add` → `Sampler` → `HTTP Request`

Tạo 3 request sau:

| Tên request            | Method | Path                                     | Ý nghĩa                                            |
| ---------------------- | ------ | ---------------------------------------- | -------------------------------------------------- |
| `01 - Product List`    | `GET`  | `/api/products`                          | Người dùng mở danh sách sản phẩm                   |
| `02 - Search Products` | `GET`  | `/api/products?search=${search_keyword}` | Người dùng tìm sản phẩm theo từ khóa trong CSV     |
| `03 - Product Detail`  | `GET`  | `/api/products/${product_id}`            | Người dùng xem chi tiết sản phẩm theo id trong CSV |

Nếu database của eShop có dữ liệu khác, chỉ cần sửa file
`jmeter-data/products.csv`, không cần sửa từng HTTP Request trong JMeter.

### 2.6 Thêm thời gian nghỉ giữa các request

Bấm chuột phải vào **Thread Group**:

`Add` → `Timer` → `Constant Timer`

Cấu hình:

- **Thread Delay:** `500`

Giá trị `500` nghĩa là mỗi user nghỉ 0.5 giây giữa các request, giống hành vi
đọc/xem sản phẩm thực tế hơn.

### 2.7 Thêm Response Assertion

Bấm chuột phải vào **Thread Group**:

`Add` → `Assertions` → `Response Assertion`

Cấu hình:

- **Field to Test:** `Response Code`
- **Pattern Matching Rules:** `Equals`
- **Patterns to Test:** `200`

Assertion này giúp kiểm tra các API đọc sản phẩm trả về HTTP `200`.

### 2.8 Thêm View Results Tree để debug

Bấm chuột phải vào **Thread Group**:

`Add` → `Listener` → `View Results Tree`

Chỉ dùng listener này khi chạy thử với ít user. Trước khi chạy load test thật,
cần disable **View Results Tree** để tránh JMeter tốn nhiều RAM.

### 2.9 Lưu Test Plan

Lưu file test plan với tên:

```text
test-plan.jmx
```

## Bước 3. Smoke Test

- Thread Group: **1 User, 1 Loop**
- Chạy và kiểm tra tất cả request trả **HTTP 200**.

## Bước 4. Load Test

- Disable **View Results Tree**.
- Đổi Thread Group sang workload mong muốn (ví dụ 20 users).

## Bước 5. Xuất raw JTL

```bash
jmeter -n -t test-plan.jmx -l results/load.jtl
```

Kết quả:

    results/
    └── load.jtl

## Bước 6. Tạo HTML Report

```bash
jmeter -g results/load.jtl -o html-reports/load
```

Hoặc tạo ngay sau khi chạy:

```bash
jmeter -n -t test-plan.jmx -l results/load.jtl -e -o html-reports/load
```

Kết quả:

    html-reports/
    └── load/
        └── index.html

---

# Bước 7. Thu thập minh chứng (Evidence)

Sau khi hoàn thành Load Test, lưu lại các minh chứng để phục vụ báo cáo và đánh giá kết quả.

## 7.1 Chụp kết quả JMeter

Sau khi chạy xong, mở HTML Report hoặc Listener đã sử dụng và chụp màn hình kết quả.

Nên thể hiện được các thông tin chính:

- Response Time
- Throughput
- Error Rate
- APDEX (nếu có)

## 7.2 Theo dõi mức sử dụng tài nguyên

Trong khi Load Test đang chạy:

1. Mở **Task Manager** (`Ctrl + Shift + Esc`).
2. Chọn tab **Processes**.
3. Theo dõi tiến trình backend (`node.exe`).
4. Quan sát các chỉ số:
   - CPU
   - Memory
   - Disk
   - Network
5. Chụp màn hình sao cho thấy đồng thời JMeter và Task Manager.

> Đây là minh chứng cho mức tiêu thụ tài nguyên của hệ thống trong quá trình kiểm thử.

## 7.3 Kiểm tra HTML Report

Mở:

```text
html-reports/load/index.html
```

Kiểm tra nhanh các mục:

- Dashboard
- APDEX
- Response Times
- Throughput
- Errors

---

# Bước 8. Đánh giá nhanh kết quả

- **Kết quả chạy Test Plan:** Test Plan chạy hoàn thành thành công trong 5 phút.
- **Tỷ lệ lỗi (Error Rate):** Có khoảng 30.07% request bị lỗi (59,829 trên tổng 198,955 request). 100% các lỗi này đều là `java.net.BindException: Address already in use: connect`, xuất hiện do máy chạy test cạn kiệt cổng ephemeral (ephemeral ports) khi duy trì kết nối đồng thời với tần suất lớn.
- **Thời gian phản hồi (Response Time):** Rất ổn định và nhanh chóng, trung bình chỉ khoảng 59.64 ms (95th percentile đạt 36.00 ms).
- **Throughput:** Đạt khoảng 663 - 666 request/giây.
- **Tài nguyên hệ thống:** CPU và RAM của tiến trình backend Node.js (`node.exe`) hoạt động cực kỳ ổn định và duy trì ở mức thấp (RAM chỉ khoảng 36 MB), không xảy ra tình trạng rò rỉ hay quá tải tài nguyên.

---

# Kết quả cần nộp

Đối với mini exercise này, mỗi nhóm cần chuẩn bị:

| Thành phần                | Mô tả                            |
| ------------------------- | -------------------------------- |
| `test-plan.jmx`           | File Test Plan JMeter            |
| `products.csv`            | File dữ liệu Data-driven         |
| `results/load.jtl`        | Raw log sau khi chạy             |
| `html-reports/load/`      | HTML Report                      |
| Screenshot kết quả JMeter | Minh chứng chạy thành công       |
| Screenshot Task Manager   | Minh chứng theo dõi CPU/RAM      |
| Nhận xét ngắn             | Khoảng 3–5 dòng đánh giá kết quả |

---

# Checklist hoàn thành Mini Exercise

- [x] Backend và Database hoạt động
- [x] Test Plan chạy thành công
- [x] Đã kiểm tra bằng Smoke Test
- [x] Chạy Load Test bằng Command Line
- [x] Có file `test-plan.jmx`
- [x] Có file `products.csv`
- [x] Có file `results/load.jtl`
- [x] Có thư mục `html-reports/load`
- [x] Có ảnh chụp kết quả JMeter
- [x] Có ảnh Task Manager theo dõi tài nguyên
- [x] Có phần nhận xét ngắn về kết quả
