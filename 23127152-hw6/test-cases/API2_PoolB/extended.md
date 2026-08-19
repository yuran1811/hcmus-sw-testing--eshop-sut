# API 2 — Pool B / FR-11: Extended Test Cases (Manual)

**Student ID:** 23127152  
**Feature:** FR-11  
**Added:** 2026-08-19  
**Minimum:** 5 · **Actual:** 6  
**Skill:** `api-test-extend`

---

## Coverage gaps addressed

- Explicit PII leak check (`shipping_address` of victim)
- Admin token reading arbitrary order (privilege confusion)
- my-orders with admin JWT (should still only see admin’s own orders if any)
- Response must not include other users when listing
- Detail without auth vs with owner token comparison

---

## Extended test cases

| TC ID | Category | Description | Input | Expected | Why AI missed | Taxonomy |
|-------|----------|-------------|-------|----------|---------------|----------|
| TC-B2-E01 | Security | Unauth detail of B must not include `shipping_address` of B | `GET /api/orders/OB` no auth | Deny **or** if 200 (bug), fail assert: body must not contain victim address string | AI said “no PII” without concrete field oracle | API_SPECIFIC |
| TC-B2-E02 | Security | User A token + detail OB → deny | Bearer A, GET OB | 403/404 | Horizontal IDOR with auth present | PROMPT |
| TC-B2-E03 | Security | Admin token must not freely read B’s order without ownership rule | Bearer admin, GET OB | 403/404 **or** documented admin-only path; not silent 200 on user detail API | Role confusion across endpoints | MODEL |
| TC-B2-E04 | Security | Compare: owner A can read OA; stranger cannot | GET OA with A vs GET OA no auth / with B | Owner OK; stranger denied | Needs dual-actor setup | API_SPECIFIC |
| TC-B2-E05 | Schema | 401 body is JSON not HTML | my-orders no auth | Content-Type JSON; has `error` | Error-channel consistency | PROMPT |
| TC-B2-E06 | Domain | my-orders after checkout increases count by 1 | count → checkout → count | count' = count+1 | Sequence oracle | PROMPT |

---

## Notes for Excel export

Source column: AI / Manual; link Bug IDs after Newman.
