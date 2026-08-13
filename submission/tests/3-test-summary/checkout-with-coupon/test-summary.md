# Test Summary — Performance Test Execution

> Scope: Performance Testing  
> Workflow: Checkout with Coupon  
> Base URL: `http://localhost:3000`  
> Tool: Apache JMeter 5.6.3  
> Student ID: `23127115`  
> Date prepared: `2026-08-13`

## 1. Objective

Tài liệu này tổng hợp tình trạng thực thi của ba kịch bản hiệu năng `Load`, `Stress`, và `Spike` cho cùng một luồng E2E:

`POST /api/login` → `GET /api/categories` → `GET /api/products?search=` → `POST /api/cart` → `POST /api/apply-coupon` → `POST /api/checkout` → `GET /api/orders/my-orders`

Ba nhóm endpoint được bao phủ:

- `auth-heavy`: `POST /api/login`
- `read-heavy`: `GET /api/categories`, `GET /api/products?search=`, `GET /api/orders/my-orders`
- `transactional`: `POST /api/cart`, `POST /api/apply-coupon`, `POST /api/checkout`

## 2. Pre-run Review Findings

Các điểm dưới đây đã được human review sau khi sinh JMX và cần được xác nhận hoặc ghi nhận trước khi chạy chính thức:

1. `Step 5 POST /api/apply-coupon` đã được sửa từ `total_amount = ${product_price}` sang `${cart_total}` với `cart_total = product_price * quantity`.
2. `Step 6 POST /api/checkout` đã được sửa extractor từ `$.id` sang `$.orderId` để khớp backend hiện tại.
3. Cả 3 plan đã được thêm `JSR223 Assertion` để fail rõ nếu không extract được:
   `access_token`, `user_id`, `product_id_resp`, `product_name`, `product_price`, `final_amount`, `order_id`.
4. `Step 3 GET /api/products?search=` không còn fallback mặc định sang dữ liệu sản phẩm giả; nếu search không trả dữ liệu phù hợp thì plan sẽ fail rõ qua extractor/assertion.
5. `results/*.jtl` vẫn đang được ghi cả bởi listener trong GUI plan và có thể được ghi qua CLI `-l`; cần giữ nhất quán đúng một cách chạy khi thực thi chính thức.
6. Stress plan không còn là linear ramp-up đơn; đã được đổi sang staged load 4 giai đoạn độc lập để tạo tải cộng dồn 50 → 100 → 150 → 200 VU.
7. Spike plan vẫn có `delay=60s`, `ramp-up=10s`, `duration=480s`; cần mô tả báo cáo theo baseline → spike → recovery để tránh diễn giải sai.
8. Các plan vẫn phụ thuộc vào coupon `PERFTEST` và 300 perf users seeded sau khi backend khởi động. Nếu restart backend sau seed, toàn bộ dữ liệu này mất vì DB bị reset.

## 3. Execution Matrix

| Scenario         | Plan file                      | Planned status code    | Planned output JTL      | Planned HTML report         | Actual run date | Actual status      |
| ---------------- | ------------------------------ | ---------------------- | ----------------------- | --------------------------- | --------------- | ------------------ |
| Load             | `23127115_Load_20260813.jmx`   | 200/2xx theo từng step | `results/load.jtl`      | `results/load-report/`      | `TBD`           | `Not run yet`      |
| Stress           | `23127115_Stress_20260813.jmx` | 200/2xx theo từng step | `results/stress.jtl`    | `results/stress-report/`    | `TBD`           | `Not run yet`      |
| Spike            | `23127115_Spike_20260813.jmx`  | 200/2xx theo từng step | `results/spike.jtl`     | `results/spike-report/`     | `TBD`           | `Not run yet`      |
| Endurance / Soak | `TBD`                          | 200/2xx theo từng step | `results/endurance.jtl` | `results/endurance-report/` | `TBD`           | `Missing plan/run` |

## 4. Scenario Results Template

### 4.1 Load Test

- Plan file: `submission/tests/1-test-plans/checkout-with-coupon/23127115_Load_20260813.jmx`
- Command used: `TBD`
- Start / End time: `TBD`
- Data seed used: `TBD`
- Lockout reset performed before run: `Yes/No`
- JTL path: `submission/tests/1-test-plans/checkout-with-coupon/results/load.jtl`
- HTML report path: `submission/tests/1-test-plans/checkout-with-coupon/results/load-report/`
- Key metrics:
  - Total samples: `TBD`
  - Error rate: `TBD`
  - Throughput: `TBD`
  - Avg response time: `TBD`
  - p95: `TBD`
  - p99: `TBD`
