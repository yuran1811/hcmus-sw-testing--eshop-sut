# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: category-crud.spec.ts >> FR-14 Category CRUD — Equivalence Partitioning >> TC-CATEGORY-019-1: DELETE với ID sai cú pháp (abc) — không xóa, không lỗi máy chủ (EC17)
- Location: tests\category-crud.spec.ts:317:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 200
Received array: [400, 404]
```

# Test source

```ts
  226 | 
  227 |     // [Pattern 1] — Validation rejection status
  228 |     expect(resp.status()).toBe(tc.expected_status);
  229 | 
  230 |     // [Pattern 3] — Count unchanged
  231 |     const countAfter = await api.getCategoryCount(adminToken);
  232 |     expect(countAfter).toBe(countBefore);
  233 |   });
  234 | 
  235 |   for (const variant of testData.tc_type_variants) {
  236 |     test(`${variant.tc_id}: ${variant.description} → từ chối với ${variant.expected_status}`, async ({ request }) => {
  237 |       const api = new CategoryAPIHelper(request, BASE_URL);
  238 |       const countBefore = await api.getCategoryCount(adminToken);
  239 | 
  240 |       // [Pattern 4] — Network: POST with invalid type
  241 |       const resp = await api.createCategoryRaw(adminToken, { name: variant.name });
  242 | 
  243 |       // [Pattern 1] — Validation rejection status
  244 |       expect(resp.status()).toBe(variant.expected_status);
  245 | 
  246 |       // [Pattern 3] — Count unchanged
  247 |       const countAfter = await api.getCategoryCount(adminToken);
  248 |       expect(countAfter).toBe(countBefore);
  249 |     });
  250 |   }
  251 | 
  252 |   // ──────────────────────────────────────────────────────────────────────────
  253 |   // TC-CATEGORY-014: Thêm danh mục Unicode / emoji
  254 |   // ──────────────────────────────────────────────────────────────────────────
  255 |   test('TC-CATEGORY-014: Thêm danh mục với Unicode và emoji — lưu nguyên vẹn (EC12)', async ({ request }) => {
  256 |     const api = new CategoryAPIHelper(request, BASE_URL);
  257 |     const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-014')!;
  258 |     const unicodeName = `${tc.name_prefix} ${Date.now()}`;
  259 | 
  260 |     // [Pattern 4] — Network: POST unicode name
  261 |     const resp = await api.createCategory(adminToken, unicodeName);
  262 | 
  263 |     // [Pattern 1] — Success status on create
  264 |     expect(tc.expected_status_oneOf).toContain(resp.status());
  265 | 
  266 |     const body = await resp.json() as { id?: number };
  267 |     const id = body.id;
  268 | 
  269 |     // [Pattern 2] — Name preserved in list (no encoding loss)
  270 |     const list = await api.getCategoryList(adminToken);
  271 |     const found = list.find((c) => c.id === id);
  272 |     expect.soft(found?.name).toBe(unicodeName);
  273 | 
  274 |     // Cleanup
  275 |     if (id) await api.cleanupCategory(adminToken, id);
  276 |   });
  277 | 
  278 |   // ──────────────────────────────────────────────────────────────────────────
  279 |   // TC-CATEGORY-015: Chính sách trùng tên — characterization
  280 |   // ──────────────────────────────────────────────────────────────────────────
  281 |   test('TC-CATEGORY-015: Chính sách khi tạo hai danh mục trùng tên (EC13)', async ({ request }) => {
  282 |     const api = new CategoryAPIHelper(request, BASE_URL);
  283 |     const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-015')!;
  284 |     const dupName = `${tc.name_prefix} DUP ${Date.now()}`;
  285 | 
  286 |     // [Pattern 4] — First creation
  287 |     const resp1 = await api.createCategory(adminToken, dupName);
  288 |     const id1Body = await resp1.json() as { id?: number };
  289 |     const id1 = id1Body.id;
  290 | 
  291 |     expect(tc.expected_status_oneOf).toContain(resp1.status());
  292 | 
  293 |     // [Pattern 4] — Second creation with same name
  294 |     const resp2 = await api.createCategory(adminToken, dupName);
  295 | 
  296 |     // [Pattern 1] — Must not server error
  297 |     expect(resp2.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  298 | 
  299 |     // [Pattern 5] — Characterization: either allowed success or rejected by validation/conflict
  300 |     expect.soft(tc.expected_status_oneOf).toContain(resp2.status());
  301 | 
  302 |     // [Pattern 2] — If rejected, first record still intact
  303 |     if (resp2.status() >= 400) {
  304 |       const list = await api.getCategoryList(adminToken);
  305 |       expect.soft(list.some((c) => c.id === id1)).toBe(true);
  306 |     }
  307 | 
  308 |     // Cleanup
  309 |     if (id1) await api.cleanupCategory(adminToken, id1);
  310 |     const id2Body = await resp2.json().catch(() => ({})) as { id?: number };
  311 |     if (id2Body.id) await api.cleanupCategory(adminToken, id2Body.id);
  312 |   });
  313 | 
  314 |   const syntaxIds = testData.tc_characterization.filter(tc => tc.tc_id.startsWith('TC-CATEGORY-019'));
  315 | 
  316 |   for (const variant of syntaxIds) {
  317 |     test(`${variant.tc_id}: DELETE với ID sai cú pháp (${variant.delete_id}) — không xóa, không lỗi máy chủ (EC17)`, async ({ request }) => {
  318 |       const api = new CategoryAPIHelper(request, BASE_URL);
  319 |       const countBefore = await api.getCategoryCount(adminToken);
  320 | 
  321 |       // [Pattern 4] — Network: DELETE with bad ID
  322 |       const resp = await api.deleteCategory(adminToken, variant.delete_id);
  323 | 
  324 |       // [Pattern 1] — Must not server error; must be rejection or not-found
  325 |       expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
> 326 |       expect.soft(variant.expected_status_oneOf).toContain(resp.status());
      |                                                  ^ Error: expect(received).toContain(expected) // indexOf
  327 | 
  328 |       // [Pattern 3] — Count unchanged
  329 |       const countAfter = await api.getCategoryCount(adminToken);
  330 |       expect(countAfter).toBe(countBefore);
  331 |     });
  332 |   }
  333 | 
  334 |   // ──────────────────────────────────────────────────────────────────────────
  335 |   // TC-CATEGORY-020: Xóa lặp cùng category_id — idempotency characterization
  336 |   // ──────────────────────────────────────────────────────────────────────────
  337 |     test('TC-CATEGORY-020: Xóa lặp cùng ID — không lỗi máy chủ, không tạo lại, hành vi nhất quán (EC18)', async ({ request }) => {
  338 |     const api = new CategoryAPIHelper(request, BASE_URL);
  339 |     const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-020')!;
  340 | 
  341 |     // Create isolated target
  342 |     const id = await api.createTestCategory(adminToken, `${tc.idempotency_target_prefix} ${Date.now()}`);
  343 | 
  344 |     // [Pattern 4] — First DELETE: must succeed
  345 |     const resp1 = await api.deleteCategory(adminToken, id);
  346 |     expect(tc.expected_status_oneOf).toContain(resp1.status());
  347 | 
  348 |     // Confirm deleted
  349 |     const listAfter1 = await api.getCategoryList(adminToken);
  350 |     expect(listAfter1.some((c) => c.id === id)).toBe(false);
  351 | 
  352 |     // [Pattern 4] — Second DELETE on same ID
  353 |     const resp2 = await api.deleteCategory(adminToken, id);
  354 | 
  355 |     // [Pattern 1] — Must not server error, must not recreate
  356 |     expect(resp2.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  357 |     // [Pattern 5] — Characterization: not-found/gone preferred or success on idempotent delete
  358 |     expect.soft(tc.expected_status_oneOf).toContain(resp2.status());
  359 | 
  360 |     // [Pattern 3] — Item still gone
  361 |     const listAfter2 = await api.getCategoryList(adminToken);
  362 |     expect(listAfter2.some((c) => c.id === id)).toBe(false);
  363 |   });
  364 | });
  365 | 
```