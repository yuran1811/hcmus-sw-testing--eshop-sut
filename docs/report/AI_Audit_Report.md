# AI Audit Report

"I use AI tools for the following tasks,"

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