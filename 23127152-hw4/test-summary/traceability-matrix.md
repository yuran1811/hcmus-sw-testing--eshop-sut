# HW04 — Traceability Matrix

StudentID: 23127152 · 42 test case (FR-02: 13, FR-10: 15, FR-18: 14) · 9 browser run (3 feature × 3 browser) · +3 case smoke test (FR-01, ngoài phạm vi chấm điểm)

Nguồn test case: `23127152-hw4/test-cases/<feature>/*.md` · Script: `23127152-hw4/e2e/<feature>/*.spec.ts` · Data: `23127152-hw4/e2e/data/*.json` · Report: `23127152-hw4/reports/<feature>/<browser>/index.html`

## FR-02 — Login and Account Lockout

| Case ID | Type | Automated | Chromium | Firefox | WebKit | Bug |
|---|---|---|---|---|---|---|
| FR02-TC01 | positive | Y | PASS | PASS | PASS | — |
| FR02-TC02 | positive | Y | PASS | PASS | PASS | — |
| FR02-TC03 | positive | Y | PASS | PASS | PASS | — |
| FR02-TC04 | negative | Y | PASS | PASS | PASS | — |
| FR02-TC05 | negative | Y | PASS | PASS | PASS | — |
| FR02-TC06 | negative | Y | PASS | PASS | PASS | — |
| FR02-TC07 | edge | Y | FAIL | FAIL | FAIL | BUG-01 |
| FR02-TC08 | edge | Y | PASS | PASS | PASS | — |
| FR02-TC09 | edge | Y | PASS | PASS | PASS | — |
| FR02-TC10 | negative | Y | PASS | PASS | PASS | — |
| FR02-TC11 | negative | Y | PASS | PASS | PASS | — |
| FR02-TC12 | edge | Y | PASS | PASS | PASS | — |
| FR02-TC13 | edge | Y | PASS | PASS | PASS | — |

## FR-10 — Order State Machine

| Case ID | Type | Automated | Chromium | Firefox | WebKit | Bug |
|---|---|---|---|---|---|---|
| FR10-TC01 | positive | Y | PASS | PASS | PASS | — |
| FR10-TC02 | positive | Y | PASS | PASS | PASS | — |
| FR10-TC03 | positive | Y | PASS | PASS | PASS | — |
| FR10-TC04 | positive | Y | PASS | PASS | PASS | — |
| FR10-TC05 | positive | Y | PASS | PASS | PASS | — |
| FR10-TC06 | negative | Y | PASS | PASS | PASS | — |
| FR10-TC07 | negative | Y | PASS | PASS | PASS | — |
| FR10-TC08 | negative | Y | PASS | PASS | PASS | — |
| FR10-TC09 | negative | Y | PASS | PASS | PASS | — |
| FR10-TC10 | edge | Y | FAIL | FAIL | FAIL | BUG-06 |
| FR10-TC11 | edge | Y | PASS | PASS | PASS | — |
| FR10-TC12 | edge | Y | FAIL | FAIL | FAIL | BUG-07 |
| FR10-TC13 | negative | Y | PASS | PASS | PASS | — |
| FR10-TC14 | negative | Y | FAIL | FAIL | FAIL | BUG-11 |
| FR10-TC15 | negative | Y | PASS | PASS | PASS | — |

## FR-18 — Order Management (Admin)

| Case ID | Type | Automated | Chromium | Firefox | WebKit | Bug |
|---|---|---|---|---|---|---|
| FR18-TC01 | positive | Y | PASS | PASS | PASS | — |
| FR18-TC02 | negative | Y | FAIL | FAIL | FAIL | BUG-11 |
| FR18-TC03 | negative | Y | PASS | PASS | PASS | — |
| FR18-TC04 | positive | Y | PASS | PASS | PASS | — |
| FR18-TC05 | positive | Y | PASS | PASS | PASS | — |
| FR18-TC06 | negative | Y | PASS | PASS | PASS | — |
| FR18-TC07 | negative | Y | PASS | PASS | PASS | — |
| FR18-TC08 | edge | Y | PASS | PASS | PASS | — |
| FR18-TC09 | edge | Y | PASS | PASS | PASS | — |
| FR18-TC10 | edge | Y | FAIL | FAIL | FAIL | BUG-09 |
| FR18-TC11 | edge | Y | FAIL | FAIL | FAIL | BUG-09 |
| FR18-TC12 | edge | Y | PASS | PASS | PASS | — |
| FR18-TC13 | negative | Y | FAIL | FAIL | FAIL | BUG-08 |
| FR18-TC14 | negative | Y | FAIL | FAIL | FAIL | BUG-08 |

## FR-01 — Registration (smoke test, ngoài phạm vi 3 feature chấm điểm)

| Case ID | Type | Automated | Chromium | Firefox | WebKit | Bug |
|---|---|---|---|---|---|---|
| FR01-SMOKE-01 | positive | Y | PASS | PASS | PASS | — |
| FR01-SMOKE-02 | negative | Y | FAIL | FAIL | FAIL | BUG-10 |
| FR01-SMOKE-03 | edge | Y | PASS | PASS | PASS | — |

## Tổng kết

- Test case đã thiết kế: **45** (42 chính thức + 3 smoke)
- Test case đã automate: **45/45 (100%)**
- Browser run: **9** (3 feature × 3 browser), tổng **15 report HTML** tính cả smoke test
- Bug reconfirmed từ HW02: **5** (BUG-01, 06, 07, 08, 09)
- Bug mới phát hiện ở HW04: **2** (BUG-10, BUG-11)
