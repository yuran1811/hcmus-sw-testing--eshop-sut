# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: category-crud.spec.ts >> FR-14 Category CRUD — Equivalence Partitioning >> TC-CATEGORY-013-3: name = true (Boolean type error) → từ chối với 400
- Location: tests\category-crud.spec.ts:236:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 200
```

# Test source

```ts
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
  182 |     const countAfter = await api.getCategoryCount(adminToken);
  183 |     expect(countAfter).toBe(countBefore);
  184 |   });
  185 | 
  186 |   // ──────────────────────────────────────────────────────────────────────────
  187 |   // TC-CATEGORY-009: Chính sách xóa danh mục đang được sản phẩm tham chiếu
  188 |   // ──────────────────────────────────────────────────────────────────────────
  189 |   test('TC-CATEGORY-009: Xóa danh mục có sản phẩm liên kết — không để orphan records (EC9)', async ({ request }) => {
  190 |     const api = new CategoryAPIHelper(request, BASE_URL);
  191 |     const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-009') as {
  192 |       protected_target_id: string | number;
  193 |       expected_status_oneOf: number[];
  194 |     };
  195 | 
  196 |     // This test documents the characterization policy for cascade delete.
  197 |     // We check behavior when deleting a category that likely has products (id=1 from seed data).
  198 |     const resp = await api.deleteCategory(adminToken, tc.protected_target_id);
  199 | 
  200 |     // [Pattern 1] — Must not server error or return raw DB error
  201 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  202 |     // [Pattern 5] — Characterization: accept either strict rejection or safe cascade
  203 |     expect(tc.expected_status_oneOf).toContain(resp.status());
  204 | 
  205 |     if (([HTTP_STATUS.OK, HTTP_STATUS.NO_CONTENT] as number[]).includes(resp.status())) {
  206 |       // [Pattern 4] — After a successful delete, no product may keep the deleted category_id
  207 |       const productsResp = await request.get(`${BASE_URL}/api/products`);
  208 |       expect(productsResp.status()).toBe(HTTP_STATUS.OK);
  209 |       const products = await productsResp.json() as Array<{ category_id?: number | null }>;
  210 |       expect(Array.isArray(products)).toBe(true);
  211 |       const orphaned = products.filter((product) => product.category_id === tc.protected_target_id);
  212 |       expect(orphaned).toHaveLength(0);
  213 |     }
  214 |   });
  215 | 
  216 |   // ──────────────────────────────────────────────────────────────────────────
  217 |   // TC-CATEGORY-012: Thiếu trường name (body = {})
  218 |   // ──────────────────────────────────────────────────────────────────────────
  219 |   test('TC-CATEGORY-012: Thêm danh mục thất bại khi body thiếu thuộc tính name (EC2)', async ({ request }) => {
  220 |     const api = new CategoryAPIHelper(request, BASE_URL);
  221 |     const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-012')!;
  222 |     const countBefore = await api.getCategoryCount(adminToken);
  223 | 
  224 |     // [Pattern 4] — Network: POST empty body {}
  225 |     const resp = await api.createCategoryRaw(adminToken, {});
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
> 244 |       expect(resp.status()).toBe(variant.expected_status);
      |                             ^ Error: expect(received).toBe(expected) // Object.is equality
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
  326 |       expect.soft(variant.expected_status_oneOf).toContain(resp.status());
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
```