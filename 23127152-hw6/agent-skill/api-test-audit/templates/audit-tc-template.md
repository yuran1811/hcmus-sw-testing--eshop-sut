# {API_LABEL} — Audit Results

**Student ID:** 23127152  
**Source:** `generated.md`  
**Auditor:** 23127152 (human)  
**Date:** {YYYY-MM-DD}

---

## Summary

| Label | Count | Action |
|-------|-------|--------|
| VALID | | Kept |
| INVALID | | Corrected |
| INCOMPLETE | | Completed |
| **Total** | | |

---

## Detailed audit

| TC ID | Label | Reasoning | Correction applied |
|-------|-------|-----------|--------------------|
| TC-xx-001 | VALID | Matches spec response shape | — |
| TC-xx-002 | INVALID | Expected 401 but protected admin should be 403 per SEC-03 | Expected → 403 |
| TC-xx-003 | INCOMPLETE | No schema assertion on array items | Added required fields check |

---

## Post-audit suite

> Corrected suite is the source of truth for Postman implementation (plus `extended.md`).
