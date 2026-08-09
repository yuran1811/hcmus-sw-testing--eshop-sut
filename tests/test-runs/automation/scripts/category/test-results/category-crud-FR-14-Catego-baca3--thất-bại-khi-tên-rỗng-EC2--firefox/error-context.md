# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: category-crud.spec.ts >> FR-14 Category CRUD — Equivalence Partitioning >> TC-CATEGORY-002: Thêm danh mục thất bại khi tên rỗng (EC2)
- Location: tests\category-crud.spec.ts:72:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 200
```

# Test source

```ts
  1   | /**
  2   |  * Category CRUD Test Suite (FR-14)
  3   |  * Covers: TC-CATEGORY-001, 002, 003, 004, 005, 006, 009, 012, 013, 014, 015, 019, 020
  4   |  * Technique: Equivalence Partitioning (Domain Testing), Data-driven
  5   |  *
  6   |  * Student: Mạch Quốc Tấn - 23127115
  7   |  * Assignment: HW04 - Automation Testing
  8   |  *
  9   |  * Assertion patterns used:
  10  |  *   Pattern 1 — HTTP status code  (expect(resp.status()).toBe(...))
  11  |  *   Pattern 2 — Body field / value (expect.soft on JSON fields)
  12  |  *   Pattern 3 — Count / length    (toHaveLength, toBeGreaterThan)
  13  |  *   Pattern 4 — Network / API     (request.post / get / delete)
  14  |  *   Pattern 5 — Soft assertion    (expect.soft for characterization tests)
  15  |  */
  16  | 
  17  | import { test, expect } from '@playwright/test';
  18  | import { CategoryAPIHelper, Category } from '../pages/CategoryPage';
  19  | import testData from '../data/category-test-data.json';
  20  | import { automationEnv } from '../../_common/env';
  21  | import { HTTP_STATUS } from '../../_common/http-status';
  22  | 
  23  | const BASE_URL = automationEnv.apiBaseUrl;
  24  | 
  25  | // ─── Shared credentials ───────────────────────────────────────────────────────
  26  | const ADMIN = testData.users.admin;
  27  | 
  28  | // ─── Suite ────────────────────────────────────────────────────────────────────
  29  | test.describe('FR-14 Category CRUD — Equivalence Partitioning', () => {
  30  | 
  31  |   let adminToken: string;
  32  | 
  33  |   test.beforeAll(async ({ request }) => {
  34  |     const api = new CategoryAPIHelper(request, BASE_URL);
  35  |     adminToken = await api.ensureLogin(ADMIN);
  36  |   });
  37  | 
  38  |   // ──────────────────────────────────────────────────────────────────────────
  39  |   // TC-CATEGORY-001: Thêm danh mục thành công với tên hợp lệ
  40  |   // ──────────────────────────────────────────────────────────────────────────
  41  |   test('TC-CATEGORY-001: Thêm danh mục thành công với tên hợp lệ (EC1)', async ({ request }) => {
  42  |     const api = new CategoryAPIHelper(request, BASE_URL);
  43  |     const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-001')!;
  44  |     const uniqueName = `${tc.name_prefix} TC001 ${Date.now()}`;
  45  | 
  46  |     // [Pattern 4] — Network: POST /api/categories
  47  |     const resp = await api.createCategory(adminToken, uniqueName);
  48  | 
  49  |     // [Pattern 1] — Success status on create
  50  |     expect(tc.expected_status_oneOf).toContain(resp.status());
  51  | 
  52  |     // [Pattern 2] — Body has id
  53  |     const body = await resp.json() as { id?: number; category?: { id: number } };
  54  |     const id = body.id ?? (body.category as Category | undefined)?.id;
  55  |     expect(id).toBeTruthy();
  56  | 
  57  |     // [Pattern 4] — Verify appears in list
  58  |     const listResp = await api.getCategories(adminToken);
  59  |     expect(listResp.status()).toBe(HTTP_STATUS.OK);
  60  |     const list = await listResp.json() as Category[];
  61  |     const found = list.some((c) => c.name === uniqueName);
  62  |     // [Pattern 2] — Name must be in list
  63  |     expect(found).toBe(true);
  64  | 
  65  |     // Cleanup
  66  |     if (id) await api.cleanupCategory(adminToken, id);
  67  |   });
  68  | 
  69  |   // ──────────────────────────────────────────────────────────────────────────
  70  |   // TC-CATEGORY-002: Tên để trống → bị từ chối
  71  |   // ──────────────────────────────────────────────────────────────────────────
  72  |   test('TC-CATEGORY-002: Thêm danh mục thất bại khi tên rỗng (EC2)', async ({ request }) => {
  73  |     const api = new CategoryAPIHelper(request, BASE_URL);
  74  |     const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-002')!;
  75  |     const countBefore = await api.getCategoryCount(adminToken);
  76  | 
  77  |     // [Pattern 4] — Network: POST with empty name
  78  |     const resp = await api.createCategory(adminToken, '');
  79  | 
  80  |     // [Pattern 1] — Validation rejection status
> 81  |     expect(resp.status()).toBe(tc.expected_status);
      |                           ^ Error: expect(received).toBe(expected) // Object.is equality
  82  | 
  83  |     // [Pattern 3] — Count unchanged
  84  |     const countAfter = await api.getCategoryCount(adminToken);
  85  |     expect(countAfter).toBe(countBefore);
  86  |   });
  87  | 
  88  |   // ──────────────────────────────────────────────────────────────────────────
  89  |   // TC-CATEGORY-003: Tên chỉ gồm khoảng trắng → bị từ chối
  90  |   // ──────────────────────────────────────────────────────────────────────────
  91  |   test('TC-CATEGORY-003: Thêm danh mục thất bại khi tên chỉ chứa khoảng trắng (EC3)', async ({ request }) => {
  92  |     const api = new CategoryAPIHelper(request, BASE_URL);
  93  |     const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-003')!;
  94  |     const countBefore = await api.getCategoryCount(adminToken);
  95  | 
  96  |     // [Pattern 4] — Network: POST whitespace-only name
  97  |     const resp = await api.createCategory(adminToken, '   ');
  98  | 
  99  |     // [Pattern 1] — Validation rejection status
  100 |     expect(resp.status()).toBe(tc.expected_status);
  101 | 
  102 |     // [Pattern 3] — Count unchanged
  103 |     const countAfter = await api.getCategoryCount(adminToken);
  104 |     expect(countAfter).toBe(countBefore);
  105 |   });
  106 | 
  107 |   // ──────────────────────────────────────────────────────────────────────────
  108 |   // TC-CATEGORY-004: Xem danh sách danh mục thành công
  109 |   // ──────────────────────────────────────────────────────────────────────────
  110 |   test('TC-CATEGORY-004: Xem danh sách danh mục thành công — GET /api/categories', async ({ request }) => {
  111 |     const api = new CategoryAPIHelper(request, BASE_URL);
  112 |     const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-004')!;
  113 | 
  114 |     // Pre-condition: ensure at least 2 categories exist
  115 |     const id1 = await api.createTestCategory(adminToken, `${tc.list_name_prefix_a} ${Date.now()}`);
  116 |     const id2 = await api.createTestCategory(adminToken, `${tc.list_name_prefix_b} ${Date.now() + 1}`);
  117 | 
  118 |     // [Pattern 4] — Network: GET /api/categories
  119 |     const resp = await api.getCategories(adminToken);
  120 | 
  121 |     // [Pattern 1] — Success status on list retrieval
  122 |     expect(resp.status()).toBe(tc.expected_status);
  123 | 
  124 |     // [Pattern 2] — Body is array with id and name fields
  125 |     const list = await resp.json() as Category[];
  126 |     expect(Array.isArray(list)).toBe(true);
  127 | 
  128 |     // [Pattern 3] — Must have at least 2 categories
  129 |     expect(list.length).toBeGreaterThanOrEqual(2);
  130 | 
  131 |     // [Pattern 2] — Each element has id and name
  132 |     for (const cat of list) {
  133 |       expect.soft(typeof cat.id).toBe('number');
  134 |       expect.soft(typeof cat.name).toBe('string');
  135 |     }
  136 | 
  137 |     // Cleanup
  138 |     await api.cleanupCategory(adminToken, id1);
  139 |     await api.cleanupCategory(adminToken, id2);
  140 |   });
  141 | 
  142 |   // ──────────────────────────────────────────────────────────────────────────
  143 |   // TC-CATEGORY-005: Xóa danh mục thành công
  144 |   // ──────────────────────────────────────────────────────────────────────────
  145 |   test('TC-CATEGORY-005: Xóa danh mục thành công với ID hợp lệ (EC7)', async ({ request }) => {
  146 |     const api = new CategoryAPIHelper(request, BASE_URL);
  147 |     const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-005')!;
  148 | 
  149 |     // Create a target category to delete
  150 |     const targetName = `${tc.delete_target_prefix} ${Date.now()}`;
  151 |     const targetId = await api.createTestCategory(adminToken, targetName);
  152 | 
  153 |     // [Pattern 4] — Network: DELETE
  154 |     const resp = await api.deleteCategory(adminToken, targetId);
  155 | 
  156 |     // [Pattern 1] — Success status on delete
  157 |     expect(tc.expected_status_oneOf).toContain(resp.status());
  158 | 
  159 |     // [Pattern 2] — Verify removed from list
  160 |     const list = await api.getCategoryList(adminToken);
  161 |     const stillExists = list.some((c) => c.id === targetId);
  162 |     expect(stillExists).toBe(false);
  163 |   });
  164 | 
  165 |   // ──────────────────────────────────────────────────────────────────────────
  166 |   // TC-CATEGORY-006: Xóa category_id không tồn tại — xử lý có kiểm soát
  167 |   // ──────────────────────────────────────────────────────────────────────────
  168 |   test('TC-CATEGORY-006: Xóa category_id không tồn tại — không crash, không claim deleted (EC8)', async ({ request }) => {
  169 |     const api = new CategoryAPIHelper(request, BASE_URL);
  170 |     const tc = testData.tc_characterization.find((item) => item.tc_id === 'TC-CATEGORY-006')!;
  171 |     const countBefore = await api.getCategoryCount(adminToken);
  172 | 
  173 |     // [Pattern 4] — Network: DELETE non-existent ID
  174 |     const resp = await api.deleteCategory(adminToken, 99999);
  175 | 
  176 |     // [Pattern 1] — Must not server error
  177 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  178 |     // [Pattern 5] — Nonexistent delete must not be reported as success
  179 |     expect(tc.expected_status_oneOf).toContain(resp.status());
  180 | 
  181 |     // [Pattern 3] — Category count unchanged
```