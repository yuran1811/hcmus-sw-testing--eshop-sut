# PERFORMANCE TESTING
**Nhóm 7**

---

## Nội dung chính

1. Cơ sở lý thuyết
2. Khảo sát 15 công cụ Performance Testing
3. Workload Model và kịch bản demo cho EShop
4. Triển khai bằng Apache JMeter
5. Triển khai bằng k6
6. Kết quả thực nghiệm và phân tích

---

## 1. Cơ sở lý thuyết

### Performance Testing là gì?

> **Performance Testing** là một loại **kiểm thử phi chức năng**, nhằm **đánh giá hành vi và phản ứng của hệ thống** dưới một khối lượng công việc hoặc lượt truy cập cụ thể.

### Mục tiêu

- Đo lường thời gian phản hồi
- Đánh giá thông lượng
- Xác định giới hạn tải
- Phát hiện nút thắt cổ chai
- Xác nhận khả năng đáp ứng SLA
- Đảm bảo trải nghiệm người dùng

### Các loại Performance Testing

**LOAD TESTING**
Mô phỏng lượng tải dự kiến áp lên hệ thống để đánh giá hành vi của nó dưới điều kiện làm việc bình thường và lúc cao điểm.

*Mục tiêu:*
- Xác nhận hệ thống đáp ứng được yêu cầu hiệu năng ở mức tải kỳ vọng.
- Phát hiện các vấn đề hiệu năng xuất hiện khi số lượng người dùng tăng dần.
- Xác định mối quan hệ giữa mức độ tải và thời gian phản hồi.

**STRESS TESTING**
Đánh giá hành vi của hệ thống khi bị đẩy vượt quá giới hạn thiết kế thông thường để tìm ra điểm gãy và quan sát cách hệ thống tự phục hồi.

*Mục tiêu:*
- Xác định điểm giới hạn tối đa mà hệ thống sụp đổ hoàn toàn.
- Đánh giá khả năng tự phục hồi sau khi áp lực tải giảm xuống.
- Xác định các lỗi nghiêm trọng chỉ xảy ra dưới áp lực cao (rò rỉ bộ nhớ, deadlock, timeout, v.v.).

**SPIKE TESTING**
Dạng đặc biệt của stress testing, trong đó lượng tải tăng đột ngột và mạnh trong khoảng thời gian rất ngắn, rồi giảm xuống ngay sau đó. Mô phỏng tình huống đột biến trong thực tế (Flash Sale v.v).

*Mục tiêu:*
- Đánh giá khả năng xử lý các đỉnh tải đột biến bất ngờ của hệ thống.
- Kiểm tra cơ chế auto-scaling có phản ứng kịp thời và chính xác không.
- Đánh giá khả năng phục hồi sau khi đỉnh tải qua đi.

**ENDURANCE TESTING / SOAK TESTING**
Đánh giá hệ thống khi chạy dưới mức tải tiêu chuẩn nhưng duy trì trong thời gian dài liên tục. Mục đích là phát hiện các lỗi tích tụ theo thời gian.

*Mục tiêu:*
- Phát hiện tình trạng memory leak.
- Đánh giá sự suy giảm hiệu năng dần dần do các file log quá lớn hoặc phân mảnh dữ liệu.
- Kiểm tra tính ổn định lâu dài của các thành phần bên thứ ba hoặc hạ tầng.

**VOLUME TESTING (FLOOD TESTING)**
Đánh giá hành vi của hệ thống khi phải xử lý và lưu trữ một khối lượng dữ liệu cực lớn. Trọng tâm nằm ở kích thước tệp tin hoặc số lượng bản ghi trong cơ sở dữ liệu.

*Mục tiêu:*
- Xác định hiệu năng truy vấn, tìm kiếm có giảm đi khi dữ liệu tăng trưởng.
- Phát hiện các lỗi tràn bộ đệm hoặc giới hạn lưu trữ vật lý của hệ thống.
- Đánh giá tính ổn định khi thực hiện migration dữ liệu lớn từ hệ thống cũ sang mới.

**SCALABILITY TESTING**
Đánh giá năng lực của hệ thống trong việc mở rộng quy mô phần cứng nhằm đáp ứng lượng tải lớn hơn. Bao gồm cả vertical scaling và horizontal scaling.

