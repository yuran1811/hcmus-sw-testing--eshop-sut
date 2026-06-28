# Domain Testing Report — HW02

## Feature: Xem danh sách & Tìm kiếm sản phẩm (FR-05)

### B1: Identify Input & Output Variables — Xem danh sách & Tìm kiếm sản phẩm

#### Input Variables

| #   | Variable Name               | Data Type | Constraints                                                     | Source                                          |
| --- | --------------------------- | --------- | --------------------------------------------------------------- | ----------------------------------------------- |
| 1   | search                      | String    | Optional. Tìm kiếm theo tên sản phẩm. Tiêu đề hiển thị an toàn. | UI Search bar / API parameter `?search=keyword` |
| 2   | Product Count (DB State)    | Integer   | Implicit. Số lượng sản phẩm có trong CSDL (>= 0).               | Database (`products` table)                     |
| 3   | API Latency (Network State) | String    | Implicit. Trạng thái tải dữ liệu (loading / loaded).            | Network / API endpoint latency                  |

#### Output Variables

| #   | Variable Name         | Data Type    | Description                                                                               |
| --- | --------------------- | ------------ | ----------------------------------------------------------------------------------------- |
| 1   | Response Status       | Integer      | HTTP status code (200, 500, etc.)                                                         |
| 2   | Product Grid          | HTML Layout  | Lưới hiển thị các thẻ sản phẩm (ảnh tỉ lệ chuẩn có alt text, tên, giá dạng `x.xxx.xxx ₫`) |
| 3   | Query Text Rendered   | String       | Tiêu đề hiển thị từ khóa đã tìm kiếm, phải hiển thị dạng plain text an toàn               |
| 4   | Loading State Display | HTML Element | Trạng thái hiển thị vòng xoay hoặc chữ thông báo đang tải                                 |
| 5   | Empty State Display   | HTML Element | Thông báo khi danh sách sản phẩm trống hoặc không tìm thấy                                |
| 6   | H1 Tag Count          | Integer      | Số lượng thẻ `<h1>` xuất hiện trên trang chủ (bắt buộc đúng 1)                            |

---

### B2: Identify Value Domains — Xem danh sách & Tìm kiếm sản phẩm

#### Input Variable: search

| #   | Domain Type   | Equivalence Class             | Value Range / Description                | Expected                                    |
| --- | ------------- | ----------------------------- | ---------------------------------------- | ------------------------------------------- |
| EC1 | Valid         | Normal valid search term      | Alphanumeric, matches existing products  | Accept & Display matching products          |
| EC2 | Valid         | Empty string                  | `""` or omitted                          | Accept & Display all products               |
| EC3 | Valid         | No matching results           | Alphanumeric, does not match any product | Accept & Display empty state                |
| EC4 | Valid         | Special characters & Unicode  | e.g., "bàn phím @2026"                   | Accept & Display matching products or empty |
| EC5 | Valid         | HTML / Script injection (XSS) | e.g., `<script>alert(1)</script>`        | Accept & Display safely as plain text       |
| EC6 | Valid/Extreme | Extremely long string         | 255+ characters                          | Accept & Handle gracefully (no crash)       |

#### Input Variable: Product Count (DB State)

| #   | Domain Type | Equivalence Class        | Value Range / Description | Expected                         |
| --- | ----------- | ------------------------ | ------------------------- | -------------------------------- |
| EC7 | Valid       | Multiple products exist  | DB has >= 2 products      | Display products in grid layout  |
| EC8 | Valid       | Exactly 1 product exists | DB has exactly 1 product  | Display 1 product in grid layout |
| EC9 | Valid       | No products exist in DB  | DB is empty               | Display empty state message      |

#### Input Variable: API Latency (Network State)

| #    | Domain Type | Equivalence Class              | Value Range / Description | Expected                                         |
| ---- | ----------- | ------------------------------ | ------------------------- | ------------------------------------------------ |
| EC10 | Valid       | API is fetching data (loading) | Request is pending        | Display loading status/indicator                 |
| EC11 | Valid       | API finished fetching          | Request is completed      | Hide loading status, display grid or empty state |

#### Output Variables (Expected Output Domains)

| #   | Domain Type | Equivalence Class          | Value Range / Description                                    | Triggered By                               |
| --- | ----------- | -------------------------- | ------------------------------------------------------------ | ------------------------------------------ |
| OC1 | Valid       | Full product details shown | Displays standard ratio Image with alt text, Name, and Price | Product list matches & loaded successfully |
| OC2 | Valid       | Correct price format       | Price displayed with thousands separator and `₫` unit        | Price loaded (e.g., 100000 -> `100.000 ₫`) |
| OC3 | Valid       | Safely rendered query text | Rendered as text only, no HTML parsed                        | Search query contains HTML tags            |
| OC4 | Valid       | Single H1 header           | Exactly one `<h1>` tag present on the page                   | Page rendering                             |

