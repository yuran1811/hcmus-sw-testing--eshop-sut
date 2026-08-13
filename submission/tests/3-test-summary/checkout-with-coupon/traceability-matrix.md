# Traceability Matrix — Performance Testing

> Scope: Performance Testing  
> Workflow under test: Checkout with Coupon  
> Prepared on: `2026-08-13`

## Coverage Mapping

| Requirement                                                               | Test Case / Step                                            | Planned Evidence                                | Result | Bug Issue | Status              |
| ------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------- | ------ | --------- | ------------------- |
| Use one E2E workflow covering `auth-heavy`, `read-heavy`, `transactional` | Full workflow in all three JMX plans                        | 3 JMX files + main report                       | `TBD`  |           | `Planned`           |
| Auth-heavy endpoint included                                              | Step 1 `POST /api/login`                                    | JMX sampler + JTL samples                       | `TBD`  |           | `Planned`           |
| Read-heavy endpoint included                                              | Step 2 `GET /api/categories`                                | JMX sampler + JTL samples                       | `TBD`  |           | `Planned`           |
| Read-heavy endpoint included                                              | Step 3 `GET /api/products?search=`                          | JMX sampler + JTL samples                       | `TBD`  |           | `Planned`           |
| Transactional endpoint included                                           | Step 4 `POST /api/cart`                                     | JMX sampler + JTL samples                       | `TBD`  |           | `Planned`           |
| Transactional endpoint included                                           | Step 5 `POST /api/apply-coupon`                             | JMX sampler + JTL samples                       | `TBD`  |           | `Planned`           |
| Transactional endpoint included                                           | Step 6 `POST /api/checkout`                                 | JMX sampler + JTL samples                       | `TBD`  |           | `Planned`           |
| Read-after-write verification included                                    | Step 7 `GET /api/orders/my-orders`                          | JMX sampler + JTL samples                       | `TBD`  |           | `Planned`           |
| AI-generated test plans reviewed by human                                 | Pre-run review + correction log                             | `test-summary.md` section 2 and 5               | `TBD`  |           | `In progress`       |
| Data-driven workflow with CSV input                                       | `CSV users.csv` in all plans                                | CSV file + JMX config                           | `TBD`  |           | `Present`           |
| Three different listener/report types                                     | Load / Stress / Spike use distinct listeners                | JMX XML + screenshots                           | `TBD`  |           | `Present`           |
| Correct file naming convention                                            | `23127115_Load_20260813.jmx`, `...Stress...`, `...Spike...` | Repository files                                | `Pass` |           | `Complete`          |
| Execute Load scenario                                                     | Load plan run                                               | `results/load.jtl` + `results/load-report/`     | `TBD`  |           | `Missing evidence`  |
| Execute Stress scenario                                                   | Stress plan run                                             | `results/stress.jtl` + `results/stress-report/` | `TBD`  |           | `Missing evidence`  |
| Execute Spike scenario                                                    | Spike plan run                                              | `results/spike.jtl` + `results/spike-report/`   | `TBD`  |           | `Missing evidence`  |
| Identify and reset account lockout between runs                           | Reset command before reruns                                 | Screenshot/log/command transcript               | `TBD`  |           | `Missing evidence`  |
| Capture tool + resource usage together                                    | One screenshot per scenario                                 | Evidence screenshots                            | `TBD`  |           | `Missing evidence`  |
| Capture hardware report and spec table                                    | Hardware screenshot + table                                 | Evidence screenshots + report section           | `TBD`  |           | `Missing evidence`  |
| Generate raw `.jtl` logs                                                  | Load / Stress / Spike raw logs                              | 3 `.jtl` files                                  | `TBD`  |           | `Missing evidence`  |
| Generate HTML reports                                                     | Load / Stress / Spike HTML folders                          | 3 report directories                            | `TBD`  |           | `Missing evidence`  |
| Determine endurance threshold on local hardware                           | Endurance / soak run                                        | `endurance.jtl` + report + conclusion           | `TBD`  |           | `Missing evidence`  |
| Record real bug or performance issue if found                             | GitHub issue or report note                                 | Issue link / screenshot / note                  | `TBD`  |           | `Pending execution` |
| Provide video demo with narration                                         | YouTube unlisted link                                       | Main report / README                            | `TBD`  |           | `Missing evidence`  |

