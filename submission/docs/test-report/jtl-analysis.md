# Phân Tích Raw JTL Và Đánh Giá Hiệu Năng

> **Phiên bản:** 2.0 - cập nhật theo human review ngày 2026-08-16
> **Workflow:** `checkout-with-coupon`
> **SUT:** Node.js/Express với SQLite, chạy trên localhost
> **Nguồn chính:** raw JMeter `.jtl`; HTML dashboard chỉ dùng để đối chiếu

## Mục lục

- [1. Mục tiêu và phạm vi](#1-mục-tiêu-và-phạm-vi)
- [2. Phương pháp và định nghĩa metric](#2-phương-pháp-và-định-nghĩa-metric)
- [3. Các file JTL và profile kiểm thử](#3-các-file-jtl-và-profile-kiểm-thử)
- [4. Metric tổng thể từ raw JTL](#4-metric-tổng-thể-từ-raw-jtl)
- [5. Phân tích theo sampler](#5-phân-tích-theo-sampler)
- [6. Phân tích lỗi và cửa sổ thời gian](#6-phân-tích-lỗi-và-cửa-sổ-thời-gian)
- [7. Phân tích từng kịch bản](#7-phân-tích-từng-kịch-bản)
- [8. Đối chiếu dashboard và các điểm dễ hiểu sai](#8-đối-chiếu-dashboard-và-các-điểm-dễ-hiểu-sai)
- [9. Ngưỡng hiệu năng đề xuất](#9-ngưỡng-hiệu-năng-đề-xuất)
- [10. Đánh giá đề xuất tối ưu hóa](#10-đánh-giá-đề-xuất-tối-ưu-hóa)
- [11. Kết luận và giới hạn](#11-kết-luận-và-giới-hạn)

## 1. Mục tiêu và phạm vi

Báo cáo này phân tích sáu raw JTL của workflow E2E:

`POST /api/login` -> `GET /api/categories` -> `GET /api/products?search=` -> `POST /api/cart` -> `POST /api/apply-coupon` -> `POST /api/checkout` -> `GET /api/orders/my-orders`.

Mục tiêu là:

- Tính lại các metric hiệu năng từ dữ liệu thô thay vì phụ thuộc vào một giá trị tổng hợp của dashboard.
- Xác định latency trung tâm và tail latency theo kịch bản và theo sampler.
- Đếm lỗi theo cột `success`, đồng thời phân biệt HTTP error với Duration Assertion hoặc network failure.
- Kiểm tra suy giảm theo cửa sổ thời gian, đặc biệt ở Stress, Spike và Soak.
- Đề xuất ngưỡng regression có phân biệt giữa hard gate, warning và exploratory threshold.
- Đánh giá các đề xuất tối ưu hóa theo stack thực tế, không khẳng định nguyên nhân mà raw JTL chưa chứng minh.

## 2. Phương pháp và định nghĩa metric

### 2.1. Cột được sử dụng

Raw JTL có header:

`timeStamp, elapsed, label, responseCode, responseMessage, threadName, dataType, success, failureMessage, bytes, sentBytes, grpThreads, allThreads, URL, Latency, IdleTime, Connect`.

- `elapsed`: thời gian hoàn tất sample, tính bằng milliseconds. Đây là latency chính cho p90/p95/p99 và threshold.
- `Latency`: thời gian tới byte đầu tiên. Không được thay thế `elapsed` bằng cột này.
- `timeStamp`: dùng để xác định vị trí sample trong run và chia minute-window.
- `success`: sample thành công khi giá trị là `true`. Mọi row có `success != true` đều được tính là failure, kể cả khi `responseCode=200`.
- `failureMessage`: dùng để phân loại assertion failure, timeout hoặc network failure.

### 2.2. Công thức

Với một tập `n` samples:

```text
error_rate = failures / n * 100
average = mean(elapsed)
percentile = percentile(elapsed, q)
duration_seconds = (max(timeStamp) - min(timeStamp)) / 1000
whole_run_throughput = n / duration_seconds
```

Percentile dùng nội suy tuyến tính trên toàn bộ giá trị `elapsed`, tương đương cách tính của parser trong skill `perf-jtl-analyzer`. Whole-run throughput là trung bình của toàn khoảng timestamp, không phải throughput riêng của giai đoạn steady-state sau ramp-up.

### 2.3. Quy ước đọc kết quả

P95/p99 mô tả phần lớn phân phối nhưng không được dùng để phủ nhận một failure episode. Ngược lại, `max` không đại diện cho steady-state latency, nhưng một max cực lớn đi kèm nhiều `success=false` phải được báo cáo như sự cố, không được gọi đơn giản là một outlier vô hại.

## 3. Các file JTL và profile kiểm thử

| Kịch bản     | Raw JTL                                                                                 |
| ------------ | --------------------------------------------------------------------------------------- |
| Load         | `submission/tests/2-test-runs/checkout-with-coupon/load/20260813-load-official.jtl`     |
| Stress       | `submission/tests/2-test-runs/checkout-with-coupon/stress/20260813-stress-official.jtl` |
| Spike        | `submission/tests/2-test-runs/checkout-with-coupon/spike/20260813-spike-official.jtl`   |
| Soak 130 VUs | `submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-130vu.jtl`        |
| Soak 180 VUs | `submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-180vu.jtl`        |
| Soak 230 VUs | `submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-230vu.jtl`        |

Profile theo test plan:

| Kịch bản |                            Mức tải | Ramp-up / delay                   |    Thời lượng thiết kế |         Think time |
| -------- | ---------------------------------: | --------------------------------- | ---------------------: | -----------------: |
| Load     |                             50 VUs | ramp-up 120 s                     |                  600 s | 2000 ms +/- 300 ms |
| Stress   | staged 50 -> 100 -> 150 -> 200 VUs | stage tại 0/300/600/900 s         |          tối đa 1200 s | 1000 ms +/- 200 ms |
| Spike    |                       peak 100 VUs | ramp-up 10 s, delay baseline 60 s | khoảng 480 s theo plan |  500 ms +/- 100 ms |
| Soak     |                    130/180/230 VUs | ramp-up 180 s                     |                  720 s | 1500 ms +/- 200 ms |

> **Lưu ý:** thời lượng thực tế trong JTL được xác định từ `min(timeStamp)` đến `max(timeStamp)`. Vì vậy duration thực tế có thể khác duration cấu hình, nhất là khi có request còn đang hoàn tất sau thời điểm thread group dừng.

## 4. Metric tổng thể từ raw JTL

| Kịch bản     | Duration | Requests | Success | Failures | Error rate | Whole-run throughput | Avg elapsed |     p90 |      p95 |      p99 | Max elapsed |
| ------------ | -------: | -------: | ------: | -------: | ---------: | -------------------: | ----------: | ------: | -------: | -------: | ----------: |
| Load         | 1276.2 s |    5,996 |   5,996 |        0 |     0.000% |            4.698 rps |    17.41 ms | 17.0 ms |  25.0 ms | 51.35 ms |    2,360 ms |
| Stress       | 1198.7 s |  138,180 | 138,139 |       41 |  0.029671% |          115.276 rps |    55.98 ms | 97.0 ms | 259.0 ms | 925.0 ms |    3,486 ms |
| Spike        |  718.2 s |   45,436 |  45,402 |       34 |  0.074831% |           63.266 rps |    91.21 ms | 30.0 ms | 40.25 ms |  68.0 ms |  481,450 ms |
| Soak 130 VUs |  718.3 s |   54,364 |  54,364 |        0 |     0.000% |           75.687 rps |     6.35 ms | 15.0 ms |  21.0 ms |  28.0 ms |      691 ms |
| Soak 180 VUs |  718.1 s |   75,207 |  75,207 |        0 |     0.000% |          104.725 rps |     6.59 ms | 15.0 ms |  20.0 ms |  29.0 ms |       71 ms |
| Soak 230 VUs |  718.4 s |   95,747 |  95,747 |        0 |     0.000% |          133.280 rps |    10.96 ms | 24.0 ms |  35.0 ms |  84.0 ms |      311 ms |

### 4.1. Đọc nhanh kết quả

- **Load:** baseline sạch; không có failure và p95 tổng chỉ `25 ms`.
- **Stress:** error rate tổng thấp nhưng có 41 assertion failures trong một cửa sổ; p95/p99 tăng đáng kể so với Load.
- **Spike:** p95/p99 của phần lớn samples thấp, nhưng có failure episode nghiêm trọng làm max lên `481,450 ms`.
- **Soak 130 và 180:** không có failure và tail latency thấp trong toàn run.
- **Soak 230:** vẫn không có failure, nhưng p95 tăng từ `20 ms` ở Soak 180 lên `35 ms`, p99 tăng từ `29 ms` lên `84 ms`, và late-run p95 tăng mạnh. Đây là vùng cảnh báo, chưa phải failure point.

## 5. Phân tích theo sampler

Các ô dưới đây có dạng `p95 / p99` theo `elapsed` và được tính riêng cho từng label.

| Sampler                    |             Load |             Stress |          Spike |       Soak 130 |       Soak 180 |        Soak 230 |
| -------------------------- | ---------------: | -----------------: | -------------: | -------------: | -------------: | --------------: |
| Step 1 POST login          |  13.1 / 63.54 ms |    259 / 968.08 ms |     36 / 65 ms |     15 / 26 ms |     16 / 27 ms |      33 / 76 ms |
| Step 2 GET categories      |     9 / 41.16 ms |    254 / 894.35 ms |     37 / 62 ms |     14 / 24 ms |     15 / 25 ms |      30 / 74 ms |
| Step 3 GET products search |    7 / 248.73 ms | 263.65 / 904.66 ms |     36 / 62 ms |     14 / 23 ms |     15 / 26 ms |      32 / 80 ms |
| Step 4 POST cart           |        5 / 22 ms |       114 / 452 ms |     15 / 29 ms |      4 / 10 ms |      4 / 11 ms |      12 / 34 ms |
| Step 5 POST apply-coupon   |    10 / 31.06 ms |  **427 / 1288 ms** | **52 / 88 ms** |  19 / 31.53 ms |     21 / 34 ms | **46 / 123 ms** |
| Step 6 POST checkout       | **29 / 53.8 ms** |    263 / 924.19 ms |  49 / 73.34 ms | **27 / 36 ms** | **26 / 37 ms** |    42.4 / 94 ms |
| Step 7 GET my-orders       |  11.2 / 76.72 ms |    261.35 / 891 ms |     42 / 70 ms |     15 / 25 ms |     17 / 27 ms |      39 / 90 ms |

### 5.1. Sampler chậm nhất theo p95

| Kịch bản | Sampler p95 cao nhất     |    p95 |     p99 | Diễn giải đúng                                                                                   |
| -------- | ------------------------ | -----: | ------: | ------------------------------------------------------------------------------------------------ |
| Load     | Step 6 POST checkout     |  29 ms | 53.8 ms | Checkout là bước chậm nhất ở baseline, nhưng không có failure.                                   |
| Stress   | Step 5 POST apply-coupon | 427 ms | 1288 ms | Đây là hotspot quan sát được về latency; raw chưa chứng minh chắc chắn nguyên nhân SQL.          |
| Spike    | Step 5 POST apply-coupon |  52 ms |   88 ms | p95/p99 của phân phối chính thấp, nhưng không được bỏ qua failure episode ngoài tail percentile. |
| Soak 130 | Step 6 POST checkout     |  27 ms |   36 ms | Ổn định.                                                                                         |
| Soak 180 | Step 6 POST checkout     |  26 ms |   37 ms | Ổn định trong whole-run và late-run.                                                             |
| Soak 230 | Step 5 POST apply-coupon |  46 ms |  123 ms | Tail tăng so với 180 VUs; cần cảnh báo và theo dõi trend.                                        |

### 5.2. Latency và elapsed không phải cùng một metric

Ví dụ trong Spike `Step 6 POST checkout`:

- Average `Latency = 26.981 ms`.
- Average `elapsed = 101.255 ms`.

`Latency` chỉ phản ánh thời gian tới byte đầu tiên, còn `elapsed` phản ánh thời gian hoàn tất sample. Regression gate phải dùng `elapsed`; nếu dùng `Latency` thay thế sẽ đánh giá thấp thời gian người dùng chờ response hoàn chỉnh.

## 6. Phân tích lỗi và cửa sổ thời gian

### 6.1. Phân loại failure theo raw JTL

| Kịch bản         | Tổng failure | HTTP/status profile                            | Failure message / nguyên nhân                                                         |
| ---------------- | -----------: | ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| Load             |            0 | Không có                                       | Không có failure.                                                                     |
| Stress           |           41 | `41/41` có `responseCode=200`                  | Tất cả là `success=false` do Duration Assertion `2000 ms`; không phải HTTP 4xx/5xx.   |
| Spike            |           34 | `33/34` có `responseCode=200`; `1/34` non-HTTP | 33 Duration Assertion failures; 1 `Non HTTP response code: java.net.SocketException`. |
| Soak 130/180/230 |            0 | Không có                                       | Không có failure theo `success`.                                                      |

Stress failure phân bố theo label:

| Label                      | Failures | Raw evidence                                                               |
| -------------------------- | -------: | -------------------------------------------------------------------------- |
| Step 2 GET categories      |        6 | `responseCode=200`, `elapsed` khoảng 2098-2290 ms, vượt assertion 2000 ms. |
| Step 3 GET products search |       17 | `responseCode=200`, `elapsed` khoảng 2042-2347 ms, vượt assertion 2000 ms. |
| Step 7 GET my-orders       |       18 | `responseCode=200`, `elapsed` khoảng 2097-2299 ms, vượt assertion 2000 ms. |

> Vì vậy, nếu chỉ đếm HTTP 4xx/5xx, Stress sẽ bị đọc sai thành không có lỗi. Cách đúng là đếm cột `success` rồi dùng `failureMessage` để giải thích loại failure.

### 6.2. Stress minute-window

Cửa sổ được tính theo `seconds_in = (timeStamp - min(timeStamp)) / 1000`, rồi chia mỗi 60 giây.

| Minute | Khoảng giây |  Requests | Failures | Error rate |    p95 elapsed | Max elapsed |
| -----: | ----------: | --------: | -------: | ---------: | -------------: | ----------: |
|     10 |     600-660 |     8,112 |        0 |     0.000% |       44.45 ms |      469 ms |
|     11 |     660-720 |     8,811 |        0 |     0.000% |          64 ms |      461 ms |
| **12** | **720-780** | **7,006** |   **41** | **0.585%** | **1246.75 ms** | **3486 ms** |
|     13 |     780-840 |     7,562 |        0 |     0.000% |         737 ms |     2426 ms |
|     14 |     840-900 |     8,122 |        0 |     0.000% |         511 ms |     1384 ms |
|     15 |     900-960 |    10,424 |        0 |     0.000% |         325 ms |      773 ms |
|     16 |    960-1020 |    11,267 |        0 |     0.000% |      207.70 ms |     1662 ms |
|     17 |   1020-1080 |    11,085 |        0 |     0.000% |         464 ms |     1843 ms |
|     18 |   1080-1140 |    11,670 |        0 |     0.000% |          49 ms |      155 ms |

Kết luận đúng là: failure bắt đầu ở minute 12, nhưng tail-latency degradation còn kéo dài đến minute 17 và chỉ trở về mức thấp ở minute 18. Không nên mô tả toàn bộ hiện tượng này như chỉ một cửa sổ tại phút 12.

### 6.3. Spike: vị trí và quy mô failure episode

Raw Spike có duration `718.175 s`. Max row nằm tại dòng `45359` của raw file:

```text
timeStamp=1786631369509
elapsed=481450
label=Step 1 POST login
responseCode=200
success=false
failureMessage=The operation lasted too long: ... should not have lasted longer than 5000 milliseconds.
```

Timestamp này nằm khoảng `237.485 s` sau sample đầu tiên, không phải cuối run. Cụm tại khoảng `237.5 s` có 6 Duration Assertion failures với `elapsed=480762-481450 ms` và một SocketException với `elapsed=480295 ms`.

Ở cuối run, từ khoảng `717.816 s` đến `718.175 s`, có 27 Duration Assertion failures với `elapsed=2039-2213 ms`, chủ yếu ở `GET my-orders`, cùng một số failure ở Products và Categories.

Tổng cộng có 7 samples vượt 5000 ms, không phải một max đơn lẻ. P95 `40.25 ms` và p99 `68 ms` vẫn mô tả phân phối chính, nhưng chúng không thể dùng để loại bỏ failure episode này khỏi đánh giá Spike.

Minute summary của Spike:

| Minute | Requests | Failures |        p95 |        Max | Nhận xét                                                 |
| -----: | -------: | -------: | ---------: | ---------: | -------------------------------------------------------- |
|      0 |   10,780 |        0 |      35 ms |     123 ms | Baseline trước sự cố.                                    |
|      1 |   11,740 |        0 |      38 ms |     142 ms | Steady behavior vẫn thấp.                                |
|      2 |   11,681 |        0 |      38 ms |     125 ms | Steady behavior vẫn thấp.                                |
|      3 |   11,142 |        7 |      48 ms | 481,450 ms | Cụm request bị treo/hoàn tất rất muộn ở khoảng giây 237. |
|     11 |       93 |       27 | 2384.80 ms |    2505 ms | Các Duration Assertion failures cuối run.                |

Không có sample timestamped trong các khoảng giữa minute 3 và minute 11 vì nhiều request đang in-flight và chỉ hoàn tất gần cuối run. Đây là lý do không được đọc bảng minute như một chuỗi steady-state liên tục.

### 6.4. Soak: whole-run throughput và late-run trend

Soak có ramp-up `180 s`, nên whole-run throughput bao gồm cả giai đoạn tải đang tăng. Để kiểm tra riêng phần sau ramp-up, dùng lát chẩn đoán `180-660 s`:

| Kịch bản | Whole-run requests / RPS | Diagnostic slice requests | Slice RPS | Slice p95 | Slice p99 |
| -------- | -----------------------: | ------------------------: | --------: | --------: | --------: |
| Soak 130 |          54,364 / 75.687 |                    41,420 |    86.292 |     21 ms |     29 ms |
| Soak 180 |         75,207 / 104.725 |                    57,305 |   119.385 |     20 ms |     29 ms |
| Soak 230 |         95,747 / 133.280 |                    73,052 |   152.192 |     30 ms |     64 ms |

Các con số slice chỉ là chẩn đoán, không thay thế báo cáo whole-run. Chúng cho thấy `104.725 rps` không nên được gọi là throughput steady-state thuần túy.

Late-run p95 của Soak 180 vẫn dao động thấp: minute 8/9/10/11 lần lượt `22/20/19/21 ms`. Soak 230 có trend tăng rõ: minute 8/9/10/11 lần lượt `25/44/58/94 ms`, dù error rate vẫn `0%`. Đây là bằng chứng cho việc đưa 230 VUs vào vùng cảnh báo, không phải gọi nó là failure point.

## 7. Phân tích từng kịch bản

### 7.1. Load

Load có `5,996` samples, `0` failure, p95 tổng `25 ms`, p99 `51.35 ms`, max `2360 ms`. Cửa sổ cuối chỉ có `50` samples và p95 `1904.40 ms`, max `2360 ms`, nhưng không có failure. Vì sample cuối rất ít và không tạo thành trend kéo dài, đây là late-run outlier cần theo dõi chứ chưa đủ để kết luận Load degradation.

Đánh giá: **Pass baseline**, với điều kiện không dùng max đơn lẻ làm đại diện cho latency thông thường.

### 7.2. Stress

Stress có `138,180` samples, `41` failure, error rate tổng `0.029671%`, whole-run throughput `115.276 rps`, p95 `259 ms`, p99 `925 ms`. Failure bắt đầu ở minute 12 và đều là Duration Assertion failure trên các read endpoint. `Step 5 POST apply-coupon` có p95 cao nhất `427 ms` và p99 `1288 ms`, nhưng raw JTL không đủ để chứng minh chắc chắn query scan là nguyên nhân.

Đánh giá: **Không phải failure-rate cao ở cấp toàn run, nhưng có warning rõ ràng về cửa sổ minute 12 và tail latency kéo dài đến minute 17.** Stress không nên được tóm tắt là “ổn định vì error rate tổng chỉ 0.03%”.

### 7.3. Spike

Spike có p95 tổng `40.25 ms`, p99 `68 ms`, error rate `0.074831%`, nhưng có 34 failure. Max `481450 ms` xuất hiện ở khoảng giây `237.485`; 6 Duration Assertion failures và 1 SocketException tạo thành failure episode lớn. Cuối run còn 27 Duration Assertion failures quanh ngưỡng 2 giây.

Đánh giá: **Không pass cleanly nếu regression gate có hard assertion/error requirement.** P95/p99 thấp chỉ nói rằng đa số samples nhanh; chúng không phủ nhận sự cố treo request và failure ở Spike.

### 7.4. Soak 130 VUs

Soak 130 có `0` failure, p95 `21 ms`, p99 `28 ms`, whole-run throughput `75.687 rps`. Minute-window không cho thấy trend tăng dần; max `691 ms` là một sample thành công và không làm thay đổi tail percentile đáng kể.

Đánh giá: **Pass và ổn định.**

### 7.5. Soak 180 VUs

Soak 180 có `0` failure, p95 `20 ms`, p99 `29 ms`, whole-run throughput `104.725 rps`. Sau ramp-up, lát `180-660 s` đạt `119.385 rps`, p95 `20 ms`, p99 `29 ms`; late-run p95 vẫn ở khoảng `19-22 ms`.

Đánh giá: **Ngưỡng ổn định bảo thủ hợp lý.** Cần ghi rõ `104.725 rps` là whole-run average, còn `119.385 rps` là throughput của lát chẩn đoán sau ramp-up.

### 7.6. Soak 230 VUs

Soak 230 có `0` failure, whole-run throughput `133.280 rps`, p95 `35 ms`, p99 `84 ms`, max `311 ms`. Tuy nhiên late-run p95 tăng từ `25 ms` ở minute 8 lên `94 ms` ở minute 11. Vì vậy 230 VUs đã chạy thành công về mặt functional success nhưng có dấu hiệu tail-latency degradation.

Đánh giá: **Upper bound đã chạy thành công và là vùng cảnh báo, chưa phải failure point.**

## 8. Đối chiếu dashboard và các điểm dễ hiểu sai

### 8.1. Stress dashboard Total

HTML dashboard có `statistics.json` ghi Total `pct2ResTime=53 ms`, trong khi tính trực tiếp trên `138,180` raw rows cho p95 `259 ms` và p99 `925 ms`. Vì vậy giá trị `53 ms` không được dùng làm p95 authoritative cho Task 2. Raw JTL với cột `elapsed` là nguồn chính.

### 8.2. Soak 230 dashboard Total

Dashboard Total ghi một percentile tail là `144 ms`, trong khi raw parser tính p95 `35 ms` và p99 `84 ms`. Chênh lệch này cần ghi chú khi so sánh; không được trộn `144 ms` của dashboard với `84 ms` của raw rồi gọi chúng là cùng một phép tính. Kết luận chắc chắn từ raw là p95 `35 ms`, p99 `84 ms` và late-run p95 tăng đến `94 ms`.

### 8.3. Các lỗi diễn giải cần tránh

| Cách đọc sai                                               | Cách đọc đúng                                                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Dùng `responseCode` để đếm lỗi.                            | Dùng `success`; `responseCode=200` vẫn có thể `success=false` do Duration Assertion.        |
| Gọi Spike max `481450 ms` là một outlier ở cuối run.       | Max xảy ra ở giây `237.485`; có 7 samples trên 5000 ms và 34 failures.                      |
| Gọi Stress chỉ có degradation tại phút 12.                 | Failure bắt đầu tại phút 12, nhưng p95 còn cao đến phút 17.                                 |
| Gọi Soak 180 `104.725 rps` là steady throughput thuần túy. | Đây là whole-run average có chứa 180 s ramp-up.                                             |
| Kết luận index là nguyên nhân từ p95 JTL.                  | JTL chỉ cho thấy symptom; cần query plan/profiling/A-B benchmark để chứng minh nguyên nhân. |
| Dùng `Latency` thay `elapsed`.                             | Threshold phải dựa trên thời gian hoàn tất response, tức `elapsed`.                         |

## 9. Ngưỡng hiệu năng đề xuất

Các ngưỡng dưới đây là regression reference cho môi trường localhost, không phải SLO production. `success=false` và Duration Assertion failure phải được ghi nhận riêng ngay cả khi error rate tổng dưới ngưỡng mềm.

### 9.1. Ngưỡng theo kịch bản

| Kịch bản |                Error rate reference | P95 whole-run | P99 whole-run | Throughput reference | Hard/warning rule                                                                                               |
| -------- | ----------------------------------: | ------------: | ------------: | -------------------: | --------------------------------------------------------------------------------------------------------------- |
| Load     |                <= 0.5%, mục tiêu 0% |     <= 100 ms |     <= 250 ms |             >= 4 rps | Bất kỳ failure nào cần điều tra vì baseline hiện tại là 0.                                                      |
| Stress   | <= 5% exploratory; <= 1% regression |     <= 500 ms |    <= 1500 ms |           >= 100 rps | Warning khi minute-window p95 > 1000 ms hoặc error rate > 1%; failure window phải ghi riêng.                    |
| Spike    | <= 5% exploratory; <= 1% regression |     <= 100 ms |     <= 200 ms |            >= 50 rps | Không dùng max đơn lẻ làm steady gate, nhưng Duration Assertion/network failure phải tạo investigation failure. |
| Soak 130 |      mục tiêu 0%, chấp nhận <= 0.5% |      <= 50 ms |     <= 100 ms |            >= 70 rps | Không có late-run trend tăng dần.                                                                               |
| Soak 180 |      mục tiêu 0%, chấp nhận <= 0.5% |      <= 50 ms |     <= 100 ms | >= 100 rps whole-run | Dùng làm stable baseline; kiểm tra thêm minute-window sau ramp-up.                                              |
| Soak 230 |                               <= 1% |     <= 100 ms |     <= 200 ms | >= 125 rps whole-run | Upper-bound/warning; alert nếu late-run p95 tăng liên tục dù chưa có failure.                                   |

### 9.2. Ngưỡng p95 theo sampler

Đây là ngưỡng ban đầu để regression gate, cần hiệu chỉnh sau nhiều lần chạy lặp trên cùng hardware.

| Sampler                    | Load gate | Stress gate | Soak stable gate |
| -------------------------- | --------: | ----------: | ---------------: |
| Step 1 POST login          |  <= 50 ms |   <= 350 ms |         <= 50 ms |
| Step 2 GET categories      |  <= 30 ms |   <= 350 ms |         <= 50 ms |
| Step 3 GET products search |  <= 40 ms |   <= 350 ms |         <= 60 ms |
| Step 4 POST cart           |  <= 20 ms |   <= 200 ms |         <= 30 ms |
| Step 5 POST apply-coupon   |  <= 50 ms |   <= 600 ms |         <= 80 ms |
| Step 6 POST checkout       |  <= 75 ms |   <= 400 ms |         <= 80 ms |
| Step 7 GET my-orders       |  <= 50 ms |   <= 350 ms |         <= 70 ms |

### 9.3. Đánh giá kết quả theo ngưỡng

| Kịch bản | Kết quả so với gate                                                                                                 | Kết luận                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Load     | Đạt toàn bộ metric tổng thể; 0 failure                                                                              | Pass baseline.                                             |
| Stress   | Whole-run p95 dưới 500 ms và error rate dưới 1%, nhưng có minute 12 failure/p95 1246.75 ms và p95 cao đến minute 17 | Warning; không coi là clean pass.                          |
| Spike    | Whole-run p95/p99 thấp, nhưng có 34 failure và 7 samples >5000 ms                                                   | Investigation failure; cần điều tra overload/request hang. |
| Soak 130 | 0 failure, tail thấp, không có trend xấu                                                                            | Pass.                                                      |
| Soak 180 | 0 failure, p95/p99 ổn định cả late-run                                                                              | Stable baseline/pass.                                      |
| Soak 230 | 0 failure, metric toàn run dưới gate nhưng late-run p95 lên 94 ms                                                   | Upper-bound warning, chưa phải failure point.              |

## 10. Đánh giá đề xuất tối ưu hóa

Raw JTL cho thấy symptom và workload impact; nó không chứa query plan, CPU profile hoặc lock profile. Vì vậy các đề xuất về database cần được kiểm chứng bằng benchmark hoặc profiling trước khi kết luận nguyên nhân.

| Đề xuất                                                                | Phân loại   | Đánh giá dựa trên evidence                                                                                                                                      |
| ---------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Index `users(email)`                                                   | **Khả thi** | Backend login dùng `WHERE email = ?`; cần kiểm tra duplicate và uniqueness nghiệp vụ trước khi dùng `UNIQUE`, sau đó xác nhận bằng query plan/A-B benchmark.    |
| Index `orders(user_id, id DESC)`                                       | **Khả thi** | Khớp filter/order của `my-orders`; raw chưa chứng minh table scan nên phải kiểm tra `EXPLAIN QUERY PLAN` trước khi kết luận hiệu quả.                           |
| Index `coupons(code, is_active)` và `coupon_usage(coupon_id, user_id)` | **Khả thi** | Có liên hệ với lookup của `apply-coupon` và hotspot Stress, nhưng cần profiling/A-B benchmark; index coupon có thể dư vì `code` đã có unique auto-index.        |
| SQLite WAL và `busy_timeout`                                           | **Khả thi** | Phù hợp với `sqlite3`, có thể cải thiện cạnh tranh đọc/ghi; phải đo lock contention, p95/p99 và failure trước/sau, không xem là nguyên nhân đã được chứng minh. |
| Parameterized query và FTS/prefix search cho Products                  | **Khả thi** | Parameterization là thay đổi cần làm cho security/correctness; FTS5 hoặc prefix search chỉ dùng khi dataset, SQLite build và semantics tìm kiếm phù hợp.        |
| Redis cache cho categories/products                                    | **Khả thi** | Có thể giảm tải read-heavy nhưng cần thêm dependency, TTL và invalidation; không phải quick fix cho failure hiện tại.                                           |

Các phương án pool cho SQLite, horizontal scaling trực tiếp với SQLite/in-memory cart và JVM heap tuning đã bị loại khỏi kế hoạch vì không phù hợp với SUT hiện tại. Connection pool chỉ được xem xét sau migration sang database server và không phải giải pháp trực tiếp cho benchmark hiện tại.

Thứ tự điều tra thực tế nên là: (1) kiểm tra event loop/SQLite lock contention trong Stress và Spike, (2) chạy `EXPLAIN QUERY PLAN` cho các query có index candidate, (3) benchmark từng index/WAL change, (4) lặp lại Stress/Spike/Soak với cùng profile và so sánh p95/p99, failure count và late-run window.

## 11. Kết luận và giới hạn

### 11.1. Kết luận chính

1. Load là baseline sạch với `0` failure và p95 `25 ms`.
2. Stress có error rate tổng thấp `0.029671%`, nhưng 41 failure đều là Duration Assertion trên `2000 ms`; failure bắt đầu ở minute 12 và tail latency còn cao đến minute 17.
3. Spike không được mô tả chỉ bằng p95 `40.25 ms` hoặc max `481450 ms`. Raw cho thấy một failure episode lớn tại khoảng giây `237.485`, gồm 6 Duration Assertion failure cực dài và 1 SocketException, cùng 27 failure cuối run.
4. Soak 130 và 180 ổn định. `180 VUs` là ngưỡng ổn định bảo thủ hợp lý.
5. Soak 230 chạy thành công với `0` failure nhưng late-run p95 tăng đến `94 ms`; đây là upper-bound cảnh báo, chưa phải failure point.
6. Whole-run throughput của Soak bao gồm ramp-up. Các giá trị `104.725 rps` và `133.280 rps` phải được ghi nhãn whole-run average, không phải steady-state throughput thuần túy.
7. `apply-coupon` là hotspot latency quan sát được trong Stress, nhưng nguyên nhân database/index vẫn là giả thuyết cho tới khi có query plan hoặc profiling.

### 11.2. Giới hạn của kết luận

- Đây là các run localhost, không đại diện trực tiếp cho production hardware hoặc network.
- Mỗi profile được phân tích từ một run chính thức; cần lặp lại nhiều run để ước lượng variance và confidence interval.
- Whole-run throughput bị ảnh hưởng bởi ramp-up, staged load và các request hoàn tất muộn.
- JTL không chứa CPU, memory RSS, event-loop delay, SQLite lock wait hoặc query plan; không thể suy ra chắc chắn bottleneck phần cứng/database chỉ từ latency.
- Soak 230 chưa chạm failure point; kết luận upper-bound/warning không phải giới hạn tối đa của hệ thống.

### 11.3. Kết luận cuối

Nguồn dữ liệu đáng tin cậy cho Task 2 là raw JTL với `elapsed` và `success`. Báo cáo cần giữ `180 VUs` làm stable baseline, đánh dấu `230 VUs` là upper-bound có tail-latency warning, coi Stress là có degradation kéo dài sau minute 12, và coi Spike là có failure episode thực sự thay vì một outlier cuối run. Các đề xuất tối ưu hóa nên được dùng làm giả thuyết điều tra có thể kiểm chứng, không trình bày như nguyên nhân đã được chứng minh bởi JTL.
