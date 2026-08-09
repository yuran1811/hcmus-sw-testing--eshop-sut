# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: category-auth.spec.ts >> FR-14 Category Authorization — Equivalence Partitioning >> TC-CATEGORY-008: Thêm danh mục thất bại khi dùng token user thường (EC5 → OC6)
- Location: tests\category-auth.spec.ts:60:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 200
```

# Test source

```ts
  1   | /**
  2   |  * Category Auth/Authorization Test Suite (FR-14)
  3   |  * Covers: TC-CATEGORY-007, 008, 010, 011, 018
  4   |  * Technique: Equivalence Partitioning (Domain Testing), Data-driven
  5   |  *
  6   |  * Student: Mạch Quốc Tấn - 23127115
  7   |  * Assignment: HW04 - Automation Testing
  8   |  *
  9   |  * Assertion patterns used:
  10  |  *   Pattern 1 — HTTP status code (expect(resp.status()).toBe(...))
  11  |  *   Pattern 3 — Count/length assertion (count unchanged after unauthorized attempt)
  12  |  *   Pattern 4 — Network / API response
  13  |  */
  14  | 
  15  | import { test, expect } from '@playwright/test';
  16  | import { CategoryAPIHelper } from '../pages/CategoryPage';
  17  | import testData from '../data/category-test-data.json';
  18  | import { automationEnv } from '../../_common/env';
  19  | 
  20  | const BASE_URL = automationEnv.apiBaseUrl;
  21  | 
  22  | // ─── Credentials ─────────────────────────────────────────────────────────────
  23  | const ADMIN       = testData.users.admin;
  24  | const NORMAL_USER = testData.users.normalUser;
  25  | 
  26  | // ─── Suite ────────────────────────────────────────────────────────────────────
  27  | test.describe('FR-14 Category Authorization — Equivalence Partitioning', () => {
  28  | 
  29  |   let adminToken: string;
  30  |   let userToken: string;
  31  | 
  32  |   test.beforeAll(async ({ request }) => {
  33  |     const api = new CategoryAPIHelper(request, BASE_URL);
  34  |     adminToken = await api.ensureLogin(ADMIN);
  35  |     userToken  = await api.ensureLogin(NORMAL_USER);
  36  |   });
  37  | 
  38  |   // ──────────────────────────────────────────────────────────────────────────
  39  |   // TC-CATEGORY-007: POST /api/categories — no auth token → auth rejection
  40  |   // ──────────────────────────────────────────────────────────────────────────
  41  |   test('TC-CATEGORY-007: Thêm danh mục thất bại khi không có token (EC4 → OC6)', async ({ request }) => {
  42  |     const api = new CategoryAPIHelper(request, BASE_URL);
  43  |     const tc = testData.tc_auth.find((item) => item.tc_id === 'TC-CATEGORY-007')!;
  44  |     const countBefore = await api.getCategoryCount(adminToken);
  45  | 
  46  |     // [Pattern 4] — Network: POST without Authorization header
  47  |     const resp = await api.createCategory(null, tc.name_prefix);
  48  | 
  49  |     // [Pattern 1] — Auth rejection status
  50  |     expect(tc.expected_status_oneOf).toContain(resp.status());
  51  | 
  52  |     // [Pattern 3] — No category was created
  53  |     const countAfter = await api.getCategoryCount(adminToken);
  54  |     expect(countAfter).toBe(countBefore);
  55  |   });
  56  | 
  57  |   // ──────────────────────────────────────────────────────────────────────────
  58  |   // TC-CATEGORY-008: POST /api/categories — normal user token → forbidden
  59  |   // ──────────────────────────────────────────────────────────────────────────
  60  |   test('TC-CATEGORY-008: Thêm danh mục thất bại khi dùng token user thường (EC5 → OC6)', async ({ request }) => {
  61  |     const api = new CategoryAPIHelper(request, BASE_URL);
  62  |     const tc = testData.tc_auth.find((item) => item.tc_id === 'TC-CATEGORY-008')!;
  63  |     const countBefore = await api.getCategoryCount(adminToken);
  64  | 
  65  |     // [Pattern 4] — Network: POST with non-admin token
  66  |     const resp = await api.createCategory(userToken, tc.name_prefix);
  67  | 
  68  |     // [Pattern 1] — Forbidden status
> 69  |     expect(resp.status()).toBe(tc.expected_status);
      |                           ^ Error: expect(received).toBe(expected) // Object.is equality
  70  | 
  71  |     // [Pattern 3] — No category was created
  72  |     const countAfter = await api.getCategoryCount(adminToken);
  73  |     expect(countAfter).toBe(countBefore);
  74  |   });
  75  | 
  76  |   // ──────────────────────────────────────────────────────────────────────────
  77  |   // TC-CATEGORY-010: DELETE /api/categories/:id — no auth → auth rejection
  78  |   // ──────────────────────────────────────────────────────────────────────────
  79  |   test('TC-CATEGORY-010: Xóa danh mục thất bại khi không có token (EC4)', async ({ request }) => {
  80  |     const api = new CategoryAPIHelper(request, BASE_URL);
  81  |     const tc = testData.tc_auth.find((item) => item.tc_id === 'TC-CATEGORY-010')!;
  82  | 
  83  |     // Ensure category id=1 exists or create a target
  84  |     const list = await api.getCategoryList(adminToken);
  85  |     let targetId: number;
  86  |     if (list.length > 0) {
  87  |       targetId = list[0].id;
  88  |     } else {
  89  |       targetId = await api.createTestCategory(adminToken, `${tc.target_name_prefix} ${Date.now()}`);
  90  |     }
  91  | 
  92  |     // [Pattern 4] — Network: DELETE without token
  93  |     const resp = await api.deleteCategory(null, targetId);
  94  | 
  95  |     // [Pattern 1] — Auth rejection status
  96  |     expect(resp.status()).toBe(tc.expected_status);
  97  | 
  98  |     // [Pattern 3] — Category still exists
  99  |     const listAfter = await api.getCategoryList(adminToken);
  100 |     expect(listAfter.some((c) => c.id === targetId)).toBe(true);
  101 |   });
  102 | 
  103 |   // ──────────────────────────────────────────────────────────────────────────
  104 |   // TC-CATEGORY-011: DELETE /api/categories/:id — normal user token → forbidden
  105 |   // ──────────────────────────────────────────────────────────────────────────
  106 |   test('TC-CATEGORY-011: Xóa danh mục thất bại khi dùng token user thường (EC5)', async ({ request }) => {
  107 |     const api = new CategoryAPIHelper(request, BASE_URL);
  108 |     const tc = testData.tc_auth.find((item) => item.tc_id === 'TC-CATEGORY-011')!;
  109 | 
  110 |     // Create target via admin
  111 |     const targetId = await api.createTestCategory(adminToken, `${tc.target_name_prefix} ${Date.now()}`);
  112 | 
  113 |     // [Pattern 4] — Network: DELETE with non-admin token
  114 |     const resp = await api.deleteCategory(userToken, targetId);
  115 | 
  116 |     // [Pattern 1] — Forbidden status
  117 |     expect(resp.status()).toBe(tc.expected_status);
  118 | 
  119 |     // [Pattern 3] — Category still exists
  120 |     const listAfter = await api.getCategoryList(adminToken);
  121 |     expect(listAfter.some((c) => c.id === targetId)).toBe(true);
  122 | 
  123 |     // Cleanup (must use admin token)
  124 |     await api.cleanupCategory(adminToken, targetId);
  125 |   });
  126 | 
  127 |   // ──────────────────────────────────────────────────────────────────────────
  128 |   // TC-CATEGORY-018: Token sai chữ ký hoặc hết hạn — data-driven
  129 |   // ──────────────────────────────────────────────────────────────────────────
  130 |   for (const variant of testData.tc_invalid_token) {
  131 |     test(`${variant.tc_id}: ${variant.description} (EC16)`, async ({ request }) => {
  132 |       const api = new CategoryAPIHelper(request, BASE_URL);
  133 |       const countBefore = await api.getCategoryCount(adminToken);
  134 | 
  135 |       // [Pattern 4] — Network: POST with invalid/expired token
  136 |       const resp = await api.createCategoryWithRawAuth(
  137 |         variant.auth_header,
  138 |         { name: variant.name }
  139 |       );
  140 | 
  141 |       // [Pattern 1] — Auth rejection status
  142 |       expect(variant.expected_status_oneOf).toContain(resp.status());
  143 | 
  144 |       // [Pattern 3] — No category created
  145 |       const countAfter = await api.getCategoryCount(adminToken);
  146 |       expect(countAfter).toBe(countBefore);
  147 |     });
  148 |   }
  149 | });
  150 | 
```