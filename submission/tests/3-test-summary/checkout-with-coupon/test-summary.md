# Test Summary — Performance Test Execution

> Scope: Performance Testing  
> Workflow: Checkout with Coupon  
> Base URL: `http://localhost:3000`  
> Tool: Apache JMeter 5.6.3  
> Student ID: `23127115`  
> Official run date: `2026-08-13`

## 1. Objective

This document summarizes the official execution results for three performance scenarios, `Load`, `Stress`, and `Spike`, against the same end-to-end workflow:

`POST /api/login` → `GET /api/categories` → `GET /api/products?search=` → `POST /api/cart` → `POST /api/apply-coupon` → `POST /api/checkout` → `GET /api/orders/my-orders`

The workflow covers:

- `auth-heavy`: `POST /api/login`
- `read-heavy`: `GET /api/categories`, `GET /api/products?search=`, `GET /api/orders/my-orders`
- `transactional`: `POST /api/cart`, `POST /api/apply-coupon`, `POST /api/checkout`

## 2. Pre-run Review Findings Applied

The following JMX fixes were applied before the official runs:

1. `POST /api/apply-coupon` now sends `${cart_total}` instead of `${product_price}`.
2. `cart_total` is computed as `product_price * quantity` before coupon application.
3. The checkout extractor reads `orderId` from the actual backend response.
4. Critical extractors are guarded by `JSR223 Assertion` so the workflow fails clearly if `access_token`, `user_id`, `product_id_resp`, `final_amount`, or `order_id` is missing.
5. The old extractor/plugin compatibility issues were removed by switching to core-compatible Groovy post-processors.
6. The stress plan was rebuilt as staged cumulative load rather than a single linear ramp.

## 3. Execution Matrix

| Scenario         | Plan file                      | Official artifact folder                                       | Actual run date | Actual status      |
| ---------------- | ------------------------------ | -------------------------------------------------------------- | --------------- | ------------------ |
| Load             | `23127115_Load_20260813.jmx`   | `submission/tests/2-test-runs/checkout-with-coupon/load/`      | `2026-08-13`    | `Executed`         |
| Stress           | `23127115_Stress_20260813.jmx` | `submission/tests/2-test-runs/checkout-with-coupon/stress/`    | `2026-08-13`    | `Executed`         |
| Spike            | `23127115_Spike_20260813.jmx`  | `submission/tests/2-test-runs/checkout-with-coupon/spike/`     | `2026-08-13`    | `Executed`         |
| Endurance / Soak | `23127115_Soak_20260815.jmx`  | `submission/tests/2-test-runs/checkout-with-coupon/soak/`      | `2026-08-15`    | `Executed`         |

## 4. Scenario Results

### 4.1 Load Test

- Plan file: `submission/tests/1-test-plans/checkout-with-coupon/23127115_Load_20260813.jmx`
- Command used: `jmeter -n -t submission/tests/1-test-plans/checkout-with-coupon/23127115_Load_20260813.jmx -l submission/tests/2-test-runs/checkout-with-coupon/load/20260813-load-official.jtl -j submission/tests/2-test-runs/checkout-with-coupon/load/20260813-load-official.log`
- Start / End time: `2026-08-13 20:39:12` → `2026-08-13 21:00:32`
- Data seed used: `seed_perf_users.js` executed before the run
- JTL path: `submission/tests/2-test-runs/checkout-with-coupon/load/20260813-load-official.jtl`
- HTML report path: `submission/tests/2-test-runs/checkout-with-coupon/load/html-report/`
- Key metrics:
  - Total samples: `5,996`
  - Error rate: `0.00%`
  - Throughput: `4.698 req/s`
  - Avg response time: `17.41 ms`
  - p95: `25 ms`
  - p99: `58 ms`
  - Max: `2360 ms`
- Sampler with highest p95: `Step 6 POST checkout` at `29 ms`
- Result summary: The load scenario completed cleanly with `0` failures and low latency across all samplers. This run established a stable baseline for the workflow under normal traffic.

### 4.2 Stress Test

