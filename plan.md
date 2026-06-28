# HW02 — Domain Testing & BVA — Execution Plan

**Student ID:** 23127152  
**Branch:** `ntanh/23127152-hw2`

## Features

| Pool | Feature | Points |
|------|---------|--------|
| A | FR-02: Login & Account Lockout | 25 |
| B | FR-10: Order State Machine | 25 |
| C | FR-18: Admin Order Management | 25 |
| D | Mobile: Order History | 15 |
| — | Agent Skills (`.claude/skills/`) | 10 ✓ |

---

## Prerequisites

```bash
# Start SUT before any test run
cd backend && node server.js           # → localhost:3000
cd frontend-web && npm run dev         # → localhost:5173
cd frontend-admin && npm run dev       # → localhost:5174
cd frontend-mobile && npx expo start   # → Expo web at localhost:8081
```

Accounts: `admin@eshop.com / Admin123!` · `test@eshop.com / Test1234!`

**Execution tool:** Playwright MCP plugin — used for all UI interaction and screenshots.  
**Test design source:** Spec only (`README.md` / `api_specification.md`) — no source code reading.

---

## Output Structure

```
tests/
├── plan.md
├── README.md                          ← self-assessment + test summary (written last)
├── test-cases/
│   ├── FR02_Login/
│   │   ├── DomainTesting.md           ← DT design: variables, classes, expected results
│   │   └── BVA.md                     ← BVA design: boundaries, 3-point test cases
│   ├── FR10_OrderState/
│   │   ├── DomainTesting.md
│   │   └── BVA.md
│   ├── FR18_AdminOrder/
│   │   ├── DomainTesting.md
│   │   └── BVA.md
│   └── Mobile_OrderHistory/
│       ├── DomainTesting.md
│       └── BVA.md
├── test-runs/
│   ├── FR02_Login/
│   │   ├── DomainTesting.md           ← actual results + screenshot refs
│   │   ├── BVA.md
│   │   └── screenshots/
│   ├── FR10_OrderState/
│   │   ├── DomainTesting.md
│   │   ├── BVA.md
│   │   └── screenshots/
│   ├── FR18_AdminOrder/
│   │   ├── DomainTesting.md
│   │   ├── BVA.md
│   │   └── screenshots/
│   └── Mobile_OrderHistory/
│       ├── DomainTesting.md
│       ├── BVA.md
│       └── screenshots/
├── test-summary/
│   ├── FR02_Login.md                  ← pass/fail counts, bugs found
│   ├── FR10_OrderState.md
│   ├── FR18_AdminOrder.md
│   └── Mobile_OrderHistory.md
├── bug-reports/
│   └── BUG-NN.md                      ← one file per bug, with screenshot
└── ai-audit/
    ├── AI_Audit_Report.md
    └── AI_Critique.md
```

---

## Testing Approach

1. **Design first, execute second.** Write all test cases from the spec before touching the SUT.
2. **No source code reading for test design.** Variables, classes, and boundaries come from `README.md` spec only.
3. **Playwright MCP for execution.** Every test step is driven through Playwright:
   - Navigate to the feature URL
   - Interact with UI (fill forms, click buttons)
   - Take screenshot at each key assertion point
   - Record actual result in the test-run document
4. **Screenshot naming:** `<ID>-<step>.png` e.g. `DT-FR02-01-result.png`, `BUG-03-evidence.png`
5. **Bug confirmation:** Any deviation from expected = potential bug → screenshot → bug report → GitHub Issue.

---

## Document Column Standards

### test-cases/DomainTesting.md and test-cases/BVA.md
Design-only columns (no Actual/Pass-Fail here):
`ID | Variable(s) | Class / BVA Point | Test Value | Preconditions | Expected Result`

### test-runs/DomainTesting.md and test-runs/BVA.md
Execution columns (mirrors design table + results):
`ID | Test Value | Preconditions | Expected | Actual | Screenshot | Pass/Fail`

### test-summary/summary.md
`Total Designed | Executed | Passed | Failed | Bugs Found`
Plus: list of bug IDs found during this feature.

### bug-reports/BUG-NN.md
```
Title, ID, Severity, Feature, Steps to Reproduce, Expected, Actual, Screenshot(s)
```

