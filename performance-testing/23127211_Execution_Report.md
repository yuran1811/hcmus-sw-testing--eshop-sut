# Execution Report — Task 1 (kết quả chạy thật)

> Bổ sung cho `23127211_Workload_Model.md`. Toàn bộ số liệu dưới đây lấy trực tiếp từ `.jtl` / `statistics.json` (JMeter) và console summary / `summary.json` (k6) thật, không phải số liệu ước tính.

## 1. Môi trường thực thi thật

| Mục      | Giá trị                                                                                       |
| -------- | --------------------------------------------------------------------------------------------- |
| Hostname | `VN1-5CG1041RBP`                                                                              |
| OS       | Ubuntu 22.04.5 LTS (WSL2, kernel 6.6.87.2-microsoft-standard-WSL2)                            |
| CPU      | Intel(R) Core(TM) i5-10310U @ 1.70GHz, 8 logical cores                                        |
| RAM      | 7.6 GiB (máy chia sẻ với các tiến trình khác đang chạy — xem ghi chú bên dưới)                |
| Disk     | 1007 GB, 948 GB trống                                                                         |
| JMeter   | 5.6.3 (cài từ `archive.apache.org`, Java: OpenJDK 17.0.19), JVM heap mặc định `-Xms1g -Xmx1g` |
| k6       | v2.2.0                                                                                        |
| Backend  | Node.js v20.20.2, chạy `node server.js` cùng máy với JMeter/k6 (không tách máy riêng)         |

**Ghi chú quan trọng:** đây là máy WSL2 cá nhân đang chạy đồng thời các tiến trình khác (Claude Code CLI, Docker Desktop proxy...) chiếm ~4GB RAM nền — đúng như cảnh báo đã nêu trong Workload Model §5, số liệu throughput đo được là giới hạn kết hợp của SUT + JMeter/k6 + tải nền của máy, không phải công suất thuần của backend.

## 2. Kết quả Load / Stress / Spike (JMeter — công cụ bắt buộc)

| Kịch bản                   | Samples | Errors | Error %    | Throughput (req/s) | Mean (ms) | p50   | p90    | p95     | p99     |
| -------------------------- | ------- | ------ | ---------- | ------------------ | --------- | ----- | ------ | ------- | ------- |
| Load (50 VU)               | 6966    | 0      | 0.00%      | 23.24              | 33.8      | 8.0   | 59.3   | 129.0   | 457.3   |
| Stress (50→400 VU)         | 39658   | 106    | 0.27%      | 59.85              | 602.3     | 239.0 | 3541.0 | 4699.0  | 7347.0  |
| Spike (50→500 VU đột biến) | 16427   | 3644   | **22.18%** | 136.67             | 1969.4    | 653.0 | 5006.0 | 10008.0 | 12403.4 |

File: `jmeter/results/23127211_{Load,Stress,Spike}_20260814.jtl` (raw, đầy đủ) + `jmeter/results/23127211_{Load,Stress,Spike}_20260814_report/` (HTML dashboard, mở `index.html`).

### Diễn giải nhanh (chi tiết đầy đủ sẽ đưa vào Task 2 — AI analysis)

- **Load**: hoàn toàn ổn định, 0 lỗi, p95 chỉ 129ms — xác nhận baseline tốt ở 50 VU.
- **Stress**: điểm gãy rõ ràng xuất hiện ở **bậc 4 (400 VU)** — log console cho thấy error rate tại bậc này tăng vọt lên 3.56% và response time trung bình 4703ms/max 10035ms trong 15s cuối, trong khi 3 bậc đầu (50/100/200 VU) gần như không lỗi. Kết luận: hệ thống chịu tải tốt tới ~200 VU, bắt đầu suy giảm rõ rệt từ 400 VU.
- **Spike**: 500 VU đột biến trong 30s làm error rate đạt đỉnh **38.2%** ở giây 30-90 (lúc giữ đỉnh tải), tổng thể 22.18% — cho thấy hệ thống **không chịu được cú sốc tải đột ngột** dù cùng mức 400-500 VU mà Stress test (đạt dần qua các bậc) chỉ gây lỗi 0.27-3.56%. Đây là bằng chứng thực nghiệm rõ ràng cho sự khác biệt giữa tăng tải từ từ (Stress) và tăng tải đột ngột (Spike) trên cùng một backend.

## 3. Kết quả k6 (bonus, cùng workflow)

