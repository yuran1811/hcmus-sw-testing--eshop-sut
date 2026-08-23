# HW06 — API Testing (23127152)

> Individual assignment · Bloom-AI G9.2–G9.5 · SUT: [EShop](https://github.com/ttbhanh/eshop-sut)  
> **Sinh viên:** Nguyễn Tuấn Anh · **Máy:** `Spartans-MB-Pro---C2F3HXFHWV`

## API Selection

| Pool | Feature | Endpoint(s) | Auth / Role (spec) | Status |
|------|---------|-------------|--------------------|--------|
| **A** | FR-05 Product listing & search | `GET /api/products` (`?search=`) | None / None | ✅ Locked |
| **B** | FR-11 Order history + order detail | `GET /api/orders/my-orders`<br>`GET /api/orders/:id` | JWT (user) / None on `:id` | ✅ Locked |
| **C** | FR-15 Product management CRUD | `POST /api/products`<br>`PUT /api/products/:id`<br>`DELETE /api/products/:id` | JWT / admin | ✅ Locked |

> Xác nhận không trùng bộ 3 API với thành viên nhóm. Chi tiết Phase 0: [`PHASE0_PLANNING.md`](./PHASE0_PLANNING.md).

---

## Self-Assessment Table

| No. | Criteria | Max Grade | Self-Assessed Grade |
|-----|----------|-----------|---------------------|
| 1 | API 1 — full pipeline (generate + audit + extend + execute + bugs) | 30 | 29 |
| 2 | API 2 — full pipeline (same criteria) | 30 | 29 |
| 3 | API 3 — full pipeline (same criteria) | 30 | 29 |
| 4 | Agent Skills (AI-driven test generator) | 10 | 9 |
| | **Total** | **100** | **96** |

**Rationale:** Ba pipeline đủ artifact (40+6 TC × 3, Excel, Newman, 6 Issues #300–#305). Trừ nhẹ vì một số screenshot/anti-cheat phụ thuộc thao tác GUI thủ công; Agent Skill có diagram + pseudocode + repo skills, chưa có video demo (optional).

**Zip name:** `23127152_HW06_AI_API_096.zip`

---

## Test Execution Summary

| API | TC Generated (AI) | TC Added (manual) | TC Executed | Passed | Failed | Bugs Found |
|-----|-------------------|-------------------|-------------|--------|--------|------------|
| API 1 — FR-05 Products | 40 | 6 | 20 req / 26 assert | 22 | 4 | 2 (#300–#301) |
| API 2 — FR-11 Orders | 40 | 6 | 26 req / 35 assert | 30 | 5 | 1 (#302) |
| API 3 — FR-15 Product CRUD | 40 | 6 | 22 req / 25 assert | 13 | 12 | 3 (#303–#305) |
| **Total** | **120** | **18** | **68 req / 86 assert** | **65** | **21** | **6** |

> Failed assertions = **expected secure/spec behavior vs buggy SUT** (documented as bugs), không phải lỗi collection.

**Data-driven (Phase 4):** 8/8 pass · **CI Smoke:** green sample + intentional red sample.

---

## Reports & Evidence

| Deliverable | Path |
|-------------|------|
| Main report | [`report/23127152_HW06_Report.md`](./report/23127152_HW06_Report.md) |
| CI/CD report | [`report/CI_CD_Report.md`](./report/CI_CD_Report.md) |
| AI Audit | [`ai-audit/AI_Audit_Report.md`](./ai-audit/AI_Audit_Report.md) |
| AI Critique (268 words) | [`ai-audit/AI_Critique.md`](./ai-audit/AI_Critique.md) |
| Postman pre-request | [`postman/screenshots/postman-prerequest.png`](./postman/screenshots/postman-prerequest.png) |
| Postman console `X-Student-Id` | [`postman/screenshots/postman-console-x-student-id.png`](./postman/screenshots/postman-console-x-student-id.png) |
| Newman CLI | [`postman/screenshots/newman-cli.png`](./postman/screenshots/newman-cli.png) |
| CI pass / fail | [`cicd/screenshots/run-all-pass.png`](./cicd/screenshots/run-all-pass.png) · [`run-one-fail.png`](./cicd/screenshots/run-one-fail.png) |
| Agent Skill diagram | [`agent-skill/diagram.png`](./agent-skill/diagram.png) |
| Bug Issues index | [`bug-reports/github_issues_links.md`](./bug-reports/github_issues_links.md) |

---

## Agent Skills (HW06)

Index: [`.agents/skills/README-HW06.md`](../.agents/skills/README-HW06.md)  
Orchestrator: `hw06-api-testing` · G9.5 design: [`agent-skill/`](./agent-skill/)

---

## Repository Structure

```
23127152-hw6/
├── README.md
├── CHECKLIST.md
├── PHASE0_PLANNING.md
├── report/23127152_HW06_Report.md · CI_CD_Report.md
├── ai-audit/AI_Audit_Report.md · AI_Critique.md
├── test-cases/API{1,2,3}_*/
├── postman/ (collection, env, data, reports, screenshots)
├── cicd/screenshots/ · sample-commits.md
├── agent-skill/diagram.png · pseudocode.md
├── bug-reports/ (+ GitHub Issues #300–#305)
├── scripts/run-newman.sh
└── git-commit-log.txt
```

---

## Postman Features Used

| Feature | Used | Notes |
|---------|------|-------|
| Workspaces | ☑ | Local Postman workspace |
| Collections | ☑ | `EShop-HW06.postman_collection.json` |
| Variables (collection / environment) | ☑ | `baseUrl`, `studentId`, tokens, ids |
| Environments | ☑ | `EShop-HW06.postman_environment.json` |
| Pre-request scripts (`X-Student-Id`) | ☑ | Collection-level; PNG evidence |
| Tests / assertions | ☑ | API1–3 + data-driven + CI Smoke |
| Collection Runner + data file | ☑ | `products-search-data.csv` (8/8) |
| Examples / Mock seed | ☑ | `postman/mock/fr05-list-example.json` |
| Monitors | ☐ | Replaced by GitHub Actions Phase 5 |

---

## GitHub Links

| Item | URL |
|------|-----|
| Public repository (branch) | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw6/23127152 |
| Postman collection | `23127152-hw6/postman/EShop-HW06.postman_collection.json` |
| CI/CD workflow | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/workflows/hw06-api-tests.yml |
| Pass run | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32269053058 |
| Fail run | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32269286455 |
| GitHub Issues (bugs) | [#300](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/300)–[#305](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/305) (Anhnguyenk835) |
| Agent Skill demo video | N/A (optional) |

---

## Submission

- **Filename:** `23127152_HW06_AI_API_096.zip`
- **Platform:** Moodle
- **Deadline:** xem Moodle
