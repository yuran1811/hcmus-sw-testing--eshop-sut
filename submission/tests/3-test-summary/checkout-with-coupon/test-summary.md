# Tóm tắt thực thi kiểm thử hiệu năng

> **Phạm vi:** Kiểm thử hiệu năng API
> **Luồng công việc:** Checkout with Coupon — Thanh toán có mã giảm giá
> **Base URL:** `http://localhost:3000`
> **Công cụ:** Apache JMeter `5.6.3`
> **MSSV:** `23127115`
> **Ngày chạy chính thức:** Load/Stress/Spike — `2026-08-13`; Soak — `2026-08-15`

## 1. Mục tiêu và phạm vi

Tài liệu này tổng hợp kết quả thực thi chính thức của các kịch bản Load, Stress, Spike và ba lần chạy Soak trên cùng workflow E2E:

`POST /api/login` → `GET /api/categories` → `GET /api/products?search=` → `POST /api/cart` → `POST /api/apply-coupon` → `POST /api/checkout` → `GET /api/orders/my-orders`

Workflow bao phủ ba nhóm endpoint bắt buộc:

- **Auth-heavy:** `POST /api/login`.
- **Read-heavy:** `GET /api/categories`, `GET /api/products?search=`, `GET /api/orders/my-orders`.
- **Transactional:** `POST /api/cart`, `POST /api/apply-coupon`, `POST /api/checkout`.

JTL thô là nguồn dữ liệu chuẩn để tính `elapsed`, p95/p99, tỷ lệ lỗi và thông lượng. Báo cáo HTML chỉ là bằng chứng trực quan hỗ trợ. Phân tích chi tiết nằm tại [jtl-analysis.md](../../../docs/test-report/jtl-analysis.md).

## 2. Các sửa chữa sau khi xem xét test plan do AI tạo

Các thay đổi sau được áp dụng trước khi chạy chính thức:

1. `POST /api/apply-coupon` gửi `${cart_total}` thay cho `${product_price}`.
2. `${cart_total}` được tính bằng `product_price × quantity` trước bước áp mã giảm giá.
3. Extractor của checkout đọc `orderId` đúng theo response thật của backend.
4. Các biến quan trọng được bảo vệ bằng `JSR223 Assertion`; workflow fail rõ ràng nếu thiếu `access_token`, `user_id`, `product_id_resp`, `product_name`, `product_price`, `final_amount` hoặc `order_id`.
5. JSON extractor/plugin không tương thích được thay bằng Groovy post-processor dùng thành phần lõi của JMeter.
6. Cấu trúc `hashTree` và Response Assertion XML được sửa để JMeter `5.6.3` chạy được bằng CLI.
7. Stress plan được thiết kế lại thành bốn stage cộng dồn `50 → 100 → 150 → 200 VU`, thay cho một linear ramp duy nhất.

## 3. Ma trận thực thi

| Kịch bản       | Test plan                                                                                            | Thư mục bằng chứng                                       | Ngày chạy    | Trạng thái thực thi      |
| -------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------ | ------------------------ |
| Load           | [23127115_Load_20260813.jmx](../../1-test-plans/checkout-with-coupon/23127115_Load_20260813.jmx)     | [load](../../2-test-runs/checkout-with-coupon/load/)     | `2026-08-13` | Đã chạy                  |
| Stress         | [23127115_Stress_20260813.jmx](../../1-test-plans/checkout-with-coupon/23127115_Stress_20260813.jmx) | [stress](../../2-test-runs/checkout-with-coupon/stress/) | `2026-08-13` | Đã chạy                  |
| Spike          | [23127115_Spike_20260813.jmx](../../1-test-plans/checkout-with-coupon/23127115_Spike_20260813.jmx)   | [spike](../../2-test-runs/checkout-with-coupon/spike/)   | `2026-08-13` | Đã chạy                  |
| Endurance/Soak | [23127115_Soak_20260815.jmx](../../1-test-plans/checkout-with-coupon/23127115_Soak_20260815.jmx)     | [soak](../../2-test-runs/checkout-with-coupon/soak/)     | `2026-08-15` | Đã chạy ở 130/180/230 VU |

Ba plan bắt buộc dùng ba listener khác nhau: Load — View Results Tree; Stress — Aggregate Report; Spike — Summary Report. Các lần chạy chính thức được thực thi ở chế độ non-GUI; JTL thô được ghi bằng cờ `-l`.

## 4. Kết quả tổng thể từ JTL thô

