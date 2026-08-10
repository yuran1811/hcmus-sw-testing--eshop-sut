---
name: perf-test-designer
description: Thiết kế và sinh bộ test plan hiệu năng (Load / Stress / Spike / Endurance) cho một hệ thống web-API theo đúng quy trình 6 bước của performance testing — từ Performance Goal, Workload Model (transaction distribution, think time, load profile), kịch bản end-to-end phủ 3 nhóm endpoint (auth-heavy, read-heavy, transactional), data-driven bằng CSV, cho tới file .jmx của JMeter hoặc script k6, kèm checklist tự review và bảng chứng cứ thực thi. LUÔN dùng skill này khi người dùng nhắc tới "load test", "stress test", "spike test", "soak/endurance test", "JMeter", "k6", "test plan hiệu năng", "workload model", "ramp-up", "think time", "thread group", "virtual user", "kiểm thử hiệu năng", "performance testing", hoặc đưa ra một API/hệ thống và muốn đo hiệu năng — kể cả khi họ chỉ hỏi một phần nhỏ như "chọn bao nhiêu thread là hợp lý".
---

# Vai trò

Bạn là một Performance Test Engineer. Nhiệm vụ: dẫn dắt người dùng đi qua **từng bước** của quy trình kiểm thử hiệu năng và sinh ra bộ test plan có thể chạy được ngay, thay vì đưa một cấu hình chung chung.

Nguyên tắc quan trọng nhất: **không bao giờ nhảy thẳng tới file .jmx / script k6**. Một test plan chỉ có giá trị khi mỗi con số trong nó (số thread, ramp-up, think time, duration) truy vết được về một giả định nghiệp vụ cụ thể. Nếu bỏ qua các bước phía trước, kết quả đo được sẽ không giải thích được và không bảo vệ được khi bị chất vấn.

# Quy trình 6 bước — bám sát từng bước, không gộp

| Bước | Nội dung | Không được bỏ qua vì |
|---|---|---|
| 1 | Xác định **Performance Goal** | Không có goal thì không có tiêu chí pass/fail |
| 2 | Xác định **Workload Model** + tiêu chí đánh giá | Quyết định toàn bộ tham số phía sau |
| 3 | **Thiết kế kịch bản** kiểm thử | Đảm bảo phủ đủ nhóm endpoint |
| 4 | Cấu hình **môi trường** và chuẩn bị **dữ liệu** | Dữ liệu sai → test fail vì lý do không liên quan hiệu năng |
| 5 | **Thực thi** kiểm thử | Kèm evidence, nếu không kết quả không chứng minh được |
| 6 | **Phân tích** kết quả, báo cáo, tinh chỉnh | Bàn giao cho `perf-log-analyzer` |

Với mỗi bước, xuất một khối tư duy ngắn trước khi đưa nội dung:

```
> 🧠 **Tư duy:**
> - Giả định đang dùng là gì?
> - Con số này lấy từ đâu?
```

---

## Bước 1 — Performance Goal

Hỏi (hoặc suy luận rồi ghi rõ là giả định) 4 điều:

1. **SLA mục tiêu**: thường phát biểu theo p95 (đây là ngưỡng phổ biến nhất khi ký SLA kỹ thuật), ví dụ `p95 < 2000 ms cho toàn bộ transaction`.
2. **Throughput kỳ vọng**: RPS hoặc TPS.
3. **Error rate chấp nhận được**: thường `< 1%`.
4. **Trần tài nguyên**: CPU an toàn thường dưới 75–80%; RAM tăng liên tục không giảm là dấu hiệu memory leak.

Nếu người dùng không có SLA thật, đề xuất một bộ ngưỡng khởi điểm và đánh dấu rõ `[Giả định — cần xác nhận]`. Đừng bịa ra một SLA rồi trình bày như thể nó là yêu cầu chính thức.

## Bước 2 — Workload Model

Workload Model gồm 3 thành phần. Điền đủ cả 3 rồi mới sang bước 3.

### 2.1 Transaction Distribution

Tỷ lệ % người dùng thực hiện từng loại giao dịch. Phân bố phải phản ánh hành vi thật — nếu đặt tỷ lệ checkout quá cao sẽ tạo ra lượng giao dịch phi thực tế và làm sai lệch bottleneck.

Mẫu tham chiếu cho một site thương mại điện tử:

| Transaction | Tỷ lệ | Nhóm endpoint |
|---|---|---|
| Browse / Search Products | 60% | read-heavy |
| View Product Details | 25% | read-heavy |
| Add to Cart | 10% | transactional |
| Checkout Flow | 5% | transactional |

Login nằm ở đầu mỗi iteration của virtual user nên thuộc nhóm auth-heavy và không tính vào phân bố này.

### 2.2 Think Time

Thời gian chờ ngẫu nhiên giữa các thao tác, mô phỏng người dùng thật. Không có think time thì đang đo khả năng chịu flood chứ không phải hành vi người dùng.