- Plan file: `submission/tests/1-test-plans/checkout-with-coupon/23127115_Stress_20260813.jmx`
- Command used: `jmeter -n -t submission/tests/1-test-plans/checkout-with-coupon/23127115_Stress_20260813.jmx -l submission/tests/2-test-runs/checkout-with-coupon/stress/20260813-stress-official.jtl -j submission/tests/2-test-runs/checkout-with-coupon/stress/20260813-stress-official.log`
- Start / End time: `2026-08-13 21:03:35` → `2026-08-13 21:23:36`
- Data seed used: `seed_perf_users.js` re-executed before the run
- JTL path: `submission/tests/2-test-runs/checkout-with-coupon/stress/20260813-stress-official.jtl`
- HTML report path: `submission/tests/2-test-runs/checkout-with-coupon/stress/html-report/`
- Key metrics:
  - Total samples: `138,180`
  - Failures: `41`
  - Error rate: `0.03%`
  - Throughput: `115.276 req/s`
  - Avg response time: `55.98 ms`
  - p95: `259 ms`
  - p99: `925 ms`
  - Max: `3486 ms`
- Highest p95 sampler: `Step 5 POST apply-coupon` at `427 ms`
- First clear degradation point: around `minute 12`, where minute-window error rate reached `0.585%` and minute-window `p95` rose to `1247 ms`
- Notes:
  - Error concentration was not uniform. Most failures occurred in:
    - `Step 3 GET products search`: `17` failures
    - `Step 7 GET my-orders`: `18` failures
    - `Step 2 GET categories`: `6` failures
  - Despite the degradation window, overall stress-test error rate remained very low.
- Result summary: The stress scenario successfully pushed the system through cumulative load up to the highest configured stage. The system showed a short degradation period near minute `12`, but overall throughput stayed high and the final error rate remained under the stress-test acceptance threshold.

### 4.3 Spike Test

- Plan file: `submission/tests/1-test-plans/checkout-with-coupon/23127115_Spike_20260813.jmx`
- Command used: `jmeter -n -t submission/tests/1-test-plans/checkout-with-coupon/23127115_Spike_20260813.jmx -l submission/tests/2-test-runs/checkout-with-coupon/spike/20260813-spike-official.jtl -j submission/tests/2-test-runs/checkout-with-coupon/spike/20260813-spike-official.log`
- Start / End time: `2026-08-13 21:24:31` → `2026-08-13 21:37:32`
- Data seed used: `seed_perf_users.js` re-executed before the run
- JTL path: `submission/tests/2-test-runs/checkout-with-coupon/spike/20260813-spike-official.jtl`
- HTML report path: `submission/tests/2-test-runs/checkout-with-coupon/spike/html-report/`
- Key metrics:
  - Total samples: `45,436`
  - Failures: `34`
  - Overall error rate: `0.07%`
  - Throughput: `63.266 req/s`
  - Avg response time: `91.21 ms`
  - p95: `41 ms`
  - p99: `68 ms`
  - Max: `481450 ms`
- Highest p95 sampler: `Step 5 POST apply-coupon` at `52 ms`
- Spike behavior notes:
  - Minute windows `0-2` stayed clean with `0%` errors and `p95` around `35-38 ms`.
  - A failure cluster appeared late in the run:
    - minute window `11`: `29.032%` error rate on the small residual sample set
  - The extreme max values near `480s` are outliers created near end-of-test behavior and should not be treated as representative steady-state latency.
  - Failure concentration by sampler was highest at `Step 7 GET my-orders` with `17` failures.
- Recovery note: The current artifact set is sufficient for official execution evidence, but it does not include an explicit chart or per-phase monitor screenshot to prove recovery time visually within two minutes.
- Result summary: The spike scenario completed and remained low-error overall, but it produced a late outlier/failure cluster that should be called out in the report as a spike-specific instability rather than normal baseline behavior.

### 4.4 Endurance / Soak Test

- Plan file: `submission/tests/1-test-plans/checkout-with-coupon/23127115_Soak_20260815.jmx`
- Status: `Executed`
- Default profile:
  - `users=130`
  - `rampup=180s`
  - `duration=720s`
  - `think_mean=1500ms`
  - `think_range=200ms`
- Threshold runs executed:
  - `130 VUs`
  - `180 VUs`
  - `230 VUs`