| Kịch bản          | Samples | Failures | Error rate | Throughput toàn run | Avg `elapsed` |       p95 |       p99 |        Max | Kết luận                                                |
| ----------------- | ------: | -------: | ---------: | ------------------: | ------------: | --------: | --------: | ---------: | ------------------------------------------------------- |
| Load 50 VU        |   5,996 |        0 |     0.000% |         4.698 req/s |      17.41 ms |  25.00 ms |  51.35 ms |   2,360 ms | Đạt — baseline sạch                                     |
| Stress đến 200 VU | 138,180 |       41 |  0.029671% |       115.276 req/s |      55.98 ms | 259.00 ms | 925.00 ms |   3,486 ms | Cảnh báo — có degradation và Duration Assertion failure |
| Spike 100 VU      |  45,436 |       34 |  0.074831% |        63.266 req/s |      91.21 ms |  40.25 ms |  68.00 ms | 481,450 ms | Cần điều tra — có cụm lỗi nghiêm trọng                  |
| Soak 130 VU       |  54,364 |        0 |     0.000% |        75.687 req/s |       6.35 ms |  21.00 ms |  28.00 ms |     691 ms | Đạt                                                     |
| Soak 180 VU       |  75,207 |        0 |     0.000% |       104.725 req/s |       6.59 ms |  20.00 ms |  29.00 ms |      71 ms | Đạt — baseline ổn định bảo thủ                          |
| Soak 230 VU       |  95,747 |        0 |     0.000% |       133.280 req/s |      10.96 ms |  35.00 ms |  84.00 ms |     311 ms | Cảnh báo biên trên — p95 cuối lần chạy tăng             |

> **Số liệu chuẩn:** Soak 230 có p95 toàn phiên `35 ms`, p99 `84 ms`; p95 ở cửa sổ cuối là `94 ms`. Các giá trị này được tính trực tiếp trên cột `elapsed` của JTL thô.

## 5. Kết quả theo từng kịch bản

### 5.1. Kiểm thử tải (Load)

- **JTL thô:** [20260813-load-official.jtl](../../2-test-runs/checkout-with-coupon/load/20260813-load-official.jtl)
- **HTML report:** [index.html](../../2-test-runs/checkout-with-coupon/load/html-report/index.html)
- **Ảnh tài nguyên:** [load-resource.png](../../2-test-runs/checkout-with-coupon/load/load-resource.png)
- **Thời gian:** `2026-08-13 20:39:12` → `2026-08-13 21:00:32`.
- **Dữ liệu:** chạy `seed_perf_users.js` trước test.
- **Sampler có p95 cao nhất:** `Step 6 POST checkout`, khoảng `29 ms`.

Load hoàn thành với 0 failure và tail latency thấp. Đây là baseline chính cho tải bình thường trên localhost. Max `2,360 ms` được giữ để theo dõi nhưng không đại diện cho phần lớn phân phối.

### 5.2. Kiểm thử chịu tải (Stress)

- **JTL thô:** [20260813-stress-official.jtl](../../2-test-runs/checkout-with-coupon/stress/20260813-stress-official.jtl)
- **HTML report:** [index.html](../../2-test-runs/checkout-with-coupon/stress/html-report/index.html)
- **Ảnh tài nguyên:** [stress-resource.png](../../2-test-runs/checkout-with-coupon/stress/stress-resource.png)
- **Thời gian:** `2026-08-13 21:03:35` → `2026-08-13 21:23:36`.
- **Sampler có p95 cao nhất:** `Step 5 POST apply-coupon`, `427 ms`.

Stress có 41 failures. Tất cả 41 rows đều có HTTP `200` nhưng `success=false` do Duration Assertion vượt `2,000 ms`; vì vậy không được chỉ đếm HTTP 4xx/5xx. Failure tập trung ở:

- `Step 3 GET products search`: 17 failures.
- `Step 7 GET my-orders`: 18 failures.
- `Step 2 GET categories`: 6 failures.

Phút 12 là cửa sổ đầu tiên có lỗi: tỷ lệ lỗi `0.585%`, p95 `1,246.75 ms`. Độ trễ đuôi vẫn cao tới phút 17 và trở về khoảng `49 ms` ở phút 18. Kết luận đúng là **cảnh báo suy giảm**, không phải một lần chạy đạt sạch.

### 5.3. Kiểm thử tải đột biến (Spike)

- **JTL thô:** [20260813-spike-official.jtl](../../2-test-runs/checkout-with-coupon/spike/20260813-spike-official.jtl)
- **HTML report:** [index.html](../../2-test-runs/checkout-with-coupon/spike/html-report/index.html)
- **Ảnh tài nguyên:** [spike-resource.png](../../2-test-runs/checkout-with-coupon/spike/spike-resource.png)
- **Thời gian:** `2026-08-13 21:24:31` → `2026-08-13 21:37:32`.
- **Sampler có p95 cao nhất:** `Step 5 POST apply-coupon`, `52 ms`.

