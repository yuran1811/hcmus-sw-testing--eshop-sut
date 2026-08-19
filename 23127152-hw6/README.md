# HW06 — API Testing (23127152)

> Individual assignment · Bloom-AI G9.2–G9.5 · SUT: [EShop](https://github.com/ttbhanh/eshop-sut)

## API Selection

| Pool | Feature | Endpoint(s) | Auth / Role (spec) | Status |
|------|---------|-------------|--------------------|--------|
| **A** | FR-05 Product listing & search | `GET /api/products` (`?search=`) | None / None | ✅ Locked |
| **B** | FR-11 Order history + order detail | `GET /api/orders/my-orders`<br>`GET /api/orders/:id` | JWT (user) / None on `:id` | ✅ Locked |
| **C** | FR-15 Product management CRUD | `POST /api/products`<br>`PUT /api/products/:id`<br>`DELETE /api/products/:id` | JWT / admin | ✅ Locked |

> Xác nhận không trùng bộ 3 API với thành viên nhóm. Chi tiết Phase 0: [`PHASE0_PLANNING.md`](./PHASE0_PLANNING.md).

---

## Agent Skills (HW06)

Index: [`.agents/skills/README-HW06.md`](../.agents/skills/README-HW06.md)  
Orchestrator: `hw06-api-testing` · Report templates: restored from `hw5/23127152` (`ai-audit-report`, `bug-report`)

---

## Self-Assessment Table

| No. | Criteria | Max Grade | Self-Assessed Grade |
|-----|----------|-----------|---------------------|
| 1 | API 1 — full pipeline (generate + audit + extend + execute + bugs) | 30 | — |
| 2 | API 2 — full pipeline (same criteria) | 30 | — |
| 3 | API 3 — full pipeline (same criteria) | 30 | — |
| 4 | Agent Skills (AI-driven test generator) | 10 | — |
| | **Total** | **100** | **—** |

---

## Test Execution Summary

| API | TC Generated (AI) | TC Added (manual) | TC Executed | Passed | Failed | Bugs Found |
|-----|-------------------|-------------------|-------------|--------|--------|------------|
| API 1 — FR-05 Products | 40 | 6 | 20 req / 26 assert | 22 | 4 | 2 |
| API 2 — FR-11 Orders | 40 | 6 | 26 req / 35 assert | 30 | 5 | 1 |
| API 3 — FR-15 Product CRUD | 40 | 6 | 22 req / 25 assert | 13 | 12 | 3 |
| **Total** | **120** | **18** | **—** | **—** | **—** | **6** |

---

## Repository Structure

```
23127152-hw6/
├── README.md                          ← (this file)
├── CHECKLIST.md                       ← master checklist
├── PHASE0_PLANNING.md                 ← locked APIs + recon notes
├── 2026.HW06.API Testing_En.pdf       ← đề bài
├── report/
│   ├── 23127152_HW06_Report.md        ← main report (export PDF)
│   └── CI_CD_Report.md                ← CI/CD report
├── ai-audit/
│   ├── AI_Audit_Report.md             ← appendix (export PDF)
│   └── AI_Critique.md                 ← 200–300 words
├── test-cases/
│   ├── API1_PoolA/                    ← FR-05 GET /api/products
│   ├── API2_PoolB/                    ← FR-11 my-orders + order detail
│   └── API3_PoolC/                    ← FR-15 product CRUD
├── postman/
│   ├── EShop-HW06.postman_collection.json
│   ├── EShop-HW06.postman_environment.json
│   ├── data/                          ← data-driven CSV/JSON
│   ├── screenshots/                   ← pre-request script, Newman console
│   └── reports/
│       └── newman-report.html
├── cicd/
│   ├── screenshots/
│   │   ├── run-all-pass.png
│   │   └── run-one-fail.png
│   └── sample-commits.md              ← links 2 commits pass/fail
├── agent-skill/
│   ├── diagram.png                    ← self-drawn (NOT AI-generated)
│   ├── diagram.mmd                    ← optional Mermaid source
│   └── pseudocode.md
├── bug-reports/
│   ├── BUG-XX.md
│   └── github_issues_links.md
├── scripts/
│   └── run-newman.sh                  ← Newman runner script
└── git-commit-log.txt
```

---

## Postman Features Used

| Feature | Used | Notes |
|---------|------|-------|
| Workspaces | ☑ | Import collection + environment into local Postman workspace |
| Collections | ☑ | `EShop-HW06.postman_collection.json` (Setup, API1–3, Data-Driven) |
| Variables (collection / environment) | ☑ | `baseUrl`, `studentId`, `search`, tokens, `orderId*`, `productId` |
| Environments | ☑ | `EShop-HW06.postman_environment.json` |
| Pre-request scripts (`X-Student-Id`) | ☑ | Collection-level; evidence in `postman/screenshots/` |
| Tests / assertions | ☑ | All API folders + data-driven |
| Collection Runner + data file | ☑ | `postman/data/products-search-data.csv` → `newman-report-data-driven.html` |
| Examples / Mock seed | ☑ | Request examples + `postman/mock/fr05-list-example.json` |
| Monitors | ☐ | Requires Postman Cloud; scheduled runs deferred to Phase 5 CI/CD |

---

## GitHub Links

| Item | URL |
|------|-----|
| Public repository | TBD |
| Postman collection (in repo) | TBD |
| CI/CD workflow | TBD |
| GitHub Issues (bugs) | TBD |
| Agent Skill demo video (optional) | TBD |

---

## Submission

- **Filename:** `23127152_HW06_AI_API_<SelfAssessedGrade>.zip`
- **Platform:** Moodle
- **Deadline:** xem link trên Moodle
