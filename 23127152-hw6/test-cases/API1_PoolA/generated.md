# API 1 — Pool A / FR-05: AI-Generated Test Cases

**API:** `GET /api/products`  
**Feature:** FR-05 Product listing & search  
**Auth:** None · **Role:** None  
**Target:** ≥ 35 test cases

**Query params:** `search` (optional) — filter by product name.

---

## Generation Log

| Step | Prompt summary | AI tool | Date |
|------|----------------|---------|------|
| 1 | Domain partitions for `search` | TBD | TBD |
| 2 | Security tests (SEC-05 SQLi, XSS in query) | TBD | TBD |
| 3 | Schema validation (array of products) | TBD | TBD |

---

## Test Cases

| TC ID | Category | Description | Input | Expected | Priority |
|-------|----------|-------------|-------|----------|----------|
| TC-A1-001 | Domain | TBD | | | |
| TC-A1-002 | Security | TBD | | | |

<!-- Thêm đủ ≥ 35 rows -->

---

## Coverage Matrix

| Category | Count | Target |
|----------|-------|--------|
| Domain partitions | — | ≥ 12 |
| Security (SEC, esp. SEC-05) | — | ≥ 10 |
| Schema validation | — | ≥ 8 |
| Edge / robustness | — | ≥ 5 |
| **Total** | **—** | **≥ 35** |
