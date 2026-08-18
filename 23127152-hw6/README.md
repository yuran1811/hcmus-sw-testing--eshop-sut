# HW06 — API Testing (23127152)

> Individual assignment · Bloom-AI G9.2–G9.5 · SUT: [EShop](https://github.com/ttbhanh/eshop-sut)

## API Selection

| Pool | Feature | Endpoint(s) | Status |
|------|---------|-------------|--------|
| A | FR-02 Login & lockout | `POST /api/login` | ☐ Chọn & xác nhận không trùng nhóm |
| B | FR-10 Order state / FR-08 Checkout | `POST /api/checkout`, `PUT /api/orders/:id/cancel` | ☐ Chọn & xác nhận không trùng nhóm |
| C | FR-18 Admin order management | `PUT /api/admin/orders/:id/status` | ☐ Chọn & xác nhận không trùng nhóm |

> Cập nhật bảng trên sau khi chốt 3 API. Tham khảo `api_specification.md` và `CHECKLIST.md`.

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
| API 1 — Pool A | — (target ≥ 35) | — (target ≥ 5) | — | — | — | — |
| API 2 — Pool B | — (target ≥ 35) | — (target ≥ 5) | — | — | — | — |
| API 3 — Pool C | — (target ≥ 35) | — (target ≥ 5) | — | — | — | — |
| **Total** | **— (≥ 105)** | **— (≥ 15)** | **—** | **—** | **—** | **—** |

---

## Repository Structure

```
23127152-hw6/
├── README.md                          ← (this file)
├── CHECKLIST.md                       ← master checklist
├── 2026.HW06.API Testing_En.pdf       ← đề bài
├── report/
│   ├── 23127152_HW06_Report.md        ← main report (export PDF)
│   └── CI_CD_Report.md                ← CI/CD report
├── ai-audit/
│   ├── AI_Audit_Report.md             ← appendix (export PDF)
│   └── AI_Critique.md                 ← 200–300 words
├── test-cases/
│   ├── API1_PoolA/
│   │   ├── generated.md               ← AI-generated TCs
│   │   ├── audit.md                   ← VALID/INVALID/INCOMPLETE labels
│   │   ├── extended.md                ← ≥ 5 manual TCs + why AI missed
│   │   └── API1_PoolA.xlsx            ← Excel export
│   ├── API2_PoolB/
│   │   └── ...
│   └── API3_PoolC/
│       └── ...
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
| Workspaces | ☐ | |
| Collections | ☐ | |
| Variables (collection / environment) | ☐ | |
| Environments | ☐ | |
| Pre-request scripts (`X-Student-Id`) | ☐ | Screenshot required |
| Tests / assertions | ☐ | |
| Collection Runner + data file | ☐ | |
| Monitors | ☐ | |
| Mock servers | ☐ | |

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