- Resource observation:
  - Backend CPU peak: `TBD`
  - Backend memory peak: `TBD`
  - Notes: `TBD`
- Result summary: `TBD`

### 4.2 Stress Test

- Plan file: `submission/tests/1-test-plans/checkout-with-coupon/23127115_Stress_20260813.jmx`
- Command used: `TBD`
- Start / End time: `TBD`
- Data seed used: `TBD`
- Lockout reset performed before run: `Yes/No`
- JTL path: `submission/tests/1-test-plans/checkout-with-coupon/results/stress.jtl`
- HTML report path: `submission/tests/1-test-plans/checkout-with-coupon/results/stress-report/`
- Key metrics:
  - Total samples: `TBD`
  - Error rate: `TBD`
  - Throughput: `TBD`
  - Avg response time: `TBD`
  - p95: `TBD`
  - p99: `TBD`
  - First degradation point: `TBD`
- Resource observation:
  - Backend CPU peak: `TBD`
  - Backend memory peak: `TBD`
  - Notes: `TBD`
- Result summary: `TBD`

### 4.3 Spike Test

- Plan file: `submission/tests/1-test-plans/checkout-with-coupon/23127115_Spike_20260813.jmx`
- Command used: `TBD`
- Start / End time: `TBD`
- Data seed used: `TBD`
- Lockout reset performed before run: `Yes/No`
- JTL path: `submission/tests/1-test-plans/checkout-with-coupon/results/spike.jtl`
- HTML report path: `submission/tests/1-test-plans/checkout-with-coupon/results/spike-report/`
- Key metrics:
  - Total samples: `TBD`
  - Error rate at peak: `TBD`
  - Throughput at peak: `TBD`
  - p95 at peak: `TBD`
  - Recovery time to baseline: `TBD`
- Resource observation:
  - Backend CPU peak: `TBD`
  - Backend memory peak: `TBD`
  - Notes: `TBD`
- Result summary: `TBD`

### 4.4 Endurance / Soak Test

- Purpose: Xác định endurance threshold cho bài kiểm thử hiệu năng hiện tại.
- Plan or command used: `TBD`
- Duration: `10-15 minutes`
- Stable load level: `TBD`
- JTL path: `submission/tests/1-test-plans/checkout-with-coupon/results/endurance.jtl`
- HTML report path: `submission/tests/1-test-plans/checkout-with-coupon/results/endurance-report/`
- Stable throughput ceiling: `TBD`
- Memory ceiling: `TBD`
- Endurance threshold conclusion: `TBD`

## 5. Human Review of AI-generated Plans

| Item reviewed                 | What AI / draft plan proposed     | Issue found                             | Correction made                                                         | Why correction was needed                     |
| ----------------------------- | --------------------------------- | --------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------- |
| Coupon calculation input      | `total_amount = ${product_price}` | Ignores `quantity`                      | Replaced with `${cart_total}` computed as `product_price * quantity`    | Coupon must apply to cart total               |
| Checkout extractor            | `$.id`                            | Backend returns `orderId`               | Changed extractor to `$.orderId`                                        | Wrong JSONPath would hide order creation      |
| Extracted-variable validation | Missing                           | Defaults can mask failures              | Added `JSR223 Assertion` checks for critical extracted variables        | Need hard evidence of workflow correctness    |
| Stress profile                | Single linear ramp                | Weak for finding breaking point         | Rebuilt stress plan as 4 staged thread groups with cumulative load      | Stress should increase progressively          |
| Spike profile narrative       | Long total duration               | Can be misreported as full spike window | Keep current timing but document baseline / spike / recovery explicitly | Need clear baseline / spike / recovery phases |

## 6. Evidence Checklist

### 6.1 Required artifacts

