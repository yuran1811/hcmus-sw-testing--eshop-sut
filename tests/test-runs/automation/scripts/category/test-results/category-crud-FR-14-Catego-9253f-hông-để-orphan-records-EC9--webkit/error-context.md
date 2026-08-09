# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: category-crud.spec.ts >> FR-14 Category CRUD — Equivalence Partitioning >> TC-CATEGORY-009: Xóa danh mục có sản phẩm liên kết — không để orphan records (EC9)
- Location: tests\category-crud.spec.ts:189:7

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 2
Received array:  [{"category_id": 1, "description": "Điện thoại cao cấp của Apple", "id": 1, "imageUrl": "https://placehold.co/300x300/png?text=iPhone+15", "name": "iPhone 15 Pro Max", "price": 30000000}, {"category_id": 1, "description": "Màn hình hiển thị xuất sắc, camera siêu zoom", "id": 2, "imageUrl": "https://placehold.co/300x300/png?text=Samsung+S24", "name": "Samsung Galaxy S24 Ultra", "price": 28000000}]
```

# Test source

```ts
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
> 212 |       expect(orphaned).toHaveLength(0);
      |                        ^ Error: expect(received).toHaveLength(expected)
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
```