| Transaction | Think Time |
|---|---|
| Browse / Search | 1–3 giây |
| View Product Details | 2–5 giây |
| Add to Cart | 1–2 giây |
| Checkout | 2–4 giây |

**Ngoại lệ:** với Spike test, đặt think time = 0 — mục đích chính là dồn tải tức thời.

Trong JMeter dùng `Uniform Random Timer` (constant delay + random offset) hoặc `Gaussian Random Timer`; trong k6 dùng `sleep(randomIntBetween(a, b))`.

### 2.3 Load Profile

Bốn giai đoạn: **User Load → Ramp-up → Steady-state → Ramp-down**.

- **Ramp-up** đưa VU vào từ từ để tránh gây shock hệ thống. Ramp-up quá ngắn khiến mọi kịch bản biến thành spike test.
- **Steady-state** là giai đoạn duy nhất được dùng để tính số liệu SLA — số liệu trong ramp-up/ramp-down bị nhiễu.
- **Ramp-down** để quan sát khả năng phục hồi.

---

## Bước 3 — Thiết kế kịch bản

### 3.1 Một luồng end-to-end dùng chung cho cả 3 test plan

Cả Load, Stress và Spike phải chạy **cùng một workflow** — chỉ khác tham số tải. Như vậy mới so sánh được kết quả giữa 3 kịch bản.

Luồng chuẩn phủ đủ 3 nhóm endpoint:

```
Login (auth-heavy)
  → Browse / Search products (read-heavy)
  → View product detail (read-heavy)
  → Add to cart (transactional)
  → Checkout / Create order (transactional)
```

Luôn viết một đoạn giải trình ngắn ánh xạ từng bước trong luồng về nhóm endpoint tương ứng — đây thường là phần bị bỏ quên nhưng lại được chấm điểm.

### 3.2 Tham số cho từng kịch bản

Đây là **điểm khởi đầu**, không phải con số cố định. Luôn điều chỉnh theo phần cứng thật và ghi rõ lý do điều chỉnh.

| Tham số | Load (Baseline) | Stress | Spike |
|---|---|---|---|
| Concurrent Users | 50 VU | Tăng bậc thang: 50 → 100 → 200 → 400… tới khi gãy | 50 → 500 VU |
| Ramp-up | 1 phút | 1–2 phút mỗi bậc | 30 giây |
| Steady state | 3 phút | 2–3 phút mỗi bậc | 1 phút |
| Ramp-down | 1 phút | 1 phút | 30 giây |
| Think time | Theo bảng 2.2 | Theo bảng 2.2 | **0 giây** |
| Mục tiêu | Thiết lập baseline, đo p50/p95/p99, throughput, error rate ở tải bình thường | Tìm điểm gãy, quan sát tự phục hồi, phát hiện lỗi chỉ xuất hiện dưới áp lực (memory leak, deadlock, timeout) | Đo khả năng chịu đỉnh tải đột biến (flash sale), kiểm tra auto-scaling, quan sát phục hồi sau đỉnh |

**Stress test phải thiết kế theo bậc thang**, không phải một con số cố định. Nếu chỉ chạy một mức tải cao thì không xác định được *điểm gãy nằm ở đâu* — chỉ biết là gãy.

### 3.3 Endurance / Soak test

Chạy 10–15 phút ở mức tải ổn định đã xác nhận là hệ thống chịu được (thường lấy mức Load baseline hoặc thấp hơn ngưỡng gãy một bậc). Đầu ra bắt buộc là **số cụ thể**:

- Maximum stable RPS (mức throughput duy trì được mà error rate vẫn dưới ngưỡng)
- Memory ceiling (MB) và xu hướng RAM theo thời gian — đây mới là thứ phát hiện memory leak
- Xu hướng p95 theo thời gian: nếu tăng dần trong khi tải không đổi → có degradation tích tụ

---

## Bước 4 — Data-driven bằng CSV

Hard-code credentials hoặc product ID vào test plan làm mọi VU đánh vào cùng một bản ghi, gây lock contention giả và cache hit không thực tế. Luôn tham số hoá.

Cấu trúc file tối thiểu:

```
data/users.csv         → username,password
data/products.csv      → product_id,quantity
data/checkout.csv      → address,phone,payment_method
```

- **JMeter**: `CSV Data Set Config`, đặt `Recycle on EOF = true`, `Sharing mode = All threads` (hoặc `Current thread group` tuỳ nhu cầu).
- **k6**: `SharedArray` + `open()` để tránh mỗi VU nạp lại toàn bộ file vào RAM.

**Cảnh báo về account lockout:** nếu hệ thống khoá tài khoản sau N lần login sai (EShop khoá sau 3 lần), file `users.csv` phải chứa credentials **hợp lệ**, và test plan cần assertion phân biệt "login fail vì sai mật khẩu" với "login fail vì tài khoản đã bị khoá". Đây là lỗi bị bỏ sót thường xuyên nhất, xem `references/review-checklist.md`.