| Artifact                                        | Expected location                                                                 | Status  | Notes                        |
| ----------------------------------------------- | --------------------------------------------------------------------------------- | ------- | ---------------------------- |
| Load JMX                                        | `submission/tests/1-test-plans/checkout-with-coupon/23127115_Load_20260813.jmx`   | Present |                              |
| Stress JMX                                      | `submission/tests/1-test-plans/checkout-with-coupon/23127115_Stress_20260813.jmx` | Present |                              |
| Spike JMX                                       | `submission/tests/1-test-plans/checkout-with-coupon/23127115_Spike_20260813.jmx`  | Present |                              |
| CSV test data                                   | `submission/tests/1-test-plans/checkout-with-coupon/test-data/`                   | Present | 300 user rows                |
| Seed script                                     | `submission/tests/1-test-plans/checkout-with-coupon/seed_perf_users.js`           | Present | Must run after backend start |
| Load raw JTL                                    | `submission/tests/1-test-plans/checkout-with-coupon/results/load.jtl`             | Missing |                              |
| Stress raw JTL                                  | `submission/tests/1-test-plans/checkout-with-coupon/results/stress.jtl`           | Missing |                              |
| Spike raw JTL                                   | `submission/tests/1-test-plans/checkout-with-coupon/results/spike.jtl`            | Missing |                              |
| Load HTML report                                | `submission/tests/1-test-plans/checkout-with-coupon/results/load-report/`         | Missing |                              |
| Stress HTML report                              | `submission/tests/1-test-plans/checkout-with-coupon/results/stress-report/`       | Missing |                              |
| Spike HTML report                               | `submission/tests/1-test-plans/checkout-with-coupon/results/spike-report/`        | Missing |                              |
| Endurance raw JTL                               | `submission/tests/1-test-plans/checkout-with-coupon/results/endurance.jtl`        | Missing |                              |
| Endurance HTML report                           | `submission/tests/1-test-plans/checkout-with-coupon/results/endurance-report/`    | Missing |                              |
| Screenshot JMeter + resource monitor for Load   | `submission/docs/test-report/evidence/`                                           | Missing |                              |
| Screenshot JMeter + resource monitor for Stress | `submission/docs/test-report/evidence/`                                           | Missing |                              |
| Screenshot JMeter + resource monitor for Spike  | `submission/docs/test-report/evidence/`                                           | Missing |                              |
| Hardware screenshot and spec table              | `submission/docs/test-report/evidence/`                                           | Missing |                              |
| Lockout reset evidence                          | `submission/docs/test-report/evidence/`                                           | Missing | Command + screenshot/log     |
| Video demo link                                 | Main report / README                                                              | Missing | At least 6 minutes total     |
| GitHub issue links / screenshots                | Main report / evidence                                                            | Missing | If any bug/perf issue found  |

### 6.2 Run-order checklist

- Start backend.
- Run `seed_perf_users.js`.
- Verify coupon `PERFTEST` and perf users exist in DB.
- Reset lockout state before each official run.
- Execute `Load`.
- Collect JTL, HTML report, screenshot with resource monitor.
- Reset lockout state.
- Execute `Stress`.
- Collect JTL, HTML report, screenshot with resource monitor.
- Reset lockout state.
- Execute `Spike`.
- Collect JTL, HTML report, screenshot with resource monitor.
- Execute `Endurance / Soak`.
- Record stable throughput and memory ceiling.

## 7. Current Completion Status

| Area                         | Status           | Notes                                                               |
| ---------------------------- | ---------------- | ------------------------------------------------------------------- |
| Workflow scope defined       | Partial complete | Scope exists, but must be validated against actual backend behavior |
| 3 JMX files created          | Complete         | Naming and basic structure are present                              |
| Data-driven CSV setup        | Complete         | Present, but depends on post-start seed                             |
| Human review documented      | Partial complete | Findings identified, corrections not yet applied                    |
| Load execution               | Missing          | No `.jtl` or HTML report yet                                        |
| Stress execution             | Missing          | No `.jtl` or HTML report yet                                        |
| Spike execution              | Missing          | No `.jtl` or HTML report yet                                        |
| Endurance threshold          | Missing          | No soak run evidence yet                                            |
| Resource / hardware evidence | Missing          | No screenshots/spec sheet yet                                       |
| Lockout reset evidence       | Missing          | No recorded proof yet                                               |
| Video demo                   | Missing          | No link yet                                                         |

## 8. Next Actions

1. Sửa 3 `.jmx` theo các lỗi pre-run review.
2. Chạy lại seed sau khi backend đã lên xong.
3. Thực thi `Load`, `Stress`, `Spike`, rồi sinh `JTL + HTML report`.
4. Thêm một run `Endurance / Soak` 10-15 phút.
5. Điền số liệu thực tế vào file này ngay sau từng lần chạy để tránh thiếu bằng chứng.