- Run results:
  - `130 VUs`
    - JTL path: `submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-130vu.jtl`
    - HTML report path: `submission/tests/2-test-runs/checkout-with-coupon/soak/html-report-130vu/`
    - Resource screenshots:
      - `submission/tests/2-test-runs/checkout-with-coupon/soak/soak-resource-130vu-mid.png`
      - `submission/tests/2-test-runs/checkout-with-coupon/soak/soak-resource-130vu-late.png`
    - Key metrics: `54,364` samples, `0` failures, `75.687 req/s`, `avg 6.35 ms`, `p95 21 ms`, `p99 28 ms`, `max 691 ms`
    - Highest p95 sampler: `Step 6 POST checkout` at `27 ms`
  - `180 VUs`
    - JTL path: `submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-180vu.jtl`
    - HTML report path: `submission/tests/2-test-runs/checkout-with-coupon/soak/html-report-180vu/`
    - Resource screenshots:
      - `submission/tests/2-test-runs/checkout-with-coupon/soak/soak-resource-180vu-mid.png`
      - `submission/tests/2-test-runs/checkout-with-coupon/soak/soak-resource-180vu-late.png`
    - Key metrics: `75,207` samples, `0` failures, `104.724 req/s`, `avg 6.59 ms`, `p95 20 ms`, `p99 30 ms`, `max 71 ms`
    - Highest p95 sampler: `Step 6 POST checkout` at `26 ms`
  - `230 VUs`
    - JTL path: `submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-230vu.jtl`
    - HTML report path: `submission/tests/2-test-runs/checkout-with-coupon/soak/html-report-230vu/`
    - Resource screenshots:
      - `submission/tests/2-test-runs/checkout-with-coupon/soak/soak-resource-230vu-mid.png`
      - `submission/tests/2-test-runs/checkout-with-coupon/soak/soak-resource-230vu-late.png`
    - Key metrics: `95,747` samples, `0` failures, `133.280 req/s`, `avg 10.96 ms`, `p95 75 ms`, `p99 144 ms`, `max 311 ms`
    - Highest p95 sampler: `Step 5 POST apply-coupon` at `46 ms`
- Decision rule:
  - Highest run that still keeps `error rate <= 1%`, `overall p95 <= 300 ms`, and no late-run degradation trend is treated as the empirical stable hardware threshold.
- Planned artifact location:
  - Raw logs: `submission/tests/2-test-runs/checkout-with-coupon/soak/`
  - HTML reports: `submission/tests/2-test-runs/checkout-with-coupon/soak/html-report-*/`
  - Resource screenshots: `submission/tests/2-test-runs/checkout-with-coupon/soak/soak-resource-*.png`
- Final soak conclusion:
  - `130 VUs` and `180 VUs` stayed fully stable with `0%` error rate and very low tail latency.
  - `230 VUs` still completed with `0%` error rate and improved throughput, but it is the first level where latency rose noticeably: overall `p95` increased to `75 ms` and `p99` to `144 ms`.
  - Based on the executed profiles, the conservative empirical stable threshold for this localhost environment is `180 VUs`, while `230 VUs` is the first observed early-degradation zone rather than a failure point.

### 4.5 Hardware Context

| Item | Value |
| --- | --- |
| Computer name | `QUOCTAN` |
| Operating system | `Windows 11 Pro 64-bit (10.0, Build 26200)` |
| Manufacturer | `LENOVO` |
| Model | `21BV000SUS` |
| CPU | `12th Gen Intel(R) Core(TM) i7-1260P` |
| Logical CPUs | `16` |
| RAM | `16 GB` |
| DirectX | `DirectX 12` |
| Hardware screenshot | `submission/tests/2-test-runs/checkout-with-coupon/hardware/hardware-dxdiag.png` |

## 5. Human Review of AI-generated Plans

| Item reviewed                 | What AI / draft plan proposed                     | Issue found                                | Correction made                                                        | Why correction was needed                  |
| ----------------------------- | ------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------- | ------------------------------------------ |
| Coupon calculation input      | `total_amount = ${product_price}`                 | Ignores `quantity`                         | Replaced with `${cart_total}` computed from `product_price * quantity` | Coupon must apply to cart total            |
| Checkout extractor            | `$.id`                                            | Backend returns `orderId`                  | Changed extractor to `$.orderId`                                       | Wrong JSONPath would hide order creation   |
| Extracted-variable validation | Missing                                           | Defaults can mask failures                 | Added `JSR223 Assertion` checks for critical extracted variables       | Need hard evidence of workflow correctness |
| JMeter CLI compatibility      | `JSONPathExtractor` and malformed hashTree layout | JMeter 5.6.3 CLI failed to parse the plans | Replaced with Groovy post-processors and repaired `hashTree` structure | Official runs must execute from CLI        |
| Response assertions           | Old XML format without `stringProp name`          | Parser compatibility issue in JMeter 5.6.3 | Normalized response assertion XML                                      | Prevents parser failure before execution   |