## Pre-run Defect Tracking for the JMX Plans

| ID     | Finding                                                                         | Affected plan(s)    | Severity | Proposed fix                                                                                      | Status   |
| ------ | ------------------------------------------------------------------------------- | ------------------- | -------- | ------------------------------------------------------------------------------------------------- | -------- |
| JMX-01 | Coupon request uses `${product_price}` instead of cart total                    | Load, Stress, Spike | High     | Compute `${cart_total}` from `product_price * quantity` and send that to `/api/apply-coupon`      | `Closed` |
| JMX-02 | Checkout extractor uses `$.id`, but backend returns `orderId`                   | Load, Stress, Spike | High     | Change extractor to `$.orderId`                                                                   | `Closed` |
| JMX-03 | No hard assertion that extracted token and downstream variables are non-default | Load, Stress, Spike | High     | Add response / JSR223 assertions for `access_token`, `user_id`, `product_id_resp`, `final_amount` | `Closed` |
| JMX-04 | Search sampler can silently fall back to default product data                   | Load, Stress, Spike | Medium   | Fail fast when no product is returned instead of masking with default values                      | `Closed` |
| JMX-05 | Stress profile is linear, not stepped/incremental                               | Stress              | Medium   | Use staged load levels or document why linear ramp is acceptable                                  | `Closed` |
| JMX-06 | Listener output path may duplicate or conflict with CLI `-l` usage              | Load, Stress, Spike | Low      | Standardize run commands and output ownership                                                     | `Open`   |

## Artifact Completion Checklist

| Artifact                    | Expected path                                                                  | Status    | Notes                      |
| --------------------------- | ------------------------------------------------------------------------------ | --------- | -------------------------- |
| Load JTL                    | `submission/tests/1-test-plans/checkout-with-coupon/results/load.jtl`          | `Missing` |                            |
| Stress JTL                  | `submission/tests/1-test-plans/checkout-with-coupon/results/stress.jtl`        | `Missing` |                            |
| Spike JTL                   | `submission/tests/1-test-plans/checkout-with-coupon/results/spike.jtl`         | `Missing` |                            |
| Load HTML report            | `submission/tests/1-test-plans/checkout-with-coupon/results/load-report/`      | `Missing` |                            |
| Stress HTML report          | `submission/tests/1-test-plans/checkout-with-coupon/results/stress-report/`    | `Missing` |                            |
| Spike HTML report           | `submission/tests/1-test-plans/checkout-with-coupon/results/spike-report/`     | `Missing` |                            |
| Endurance JTL               | `submission/tests/1-test-plans/checkout-with-coupon/results/endurance.jtl`     | `Missing` |                            |
| Endurance HTML report       | `submission/tests/1-test-plans/checkout-with-coupon/results/endurance-report/` | `Missing` |                            |
| Resource screenshot: Load   | `submission/docs/test-report/evidence/`                                        | `Missing` |                            |
| Resource screenshot: Stress | `submission/docs/test-report/evidence/`                                        | `Missing` |                            |
| Resource screenshot: Spike  | `submission/docs/test-report/evidence/`                                        | `Missing` |                            |
| Hardware screenshot         | `submission/docs/test-report/evidence/`                                        | `Missing` |                            |
| Hardware spec table         | Main report                                                                    | `Missing` |                            |
| Lockout reset proof         | Main report / evidence                                                         | `Missing` |                            |
| Video demo link             | Main report / README                                                           | `Missing` |                            |
| Bug issue evidence          | Main report / evidence                                                         | `Pending` | Depends on actual findings |
