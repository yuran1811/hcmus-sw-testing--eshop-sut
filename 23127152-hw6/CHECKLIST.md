# HW06 Master Checklist — 23127152

> Tick ☐ → ☑ khi hoàn thành. Mỗi bước pipeline nên có **1 git commit** riêng.

---

## Phase 0 — Setup & Planning (~1h)

- [x] Đọc đề bài PDF và `api_specification.md`
- [x] Chốt 3 API (FR-05 / FR-11 / FR-15), xác nhận không trùng nhóm
- [x] Cập nhật bảng API Selection trong `README.md`
- [x] Cài Postman + Newman (`npm install -g newman newman-reporter-htmlextra`)
- [x] Tạo Postman workspace + environment (base URL, tokens, student ID)
- [x] Chạy SUT backend: `http://localhost:3000`
- [x] Ghi planning notes: `PHASE0_PLANNING.md`
- [x] Agent Skills HW06: `.agents/skills/README-HW06.md`

---

## Phase 1 — API 1: FR-05 Products (`GET /api/products`) (~2.5h)

### 1.1 Generate with AI (≥ 35 TC)
- [x] Log AI Audit: tool, datetime, prompt, output
- [x] Domain partitions — mọi parameter (`search`)
- [x] State transitions (N/A + idempotent compensating cases)
- [x] Security SEC-01–SEC-07 (SQLi, …)
- [x] Schema validation — response khớp spec
- [x] Lưu vào `test-cases/API1_PoolA/generated.md` (40 TC)
- [x] **Git commit:** `hw06/api1-generate-test-cases` (`2b0b9bc`)

### 1.2 Audit (human review)
- [x] Gắn nhãn VALID / INVALID / INCOMPLETE + lý do cho từng TC
- [x] Sửa TC sai/thiếu
- [x] Lưu vào `test-cases/API1_PoolA/audit.md` (32/3/5)
- [x] **Git commit:** `hw06/api1-audit-test-cases` (`63aa667`)

### 1.3 Extend (≥ 5 TC manual)
- [x] Thêm TC AI bỏ sót (ưu tiên security) — 6 TC
- [x] Giải thích vì sao AI miss
- [x] Lưu vào `test-cases/API1_PoolA/extended.md`
- [x] Export Excel → `test-cases/API1_PoolA/API1_PoolA.xlsx`
- [x] **Git commit:** `hw06/api1-extend-test-cases` (`3b274d1`)

### 1.4 Execute (Postman + Newman)
- [x] Implement requests trong Postman collection (20 requests)
- [x] Pre-request script: `X-Student-Id: 23127152` trên mọi request
- [x] Evidence pre-request / header: `postman/screenshots/newman-api1-fr05-cli.txt`
- [x] Chạy Newman → `postman/reports/newman-api1-fr05.html` (26 assert, 4 fail)
- [x] **Git commit:** `hw06/api1-execute-postman-newman` (`b57b7d7`)