---

## Step-by-Step Execution Plan

> **Git rule:** Claude writes files only — Claude NEVER runs git commands.  
> After each step is complete, **you** run the git block below it manually.  
> Each phase produces exactly **4 commits**.

---

### PHASE 1 — FR-02: Login & Account Lockout (4 commits)

**Spec reference:** `README.md` §FR-02, §FR-22  
**SUT URL:** `http://localhost:5173` (login page)  
**API:** `POST /api/login`

#### Variables (from spec only)
| Variable | Type | Spec Constraint |
|----------|------|----------------|
| `email` | string | Valid RFC 5321 format; must exist in system |
| `password` | string | Must match registered password; case-sensitive |
| `account_state` | derived | Determined by failed login count; ≥3 failures → 30s lock |
| `email input type` | UI | Spec FR-22: must be `type="email"` |
| `password input type` | UI | Spec FR-22: must be `type="password"` |

#### Domain Testing Classes
| Variable | Classes |
|----------|---------|
| `email` | valid+exists, valid+not-exists, missing `@`, missing domain, empty, whitespace |
| `password` | correct, wrong, empty, correct-but-different-case |
| `account_state` | normal (0 failures), 1 failure, 2 failures, locked (≥3), lock expired |

#### BVA Boundaries
| Variable | Boundary | 3-Point Values |
|----------|----------|---------------|
| `login_attempts` | lock threshold = 3 | 2 attempts, 3 attempts, 4 attempts |
| `locked_until` | boundary = now | past (unlocked), exact now, future (locked) |
| `email` length | RFC 5321 max = 254 | 253 chars, 254 chars, 255 chars |
| `password` | min presence | empty (0 chars), 1 char |

#### Steps

- [x] **Step 1a** — Write `test-cases/FR02_Login/DomainTesting.md`
  - Variables + domain table + equivalence class table + test cases `DT-FR02-01…17` (design only)

- [x] **Step 1b** — Write `test-cases/FR02_Login/BVA.md`
  - Boundary table + BVA test cases `BVA-FR02-01…12` (design only)

```bash
# COMMIT 1 — run manually after both design docs are written
git add tests/test-cases/FR02_Login/
git commit -m "test(fr02): domain testing + BVA — variables, classes, boundaries, test cases design"
```

---

- [ ] **Step 2** — Execute DT + BVA via Playwright + screenshots
  - **DT:** Drive login page — fill email/password, submit, screenshot result for each DT case → `test-runs/FR02_Login/DomainTesting.md`
  - **BVA:** Focus on lockout boundary — attempt N logins, screenshot after each → `test-runs/FR02_Login/BVA.md`
  - Record actual result per case; flag any deviation

```bash
# COMMIT 2 — run manually after all Playwright execution is done
git add tests/test-runs/FR02_Login/
git commit -m "test(fr02): Execution — domain testing + BVA with screenshots report"
```

---

- [ ] **Step 3** — Write `test-summary/FR02_Login.md`
  - Pass/fail counts, bugs identified in this feature

```bash
# COMMIT 3 — run manually after test summary is written
git add tests/test-summary/FR02_Login.md
git commit -m "test(fr02): test summary"
```

---

- [ ] **Step 4** — Write `bug-reports/BUG-0N.md` per bug + post GitHub Issues with screenshots
  - One file per bug found during FR02

```bash
# COMMIT 4 — run manually after all bug reports are written
git add tests/bug-reports/
git commit -m "test(fr02): bug reports"
```

---

### PHASE 2 — FR-10: Order State Machine (4 commits)

**Spec reference:** `README.md` §FR-10  
**SUT URL:** `http://localhost:5173` (user) + `http://localhost:5174` (admin)  
**APIs:** `PUT /api/orders/:id/cancel`, `PUT /api/admin/orders/:id/status`

#### Variables (from spec only)
| Variable | Type | Spec Constraint |
|----------|------|----------------|
| `current_status` | enum | pending, confirmed, shipping, delivered, canceled |
| `target_status` | enum | must follow spec state machine diagram |
| `actor` | enum | user or admin — different permissions |

