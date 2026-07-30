# Interface Aspects (HW03) mapped to EShop GUI FRs

HW03 uses IA codes (not FR numbers) for checklist coverage. EShop README still has concrete GUI FRs - map both.

| IA | Name | EShop FR anchors | What to check |
| --- | --- | --- | --- |
| **IA-01** | General UI standards | FR-21 | Language consistency (VI), color semantics (primary blue / danger red), currency `dong` format, single `h1` per page, tab order, typography/spacing consistency, brand alignment |
| **IA-02** | Forms | FR-22 | Required `*`, input types (email/password), error placement above submit, multi-step indicators, labels, validation timing, disable submit while invalid |
| **IA-03** | Navigation | FR-23 | Active nav highlight, cart badge count, logout label, breadcrumbs on child pages, back/continue shopping, deep links, mobile menu |
| **IA-04** | Feedback / state | FR-24 | Toast after add-to-cart, confirm on delete, empty states with illustration, image alt, loading, success/error banners, disabled busy buttons |

## Coverage rule (writer skill)

Each IA needs **>= 8** items. Prefer multi-screen so IA-02 forms are not forced onto a pure display page.

## AI miss hotspots (force into gap pass)

- a11y: focus visible, contrast, alt, touch targets
- RTL / long Vietnamese strings overflow
- dark mode (if any theme)
- empty + loading + partial error together
- password fields remaining filled after success
