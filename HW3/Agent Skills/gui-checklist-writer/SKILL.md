---
name: gui-checklist-writer
description: >
  Designs GUI testing checklists for HW03 Task 1: more than 40 non-repetitive
  items covering IA-01 general UI, IA-02 forms, IA-03 navigation, IA-04 feedback
  and state. Builds from EShop SRS (FR-21 to FR-24), component inventory, and
  state matrix; forces a human gap-pass for items AI often misses. Use when
  designing GUI checklist, GUI test design, IA coverage, or HW03 Task 1 writer.
---

# GUI Checklist Writer (HW03 Task 1 - Design)

## Purpose

Produce a **design-ready GUI checklist** for one or more EShop screens that:

- Has **more than 40** meaningful, non-duplicate items
- Covers **all four** interface aspects: IA-01, IA-02, IA-03, IA-04
- Is executable by `gui-checklist-runner` (clear expected result per row)
- Documents **AI draft vs student-added** items (gap pass) for AI Audit / Critique

This skill designs only. Execution (Pass/Fail, screenshots, bugs) is `gui-checklist-runner`.

## When to use

- User asks for GUI checklist design / Task 1 design
- New screen or multi-screen scope for HW03
- After AI generates a draft and user wants structure + gap analysis

## Input schema (collect before writing)

```text
### GUI Checklist Design Input
- Screens: [e.g. Cart, Checkout, Product Detail]  # min 1; multi-screen preferred
- Primary screen: [one screen - must not duplicate groupmates]
- Viewport(s): [e.g. Desktop 1536x864, Mobile 390x844]
- SUT base URL: [e.g. http://localhost:5173]
- Spec sources: README.md (EShop FR-21..FR-24, FR-05..FR-09 as needed)
- Account / data: [e.g. test@eshop.com]
- Build method mix: requirement | component | state | heuristic | risk | experience
- AI draft available?: yes/no + path
```

If screens or primary screen missing, ask once. Prefer multi-screen if user only names one and needs >40 non-shallow items.

## Design workflow

### Step 1 - Scope and inventory

1. Read `README.md` GUI requirements (FR-21..FR-24) and feature FRs for chosen screens.
2. Inventory **components** on each screen: header, nav, forms, tables, buttons, modals, toasts, empty/loading, images, footer.
3. Inventory **states**: default, loading, empty, error, success, disabled, overflow, auth vs guest.
4. Map inventory cells to IA-01..IA-04 (see [references/ia_aspects.md](references/ia_aspects.md)).

### Step 2 - Draft checklist items (AI + structured sources)

Combine methods from class GUI seminar (`GUI_testing.html`):

| Method | Use for |
| --- | --- |
| Requirement-based | FR-21..FR-24, screen FRs |
| Component-based | button, input, menu, modal, card |
| State-based | loading, empty, error, success, disabled |
| Heuristic-based | consistency, feedback, error prevention (Nielsen) |
| Risk-based | cart, checkout, payment, auth |
| Experience-based | known AI blind spots (a11y, RTL, dark mode, VN locale) |

**Hard rules:**

- Target **>= 45** items so human cuts still leave >40
- No near-duplicates (same check reworded)
- Every item must have a **binary-observable** expected result
- Tag each item with exactly one primary **IA-0x**
- Prefer items that can fail independently (not "page looks nice")

### Step 3 - Draft initial checklist

1. Generate initial checklist items (`Origin: AI`) covering IA-01 to IA-04.
2. Output initial files: `CHECKLIST.md` and `DESIGN_REPORT.md`.

### Step 4 - Coverage gate (must pass before handoff)

| Gate | Rule |
| --- | --- |
| Count | Total items > 40 |
| IA coverage | Each of IA-01..IA-04 has **>= 8** items |
| Spec anchor | >= 50% items cite FR-21..FR-24 or a feature FR |
| Executability | Every row has Expected Result a second tester can verify |

If a gate fails, fix design before completing.

## Next Steps (User Workflow)

1. **User Review:** Review `CHECKLIST.md`, add your own items (`Origin: STUDENT`), and note why AI missed them in your `AI_GAP_NOTES.md`.
2. **AI Audit:** Use skill `ai-audit-report` when ready to log this interaction in `Appendix_A/AI_Audit_Report.md`.
3. **Execution:** Use skill `gui-checklist-runner` to execute tests and log bugs.

## Output artifacts (this repo)

Default under `HW3/Task1_GUI_Checklist/`:

```text
HW3/Task1_GUI_Checklist/
  DESIGN_REPORT.md          # scope, inventory, methods, coverage matrix
  CHECKLIST.md              # master checklist (design columns only)
  CHECKLIST.csv             # optional Excel-friendly export
```

If user names another path inside the repo, use it.

### DESIGN_REPORT.md shape

```markdown
# GUI Checklist Design Report - [Screens]

## Scope
- Primary screen, additional screens, viewport, SUT URL, accounts

## Component inventory
| Screen | Component | States | IA |

## Build methods used
| Method | How applied |

## Coverage matrix
| IA | Item count | Item IDs |

## Traceability
| Checklist ID | FR / IA | Source method |

## Ambiguity notes
| Statement | Interpretations | Assumption |
```

### CHECKLIST.md columns (design phase)

Status / Actual / Notes / Evidence stay empty until runner.

| Column | Required |
| --- | --- |
| Checklist ID | `GUI-[SCREEN]-[IA]-[NN]` e.g. `GUI-CART-IA01-01` |
| Screen | Cart / Checkout / ... |
| IA | IA-01 / IA-02 / IA-03 / IA-04 |
| Category | Visual / Forms / Navigation / Feedback / A11y / ... |
| Component | Heading, Qty control, Navbar, ... |
| Checklist item | What to check |
| Spec / Source | FR-xx or heuristic + method |
| Expected result | Observable pass condition |
| Origin | `AI` or `STUDENT` |
| Status | (empty in design) |
| Actual result | (empty) |
| Notes | (empty; Fail reason at run) |
| Evidence | (empty; Fail screenshot path at run) |

ID pattern: `GUI-<SCREEN>-<IA##>-<NN>` with NN zero-padded.

### AI_GAP_NOTES.md shape

```markdown
# AI Gap Notes - GUI Checklist

| Checklist ID | Item summary | Why AI missed | Student action |
| --- | --- | --- | --- |
| GUI-CART-IA01-12 | Focus ring on Delete | Prompt only asked visual layout | Added by student |
```

## Quality bar

Reject draft if:

- Fewer than 41 final items after dedupe
- Any IA has zero items
- Items are vague ("UI is user-friendly")
- All Origin=AI and no gap pass
- Expected results are not observable

## AI Audit

End of session: APPEND via `ai-audit-report` to `Appendix_A/AI_Audit_Report.md`.
Typical verdict for first AI checklist draft: **INCOMPLETE** after gap pass.

## Related skills

- `gui-checklist-runner` - execute Pass/Fail, bugs, multi-platform
- `ai-audit-report` / `ai-critique` - AI Usage appendix
- Class anchors: `Cart_GUI_Checklist.md`, `GUI_testing.html`, `README.md` FR-21..24

## References

- [references/ia_aspects.md](references/ia_aspects.md)
- [references/item_catalog.md](references/item_catalog.md)
- [examples/sample_checklist_excerpt.md](examples/sample_checklist_excerpt.md)