*Mục tiêu:*
- Xác định xem hiệu năng hệ thống có tăng trưởng với tài nguyên bổ sung hay không.
- Tìm ra điểm nghẽn kiến trúc khiến việc thêm tài nguyên phần cứng không còn mang lại hiệu quả cải thiện hiệu năng.
- Cung cấp dữ liệu thực tế để lập chiến lược tối ưu chi phí hạ tầng.

### Các chỉ số đánh giá hiệu năng

**CONCURRENT USERS**
Số lượng người dùng (hoặc các Virtual Users trong script) đang thực hiện các tương tác tích cực và gửi yêu cầu đến hệ thống tại cùng một thời điểm.

**RESPONSE TIME**
Tổng thời gian tính từ khi client gửi một yêu cầu (request) đi cho đến khi nhận được phản hồi hoàn chỉnh (response) trả về từ phía server.

```
Response Time = Network Latency (Go) + Server Processing Time + Network Latency (Return)
```

Phản ánh trực tiếp độ trễ mà người dùng phải chịu đựng.

**LATENCY**
Khoảng thời gian trễ trước khi quá trình truyền dữ liệu thực sự bắt đầu.

Trong ngữ cảnh web: Thời gian để byte dữ liệu đầu tiên (TTFB) truyền từ server quay trở lại đến client sau khi nhận request.

Cô lập vấn đề xem sự chậm trễ nằm ở đường truyền vật lý hay ở khâu xử lý logic của máy chủ.

**THROUGHPUT**
Số lượng đơn vị công việc mà hệ thống tiếp nhận và xử lý thành công trong một đơn vị thời gian cố định. Đại diện cho năng lực tải và sức chứa tổng thể của toàn bộ kiến trúc.

*Đơn vị đo phổ biến:*
- Requests per second (req/s)
- Transactions per second (TPS)
- Megabytes per second (MB/s)

**ERROR RATE**
Tỷ lệ phần trăm các yêu cầu bị lỗi (như lỗi kết nối, lỗi phản hồi HTTP 5xx) so với tổng số lượng yêu cầu được gửi lên hệ thống trong suốt phiên kiểm thử.

```
Error Rate (%) = (Số request bị lỗi / Tổng số request gửi đi) × 100
```

**RESOURCE UTILIZATION**
Đo mức độ tiêu thụ các tài nguyên phần cứng vật lý hoặc ảo hóa của các máy chủ thành phần (Web Server, App Server, Database Server) khi bài test hiệu năng diễn ra.

*Các chỉ số cần theo dõi:*
- **CPU Utilization (%)**: Tỷ lệ phần trăm năng lực xử lý của vi xử lý đang bị chiếm dụng. Mức an toàn thường dưới 75-80%.
- **Memory Utilization / RAM Usage**: Lượng bộ nhớ RAM bị chiếm giữ. Nếu đồ thị RAM tăng liên tục không giảm, đó là dấu hiệu của memory leak.
- **Disk I/O (Input/Output)**: Tốc độ đọc và ghi dữ liệu lên ổ đĩa.
- **Network I/O**: Lượng băng thông mạng tiêu thụ ở các cổng inbound/outbound.

**PERCENTILE (PHÂN VỊ P50, P90, P95, P99)**
Mô tả sự phân bố của chỉ số thời gian phản hồi, giúp loại bỏ sự sai lệch của các giá trị trung bình đơn thuần. Giá trị phân vị thứ N (ký hiệu pN) nghĩa là có N% số lượng request có thời gian phản hồi thấp hơn hoặc bằng giá trị đó.

- **p50 (Median)**: Giá trị trung vị, phản ánh thời gian phản hồi của một người dùng ở mức trung bình của hệ thống.
- **p90**: 90% số request có thời gian phản hồi bằng hoặc nhanh hơn giá trị này. Phản ánh trải nghiệm của đại đa số người dùng.
- **p95**: Ngưỡng tiêu chuẩn phổ biến nhất khi ký kết các văn bản SLA kỹ thuật.
- **p99**: Biểu thị nhóm 1% khách hàng phải chịu đựng thời gian phản hồi chậm nhất.

