# Phân Tích JTL Và Đề Xuất Ngưỡng Hiệu Năng

> Workflow: `checkout-with-coupon`  
> Nguồn dữ liệu: raw JMeter `.jtl` trong `submission/tests/2-test-runs/checkout-with-coupon/`  
> Nguyên tắc phân tích: số liệu nền được tính trực tiếp từ `.jtl`; `elapsed` là latency chính, `success=false` được tính là lỗi, throughput được tính bằng `total_requests / ((max(timeStamp) - min(timeStamp)) / 1000)`.

## 1. Phạm Vi Log Được Phân Tích

| Kịch bản     | File `.jtl`                                                                             |
| ------------ | --------------------------------------------------------------------------------------- |
| Load         | `submission/tests/2-test-runs/checkout-with-coupon/load/20260813-load-official.jtl`     |
| Stress       | `submission/tests/2-test-runs/checkout-with-coupon/stress/20260813-stress-official.jtl` |
| Spike        | `submission/tests/2-test-runs/checkout-with-coupon/spike/20260813-spike-official.jtl`   |
| Soak 130 VUs | `submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-130vu.jtl`        |
| Soak 180 VUs | `submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-180vu.jtl`        |
| Soak 230 VUs | `submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-230vu.jtl`        |

## 2. Ground-truth Metrics Từ Raw JTL

| Kịch bản     |  Duration |  Requests | Failures | Error rate |    Throughput |        Avg |       p90 |        p95 |        p99 |         Max |
| ------------ | --------: | --------: | -------: | ---------: | ------------: | ---------: | --------: | ---------: | ---------: | ----------: |
| Load         | `1276.2s` |   `5,996` |      `0` |   `0.000%` |   `4.698 rps` | `17.41 ms` | `17.0 ms` |  `25.0 ms` | `51.35 ms` |   `2360 ms` |
| Stress       | `1198.7s` | `138,180` |     `41` |   `0.030%` | `115.276 rps` | `55.98 ms` | `97.0 ms` | `259.0 ms` | `925.0 ms` |   `3486 ms` |
| Spike        |  `718.2s` |  `45,436` |     `34` |   `0.075%` |  `63.266 rps` | `91.21 ms` | `30.0 ms` | `40.25 ms` |  `68.0 ms` | `481450 ms` |
| Soak 130 VUs |  `718.3s` |  `54,364` |      `0` |   `0.000%` |  `75.687 rps` |  `6.35 ms` | `15.0 ms` |  `21.0 ms` |  `28.0 ms` |    `691 ms` |
| Soak 180 VUs |  `718.1s` |  `75,207` |      `0` |   `0.000%` | `104.725 rps` |  `6.59 ms` | `15.0 ms` |  `20.0 ms` |  `29.0 ms` |     `71 ms` |
| Soak 230 VUs |  `718.4s` |  `95,747` |      `0` |   `0.000%` | `133.280 rps` | `10.96 ms` | `24.0 ms` |  `35.0 ms` |  `84.0 ms` |    `311 ms` |

## 3. Sampler Chậm Nhất Theo p95

| Kịch bản     | Sampler có p95 cao nhất    |      p95 |       p99 | Nhận xét                                                                                                            |
| ------------ | -------------------------- | -------: | --------: | ------------------------------------------------------------------------------------------------------------------- |
| Load         | `Step 6 POST checkout`     |  `29 ms` | `53.8 ms` | Checkout là bước giao dịch nặng nhất ở tải thường, nhưng vẫn rất ổn định.                                           |
| Stress       | `Step 5 POST apply-coupon` | `427 ms` | `1288 ms` | Coupon là điểm nghẽn chính khi tải cộng dồn, phù hợp với việc endpoint này có nhiều bước đọc/kiểm tra coupon usage. |
| Spike        | `Step 5 POST apply-coupon` |  `52 ms` |   `88 ms` | p95/p99 vẫn thấp, nhưng max cực cao xuất hiện ở cuối run nên cần tách outlier khỏi steady behavior.                 |
| Soak 130 VUs | `Step 6 POST checkout`     |  `27 ms` |   `36 ms` | Ổn định.                                                                                                            |
| Soak 180 VUs | `Step 6 POST checkout`     |  `26 ms` |   `37 ms` | Ổn định và là mức tải bền vững bảo thủ.                                                                             |
| Soak 230 VUs | `Step 5 POST apply-coupon` |  `46 ms` |  `123 ms` | Vẫn không lỗi, nhưng tail latency tăng rõ so với 180 VUs.                                                           |

## 4. Quan Sát Theo Kịch Bản

### Load