#### Domain Testing Classes
| Class Category | Test Values |
|---------------|-------------|
| Valid transitions (admin) | pending→confirmed, pending→canceled, confirmed→shipping, confirmed→canceled, shipping→delivered |
| Valid transitions (user) | pending→canceled, confirmed→canceled |
| Invalid: terminal state | delivered→any, canceled→any |
| Invalid: actor violation | user attempting pending→confirmed, confirmed→shipping, shipping→delivered |
| Invalid: user cancel shipping | user attempts shipping→canceled (admin-only per spec) |

#### BVA Boundaries
| Boundary | 3-Point |
|----------|---------|
| Last user-cancellable state | confirmed (can cancel) vs shipping (cannot — spec boundary) |
| Last non-terminal state | shipping (can move to delivered) vs delivered (terminal) |
| Terminal state | canceled → any attempt must be rejected |

#### Steps

- [ ] **Step 5a** — Write `test-cases/FR10_OrderState/DomainTesting.md`
  - State machine diagram + variables + class table + test cases `DT-FR10-01…NN`

- [ ] **Step 5b** — Write `test-cases/FR10_OrderState/BVA.md`
  - Boundary table + BVA test cases `BVA-FR10-01…NN`

```bash
# COMMIT 5 — run manually after both design docs are written
git add tests/test-cases/FR10_OrderState/
git commit -m "test(fr10): domain testing + BVA — state machine variables, classes, boundaries, test cases design"
```

---

- [ ] **Step 6** — Execute DT + BVA via Playwright + screenshots
  - **DT:** Use admin UI at `localhost:5174` to drive status transitions; screenshot before/after each. Use user UI at `localhost:5173` for user-cancel cases → `test-runs/FR10_OrderState/DomainTesting.md`
  - **BVA:** Drive boundary transitions (confirmed vs shipping cancel, shipping vs delivered, terminal state) → `test-runs/FR10_OrderState/BVA.md`

```bash
# COMMIT 6 — run manually after all Playwright execution is done
git add tests/test-runs/FR10_OrderState/
git commit -m "test(fr10): Execution — domain testing + BVA with screenshots report"
```

---

- [ ] **Step 7** — Write `test-summary/FR10_OrderState.md`

```bash
# COMMIT 7 — run manually after test summary is written
git add tests/test-summary/FR10_OrderState.md
git commit -m "test(fr10): test summary"
```

---

- [ ] **Step 8** — Write `bug-reports/BUG-0N.md` per bug + post GitHub Issues

```bash
# COMMIT 8 — run manually after all bug reports are written
git add tests/bug-reports/
git commit -m "test(fr10): bug reports"
```

---

### PHASE 3 — FR-18: Admin Order Management (4 commits)

**Spec reference:** `README.md` §FR-18, §FR-12, §SEC-03, §SEC-04  
**SUT URL:** `http://localhost:5174` (admin panel)  
**APIs:** `GET /api/admin/orders`, `PUT /api/admin/orders/:id/status`

#### Variables (from spec only)
| Variable | Type | Spec Constraint |
|----------|------|----------------|
| `auth_token` | string | Must be valid JWT with `role=admin` (FR-12) |
| `target_status` | enum | Must follow FR-10 state machine |
| `shipping_address` display | string | Must render safe — no HTML (SEC-04) |

#### Domain Testing Classes
| Variable | Classes |
|----------|---------|
| `auth_token` | no token, regular user token, admin token |
| Order list | no orders, orders of all 5 statuses visible |
| Status update | valid transition, invalid transition, non-existent order |
| `shipping_address` rendering | plain text, HTML tag `<b>`, `<img onerror=...>` payload |

#### BVA Boundaries
| Boundary | 3-Point |
|----------|---------|
| Role boundary | no token → user token → admin token |
| State transitions | reuse FR-10 boundaries (admin drives all) |
| Safe vs unsafe content | plain char → `<` char → full tag |

#### Steps

- [ ] **Step 9a** — Write `test-cases/FR18_AdminOrder/DomainTesting.md`

- [ ] **Step 9b** — Write `test-cases/FR18_AdminOrder/BVA.md`

