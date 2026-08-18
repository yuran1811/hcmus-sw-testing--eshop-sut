# API 3 — Pool C: AI-Generated Test Cases

**API:** TBD (e.g. `PUT /api/admin/orders/:id/status`)  
**Feature:** TBD (e.g. FR-18 Admin order management)  
**Target:** ≥ 35 test cases

---

## Test Cases

| TC ID | Category | Description | Input | Expected | Priority |
|-------|----------|-------------|-------|----------|----------|
| TC-C3-001 | Security | Non-admin token → 403 | | 403 | High |
| TC-C3-002 | State | pending → confirmed | | 200 | High |
| ... | | | | | |

<!-- Thêm đủ ≥ 35 rows. Ưu tiên SEC-03 role check + state machine -->
