# AI Audit Report

"Em sử dụng công cụ AI cho các nhiệm vụ sau,"

## Danh sách các tương tác AI thực tế (AI Interactions Log)

### Entry 1

- **Tool:** Gemini 3.6 Flash
- **Date/time:** 2026-08-05 01:27
- **Task context:** Tự động hóa Playwright cho FR-05 Product List & Search
- **Prompt used (verbatim):**
  > sử dụng skill playwright-ai-automation để tạo các script playwright cho tests/bug-reports/product-list-and-search vào trong tests/scripts/product-list-and-search, viết readme đầy đủ để tôi có thể chạy được, sử dụng skill ai-audit-logger log lại trong docs/report/AI_Audit_Report.md
- **AI output (summary):**
  > Tạo toàn bộ bộ kịch bản tự động hóa Playwright cho FR-05 bao gồm: Page Object Model (`ProductListPage.ts`), file dữ liệu kiểm thử JSON (`plas-test-data.json`), kịch bản test suite 13 test cases (`product-list-and-search.spec.ts`), cấu hình đa trình duyệt Chromium/Firefox/WebKit & tag chứng thực MSSV 23127115 (`playwright.config.ts`), và tài liệu hướng dẫn `README.md`.
- **What the student changed/kept from this output:** Giữ nguyên toàn bộ mã nguồn Playwright, file cấu hình và tài liệu hướng dẫn.

---

### Entry 2

- **Tool:** Claude Sonnet 4.6 (Thinking) via Antigravity IDE
- **Date/time:** 2026-08-05 12:15
- **Task context:** Task 2 - Tạo Playwright automation scripts cho FR-08 Checkout
- **Prompt used (verbatim):**
  > sử dụng skill @playwright-ai-automation để tạo các script playwright cho tests/test-cases/checkout vào trong tests/scripts/checkout, viết readme đầy đủ để tôi có thể chạy được, sử dụng skill @ai-audit-report log lại trong docs/report/AI_Audit_Report.md
- **AI output (summary):**
  > Đọc và phân tích toàn bộ 22 test case FR-08 (TC-CHECKOUT-001 đến TC-CHECKOUT-015 và TC-CHECKOUT-BVA-001 đến BVA-007). Tạo bộ automation Playwright hoàn chỉnh gồm: Page Object Model (`CheckoutPage.ts`) chứa `CheckoutAPIHelper` (wrapper cho API calls) và `CheckoutWebPage` (UI locators); file dữ liệu `checkout-test-data.json` bao phủ tất cả test cases; 3 test spec (`checkout-api.spec.ts`, `checkout-ui.spec.ts`, `checkout-bva.spec.ts`) sử dụng 5 assertion patterns khác nhau; `playwright.config.ts` multi-browser (Chromium/Firefox/WebKit) với tag MSSV 23127115; `package.json` với scripts `test:api`, `test:ui`, `test:bva`; `README.md` đầy đủ hướng dẫn cài đặt và chạy test.
- **What the student changed/kept from this output:** Giữ nguyên toàn bộ mã nguồn được tạo ra. Cần review locators trong `CheckoutWebPage` vì phụ thuộc vào markup thực tế của frontend (có thể cần điều chỉnh selector khi chạy thực tế).

---

### Entry 3

- **Tool:** Gemini 2.5 Pro (Thinking) via Antigravity IDE
- **Date/time:** 2026-08-05 16:05
- **Task context:** Task 3 - Tạo Playwright automation scripts cho FR-14 Category Management
- **Prompt used (verbatim):**
  > sử dụng skill @playwright-ai-automation để tạo các script playwright cho tests/test-cases/checkout vào trong tests/scripts/category, viết readme đầy đủ để tôi có thể chạy được, sử dụng skill @ai-audit-report log lại trong docs/report/AI_Audit_Report.md
- **AI output (summary):**
  > Đọc và phân tích toàn bộ 28 test case FR-14 (TC-CATEGORY-001 đến TC-CATEGORY-020 và TC-CATEGORY-BVA-001 đến BVA-008). Tạo bộ automation Playwright hoàn chỉnh gồm: Page Object Model (`CategoryPage.ts`) chứa `CategoryAPIHelper` (wrapper cho toàn bộ Category API calls); file dữ liệu `category-test-data.json` bao phủ tất cả 28 test cases; 4 test spec (`category-crud.spec.ts`, `category-auth.spec.ts`, `category-security.spec.ts`, `category-bva.spec.ts`) sử dụng 5 assertion patterns; `playwright.config.ts` multi-browser (Chromium/Firefox/WebKit) với tag MSSV 23127115; `package.json` với scripts `test:crud`, `test:auth`, `test:security`, `test:bva`; `README.md` đầy đủ hướng dẫn cài đặt và chạy test.