```bash
# COMMIT 9 — run manually after both design docs are written
git add tests/test-cases/FR18_AdminOrder/
git commit -m "test(fr18): domain testing + BVA — variables, auth/content classes, boundaries, test cases design"
```

---

- [ ] **Step 10** — Execute DT + BVA via Playwright + screenshots
  - **DT:** Auth tests (no token / user token / admin token) → screenshot responses. XSS test: create order with HTML payload in shipping address → screenshot admin rendering. State transition tests via admin UI → `test-runs/FR18_AdminOrder/DomainTesting.md`
  - **BVA:** Role boundary tests, safe-vs-unsafe content boundary → `test-runs/FR18_AdminOrder/BVA.md`

```bash
# COMMIT 10 — run manually after all Playwright execution is done
git add tests/test-runs/FR18_AdminOrder/
git commit -m "test(fr18): Execution — domain testing + BVA with screenshots report"
```

---

- [ ] **Step 11** — Write `test-summary/FR18_AdminOrder.md`

```bash
# COMMIT 11 — run manually after test summary is written
git add tests/test-summary/FR18_AdminOrder.md
git commit -m "test(fr18): test summary"
```

---

- [ ] **Step 12** — Write `bug-reports/BUG-0N.md` per bug + post GitHub Issues

```bash
# COMMIT 12 — run manually after all bug reports are written
git add tests/bug-reports/
git commit -m "test(fr18): bug reports"
```

---

### PHASE 4 — Mobile: Order History (4 commits)

**Spec reference:** `README.md` §FR-20, §FR-10  
**SUT URL:** Expo web `http://localhost:8081` (mobile web build)  
**APIs:** `GET /api/orders/my-orders`, `PUT /api/orders/:id/cancel`

#### Variables (from spec only)
| Variable | Type | Spec Constraint |
|----------|------|----------------|
| `order_status` | enum | All 5 statuses must display with Vietnamese labels |
| `cancel_eligibility` | derived | Only pending and confirmed may be cancelled (FR-10, FR-20) |

#### Domain Testing Classes
| Variable | Classes |
|----------|---------|
| Order display | 0 orders (empty state), 1 order per each of 5 statuses |
| Cancel button visibility | pending (must show), confirmed (must show), shipping/delivered/canceled (must not show) |
| Cancel action | cancel pending → expect success, cancel confirmed → expect success |
| Direct API cancel on shipping | attempt via API → spec says must reject for user |
| Status label accuracy | each status mapped to correct Vietnamese text |

#### BVA Boundaries
| Boundary | 3-Point |
|----------|---------|
| Last cancellable state | confirmed (cancellable) → shipping (non-cancellable per spec) |
| Empty state | 0 orders → 1 order |

#### Steps

- [ ] **Step 13a** — Write `test-cases/Mobile_OrderHistory/DomainTesting.md`

- [ ] **Step 13b** — Write `test-cases/Mobile_OrderHistory/BVA.md`

```bash
# COMMIT 13 — run manually after both design docs are written
git add tests/test-cases/Mobile_OrderHistory/
git commit -m "test(mobile): domain testing + BVA — order history variables, classes, boundaries, test cases design"
```

---

- [ ] **Step 14** — Execute DT + BVA via Playwright (Expo web) + screenshots
  - **DT:** Navigate Expo web; screenshot order list, cancel buttons per state, cancel actions → `test-runs/Mobile_OrderHistory/DomainTesting.md`
  - **BVA:** Drive confirmed→shipping boundary, 0→1 order boundary → `test-runs/Mobile_OrderHistory/BVA.md`

```bash
# COMMIT 14 — run manually after all Playwright execution is done
git add tests/test-runs/Mobile_OrderHistory/
git commit -m "test(mobile): Execution — domain testing + BVA with screenshots report"
```

---

- [ ] **Step 15** — Write `test-summary/Mobile_OrderHistory.md`

```bash
# COMMIT 15 — run manually after test summary is written
git add tests/test-summary/Mobile_OrderHistory.md
git commit -m "test(mobile): test summary"
```

---

- [ ] **Step 16** — Write `bug-reports/BUG-0N.md` per bug + post GitHub Issues

