# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: category-bva.spec.ts >> FR-14 Category — BVA (Boundary Value Analysis) >> TC-CATEGORY-BVA-003: DELETE với ID dưới mốc tham chiếu — không xóa gì, không lỗi máy chủ
- Location: tests\category-bva.spec.ts:94:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 200
Received array: [400, 404]
```

# Test source

```ts
  5   |  *
  6   |  * Student: Mạch Quốc Tấn - 23127115
  7   |  * Assignment: HW04 - Automation Testing
  8   |  *
  9   |  * Assertion patterns used:
  10  |  *   Pattern 1 — HTTP status assertion
  11  |  *   Pattern 2 — Body field / value assertion
  12  |  *   Pattern 3 — Count / length assertion
  13  |  *   Pattern 4 — Network / API response
  14  |  *   Pattern 5 — Soft assertion for characterization points
  15  |  */
  16  | 
  17  | import { test, expect } from '@playwright/test';
  18  | import { CategoryAPIHelper, Category } from '../pages/CategoryPage';
  19  | import testData from '../data/category-test-data.json';
  20  | import { automationEnv } from '../../_common/env';
  21  | import { HTTP_STATUS } from '../../_common/http-status';
  22  | 
  23  | const BASE_URL = automationEnv.apiBaseUrl;
  24  | const ADMIN = testData.users.admin;
  25  | 
  26  | test.describe('FR-14 Category — BVA (Boundary Value Analysis)', () => {
  27  | 
  28  |   let adminToken: string;
  29  | 
  30  |   test.beforeAll(async ({ request }) => {
  31  |     const api = new CategoryAPIHelper(request, BASE_URL);
  32  |     adminToken = await api.ensureLogin(ADMIN);
  33  |   });
  34  | 
  35  |   // ──────────────────────────────────────────────────────────────────────────
  36  |   // TC-CATEGORY-BVA-001: Name length tại biên dưới hợp lệ
  37  |   // ──────────────────────────────────────────────────────────────────────────
  38  |   test('TC-CATEGORY-BVA-001: Tên ở biên dưới hợp lệ — phải được chấp nhận', async ({ request }) => {
  39  |     const api = new CategoryAPIHelper(request, BASE_URL);
  40  |     const tcData = testData.tc_bva.find(tc => tc.tc_id === 'TC-CATEGORY-BVA-001')!;
  41  | 
  42  |     // [Pattern 4] — Network: POST name="A"
  43  |     const resp = await api.createCategory(adminToken, tcData.name!);
  44  | 
  45  |     // [Pattern 1] — Success status on create
  46  |     expect(tcData.expected_status_oneOf).toContain(resp.status());
  47  | 
  48  |     const body = await resp.json() as { id?: number };
  49  |     const id = body.id;
  50  | 
  51  |     // [Pattern 2] — Name 'A' appears in list
  52  |     if (id) {
  53  |       const list = await api.getCategoryList(adminToken);
  54  |       const found = list.find((c) => c.id === id);
  55  |       expect.soft(found?.name).toBe(tcData.name);
  56  | 
  57  |       // Cleanup
  58  |       await api.cleanupCategory(adminToken, id);
  59  |     }
  60  |   });
  61  | 
  62  |   // ──────────────────────────────────────────────────────────────────────────
  63  |   // TC-CATEGORY-BVA-002: Name length ngay trên biên dưới
  64  |   // ──────────────────────────────────────────────────────────────────────────
  65  |   test('TC-CATEGORY-BVA-002: Tên ngay trên biên dưới — phải được chấp nhận', async ({ request }) => {
  66  |     const api = new CategoryAPIHelper(request, BASE_URL);
  67  |     const tcData = testData.tc_bva.find(tc => tc.tc_id === 'TC-CATEGORY-BVA-002')!;
  68  | 
  69  |     // [Pattern 4] — Network: POST name="AB"
  70  |     const resp = await api.createCategory(adminToken, tcData.name!);
  71  | 
  72  |     // [Pattern 1] — Success status on create
  73  |     expect(tcData.expected_status_oneOf).toContain(resp.status());
  74  | 
  75  |     const body = await resp.json() as { id?: number };
  76  |     const id = body.id;
  77  | 
  78  |     if (id) {
  79  |       // [Pattern 2] — Name 'AB' preserved
  80  |       const list = await api.getCategoryList(adminToken);
  81  |       const found = list.find((c) => c.id === id);
  82  |       expect.soft(found?.name).toBe(tcData.name);
  83  | 
  84  |       // [Pattern 2] — Length must not be silently truncated
  85  |       expect.soft(found?.name.length).toBe(tcData.name!.length);
  86  | 
  87  |       await api.cleanupCategory(adminToken, id);
  88  |     }
  89  |   });
  90  | 
  91  |   // ──────────────────────────────────────────────────────────────────────────
  92  |   // TC-CATEGORY-BVA-003: DELETE với ID dưới mốc tham chiếu
  93  |   // ──────────────────────────────────────────────────────────────────────────
  94  |   test('TC-CATEGORY-BVA-003: DELETE với ID dưới mốc tham chiếu — không xóa gì, không lỗi máy chủ', async ({ request }) => {
  95  |     const api = new CategoryAPIHelper(request, BASE_URL);
  96  |     const tcData = testData.tc_bva.find(tc => tc.tc_id === 'TC-CATEGORY-BVA-003')!;
  97  |     const countBefore = await api.getCategoryCount(adminToken);
  98  | 
  99  |     // [Pattern 4] — Network: DELETE id=0
  100 |     const resp = await api.deleteCategory(adminToken, tcData.delete_id!);
  101 | 
  102 |     // [Pattern 1] — Must not server error
  103 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  104 |     // [Pattern 5] — Characterization: rejection or not-found preferred
> 105 |     expect.soft(tcData.expected_status_oneOf).toContain(resp.status());
      |                                               ^ Error: expect(received).toContain(expected) // indexOf
  106 | 
  107 |     // [Pattern 3] — Count unchanged
  108 |     const countAfter = await api.getCategoryCount(adminToken);
  109 |     expect(countAfter).toBe(countBefore);
  110 |   });
  111 | 
  112 |   // ──────────────────────────────────────────────────────────────────────────
  113 |   // TC-CATEGORY-BVA-004: DELETE với ID tại mốc tham chiếu
  114 |   // ──────────────────────────────────────────────────────────────────────────
  115 |   test('TC-CATEGORY-BVA-004: DELETE với ID tại mốc tham chiếu — xóa thành công nếu tồn tại và không có sản phẩm', async ({ request }) => {
  116 |     const api = new CategoryAPIHelper(request, BASE_URL);
  117 |     const tcData = testData.tc_bva.find(tc => tc.tc_id === 'TC-CATEGORY-BVA-004')!;
  118 | 
  119 |     // Create a fresh category that will get a low ID
  120 |     // NOTE: In a live system, id=1 may have products. We use a newly created one.
  121 |     // If id=1 exists and has no products, we can test directly.
  122 |     // For safety, we create a clean category and use its ID.
  123 |     const freshId = await api.createTestCategory(adminToken, `${tcData.fresh_name_prefix} ${Date.now()}`);
  124 | 
  125 |     // [Pattern 4] — Network: DELETE freshId
  126 |     const resp = await api.deleteCategory(adminToken, freshId);
  127 | 
  128 |     // [Pattern 1] — Success status on delete
  129 |     expect([HTTP_STATUS.OK, HTTP_STATUS.NO_CONTENT]).toContain(resp.status());
  130 | 
  131 |     // [Pattern 3] — Verify removed
  132 |     const list = await api.getCategoryList(adminToken);
  133 |     expect(list.some((c) => c.id === freshId)).toBe(false);
  134 |   });
  135 | 
  136 |   // ──────────────────────────────────────────────────────────────────────────
  137 |   // TC-CATEGORY-BVA-005: DELETE với ID ngay trên mốc tham chiếu
  138 |   // ──────────────────────────────────────────────────────────────────────────
  139 |   test('TC-CATEGORY-BVA-005: DELETE với ID ngay trên mốc tham chiếu — xóa thành công', async ({ request }) => {
  140 |     const api = new CategoryAPIHelper(request, BASE_URL);
  141 |     const tcData = testData.tc_bva.find(tc => tc.tc_id === 'TC-CATEGORY-BVA-005')!;
  142 | 
  143 |     // Create two categories to get IDs around the reference point
  144 |     const id1 = await api.createTestCategory(adminToken, `${tcData.target_name_prefix} 1 ${Date.now()}`);
  145 |     const id2 = await api.createTestCategory(adminToken, `${tcData.target_name_prefix} 2 ${Date.now() + 1}`);
  146 | 
  147 |     // [Pattern 4] — Delete the second one (above-reference target)
  148 |     const resp = await api.deleteCategory(adminToken, id2);
  149 | 
  150 |     // [Pattern 1] — Success status on delete
  151 |     expect([HTTP_STATUS.OK, HTTP_STATUS.NO_CONTENT]).toContain(resp.status());
  152 | 
  153 |     // [Pattern 3] — id2 gone, id1 still present
  154 |     const list = await api.getCategoryList(adminToken);
  155 |     expect(list.some((c) => c.id === id2)).toBe(false);
  156 |     expect(list.some((c) => c.id === id1)).toBe(true);
  157 | 
  158 |     // Cleanup id1
  159 |     await api.cleanupCategory(adminToken, id1);
  160 |   });
  161 | 
  162 |   // ──────────────────────────────────────────────────────────────────────────
  163 |   // TC-CATEGORY-BVA-006: GET /api/categories khi danh sách trống — empty array
  164 |   // NOTE: This test is a best-effort characterization since the DB is shared.
  165 |   //       We verify at minimum that the empty array format is correct on a fresh DB.
  166 |   //       On a shared DB, we verify the API handles the response format correctly.
  167 |   // ──────────────────────────────────────────────────────────────────────────
  168 |   test('TC-CATEGORY-BVA-006: GET danh sách khi danh sách trống — trả về mảng rỗng, không crash', async ({ request }) => {
  169 |     const api = new CategoryAPIHelper(request, BASE_URL);
  170 | 
  171 |     // [Pattern 4] — Network: GET /api/categories
  172 |     const resp = await api.getCategories(adminToken);
  173 | 
  174 |     // [Pattern 1] — Success status on list retrieval
  175 |     expect(resp.status()).toBe(HTTP_STATUS.OK);
  176 | 
  177 |     // [Pattern 2] — Response is an array (not null or error object)
  178 |     const body = await resp.json() as Category[] | { error?: string };
  179 |     // Body must be an array (even if non-empty on shared DB — format is what matters here)
  180 |     expect(Array.isArray(body)).toBe(true);
  181 | 
  182 |     // [Pattern 5] — Soft: verify the format when count happens to be 0
  183 |     // (in a shared DB this may not be 0; document actual behavior)
  184 |     const list = body as Category[];
  185 |     if (list.length === 0) {
  186 |       // True empty case: verify it's `[]`, not null or omitted field
  187 |       expect.soft(list).toEqual([]);
  188 |     } else {
  189 |       // Shared DB case: at least we verify the array format is correct
  190 |       expect.soft(list.length).toBeGreaterThan(0);
  191 |     }
  192 |   });
  193 | 
  194 |   // ──────────────────────────────────────────────────────────────────────────
  195 |   // TC-CATEGORY-BVA-007: GET /api/categories khi có đúng 1 danh mục
  196 |   // ──────────────────────────────────────────────────────────────────────────
  197 |   test('TC-CATEGORY-BVA-007: GET danh sách với đúng 1 danh mục — mảng có 1 phần tử đúng', async ({ request }) => {
  198 |     const api = new CategoryAPIHelper(request, BASE_URL);
  199 |     const tcData = testData.tc_bva.find(tc => tc.tc_id === 'TC-CATEGORY-BVA-007')!;
  200 | 
  201 |     // Create an isolated category
  202 |     const uniqueName = `${tcData.unique_name_prefix} ${Date.now()}`;
  203 |     const id = await api.createTestCategory(adminToken, uniqueName);
  204 | 
  205 |     // [Pattern 4] — Network: GET
```