- **What the student changed/kept from this output:** Giữ nguyên toàn bộ mã nguồn được tạo ra. Lưu ý: nếu backend không tự gán `role='admin'` khi đăng ký, cần seed thủ công qua SQLite (đã có hướng dẫn trong README).

---

### Entry 4

- **Tool:** Gemini 3.6 Flash via Antigravity IDE
- **Date/time:** 2026-08-05 16:25
- **Task context:** Task 4 - Đồng bộ & Cập nhật Playwright automation scripts cho FR-05 Product List & Search
- **Prompt used (verbatim):**
  > sử dụng skill @playwright-ai-automation để tạo các script playwright cho tests/test-cases/product-list-and-search vào trong tests/scripts/product-list-and-search, viết readme đầy đủ để tôi có thể chạy được, sử dụng skill @ai-audit-report log lại trong docs/report/AI_Audit_Report.md, hiện tôi đã viết, nhưng bạn xem và cập nhật giống với tests/scripts/checkout và tests/scripts/category
- **AI output (summary):**
  > Đánh giá và tái cấu trúc toàn bộ 29 test case FR-05 để đồng bộ cấu trúc 100% với `checkout` và `category`. Tách 1 file spec đơn lẻ thành 3 file spec chuyên biệt (`plas-ep.spec.ts`, `plas-ui.spec.ts`, `plas-bva.spec.ts`) áp dụng chuẩn 5 assertion patterns; nâng cấp Page Object Model (`ProductListPage.ts`) và cấu hình `playwright.config.ts` với `PW_TEST_HTML_REPORT_TITLE` & tag chứng thực MSSV 23127115; bổ sung scripts `test:ep`, `test:ui`, `test:bva` trong `package.json`; viết lại `README.md` theo chuẩn chung.
- **What the student changed/kept from this output:** Giữ nguyên toàn bộ cấu trúc và mã nguồn Playwright đã được refactor.

---

### Entry 5

- **Tool:** Gemini 3.5 Flash via Antigravity Agent
- **Date/time:** 2026-08-06 23:58
- **Task context:** Refactor toàn bộ test suite Category sang mô hình Data-Driven Testing (loại bỏ hoàn toàn hardcoded values)
- **Prompt used (verbatim):**
  > sửa hết các code cứng liên quan đén category
- **AI output (summary):**
  > Thực hiện quét và thay thế toàn bộ giá trị viết cứng (tokens, edge cases, Unicode payloads, SQL injection payloads) trong 4 file test spec của Category: `category-auth.spec.ts`, `category-bva.spec.ts`, `category-crud.spec.ts`, và `category-security.spec.ts`. Dữ liệu chạy test hiện tại được load động 100% từ file cấu hình `category-test-data.json`.
- **What the student changed/kept from this output:** Giữ nguyên toàn bộ cấu trúc code refactor, khởi chạy backend local server để chạy nghiệm thu tự động.

---

### Entry 6

- **Tool:** Gemini 3.5 Flash via Antigravity Agent
- **Date/time:** 2026-08-07 00:35
- **Task context:** Refactor toàn bộ test suite Product List & Search (PLAS) sang mô hình Data-Driven Testing (loại bỏ hoàn toàn hardcoded values)
- **Prompt used (verbatim):**
  > kiểm tra xem cái nào còn đang viết cứng dữ liệu thì hãy sửa lại (cho phần product search)
- **AI output (summary):**
  > Thực hiện quét các file kịch bản tìm kiếm `plas-bva.spec.ts`, `plas-ep.spec.ts`, và `plas-ui.spec.ts`. Thay đổi toàn bộ các từ khóa tìm kiếm viết cứng, số lượng kỳ vọng và tiêu đề sản phẩm để lấy động từ `plas-test-data.json`.
- **What the student changed/kept from this output:** Giữ nguyên code refactor, bổ sung thêm khóa `expected_count` vào file dữ liệu JSON cho các ca đặc biệt để khớp hoàn hảo với logic kiểm thử.

---

### Entry 7

- **Tool:** Gemini 3.5 Flash via Antigravity Agent
- **Date/time:** 2026-08-07 00:55
- **Task context:** Refactor toàn bộ kịch bản Checkout sang mô hình Data-Driven Testing (loại bỏ hoàn toàn hardcoded values)
- **Prompt used (verbatim):**
  > sửa nốt các phần dữ liệu viết cứng của suite checkout sang nạp động từ file JSON