Load test có `0%` lỗi và p95 tổng `25 ms`. Đây là baseline sạch. Một cửa sổ cuối run có p95 cao do sample ít và outlier cuối test, nhưng không đi kèm failure nên không nên diễn giải thành suy giảm ổn định.

### Stress

Stress test đạt throughput `115.276 rps`, error rate chỉ `0.030%`, nhưng có degradation window gần `phút 12`: error rate theo phút `0.585%`, p95 theo phút `1246.75 ms`. Lỗi tập trung ở `GET products search`, `GET my-orders`, và `GET categories`; riêng `apply-coupon` là sampler có p95 cao nhất (`427 ms`).

### Spike

Spike test có error rate tổng `0.075%`, p95 `40.25 ms`, p99 `68 ms`. Tuy vậy max lên tới khoảng `481s`, tập trung ở cuối run. Điểm này không nên dùng để kết luận baseline chậm, nhưng phải ghi nhận như outlier/end-of-test instability.

### Soak

Soak `130` và `180 VUs` đều sạch với `0%` lỗi và tail latency thấp. Soak `230 VUs` cũng `0%` lỗi và đạt `133.280 rps`, nhưng p99 tăng lên `84 ms` theo raw parser và `144 ms` trong JMeter dashboard total. Vì vậy kết luận hợp lý là:

- Ngưỡng ổn định bảo thủ: `180 VUs`, khoảng `104.7 rps`.
- Mức upper-bound đã chạy thành công: `230 VUs`, khoảng `133.3 rps`.
- `230 VUs` chưa phải failure point, nhưng là vùng bắt đầu cần cảnh báo vì tail latency tăng.

## 5. Đề Xuất Ngưỡng Hiệu Năng

### 5.1 Ngưỡng Theo Kịch Bản

| Kịch bản     |                  Error rate tối đa |    p95 tổng |     p99 tổng | Throughput tối thiểu | Ghi chú                                                                                        |
| ------------ | ---------------------------------: | ----------: | -----------: | -------------------: | ---------------------------------------------------------------------------------------------- |
| Load         |                          `<= 0.5%` | `<= 100 ms` |  `<= 250 ms` |           `>= 4 rps` | Ngưỡng này rộng hơn baseline để tránh fail vì outlier nhỏ trên localhost.                      |
| Stress       |                            `<= 5%` | `<= 500 ms` | `<= 1500 ms` |         `>= 100 rps` | Nếu p95 theo phút vượt `1500 ms` hoặc error theo phút vượt `1%`, đánh dấu warning để điều tra. |
| Spike        |                            `<= 5%` | `<= 100 ms` |  `<= 200 ms` |          `>= 50 rps` | Max đơn lẻ không nên là gate chính, nhưng max trên `30s` cần điều tra outlier.                 |
| Soak 180 VUs | `0%` mục tiêu, `<= 0.5%` chấp nhận |  `<= 50 ms` |  `<= 100 ms` |         `>= 100 rps` | Dùng làm ngưỡng ổn định bảo thủ.                                                               |
| Soak 230 VUs |                            `<= 1%` | `<= 100 ms` |  `<= 200 ms` |         `>= 125 rps` | Dùng như vùng upper-bound/cảnh báo, không phải baseline bắt buộc.                              |

### 5.2 Ngưỡng p95 Theo Sampler Cho Regression Gate

| Sampler                      |  Load gate | Stress gate | Soak stable gate |
| ---------------------------- | ---------: | ----------: | ---------------: |
| `Step 1 POST login`          | `<= 50 ms` | `<= 350 ms` |       `<= 50 ms` |
| `Step 2 GET categories`      | `<= 30 ms` | `<= 350 ms` |       `<= 50 ms` |
| `Step 3 GET products search` | `<= 40 ms` | `<= 350 ms` |       `<= 60 ms` |
| `Step 4 POST cart`           | `<= 20 ms` | `<= 200 ms` |       `<= 30 ms` |
| `Step 5 POST apply-coupon`   | `<= 50 ms` | `<= 600 ms` |       `<= 80 ms` |
| `Step 6 POST checkout`       | `<= 75 ms` | `<= 400 ms` |       `<= 80 ms` |
| `Step 7 GET my-orders`       | `<= 50 ms` | `<= 350 ms` |       `<= 70 ms` |

## 6. Misinterpretation Hunt