---

### B3: Select Representative Values — Xem danh sách & Tìm kiếm sản phẩm

#### Input Variable: search

| #   | EC Reference | Representative Value              | Rationale                                          |
| --- | ------------ | --------------------------------- | -------------------------------------------------- |
| 1   | EC1          | `"MacBook Pro M3"`                | Typical alphanumeric search term                   |
| 2   | EC2          | `""` (empty string)               | Boundary: no keyword, should return all products   |
| 3   | EC3          | `"NonExistentProduct12345"`       | Query that is guaranteed not to match              |
| 4   | EC4          | `"Bàn phím"`                      | Contains Vietnamese accents                        |
| 5   | EC5          | `"<script>alert('XSS')</script>"` | Standard script block payload for XSS verification |
| 6   | EC6          | `"A" * 300`                       | Very long query exceeding standard limit           |

#### Input Variable: Product Count (DB State)

| #   | EC Reference | Representative Value | Rationale                    |
| --- | ------------ | -------------------- | ---------------------------- |
| 1   | EC7          | DB has 3 products    | Verify normal grid rendering |
| 2   | EC8          | DB has 1 product     | Verify grid with single card |
| 3   | EC9          | DB has 0 products    | Verify default empty state   |

#### Input Variable: API Latency

| #   | EC Reference | Representative Value         | Rationale                   |
| --- | ------------ | ---------------------------- | --------------------------- |
| 1   | EC10         | Pending request              | Slow 3G network throttling  |
| 2   | EC11         | Resolved request (completed) | Normal fast local execution |

#### Output Variables (Expected Output Verification Points)

| #   | OC Reference | Representative Value              | Rationale                               |
| --- | ------------ | --------------------------------- | --------------------------------------- |
| 1   | OC1          | Image with alt text, Name, Price  | Complete elements of product card       |
| 2   | OC2          | `45.000.000 ₫`                    | Hundreds separator and "₫" character    |
| 3   | OC3          | `"<script>alert('XSS')</script>"` | Rendered safely as plain text, no popup |
| 4   | OC4          | Exactly 1 `<h1>` tag              | Standard homepage SEO constraint        |

---

### B4: Enumerate Partition Scenarios — Xem danh sách & Tìm kiếm sản phẩm

Nominal values for other variables: `Product Count` = 3 (multiple products exist in DB), `API Latency` = resolved (completed), `search` = `"MacBook Pro M3"`.

#### Input Partition Scenarios

| #   | Partition | Variable Tested | Test Value                        | Other Variables                                          | Expected Output (OC)  | Expected Result                      |
| --- | --------- | --------------- | --------------------------------- | -------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1   | EC2       | search          | `""`                              | Count = 3, Latency = resolved                            | OC1, OC2, OC4         | Accept & Show all 3 products         |
| 2   | EC1       | search          | `"MacBook Pro M3"`                | Count = 3, Latency = resolved                            | OC1, OC2, OC4         | Accept & Show matching products      |
| 3   | EC3       | search          | `"NonExistentProduct12345"`       | Count = 3, Latency = resolved                            | OC4, Empty State      | Accept & Show Empty State            |
| 4   | EC4       | search          | `"Bàn phím"`                      | Count = 3 (containing "Bàn phím cơ"), Latency = resolved | OC1, OC2, OC4         | Accept & Show matching products      |
| 5   | EC5       | search          | `"<script>alert('XSS')</script>"` | Count = 3, Latency = resolved                            | OC3, OC4, Empty State | Accept, Display safely as plain text |
| 6   | EC6       | search          | `"A" * 300`                       | Count = 3, Latency = resolved                            | OC4, Empty State      | Accept, Handle gracefully (no crash) |
| 7   | EC7       | Product Count   | 3                                 | search = `""`, Latency = resolved                        | OC1, OC2, OC4         | Accept & Show 3 products             |
| 8   | EC8       | Product Count   | 1                                 | search = `""`, Latency = resolved                        | OC1, OC2, OC4         | Accept & Show 1 product              |
| 9   | EC9       | Product Count   | 0                                 | search = `""`, Latency = resolved                        | OC4, Empty State      | Accept & Show Empty State            |
| 10  | EC10      | API Latency     | pending                           | search = `""`, Count = 3                                 | Loading State         | Show Loading spinner/text            |
| 11  | EC11      | API Latency     | resolved                          | search = `""`, Count = 3                                 | OC1, OC2, OC4         | Show product grid                    |