- **AI output (summary):**
  > Chuyển đổi toàn bộ địa chỉ giao hàng và tổng tiền giả định trong `checkout-api.spec.ts`, `checkout-bva.spec.ts`, và `checkout-ui.spec.ts` sang việc truy xuất động thông qua cấu trúc `tc_api` và `tc_bva` của file `checkout-test-data.json`.
- **What the student changed/kept from this output:** Giữ nguyên toàn bộ mã nguồn refactor và chạy kiểm thử tự động trên local server để nghiệm thu sự tương thích.

---

### Entry 8

- **Tool:** Gemini 3.5 Sonnet / Antigravity Agent
- **Date/time:** 2026-08-09 22:04
- **Task context:** Thực thi chạy kiểm thử tự động, báo cáo kết quả và lập bug reports
- **Prompt used (verbatim):**
  > vậy giờ hãy chạy giúp tôi toàn bộ các script của @[../../tests/test-runs/automation/scripts/category] @[../../tests/test-runs/automation/scripts/checkout] @[../../tests/test-runs/automation/scripts/product-list-and-search] và báo cáo vào README của mỗi folder, có bug thì sử dụng @[../../.agents/skills/test-run-reporter] viết vào trong @[../../tests/bug-reports/automation] giống như @[../../tests/bug-reports/manual], nhớ có hình ảnh đầy đủ từ playwright.
- **AI output (summary):**
  > Khởi chạy local servers của SUT, chạy test suite Playwright đa trình duyệt, tạo các file bug report tự động (đính kèm hình ảnh giao diện lỗi), tạo các file `README.md` báo cáo kết quả chi tiết cho mỗi phân hệ.
- **What the student changed/kept from this output:** Giữ nguyên kết quả chạy test và các báo cáo lỗi để hoàn thành bài nộp.

---

### Entry 9

- **Tool:** Codex (GPT-5) via Codex CLI
- **Date/time:** 2026-08-10 10:07
- **Task context:** Rà soát và sửa wait không ổn định trong Page Object Model
- **Prompt used (verbatim):**
  > tôi phát hiện ra là còn nhiều cái bị vấn đề this.page.**waitForLoadState**('domcontentloaded'), sửa hết cho các page object model
- **AI output (summary):**
  > Quét các Page Object Model trong automation scripts, phát hiện `ProductListPage.goto()` và các hàm điều hướng của `CheckoutWebPage` còn dùng `waitForLoadState('domcontentloaded')`. Thay bằng wait theo tín hiệu cụ thể hơn: Product chờ response `/api/products` và search input visible; Checkout chờ URL `/cart` hoặc `/checkout` và body visible. Chạy lại kiểm tra không còn pattern `waitForLoadState('domcontentloaded')` và TypeScript compile pass cho Product List & Search và Checkout.
- **What the student changed/kept from this output:** Giữ các thay đổi Page Object để giảm flaky wait và làm rõ phần human review/gap analysis về wait không ổn định.

---

### Entry 10

