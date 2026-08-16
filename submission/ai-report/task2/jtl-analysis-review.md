# Xem xét và sửa chữa (đánh giá của con người)

> **Phạm vi:** Phản biện phân tích AI trong `submission/ai-report/task2/jtl-analysis-raw.md`.
> **Dữ liệu đối chiếu:** Sáu raw JTL trong `submission/tests/2-test-runs/checkout-with-coupon/`.
> **Nguyên tắc:** Với mỗi lỗi, trích dẫn claim của AI, nêu giá trị đúng từ raw JTL, chỉ rõ cách tính và giải thích vì sao cách đọc của AI sai hoặc chưa đủ.

## Mục lục

- [1. Cách kiểm chứng](#1-cách-kiểm-chứng)
- [2. Kiểm tra nhanh số liệu nền](#2-kiểm-tra-nhanh-số-liệu-nền)
- [3. Các lỗi hiểu sai hoặc đọc thiếu](#3-các-lỗi-hiểu-sai-hoặc-đọc-thiếu)
- [4. Các suy luận chưa đủ bằng chứng](#4-các-suy-luận-chưa-đủ-bằng-chứng)
- [5. Những phần AI đọc đúng](#5-những-phần-ai-đọc-đúng)
- [6. Kết luận của người đánh giá](#6-kết-luận-của-người-đánh-giá)

## 1. Cách kiểm chứng

Raw JTL có các cột chính `timeStamp`, `elapsed`, `label`, `responseCode`, `success`, `failureMessage` và `Latency`.

- Dùng `elapsed` để tính average, p90, p95, p99 và max.
- Dùng `success != true` để đếm failure. Không được chỉ đếm HTTP 4xx/5xx.
- Tính duration bằng `(max(timeStamp) - min(timeStamp)) / 1000`.
- Tính whole-run throughput bằng `total_requests / duration_seconds`.
- Tính minute-window bằng `seconds_in = (timeStamp - min(timeStamp)) / 1000`, sau đó chia cửa sổ 60 giây.
- Percentile dùng nội suy tuyến tính trên toàn bộ giá trị `elapsed`, theo parser của `perf-jtl-analyzer`.

Các đường dẫn raw được sử dụng:

| Kịch bản | Raw JTL                                                                                 |
| -------- | --------------------------------------------------------------------------------------- |
| Load     | `submission/tests/2-test-runs/checkout-with-coupon/load/20260813-load-official.jtl`     |
| Stress   | `submission/tests/2-test-runs/checkout-with-coupon/stress/20260813-stress-official.jtl` |
| Spike    | `submission/tests/2-test-runs/checkout-with-coupon/spike/20260813-spike-official.jtl`   |
| Soak 130 | `submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-130vu.jtl`        |
| Soak 180 | `submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-180vu.jtl`        |
| Soak 230 | `submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-230vu.jtl`        |

## 2. Kiểm tra nhanh số liệu nền

Bảng tổng thể của AI khớp raw JTL ở mức làm tròn. Đây là cơ sở để phân biệt lỗi diễn giải với lỗi tính toán:

| Kịch bản | Requests | Failures | Error rate | Whole-run throughput |      Avg |      p95 |      p99 |        Max |
| -------- | -------: | -------: | ---------: | -------------------: | -------: | -------: | -------: | ---------: |
| Load     |    5,996 |        0 |     0.000% |            4.698 rps | 17.41 ms |  25.0 ms | 51.35 ms |   2,360 ms |
| Stress   |  138,180 |       41 |  0.029671% |          115.276 rps | 55.98 ms | 259.0 ms | 925.0 ms |   3,486 ms |
| Spike    |   45,436 |       34 |  0.074831% |           63.266 rps | 91.21 ms | 40.25 ms |  68.0 ms | 481,450 ms |
| Soak 130 |   54,364 |        0 |     0.000% |           75.687 rps |  6.35 ms |  21.0 ms |  28.0 ms |     691 ms |
| Soak 180 |   75,207 |        0 |     0.000% |          104.725 rps |  6.59 ms |  20.0 ms |  29.0 ms |      71 ms |
| Soak 230 |   95,747 |        0 |     0.000% |          133.280 rps | 10.96 ms |  35.0 ms |  84.0 ms |     311 ms |

## 3. Các lỗi hiểu sai hoặc đọc thiếu

### 3.1. Stress p95 bị đọc thành 53 ms từ dashboard

**Claim của AI:**

> “Dùng `Total p95` trong JMeter dashboard của Stress để nói stress p95 chỉ khoảng `53 ms`.”

**Giá trị đúng từ raw JTL:**

- File: `stress/20260813-stress-official.jtl`.
- Raw có `138,180` rows.
- Tính trên `elapsed`: p90 `97.0 ms`, p95 `259.0 ms`, p99 `925.0 ms`.
- Công thức: `percentile(elapsed, 0.95) = 259.0 ms`.
- `failure_count = 41`, nên error rate là `41 / 138180 * 100 = 0.029671%`.

**Giải thích lỗi:**

Giá trị `53 ms` là giá trị Total trong `statistics.json` của HTML dashboard, không khớp p95 khi tính trực tiếp trên raw `elapsed`. AI đã nhận diện sự chênh lệch nhưng cách trình bày cần nói rõ rằng `53 ms` là dashboard aggregate không được dùng làm ground truth cho Task 2. Kết luận đúng về Stress phải dùng p95 raw `259 ms`, p99 raw `925 ms` và các minute-window, không dùng `53 ms` để gọi Stress là gần như không có tail latency.

### 3.2. Spike max bị đặt sai vị trí thời gian

**Claim của AI:**

> “p95/p99 vẫn thấp, nhưng max cực cao xuất hiện ở cuối run nên cần tách outlier khỏi steady behavior.”

Và trong phần Spike:

> “max lên tới khoảng `481s`, tập trung ở cuối run.”

**Giá trị đúng từ raw JTL:**

- File: `spike/20260813-spike-official.jtl`.
- Duration raw: `718.175 s`.
- Row max tại dòng `45359` có:

```text
timeStamp=1786631369509
elapsed=481450
label=Step 1 POST login
responseCode=200
success=false
failureMessage=The operation lasted too long: ... should not have lasted longer than 5000 milliseconds.
```

- Row này nằm khoảng `237.485 s` sau `min(timeStamp)`, tức khoảng phút 3:57, không phải cuối run.
- Các failure cuối run nằm khoảng `717.816-718.175 s` và có `elapsed` khoảng `2039-2213 ms`.

**Giải thích lỗi:**

AI đã đọc đúng giá trị max `481450 ms` nhưng đọc sai vị trí bằng cách suy ra từ các row failure cuối run thay vì tính `timeStamp - min(timeStamp)`. Max không phải “outlier ở cuối run”. P95 `40.25 ms` và p99 `68 ms` vẫn mô tả phần lớn samples, nhưng không sửa được lỗi thời gian của claim này.

### 3.3. Spike max bị coi là một outlier đơn lẻ

**Claim của AI:**

> “Max là outlier cuối run; dùng max đơn lẻ để kết luận steady-state latency là sai.”

**Giá trị đúng từ raw JTL:**

- Spike có `34` failure, không phải chỉ một sample bất thường.
- Có `7` rows với `elapsed > 5000 ms`.
- Khoảng giây `237.5` có `6` Duration Assertion failures với `elapsed` từ `480762` đến `481450 ms` và `1` SocketException với `elapsed=480295 ms`.
- Trong `34` failure, có `33` rows `responseCode=200` nhưng `success=false` vì Duration Assertion; `1` row là `Non HTTP response code: java.net.SocketException`.
- Cuối run có thêm `27` Duration Assertion failures với `elapsed=2039-2213 ms`.

**Giải thích lỗi:**

AI đúng ở nguyên tắc rằng max không đại diện cho steady-state, nhưng sai khi gọi đây là một outlier đơn lẻ và tách khỏi đánh giá. Đây là một failure episode gồm nhiều request bị treo hoặc hoàn tất vượt assertion, kéo dài trong thời gian wall-clock của run. Cách kết luận đúng là: phân phối chính có p95/p99 thấp, nhưng Spike không phải một run sạch vì có failure episode nghiêm trọng.

### 3.4. Stress bị thu hẹp thành một degradation window ở phút 12

**Claim của AI:**

> “Stress ... có degradation window gần `phút 12`: error rate theo phút `0.585%`, p95 theo phút `1246.75 ms`.”

**Giá trị đúng từ raw JTL:**

Minute 12 đúng là cửa sổ đầu tiên có failure:

| Minute | Requests | Failures | Error rate |        p95 |     Max |
| -----: | -------: | -------: | ---------: | ---------: | ------: |
|     12 |    7,006 |       41 |     0.585% | 1246.75 ms | 3486 ms |

Nhưng các cửa sổ sau vẫn có tail latency cao:

| Minute | Failures |       p95 |
| -----: | -------: | --------: |
|     13 |        0 |    737 ms |
|     14 |        0 |    511 ms |
|     15 |        0 |    325 ms |
|     16 |        0 | 207.70 ms |
|     17 |        0 |    464 ms |
|     18 |        0 |     49 ms |

**Giải thích lỗi:**

Nếu “degradation” chỉ có nghĩa là cửa sổ có failure thì phút 12 là đúng. Tuy nhiên AI dùng cả error rate và p95 để mô tả degradation, nên claim đó đã đánh đồng “first failure window” với toàn bộ thời gian tail latency xấu. Kết luận đúng là failure bắt đầu ở phút 12 và p95 tiếp tục cao đến phút 17, sau đó mới trở về `49 ms` ở phút 18.

### 3.5. Error analysis không định lượng loại failure thực tế

**Claim của AI:**

> “Một số failure có thể do assertion/timeout chứ không chỉ HTTP code; phải dùng cột `success`.”

**Giá trị đúng từ raw JTL:**

- Stress: `41/41` failures đều có `responseCode=200`, `success=false` và message `The operation lasted too long...`; các label là Products `17`, My Orders `18`, Categories `6`.
- Spike: `33/34` failures là Duration Assertion với `responseCode=200`; `1/34` là SocketException.
- Stress assertion limit của các label này là `2000 ms`; các raw elapsed failure nằm khoảng `2042-2347 ms` ở Products, `2097-2299 ms` ở My Orders và `2098-2290 ms` ở Categories.

**Giải thích lỗi:**

Đây không phải lỗi công thức trong bảng tổng, nhưng là cách trình bày chưa đủ chính xác. Raw không chỉ cho biết failure “có thể” là assertion/timeout; raw xác nhận loại failure cụ thể. Nếu chỉ đếm HTTP 4xx/5xx, Stress sẽ bị đọc thành `0` failure và Spike chỉ còn một non-HTTP failure, làm đánh giá reliability sai.

### 3.6. Whole-run throughput của Soak bị gọi như steady throughput

**Claim của AI:**

> “Ngưỡng ổn định bảo thủ: `180 VUs`, khoảng `104.7 rps`.”

**Giá trị đúng từ raw JTL:**

Whole-run calculation của AI là đúng:

```text
Soak 180: 75,207 / 718.137 s = 104.725 rps
Soak 230: 95,747 / 718.388 s = 133.280 rps
```

Nhưng test plan có ramp-up `180 s`. Trong lát chẩn đoán sau ramp-up `180-660 s`:

| Kịch bản | Requests trong lát | Slice throughput | Slice p95 | Slice p99 |
| -------- | -----------------: | ---------------: | --------: | --------: |
| Soak 130 |             41,420 |       86.292 rps |     21 ms |     29 ms |
| Soak 180 |             57,305 |      119.385 rps |     20 ms |     29 ms |
| Soak 230 |             73,052 |      152.192 rps |     30 ms |     64 ms |

**Giải thích lỗi:**

Phép chia toàn run không sai; vấn đề là nhãn “throughput ổn định”. `104.725 rps` bao gồm 180 giây ramp-up và nên được gọi là whole-run average. `180 VUs` vẫn có thể là stable baseline vì p95/p99 và late-run đều ổn định, nhưng throughput ổn định phải được báo cáo bằng minute-window hoặc một lát sau ramp-up.

## 4. Các suy luận chưa đủ bằng chứng

### 4.1. `apply-coupon` là hotspot, nhưng nguyên nhân SQL chưa được chứng minh

AI viết:

> “Coupon là điểm nghẽn chính khi tải cộng dồn, phù hợp với việc endpoint này có nhiều bước đọc/kiểm tra coupon usage.”

Phần đầu có bằng chứng: raw Stress của `Step 5 POST apply-coupon` có p95 `427 ms`, p99 `1288 ms`, max `3486 ms`, cao nhất theo p95. Tuy nhiên raw JTL không có query plan, CPU profile hoặc lock wait. Vì vậy “nhiều bước đọc/kiểm tra coupon usage” mới là giả thuyết từ mã backend, không phải nguyên nhân đã được đo.

Các đề xuất index cho `coupons(code, is_active)` và `coupon_usage(coupon_id, user_id)` nên được ghi là **conditional investigation**. Cần dùng `EXPLAIN QUERY PLAN`, profiling hoặc A/B benchmark trước/sau index để xác nhận tác động.

### 4.2. Failure ở read endpoint không chứng minh HTTP error hoặc table scan

Stress failure tập trung ở Products `17`, My Orders `18` và Categories `6`, nhưng raw cho thấy các row này có `responseCode=200` và chỉ thất bại vì vượt Duration Assertion `2000 ms`. JTL không chứng minh các endpoint này bị table scan. Vì vậy đề xuất index cho `orders` hoặc Products là hướng điều tra hợp lý, không phải nguyên nhân đã được xác nhận.

## 5. Những phần AI đọc đúng

Các điểm sau không phải lỗi và được giữ lại sau human review:

- Bảng tổng thể: Load `5,996` requests; Stress `138,180`; Spike `45,436`; Soak 130/180/230 lần lượt `54,364/75,207/95,747`.
- Stress overall raw: p95 `259 ms`, p99 `925 ms`, `41/138180 = 0.029671%` failure.
- Spike overall raw: p95 `40.25 ms`, p99 `68 ms`, `34/45436 = 0.074831%` failure.
- Soak 230: `0` failure, `133.280 rps` whole-run, raw p95 `35 ms`, raw p99 `84 ms`; đây là upper-bound/warning, chưa phải failure point.
- AI phân biệt đúng `Latency` và `elapsed`. Raw Spike checkout có average `Latency=26.981 ms` nhưng average `elapsed=101.255 ms`; threshold phải dùng `elapsed`.
- `180 VUs` là stable baseline bảo thủ hợp lý khi xét `0` failure, p95/p99 thấp và late-run p95 khoảng `19-22 ms`.

## 6. Kết luận của người đánh giá

Phân tích AI tính đúng phần lớn metric tổng thể, nhưng có các lỗi diễn giải cần sửa trước khi dùng làm kết luận:

1. Stress dashboard `53 ms` không thay thế raw p95 `259 ms`.
2. Spike max `481450 ms` xảy ra ở khoảng giây `237.485`, không phải cuối run.
3. Spike có một failure episode gồm 7 samples trên `5000 ms` và 34 failures, không phải một outlier đơn lẻ.
4. Stress bắt đầu failure ở minute 12 nhưng tail latency còn xấu đến minute 17.
5. Failure thực tế là Duration Assertion hoặc SocketException, dù nhiều row có HTTP `200`.
6. `104.725 rps` của Soak 180 là whole-run average có ramp-up, không phải throughput steady-state thuần túy.

Kết luận đã sửa: Load và Soak 130/180 đạt tốt; Stress có degradation và assertion failures cần điều tra; Spike có failure episode nghiêm trọng dù p95/p99 của phần lớn samples thấp; Soak 230 là upper-bound chạy thành công nhưng có late-run tail-latency warning. Các đề xuất tối ưu hóa chỉ nên được xem là giả thuyết cho tới khi có query plan, profiling hoặc benchmark xác nhận.