P95/p99 của phần lớn samples vẫn thấp, nhưng run không sạch:

- 34 failures trong toàn run.
- 7 samples có `elapsed > 5,000 ms`.
- Khoảng giây `237.485` xuất hiện 6 Duration Assertion failures dài khoảng 480–481 giây và 1 `SocketException`.
- Cuối run có thêm 27 Duration Assertion failures khoảng 2.0–2.2 giây.

Do đó max `481,450 ms` không phải “một outlier ở cuối run”. Kịch bản được phân loại **cần điều tra**, đồng thời artifact hiện tại chưa chứng minh trực quan thời gian recovery theo từng phase.

### 5.4. Kiểm thử độ bền (Endurance/Soak)

Soak plan được parameterize bằng `-Jusers`, `-Jrampup`, `-Jduration`, `-Jthink_mean` và `-Jthink_range`. Cấu hình chung: ramp-up `180 s`, duration `720 s`, think time `1500 ± 200 ms`.

| Mức tải | JTL thô                                                                    | Báo cáo HTML                                                                     | Ảnh tài nguyên                                                                                                                                                    | Kết quả                  |
| ------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 130 VU  | [JTL](../../2-test-runs/checkout-with-coupon/soak/20260815-soak-130vu.jtl) | [HTML](../../2-test-runs/checkout-with-coupon/soak/html-report-130vu/index.html) | [mid](../../2-test-runs/checkout-with-coupon/soak/soak-resource-130vu-mid.png), [late](../../2-test-runs/checkout-with-coupon/soak/soak-resource-130vu-late.png)  | Đạt, 0 failure           |
| 180 VU  | [JTL](../../2-test-runs/checkout-with-coupon/soak/20260815-soak-180vu.jtl) | [HTML](../../2-test-runs/checkout-with-coupon/soak/html-report-180vu/index.html) | [mid](../../2-test-runs/checkout-with-coupon/soak/soak-resource-180vu-mid.png), [late](../../2-test-runs/checkout-with-coupon/soak/soak-resource-180vu-late.png)  | Baseline ổn định bảo thủ |
| 230 VU  | [JTL](../../2-test-runs/checkout-with-coupon/soak/20260815-soak-230vu.jtl) | [HTML](../../2-test-runs/checkout-with-coupon/soak/html-report-230vu/index.html) | [giữa](../../2-test-runs/checkout-with-coupon/soak/soak-resource-230vu-mid.png), [cuối](../../2-test-runs/checkout-with-coupon/soak/soak-resource-230vu-late.png) | Cảnh báo biên trên       |

Trong lát sau ramp-up `180–660 s`, throughput lần lượt khoảng `86.292`, `119.385` và `152.192 req/s`. Soak 180 giữ p95/p99 khoảng `20/29 ms` và late-run ổn định. Soak 230 vẫn 0 failure nhưng late-run p95 lên `94 ms`.

**Kết luận endurance:** `180 VU`, khoảng `119.385 req/s` sau ramp-up, là ngưỡng ổn định bảo thủ. `230 VU` là mức đầu tiên có tail-latency warning, chưa phải failure point và cũng chưa chứng minh capacity tối đa.

Ảnh Task Manager cho thấy tiến trình backend chính khoảng `61.3–65.2 MB` ở 180 VU và `63.1–63.6 MB` ở 230 VU. Vì đây là ảnh chụp tại một thời điểm, chỉ kết luận mức bộ nhớ quan sát cao nhất khoảng `65.2 MB`, không gọi là đỉnh RSS tuyệt đối.

## 6. Ngữ cảnh phần cứng

| Hạng mục           | Giá trị                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------ |
| Tên máy            | `QUOCTAN`                                                                                  |
| Hệ điều hành       | Windows 11 Pro 64-bit, build `26200`                                                       |
| Nhà sản xuất/model | Lenovo `21BV000SUS`                                                                        |
| CPU                | Intel Core i7-1260P thế hệ 12                                                              |
| Logical CPU        | 16                                                                                         |
| RAM                | 16 GB                                                                                      |
| DirectX            | DirectX 12                                                                                 |
| Bằng chứng         | [hardware-dxdiag.png](../../2-test-runs/checkout-with-coupon/hardware/hardware-dxdiag.png) |

Các kết quả chỉ là regression reference cho môi trường localhost này, không phải production SLO.

## 7. Trạng thái bằng chứng