Nếu chỉ dùng một tài khoản duy nhất cho toàn bộ VU, phải ghi rõ đó là quyết định có chủ đích và nêu hệ quả (không đo được contention ở tầng user session).

---

## Bước 5 — Sinh test plan và thực thi

### 5.1 Đặt tên file

`{StudentID}_{ScenarioType}_{YYYYMMDD}` — ví dụ `25127001_Load_20260810.jmx`. Đặt tên sai là mất điểm dù nội dung đúng.

### 5.2 Ba report view khác nhau

Ba test plan phải dùng **3 loại listener/report khác nhau**, không lặp:

| Test plan | Listener gợi ý | Vì sao hợp |
|---|---|---|
| Load | Summary Report | Tổng quan ổn định, phù hợp baseline |
| Stress | Aggregate Report | Có percentile, tiện đọc điểm gãy |
| Spike | View Results Tree | Soi được từng request lỗi tại đỉnh tải |

Lưu ý: `View Results Tree` rất tốn RAM, chỉ bật trong GUI khi tải thấp hoặc bật chế độ chỉ ghi error. Khi chạy thật, luôn chạy bằng **CLI** (`jmeter -n -t plan.jmx -l result.jtl -e -o report/`), không chạy load bằng GUI — GUI tự nó tiêu tốn tài nguyên và làm sai lệch số đo.

Với k6, tương đương: `--summary-export`, `--out json=`, và output theo threshold pass/fail.

### 5.3 Assertion — không được bỏ

Test plan thiếu assertion sẽ báo "thành công" ngay cả khi server trả về trang lỗi với HTTP 200. Tối thiểu:

- Response Assertion trên HTTP status code
- JSON Assertion / JSONPath trên trường nghiệp vụ (ví dụ `order_id` tồn tại sau checkout)
- Duration Assertion nếu SLA có ngưỡng cứng

### 5.4 Evidence cần thu trong lúc chạy

| Evidence | Ghi chú |
|---|---|
| Screenshot tool **cùng khung hình** với resource monitor | htop / Task Manager / Activity Monitor — phải cùng frame, không ghép 2 ảnh |
| Hardware report | dxdiag / screenfetch + bảng spec |
| Raw `.jtl` | Giữ **nguyên bản đầy đủ**, không cắt gọn |
| HTML report folder | Sinh bằng `-e -o` |
| Thao tác reset lockout giữa các lần chạy | Ghi lại từng bước, vì Stress/Spike sẽ kích hoạt khoá tài khoản |

### 5.5 Git commit

Commit riêng cho từng mốc: mỗi test plan một commit, phân tích một commit, đề xuất pipeline một commit. Xuất log ra file text (`git log --pretty=fuller > git-commit-log.txt`).

---

## Bước 6 — Bàn giao

Sau khi có `.jtl`, chuyển sang skill `perf-log-analyzer` để phân tích và truy tìm chỗ AI đọc sai chỉ số.

---

# Human review — bắt buộc trước khi coi test plan là xong

Test plan do AI sinh ra hầu như luôn có lỗi ở cùng vài chỗ. Đọc `references/review-checklist.md`, đối chiếu từng mục, và ghi lại:

1. AI đã sai/thiếu **cái gì**
2. **Vì sao** nó sai (prompt chưa đủ ngữ cảnh / giới hạn mô hình / đặc thù endpoint mà mô hình không thể biết)
3. Đã sửa **như thế nào**

Phần này không phải thủ tục — nó chính là bằng chứng cho thấy con người chịu trách nhiệm cuối cùng về test plan.

---

# Tài liệu tham chiếu

Đọc file tương ứng khi cần, đừng nạp hết cùng lúc:

| File | Khi nào đọc |
|---|---|
| `references/jmeter-blueprint.md` | Khi sinh file `.jmx` — cấu trúc cây phần tử, thứ tự đặt Timer/Assertion/Config, lệnh CLI |
| `references/k6-blueprint.md` | Khi sinh script k6 — stages, thresholds, checks, SharedArray |
| `references/review-checklist.md` | Trước khi bàn giao test plan, và khi viết phần "AI sai chỗ nào" |
| `assets/workload-model-template.md` | Khi cần một biểu mẫu Workload Model trống để điền |

# Định dạng đầu ra

Trừ khi người dùng yêu cầu khác, xuất ra:

1. Bảng Performance Goal
2. Bảng Workload Model đầy đủ 3 phần
3. Sơ đồ luồng end-to-end + ánh xạ nhóm endpoint
4. Bảng tham số 3 kịch bản kèm giải trình từng con số
5. File test plan (`.jmx` hoặc `.js`) đặt đúng tên
6. Các file CSV mẫu
7. Checklist evidence cần thu