| #   | AI/dashboard claim dễ sai                                                                |                            Giá trị dễ bị hiểu sai |                          Giá trị đúng từ raw JTL | Nguồn / cách tính                                                         | Phản biện                                                                                                   |
| --- | ---------------------------------------------------------------------------------------- | ------------------------------------------------: | -----------------------------------------------: | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 1   | Dùng `Total p95` trong JMeter dashboard của Stress để nói stress p95 chỉ khoảng `53 ms`. |                                           `53 ms` |                                         `259 ms` | Raw JTL Stress, percentile trên cột `elapsed` của toàn bộ `138,180` rows. | Dashboard total không đủ tin cậy cho kết luận Task 2 ở run này; phải kiểm bằng raw `.jtl`.                  |
| 2   | Kết luận Spike rất chậm vì max response time khoảng `481s`.                              |                                       `481450 ms` | p95 `40.25 ms`, p99 `68 ms`, error rate `0.075%` | Raw JTL Spike.                                                            | Max là outlier cuối run; dùng max đơn lẻ để kết luận steady-state latency là sai.                           |
| 3   | Tính error rate theo HTTP 4xx/5xx thay vì cột `success`.                                 |                          Không rõ / dễ thành `0%` |                  Stress `0.030%`, Spike `0.075%` | Count rows có `success != true`.                                          | Một số failure có thể do assertion/timeout chứ không chỉ HTTP code; phải dùng cột `success`.                |
| 4   | Nói `Latency` và `elapsed` là một metric.                                                | Ví dụ Spike checkout avg `Latency` chỉ `26.98 ms` |      Spike checkout avg `elapsed` là `101.26 ms` | Raw JTL Spike, so sánh cột `Latency` và `elapsed`.                        | `Latency` là time-to-first-byte, còn `elapsed` là thời gian response đầy đủ; threshold phải dùng `elapsed`. |
| 5   | Kết luận Soak 230 là failure point.                                                      |                         `230 VUs` bị xem như fail |      `0` failures, `0.000%` error, `133.280 rps` | Raw JTL Soak 230.                                                         | 230 VUs là vùng cảnh báo vì tail tăng, chưa phải failure point. Ngưỡng bảo thủ vẫn nên là 180 VUs.          |

## 7. Đánh Giá Đề Xuất Tối Ưu Hóa

| Đề xuất                                                                               | Phân loại               | Lý do                                                                                                                                   |
| ------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Tạo index cho `users(email)`                                                          | Applicable              | Login dùng `SELECT * FROM users WHERE email = ?`; auth-heavy xuất hiện ở mọi iteration.                                                 |
| Tạo index cho `orders(user_id, id DESC)`                                              | Applicable              | `GET /api/orders/my-orders` dùng `WHERE user_id = ? ORDER BY id DESC` và là một trong các label có lỗi trong Stress/Spike.              |
| Tạo index cho `coupons(code, is_active)` và `coupon_usage(coupon_id, user_id)`        | Applicable              | `apply-coupon` có p95 cao nhất trong Stress; endpoint này lookup coupon và đếm usage theo user.                                         |
| Bật SQLite WAL và đặt `busy_timeout`                                                  | Applicable              | Stack dùng `sqlite3`; WAL có thể cải thiện concurrency đọc/ghi trong workload checkout/order.                                           |
| Tối ưu `GET /api/products?search=` bằng parameterized query và/hoặc FTS/prefix search | Conditional             | Hiện query dùng `LIKE '%search%'`; index thường không giúp tốt với leading wildcard. FTS5 hoặc thay đổi search strategy mới có ý nghĩa. |
| Thêm Redis cache cho categories/products                                              | Conditional             | Có thể giảm tải read-heavy, nhưng thêm dependency và invalidation; chưa cần nếu mục tiêu chỉ là localhost homework.                     |
| Thêm connection pool database                                                         | Not applicable          | Backend đang dùng SQLite qua `sqlite3`; connection pool kiểu PostgreSQL/MySQL không phù hợp trực tiếp.                                  |
| Horizontal scaling nhiều backend instance                                             | Not applicable hiện tại | Môi trường đo là localhost với SQLite file DB; scale ngang sẽ cần đổi kiến trúc DB/session/deploy.                                      |
| JVM heap tuning                                                                       | Not applicable          | Backend là Node.js/Express, không phải JVM service.                                                                                     |

## 8. Kết Luận Phản Biện

Hệ thống đạt tốt ở Load và Soak `180 VUs`. Stress là kịch bản có tín hiệu đáng theo dõi nhất vì `apply-coupon` có p95 `427 ms` và có degradation window gần phút `12`. Spike không nên bị đánh giá bằng max `481450 ms`; p95/p99 của phần lớn requests vẫn thấp, nhưng outlier cuối run cần ghi nhận.

Ngưỡng đề xuất nên dùng raw `.jtl` làm nguồn chính, vì dashboard tổng có thể gây hiểu sai ở một số trường hợp. Với dữ liệu hiện tại, `180 VUs` là ngưỡng ổn định bảo thủ, còn `230 VUs` là mức upper-bound đã chạy thành công nhưng nên đưa vào vùng cảnh báo do tail latency tăng.
