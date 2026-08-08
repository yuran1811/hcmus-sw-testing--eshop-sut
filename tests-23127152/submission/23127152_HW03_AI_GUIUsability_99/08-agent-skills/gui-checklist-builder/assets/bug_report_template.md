# Bug Report Template

Use one block per bug. Copy the blank template below for each new bug; keep the filled example
underneath as a reference for tone/specificity.

---

## Blank template

```markdown
### BUG-XXX — <one-line title stating the defect>

| Field | Value |
|---|---|
| Bug ID | BUG-XXX |
| Title | |
| Environment | |
| Preconditions | |
| Steps | 1. <br>2. <br>3. |
| ER (Expected Result) | |
| AR (Actual Result) | |
| Severity | Critical / High / Medium / Low |
| Priority | P1 / P2 / P3 / P4 |

**Screenshot/Video:** <link or filename>
**Linked checklist item:** <ID from the checklist, e.g. RES-01>
```

---

## Filled example

### BUG-001 — Cart total not recalculated after removing an item

| Field | Value |
|---|---|
| Bug ID | BUG-001 |
| Title | Cart total not recalculated after removing an item |
| Environment | Chrome 126, Windows 11, desktop, 1440×900, EShop staging build `a1b2c3d` |
| Preconditions | Logged in as a normal user; Cart contains 2 different products |
| Steps | 1. Open `/cart` with 2 items in the cart. <br>2. Note the displayed Cart Total. <br>3. Click "Remove" on the first item. |
| ER (Expected Result) | Cart Total updates immediately to reflect only the remaining item's price |
| AR (Actual Result) | Cart Total still shows the sum of both items until the page is manually refreshed |
| Severity | High — main checkout flow shows incorrect total, no workaround except manual refresh |
| Priority | P2 — fix in current cycle; does not block all users but risks incorrect checkout amounts |

**Screenshot/Video:** `screenshots/BUG-001_cart_total_stale.png`
**Linked checklist item:** FUN-02 (Cart total updates after item removal)

---

## Severity / Priority quick reference

| Severity | Meaning |
|---|---|
| Critical | Crash, data loss, blocks the main flow entirely, no workaround |
| High | Major function broken, no workaround, app doesn't crash |
| Medium | Function broken but a workaround exists, or affects a secondary flow |
| Low | Cosmetic, no functional impact |

| Priority | Meaning |
|---|---|
| P1 | Fix before anything else ships |
| P2 | Fix in the current cycle |
| P3 | Fix when convenient |
| P4 | Nice to fix, not scheduled |
