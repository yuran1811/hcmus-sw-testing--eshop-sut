# API 3 — Pool C / FR-15: Audit Results

**Student ID:** 23127152  
**Source:** `generated.md` (40 TCs)  
**Auditor:** 23127152 (human)  
**Date:** 2026-08-19  
**Skill:** `api-test-audit`

---

## Summary

| Label | Count | Action |
|-------|-------|--------|
| VALID | 33 | Kept |
| INVALID | 3 | Corrected |
| INCOMPLETE | 4 | Completed |
| **Total** | **40** | |

---

## Detailed audit

| TC ID | Label | Reasoning | Correction |
|-------|-------|-----------|------------|
| TC-C3-001 | VALID | Happy path admin create | — |
| TC-C3-002 | INCOMPLETE | Spec weak on validation | **Pin:** expect reject **or** document if SUT accepts null name; prefer 400 for quality |
| TC-C3-003 | INCOMPLETE | Same for price | **Pin:** prefer 400; if 200 record as validation bug separately |
| TC-C3-004 | VALID | price > 0 domain | — |
| TC-C3-005 | VALID | negative price | — |
| TC-C3-006 | VALID | type check | — |
| TC-C3-007 | VALID | empty name | — |
| TC-C3-008 | VALID | long name | — |
| TC-C3-009 | VALID | Unicode | — |
| TC-C3-010 | INCOMPLETE | FK not in spec | **Pin:** assert no 500; status ∈ {200,400} |
| TC-C3-011 | INCOMPLETE | imageUrl requiredness unclear | **Pin:** document actual |
| TC-C3-012 | VALID | update | — |
| TC-C3-013 | INVALID | SUT may return 200 even if 0 rows | **Rewrite expected:** if impl returns 200 with message, still assert product unchanged via GET; prefer 404 per REST |
| TC-C3-014 | VALID | negative on update | — |
| TC-C3-015 | VALID | delete + verify | — |
| TC-C3-016 | INVALID | DELETE missing may still 200 | **Rewrite:** assert via follow-up; prefer 404 |
| TC-C3-017 | VALID | non-numeric id | — |
| TC-C3-018 | VALID | id=0 | — |
| TC-C3-019 | VALID | create→search | — |
| TC-C3-020 | VALID | update visible | — |
| TC-C3-021 | VALID | delete from list | — |
| TC-C3-022 | VALID | sequence | — |
| TC-C3-023 | VALID | double delete | — |
| TC-C3-024 | VALID | SEC-02 POST | — |
| TC-C3-025 | VALID | SEC-02 PUT | — |
| TC-C3-026 | VALID | SEC-02 DELETE | — |
| TC-C3-027 | VALID | SEC-03 user POST | — |
| TC-C3-028 | VALID | SEC-03 user PUT | — |
| TC-C3-029 | VALID | SEC-03 user DELETE | — |
| TC-C3-030 | VALID | bad JWT | — |
| TC-C3-031 | VALID | admin allowed | — |
| TC-C3-032 | VALID | schema create | — |
| TC-C3-033 | VALID | schema update | — |
| TC-C3-034 | VALID | schema delete | — |
| TC-C3-035 | VALID | content-type | — |
| TC-C3-036 | VALID | error JSON | — |
| TC-C3-037 | VALID | id number | — |
| TC-C3-038 | VALID | empty body | — |
| TC-C3-039 | VALID | unknown fields | — |
| TC-C3-040 | INVALID | not a CRUD negative | **Rewrite:** use `PATCH /api/products` → **404** |

---

## Notes

Security TCs **024–029** expected = spec (auth+admin). Current SUT has **no middleware** → Newman failures = bugs (SEC-02/SEC-03).
