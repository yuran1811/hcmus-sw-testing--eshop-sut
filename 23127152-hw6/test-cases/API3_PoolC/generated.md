# API 3 — Pool C / FR-15: AI-Generated Test Cases

**Student ID:** 23127152  
**Feature:** FR-15 Product management (CRUD)  
**Endpoint(s):**
- `POST /api/products` — Auth: Yes · Role: admin (spec)
- `PUT /api/products/:id` — Auth: Yes · Role: admin (spec)
- `DELETE /api/products/:id` — Auth: Yes · Role: admin (spec)

**Body (create/update):** `name`, `price`, `description`, `imageUrl`, `category_id`  
**Generated:** 2026-08-19  
**AI tool:** Cursor (Cursor Grok 4.5) — stepwise A→B→C→D per `api-test-generate`  
**Target:** ≥ 35 · **Actual:** 40

---

## Generation steps

| Step | Technique | Prompt summary | Session |
|------|-----------|----------------|---------|
| A | Domain | Partitions for name/price/description/imageUrl/category_id + `:id` | Phase3-A |
| B | State | create → update → delete lifecycle | Phase3-B |
| C | Security | SEC-02 JWT, SEC-03 admin role, unauth/user token | Phase3-C |
| D | Schema | create `{message,id}`, update/delete messages, errors | Phase3-D |

---

## Test Cases

| TC ID | Category | Description | Preconditions | Input | Expected status | Expected assertions | SEC / FR | Priority |
|-------|----------|-------------|---------------|-------|-----------------|---------------------|----------|----------|
| TC-C3-001 | Domain | Create valid product (admin) | Admin JWT | POST full valid body | 200 | `{message,id}`; id number | FR-15 | High |
| TC-C3-002 | Domain | Create missing `name` | Admin | POST without name | 400 | Reject incomplete | FR-15 | High |
| TC-C3-003 | Domain | Create missing `price` | Admin | POST without price | 400 | Reject | FR-15 | High |
| TC-C3-004 | Domain | Create `price` = 0 | Admin | price:0 | 400 | price must be > 0 | FR-15 | High |
| TC-C3-005 | Domain | Create `price` negative | Admin | price:-1 | 400 | Reject | FR-15 | High |
| TC-C3-006 | Domain | Create `price` string `"abc"` | Admin | price:"abc" | 400 | Type reject | FR-15 | Medium |
| TC-C3-007 | Domain | Create empty name `""` | Admin | name:"" | 400 | Reject | FR-15 | Medium |
| TC-C3-008 | Domain | Create very long name (500 chars) | Admin | long name | 200/400 | No crash | FR-15 | Low |
| TC-C3-009 | Domain | Create Unicode name | Admin | name Vietnamese | 200 | Stored/retrievable | FR-15 | Medium |
| TC-C3-010 | Domain | Create invalid category_id | Admin | category_id:99999 | 400/200 | Document FK behavior | FR-15 | Medium |
| TC-C3-011 | Domain | Create missing imageUrl | Admin | omit imageUrl | 400/200 | Document requiredness | FR-15 | Low |
| TC-C3-012 | Domain | Update existing product | Admin + id | PUT full body | 200 | message updated | FR-15 | High |
| TC-C3-013 | Domain | Update non-existent id | Admin | PUT /api/products/999999 | 404 | Not found | FR-15 | High |
| TC-C3-014 | Domain | Update price to negative | Admin | PUT price:-5 | 400 | Reject | FR-15 | Medium |
| TC-C3-015 | Domain | Delete existing product | Admin + id | DELETE | 200 | message deleted; GET detail empty/404 | FR-15 | High |
| TC-C3-016 | Domain | Delete non-existent id | Admin | DELETE 999999 | 404 | Not found | FR-15 | Medium |
| TC-C3-017 | Domain | Delete id=`abc` | Admin | DELETE abc | 404 | Safe | FR-15 | Low |
| TC-C3-018 | Domain | PUT id=0 | Admin | PUT /0 | 404 | Not found | FR-15 | Low |
| TC-C3-019 | State | After create, GET list/search finds product | Admin | POST then GET ?search= | 200 | name appears | FR-15 | High |
| TC-C3-020 | State | After update, detail reflects new name | Admin | PUT then GET :id | 200 | new name | FR-15 | High |
| TC-C3-021 | State | After delete, product gone from list | Admin | DELETE then GET list | 200 | id absent | FR-15 | High |
| TC-C3-022 | State | Update then delete sequence | Admin | PUT → DELETE | 200 | delete succeeds | FR-15 | Medium |
| TC-C3-023 | State | Double delete same id | Admin | DELETE twice | 404 on 2nd | Idempotent fail | FR-15 | Medium |
| TC-C3-024 | Security | SEC-02: POST no Authorization | — | POST no auth | 401 | Unauthorized | SEC-02 | High |
| TC-C3-025 | Security | SEC-02: PUT no Authorization | — | PUT no auth | 401 | Unauthorized | SEC-02 | High |
| TC-C3-026 | Security | SEC-02: DELETE no Authorization | — | DELETE no auth | 401 | Unauthorized | SEC-02 | High |
| TC-C3-027 | Security | SEC-03: POST with **user** token | User JWT | POST | 403 | Forbidden (not admin) | SEC-03 | High |
| TC-C3-028 | Security | SEC-03: PUT with user token | User JWT | PUT | 403 | Forbidden | SEC-03 | High |
| TC-C3-029 | Security | SEC-03: DELETE with user token | User JWT | DELETE | 403 | Forbidden | SEC-03 | High |
| TC-C3-030 | Security | SEC-02: malformed Bearer on POST | — | Bearer junk | 403 | Forbidden | SEC-02 | Medium |
| TC-C3-031 | Security | SEC-03: admin token allowed POST | Admin | POST | 200 | Allowed | SEC-03 | High |
| TC-C3-032 | Schema | Create response has message+id | Admin | POST valid | 200 | keys message,id | FR-15 | High |
| TC-C3-033 | Schema | Update response message | Admin | PUT | 200 | `{message}` | FR-15 | Medium |
| TC-C3-034 | Schema | Delete response message | Admin | DELETE | 200 | `{message}` | FR-15 | Medium |
| TC-C3-035 | Schema | Content-Type JSON on create | Admin | POST | 200 | application/json | FR-15 | High |
| TC-C3-036 | Schema | 401/403 error JSON shape | — | POST no auth | 401 | `{error}` | SEC-02 | Medium |
| TC-C3-037 | Schema | id type number on create | Admin | POST | 200 | typeof id === number | FR-15 | High |
| TC-C3-038 | Robustness | POST empty body `{}` | Admin | {} | 400 | Reject | FR-15 | Medium |
| TC-C3-039 | Robustness | Extra unknown body fields ignored | Admin | + `role`/`admin` | 200 | No privilege side-effect | FR-15 | Medium |
| TC-C3-040 | Robustness | Wrong method GET on create semantics | — | GET already public list | 200 | N/A list; document | FR-15 | Low |

---

## Coverage matrix

| Category | Count |
|----------|-------|
| Domain | 18 |
| State | 5 |
| Security | 8 |
| Schema | 6 |
| Robustness | 3 |
| **Total** | **40** |
