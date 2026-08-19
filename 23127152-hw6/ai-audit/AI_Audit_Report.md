# AI Audit Report — HW06

**Student ID:** 23127152  
**Declaration:** I use AI tools for the following tasks.

**Công cụ AI:** Cursor (Cursor Grok 4.5)  
**Skill đã dùng:** `hw06-api-testing`, `api-test-generate`, `api-test-audit`, `api-test-extend`, `api-test-execute`, `bug-report`, `ai-audit-report`  
**Quy tắc audit:** mỗi tương tác AI được ghi **ngay sau** khi xảy ra.  
**Bắt đầu audit:** 2026-08-19

---

## Tools Declared

| Tool | Version / Model | Purpose |
|------|-----------------|---------|
| Cursor | Cursor Grok 4.5 | Generate / audit assist / Postman suite / bugs |
| Postman + Newman | Newman 6.2.2 · htmlextra | Execute API tests |

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 1.1 Step A Domain

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:38 +07

**Prompt:**
> Using skill `api-test-generate` Step A only: for FR-05 `GET /api/products` optional query `search`, generate domain partition test cases (valid/invalid/boundary/charset/encoding). Spec excerpt from `api_specification.md` §3.1. Output rows for `generated.md` template. Do not generate security or schema yet.

**AI Output:**
> See `23127152-hw6/test-cases/API1_PoolA/generated.md` rows TC-A1-001…016 (and robustness 017–018 drafted with domain misuse) — AI-assisted generation under Step A, then merged into final file.

**Human review:** Kept partitions; clarified empty `search=` expectation as “document actual”.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 1.1 Step B State

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:38 +07

**Prompt:**
> Step B only: state transitions for `GET /api/products`. If N/A for read-only list, say so and propose compensating idempotent-read cases instead of inventing a fake state machine.

**AI Output:**
> N/A for FR-10-style machine. Compensating cases TC-A1-019, TC-A1-020 (idempotent GET / search does not mutate). Recorded in `generated.md`.

**Human review:** Accepted N/A + two compensating cases.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 1.1 Step C Security

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:39 +07

**Prompt:**
> Step C only: map SEC-01…07 to concrete HTTP tests for public `GET /api/products`. Emphasize SEC-05 SQLi on `search`. Include payloads and expected secure behavior (parameterized query), not implementation bugs as expected.

**AI Output:**
> TC-A1-021…030 in `generated.md` (SQLi variants, public auth probes, LIKE `%`).

**Human review:** Expected results written against SEC-05 (no dump / no HTML 500), not against current buggy SUT.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 1.1 Step D Schema

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:39 +07

**Prompt:**
> Step D only: schema validation cases for list/search responses — Content-Type, array root, required fields/types, empty array, error must not be raw HTML.

**AI Output:**
> TC-A1-031…040 in `generated.md`.

**Human review:** Accepted; total 40 ≥ 35.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 1.2 Audit

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:40 +07

**Prompt:**
> Using skill `api-test-audit`: label every TC in `API1_PoolA/generated.md` VALID/INVALID/INCOMPLETE with reasoning and corrections. Human owns final labels. Spec-first; do not treat buggy implementation as expected for SEC-05.

**AI Output:**
> See `23127152-hw6/test-cases/API1_PoolA/audit.md` — draft labels assisted by AI, confirmed by human (32 VALID / 3 INVALID / 5 INCOMPLETE).

**Human review:** Adjusted TC-A1-017 rewrite to DELETE without id; pinned empty-search behavior.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 1.3 Extend

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:41 +07

**Prompt:**
> Using skill `api-test-extend`: propose gaps AI missed for FR-05 after audit, focus security/encoding. I will keep ≥5 human-chosen rows only.

**AI Output:**
> Candidate gaps (encoding, Content-Type on error, row-count oracle, sequenced DROP). Human selected TC-A1-E01…E06 in `extended.md`.

**Human review:** Kept 6 extended TCs with taxonomy codes.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 1.4 Execute

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:40 +07

**Prompt:**
> Using skill `api-test-execute`: implement FR-05 Postman folder with assertions mapped to audited/extended TCs, ensure `X-Student-Id: 23127152`, run Newman + htmlextra against localhost:3000.

**AI Output:**
> Artifacts:
> - `postman/EShop-HW06.postman_collection.json` (20 FR-05 requests)
> - `postman/reports/newman-api1-fr05.html`
> - `postman/screenshots/newman-api1-fr05-cli.txt` (includes `X-Student-Id=23127152`)
> - `test-cases/API1_PoolA/execution-notes.md`
>
> Result: 20 requests, 26 assertions, **4 failed** (SEC-05 bugs).

**Human review:** Failures accepted as genuine SEC-05 defects → bug reports.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 1.5 Bugs

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:42 +07

