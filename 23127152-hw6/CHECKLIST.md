# HW06 Master Checklist — 23127152

> Tick ☐ → ☑ khi hoàn thành. Mỗi bước pipeline nên có **1 git commit** riêng.

---

## Phase 0 — Setup & Planning (~1h)

- [ ] Đọc đề bài PDF và `api_specification.md`
- [ ] Chốt 3 API (1 Pool A + 1 Pool B + 1 Pool C), xác nhận không trùng nhóm
- [ ] Cập nhật bảng API Selection trong `README.md`
- [ ] Chạy SUT backend: `http://localhost:3000`
- [ ] Cài Postman + Newman (`npm install -g newman newman-reporter-htmlextra`)
- [ ] Tạo Postman workspace + environment (base URL, tokens, student ID)

---

## Phase 1 — API 1: Pool A (~2.5h)

### 1.1 Generate with AI (≥ 35 TC)
- [ ] Log AI Audit: tool, datetime, prompt, output
- [ ] Domain partitions — mọi parameter (email, password, …)
- [ ] State transitions (nếu API liên quan)
- [ ] Security SEC-01–SEC-07 (SQLi, IDOR, role, …)
- [ ] Schema validation — response khớp spec
- [ ] Lưu vào `test-cases/API1_PoolA/generated.md`
- [ ] **Git commit:** `hw06/api1-generate-test-cases`

### 1.2 Audit (human review)
- [ ] Gắn nhãn VALID / INVALID / INCOMPLETE + lý do cho từng TC
- [ ] Sửa TC sai/thiếu
- [ ] Lưu vào `test-cases/API1_PoolA/audit.md`
- [ ] **Git commit:** `hw06/api1-audit-test-cases`

### 1.3 Extend (≥ 5 TC manual)
- [ ] Thêm TC AI bỏ sót (ưu tiên security + state transition)
- [ ] Giải thích vì sao AI miss
- [ ] Lưu vào `test-cases/API1_PoolA/extended.md`
- [ ] Export Excel → `test-cases/API1_PoolA/API1_PoolA.xlsx`
- [ ] **Git commit:** `hw06/api1-extend-test-cases`

### 1.4 Execute (Postman + Newman)
- [ ] Implement requests trong Postman collection
- [ ] Pre-request script: `X-Student-Id: 23127152` trên mọi request
- [ ] Chụp screenshot pre-request script console
- [ ] Chạy Newman → HTML report
- [ ] **Git commit:** `hw06/api1-execute-postman-newman`

### 1.5 Report bugs
- [ ] Ghi bug vào `bug-reports/BUG-XX.md`
- [ ] Tạo GitHub Issue + screenshot
- [ ] Cập nhật `bug-reports/github_issues_links.md`

---

## Phase 2 — API 2: Pool B (~2.5h)

- [ ] **Generate** ≥ 35 TC → `test-cases/API2_PoolB/generated.md` → commit
- [ ] **Audit** VALID/INVALID/INCOMPLETE → `audit.md` → commit
- [ ] **Extend** ≥ 5 TC → `extended.md` + `.xlsx` → commit
- [ ] **Execute** Postman + Newman → commit
- [ ] **Report bugs** → GitHub Issues

---

## Phase 3 — API 3: Pool C (~2.5h)

- [ ] **Generate** ≥ 35 TC → `test-cases/API3_PoolC/generated.md` → commit
- [ ] **Audit** VALID/INVALID/INCOMPLETE → `audit.md` → commit
- [ ] **Extend** ≥ 5 TC → `extended.md` + `.xlsx` → commit
- [ ] **Execute** Postman + Newman → commit
- [ ] **Report bugs** → GitHub Issues

---

## Phase 4 — Postman & Newman (~1h)

- [ ] Export collection → `postman/EShop-HW06.postman_collection.json`
- [ ] Export environment → `postman/EShop-HW06.postman_environment.json`
- [ ] Data-driven runs: CSV/JSON trong `postman/data/`
- [ ] Newman HTML report → `postman/reports/newman-report.html`
- [ ] Screenshot pre-request + Newman output → `postman/screenshots/`
- [ ] Liệt kê Postman features đã dùng trong `README.md`
- [ ] **Git commit:** `hw06/postman-collection-final`