- **Tool:** Codex (GPT-5) via Codex CLI
- **Date/time:** 2026-08-10 10:50
- **Task context:** Sửa lỗi timeout trong `beforeEach` sau khi thay wait của Product Page Object
- **Prompt used (verbatim):**
  > ủa sao nó bị Test timeout of 30000ms exceeded while running "beforeEach" hook.
  >
  >   44 |   let plasPage: ProductListPage;
  >   45 |
  > > 46 |   test.beforeEach(async ({ page }) => {
  >      |        ^
  >   47 |     plasPage = new ProductListPage(page);
  >   48 |     await plasPage.goto();
  >   49 |   });
  >     at G:\HCMUS\NAM3-HK3\Testing\Homework\HW4\hcmus-sw-testing--eshop-sut\tests\test-runs\automation\scripts\product-list-and-search\tests\plas-ep.spec.ts:46:8
  > Error: locator.waitFor: Target page, context or browser has been closed
  >
  >    at ..\pages\ProductListPage.ts:72
  >
  >   70 |     await this.page.goto(baseURL);
  >   71 |     await productsResponse;
  > > 72 |     await this.searchInput.waitFor({ state: 'visible' });
  >      |                            ^
  >   73 |   }
  >   74 |
  >   75 |   /**
  >     at ProductListPage.goto (G:\HCMUS\NAM3-HK3\Testing\Homework\HW4\hcmus-sw-testing--eshop-sut\tests\test-runs\automation\scripts\product-list-and-search\pages\ProductListPage.ts:72:28)
  >     at G:\HCMUS\NAM3-HK3\Testing\Homework\HW4\hcmus-sw-testing--eshop-sut\tests\test-runs\automation\scripts\product-list-and-se
  >
  > là sao
- **AI output (summary):**
  > Phân tích nguyên nhân timeout do `ProductListPage.goto()` chờ response `/api/products` quá cứng; nếu response không match, bị cache hoặc chậm thì `beforeEach` treo đến 30 giây rồi page bị đóng. Sửa `goto()` thành wait mềm hơn: `page.goto(..., { waitUntil: 'commit' })`, chờ `searchInput` visible, sau đó `Promise.race` giữa API products, product card, empty state hoặc error box với timeout 10 giây. Chạy `tsc --noEmit` pass và smoke test `TC-PLAS-001` không còn timeout beforeEach; test fail do các bug SUT đã biết `BUG-PLAS-001`, `BUG-PLAS-002`, `BUG-PLAS-003`.
- **What the student changed/kept from this output:** Giữ bản sửa wait mềm hơn trong `ProductListPage.goto()` để tránh flaky timeout khi mở trang Product List & Search.

---

### Entry 11

- **Tool:** Codex (GPT-5) via Codex CLI
- **Date/time:** 2026-08-10 10:53
- **Task context:** Rà soát các Page Object khác để tìm lỗi wait tương tự
- **Prompt used (verbatim):**
  > rà soát xem các page object khác có bị tương tự không
- **AI output (summary):**
  > Rà soát `CategoryPage.ts`, `CheckoutPage.ts` và `ProductListPage.ts`. Kết luận Category là API helper nên không có rủi ro `page.waitForLoadState`. Sửa Checkout navigation waits để dùng `waitUntil: 'commit'`, `waitForURL(..., { timeout: 10000 })` và body visible có timeout. Sửa Product search actions (`search`, `clearSearch`, `searchByPressingEnter`) để dùng helper `waitForProductsResponse()` có timeout và fallback UI settled, tránh treo nếu response search không match. Chạy TypeScript checks cho cả 3 suite pass và smoke test `TC-PLAS-002` không timeout, chỉ fail ở bug SUT đã biết `BUG-PLAS-001`.
- **What the student changed/kept from this output:** Giữ các thay đổi wait helper và timeout rõ ràng trong Page Object Model để giảm flaky timeout ở cả navigation và search actions.

---

### Entry 12
- **Tool:** Codex / GPT-5
- **Date/time:** 2026-08-10 11:05
- **Task context:** Đồng bộ tài liệu automation sau khi chạy lại Product List & Search và Checkout
- **Prompt used (verbatim):**
  > tôi mới chạy lại test của product và checkout, hãy dựa vào kết quả cập nhật lại trong các tài liệu
- **AI output (faithful summary):**
  > Đọc Playwright HTML report mới nhất của `product-list-and-search` và `checkout`, giải nén payload report nhúng trong `index.html`, xác nhận mỗi suite có 87 browser runs với 45 passed, 42 failed, 0 flaky/skipped. Phát hiện các tài liệu bị lệch ở `TC-PLAS-012`, `TC-CHECKOUT-006`, `TC-CHECKOUT-007`, `BUG-PLAS-005`, `BUG-CHECKOUT-006` và mô tả `BUG-CHECKOUT-004`; cập nhật status, bug mapping, README và summary để nhất quán với kết quả chạy lại.
- **What the student changed/kept from this output:** Giữ số browser-runs mới nhất, sửa status/mapping sai, và làm rõ khác biệt giữa test case thiết kế với browser runs.

---

### Entry 13
- **Tool:** Codex / GPT-5
- **Date/time:** 2026-08-10 11:11
- **Task context:** Đồng bộ GitHub Issues với bug report automation sau khi cập nhật kết quả chạy lại
- **Prompt used (verbatim):**
  > sync luôn đi
- **AI output (faithful summary):**
  > Dùng GitHub CLI cập nhật issue #250, #252 và #261 theo các file bug report Markdown hiện tại. Issue #250 được đổi title thành "[BUG][Thanh toán][Automation] Backend không đảm bảo total_amount được tính từ dữ liệu server" và cập nhật body có `TC-CHECKOUT-013`, `TC-CHECKOUT-BVA-003`, `total_amount = null`. Issue #252 được cập nhật body để gỡ `TC-CHECKOUT-006/007` và giữ `TC-CHECKOUT-BVA-001`. Issue #261 được cập nhật body để gỡ `TC-PLAS-012` và giữ `TC-PLAS-BVA-004`.
- **What the student changed/kept from this output:** Giữ GitHub Issues đồng bộ với bug report Markdown và traceability mới nhất.
