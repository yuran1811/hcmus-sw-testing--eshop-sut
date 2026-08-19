# API 3 — Pool C / FR-15: Extended Test Cases (Manual)

**Student ID:** 23127152  
**Feature:** FR-15  
**Added:** 2026-08-19  
**Minimum:** 5 · **Actual:** 6  
**Skill:** `api-test-extend`

---

## Coverage gaps addressed

- Prove unauthenticated mutate succeeds (implementation drift vs spec)
- User token vs admin on all three verbs with same payload
- Mass-assignment / no server-side role gate
- Create without Content-Type
- Verify deleted product detail endpoint behavior (`GET /api/products/:id` returns `{}` quirk)

---

## Extended test cases

| TC ID | Category | Description | Input | Expected | Why AI missed | Taxonomy |
|-------|----------|-------------|-------|----------|---------------|----------|
| TC-C3-E01 | Security | POST create **without** any Authorization succeeds today — must be 401 per spec | POST no auth valid body | 401 | Needs `server.js` insight: route has no `authenticateToken` | API_SPECIFIC |
| TC-C3-E02 | Security | User token POST must 403 not 200 | Bearer user | 403 | AI said 403 but didn’t emphasize success-as-bug oracle | IMPL_DRIFT |
| TC-C3-E03 | Security | Unauth DELETE of known id must 401 | DELETE no auth | 401 | Destructive unauth path | PROMPT |
| TC-C3-E04 | Security | Unauth PUT changes name — must 401 | PUT no auth | 401 | Same | PROMPT |
| TC-C3-E05 | State | After unauth create (if wrongly 200), product appears in public list — impact | POST noauth → GET list | Secure: no create; if created = Critical impact | Impact chain | API_SPECIFIC |
| TC-C3-E06 | Schema | DELETE then GET `/api/products/:id` should not look like success product | DELETE then GET :id | 404 or empty; document `{}` with 200 quirk | Detail endpoint quirk from source | API_SPECIFIC |

---
