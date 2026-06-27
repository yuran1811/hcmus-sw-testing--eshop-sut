# HW02 — Domain Testing & BVA Report

## Self-Assessment Table

| No. | Criteria | Max Grade | Self-Assessed Grade |
|-----|---------|-----------|---------------------|
| 1 | Feature A: FR-02 Login (Domain + BVA) | 25 | 22 |
| 2 | Feature B: FR-10 Order State Machine (Domain + BVA) | 25 | 23 |
| 3 | Feature C: FR-18 Admin Order Management (Domain + BVA) | 25 | 22 |
| 4 | Feature D: Mobile Order History (Domain + BVA) | 15 | 14 |
| 5 | Agent Skills | 10 | — |
| | **Total** | **100** | **81** |

---

## Test Execution Summary

### Test Results by Feature

| Feature | TC Designed | Executed | Passed | Failed | Bugs Found |
|---------|------------|----------|--------|--------|------------|
| FR-02 Login | 30 (15 DT + 15 BVA) | 11 (Playwright) | 7 | 4 | BUG-01, 02, 03, 04 |
| FR-10 Order State | 48 (27 DT + 21 BVA) | 20 (API+Playwright) | 17 | 3 | BUG-06, 07, 14 |
| FR-18 Admin Orders | 47 (27 DT + 20 BVA) | 19 (API+Playwright) | 13 | 6 | BUG-08, 09, 14 |
| Mobile Order History | 44 (24 DT + 20 BVA) | 18 (API+Playwright) | 15 | 3 | BUG-07/11, 13 |
| **Total** | **169** | **68** | **52** | **16** | **14 bugs** |

### Playwright Automated Tests (actual execution)

| Script | Feature | PASS | FAIL | Notes |
|--------|---------|------|------|-------|
| `fr02-login.spec.js` | FR-02 | 7 | 4 | BUG-01/02/03/04 confirmed |
| `fr10-fr18-orders.spec.js` | FR-10 | 17 | 3 | BUG-06/07/14 confirmed |
| `fr18-focused.spec.js` | FR-18 (UI) | 6 | 2 | BUG-08/09 confirmed |
| `fr18-admin-ui.spec.js` | FR-18 (API) | 7 | 3 | BUG-14 × 3 confirmed |
| `mobile-order-history.spec.js` | Mobile | 15 | 3 | BUG-07/11/13 confirmed |

---

## Bug Summary

| Bug ID | Feature | Severity | File:Line | Mô tả |
|--------|---------|---------|-----------|-------|
| BUG-01 | FR-02 | **Critical** | `server.js:54` | `login_attempts += 2` thay vì `+= 1` — lockout sớm |
| BUG-02 | FR-02 | Major | `server.js:57` | Lockout 180s thay vì 30s (spec) |
| BUG-03 | FR-02 | **Critical** | `Login.jsx:40` | Password `type="text"` — hiện plaintext |
| BUG-04 | FR-02 | Minor | `Login.jsx:30` | Email `type="text"` thay vì `type="email"` |
| BUG-05 | FR-02 | **Critical** | `server.js:46` | Mật khẩu so sánh plaintext (no hash) |
| BUG-06 | FR-10 | Major | `server.js:550` | `canceled → delivered` được phép (sai spec) |
| BUG-07 | FR-10 | Major | `server.js:329` | User cancel được đơn đang `shipping` |
| BUG-08 | FR-18 | **Critical** | `App.jsx:801` | XSS qua `dangerouslySetInnerHTML` — `<b>` rendered |
| BUG-09 | FR-18 | Major | `App.jsx:218` | Revenue `* 2` — dashboard hiện 400,000₫ thay vì 200,000₫ |
| BUG-10 | FR-18 | Minor | `server.js:510` | Không có filter/search/pagination admin |
| BUG-11 | Mobile | Major | `App.js:961` | UI ẩn cancel shipping nhưng backend cho phép |
| BUG-12 | Mobile | Minor | `App.js:893` | Không có filter/sort/pagination mobile |
| BUG-13 | Mobile | Minor | `App.js:16` | `API_URL` hardcoded IP `192.168.10.13` |
| BUG-14 | All | **Critical** | `server.js:100` | Tất cả `/api/admin/*` endpoints không check role — user thường có thể access |
| **Total** | | | | **14 bugs (4 Critical, 5 Major, 5 Minor)** |