### Workload Model

- **User Distribution**: Xác định tỷ lệ phần trăm người dùng thực hiện các tính năng khác nhau.
- **Load Profile**: Xác định hình thái tăng giảm của lượng tải theo thời gian, bao gồm:
  - **User Load**: Số lượng người dùng ảo truy cập vào hệ thống.
  - **Ramp-up period**: Thời gian tải tăng dần, đưa VU vào hệ thống từ từ để tránh gây shock hệ thống đột ngột.
  - **Steady-state period**: Thời gian duy trì tải đỉnh ổn định để quan sát hệ thống ở trạng thái bão hòa.
  - **Ramp-down period**: Thời gian tắt dần các VU khi bài test kết thúc.

### Quy trình kiểm thử

- **Bước 1**: Xác định Performance Goal
- **Bước 2**: Xác định Workload Model và các tiêu chí đánh giá hiệu năng
- **Bước 3**: Thiết kế kịch bản kiểm thử
- **Bước 4**: Cấu hình môi trường và chuẩn bị dữ liệu
- **Bước 5**: Thực thi kiểm thử
- **Bước 6**: Phân tích kết quả, báo cáo và tinh chỉnh

---

## 2. Khảo sát công cụ Performance Testing

### Tổng quan lựa chọn công cụ

| Nhóm | Công cụ | Trạng thái trong seminar | Lý do chính |
|---|---|---|---|
| Main candidates | Apache JMeter, k6 | Chọn vào cặp triển khai chính, có điều kiện | Cùng đáp ứng EShop journey nhưng đại diện hai workflow khác nhau: visual Test Plan và test-as-code. |
| Shortlist/counterfactual | Artillery, Locust, Gatling | Giữ làm ứng viên đối chứng hoặc backup | Có khả năng scenario/workload tốt, nhưng vai trò code-first trùng nhiều hơn với k6. |
| Enterprise references | Silk Performer, NeoLoad, LoadRunner Professional | Survey/deep-dive nếu có licence và lab phù hợp | Năng lực rộng nhưng access, onboarding và reproducibility trong lớp chưa được chứng minh. |
| Cloud service | Loader.io | Supporting/survey-only cho SUT hiện tại | EShop local không trực tiếp phù hợp với cloud generator và host verification. |
| Endpoint benchmarks | Siege, Vegeta, wrk, ApacheBench | Dùng cho sanity check hoặc single-endpoint benchmark | Không thay thế stateful business journey nếu chưa có harness, correlation và business checks. |
| Distributed testing | Tsung | Survey-only trong phạm vi hiện tại | Distributed generation chỉ cần thiết khi single generator được chứng minh là bottleneck. |
| Orchestration | Taurus | Supporting framework | Phải ghi rõ executor; không tính Taurus như một load engine độc lập khi nó gọi JMeter/Gatling. |

### Bảng khảo sát chi tiết 15 công cụ

