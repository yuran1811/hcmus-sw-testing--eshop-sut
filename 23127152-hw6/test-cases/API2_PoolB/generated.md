# API 2 — Pool B / FR-11: AI-Generated Test Cases

**Student ID:** 23127152  
**Feature:** FR-11 Order history (user) + order detail  
**Endpoint(s):**
- `GET /api/orders/my-orders` — Auth: JWT · Role: user
- `GET /api/orders/:id` — Auth: None (per HW06 selection) · Role: None

**Generated:** 2026-08-19  
**AI tool:** Cursor (Cursor Grok 4.5) — stepwise A→B→C→D per `api-test-generate`  
**Target:** ≥ 35 · **Actual:** 40

---

## Generation steps

| Step | Technique | Prompt summary | Audit session ref |
|------|-----------|----------------|-------------------|
| A | Domain partitions | Path `:id`, empty history, filters N/A | Session Phase2-A |
| B | State | Order status values visible on detail/list; no transition API here | Session Phase2-B |
| C | Security | SEC-02 on my-orders; IDOR/privacy on `:id` | Session Phase2-C |
| D | Schema | Order object fields, array vs object, errors | Session Phase2-D |

---

## Test Cases

| TC ID | Category | Description | Preconditions | Input | Expected status | Expected body / assertions | SEC / FR | Priority |
|-------|----------|-------------|---------------|-------|-----------------|----------------------------|----------|----------|
| TC-B2-001 | Domain | my-orders with valid user JWT | User A has ≥1 order | `GET /api/orders/my-orders` + Bearer A | 200 | JSON array; all `user_id` = A | FR-11 | High |
| TC-B2-002 | Domain | my-orders empty history | New user no orders | Bearer new user | 200 | `[]` | FR-11 | High |
| TC-B2-003 | Domain | Detail existing id | Order id=OA exists | `GET /api/orders/OA` | 200 | Object with matching `id` | FR-11 | High |
| TC-B2-004 | Domain | Detail non-existent id | — | `GET /api/orders/999999` | 404 | `{error}` not found | FR-11 | High |
| TC-B2-005 | Domain | Detail id=0 | — | `GET /api/orders/0` | 404 | Not found | FR-11 | Medium |
| TC-B2-006 | Domain | Detail negative id | — | `GET /api/orders/-1` | 404 | Not found | FR-11 | Medium |
| TC-B2-007 | Domain | Detail non-numeric id | — | `GET /api/orders/abc` | 404 | Not found / safe | FR-11 | Medium |
| TC-B2-008 | Domain | Detail very large id | — | `GET /api/orders/9999999999` | 404 | Not found | FR-11 | Low |
| TC-B2-009 | Domain | my-orders ordered by id DESC | User A ≥2 orders | Bearer A | 200 | `id[0] ≥ id[1]` if length≥2 | FR-11 | Medium |
| TC-B2-010 | Domain | Detail returns shipping_address field | Order exists | `GET /api/orders/OA` | 200 | Has `shipping_address` | FR-11 | Medium |
| TC-B2-011 | Domain | Detail status is known enum | Order pending | `GET /api/orders/OA` | 200 | status ∈ pending/confirmed/shipping/delivered/canceled | FR-11 | Medium |
| TC-B2-012 | Domain | my-orders ignores unknown query | User A | `GET /api/orders/my-orders?foo=1` + Bearer | 200 | Array (same as without foo) | FR-11 | Low |
| TC-B2-013 | Domain | Detail with trailing slash if routed | — | `GET /api/orders/OA/` | 200/404 | Document Express behavior | FR-11 | Low |
| TC-B2-014 | Domain | my-orders only own orders | A and B both have orders | Bearer A | 200 | No order with `user_id`=B | FR-11 | High |
| TC-B2-015 | State | List shows status `pending` after checkout | Fresh checkout | Bearer A my-orders | 200 | New order status=`pending` | FR-11 | High |
| TC-B2-016 | State | Detail reflects same status as list | Known OA | my-orders then detail OA | 200 | status equal in both | FR-11 | High |
| TC-B2-017 | State | Status values readable for confirmed | Order confirmed (if seeded) | detail | 200 | status string | FR-11 | Low |
| TC-B2-018 | State | Canceled order still visible in history | Order canceled | my-orders | 200 | canceled order appears (history) | FR-11 | Medium |
| TC-B2-019 | State | Delivered order visible in history | Order delivered | my-orders | 200 | delivered present | FR-11 | Low |
| TC-B2-020 | State | Idempotent my-orders GET | User A | GET twice | 200 | Same length | FR-11 | Medium |
| TC-B2-021 | Security | SEC-02: my-orders no token | — | GET my-orders no Auth | 401 | Unauthorized | SEC-02 | High |
| TC-B2-022 | Security | SEC-02: my-orders malformed Bearer | — | `Bearer not-a-jwt` | 403 | Forbidden | SEC-02 | High |
| TC-B2-023 | Security | SEC-02: my-orders empty Bearer | — | `Authorization: Bearer ` | 401/403 | Denied | SEC-02 | Medium |
| TC-B2-024 | Security | SEC-02: my-orders missing Bearer scheme | — | `Authorization: <token>` | 401 | Denied | SEC-02 | Medium |
| TC-B2-025 | Security | IDOR: unauthenticated read of user B order | Order OB of B | `GET /api/orders/OB` no auth | 401/403/404 | Must **not** return B’s PII (shipping_address) | FR-11 / IDOR | High |
| TC-B2-026 | Security | IDOR: user A reads user B order with A token | OA, OB | Bearer A + `GET /api/orders/OB` | 403/404 | Must not return B’s order | FR-11 / IDOR | High |
| TC-B2-027 | Security | IDOR: enumerate id=1..N without auth | Orders exist | GET /api/orders/1 no auth | 401/403/404 | No cross-user leak | FR-11 / IDOR | High |
| TC-B2-028 | Security | my-orders token of A cannot list B | — | Bearer A | 200 | Only A’s ids | FR-11 | High |
| TC-B2-029 | Security | Expired/invalid signature token on my-orders | Tampered JWT | Bearer tampered | 403 | Forbidden | SEC-02 | Medium |
| TC-B2-030 | Security | SQLi-like `:id` | — | `GET /api/orders/1%20OR%201=1` | 404 | No dump / no 500 HTML | SEC-05 | Medium |
| TC-B2-031 | Schema | my-orders Content-Type JSON | Bearer A | GET my-orders | 200 | application/json | FR-11 | High |
| TC-B2-032 | Schema | my-orders root is array | Bearer A | GET | 200 | Array.isArray | FR-11 | High |
| TC-B2-033 | Schema | Order item fields on list | Bearer A has order | GET | 200 | id,user_id,total_amount,status,shipping_address | FR-11 | High |
| TC-B2-034 | Schema | Detail root is object | OA | GET detail | 200 | object not array | FR-11 | High |
| TC-B2-035 | Schema | Detail field types | OA | GET | 200 | id number, status string, total_amount number | FR-11 | High |
| TC-B2-036 | Schema | 404 error JSON shape | — | GET /api/orders/999999 | 404 | `{error: string}` | FR-11 | Medium |
| TC-B2-037 | Schema | 401 my-orders error JSON | — | no auth | 401 | `{error: string}` | SEC-02 | Medium |
| TC-B2-038 | Schema | Empty history still `[]` not null | New user | Bearer | 200 | `[]` | FR-11 | High |
| TC-B2-039 | Robustness | Wrong method POST my-orders | Bearer | POST my-orders | 404/405 | Not allowed as list | FR-11 | Low |
| TC-B2-040 | Robustness | PUT on detail id | — | PUT /api/orders/OA | 404/405 | Detail is read-only here | FR-11 | Low |

---

## Coverage matrix

| Category | Count |
|----------|-------|
| Domain | 14 |
| State | 6 |
| Security | 10 |
| Schema | 8 |
| Robustness | 2 |
| **Total** | **40** |