| Hạng mục                              | Trạng thái               | Ghi chú                                                                                                                                         |
| ------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Workflow E2E bao phủ ba nhóm endpoint | Hoàn thành               | Cùng workflow trong mọi JMX/JTL                                                                                                                 |
| Ba JMX bắt buộc và đúng naming        | Hoàn thành               | Load/Stress/Spike                                                                                                                               |
| CSV và seed script                    | Hoàn thành               | 300 users, coupon `PERFTEST`                                                                                                                    |
| Ba listener/report khác nhau          | Hoàn thành               | View Results Tree/Aggregate/Summary                                                                                                             |
| Lần chạy chính thức Load/Stress/Spike | Hoàn thành               | Có JTL thô, HTML và ảnh tài nguyên                                                                                                              |
| Soak 130/180/230                      | Hoàn thành               | Có JTL, HTML và ảnh mid/late                                                                                                                    |
| Hardware evidence                     | Hoàn thành               | DxDiag và bảng thông số                                                                                                                         |
| Reset lockout/data state              | Hoàn thành               | Reseed trước run; SQL reset trong README test plan                                                                                              |
| Đánh giá của con người đối với AI/JMX | Hoàn thành               | Các sửa chữa và lý do đã ghi                                                                                                                    |
| Issue hiệu năng                       | Hoàn thành (Đã đăng)     | [ISSUE-CWC-001.md](./issue-reports/ISSUE-CWC-001.md) / [GitHub Issue #293](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/293) |
| Nhiệm vụ 2                            | Hoàn thành               | Có đầu ra AI, đánh giá của con người và đề xuất đã lọc                                                                                          |
| Nhiệm vụ 3                            | Hoàn thành ở mức đề xuất | Có đề xuất, sơ đồ luồng và blueprint CI/CLI                                                                                                     |
| Video demo Task 1                     | Hoàn thành               | [https://youtu.be/l4fiLiSnpyI](https://youtu.be/l4fiLiSnpyI)                                                                                    |
| Video Agent Skill                     | Hoàn thành               | [https://youtu.be/MjByvUU5z4k](https://youtu.be/MjByvUU5z4k)                                                                                    |

## 8. Liên kết bằng chứng bổ sung

1. Video Task 1: [https://youtu.be/l4fiLiSnpyI](https://youtu.be/l4fiLiSnpyI).
2. Video Agent Skill: [https://youtu.be/MjByvUU5z4k](https://youtu.be/MjByvUU5z4k).
3. Issue hiệu năng: [GitHub Issue #293](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/293).
4. Nhật ký Git: [git-commit-log.txt](../../../git-commit-log.txt).

## 9. Kết luận — Đề xuất kiểm thử hiệu năng liên tục

Nhiệm vụ 3 đề xuất mô hình theo rủi ro, theo dõi commit bằng GitHub Actions nhưng không chạy toàn bộ bộ kiểm thử cho mọi thay đổi. Commit chỉ sửa tài liệu được ghi `SKIPPED`; backend PR từ nguồn tin cậy chạy smoke; merge/main và nightly chạy Load; lịch tuần chạy Soak 180 VU; release candidate chạy Load/Stress/Spike/Soak. Stress và Spike giữ ở chế độ cảnh báo cho tới khi xử lý vấn đề đã biết và có ít nhất năm lần chạy sạch, tương đương.

Hồi quy p95 được so với trung vị trượt của năm lần chạy `PASS` gần nhất và baseline chuẩn đã phê duyệt. Phép so sánh chỉ hợp lệ khi cùng kịch bản, sampler, hash JMX/dữ liệu/cấu hình, runtime và lớp runner. Tín hiệu đáng ngờ được xác nhận bằng tối đa ba lần chạy tuần tự; hồi quy nghiêm trọng chỉ trở thành lỗi chặn khi lặp ít nhất `2/3`. Môi trường không hợp lệ trả `INVALID`, không quy kết cho commit.

Đánh đổi chính là chi phí runner và quản trị baseline để đổi lấy phát hiện regression sớm hơn. Path filter, profile phân tầng, rerun có điều kiện và self-hosted runner cố định giúp giảm chi phí/cảnh báo giả. Không được chạy code từ fork không tin cậy trên self-hosted performance runner.

Tài liệu đầy đủ:

- [Đề xuất kiểm thử hiệu năng liên tục](../../../docs/test-report/continuous-performance-testing.md)
- [Sơ đồ luồng](../../../docs/test-report/continuous-performance-flowchart.md)
- [Blueprint GitHub Actions và JMeter CLI](../../../docs/test-report/continuous-performance-ci-blueprint.md)