#### Output Partition Scenarios

| #   | Partition | Output Description                      | Triggering Input Condition                 | Same As Input Scenario                        |
| --- | --------- | --------------------------------------- | ------------------------------------------ | --------------------------------------------- |
| 1   | OC1       | Hiển thị đủ thuộc tính sản phẩm         | Tất cả dữ liệu hợp lệ (EC2, EC7, EC11)     | Scenario #1                                   |
| 2   | OC2       | Giá định dạng đúng phân cách hàng nghìn | Tất cả dữ liệu hợp lệ (EC2, EC7, EC11)     | Scenario #1                                   |
| 3   | OC3       | Tiêu đề tìm kiếm được render an toàn    | Từ khóa chứa HTML/script (EC5, EC7, EC11)  | Scenario #5                                   |
| 4   | OC4       | Đúng duy nhất 1 thẻ `<h1>`              | Mọi trường hợp render trang chủ thành công | Scenarios #1, #2, #3, #4, #5, #7, #8, #9, #11 |

---

### B5: Consolidate into Test Cases — Xem danh sách & Tìm kiếm sản phẩm

#### Consolidation Table

| Scenario(s) Merged                                         | Reason                                                              | Resulting TC                                                                                                                                      |
| ---------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scenario #1 + Scenario #7 + Scenario #11 + OC1 + OC2 + OC4 | Identical test data and output (view all products with empty query) | [TC-PLAS-001](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-001.md) |
| Scenario #2                                                | Matches specific query and filters list                             | [TC-PLAS-002](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-002.md) |
| Scenario #3                                                | Handles non-matching queries, shows empty state                     | [TC-PLAS-003](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-003.md) |
| Scenario #4                                                | Handles Vietnamese search accents                                   | [TC-PLAS-004](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-004.md) |
| Scenario #5 + OC3                                          | Handles HTML script block queries safely (XSS protection)           | [TC-PLAS-005](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-005.md) |
| Scenario #10                                               | Captures system behavior when loading data                          | [TC-PLAS-006](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-006.md) |
| OC4                                                        | Verification of single H1 tag constraints                           | [TC-PLAS-007](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-007.md) |
| Scenario #6, #8, #9                                        | These boundaries are handled under Boundary Value Analysis (BVA)    | Represented in BVA TCs                                                                                                                            |

#### Final Test Case Summary

| #   | TC ID                                                                                                                                             | Description                                                            | Technique | EC/OC Covered                 | Expected                                                           |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------- | ----------------------------- | ------------------------------------------------------------------ |
| 1   | [TC-PLAS-001](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-001.md) | Xem toàn bộ danh sách sản phẩm thành công                              | DT        | EC2, EC7, EC11, OC1, OC2, OC4 | Pass - Grid displays all products with correct format and 1 H1 tag |
| 2   | [TC-PLAS-002](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-002.md) | Tìm kiếm sản phẩm bằng từ khóa hợp lệ có kết quả                       | DT        | EC1, EC7, EC11, OC1, OC2, OC4 | Pass - Grid shows only matching products                           |
| 3   | [TC-PLAS-003](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-003.md) | Tìm kiếm sản phẩm bằng từ khóa không khớp với sản phẩm nào             | DT        | EC3, EC7, EC11, OC4           | Pass - Empty state displayed                                       |
| 4   | [TC-PLAS-004](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-004.md) | Tìm kiếm sản phẩm bằng từ khóa có dấu tiếng Việt và ký tự đặc biệt     | DT        | EC4, EC7, EC11, OC1, OC2, OC4 | Pass - Correct matching for accents                                |
| 5   | [TC-PLAS-005](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-005.md) | Tìm kiếm sản phẩm bằng từ khóa chứa mã độc HTML/XSS (Hiển thị an toàn) | DT        | EC5, EC7, EC11, OC3, OC4      | Pass - Rendered safely as plain text, no script execution          |
| 6   | [TC-PLAS-006](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-006.md) | Kiểm tra trạng thái tải dữ liệu (Loading State)                        | DT        | EC10, EC7, OC4                | Pass - Loading indicator displays while fetching                   |
| 7   | [TC-PLAS-007](file:///g:/HCMUS/NAM3-HK3/Testing/Homework/HW2/hcmus-sw-testing--eshop-sut/tests/test-cases/product-list-and-search/TC-PLAS-007.md) | Kiểm tra cấu trúc thẻ H1 duy nhất trên trang chủ                       | DT        | EC11, OC4                     | Pass - Exactly one H1 tag exists on page                           |