**Prompt:**
> Using skill `bug-report` + HW5 template: file BUG-PRODUCTS-001 (SQLi dump) and BUG-PRODUCTS-002 (HTML 500) with evidence; open GitHub Issues.

**AI Output:**
> Local MD: `bug-reports/BUG-PRODUCTS-001.md`, `BUG-PRODUCTS-002.md`  
> Issues: https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/294 · https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/295

**Human review:** Confirmed evidence paths and issue links.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 2.1 Generate FR-11

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:47 +07

**Prompt:**
> Using `api-test-generate` Steps A–D separately for FR-11: `GET /api/orders/my-orders` (JWT) and `GET /api/orders/:id` (no auth per selection). Cover domain, compensating state (status visibility), SEC-02 + IDOR, schema. ≥35 TCs → `API2_PoolB/generated.md`.

**AI Output:**
> See `23127152-hw6/test-cases/API2_PoolB/generated.md` (40 TCs TC-B2-001…040).

**Human review:** Kept; IDOR expected = deny despite public detail surface.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 2.2 Audit

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:48 +07

**Prompt:**
> Using `api-test-audit`: label all FR-11 generated TCs VALID/INVALID/INCOMPLETE; human owns labels.

**AI Output:**
> `API2_PoolB/audit.md` — 34 VALID / 2 INVALID / 4 INCOMPLETE.

**Human review:** Confirmed.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 2.3 Extend

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:48 +07

**Prompt:**
> Using `api-test-extend`: gaps for FR-11 IDOR/PII; human selects ≥5.

**AI Output:**
> Candidates; human kept TC-B2-E01…E06 in `extended.md`.

**Human review:** Accepted 6 extended TCs.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 2.4–2.5 Execute + Bugs

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:50 +07

**Prompt:**
> Using `api-test-execute` + `bug-report`: implement FR-11 Postman folder (setup A/B orders + assertions), Newman run, file IDOR bug + GitHub Issue.

**AI Output:**
> - `postman/reports/newman-api2-fr11.html` — 26 requests, 35 assertions, 5 failed (all IDOR)
> - `bug-reports/BUG-ORDERS-001.md`
> - Issue: https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/296

**Human review:** Confirmed PII leak `Addr B Secret` in unauth response.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 3.1–3.3 Generate/Audit/Extend FR-15

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:52 +07

**Prompt:**
> Using `api-test-generate` A–D then `api-test-audit` then `api-test-extend` for FR-15 POST/PUT/DELETE `/api/products` (admin). Spec requires JWT+admin; emphasize SEC-02/SEC-03.

**AI Output:**
> - `API3_PoolC/generated.md` (40 TCs)
> - `audit.md` (33 VALID / 3 INVALID / 4 INCOMPLETE)
> - `extended.md` (TC-C3-E01…E06)

**Human review:** Security expected = 401/403 per spec, not current unauthenticated success.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 3.4–3.5 Execute + Bugs

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 21:54 +07

**Prompt:**
> Using `api-test-execute` + `bug-report`: Newman FR-15 suite; file SEC-02/03 + validation + DELETE semantics bugs and GitHub Issues.

**AI Output:**
> - `newman-api3-fr15.html` — 22 req, 25 assertions, 12 failed
> - Issues: #297 (auth), #298 (validation), #299 (DELETE 200 on missing)

**Human review:** Confirmed unauth create returns 200 with new id.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 4 Postman/Newman final

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 22:04 +07

**Prompt:**
> Using `api-test-execute`: finalize Phase 4 — data-driven CSV run, consolidated `newman-report.html`, header evidence, list Postman features, update scripts/run-newman.sh.

**AI Output:**
> - Data-driven: 8 iterations, 32 assertions, 0 failed → `newman-report-data-driven.html`
> - Full collection → `newman-report.html` (failures = known Phase1–3 bugs)
> - `postman/PHASE4_NOTES.md`, mock example, README feature table updated

**Human review:** Accepted; Monitors deferred to CI/CD Phase 5.

---

### Session — Cursor (Grok 4.5) — 2026-08-19 — Phase 5 CI/CD

**AI Tool:** Cursor (Cursor Grok 4.5)  
**Date/Time:** 2026-08-19 22:16 +07

**Prompt:**
> Using `api-test-cicd`: add GitHub Actions Newman workflow, CI Smoke folder, push pass + intentional fail sample runs, document with screenshots/links.

**AI Output:**
> - Workflow: `.github/workflows/hw06-api-tests.yml`
> - Pass: commit `8b44b66` → Actions run 32269053058 (success)
> - Fail: commit `2fe51ee` → Actions run 32269286455 (failure, CI-01 expect 201)
> - Reports: `report/CI_CD_Report.md`, `cicd/sample-commits.md`, screenshots

**Human review:** Confirmed live Actions conclusions; restored `ciExpectStatus=200`.
