# Test Summary Report

| Field | Value |
|---|---|
| **Document** | Test Summary Report — EShop SUT (Course Homeworks) |
| **Student** | Nguyễn Tuấn Anh — MSSV **23127152** |
| **Course** | Kiểm thử phần mềm (Software Testing) — HCMUS |
| **SUT** | EShop (`yuran1811/hcmus-sw-testing--eshop-sut`) |
| **Covered homeworks** | HW02 · HW03 · HW04 · HW05 |
| **Branches reviewed** | `hw2/23127152-ntanh` · `hw3/23127152` · `hw4/23127152` · `hw5/23127152` |
| **Report date** | 2026-08-17 |
| **Template** | [Software Testing Help — Test Summary Report](https://www.softwaretestinghelp.com/test-summary-report-template-download-sample/) |

---

## 1. Purpose of the Document

This document summarizes testing activities performed on the **EShop** system under test (SUT) across four course homeworks (HW02–HW05). It consolidates scope, execution metrics, defect status, environments/tools, lessons learned, recommendations, best practices, exit criteria, and a go-live recommendation for stakeholders (instructor / TA / project owner).

Daily or per-homework reports already exist on each branch; this report is the **merged** project-level Test Summary.

> **Note on HW01:** No personal homework-1 branch for MSSV 23127152 was found in this repository. Coverage starts from HW02 as listed in the request.

---

## 2. Application Overview

**EShop** is a multi-client e-commerce platform used as the course SUT. It integrates authentication, catalog/cart/checkout, order lifecycle, coupons, admin management, and mobile order history.

| Component | Stack | Default URL |
|---|---|---|
| Backend API | Node.js + Express + SQLite | `http://localhost:3000` |
| Storefront (Web) | React + Vite + Tailwind | `http://localhost:5173` |
| Admin UI | React + Vite + Tailwind | `http://localhost:5174` |
| Mobile | React Native + Expo | LAN IP of host |

**Default accounts (demo):** `admin@eshop.com` / `Admin123!` · `test@eshop.com` / `Test1234!`

**Modules exercised across homeworks:** Registration (smoke), Login & lockout (FR-02), Profile (FR-04), Order state machine (FR-10), Admin order management (FR-18), Coupons (FR-17), Users list (FR-19), Mobile order history (FR-20), UI/GUI & usability on Login/Profile, and admin API performance under concurrent load.

---

## 3. Testing Scope

### 3.1 In Scope

| Homework | Focus | In-scope items |
|---|---|---|
| **HW02** | Domain Testing + BVA (manual / AI-assisted design) | FR-02 Login & lockout; FR-10 Order state machine; FR-18 Admin orders; Mobile Order History |
| **HW03** | GUI checklist + Usability + Cross-browser | Login & Profile screens; flow U-01 (Login → Profile → update); Chrome & Firefox matrix |
| **HW04** | Automated E2E (Playwright) | FR-02, FR-10, FR-18 (data-driven) + FR-01 registration smoke; Chromium / Firefox / WebKit |
| **HW05** | Performance (JMeter) | One E2E admin workflow covering auth-heavy, read-heavy, transactional; Load · Stress · Spike · Soak |

### 3.2 Out of Scope

- Full regression of every FR in the SRS (only selected pools / screens / workflows per homework).
- Formal UAT with business stakeholders.
- Penetration testing beyond defects found via functional/security-oriented cases (IDOR, XSS).
- Cloud / production-scale performance SLAs (HW05 targets are laptop + SQLite demo constraints).
- Payment gateway / third-party email delivery (OTP shown on-screen in demo).

### 3.3 Items Not Tested / Limited

| Item | Reason |
|---|---|
| HW01 deliverables | No `hw1/23127152*` branch available to include |
| Third-party email OTP delivery | Demo mode surfaces OTP on UI; real SMTP not verified |
| Shopper browse/checkout performance path | HW05 intentionally used **admin order-management** E2E to avoid duplicate group workflows |
| Full mobile device farm | HW02 mobile cases + HW03 watermarked browser matrix; not a full device lab |
| Closing all historical defects | SUT is intentionally buggy for teaching; many defects remain **Open** by design |

---

## 4. Metrics

### 4.1 Test cases / checklist items — planned vs executed vs result

| Homework | Planned | Executed | Passed | Failed | Other | Pass rate |
|---|---:|---:|---:|---:|---:|---:|
| HW02 (DT + BVA) | 88 | 88 | 72 | 15 | 1 inconclusive | 81.8% |
| HW03 (GUI checklist) | 65 | 65 | 43 | 22 | — | 66.2% |
| HW04 (Playwright suites) | 45 | 45 | 38 | 7 | — | 84.4% |
| HW05 (perf scenarios) | 4 scenarios | 4 | See §4.3 | — | — | Capacity goals largely met* |
| **Total (functional-style items)** | **198** | **198** | **153** | **44** | **1** | **77.3%** |

\*HW05 Load transactional error% failed the ≤2% goal due to functional race (BUG-ORDER-001), not latency/capacity collapse.

**HW02 method split:** Domain Testing 54 TC (45 pass / 9 fail) · BVA 34 TC (27 pass / 6 fail / 1 inconclusive).

**HW03 usability (separate from checklist):** 7 participants (P01–P07); unassisted completion **2/7 (28.6%)**; SUS mean **63.2** / median **67.5**.

**HW04 browser coverage:** 3 browsers × 3 feature suites (+ smoke) → **12** HTML reports.

### 4.2 Defects — status & severity (by homework)

| Homework | Critical | Major | Medium/Minor | Total logged | Typical status |
|---|---:|---:|---:|---:|---|
| HW02 | 2 | 4 | 2 | **8** | Open (GitHub issues) |
| HW03 | 2 | 11 | 7 | **20** | Open (#137–#156) |
| HW04 | 3 | 3 | 1* | **~7** | Open / reconfirmed |
| HW05 | 0 | 1 | 0 | **1** | Open (#287) |
| **Union (approx.)** | | | | **~36 findings** | Many overlapping root causes across HW |

\*HW04 README lists BUG-10 (password validation, medium) among 7 findings; six primary markdown reports on branch include BUG-01, 06, 07, 08, 09, 14 (access control).

#### Defect status rollup (project view)

| Severity | Closed | Open | Total |
|---|---:|---:|---:|
| Critical | 0 | ~7+ (across HW, some duplicates) | Open |
| Major | 0 | Majority | Open |
| Minor / Cosmetic | 0 | Remainder | Open |
| **Overall** | **0 expected for teaching SUT** | **All tracked findings remain actionable** | — |

> Teaching SUT: exit is **not** “zero open bugs”, but “testing complete, defects documented, evidence attached”.

### 4.3 Defects distribution — module / feature wise (unique themes)

| Module / Feature | HW02 | HW03 | HW04 | HW05 | Theme |
|---|---:|---:|---:|---:|---|
| Login / Lockout (FR-02) | 4 | 11 | 1+ | 0 | Lock duration, password `type`, counter, GUI copy |
| Profile (FR-04) | 0 | 9 | 0 | 0 | Phone validation, save feedback, XSS header |
| Order state (FR-10) | 2 | 0 | 3 | 1 | Illegal transitions, cancel rules, concurrent PUT race |
| Admin orders (FR-18) | 2 | 0 | 3 | 0 | IDOR, XSS, revenue/concurrency |
| Registration (FR-01) | 0 | 0 | 1 | 0 | Password validation edge |
| Mobile order history | 0 new | — | — | — | HW02: 19/19 pass (backend cancel issue reflected) |
| Performance / capacity | — | — | — | 1 | Concurrent status update → HTTP 400 |

### 4.4 HW05 performance snapshot (HTTP samples)

| Scenario | Samples (n) | p95 | Error % | Notes |
|---|---:|---:|---:|---|
| Load 10 VU ~8.5 min | 668 | 5 ms | 10.63% | 71× PUT **400** race (not capacity) |
| Stress 10→50 VU | 2350 | 5 ms | 0.47% | Last stable step **50 VU**; fail step not reached |
| Spike peak 60 VU | 899 | 5 ms | 0.00% | Time-to-recovery ≈ 0 s |
| Soak 10 VU × 12 min | 927 | 5 ms | 0.00% | Node RSS ~170.8–173.6 MB (flat) |

---

## 5. Types of Testing Performed

### 5.1 Smoke / Build acceptance

- HW04: FR-01 registration smoke suite (3 cases) before/alongside main automation.
- HW05: dry-run 1 VU (6/6 PASS after Content-Type fix) before full Load/Stress/Spike/Soak.

### 5.2 Domain Testing & Boundary Value Analysis (HW02)

- Equivalence partitioning on FR-02 / FR-10 / FR-18 / Mobile.
- 3-point BVA on lockout thresholds, state edges, field lengths.
- Evidence: designed cases under `tests/test-cases/`, runs + screenshots under `tests/test-runs/`.

### 5.3 GUI / Visual / Checklist testing (HW03)

- 65 checklist items (IA-01…IA-04) on Login (33) and Profile (32).
- Categories: visual, responsive, component, validation, functional, navigation, feedback, usability, accessibility.

### 5.4 Usability evaluation (HW03)

- Goal-oriented scenario U-01; SUS + probes; 7 participants; findings F-01…F-05 (phone validation blocked most successes).

### 5.5 Cross-browser / cross-platform (HW03, HW04)

- HW03: Chrome & Firefox matrix with watermarked screenshots (`23127152@hcmus.edu.vn`).
- HW04: Chromium, Firefox, WebKit HTML reports with anti-cheat banner (`Run by: 23127152` + ISO timestamp).

### 5.6 System / functional automation (HW04)

- Playwright data-driven E2E; assertions on API status, UI visibility, form values, URL, response body.
- Human review fixed AI issues (context leaks, async races, SPA cart/nav state, stale admin data).

### 5.7 Performance testing (HW05)

- **Load**, **Stress** (stepping), **Spike**, **Soak** on one correlated 5-step admin workflow.
- Resource monitoring (Node/JMeter RSS) + hardware evidence for anti-cheat.

### 5.8 Security-oriented checks (embedded)

- IDOR on admin APIs, stored XSS via `shipping_address`, password field masking, broken access control — found mainly in HW02/HW04 and reconfirmed.

### 5.9 Regression aspects

- HW04 re-automated / reconfirmed several HW02 defects.
- HW05 Load exposed concurrent FR-10 race that functional single-user tests understated.

---

## 6. Test Environment & Tools

| Item | Detail |
|---|---|
| **Hostname** | `Spartans-MB-Pro---C2F3HXFHWV` |
| **OS** | macOS 26.5.2 (Darwin 25.5.0, arm64) |
| **CPU** | Apple M3 Pro |
| **SUT URLs** | API `:3000` · Web `:5173` · Admin `:5174` |
| **Database** | SQLite (`backend/database.sqlite`) |
| **Design / AI** | Claude Code / Cursor agent skills (per homework) |
| **HW02** | Manual execution + screenshots; Domain/BVA skills |
| **HW03** | Playwright Chromium helpers; Excel checklist; SUS survey |
| **HW04** | Playwright Test; JSON data files; multi-browser HTML reporter |
| **HW05** | Apache JMeter **5.6.3**, OpenJDK **21**, `analyze-jtl.py` |
| **Defect tracking** | GitHub Issues on `yuran1811/hcmus-sw-testing--eshop-sut` |
| **VCS** | Git branches listed in document header |

**HW05 pre-run control:** FR-02 lockout reset via SQLite before each scenario (not counted as capacity failure).

---

## 7. Lessons Learned

| # | Issue faced | Solution / takeaway |
|---|---|---|
| 1 | AI-generated JMeter Duration Assertions set to p95 targets → inflated error% | Raise sample duration ceilings; evaluate p95 offline from `.jtl` |
| 2 | Default seed: 1 admin / 0 orders → concurrent plans fail | Seed admins 02–20 + pending order pool; document in `seed-notes` |
| 3 | Coupon code collisions under loop | UUID + threadNum in JSR223 |
| 4 | Hardcoded order status ignored FR-10 | Correlate current status; map next legal transition |
| 5 | Missing `Content-Type: application/json` → login 500 then cascading 403 | Global Header Manager; catch in dry-run |
| 6 | Load PUT 400s looked like capacity failure | Separate **functional race** vs **capacity**; file BUG-ORDER-001; gate PUT with IfController |
| 7 | Playwright AI scripts leaked browser contexts / raced async refetch | `try/finally` close contexts; wait for second GET before assert |
| 8 | Usability: checklist pass rate ≠ task success | SUS + completion showed phone validation (F-01) blocked real users |
| 9 | Lockout / shared credentials distort multi-user results | Per-admin CSV + DB reset between scenarios |
| 10 | Same root bugs reappear across HW (XSS, IDOR, cancel rules) | Traceability matrix + reconfirmation in automation is valuable regression signal |

---

## 8. Recommendations

1. **Fix Critical security defects first** — password `type="text"`, stored XSS, broken admin authorization (IDOR) before any production-like demo.
2. **Harden FR-10 transitions** — enforce actor rules (user cannot cancel `shipping`); use atomic/optimistic updates on `PUT .../status` to return **409** instead of ambiguous **400** under concurrency.
3. **Align Profile phone validation with FR-04** — primary blocker in usability (5/7 sessions failed).
4. **Give defect-tool access** to the student/tester account so issue labels and attachments are not blocked by missing repo labels.
5. **Keep continuous performance smoke** (short JMeter or k6 job) on the admin workflow after FR-10 concurrency fix — see HW05 continuous-PT proposal.
6. **Do not treat teaching-SUT open bugs as release blockers for the course grade**; treat documentation + evidence completeness as the homework exit gate.

---

## 9. Best Practices

1. **One workflow, three load profiles (HW05)** — same samplers/CSV/assertions; only thread schedule differs → fair comparison.
2. **Data-driven automation (HW04)** — JSON cases, no hardcoded credentials/assertions in specs; multi-pattern asserts.
3. **Anti-cheat evidence** — watermarked screenshots (HW03); HTML report banner with student ID + ISO time (HW04); hostname/hardware + resource CSVs (HW05).
4. **Human review of AI output** — documented AI misses and fixes in each homework’s audit/critique.
5. **Traceability** — FR ↔ TC ↔ bug ↔ GitHub issue maintained (HW02 summaries, HW03 issues #137–#156, HW04 matrix, HW05 #287).
6. **Separate capacity errors from business errors** when analyzing performance `.jtl` files.
7. **Agent skills** reused across design → execute → bug report → AI audit for consistency.

---

## 10. Exit Criteria

| Criterion | Target | Met? |
|---|---|---|
| All in-scope test cases / checklist items executed | 100% of planned per homework | **Yes** (88/88, 65/65, 45/45, 4/4 scenarios) |
| Critical / Major / Medium defects logged with repro + evidence | All found defects documented | **Yes** |
| Critical defects closed in SUT | Prefer closed | **No** — teaching SUT leaves defects open by design |
| Performance: p95 within demo targets under Load/Stress/Spike/Soak | Auth/Read/Txn latency goals | **Yes** (p95 ≈ 4–6 ms) |
| Performance: transactional error% ≤ 2% under Load | ≤ 2% | **No** — failed due to BUG-ORDER-001 race (not saturation) |
| Usability: majority unassisted success on U-01 | Prefer ≥ majority | **No** — 2/7 unassisted |
| Deliverables (reports, AI audit/critique, git evidence) submitted | Per homework rubric | **Yes** on respective branches |

**Action plan for open defects:** Remain tracked on GitHub for the course SUT owner; student homework exit does **not** require code fixes unless a future homework asks for verification after patch.

---

## 11. Conclusion / Sign Off

Testing for **HW02–HW05** on EShop is **complete within the agreed academic scope**: design, execution, evidence, defect reporting, and AI audit artifacts are available on the listed branches.

**Go-Live recommendation for a real production release: Not recommended.**

Reasons:

- Multiple **Critical** security and authorization defects remain open (password exposure, XSS, IDOR / broken access control).
- Order state machine allows incorrect actor transitions and fails under concurrent admin updates.
- Usability evaluation shows the profile-update flow is not reliably completable.
- Performance capacity on this laptop is healthy, but **functional concurrency** already breaks transactional error SLAs at only 10 VU.

For **course homework sign-off**: the Testing team (student 23127152) confirms that exit criteria for *testing completion and documentation* are satisfied. Any decision to mark the SUT “fit for demo class use” should stay with the instructor, with the known defect list accepted.

**Sign-off**

| Role | Name | Decision | Date |
|---|---|---|---|
| Tester / Author | Nguyễn Tuấn Anh (23127152) | Testing complete — **No Go** for production | 2026-08-17 |
| Course / Client | HCMUS Software Testing | Pending instructor review | — |

---

## 12. Definitions, Acronyms, and Abbreviations

| Term | Meaning |
|---|---|
| **SUT** | System Under Test (EShop) |
| **FR** | Functional Requirement (from SRS) |
| **DT** | Domain Testing (Equivalence Partitioning) |
| **BVA** | Boundary Value Analysis |
| **TC** | Test Case |
| **GUI** | Graphical User Interface |
| **SUS** | System Usability Scale |
| **E2E** | End-to-End |
| **IDOR** | Insecure Direct Object Reference |
| **XSS** | Cross-Site Scripting |
| **VU** | Virtual User (JMeter thread) |
| **p95** | 95th percentile response time |
| **RPS** | Requests Per Second |
| **JWT** | JSON Web Token |
| **SLA** | Service Level Agreement / performance goal |
| **AI Audit** | Log of AI assistance + human critique (course requirement) |

---

## Appendix A — Source branches & key artifacts

| HW | Branch | Primary artifacts |
|---|---|---|
| HW02 | `hw2/23127152-ntanh` (also `ntanh/23127152-hw2`) | `tests/Final_Report.md`, `tests/Bug_Report.md`, `tests/README.md` |
| HW03 | `hw3/23127152` | `tests-23127152/README.md`, GUI & usability reports, Issues #137–#156 |
| HW04 | `hw4/23127152` | `23127152_HW04_AI_Automation_98/README.md`, Main Report, Playwright `e2e/` |
| HW05 | `hw5/23127152` | `23127152_HW05_AI_Performance_098/README.md`, Main/Analysis reports, JMeter plans/results, #287 |

## Appendix B — Aggregate execution chart (functional-style)

```
Planned/Executed: 198
Passed:           153  (77.3%)
Failed:            44  (22.2%)
Inconclusive:       1  (0.5%)
Defects logged:   ~36  (with cross-HW duplicates of root cause)
```

---

*Prepared following the Software Testing Help Test Summary Report structure (Purpose → Overview → Scope → Metrics → Types → Environment → Lessons → Recommendations → Best Practices → Exit Criteria → Sign Off → Definitions).*
