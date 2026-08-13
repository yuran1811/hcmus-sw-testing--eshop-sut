# Traceability Matrix — Performance Testing

> Workflow under test: Checkout with Coupon  
> Official execution date: `2026-08-13`

## Coverage Mapping

| Requirement                                                                   | Test Case / Step                                            | Evidence                                                                                | Result | Status             |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------ | ------------------ |
| Use one E2E workflow covering `auth-heavy`, `read-heavy`, and `transactional` | Full workflow in all three JMX plans                        | 3 JMX files + official JTL artifacts                                                    | `Pass` | `Complete`         |
| Auth-heavy endpoint included                                                  | Step 1 `POST /api/login`                                    | Present in all JMX files and all official JTL files                                     | `Pass` | `Complete`         |
| Read-heavy endpoint included                                                  | Step 2 `GET /api/categories`                                | Present in all JMX files and all official JTL files                                     | `Pass` | `Complete`         |
| Read-heavy endpoint included                                                  | Step 3 `GET /api/products?search=`                          | Present in all JMX files and all official JTL files                                     | `Pass` | `Complete`         |
| Transactional endpoint included                                               | Step 4 `POST /api/cart`                                     | Present in all JMX files and all official JTL files                                     | `Pass` | `Complete`         |
| Transactional endpoint included                                               | Step 5 `POST /api/apply-coupon`                             | Present in all JMX files and all official JTL files                                     | `Pass` | `Complete`         |
| Transactional endpoint included                                               | Step 6 `POST /api/checkout`                                 | Present in all JMX files and all official JTL files                                     | `Pass` | `Complete`         |
| Read-after-write verification included                                        | Step 7 `GET /api/orders/my-orders`                          | Present in all JMX files and all official JTL files                                     | `Pass` | `Complete`         |
| AI-generated plans reviewed by human                                          | JMX repair log and review summary                           | `test-summary.md` sections 2 and 5                                                      | `Pass` | `Complete`         |
| Data-driven workflow with CSV input                                           | `users.csv` and `keywords.csv`                              | Seed script + regenerated CSV files                                                     | `Pass` | `Complete`         |
| Correct file naming convention                                                | `23127115_Load_20260813.jmx`, `...Stress...`, `...Spike...` | Repository files                                                                        | `Pass` | `Complete`         |
| Execute Load scenario                                                         | Official Load run                                           | `submission/tests/2-test-runs/checkout-with-coupon/load/20260813-load-official.jtl`     | `Pass` | `Complete`         |
| Execute Stress scenario                                                       | Official Stress run                                         | `submission/tests/2-test-runs/checkout-with-coupon/stress/20260813-stress-official.jtl` | `Pass` | `Complete`         |
| Execute Spike scenario                                                        | Official Spike run                                          | `submission/tests/2-test-runs/checkout-with-coupon/spike/20260813-spike-official.jtl`   | `Pass` | `Complete`         |
| Generate raw `.jtl` logs                                                      | Load / Stress / Spike                                       | Official `.jtl` files in `2-test-runs`                                                  | `Pass` | `Complete`         |
| Identify and reset account state between runs                                 | Re-seed before each official run                            | Seed script execution logs                                                              | `Pass` | `Complete`         |
| Generate HTML reports                                                         | Load / Stress / Spike report exports                        | `html-report/` folders in each official run directory                                   | `Pass` | `Complete`         |
| Capture tool + resource usage together                                        | One screenshot per scenario                                 | No screenshots yet                                                                      | `TBD`  | `Missing evidence` |
| Capture hardware report and spec table                                        | Hardware screenshot + table                                 | `submission/tests/2-test-runs/checkout-with-coupon/hardware-dxdiag.png` + section 4.5 in `test-summary.md` | `Pass`  | `Complete` |
| Determine endurance threshold on local hardware                               | Endurance / soak run                                        | No separate run                                                                         | `TBD`  | `Missing evidence` |
| Provide video demo with narration                                             | Submission video link                                       | No link yet                                                                             | `TBD`  | `Missing evidence` |

## Official Scenario Results

| Scenario | Total samples | Failures | Error rate | Throughput      | p95      | p99      | Max         | Outcome                       |
| -------- | ------------- | -------- | ---------- | --------------- | -------- | -------- | ----------- | ----------------------------- |
| Load     | `5,996`       | `0`      | `0.00%`    | `4.698 req/s`   | `25 ms`  | `58 ms`  | `2360 ms`   | `Pass`                        |
| Stress   | `138,180`     | `41`     | `0.03%`    | `115.276 req/s` | `259 ms` | `925 ms` | `3486 ms`   | `Pass with minor degradation` |
| Spike    | `45,436`      | `34`     | `0.07%`    | `63.266 req/s`  | `41 ms`  | `68 ms`  | `481450 ms` | `Pass with end-of-test outliers` |

## JMX Defect Tracking

| ID     | Finding                                                      | Affected plan(s)    | Severity | Fix status | Notes                                                  |
| ------ | ------------------------------------------------------------ | ------------------- | -------- | ---------- | ------------------------------------------------------ |
| JMX-01 | Coupon request used `${product_price}` instead of cart total | Load, Stress, Spike | High     | `Closed`   | Replaced with `${cart_total}`                          |
| JMX-02 | Checkout extractor used wrong field                          | Load, Stress, Spike | High     | `Closed`   | Extractor now reads `orderId`                          |
| JMX-03 | Missing hard validation for extracted variables              | Load, Stress, Spike | High     | `Closed`   | Added `JSR223 Assertion` checks                        |
| JMX-04 | Product search could silently fall back                      | Load, Stress, Spike | Medium   | `Closed`   | Workflow now fails clearly on missing data             |
| JMX-05 | Stress profile was not staged                                | Stress              | Medium   | `Closed`   | Rebuilt as four cumulative stages                      |
| JMX-06 | JMeter CLI parser incompatibility                            | Load, Stress, Spike | High     | `Closed`   | Repaired XML structure and extractor approach          |
| JMX-07 | Listener / CLI output ownership not standardized             | Load, Stress, Spike | Low      | `Closed`   | Official runs stored in `submission/tests/2-test-runs` |

## Artifact Completion Checklist

| Artifact                         | Expected path                                                                           | Status    | Notes |
| -------------------------------- | --------------------------------------------------------------------------------------- | --------- | ----- |
| Load JTL                         | `submission/tests/2-test-runs/checkout-with-coupon/load/20260813-load-official.jtl`     | `Present` |       |
| Stress JTL                       | `submission/tests/2-test-runs/checkout-with-coupon/stress/20260813-stress-official.jtl` | `Present` |       |
| Spike JTL                        | `submission/tests/2-test-runs/checkout-with-coupon/spike/20260813-spike-official.jtl`   | `Present` |       |
| Load HTML report                 | `submission/tests/2-test-runs/checkout-with-coupon/load/html-report/`                   | `Present` |       |
| Stress HTML report               | `submission/tests/2-test-runs/checkout-with-coupon/stress/html-report/`                 | `Present` |       |
| Spike HTML report                | `submission/tests/2-test-runs/checkout-with-coupon/spike/html-report/`                  | `Present` |       |
| Resource screenshots             | `submission/docs/test-report/evidence/`                                                 | `Missing` |       |
| Hardware screenshot / spec table | `submission/tests/2-test-runs/checkout-with-coupon/hardware-dxdiag.png`                 | `Present` | Spec table is documented in `test-summary.md` |
| Endurance / soak artifact        | `submission/tests/2-test-runs/checkout-with-coupon/endurance/`                          | `Missing` |       |
| Video demo link                  | Main report / README                                                                    | `Missing` |       |
