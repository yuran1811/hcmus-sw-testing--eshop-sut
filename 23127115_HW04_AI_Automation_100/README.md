# HW04 - Automation Testing Submission README

## 1. Thông tin bài nộp

| Mục                | Nội dung                                                                         |
| ------------------ | -------------------------------------------------------------------------------- |
| Môn học            | Software Testing                                                                 |
| Bài tập            | HW04 - Automation Testing                                                        |
| Hệ thống kiểm thử  | EShop SUT                                                                        |
| Sinh viên          | Mạch Quốc Tấn                                                                    |
| MSSV               | 23127115                                                                         |
| Lớp                | 23KTPM2                                                                          |
| Repository bài làm | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw4/23127115-mqtan |
| Repository SUT gốc | https://github.com/ttbhanh/eshop-sut                                             |
| Ngày cập nhật      | 10/08/2026                                                                       |

README này là trang tổng hợp cho bài nộp HW04. Gồm bảng tự đánh giá, tóm tắt automation, link báo cáo, script, HTML report, bug report, GitHub Issues, AI Audit Report, AI Critique và video demo.

## 2. Bảng tự đánh giá

| STT | Tiêu chí                                                | Điểm tối đa | Điểm tự đánh giá | Bằng chứng chính                                                                                                                                                |
| --- | ------------------------------------------------------- | ----------: | ---------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Nhiệm vụ 1 - Tính năng A: Product List & Search (FR-05) |          25 |               25 | [PLAS scripts](tests/test-runs/automation/scripts/product-list-and-search), [PLAS README](tests/test-runs/automation/scripts/product-list-and-search/README.md) |
| 2   | Nhiệm vụ 1 - Tính năng B: Checkout (FR-08)              |          25 |               25 | [Checkout scripts](tests/test-runs/automation/scripts/checkout), [Checkout README](tests/test-runs/automation/scripts/checkout/README.md)                       |
| 3   | Nhiệm vụ 1 - Tính năng C: Category Management (FR-14)   |          25 |               25 | [Category scripts](tests/test-runs/automation/scripts/category), [Category README](tests/test-runs/automation/scripts/category/README.md)                       |
| 4   | Nhiệm vụ 2 - Video demo                                 |          15 |               15 | [Video demo](https://youtu.be/RM_GT7frNXw)                                                                                                                      |
| 5   | Agent Skills                                            |          10 |               10 | [Agent skills](agents/skills), [Video demo](https://youtu.be/9uhWSAUw3YY)                                                                                       |
|     | **Tổng cộng**                                           |     **100** |          **100** | -                                                                                                                                                               |

## 3. Tính năng được tự động hóa

| Nhóm          | Requirement             | Tính năng             | Test case thiết kế |   Pass |   Fail | Bug report |
| ------------- | ----------------------- | --------------------- | -----------------: | -----: | -----: | ---------: |
| Nhóm A        | FR-05                   | Product List & Search |                 29 |     15 |     14 |          8 |
| Nhóm B        | FR-08                   | Checkout              |                 22 |      8 |     14 |         10 |
| Nhóm C        | FR-14                   | Category Management   |                 28 |     18 |     10 |         10 |
| **Tổng cộng** | **FR-05, FR-08, FR-14** | **3 tính năng web**   |             **79** | **41** | **38** |     **28** |

Ba tính năng đều là tính năng web thuộc các nhóm A, B và C. Không sử dụng tính năng mobile thuộc nhóm D.

## 4. Tóm tắt kết quả automation

| Chỉ số                                          | Kết quả |
| ----------------------------------------------- | ------: |
| Số tính năng được tự động hóa                   |       3 |
| Số test case đã thiết kế                        |      79 |
| Số test case đã tự động hóa/cập nhật trạng thái |      79 |
| Test case Pass                                  |      41 |
| Test case Fail                                  |      38 |
| Browser runs                                    |     276 |
| Passed browser runs                             |     148 |
| Failed browser runs                             |     128 |
| Bug report automation hợp lệ                    |      28 |
| GitHub Issues đã tạo                            |      28 |

Lưu ý: số `failed browser runs` không tương ứng trực tiếp với số bug. Một bug gốc có thể làm nhiều test fail trên nhiều browser, và một test case có thể sinh nhiều browser runs do chạy trên Chromium, Firefox và WebKit. Sau khi phân tích nguyên nhân gốc, 128 failed browser runs được gom thành 28 bug report automation.

## 5. Báo cáo HTML và bằng chứng chạy

Mỗi suite chạy trên 3 browser: Chromium, Firefox và WebKit. Các HTML report đã được cập nhật để hiển thị rõ `Run by: 23127115` và timestamp ISO.

| Suite                 | Browser runs | Passed runs | Failed runs | HTML report                                                                                                            |
| --------------------- | -----------: | ----------: | ----------: | ---------------------------------------------------------------------------------------------------------------------- |
| Category              |          102 |          58 |          44 | [Category Playwright HTML report](tests/test-runs/automation/scripts/category/playwright-report/index.html)            |
| Checkout              |           87 |          45 |          42 | [Checkout Playwright HTML report](tests/test-runs/automation/scripts/checkout/playwright-report/index.html)            |
| Product List & Search |           87 |          45 |          42 | [PLAS Playwright HTML report](tests/test-runs/automation/scripts/product-list-and-search/playwright-report/index.html) |
| **Tổng cộng**         |      **276** |     **148** |     **128** | -                                                                                                                      |

## 6. Data-driven testing và assertion

### 6.1 Công cụ automation Playwright

Bộ kiểm thử sử dụng **Playwright Test với TypeScript** để tự động hóa cả API-level checks và UI-level checks. Mỗi tính năng được tách thành một Playwright project riêng, có `package.json`, `playwright.config.ts`, thư mục `tests/`, `pages/`, `data/`, `playwright-report/` và `test-results/`.

| Nội dung         | Cách triển khai                                                      |
| ---------------- | -------------------------------------------------------------------- |
| Test runner      | Playwright Test                                                      |
| Ngôn ngữ         | TypeScript                                                           |
| Browser projects | Chromium, Firefox, WebKit                                            |
| Report           | Playwright HTML report                                               |
| Report identity  | `Run by: 23127115` và timestamp ISO                                  |
| Mô hình tổ chức  | Page Object Model cho thao tác API/UI, spec files cho từng nhóm test |
| Test artifacts   | `playwright-report/` và `test-results/` trong từng suite             |

Ba suite automation:

| Suite                 | Playwright config                                                                                       | Page Object                                                                                               | Spec files                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Category              | [playwright.config.ts](tests/test-runs/automation/scripts/category/playwright.config.ts)                | [CategoryPage.ts](tests/test-runs/automation/scripts/category/pages/CategoryPage.ts)                      | [category tests](tests/test-runs/automation/scripts/category/tests)            |
| Checkout              | [playwright.config.ts](tests/test-runs/automation/scripts/checkout/playwright.config.ts)                | [CheckoutPage.ts](tests/test-runs/automation/scripts/checkout/pages/CheckoutPage.ts)                      | [checkout tests](tests/test-runs/automation/scripts/checkout/tests)            |
| Product List & Search | [playwright.config.ts](tests/test-runs/automation/scripts/product-list-and-search/playwright.config.ts) | [ProductListPage.ts](tests/test-runs/automation/scripts/product-list-and-search/pages/ProductListPage.ts) | [PLAS tests](tests/test-runs/automation/scripts/product-list-and-search/tests) |

### 6.2 Data-driven JSON

| Suite                 | Data file                                                                                                  | Spec files                                                                     | Ghi chú                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------- |
| Category              | [category-test-data.json](tests/test-runs/automation/scripts/category/data/category-test-data.json)        | [category tests](tests/test-runs/automation/scripts/category/tests)            | CRUD, auth, security, BVA, validate input          |
| Checkout              | [checkout-test-data.json](tests/test-runs/automation/scripts/checkout/data/checkout-test-data.json)        | [checkout tests](tests/test-runs/automation/scripts/checkout/tests)            | API checkout, UI checkout, BVA, integrity/security |
| Product List & Search | [plas-test-data.json](tests/test-runs/automation/scripts/product-list-and-search/data/plas-test-data.json) | [PLAS tests](tests/test-runs/automation/scripts/product-list-and-search/tests) | Equivalence partitioning, UI checks, BVA search    |

Các script dùng dữ liệu ngoài từ JSON thay vì hardcode trực tiếp trong test logic. Các file spec import JSON trực tiếp, sau đó lặp qua từng nhóm dữ liệu để sinh test hoặc dùng dữ liệu theo từng test case.

| Suite                 | Cách dùng JSON                                                                                                                                                                         |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Category              | `category-auth.spec.ts`, `category-bva.spec.ts`, `category-crud.spec.ts`, `category-security.spec.ts` import `category-test-data.json` để chạy CRUD, auth, security và boundary cases. |
| Checkout              | `checkout-api.spec.ts`, `checkout-bva.spec.ts`, `checkout-ui.spec.ts` import `checkout-test-data.json` để kiểm tra token, cart, total amount, shipping address, UI và integrity cases. |
| Product List & Search | `plas-ep.spec.ts`, `plas-bva.spec.ts`, `plas-ui.spec.ts` import `plas-test-data.json` để kiểm tra equivalence partitioning, boundary values, UI/SEO và search edge cases.              |

### 6.3 Assertion patterns

Requirement yêu cầu tối thiểu 3 assertion patterns. Bộ test hiện dùng **ít nhất 8 nhóm assertion pattern**:

| Pattern                                  | Ví dụ assertion                                                                   | Mục đích                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 1. HTTP status assertion                 | `expect(resp.status()).toBe(...)`, `expect(status).not.toBe(500)`                 | Kiểm tra API trả đúng status, không crash server                |
| 2. Response body / field assertion       | `expect(body.message).toContain(...)`, `expect(body.orderId).toBeTruthy()`        | Kiểm tra nội dung response và field nghiệp vụ                   |
| 3. Data persistence / database assertion | `expect(order.total_amount).toBe(...)`, `expect(cartItems).toHaveLength(0)`       | Kiểm tra dữ liệu lưu sau thao tác checkout/category             |
| 4. UI visibility / state assertion       | `await expect(locator).toBeVisible()`, `await expect(errorBox).not.toBeVisible()` | Kiểm tra trạng thái hiển thị trên frontend                      |
| 5. Text / value / attribute assertion    | `toContainText`, `toHaveAttribute('alt', /.+/)`, `toContain('₫')`                 | Kiểm tra nội dung UI, alt text, giá tiền, empty state           |
| 6. URL / navigation assertion            | `await expect(page).toHaveURL(...)`, `expect(page.url()).toContain(...)`          | Kiểm tra điều hướng đúng trang                                  |
| 7. Count / length assertion              | `toHaveLength`, `toBeGreaterThan`, `toBeGreaterThanOrEqual`, `toBe(1)`            | Kiểm tra số lượng item, sản phẩm, category, heading             |
| 8. Negative / security assertion         | `not.toContain(...)`, `not.toBe(...)`, `expected_status_oneOf`                    | Kiểm tra XSS/SQL payload, dữ liệu giả mạo, phân quyền, lỗi biên |

Ngoài các pattern trên, một số test dùng `expect.soft(...)` để ghi nhận nhiều lỗi trong cùng một luồng kiểm thử và `expect.poll(...)` để chờ trạng thái UI ổn định hơn.

## 7. Bug report và GitHub Issues

| Module                | Bug report | GitHub Issue                                                                                                                                              | Evidence                |
| --------------------- | ---------: | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Category              |         10 | [#237](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/237) - [#246](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/246) | API assertion log       |
| Checkout              |         10 | [#247](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/247) - [#256](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/256) | API log + UI screenshot |
| Product List & Search |          8 | [#257](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/257) - [#264](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/264) | Playwright screenshot   |
| **Tổng cộng**         |     **28** | **#237 - #264**                                                                                                                                           | -                       |

Tài liệu liên quan:

- [Bug_Report.md](report/Bug_Report.md)
- [Bug reports chi tiết](tests/bug-reports/automation)
- [Ảnh minh họa GitHub Issues](report/images)

## 8. Báo cáo chính và tài liệu thiết kế

| Hạng mục                | Tài liệu                                                                       |
| ----------------------- | ------------------------------------------------------------------------------ |
| Báo cáo chính           | [Main_Report.md](report/Main_Report.md)                                        |
| Domain Testing          | [Domain_Testing_Report.md](report/Domain_Testing_Report.md)                    |
| Boundary Value Analysis | [Boundary_Value_Analysis_Report.md](report/Boundary_Value_Analysis_Report.md)  |
| Automation test summary | [test-summary-report.md](tests/test-summary/automation/test-summary-report.md) |
| Traceability matrix     | [traceability-matrix.md](tests/test-summary/automation/traceability-matrix.md) |
| Bug report tổng hợp     | [Bug_Report.md](report/Bug_Report.md)                                          |

## 9. AI usage, audit và critique

| Yêu cầu                         | Bằng chứng                                      |
| ------------------------------- | ----------------------------------------------- |
| Khai báo sử dụng AI             | [AI_Audit_Report.md](report/AI_Audit_Report.md) |
| Nhật ký prompt/output từng lượt | [AI_Audit_Report.md](report/AI_Audit_Report.md) |
| Phản biện AI 200-300 từ         | [AI_Critique.md](report/AI_Critique.md)         |
| Rà soát script do AI tạo        | [Main_Report.md](report/Main_Report.md))        |

AI được dùng để hỗ trợ tạo script, refactor data-driven, rà soát kết quả, lập bug report và viết báo cáo. Các script cuối cùng đã được rà soát lại thủ công, siết assertion, sửa wait/selector và phân biệt lỗi script với bug thật của SUT.

## 10. Agent Skills nộp kèm

| Skill                                                              | Mục đích                                                                                          |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| [playwright-ai-automation](agents/skills/playwright-ai-automation) | Quy trình AI-first cho Playwright automation, data-driven, multi-browser, report và bug reporting |
| [ai-audit-report](agents/skills/ai-audit-report)                   | Ghi nhật ký tương tác AI và hỗ trợ AI critique                                                    |
| [test-run-reporter](agents/skills/test-run-reporter)               | Cập nhật test run, bug reports, test case status và evidence                                      |
| [test-writer](agents/skills/test-writer)                           | Hỗ trợ viết test case/report theo cấu trúc môn học                                                |

## 11. Video demo

- **Link video demo:** https://youtu.be/RM_GT7frNXw
- **Yêu cầu:** video YouTube unlisted, tối thiểu 5 phút, thuyết minh tiếng Việt.
- **Nội dung cần thể hiện:** chạy một suite automation từ đầu đến cuối, chạy đa trình duyệt, mở HTML report, trình bày `Run by: 23127115`, giải thích ít nhất một lỗi đã sửa trong script do AI tạo.
- **Bằng chứng tác giả:** video cần có face-cam hoặc terminal hiển thị `whoami` và `hostname`.

## 12. Git commit log

| Yêu cầu                                                                     | Kết quả hiện tại                                  |
| --------------------------------------------------------------------------- | ------------------------------------------------- |
| Tối thiểu 8 commit chạm file `.spec.ts` hoặc tương đương                    | Đạt                                               |
| Số commit chạm file `.spec.ts` kiểm tra bằng `git log --all -- "*.spec.ts"` | 38                                                |
| File log nộp kèm                                                            | [git_commit_logs.txt](report/git_commit_logs.txt) |

File log được xuất bằng lệnh:

```powershell
git log --oneline --name-only -- "*.spec.ts" > docs/report/git_commit_logs.txt
```

## 13. Cấu trúc nộp bài đề xuất

| Hạng mục bắt buộc          | Đường dẫn trong repository                                                                                                                                                                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| README tổng hợp            | [README.md](report/README.md)                                                                                                                                                                                                                                                                    |
| Báo cáo chính Markdown/PDF | [Main_Report.md](report/Main_Report.md)                                                                                                                                                                                                                                                          |
| Báo cáo thiết kế test      | [Domain_Testing_Report.md](report/Domain_Testing_Report.md), [Boundary_Value_Analysis_Report.md](report/Boundary_Value_Analysis_Report.md)                                                                                                                                                       |
| Automation scripts         | [tests/test-runs/automation/scripts](tests/test-runs/automation/scripts)                                                                                                                                                                                                                         |
| File dữ liệu JSON          | [Category data](tests/test-runs/automation/scripts/category/data/category-test-data.json), [Checkout data](tests/test-runs/automation/scripts/checkout/data/checkout-test-data.json), [PLAS data](tests/test-runs/automation/scripts/product-list-and-search/data/plas-test-data.json)           |
| HTML reports               | [Category report](tests/test-runs/automation/scripts/category/playwright-report/index.html), [Checkout report](tests/test-runs/automation/scripts/checkout/playwright-report/index.html), [PLAS report](tests/test-runs/automation/scripts/product-list-and-search/playwright-report/index.html) |
| Test results/artifacts     | [tests/test-runs/automation/scripts](tests/test-runs/automation/scripts)                                                                                                                                                                                                                         |
| Test summary               | [tests/test-summary/automation](tests/test-summary/automation)                                                                                                                                                                                                                                   |
| Bug reports                | [tests/bug-reports/automation](tests/bug-reports/automation), [Bug_Report.md](report/Bug_Report.md)                                                                                                                                                                                              |
| GitHub Issues evidence     | [docs/report/images](report/images), [GitHub Issues](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues)                                                                                                                                                                            |
| AI Audit Report            | [AI_Audit_Report.md](report/AI_Audit_Report.md)                                                                                                                                                                                                                                                  |
| AI Critique                | [AI_Critique.md](report/AI_Critique.md)                                                                                                                                                                                                                                                          |
| Agent Skills               | [agents/skills](agents/skills)                                                                                                                                                                                                                                                                   |
| Video demo link            | https://youtu.be/RM_GT7frNXw                                                                                                                                                                                                                                                                     |
| Git commit log             | [git_commit_logs.txt](report/git_commit_logs.txt)                                                                                                                                                                                                                                                |