---

## Phase 5 — CI/CD Integration (~1.5h)

- [ ] Tạo GitHub Actions workflow (Newman trong pipeline)
- [ ] Commit 1: pipeline **all pass** → screenshot + link
- [ ] Commit 2: cố ý fail 1 TC → screenshot + link
- [ ] Viết `report/CI_CD_Report.md` (config + 2 runs)
- [ ] Screenshot → `cicd/screenshots/`
- [ ] Links → `cicd/sample-commits.md`
- [ ] **Git commit:** `hw06/cicd-github-actions`

---

## Phase 6 — Agent Skill (G9.5 Create) (~1h)

- [ ] Thiết kế AI-driven API test generator
- [ ] Vẽ diagram **tự thiết kế** (không AI-generate) → `agent-skill/diagram.png`
- [ ] Viết pseudocode → `agent-skill/pseudocode.md`
- [ ] (Optional) Implement Agent Skill + video YouTube demo
- [ ] **Git commit:** `hw06/agent-skill-design`

---

## Phase 7 — Documentation & Submission (~1.5h)

### Reports
- [ ] Main report → `report/23127152_HW06_Report.md` (+ export PDF)
- [ ] AI Audit Report → `ai-audit/AI_Audit_Report.md` (+ export PDF)
- [ ] AI Critique 200–300 words → `ai-audit/AI_Critique.md`

### Git & README
- [ ] Export git commit log → `git-commit-log.txt`
- [ ] Cập nhật Test Execution Summary trong `README.md`
- [ ] Cập nhật Self-Assessment Table

### Zip submission
- [ ] Main report (MD + PDF)
- [ ] Link GitHub repo public
- [ ] Postman collection (.json) + Newman report (HTML)
- [ ] CI/CD report + screenshots
- [ ] Excel test cases (×3) + test summary
- [ ] Agent Skill diagram + pseudocode
- [ ] Bug reports + GitHub Issues screenshots
- [ ] AI Critique + AI Audit Report (MD + PDF)
- [ ] Git commit log (text)
- [ ] README.md (self-assessment + summary)
- [ ] Đặt tên: `23127152_HW06_AI_API_<grade>.zip`
- [ ] Nộp Moodle

---

## Anti-AI-Cheat Verification

- [ ] Screenshot `X-Student-Id: 23127152` từ pre-request script (thật, không fabricate)
- [ ] Newman output hostname khớp deployment (`localhost:3000` OK)
- [ ] Diagram Agent Skill do bạn tự thiết kế
- [ ] Mọi AI interaction đã log trong AI Audit Report

---

## Coverage Checklist (per API)

Mỗi API phải có TC cover:

| Category | Examples | API1 | API2 | API3 |
|----------|----------|------|------|------|
| Domain partitions | email format, password rules, price > 0, quantity ≥ 1 | ☐ | ☐ | ☐ |
| State transitions | pending→confirmed→shipping→delivered, cancel rules | ☐ | ☐ | ☐ |
| SEC-01 Password hashing | Plaintext password in DB/response | ☐ | ☐ | ☐ |
| SEC-02 JWT required | Missing/expired/invalid token → 401 | ☐ | ☐ | ☐ |
| SEC-03 Admin role check | User token on admin endpoint → 403 | ☐ | ☐ | ☐ |
| SEC-05 SQL injection | `' OR 1=1 --` in input fields | ☐ | ☐ | ☐ |
| SEC-06 Role escalation | Client tries to change `role` via profile | ☐ | ☐ | ☐ |
| SEC-07 OTP rules | Expired/reused/weak OTP | ☐ | ☐ | ☐ |
| Schema validation | Response fields, types, status codes | ☐ | ☐ | ☐ |
| Manual extension | ≥ 5 TC AI missed + explanation | ☐ | ☐ | ☐ |
