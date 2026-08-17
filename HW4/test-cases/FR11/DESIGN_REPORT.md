# FR-11 Order History View - Test Case Design Report

Feature: Order history view (user)
Feature code: FR11
Total designed test cases: 18
Automation spec: `HW4/tests/FR11_order_history.spec.ts`
Data file: `HW4/test-data/FR11_data.json`

## Design Summary

| Category | Count |
| --- | ---: |
| Access Control | 2 |
| Data Display | 2 |
| Status & Color | 5 |
| Empty State | 1 |
| Cancellation | 5 |
| Navigation & GUI | 3 |

## Traceability

| Case ID | Test case file | Category | Purpose |
| --- | --- | --- | --- |
| F11-TC-001 | [TC-ORDER-HISTORY-001.md](./TC-ORDER-HISTORY-001.md) | Access Control | Verify unauthenticated user cannot view order history and is prompted to login |
| F11-TC-002 | [TC-ORDER-HISTORY-002.md](./TC-ORDER-HISTORY-002.md) | Access Control | Verify logged-in user can only see their own orders and not others |
| F11-TC-003 | [TC-ORDER-HISTORY-003.md](./TC-ORDER-HISTORY-003.md) | Data Display | Verify order list displays required columns |
| F11-TC-004 | [TC-ORDER-HISTORY-004.md](./TC-ORDER-HISTORY-004.md) | Data Display | Verify total amount is correctly formatted with ₫ and thousands separator |
| F11-TC-005 | [TC-ORDER-HISTORY-005.md](./TC-ORDER-HISTORY-005.md) | Status & Color | Verify pending status displays 'Chờ xác nhận' with yellow styling |
| F11-TC-006 | [TC-ORDER-HISTORY-006.md](./TC-ORDER-HISTORY-006.md) | Status & Color | Verify confirmed status displays 'Đã xác nhận' with indigo styling |
| F11-TC-007 | [TC-ORDER-HISTORY-007.md](./TC-ORDER-HISTORY-007.md) | Status & Color | Verify shipping status displays 'Đang giao' with blue styling |
| F11-TC-008 | [TC-ORDER-HISTORY-008.md](./TC-ORDER-HISTORY-008.md) | Status & Color | Verify delivered status displays 'Đã giao' with green styling |
| F11-TC-009 | [TC-ORDER-HISTORY-009.md](./TC-ORDER-HISTORY-009.md) | Status & Color | Verify canceled status displays 'Đã hủy' with red styling |
| F11-TC-010 | [TC-ORDER-HISTORY-010.md](./TC-ORDER-HISTORY-010.md) | Empty State | Verify empty state displays message and illustration when user has no orders |
| F11-TC-011 | [TC-ORDER-HISTORY-011.md](./TC-ORDER-HISTORY-011.md) | Cancellation | Verify cancellation of pending order triggers alert and updates status |
| F11-TC-012 | [TC-ORDER-HISTORY-012.md](./TC-ORDER-HISTORY-012.md) | Cancellation | Verify cancellation of confirmed order triggers alert and updates status |
| F11-TC-013 | [TC-ORDER-HISTORY-013.md](./TC-ORDER-HISTORY-013.md) | Cancellation | Verify user cannot cancel shipping orders (button hidden or disabled) |
| F11-TC-014 | [TC-ORDER-HISTORY-014.md](./TC-ORDER-HISTORY-014.md) | Cancellation | Verify user cannot cancel delivered orders (button hidden) |
| F11-TC-015 | [TC-ORDER-HISTORY-015.md](./TC-ORDER-HISTORY-015.md) | Cancellation | Verify user cannot cancel canceled orders (button hidden) |
| F11-TC-016 | [TC-ORDER-HISTORY-016.md](./TC-ORDER-HISTORY-016.md) | Navigation & GUI | Verify page contains exactly one h1 title |
| F11-TC-017 | [TC-ORDER-HISTORY-017.md](./TC-ORDER-HISTORY-017.md) | Navigation & GUI | Verify active page highlight in the navigation bar |
| F11-TC-018 | [TC-ORDER-HISTORY-018.md](./TC-ORDER-HISTORY-018.md) | Navigation & GUI | Verify logout button label is 'Đăng xuất' |

## Automation Notes

- These design files are the human-readable source of the automated scenarios.
- Primitive input and expected values are synchronized with the external JSON data file.
- The Playwright spec converts these cases into executable data-driven tests across Chromium, Firefox, and WebKit.