| Công cụ | Chức năng chính | Giá và licence | Ngôn ngữ/cấu hình | Điểm mạnh | Điểm yếu | Hỗ trợ AI |
|---|---|---|---|---|---|---|
| Apache JMeter | Load test đa giao thức | Miễn phí, Apache-2.0 | GUI, XML; Groovy/Java | GUI trực quan, nhiều plugin | .jmx khó bảo trì; tốn RAM | AI ngoài sinh Groovy, audit .jmx |
| Silk Performer | Load test doanh nghiệp, record/replay | Thương mại | BDL; Java/.NET | Nhiều protocol, monitoring tốt | Chi phí và thiết lập cao | AI ngoài hỗ trợ viết/audit BDL |
| Artillery | Test HTTP, GraphQL, WebSocket, browser | OSS; Cloud trả phí | YAML, JavaScript/TypeScript | Dễ tích hợp CI/CD, có Playwright | Debug và correlation cần code | Thân thiện với coding agent |
| k6 | Load, stress, spike, soak, browser | OSS; Cloud trả phí | JavaScript/TypeScript | Nhẹ, test-as-code, threshold tốt | Cần code; không có GUI thiết kế | LLM dễ sinh và audit script |
| Locust | Mô phỏng user, chạy phân tán | Miễn phí, mã nguồn mở | Python | Mô tả flow tự nhiên, có Web UI | Phải tự xây checks, quản lý worker | AI ngoài sinh/audit locustfile.py |
| Gatling | Load test bằng code, hỗ trợ CI/CD | Community miễn phí; Enterprise trả phí | Java, Kotlin, Scala, JS/TS | Engine hiệu quả, DSL rõ ràng | Learning curve và setup cao | Có AI converter/assistant tùy bản |
| Loader.io | Cloud load test website/API public | Free và Pro | Web UI, API | Thiết lập nhanh, không tốn máy local | Không phù hợp localhost; flow hạn chế | Chưa có AI native |
| Siege | HTTP stress test và benchmark | Miễn phí, mã nguồn mở | CLI, file cấu hình | Nhẹ, phù hợp smoke test | Hạn chế flow, correlation, report | Chưa có AI native |
| Vegeta | HTTP test theo request rate cố định | Miễn phí, MIT | CLI, text/JSON, Go | Kiểm soát rate tốt, nhẹ | Khó mô hình user journey stateful | AI ngoài sinh target/report |
| wrk | HTTP benchmark throughput cao | Miễn phí, mã nguồn mở | CLI, LuaJIT | RPS cao, ít tốn tài nguyên | Yếu với business flow và assertion | AI ngoài hỗ trợ Lua/phân tích |
| NeoLoad | Enterprise test từ API đến browser | Thương mại; có trial | GUI/no-code, CLI/API, JS | Recorder, APM và report mạnh | Chi phí cao, hệ sinh thái phức tạp | Có AI Chat và AI Analysis |
| ApacheBench | Benchmark một HTTP endpoint | Miễn phí, Apache | CLI | Rất đơn giản, chạy baseline nhanh | Không hỗ trợ flow và session phức tạp | Chưa có AI native |
| LoadRunner | Enterprise load test đa giao thức | Thương mại; có trial | C, Java, JS/DevWeb | Protocol rộng, phân tích chuyên sâu | Nặng, đắt và khó học | Có AI hỗ trợ script/phân tích |
| Tsung | Distributed test đa giao thức | Miễn phí, GPLv2 | XML, Erlang | Nhiều user nhẹ, chạy phân tán | XML/Erlang khó bảo trì; setup lâu | AI ngoài hỗ trợ audit XML |
| Taurus | Điều phối JMeter, Gatling và tool khác | Miễn phí, mã nguồn mở | YAML/JSON, Python | Cấu hình ngắn, phù hợp CI/CD | Không phải load engine độc lập | AI ngoài sinh và audit YAML |

---

## 3. Workload Model và kịch bản demo cho EShop

### Transaction Distribution

| Transaction | Tỷ lệ |
|---|---|
| Browse/Search Products | 60% |
| View Product Details | 25% |
| Add to Cart | 10% |
| Checkout Flow | 5% |
| **Tổng** | **100%** |

Phân bố này giúp mô phỏng tương đối sát hành vi của người dùng trên một website thương mại điện tử và tránh tạo quá nhiều yêu cầu giao dịch không thực tế.

### Think Time

| Transaction | Think Time |
|---|---|
| Browse/Search Products | 1–3 giây |
| View Product Details | 2–5 giây |
| Add to Cart | 1–2 giây |
| Checkout Flow | 2–4 giây |

Sử dụng Think Time ngẫu nhiên giữa các thao tác để mô phỏng hành vi người dùng thực tế.

Đối với bài kiểm thử Spike, Think Time được đặt bằng **0 giây**.

### Test Data

- Sử dụng một tài khoản kiểm thử duy nhất cho tất cả các Virtual Users (VUs).
- Mỗi Virtual User thực hiện đăng nhập để nhận JWT trước khi gửi các yêu cầu đến hệ thống.
- Các Product ID được lựa chọn từ danh sách sản phẩm hợp lệ của hệ thống.
- Dữ liệu sử dụng trong quá trình Checkout là dữ liệu hợp lệ theo yêu cầu của hệ thống.

### Test Profiles