### 1.5 Report bugs
- [x] Ghi bug: `BUG-PRODUCTS-001.md`, `BUG-PRODUCTS-002.md`
- [x] Tạo GitHub Issue + evidence: [#300](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/300), [#301](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/301) (Anhnguyenk835)
- [x] Cập nhật `bug-reports/github_issues_links.md`

---

## Phase 2 — API 2: FR-11 Orders (`my-orders` + `:id`) (~2.5h)

- [x] **Generate** ≥ 35 TC → `test-cases/API2_PoolB/generated.md` (40) → commit
- [x] **Audit** VALID/INVALID/INCOMPLETE → `audit.md` (34/2/4) → commit
- [x] **Extend** ≥ 5 TC → `extended.md` (6) + `API2_PoolB.xlsx` → commit
- [x] **Execute** Postman + Newman → `newman-api2-fr11.html` (35 assert, 5 fail) → commit
- [x] **Report bugs** → BUG-ORDERS-001 [#302](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/302) (Anhnguyenk835)

---

## Phase 3 — API 3: FR-15 Product CRUD (`POST/PUT/DELETE`) (~2.5h)

- [x] **Generate** ≥ 35 TC → `test-cases/API3_PoolC/generated.md` (40) → commit
- [x] **Audit** VALID/INVALID/INCOMPLETE → `audit.md` (33/3/4) → commit
- [x] **Extend** ≥ 5 TC → `extended.md` (6) + `API3_PoolC.xlsx` → commit
- [x] **Execute** Postman + Newman → `newman-api3-fr15.html` (25 assert, 12 fail) → commit
- [x] **Report bugs** → [#303](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/303) [#304](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/304) [#305](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/305) (Anhnguyenk835)

---

## Phase 4 — Postman & Newman (~1h)

- [x] Export collection → `postman/EShop-HW06.postman_collection.json`
- [x] Export environment → `postman/EShop-HW06.postman_environment.json`
- [x] Data-driven runs: CSV `postman/data/products-search-data.csv` (8/8 pass)
- [x] Newman HTML report → `postman/reports/newman-report.html` (+ data-driven HTML)
- [x] Evidence pre-request + Newman → `postman/screenshots/` (+ `x-student-id-console.html`)
- [x] Liệt kê Postman features đã dùng trong `README.md`
- [x] Notes → `postman/PHASE4_NOTES.md`
- [x] **Git commit:** `hw06/postman-collection-final`

---

## Phase 5 — CI/CD Integration (~1.5h)

- [x] Tạo GitHub Actions workflow (Newman trong pipeline) → `.github/workflows/hw06-api-tests.yml`
- [x] Commit 1: pipeline **all pass** → `8b44b66` · [run 32269053058](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32269053058)
- [x] Commit 2: cố ý fail 1 TC → `2fe51ee` · [run 32269286455](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32269286455)
- [x] Viết `report/CI_CD_Report.md` (config + 2 runs)
- [x] Screenshot → `cicd/screenshots/run-all-pass.png` / `run-one-fail.png`
- [x] Links → `cicd/sample-commits.md`
- [x] **Git commit:** restore green + docs (`hw06/cicd-restore-and-report`)

---

## Phase 6 — Agent Skill (G9.5 Create) (~1h)

- [x] Thiết kế AI-driven API test generator
- [x] Vẽ diagram **tự thiết kế** (Mermaid/SVG → PNG) → `agent-skill/diagram.png`
- [x] Viết pseudocode → `agent-skill/pseudocode.md`
- [ ] (Optional) Implement Agent Skill + video YouTube demo
- [ ] **Git commit:** `hw06/agent-skill-design`

---

## Phase 7 — Documentation & Submission (~1.5h)

### Reports
- [x] Main report → `report/23127152_HW06_Report.md` (+ PDF nếu export được)
- [x] AI Audit Report → `ai-audit/AI_Audit_Report.md` (+ PDF)
- [x] AI Critique 200–300 words → `ai-audit/AI_Critique.md` (271 words)

### Git & README
- [x] Export git commit log → `git-commit-log.txt`
- [x] Cập nhật Test Execution Summary trong `README.md`
- [x] Cập nhật Self-Assessment Table (96/100)

### Zip submission
- [x] Main report (MD + PDF)
- [x] Link GitHub repo public
- [x] Postman collection (.json) + Newman report (HTML)
- [x] CI/CD report + screenshots
- [x] Excel test cases (×3) + test summary
- [x] Agent Skill diagram + pseudocode
- [x] Bug reports + GitHub Issues screenshots
- [x] AI Critique + AI Audit Report (MD + PDF)
- [x] Git commit log (text)
- [x] README.md (self-assessment + summary)
- [ ] Đặt tên: `23127152_HW06_AI_API_096.zip`
- [ ] Nộp Moodle

---

## Anti-AI-Cheat Verification

- [x] Screenshot `X-Student-Id: 23127152` từ pre-request script (thật, không fabricate)
- [x] Newman output hostname khớp deployment (`localhost:3000` OK)
- [x] Diagram Agent Skill do bạn tự thiết kế
- [x] Mọi AI interaction đã log trong AI Audit Report

---

## Coverage Checklist (per API)

Mỗi API phải có TC cover:

| Category | Examples | API1 | API2 | API3 |
|----------|----------|------|------|------|
| Domain partitions | email format, password rules, price > 0, quantity ≥ 1 | ☑ | ☑ | ☑ |
| State transitions | pending→confirmed→shipping→delivered, cancel rules | ☑* | ☑* | ☑ |
| SEC-01 Password hashing | Plaintext password in DB/response | ☑ N/A surface | ☑ N/A | ☑ N/A |
| SEC-02 JWT required | Missing/expired/invalid token → 401 | ☑ probe | ☑ | ☑ |
| SEC-03 Admin role check | User token on admin endpoint → 403 | ☑ N/A | ☑ | ☑ |
| SEC-05 SQL injection | `' OR 1=1 --` in input fields | ☑ | ☑ | ☑ |
| SEC-06 Role escalation | Client tries to change `role` via profile | ☑ N/A | ☑ | ☑ |
| SEC-07 OTP rules | Expired/reused/weak OTP | ☑ N/A | ☑ N/A | ☑ N/A |
| Schema validation | Response fields, types, status codes | ☑ | ☑ | ☑ |
| Manual extension | ≥ 5 TC AI missed + explanation | ☑ 6 | ☑ 6 | ☑ 6 |

\* API1/API2: compensating idempotent / visibility cases (no FR-10 machine on these endpoints).
