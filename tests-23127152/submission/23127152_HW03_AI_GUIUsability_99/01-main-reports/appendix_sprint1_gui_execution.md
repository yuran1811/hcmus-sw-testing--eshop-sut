# Sprint 1 — GUI Checklist Execution (Login + Profile)

## 1. Thông tin lần chạy

| Trường | Giá trị |
|--------|---------|
| **Run ID** | RUN-23127152-SPRINT1 |
| **Ngày chạy** | 2026-08-01 |
| **Người thực thi** | Cursor Agent + Playwright Chromium (script `execute-task1.mjs`), giám sát SV 23127152 |
| **Loại test** | GUI Checklist execution |
| **Nhánh** | `hw3/23127152` |
| **Kết quả chung** | ❌ **Failed** — 22/65 item Failed; COM-01 đã đóng Passed ở Task 3 (Chrome↔Firefox) |

## 2. Phạm vi

- `checklist/login/checklist_login.md` — 33 item
- `checklist/profile/checklist_profile.md` — 32 item
- **Tổng designed:** 65 (> 40) · cover IA-01…IA-04 cả hai màn

## 3. Môi trường

| Trường | Giá trị |
|--------|---------|
| **Công cụ** | Playwright Chromium headless |
| **OS** | macOS (darwin) |
| **Frontend** | http://localhost:5173 |
| **Backend** | http://localhost:3000 |
| **Viewport** | 1440×900 · 768×1024 · 390×844 · 960×600 (zoom ~150%) |
| **Tài khoản** | `test@eshop.com` / `Test1234!` |

## 4. Kết quả tổng hợp

| Screen | Tổng | Passed | Failed | Not Run |
|--------|------|--------|--------|---------|
| Login | 33 | 19 | 14 | 0 |
| Profile | 32 | 24 | 8 | 0 |
| **Tổng** | **65** | **43** | **22** | **0** |

> Sprint 1 lúc đầu: 41 Passed + 2 COM Not Run. Sau Task 3: `LOGIN-COM-01` / `PROFILE-COM-01` = **Passed** → tổng Passed = **43**.

## 5. Bugs

| Bug ID | Severity | Checklist items (rút gọn) |
|--------|----------|---------------------------|
| BUG-LOGIN-001 | Major | VIS-02 |
| BUG-LOGIN-002 | Major | VIS-03, USB-01 |
| BUG-LOGIN-003 | Minor | VIS-04 |
| BUG-LOGIN-004 | Major | VAL-04, FDB-03 |
| BUG-LOGIN-005 | Critical | FUN-03 |
| BUG-LOGIN-006 | Major | FUN-04, FDB-02 |
| BUG-LOGIN-007 | Minor | NAV-04 |
| BUG-LOGIN-008 | Minor | NAV-05 |
| BUG-LOGIN-009 | Major | ACC-01 |
| BUG-LOGIN-010 | Minor | ACC-03 |
| BUG-LOGIN-011 | Minor | ACC-04 |
| BUG-PROFILE-001 | Major | NAV-02, USB-01 |
| BUG-PROFILE-003 | Minor | VAL-03 (placeholder vs regex) |
| BUG-PROFILE-004 | Major | USB-02 |
| BUG-PROFILE-005 | Major | FUN-03 |
| BUG-PROFILE-006 | Major | FUN-04 |
| BUG-PROFILE-007 | Minor | NAV-05 |
| BUG-PROFILE-008 | Major | FDB-03 (source / no confirm) |
| BUG-PROFILE-009 | Major | ACC-01 |
| BUG-PROFILE-010 | Critical | ACC-02 |

**P0 cần xử lý trước:** BUG-LOGIN-005 (password plaintext), BUG-PROFILE-010 (XSS header).

## 6. Follow-up sau Sprint 1

- `LOGIN-COM-01`, `PROFILE-COM-01` — **Done** ở Task 3 → `sprint-2-cross-browser-com.md`
- Excel checklist: `submission/checklist_and_test_summary.xlsx` (**Done**)
- GitHub Issues: **#137–#156** — `bug-reports/github-issues-created.md`

## 7. Bằng chứng

- Checklist đã điền: `checklist/login/`, `checklist/profile/`
- Screenshots: `bug-reports/screenshots/` (19+ ảnh)
- Script: `test-runs/execute-task1.mjs`
- Raw JSON: `test-runs/execution-results.json`