**BASELINE TEST (LOAD TEST)**
- Concurrent Users: 50 Virtual Users (VUs).
- Ramp-up: 1 phút.
- Steady State: 3 phút.
- Ramp-down: 1 phút.

*Mục tiêu:*
- Thiết lập mức hiệu năng cơ sở
- Đo Response Time (p50, p95, p99).
- Thu thập Throughput và Error Rate.
- Quan sát mức sử dụng tài nguyên hệ thống trong điều kiện tải bình thường.

**SPIKE TEST**
- Concurrent Users: tăng từ 50 lên 500 VUs
- Ramp-up: 30 giây.
- Steady State: 1 phút.
- Ramp-down: 30 giây.

*Mục tiêu:*
- Đánh giá khả năng chịu tải khi lượng truy cập tăng đột ngột.
- Kiểm tra hệ thống có xảy ra lỗi, nghẽn cơ sở dữ liệu hoặc mất khả năng phục vụ hay không.
- Quan sát khả năng phục hồi của hệ thống sau khi lưu lượng giảm.

### Performance Metrics

- **Response Time**: Average, Median (p50), p95 và p99.
- **Throughput**: Requests per Second (RPS).
- **Error Rate**: Tỷ lệ các request thất bại (HTTP 4xx, HTTP 5xx hoặc timeout).

---

## 4. Apache JMeter

Apache JMeter là một công cụ **load testing** và **performance testing** mã nguồn mở phát triển bởi **Apache Software Foundation**.

### Chức năng chính

Xây dựng kịch bản kiểm thử bằng Test Plan → Mô phỏng người dùng đồng thời → Gửi request đến nhiều loại hệ thống → Kiểm tra tính đúng đắn của response → Thu thập và xuất báo cáo

### Nguyên lý hoạt động

**Bước 1: Tạo Test Plan**
Người kiểm thử xây dựng một file `.jmx` chứa:
- Cấu hình số lượng người dùng.
- Các request cần gửi.
- Luồng xử lý nghiệp vụ.
- Các điều kiện kiểm tra.

**Bước 2: Khởi tạo Virtual Users**
JMeter tạo các thread dựa trên cấu hình trong Thread Group. Mỗi thread thực hiện các bước trong Test Plan:
- Gửi request đến server.
- Nhận response.
- Kiểm tra kết quả.
- Lặp lại theo cấu hình.

**Bước 3: Thu thập dữ liệu hiệu năng**
Trong quá trình chạy, JMeter ghi nhận các thông số:
- Response Time.
- Throughput.
- Error Rate.
- Latency.
- Số lượng request thành công/thất bại.

Luồng xử lý: Test Plan (.jmx) → Thread Group → Virtual Users (Threads) → Samplers gửi Request → System Under Test → Listeners thu thập Metrics → Report kết quả.

### Điểm mạnh và hạn chế

| Điểm mạnh | Hạn chế |
|---|---|
| Giao diện trực quan | Tiêu tốn tài nguyên khi chạy GUI |
| Hỗ trợ nhiều giao thức | Test plan dạng XML khó chỉnh sửa thủ công |
| Miễn phí và mã nguồn mở | Độ phức tạp tăng khi xây dựng kịch bản nâng cao |
| Khả năng mở rộng cao | Không mô phỏng trình duyệt đầy đủ |
| Báo cáo phong phú | |

### Các thành phần quan trọng

