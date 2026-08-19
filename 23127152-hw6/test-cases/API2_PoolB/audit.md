# API 2 — Pool B / FR-11: Audit Results

**Student ID:** 23127152  
**Source:** `generated.md` (40 TCs)  
**Auditor:** 23127152 (human)  
**Date:** 2026-08-19  
**Skill:** `api-test-audit`

---

## Summary

| Label | Count | Action |
|-------|-------|--------|
| VALID | 34 | Kept |
| INVALID | 2 | Corrected |
| INCOMPLETE | 4 | Completed |
| **Total** | **40** | |

---

## Detailed audit

| TC ID | Label | Reasoning | Correction |
|-------|-------|-----------|------------|
| TC-B2-001 | VALID | Spec + auth required | — |
| TC-B2-002 | VALID | Empty history OK | — |
| TC-B2-003 | VALID | Detail by id | — |
| TC-B2-004 | VALID | 404 not found | — |
| TC-B2-005 | VALID | id=0 | — |
| TC-B2-006 | VALID | negative id | — |
| TC-B2-007 | VALID | non-numeric | — |
| TC-B2-008 | VALID | huge id | — |
| TC-B2-009 | INCOMPLETE | Needs ≥2 orders precondition | **Pin:** seed 2 checkouts for A before assert DESC |
| TC-B2-010 | VALID | shipping_address field | — |
| TC-B2-011 | VALID | status enum | — |
| TC-B2-012 | VALID | extra query | — |
| TC-B2-013 | INCOMPLETE | trailing slash unspecified | **Pin:** assert status ∈ {200,301,404}; no 500 |
| TC-B2-014 | VALID | ownership on list | — |
| TC-B2-015 | VALID | pending after checkout | — |
| TC-B2-016 | VALID | status consistency | — |
| TC-B2-017 | INCOMPLETE | needs confirmed seed | **Pin:** skip if no confirmed OR create via admin status API in setup |
| TC-B2-018 | INCOMPLETE | needs cancel first | **Pin:** setup cancel then assert visibility |
| TC-B2-019 | VALID | low priority optional seed | — |
| TC-B2-020 | VALID | idempotent | — |
| TC-B2-021 | VALID | 401 no token (impl matches) | — |
| TC-B2-022 | VALID | 403 bad JWT (impl matches) | — |
| TC-B2-023 | VALID | empty bearer | — |
| TC-B2-024 | VALID | missing Bearer scheme | — |
| TC-B2-025 | VALID | IDOR unauth — expect deny despite “no auth” selection; privacy of FR-11 | — |
| TC-B2-026 | VALID | horizontal IDOR with token | — |
| TC-B2-027 | VALID | enumeration | — |
| TC-B2-028 | VALID | list isolation | — |
| TC-B2-029 | VALID | tampered JWT | — |
| TC-B2-030 | VALID | SQLi path | — |
| TC-B2-031 | VALID | content-type | — |
| TC-B2-032 | VALID | array root | — |
| TC-B2-033 | VALID | fields | — |
| TC-B2-034 | VALID | object root | — |
| TC-B2-035 | VALID | types | — |
| TC-B2-036 | VALID | 404 JSON | — |
| TC-B2-037 | VALID | 401 JSON | — |
| TC-B2-038 | VALID | empty [] | — |
| TC-B2-039 | INVALID | POST may hit other route | **Rewrite:** expect **404** (no POST handler on this path) |
| TC-B2-040 | INVALID | PUT may be confused with cancel | **Rewrite:** `PUT /api/orders/:id` (not `/cancel`) → **404** |

---

## Notes for execution

- Security expected results for TC-B2-025…027 are **privacy/ownership** (deny). Current SUT returns 200 without auth → **bugs**.
- Selection “no auth on `:id`” describes observed/spec surface; FR-11 still requires not leaking other users’ addresses.