## 6. Evidence Checklist

| Artifact                           | Expected location                                                                       | Status  | Notes                                                |
| ---------------------------------- | --------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------- |
| Load JMX                           | `submission/tests/1-test-plans/checkout-with-coupon/23127115_Load_20260813.jmx`         | Present |                                                      |
| Stress JMX                         | `submission/tests/1-test-plans/checkout-with-coupon/23127115_Stress_20260813.jmx`       | Present |                                                      |
| Spike JMX                          | `submission/tests/1-test-plans/checkout-with-coupon/23127115_Spike_20260813.jmx`        | Present |                                                      |
| CSV test data                      | `submission/tests/1-test-plans/checkout-with-coupon/test-data/`                         | Present | Regenerated before official runs                     |
| Seed script                        | `submission/tests/1-test-plans/checkout-with-coupon/seed_perf_users.js`                 | Present | Executed before each official run                    |
| Load raw JTL                       | `submission/tests/2-test-runs/checkout-with-coupon/load/20260813-load-official.jtl`     | Present |                                                      |
| Stress raw JTL                     | `submission/tests/2-test-runs/checkout-with-coupon/stress/20260813-stress-official.jtl` | Present |                                                      |
| Spike raw JTL                      | `submission/tests/2-test-runs/checkout-with-coupon/spike/20260813-spike-official.jtl`   | Present |                                                      |
| Soak raw JTL (130 / 180 / 230 VU)  | `submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-*.jtl`             | Present | Three threshold runs completed                       |
| Load HTML report                   | `submission/tests/2-test-runs/checkout-with-coupon/load/html-report/`                   | Present |                                                      |
| Stress HTML report                 | `submission/tests/2-test-runs/checkout-with-coupon/stress/html-report/`                 | Present |                                                      |
| Spike HTML report                  | `submission/tests/2-test-runs/checkout-with-coupon/spike/html-report/`                  | Present |                                                      |
| Soak HTML reports                  | `submission/tests/2-test-runs/checkout-with-coupon/soak/html-report-*/`                  | Present | Reports exist for `130`, `180`, and `230 VUs`       |
| Resource screenshots               | `submission/tests/2-test-runs/checkout-with-coupon/load/load-resource.png`, `.../stress/stress-resource.png`, `.../spike/spike-resource.png` | Present | Load, Stress, and Spike resource screenshots are available |
| Soak resource screenshots          | `submission/tests/2-test-runs/checkout-with-coupon/soak/soak-resource-*-mid.png` and `...-late.png` | Present | Mid-run and late-run screenshots captured for `130`, `180`, and `230 VUs` |
| Hardware screenshot and spec table | `submission/tests/2-test-runs/checkout-with-coupon/hardware/hardware-dxdiag.png`        | Present | Hardware spec table is documented in section 4.5     |
| Endurance / soak plan              | `submission/tests/1-test-plans/checkout-with-coupon/23127115_Soak_20260815.jmx`        | Present | Parameterized for `130 / 180 / 230 VUs`             |
| Endurance / soak artifact          | `submission/tests/2-test-runs/checkout-with-coupon/soak/`                              | Present | `130`, `180`, and `230 VU` runs are all available   |
| Video demo link                    | Main report / README                                                                    | Missing |                                                      |

## 7. Current Completion Status

| Area                             | Status   | Notes                                                          |
| -------------------------------- | -------- | -------------------------------------------------------------- |
| Workflow scope defined           | Complete | Same E2E flow used across all official scenarios               |
| 3 JMX files created and repaired | Complete | CLI-compatible and officially executed                         |
| Data-driven CSV setup            | Complete | Seeded and regenerated before runs                             |
| Human review documented          | Complete | Fixes and rationale captured                                   |
| Load execution                   | Complete | Official artifacts present                                     |
| Stress execution                 | Complete | Official artifacts present                                     |
| Spike execution                  | Complete | Official artifacts present                                     |
| Endurance threshold              | Complete | `180 VU` is the conservative stable threshold; `230 VU` shows the first clear latency rise |
| HTML reports                     | Complete | Official HTML report folders generated for all three scenarios |
| Resource / hardware evidence     | Complete | Hardware screenshot/spec table and load/stress/spike resource screenshots exist |
| Video demo                       | Missing  | No link recorded                                               |

## 8. Remaining Actions

1. Add the final video demo link if it is required in the submission package.
2. Commit the soak artifacts and the updated summary documents.
