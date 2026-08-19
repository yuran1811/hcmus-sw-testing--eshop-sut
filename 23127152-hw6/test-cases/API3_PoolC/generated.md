# API 3 — Pool C / FR-15: AI-Generated Test Cases

**APIs:**
- `POST /api/products` — Auth: Yes · Role: admin
- `PUT /api/products/:id` — Auth: Yes · Role: admin
- `DELETE /api/products/:id` — Auth: Yes · Role: admin

**Feature:** FR-15 Product management (CRUD)  
**Target:** ≥ 35 test cases

**Body (create/update):** `name`, `price`, `description`, `imageUrl`, `category_id`

---

## Test Cases

| TC ID | Category | Description | Input | Expected | Priority |
|-------|----------|-------------|-------|----------|----------|
| TC-C3-001 | Security | Non-admin token → denied | | 403 | High |
| TC-C3-002 | Domain | TBD | | | |

<!-- ≥ 35 rows. Cover SEC-02/SEC-03, domain on price/name, schema, missing id -->