| Thành phần | Mô tả | Ví dụ / Thông số chính |
|---|---|---|
| Test Plan | Thành phần gốc chứa toàn bộ cấu hình của bài kiểm thử, bao gồm số lượng người dùng, các request, luồng thực thi và cách lưu kết quả. Test Plan được lưu dưới dạng file. | File .jmx |
| Thread Group | Dùng để tạo và quản lý các Virtual Users (threads) trong JMeter. | Number of Threads: Số lượng người dùng ảo. Ramp-up Period: Thời gian tạo người dùng. Loop Count: Số lần lặp lại kịch bản. |
| Sampler | Chịu trách nhiệm gửi request đến hệ thống cần kiểm thử. | HTTP Request: Kiểm thử Web/API. JDBC Request: Kiểm thử Database. FTP/JMS/TCP Request: Kiểm thử các dịch vụ khác. |
| Config Element | Cung cấp các cấu hình và dữ liệu dùng chung cho các request. | HTTP Request Defaults: Cấu hình server mặc định. HTTP Header Manager: Thêm header (Authorization token). CSV Data Set Config: Đọc dữ liệu kiểm thử từ file CSV. |
| Controller | Điều khiển luồng thực thi của Test Plan. | Loop Controller: Lặp lại một nhóm hành động. If Controller: Thực thi theo điều kiện. Throughput Controller: Điều chỉnh tỷ lệ thực hiện hành động. |
| Timer | Mô phỏng thời gian chờ của người dùng thật (Think Time) giữa các thao tác, giúp tạo tải thực tế hơn thay vì gửi request liên tục. | Constant Timer, Uniform Random Timer, Gaussian Random Timer. |
| Assertion | Kiểm tra tính chính xác của response nhằm xác nhận hệ thống hoạt động đúng như mong đợi. | Kiểm tra HTTP Status Code. Kiểm tra nội dung JSON Response. Xác nhận dữ liệu nghiệp vụ. |
| Listener | Thu thập, hiển thị và phân tích kết quả kiểm thử. | Summary Report. Aggregate Report. View Results Tree. HTML Dashboard Report. Các chỉ số: Response Time, Throughput, Error Rate, Percentile. |

---

## 5. K6

k6 là một công cụ **load testing** và **performance testing** mã nguồn mở phát triển bởi **Grafana Labs**.

### Chức năng chính

Tạo và quản lý Virtual Users → Mô phỏng hành vi người dùng → Thu thập chỉ số hiệu năng → Phân tích và xuất báo cáo

### Nguyên lý hoạt động

Dựa trên mô hình **Load Generator → Virtual Users → System Under Test**

**Bước 1: Load test script**
Người kiểm thử xây dựng file JavaScript chứa cấu hình số lượng Virtual Users, thời gian chạy, các request cần gửi và các điều kiện kiểm tra kết quả (checks/thresholds).

**Bước 2: Tạo Virtual Users**
k6 Engine đọc cấu hình trong script và tạo các Virtual Users tương ứng. Mỗi Virtual User hoạt động như một luồng độc lập: thực hiện hành động được định nghĩa, gửi request đến hệ thống, nhận response, kiểm tra kết quả và lặp lại trong suốt thời gian kiểm thử.

**Bước 3: Thu thập và phân tích dữ liệu**
- Ghi nhận liên tục các thông số hiệu năng.
- Sau khi hoàn thành, so sánh kết quả với các threshold đã định nghĩa và đưa ra trạng thái Pass/Fail.

Luồng xử lý: Test Script (JavaScript) → k6 Engine → Virtual Users (VUs) → HTTP Requests gửi đến hệ thống → System Under Test → Thu thập Metrics và tạo Report.

### Điểm mạnh và hạn chế

| Điểm mạnh | Hạn chế |
|---|---|
| Hiệu năng cao | Không có giao diện GUI |
| Testing as Code | Không mô phỏng trình duyệt đầy đủ |
| Cấu hình linh hoạt | Không tự theo dõi tài nguyên hệ thống |
| Hỗ trợ tự động hóa | |

### So sánh JMeter và k6

| Khía cạnh | JMeter | k6 |
|---|---|---|
| Thiết kế ban đầu | GUI/Test Plan dễ quan sát | JavaScript cần coding |
| Review thay đổi | XML diff có thể khó đọc | Code diff rõ hơn |
| Debug | GUI, View Results Tree ở tải thấp | Console/log/checks |
| Load execution | CLI | CLI |
| Pass/fail tự động | Cần cấu hình/assertions/plugins/pipeline | Thresholds tích hợp rõ |
| Reporting | HTML dashboard và raw JTL | Summary/raw output/integrations |
| CI/CD | Có thể tích hợp | Developer-oriented, thuận tiện |
| AI generation | XML khó audit hơn | JavaScript thuận tiện hơn |
| Giá trị giảng dạy | Cấu trúc test trực quan | Minh họa test-as-code |

---

**THANK YOU**
