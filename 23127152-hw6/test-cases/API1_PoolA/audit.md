# API 1 — Pool A / FR-05: Audit Results

**Student ID:** 23127152  
**Source:** `generated.md` (40 TCs)  
**Auditor:** 23127152 (human)  
**Date:** 2026-08-19  
**Skill:** `api-test-audit`

---

## Summary

| Label | Count | Action |
|-------|-------|--------|
| VALID | 32 | Kept |
| INVALID | 3 | Corrected |
| INCOMPLETE | 5 | Completed |
| **Total** | **40** | |

---

## Detailed audit

| TC ID | Label | Reasoning | Correction applied |
|-------|-------|-----------|--------------------|
| TC-A1-001 | VALID | Spec: list products without search | — |
| TC-A1-002 | VALID | Spec search-by-name; seed has iPhone | — |
| TC-A1-003 | VALID | Exact name match is valid domain | — |
| TC-A1-004 | VALID | No-match → empty list is correct | — |
| TC-A1-005 | INCOMPLETE | Empty `search=` ambiguous | **Pin:** Express/`if (searchQuery)` treats `""` as falsy → same as omit → **200 + full list array** |
| TC-A1-006 | VALID | Whitespace should not 5xx | — |
| TC-A1-007 | VALID | Unicode is valid partition | — |
| TC-A1-008 | INCOMPLETE | Case-sensitivity unspecified | **Pin:** assert JSON array + record actual match count (SQLite LIKE default case-insensitive for ASCII) |
| TC-A1-009 | VALID | Long input robustness OK | — |
| TC-A1-010 | VALID | Short keyword OK | — |
| TC-A1-011 | VALID | Numeric substring OK | — |
| TC-A1-012 | VALID | Special chars must not HTML 500 | — |
| TC-A1-013 | VALID | URL encoding valid | — |
| TC-A1-014 | INCOMPLETE | Duplicate keys unspecified | **Pin:** assert 200 + JSON array; record which value Express keeps |
| TC-A1-015 | VALID | Extra query ignored reasonable | — |
| TC-A1-016 | VALID | Trim behavior documentable | — |
| TC-A1-017 | INVALID | Mixed POST create with “list misuse” | **Rewrite:** use `PATCH /api/products` or `DELETE /api/products` (no id) expecting **404**; do not use POST (that's FR-15 create) |
| TC-A1-018 | VALID | PUT without id → 404 reasonable | — |
| TC-A1-019 | VALID | Idempotent read compensating state | — |
| TC-A1-020 | VALID | Search non-mutating | — |
| TC-A1-021 | VALID | SEC-05 expected: no tautology dump | — |
| TC-A1-022 | VALID | SEC-05 comment injection | — |
| TC-A1-023 | VALID | SEC-05 quote must not HTML 500 | — |
| TC-A1-024 | VALID | UNION probe | — |
| TC-A1-025 | VALID | Stacked query / DROP probe | — |
| TC-A1-026 | VALID | XSS-like string as data OK | — |
| TC-A1-027 | VALID | Public endpoint no auth | — |
| TC-A1-028 | VALID | Extra Bearer ignored | — |
| TC-A1-029 | VALID | Malformed Bearer must not 500 | — |
| TC-A1-030 | INCOMPLETE | `%` alone may match all via LIKE | **Pin:** 200 JSON array; if length==all products flag as **weak filtering** note (not automatic SEC fail alone) |
| TC-A1-031 | VALID | JSON content-type | — |
| TC-A1-032 | VALID | Array root | — |
| TC-A1-033 | VALID | Required fields from seed schema | — |
| TC-A1-034 | VALID | Types id/name | — |
| TC-A1-035 | VALID | price number on list endpoint | — |
| TC-A1-036 | VALID | Search preserves schema | — |
| TC-A1-037 | VALID | Empty `[]` | — |
| TC-A1-038 | VALID | Aligns with TC-A1-023 (no HTML 500) | — |
| TC-A1-039 | VALID | Extreme length | — |
| TC-A1-040 | INCOMPLETE | Null-byte behavior OS-dependent | **Pin:** assert not process crash; status in {200,400}; body JSON if 200 |

---

## Corrected suite notes (for Postman)

1. **TC-A1-005:** `search=` → expect full catalog (same as omit).  
2. **TC-A1-017:** execute as `DELETE /api/products` (no `:id`) → expect 404.  
3. Security TCs **021–025, 038** expected = secure behavior; failures ⇒ product bugs (SEC-05).

## Post-audit suite

Corrected expectations above + `extended.md` are the source of truth for Newman.