| Kịch bản           | Requests | http_req_failed | Throughput (req/s) | p90    | p95     | p99   |
| ------------------ | -------- | --------------- | ------------------ | ------ | ------- | ----- |
| Load (50 VU)       | 6198     | 0.01% (1 lỗi)   | 20.09              | 47.5ms | 101.3ms | 1.57s |
| Stress (50→400 VU) | 38664    | 0.03% (13 lỗi)  | 56.19              | 2.75s  | 3.62s   | —     |
| Spike (50→500 VU)  | 12469    | 2.22%           | ~104               | —      | 3.15s   | —     |

File: `k6/results/23127211_Load_20260814_summary.json`, `23127211_Stress_20260814_raw.json` (148 MB, raw per-request), `23127211_Spike_20260814_report.txt` + `_console.log`.

**Phát hiện đối chiếu 2 công cụ (đáng đưa vào phần AI Critique/Task 2):** ở CÙNG một cấu hình VU danh nghĩa (400 VU Stress, 500 VU Spike), k6 ghi nhận error rate thấp hơn đáng kể so với JMeter (Stress: 0.03% vs 0.27%; Spike: 2.22% vs 22.18%), dù p95 vẫn tăng mạnh ở cả hai (báo hiệu backend chậm đi thật). Đúng như cảnh báo đã ghi sẵn trong `references/k6-blueprint.md` §6: _"cùng một cấu hình VU sẽ tạo ra throughput khác nhau vì k6 nhẹ hơn đáng kể trên cùng phần cứng"_ — JMeter (JVM, mỗi thread nặng hơn) tự nó trở thành một phần nghẽn cổ chai bổ sung ở tải cao, khiến error rate đo được bị **phóng đại** so với hành vi thực của riêng backend. Khi phân tích Task 2, ưu tiên coi số liệu k6 là gần với hành vi thật của backend hơn, và số liệu JMeter phải được đọc kèm cảnh báo này.

## 4. Endurance / Soak test — ngưỡng chịu tải thực nghiệm

Chạy `k6/23127211_Soak_20260814.js`: 50 VU, ramp-up 60s + steady 780s (13 phút) + ramp-down 60s = **15 phút 8 giây thực tế**.

| Chỉ số                 | Giá trị đo được                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| Tổng request           | 21571                                                                                          |
| Error rate             | 0.12% (26 lỗi / 21571)                                                                         |
| Throughput trung bình  | **23.7 req/s** — đây là **maximum stable RPS** đề xuất cho hardware này ở mức 50 VU            |
| p95 response time      | 50.87ms (rất ổn định trong suốt 15 phút, không có xu hướng tăng dần)                           |
| Response time cao nhất | 11.17s (1 outlier đơn lẻ, không lặp lại — khả năng là 1 lần lock contention SQLite thoáng qua) |

**Memory ceiling (RSS tiến trình `node server.js`, đo mỗi 5s):**

| Thời điểm          | RSS                                                                             |
| ------------------ | ------------------------------------------------------------------------------- |
| Bắt đầu tải 50 VU  | 68.6 MB                                                                         |
| Sau ~90s (bão hoà) | ~90–92 MB (dao động nhẹ quanh mức này, **không tăng thêm** dù tiếp tục giữ tải) |
| Sau khi ngừng tải  | Giảm về **70.1 MB**                                                             |

→ **Kết luận endurance**: RSS tăng nhanh trong ~90 giây đầu (giai đoạn JIT/cache warm-up bình thường của Node.js — object pool, module cache, V8 heap pre-allocation), sau đó **ổn định ở ~90MB và không tăng thêm** trong suốt phần còn lại của 15 phút chạy tải liên tục, rồi **giảm về gần mức ban đầu (70MB)** ngay sau khi tải dừng. CPU tiến trình backend giữ ổn định ~10% trong suốt bài test (trên máy 8 core), cho thấy backend hoàn toàn không bị nghẽn CPU ở mức tải này — nghẽn (nếu có) nằm ở I/O/SQLite, không phải xử lý CPU.

