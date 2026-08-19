# Phase 0 — Setup & Planning Notes

**Student ID:** 23127152  
**Date:** 2026-08-19  
**Status:** ✅ Complete

---

## 1. Locked API Selection

| Pool | Feature | Endpoints | Auth (spec) | Role (spec) |
|------|---------|-----------|-------------|-------------|
| **A** | FR-05 Product listing & search | `GET /api/products` (`?search=`) | None | None |
| **B** | FR-11 Order history + order detail | `GET /api/orders/my-orders`<br>`GET /api/orders/:id` | my-orders: JWT<br>`:id`: **None (per user note)** | user / none |
| **C** | FR-15 Product management CRUD | `POST /api/products`<br>`PUT /api/products/:id`<br>`DELETE /api/products/:id` | Yes | admin |

> Xác nhận không trùng bộ 3 API với thành viên nhóm trước khi nộp.

---

## 2. Spec vs Implementation (quick recon)

Đã đọc `api_specification.md` + `backend/server.js`.

| Endpoint | Spec expectation | Implementation note (for later testing) |
|----------|------------------|-----------------------------------------|
| `GET /api/products` | Public list + search | Search dùng string concat: `LIKE '%${searchQuery}%'` → candidate **SEC-05 SQLi** |
| `GET /api/orders/my-orders` | JWT required | Có `authenticateToken` ✅ |
| `GET /api/orders/:id` | User note: no auth | **Không** có `authenticateToken` → candidate **IDOR** |
| `POST/PUT/DELETE /api/products` | Admin + JWT | **Không** có auth/role middleware → candidate **SEC-02 / SEC-03** |

Admin seed (từ `backend/database.js`):

- Email: `admin@eshop.com`
- Password: `Admin123!`
- Role: `admin`

Base URL: `http://localhost:3000`

---

## 3. Tools Ready

| Tool | Status | Notes |
|------|--------|-------|
| API spec | ✅ | `api_specification.md` |
| Postman collection skeleton | ✅ | `postman/EShop-HW06.postman_collection.json` — folders FR-05 / FR-11 / FR-15 |
| Postman environment | ✅ | `studentId=23127152`, `baseUrl`, tokens, admin creds |
| Pre-request `X-Student-Id` | ✅ | Collection-level script |
| Newman + htmlextra | ✅ | Newman 6.2.2 · htmlextra 1.23.1 |
| Backend SUT | ✅ | Smoke-tested 2026-08-19 on `localhost:3000` |

### Smoke test results (2026-08-19)

| Check | Result |
|-------|--------|
| `GET /api/products` | 200 — returns product array |
| `GET /api/products?search=…` | 200 |
| Admin login `admin@eshop.com` / `Admin123!` | 200 — JWT issued (**response includes plaintext password**) |
| Register + login test user | 200 |
| `GET /api/orders/my-orders` + Bearer | 200 — `[]` |
| `GET /api/orders/1` (no auth) | 404 — no seed order yet (endpoint reachable without JWT) |

---

## 4. Test Focus Preview (for Phase 1–3)

### API1 — FR-05 `GET /api/products`
- Domain: empty search, normal keyword, Unicode, long string, special chars, missing param
- Security: SQL injection via `search` (SEC-05)
- Schema: array of products; fields `id`, `name`, `price`, …

### API2 — FR-11 orders
- `my-orders`: missing/invalid/expired token; empty history; schema
- `orders/:id`: valid id, missing id, non-existent id, **IDOR** (user A reads user B’s order)
- Schema validation for order object + status enum

### API3 — FR-15 product CRUD
- Domain partitions: name, price (>0), description, imageUrl, category_id
- Auth: no token / user token / admin token (SEC-02, SEC-03)
- Schema: create returns `{ message, id }`; update/delete messages
- Negative: missing fields, negative price, non-existent id

---

## 5. Environment Variables (Postman)

| Variable | Value |
|----------|-------|
| `baseUrl` | `http://localhost:3000` |
| `studentId` | `23127152` |
| `adminEmail` | `admin@eshop.com` |
| `adminPassword` | `Admin123!` |
| `testEmail` | `hw06-23127152@example.com` |
| `userToken` / `adminToken` | set by Setup folder requests |

---

## 6. How to run SUT (quick)

```bash
cd backend && pnpm install && pnpm dev
# → http://localhost:3000
```

Smoke checks:

```bash
curl -s "$baseUrl/api/products" | head
curl -s -X POST "$baseUrl/api/login" \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@eshop.com","password":"Admin123!"}'
```

---

## 7. Phase 0 Exit Criteria

- [x] Đề bài + API spec đã đọc
- [x] 3 API đã chốt (FR-05 / FR-11 / FR-15)
- [x] README + checklist + report stubs cập nhật
- [x] Postman env + collection folders sẵn sàng
- [x] Newman installed
- [x] Backend reachable on `localhost:3000`
- [x] Planning notes written (this file)

**Next:** Phase 1 — Generate ≥ 35 TCs for FR-05 `GET /api/products`.