### Bug Severity Distribution

| Severity | Count | Bugs |
|---------|-------|------|
| Critical | 4 | BUG-01, 03, 05, 08 *(+BUG-14 newly found)* |
| Major | 5 | BUG-02, 06, 07, 09, 11 |
| Minor | 5 | BUG-04, 10, 12, 13 |

---

## Key Findings

### BUG-01 — Lockout Increment Bug (Critical)
- **Expected**: `login_attempts += 1` per failed attempt
- **Actual**: `login_attempts += 2` → account locked after only **2** failed attempts instead of 3
- **Confirmed by**: Playwright screenshot `DT-FR02-10-locked-response.png`, DB query shows `attempts=4` after 2 wrong logins

### BUG-08 — XSS via dangerouslySetInnerHTML (Critical)
- **Evidence**: Order created with `shipping_address = '<b>XSS-Test-Bold</b>'`
- **Admin panel renders `<b>` as bold HTML** — confirmed by Playwright (`<b>` element count > 0)
- `<script>` tags don't execute directly (React DOM limitation) but `<img onerror=...>` would

### BUG-09 — Revenue Doubled (Major)
- **Expected**: 2 orders × 100,000₫ = 200,000₫
- **Actual dashboard**: **400,000 ₫** (confirmed in Playwright screenshot)
- Root cause: `App.jsx:218` — `return sum + o.total_amount * 2`

### BUG-14 — Missing Admin Role Check (Critical — New)
- Any authenticated user can call ALL `/api/admin/*` endpoints
- Confirmed: User token → `GET /api/admin/orders` returns **HTTP 200**
- OWASP Top 10 #1: Broken Access Control

---

## Report Structure

```
tests/HW02/
├── README.md                          ← (this file)
├── FR02_Login/
│   ├── DomainTesting.md               ← 15 TC Domain Testing
│   └── BVA.md                         ← 15 TC BVA
├── FR10_OrderState/
│   ├── DomainTesting.md               ← 27 TC Domain Testing
│   └── BVA.md                         ← 21 TC BVA
├── FR18_AdminOrder/
│   ├── DomainTesting.md               ← 27 TC Domain Testing
│   └── BVA.md                         ← 20 TC BVA
├── Mobile_OrderHistory/
│   ├── DomainTesting.md               ← 24 TC Domain Testing
│   └── BVA.md                         ← 20 TC BVA
├── bug-reports/
│   ├── BUG-01.md ... BUG-14.md        ← 14 bug reports
│   └── github_issues_links.md
├── playwright-tests/
│   ├── fr02-login.spec.js
│   ├── fr10-fr18-orders.spec.js
│   ├── fr18-admin-ui.spec.js
│   ├── fr18-focused.spec.js
│   ├── mobile-order-history.spec.js
│   ├── results-fr02.json
│   ├── results-mobile.json
│   └── screenshots/
│       ├── FR02/       ← 8 screenshots
│       ├── FR18/       ← 12 screenshots
│       └── Mobile/     ← 5 screenshots
└── ai-audit/
    ├── AI_Audit_Report.md
    └── AI_Critique.md
```

---

## GitHub Issues

> Cập nhật links sau khi tạo GitHub Issues với screenshots

| Bug ID | GitHub Issue | Status |
|--------|-------------|--------|
| BUG-01 | [#TBD] | Pending |
| BUG-02 | [#TBD] | Pending |
| BUG-03 | [#TBD] | Pending |
| BUG-04 | [#TBD] | Pending |
| BUG-05 | [#TBD] | Pending |
| BUG-06 | [#TBD] | Pending |
| BUG-07 | [#TBD] | Pending |
| BUG-08 | [#TBD] | Pending |
| BUG-09 | [#TBD] | Pending |
| BUG-10 | [#TBD] | Pending |
| BUG-11 | [#TBD] | Pending |
| BUG-12 | [#TBD] | Pending |
| BUG-13 | [#TBD] | Pending |
| BUG-14 | [#TBD] | Pending (new — missing role check) |

---

## Demo Videos

> Cập nhật YouTube links sau khi quay demo

| Content | Link |
|---------|------|
| FR-02 Domain Testing demo | TBD |
| FR-10 Order State Machine demo | TBD |
| FR-18 Admin Order Management demo | TBD |
| Mobile Order History demo | TBD |