> ### ⚠️ ĐÍNH CHÍNH (2026-08-15) — kết luận "không có memory leak" ở trên là SAI
>
> Bản đầu của báo cáo này kết luận **"không phát hiện dấu hiệu memory leak"** dựa hoàn toàn vào đồ thị RSS. Kết luận đó **không đúng**.
>
> Khi rà lại backend sau Task 2, phát hiện `userCarts` (`backend/server.js:14`) là một object in-memory toàn cục mà `POST /api/cart` chỉ `push` thêm, còn `POST /api/checkout` **không bao giờ dọn** (đã kiểm chứng: số lần chuỗi `userCarts` xuất hiện trong handler checkout = **0**). Đây là một cấu trúc **tăng đơn điệu, không bao giờ được giải phóng** cho tới khi restart tiến trình — tức là memory leak thật sự.
>
> Bằng chứng định lượng, đo trực tiếp sau khi chạy xong toàn bộ 6 kịch bản + soak test:
>
> | Chỉ số                                                     | Giá trị đo được             |
> | ---------------------------------------------------------- | --------------------------- |
> | Số phần tử trong `userCarts[userId]` của **một** tài khoản | **24 692**                  |
> | Kích thước response `GET /api/cart`                        | **716 069 bytes** (~700 KB) |
> | Đối chứng `GET /api/categories`                            | 91 bytes                    |
> | Tỷ lệ chênh lệch                                           | **7 868 lần**               |
>
> **Vì sao soak test 15 phút không phát hiện được:** trong 15 phút chỉ có ~3 596 iteration, tương ứng ~3 596 phần tử được thêm vào ≈ **0,4 MB** — chìm hoàn toàn trong biên độ dao động ~24 MB của V8 heap trong cùng khoảng thời gian. Nói cách khác, **độ nhạy của phép đo RSS thấp hơn tốc độ rò rỉ khoảng hai bậc độ lớn**.
>
> **Bài học phương pháp:** không thể kết luận "không có memory leak" chỉ từ đồ thị RSS phẳng. Đồ thị RSS phẳng chỉ chứng minh rằng _tốc độ rò rỉ nhỏ hơn độ nhiễu của phép đo_, không chứng minh _không có rò rỉ_. Muốn kết luận chắc chắn phải kiểm tra trực tiếp các cấu trúc dữ liệu có khả năng tích luỹ (ở đây chỉ cần một lệnh `GET /api/cart`), hoặc chạy soak dài hơn nhiều bậc để tín hiệu vượt lên trên nhiễu.
>
> Lỗi này đã được báo cáo: **`BUG-CART-001`** → [issue #285](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/285). Hồ sơ đầy đủ: `tests/bug-reports/cart/BUG-CART-001.md`.

File dữ liệu thô: `k6/results/23127211_Soak_20260814_summary.json`, `k6/results/23127211_Soak_20260814_resource_FIXED_sample.csv` (xem mục 5 về lý do có "\_FIXED_sample").

## 5. Sự cố phát hiện trong lúc thực thi (bổ sung Review Notes #8, #9)

Ngoài 7 điểm đã ghi trong `23127211_Review_Notes.md` (phát hiện lúc _thiết kế_), quá trình _thực thi_ thật phát hiện thêm 2 lỗi kỹ thuật của chính bộ công cụ AI đã sinh ra, phải sửa tại chỗ:

| #   | Hạng mục                                   | Vấn đề                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Nguyên nhân gốc                                                                                                                                                                                                                                      | Đã sửa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8   | JMeter Listener filename                   | 3 file `.jmx` ban đầu đặt `filename` của Listener **trùng** với đường dẫn `-l` truyền qua CLI → 2 writer cùng ghi 1 file `.jtl` → dòng dữ liệu bị nhân đôi/lệch cột (16 vs 17 cột) → JMeter báo `Mismatch between expected number of columns` và **không sinh được HTML report** dù bản thân test chạy đúng (0% lỗi). Phát hiện khi chạy Load test lần đầu.                                                                                                                                                        | Giới hạn mô hình — generator (`generate_jmx.py`) không tuân theo đúng khuyến nghị đã tự ghi trong `references/jmeter-blueprint.md` §4 ("nên để trống filename và để `-l` quyết định nơi ghi"), một mâu thuẫn giữa tài liệu thiết kế và code sinh ra. | Sửa `result_collector()` trong `generate_jmx.py`: tất cả Listener dùng `filename=""`, chỉ `-l` ghi file. Regenerate lại cả 3 `.jmx`, chạy lại Load test — thành công, report sinh đúng.                                                                                                                                                                                                                                                                                                                                                                 |
| 9   | `monitor_resources.sh` — nhận diện sai PID | Script dùng `pgrep -f "node server.js"` để tìm tiến trình backend, nhưng lệnh này khớp **cả** dòng lệnh wrapper của chính shell đang chạy nó (`bash -c "... eval 'node server.js' ..."`), và `head -1` chọn nhầm PID của bash wrapper (luôn đứng yên, RSS/CPU = 0%) thay vì PID Node thật. Toàn bộ log resource của Load/Stress/Spike (cả JMeter lẫn k6) và bản chạy Soak 15 phút đầu tiên đều **vô nghĩa** (flat 3200KB/0% suốt) — chỉ phát hiện khi đối chiếu thủ công bằng `ps aux` lúc soạn báo cáo endurance. | Đặc thù môi trường — `pgrep -f` khớp theo toàn bộ chuỗi lệnh, không lường trước rằng chính script test cũng chạy bên trong một tiến trình bash có chứa chuỗi con trùng khớp.                                                                         | Đổi sang `pgrep -x node` (khớp chính xác tên tiến trình `node`, không khớp `bash`). Chạy lại một mẫu resource đối chứng 150s/50VU ngay sau khi sửa để xác minh dữ liệu hợp lệ (RSS tăng dần 68→92MB rồi ổn định — khớp logic) — dùng mẫu này (`_FIXED_sample.csv`) làm bằng chứng memory ceiling thay cho log gốc bị lỗi. **Không re-run lại toàn bộ 6 lần test tốn ~50 phút chỉ để lấy log resource**, vì log resource là dữ liệu bổ trợ (số liệu request/latency/error trong `.jtl`/summary — vốn không phụ thuộc script này — vẫn hoàn toàn hợp lệ). |

Các file `*_resource.csv` gốc (Load/Stress/Spike của cả JMeter và k6, và bản Soak 15 phút) **vẫn được giữ lại nguyên trạng** trong `results/` làm bằng chứng minh bạch của quá trình (không xoá bằng chứng lỗi), nhưng **không dùng làm số liệu memory/CPU trong báo cáo** — chỉ `23127211_Soak_20260814_resource_FIXED_sample.csv` (chạy sau khi sửa `pgrep -x node`) mới là nguồn số liệu RSS/CPU dùng ở mục 4.

## 6. Việc CHƯA làm được trong phiên này (cần bạn tự thực hiện)

Môi trường thực thi (WSL2 cùng máy Claude Code đang chạy) có thể chạy CLI JMeter/k6 và thu log/report thật, nhưng **không thể**:

- Chụp ảnh màn hình **tool + resource monitor (htop/Task Manager) trong cùng một khung hình** — đây là bằng chứng do con người chụp trực tiếp, không thể tự động hoá qua CLI.
- Quay **video demo ≥6 phút có giọng nói tiếng Việt của bạn**.
- Chụp `dxdiag`/`screenfetch` theo đúng định dạng bài yêu cầu (đã liệt kê số liệu hardware tương đương ở mục 1, nhưng cần bạn tự chụp ảnh màn hình thật).

→ Đề nghị: mở lại đúng 3 file `.jmx` này trong JMeter GUI (hoặc chạy lại bằng CLI như đã làm) trên chính máy `VN1-5CG1041RBP`, mở `htop`/Task Manager cạnh cửa sổ JMeter, quay màn hình + thuyết minh. Vì `.jtl`/report **đã có sẵn thật** từ lần chạy này, bạn có thể chạy lại nhanh (không bắt buộc phải đạt số liệu giống hệt) chỉ để phục vụ quay hình, và nộp kèm bộ log/report đã có ở đây làm bằng chứng số liệu chính thức.

## 7. Danh sách file thực thi đã sinh

```
performance-testing/jmeter/results/
├── 23127211_Load_20260814.jtl
├── 23127211_Load_20260814_report/               (HTML dashboard)
├── 23127211_Load_20260814_resource.csv           (log lỗi PID — xem mục 5)
├── 23127211_Stress_20260814.jtl
├── 23127211_Stress_20260814_report/
├── 23127211_Stress_20260814_resource.csv          (log lỗi PID)
├── 23127211_Spike_20260814.jtl
├── 23127211_Spike_20260814_report/
├── 23127211_Spike_20260814_resource.csv           (log lỗi PID)
├── 23127211_Load_20260814_run1_corrupted.jtl      (bằng chứng lỗi #8, giữ lại minh bạch)
└── smoke/                                         (smoke test 1 VU, xác minh trước khi chạy thật)

performance-testing/k6/results/
├── 23127211_Load_20260814_summary.json
├── 23127211_Load_20260814_resource.csv            (log lỗi PID)
├── 23127211_Stress_20260814_raw.json              (148MB, raw per-request)
├── 23127211_Stress_20260814_resource.csv          (log lỗi PID)
├── 23127211_Spike_20260814_report.txt
├── 23127211_Spike_20260814_console.log
├── 23127211_Spike_20260814_resource.csv           (log lỗi PID)
├── 23127211_Soak_20260814_summary.json
├── 23127211_Soak_20260814_resource.csv            (log lỗi PID, 15 phút đầu)
└── 23127211_Soak_20260814_resource_FIXED_sample.csv  (nguồn số liệu memory ceiling dùng trong báo cáo)

performance-testing/k6/23127211_Soak_20260814.js   (script soak/endurance, không thuộc 3 file bắt buộc nhưng cần cho §Task 1 "endurance threshold")
```