```bash
# COMMIT 16 — run manually after all bug reports are written
git add tests/bug-reports/
git commit -m "test(mobile): bug reports"
```

---

### PHASE 5 — Global Deliverables (2 commits)

- [ ] **Step 17** — Write `ai-audit/AI_Audit_Report.md`
  - Log every AI interaction: tool, date/time, prompt, AI output

```bash
# COMMIT 17 — run manually after AI audit report is written
git add tests/ai-audit/AI_Audit_Report.md
git commit -m "docs(hw02): AI audit report — all sessions logged"
```

---

- [ ] **Step 18** — Write `ai-audit/AI_Critique.md` (200–300 words) + finalize `tests/README.md`
  - README: self-assessment table + complete test summary across all 4 features

```bash
# COMMIT 18 — run manually after critique and README are written
git add tests/ai-audit/AI_Critique.md tests/README.md
git commit -m "docs(hw02): AI critique and final README with test summary"
```

---

## Commit Summary (18 commits + commit 0)

> ✅ = done · All git commands are run **manually by you**, not by Claude.

| # | Status | Commit | Artifacts |
|---|--------|--------|-----------|
| 0 | ✅ | `chore(hw02): scaffold test directory structure and README skeleton` | tests/** |
| 1 | ✅ | `test(fr02): domain testing + BVA — variables, classes, boundaries, test cases design` | test-cases/FR02_Login/DomainTesting.md + BVA.md |
| 2 | ⬜ | `test(fr02): Playwright execution — domain testing + BVA with screenshots` | test-runs/FR02_Login/DomainTesting.md + BVA.md + screenshots/ |
| 3 | ⬜ | `test(fr02): test summary` | test-summary/FR02_Login.md |
| 4 | ⬜ | `test(fr02): bug reports` | bug-reports/BUG-*.md |
| 5 | ⬜ | `test(fr10): domain testing + BVA — state machine variables, classes, boundaries, test cases design` | test-cases/FR10_OrderState/DomainTesting.md + BVA.md |
| 6 | ⬜ | `test(fr10): Playwright execution — domain testing + BVA with screenshots` | test-runs/FR10_OrderState/DomainTesting.md + BVA.md + screenshots/ |
| 7 | ⬜ | `test(fr10): test summary` | test-summary/FR10_OrderState.md |
| 8 | ⬜ | `test(fr10): bug reports` | bug-reports/BUG-*.md |
| 9 | ⬜ | `test(fr18): domain testing + BVA — variables, auth/content classes, boundaries, test cases design` | test-cases/FR18_AdminOrder/DomainTesting.md + BVA.md |
| 10 | ⬜ | `test(fr18): Playwright execution — domain testing + BVA with screenshots` | test-runs/FR18_AdminOrder/DomainTesting.md + BVA.md + screenshots/ |
| 11 | ⬜ | `test(fr18): test summary` | test-summary/FR18_AdminOrder.md |
| 12 | ⬜ | `test(fr18): bug reports` | bug-reports/BUG-*.md |
| 13 | ⬜ | `test(mobile): domain testing + BVA — order history variables, classes, boundaries, test cases design` | test-cases/Mobile_OrderHistory/DomainTesting.md + BVA.md |
| 14 | ⬜ | `test(mobile): Playwright execution — domain testing + BVA with screenshots` | test-runs/Mobile_OrderHistory/DomainTesting.md + BVA.md + screenshots/ |
| 15 | ⬜ | `test(mobile): test summary` | test-summary/Mobile_OrderHistory.md |
| 16 | ⬜ | `test(mobile): bug reports` | bug-reports/BUG-*.md |
| 17 | ⬜ | `docs(hw02): AI audit report — all sessions logged` | ai-audit/AI_Audit_Report.md |
| 18 | ⬜ | `docs(hw02): AI critique and final README with test summary` | ai-audit/AI_Critique.md, tests/README.md |

---

## Submission

Zip: `23127152_HW02_AI_DomainTesting_<grade>.zip`

Required:
- All MD files under `tests/`
- PDF exports of main report + AI audit
- GitHub Issues links for all bug reports
- Git commit log (text file)
- Agent Skills demo video (YouTube)
