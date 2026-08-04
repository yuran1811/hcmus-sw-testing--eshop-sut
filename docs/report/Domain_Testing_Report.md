# Domain Testing Report — HW02

## Feature: Xem danh sách & Tìm kiếm sản phẩm (FR-05)

### B1: Identify Input & Output Variables — Xem danh sách & Tìm kiếm sản phẩm

#### Input Variables

| #   | Variable Name               | Data Type | Constraints                                                     | Source                                          |
| --- | --------------------------- | --------- | --------------------------------------------------------------- | ----------------------------------------------- |
| 1   | search                      | String    | Optional. Tìm kiếm theo tên sản phẩm. Tiêu đề hiển thị an toàn. | UI Search bar / API parameter `?search=keyword` |
| 2   | Product Count (DB State)    | Integer   | Implicit. Số lượng sản phẩm có trong CSDL (>= 0).               | Database (`products` table)                     |
| 3   | API Latency (Network State) | String    | Implicit. Trạng thái tải dữ liệu (loading / loaded).            | Network / API endpoint latency                  |
| 4   | API Outcome                 | Enum      | Thành công, lỗi HTTP hoặc lỗi mạng.                             | `GET /api/products`                             |
| 5   | Product Price (DB State)    | Integer   | Giá cần được trình bày với phân cách hàng nghìn và ký hiệu `₫`. | Database (`products.price`)                     |
| 6   | Product Content (DB State)  | String    | Tên/ảnh là dữ liệu không tin cậy khi render.                    | Database / API response                         |
| 7   | Request Sequence            | Sequence  | Có thể có nhiều yêu cầu tìm kiếm đang chờ đồng thời.            | UI + network timing                             |

#### Output Variables

| #   | Variable Name         | Data Type    | Description                                                                               |
| --- | --------------------- | ------------ | ----------------------------------------------------------------------------------------- |
| 1   | Response Status       | Integer      | HTTP status code (200, 500, etc.)                                                         |
| 2   | Product Grid          | HTML Layout  | Lưới hiển thị các thẻ sản phẩm (ảnh tỉ lệ chuẩn có alt text, tên, giá dạng `x.xxx.xxx ₫`) |
| 3   | Query Text Rendered   | String       | Tiêu đề hiển thị từ khóa đã tìm kiếm, phải hiển thị dạng plain text an toàn               |
| 4   | Loading State Display | HTML Element | Trạng thái hiển thị vòng xoay hoặc chữ thông báo đang tải                                 |
| 5   | Empty State Display   | HTML Element | Thông báo khi danh sách sản phẩm trống hoặc không tìm thấy                                |
| 6   | H1 Tag Count          | Integer      | Số lượng thẻ `<h1>` xuất hiện trên trang chủ (bắt buộc đúng 1)                            |
| 7   | Error State Display   | HTML Element | Lỗi API được kết thúc loading và hiển thị an toàn, không lộ raw HTML/chi tiết CSDL       |
| 8   | Image Alternative Text| String       | Alt text của từng ảnh phải tồn tại, không rỗng và mô tả đúng sản phẩm                    |
| 9   | Final Result State    | UI State     | Sau nhiều request, giao diện phải phản ánh request mới nhất                               |

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
| EC6 | Valid/Extreme | Long robustness string         | 255+ characters; SRS không đặt max           | Accept & Handle gracefully (no crash)       |
| EC12 | Specification gap | Case variation           | Cùng tên nhưng khác chữ hoa/thường        | Policy case-sensitive/insensitive nhất quán; PO chốt |
| EC13 | Valid        | URL-reserved characters       | `%`, `&`, `+`, `#` trong tên/từ khóa      | Encode đúng và tìm theo nguyên giá trị       |
| EC14 | Valid        | SQL metacharacter in real name| Dấu nháy đơn, ví dụ `O'Reilly`            | Xử lý như dữ liệu, không lỗi truy vấn         |
| EC15 | Invalid/Hostile | SQL injection payload       | Ví dụ `' OR 1=1 --`                       | Không thay đổi truy vấn/tập kết quả           |
| EC21 | Specification gap | Search match mode          | Từ khóa chỉ là một phần tên               | Exact/contains policy nhất quán; PO chốt      |

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

#### Input Variable: API Outcome, Product Content & Request Sequence

| #    | Domain Type    | Equivalence Class               | Value Range / Description                         | Expected                                      |
| ---- | -------------- | ------------------------------- | ------------------------------------------------- | --------------------------------------------- |
| EC16 | Invalid/System | API/network failure             | HTTP 500, timeout hoặc mất kết nối                 | Error state an toàn, không crash/lộ raw HTML  |
| EC17 | Valid/Untrusted| Product name contains HTML      | Dữ liệu tên chứa thẻ/event handler                 | Escape và hiển thị plain text                 |
| EC18 | Valid/Timing   | Overlapping search requests     | Response cũ đến sau response mới                   | Kết quả cuối thuộc request mới nhất           |
| EC19 | Valid          | Price below 1000                | `1..999`                                          | Không có phân cách thừa, dùng `₫`             |
| EC20 | Valid          | Price at/above 1000             | `>= 1000`                                         | Có phân cách hàng nghìn đúng, dùng `₫`        |

#### Output Variables (Expected Output Domains)

| #   | Domain Type | Equivalence Class          | Value Range / Description                                    | Triggered By                               |
| --- | ----------- | -------------------------- | ------------------------------------------------------------ | ------------------------------------------ |
| OC1 | Valid       | Full product details shown | Displays standard ratio Image with alt text, Name, and Price | Product list matches & loaded successfully |
| OC2 | Valid       | Correct price format       | Price displayed with thousands separator and `₫` unit        | Price loaded (e.g., 100000 -> `100.000 ₫`) |
| OC3 | Valid       | Safely rendered query text | Rendered as text only, no HTML parsed                        | Search query contains HTML tags            |
| OC4 | Valid       | Single H1 header           | Exactly one `<h1>` tag present on the page                   | Page rendering                             |
| OC5 | Valid/Error | Safe processing/error state| Không raw HTML/SQL/stack trace; có thông báo phù hợp          | EC14, EC15 hoặc EC16                       |
| OC6 | Valid       | Complete empty state       | Có icon/hình minh họa và thông báo thân thiện                 | EC3 hoặc EC9                               |
| OC7 | Valid       | Descriptive image alt      | Alt tồn tại, không rỗng, mô tả đúng sản phẩm                  | Mọi product card                           |
| OC8 | Valid       | Consistent currency unit   | Phân cách hàng nghìn và ký hiệu `₫`, không dùng `VND`         | EC19, EC20                                |
| OC9 | Valid       | Safely rendered product name| Tên từ DB không được parse thành HTML                         | EC17                                      |
| OC10| Valid       | Latest-request-wins        | UI cuối cùng khớp query mới nhất                              | EC18                                      |

---

### B3: Select Representative Values — Xem danh sách & Tìm kiếm sản phẩm

#### Input Variable: search

| #   | EC Reference | Representative Value              | Rationale                                          |
| --- | ------------ | --------------------------------- | -------------------------------------------------- |
| 1   | EC1          | `"MacBook Pro M3"`                | Typical alphanumeric search term                   |
| 2   | EC2          | `""` (empty string)               | Boundary: no keyword, should return all products   |
| 3   | EC3          | `"NonExistentProduct12345"`       | Query that is guaranteed not to match              |
| 4   | EC4          | `"Bàn phím cơ Keychron Q1"`       | Tên đầy đủ có dấu tiếng Việt; không phụ thuộc match-mode |
| 5   | EC5          | `"<script>alert('XSS')</script>"` | Standard script block payload for XSS verification |
| 6   | EC6          | `"A" * 300`                       | Long-query robustness value; not an SRS maximum     |
| 7   | EC12         | `"macbook pro m3"`                | Khác kiểu chữ với dữ liệu `MacBook Pro M3`          |
| 8   | EC13         | `"Cáp USB-C 100% & Sạc + Hub"`    | Tên đầy đủ có Unicode và ký tự dành riêng URL       |
| 9   | EC14         | `"O'Reilly Keyboard"`             | Tên đầy đủ có dấu nháy đơn                          |
| 10  | EC15         | `"' OR 1=1 --"`                  | Payload làm thay đổi truy vấn nếu nối chuỗi         |
| 11  | EC21         | `"MacBook"`                       | Phân biệt exact-match và contains-match             |

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

#### Additional State Variables

| #   | EC Reference | Representative Value                                      | Rationale                              |
| --- | ------------ | --------------------------------------------------------- | -------------------------------------- |
| 1   | EC16         | `GET /api/products` trả HTTP 500                          | Kiểm tra error state và rò rỉ nội dung |
| 2   | EC17         | `<img src=x onerror="window.__productXss=1">`           | Tên sản phẩm là dữ liệu không tin cậy  |
| 3   | EC18         | `MacBook` chậm 2000 ms, `AirPods` chậm 100 ms             | Mô phỏng response về sai thứ tự        |
| 4   | EC19         | `999`                                                     | Ngay dưới ngưỡng phân cách             |
| 5   | EC20         | `1000`, `1001`, `150000`, `45000000`                     | Tại/trên ngưỡng phân cách              |

#### Output Variables (Expected Output Verification Points)

| #   | OC Reference | Representative Value              | Rationale                               |
| --- | ------------ | --------------------------------- | --------------------------------------- |
| 1   | OC1          | Image with alt text, Name, Price  | Complete elements of product card       |
| 2   | OC2          | `45.000.000 ₫`                    | Hundreds separator and "₫" character    |
| 3   | OC3          | `"<script>alert('XSS')</script>"` | Rendered safely as plain text, no popup |
| 4   | OC4          | Exactly 1 `<h1>` tag              | Standard homepage SEO constraint        |
| 5   | OC5          | Thông báo lỗi tiếng Việt, không raw HTML/SQL | Xử lý lỗi an toàn              |
| 6   | OC6          | Icon/hình + thông báo không có kết quả | Empty state theo FR-24             |
| 7   | OC7          | Alt text mô tả đúng từng sản phẩm | Accessibility và FR-05/FR-24            |
| 8   | OC8          | `999 ₫`, `1.000 ₫`, `45.000.000 ₫` | Kiểm tra ngưỡng/đơn vị tiền          |
| 9   | OC9          | Tên chứa HTML hiển thị nguyên văn | Không thực thi dữ liệu từ DB             |
| 10  | OC10         | Kết quả `AirPods` sau hai request | Bảo toàn trạng thái tìm kiếm mới nhất    |

---

### B4: Enumerate Partition Scenarios — Xem danh sách & Tìm kiếm sản phẩm

Nominal values for other variables: `Product Count` = 3 (multiple products exist in DB), `API Latency` = resolved (completed), `search` = `"MacBook Pro M3"`.

#### Input Partition Scenarios

| #   | Partition | Variable Tested | Test Value                        | Other Variables                                          | Expected Output (OC)  | Expected Result                      |
| --- | --------- | --------------- | --------------------------------- | -------------------------------------------------------- | --------------------- | ------------------------------------ |
| 1   | EC2       | search          | `""`                              | Count = 3, Latency = resolved                            | OC1, OC2, OC4         | Accept & Show all 3 products         |
| 2   | EC1       | search          | `"MacBook Pro M3"`                | Count = 3, Latency = resolved                            | OC1, OC2, OC4         | Accept & Show matching products      |
| 3   | EC3       | search          | `"NonExistentProduct12345"`       | Count = 3, Latency = resolved                            | OC4, Empty State      | Accept & Show Empty State            |
| 4   | EC4       | search          | `"Bàn phím cơ Keychron Q1"`       | Có record cùng tên đầy đủ, Latency = resolved              | OC1, OC2, OC4         | Accept & Show exact-name product     |
| 5   | EC5       | search          | `"<script>alert('XSS')</script>"` | Count = 3, Latency = resolved                            | OC3, OC4, Empty State | Accept, Display safely as plain text |
| 6   | EC6       | search          | `"A" * 300`                       | Count = 3, Latency = resolved                            | OC4, Empty State      | Accept, Handle gracefully (no crash) |
| 7   | EC7       | Product Count   | 3                                 | search = `""`, Latency = resolved                        | OC1, OC2, OC4         | Accept & Show 3 products             |
| 8   | EC8       | Product Count   | 1                                 | search = `""`, Latency = resolved                        | OC1, OC2, OC4         | Accept & Show 1 product              |
| 9   | EC9       | Product Count   | 0                                 | search = `""`, Latency = resolved                        | OC4, Empty State      | Accept & Show Empty State            |
| 10  | EC10      | API Latency     | pending                           | search = `""`, Count = 3                                 | Loading State         | Show Loading spinner/text            |
| 11  | EC11      | API Latency     | resolved                          | search = `""`, Count = 3                                 | OC1, OC2, OC4         | Show product grid                    |
| 12  | EC12      | search          | `"macbook pro m3"`              | Có `MacBook Pro M3`                                      | OC1 hoặc OC6, OC2, OC4 | Characterize case policy            |
| 13  | EC13      | search          | `"Cáp USB-C 100% & Sạc + Hub"`  | Có record cùng tên đầy đủ                               | OC1, OC3              | Encode và tìm đúng                   |
| 14  | EC14      | search          | `"O'Reilly Keyboard"`           | Có record cùng tên đầy đủ                               | OC1, OC5              | Không lỗi SQL                        |
| 15  | EC15      | search          | `' OR 1=1 --`                     | Không tên nào khớp                                      | OC3, OC5, OC6         | Không injection, empty state         |
| 16  | EC16      | API Outcome     | HTTP 500                          | search = `""`                                          | OC4, OC5              | Error state an toàn                  |
| 17  | EC17      | Product Content | Tên chứa event handler            | API thành công                                          | OC9                   | Render plain text                    |
| 18  | EC18      | Request Sequence| Response cũ về sau                 | Hai query khác nhau                                     | OC10                  | Giữ kết quả query mới                |
| 19  | EC19/20   | Product Price   | 999/1000/1001                     | API thành công                                          | OC2, OC8              | Định dạng đúng quanh ngưỡng          |
| 20  | EC21      | search          | `"MacBook"`                       | Có hai tên chứa MacBook                                 | OC1/OC6 (conditional) | Characterize exact/contains policy   |

#### Output Partition Scenarios

| #   | Partition | Output Description                      | Triggering Input Condition                 | Same As Input Scenario                        |
| --- | --------- | --------------------------------------- | ------------------------------------------ | --------------------------------------------- |
| 1   | OC1       | Hiển thị đủ thuộc tính sản phẩm         | Tất cả dữ liệu hợp lệ (EC2, EC7, EC11)     | Scenario #1                                   |
| 2   | OC2       | Giá định dạng đúng phân cách hàng nghìn | Tất cả dữ liệu hợp lệ (EC2, EC7, EC11)     | Scenario #1                                   |
| 3   | OC3       | Tiêu đề tìm kiếm được render an toàn    | Từ khóa chứa HTML/script (EC5, EC7, EC11)  | Scenario #5                                   |
| 4   | OC4       | Đúng duy nhất 1 thẻ `<h1>`              | Mọi trường hợp render trang chủ thành công | Scenarios #1, #2, #3, #4, #5, #7, #8, #9, #11 |
| 5   | OC5       | Lỗi được xử lý an toàn                   | SQL metacharacter/payload hoặc lỗi API      | Scenarios #14, #15, #16                         |
| 6   | OC6       | Empty state có minh họa/message          | Không có kết quả hoặc DB trống              | Scenarios #3, #9, #15                           |
| 7   | OC7       | Alt text mô tả đúng                      | Mọi danh sách có sản phẩm                   | Scenarios #1, #2, #4, #7, #8, #11, #12, #13    |
| 8   | OC8       | Giá và đơn vị tiền nhất quán             | Giá sản phẩm quanh/trên 1000                | Scenario #19                                    |
| 9   | OC9       | Tên sản phẩm được escape                 | Tên trong DB chứa HTML                      | Scenario #17                                    |
| 10  | OC10      | Kết quả mới nhất được giữ                | Response hoàn tất sai thứ tự                | Scenario #18                                    |

---

### B5: Consolidate into Test Cases — Xem danh sách & Tìm kiếm sản phẩm

#### Consolidation Table

| Scenario(s) Merged                                         | Reason                                                              | Resulting TC                                                                                                                                      |
| ---------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scenario #1 + Scenario #7 + Scenario #11 + OC1 + OC2 + OC4 | Identical test data and output (view all products with empty query) | [TC-PLAS-001](../../tests/test-cases/product-list-and-search/TC-PLAS-001.md) |
| Scenario #2                                                | Matches specific query and filters list                             | [TC-PLAS-002](../../tests/test-cases/product-list-and-search/TC-PLAS-002.md) |
| Scenario #3                                                | Handles non-matching queries, shows empty state                     | [TC-PLAS-003](../../tests/test-cases/product-list-and-search/TC-PLAS-003.md) |
| Scenario #4                                                | Handles Vietnamese search accents                                   | [TC-PLAS-004](../../tests/test-cases/product-list-and-search/TC-PLAS-004.md) |
| Scenario #5 + OC3                                          | Handles HTML script block queries safely (XSS protection)           | [TC-PLAS-005](../../tests/test-cases/product-list-and-search/TC-PLAS-005.md) |
| Scenario #10                                               | Captures system behavior when loading data                          | [TC-PLAS-006](../../tests/test-cases/product-list-and-search/TC-PLAS-006.md) |
| OC4                                                        | Verification of single H1 tag constraints                           | [TC-PLAS-007](../../tests/test-cases/product-list-and-search/TC-PLAS-007.md) |
| Scenario #6, #8, #9                                        | These boundaries are handled under Boundary Value Analysis (BVA)    | Represented in BVA TCs                                                                                                                            |
| EC21 + EC12                                                | Đặc tả hóa match-mode và case policy còn thiếu trong FR-05           | [TC-PLAS-008](../../tests/test-cases/product-list-and-search/TC-PLAS-008.md), [TC-PLAS-009](../../tests/test-cases/product-list-and-search/TC-PLAS-009.md) |
| EC13                                                       | Ký tự URL cần một fixture riêng                                     | [TC-PLAS-010](../../tests/test-cases/product-list-and-search/TC-PLAS-010.md) |
| EC5 event handler                                          | Bổ sung lớp XSS không dùng thẻ script                               | [TC-PLAS-011](../../tests/test-cases/product-list-and-search/TC-PLAS-011.md) |
| EC14 + EC15 + OC5                                          | Tách tên hợp lệ có nháy đơn khỏi payload SQL injection              | [TC-PLAS-012](../../tests/test-cases/product-list-and-search/TC-PLAS-012.md), [TC-PLAS-013](../../tests/test-cases/product-list-and-search/TC-PLAS-013.md) |
| EC16 + OC5                                                 | Lỗi hệ thống khác với empty state                                   | [TC-PLAS-014](../../tests/test-cases/product-list-and-search/TC-PLAS-014.md) |
| OC6 + OC7 + OC8                                            | Mỗi output requirement cần oracle độc lập                           | [TC-PLAS-015](../../tests/test-cases/product-list-and-search/TC-PLAS-015.md), [TC-PLAS-016](../../tests/test-cases/product-list-and-search/TC-PLAS-016.md), [TC-PLAS-017](../../tests/test-cases/product-list-and-search/TC-PLAS-017.md) |
| EC17 + OC9                                                 | Dữ liệu từ DB cũng phải được escape                                 | [TC-PLAS-018](../../tests/test-cases/product-list-and-search/TC-PLAS-018.md) |
| EC18 + OC10                                                | Kiểm tra trạng thái khi response sai thứ tự                         | [TC-PLAS-019](../../tests/test-cases/product-list-and-search/TC-PLAS-019.md) |

#### Final Test Case Summary

| #   | TC ID                                                                                                                                             | Description                                                            | Technique | EC/OC Covered                 | Expected                                                           |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------- | ----------------------------- | ------------------------------------------------------------------ |
| 1   | [TC-PLAS-001](../../tests/test-cases/product-list-and-search/TC-PLAS-001.md) | Xem toàn bộ danh sách sản phẩm thành công                              | DT        | EC2, EC7, EC11, OC1, OC2, OC4 | Pass - Grid displays all products with correct format and 1 H1 tag |
| 2   | [TC-PLAS-002](../../tests/test-cases/product-list-and-search/TC-PLAS-002.md) | Tìm kiếm sản phẩm bằng từ khóa hợp lệ có kết quả                       | DT        | EC1, EC7, EC11, OC1, OC2, OC4 | Pass - Grid shows only matching products                           |
| 3   | [TC-PLAS-003](../../tests/test-cases/product-list-and-search/TC-PLAS-003.md) | Tìm kiếm sản phẩm bằng từ khóa không khớp với sản phẩm nào             | DT        | EC3, EC7, EC11, OC4           | Pass - Empty state displayed                                       |
| 4   | [TC-PLAS-004](../../tests/test-cases/product-list-and-search/TC-PLAS-004.md) | Tìm kiếm sản phẩm bằng từ khóa có dấu tiếng Việt và ký tự đặc biệt     | DT        | EC4, EC7, EC11, OC1, OC2, OC4 | Pass - Correct matching for accents                                |
| 5   | [TC-PLAS-005](../../tests/test-cases/product-list-and-search/TC-PLAS-005.md) | Tìm kiếm sản phẩm bằng từ khóa chứa mã độc HTML/XSS (Hiển thị an toàn) | DT        | EC5, EC7, EC11, OC3, OC4      | Pass - Rendered safely as plain text, no script execution          |
| 6   | [TC-PLAS-006](../../tests/test-cases/product-list-and-search/TC-PLAS-006.md) | Kiểm tra trạng thái tải dữ liệu (Loading State)                        | DT        | EC10, EC7, OC4                | Pass - Loading indicator displays while fetching                   |
| 7   | [TC-PLAS-007](../../tests/test-cases/product-list-and-search/TC-PLAS-007.md) | Kiểm tra cấu trúc thẻ H1 duy nhất trên trang chủ                       | DT        | EC11, OC4                     | Pass - Exactly one H1 tag exists on page                           |
| 8   | [TC-PLAS-008](../../tests/test-cases/product-list-and-search/TC-PLAS-008.md) | Chính sách exact/contains match                                          | DT/Characterization | EC21, EC7, OC1/OC6, OC2, OC4 | Policy nhất quán, PO chốt |
| 9   | [TC-PLAS-009](../../tests/test-cases/product-list-and-search/TC-PLAS-009.md) | Chính sách case sensitivity                                              | DT/Characterization | EC12, OC1/OC6, OC2, OC4 | Policy nhất quán, PO chốt   |
| 10  | [TC-PLAS-010](../../tests/test-cases/product-list-and-search/TC-PLAS-010.md) | Tìm kiếm ký tự dành riêng URL                                           | DT        | EC4, EC13, OC3                | Encode và tìm đúng                                                  |
| 11  | [TC-PLAS-011](../../tests/test-cases/product-list-and-search/TC-PLAS-011.md) | XSS qua thẻ ảnh/event handler                                           | DT/Security | EC5, OC3                    | Không thực thi HTML                                                 |
| 12  | [TC-PLAS-012](../../tests/test-cases/product-list-and-search/TC-PLAS-012.md) | Tên hợp lệ chứa dấu nháy đơn                                            | DT/Security | EC14, OC5                  | Không lỗi SQL                                                       |
| 13  | [TC-PLAS-013](../../tests/test-cases/product-list-and-search/TC-PLAS-013.md) | SQL injection không đổi tập kết quả                                     | DT/Security | EC15, OC3, OC5             | Payload chỉ là dữ liệu                                              |
| 14  | [TC-PLAS-014](../../tests/test-cases/product-list-and-search/TC-PLAS-014.md) | Lỗi API hiển thị an toàn                                                 | DT        | EC16, OC4, OC5                | Không crash/raw HTML                                                |
| 15  | [TC-PLAS-015](../../tests/test-cases/product-list-and-search/TC-PLAS-015.md) | Empty state đầy đủ                                                       | DT        | EC3, OC6                      | Có minh họa và message                                              |
| 16  | [TC-PLAS-016](../../tests/test-cases/product-list-and-search/TC-PLAS-016.md) | Alt text của mọi ảnh                                                     | DT/Output | OC1, OC7                      | Alt không rỗng, mô tả đúng                                          |
| 17  | [TC-PLAS-017](../../tests/test-cases/product-list-and-search/TC-PLAS-017.md) | Định dạng giá/đơn vị tiền                                                | DT/Output | EC19, EC20, OC2, OC8          | Phân cách đúng và dùng `₫`                                          |
| 18  | [TC-PLAS-018](../../tests/test-cases/product-list-and-search/TC-PLAS-018.md) | Tên sản phẩm chứa HTML được escape                                       | DT/Security | EC17, OC9                  | Render plain text                                                   |
| 19  | [TC-PLAS-019](../../tests/test-cases/product-list-and-search/TC-PLAS-019.md) | Response cũ không ghi đè kết quả mới                                     | DT/Timing | EC18, OC10                    | Latest request wins                                                 |

---

## Feature: Thanh toán (FR-08)

### B1: Identify Input & Output Variables — Thanh toán

#### Input Variables

| #   | Variable Name                 | Data Type | Constraints / Oracle                                                                 | Source                                              |
| --- | ----------------------------- | --------- | ------------------------------------------------------------------------------------ | --------------------------------------------------- |
| 1   | Authorization                 | String    | Bắt buộc. Token JWT hợp lệ từ phiên đăng nhập.                                       | HTTP Request Header `Authorization: Bearer <token>` |
| 2   | Server Cart State             | Object    | Nguồn dữ liệu tin cậy; phải có ít nhất 1 sản phẩm để checkout.                       | Server session/cart                                 |
| 3   | Client `total_amount`         | Number?   | Dữ liệu không tin cậy; backend phải tự tính lại, không persist giá client gửi.       | HTTP Request Body                                   |
| 4   | `shipping_address`            | String?   | Có trong API §4.3 nhưng README chưa nêu required/min/max; cần phân lớp đặc tả hóa.    | HTTP Request Body                                   |
| 5   | Client items/price/quantity   | Object?   | Snapshot từ client không được thay thế server cart hay server product price.         | HTTP Request Body / manipulated request             |
| 6   | Checkout UI State             | UI        | Hiển thị đủ item; tổng tiền tự động và không thể chỉnh sửa trực tiếp.                | Web/Mobile checkout                                 |
| 7   | Concurrent User Cart State    | Object    | Checkout chỉ được xóa cart của user đang thực hiện.                                  | Server session                                      |

#### Output Variables

| #   | Variable Name           | Data Type | Description                                                                  |
| --- | ----------------------- | --------- | ---------------------------------------------------------------------------- |
| 1   | Response Status         | Integer   | Mã phản hồi HTTP (200, 400, 401, 500,...)                                    |
| 2   | Response Message        | String    | Thông điệp phản hồi từ hệ thống (thành công hoặc lỗi)                        |
| 3   | Order Status (DB)       | String    | Trạng thái đơn mới phải là `pending`                                         |
| 4   | Actor Cart State        | Object    | Giỏ của user checkout phải được xóa sau thành công                           |
| 5   | Persisted Order Data    | Object    | Total phải từ server; địa chỉ phải được giữ nguyên theo policy               |
| 6   | Product List UI         | UI        | Hiển thị đầy đủ từng dòng, giá, số lượng và thành tiền                       |
| 7   | Other-user Cart State   | Object    | Không bị thay đổi bởi checkout của user khác                                 |

---

### B2: Identify Value Domains — Thanh toán

#### Input Variable: Authorization

| #   | Domain Type | Equivalence Class | Value Range / Description                           | Expected |
| --- | ----------- | ----------------- | --------------------------------------------------- | -------- |
| EC1 | Valid       | Valid JWT token   | Token được ký hợp lệ và chưa hết hạn của khách hàng | Accept   |
| EC2 | Invalid     | Missing header    | Không truyền header `Authorization`                 | Reject   |
| EC3 | Invalid     | Invalid JWT token | Token sai chữ ký, hết hạn hoặc malformed            | Reject   |

#### Input Variable: Cart State

| #   | Domain Type | Equivalence Class | Value Range / Description                   | Expected |
| --- | ----------- | ----------------- | ------------------------------------------- | -------- |
| EC4 | Valid       | Cart has items    | Số lượng mặt hàng trong giỏ >= 1            | Accept   |
| EC5 | Invalid     | Empty cart        | Giỏ hàng không có sản phẩm nào (0 mặt hàng) | Reject   |

#### Input Variable: total_amount

| #   | Domain Type | Equivalence Class    | Value Range / Description                                     | Expected |
| --- | ----------- | -------------------- | ------------------------------------------------------------- | -------- |
| EC6 | Valid/Untrusted | Client value equals server total | Backend vẫn tự tính lại, không tin trực tiếp giá trị này  | Accept nếu server total hợp lệ |
| EC7 | Invalid/Hostile | Client total mismatch            | Thấp/cao/âm/sai kiểu so với tổng server                    | Ignore hoặc Reject; tuyệt đối không persist giá giả |

#### Input Variable: shipping_address

| #    | Domain Type       | Equivalence Class              | Value Range / Description                                  | Expected |
| ---- | ----------------- | ------------------------------ | ---------------------------------------------------------- | -------- |
| EC8  | Valid             | Normal non-empty string        | `123 Lê Lợi, Quận 1, TP.HCM`                               | Accept & preserve |
| EC9  | Valid             | Unicode and punctuation        | Dấu tiếng Việt, số nhà, `/`, `-`, emoji nếu hỗ trợ         | Không mất/đổi encoding |
| EC10 | Valid/Untrusted   | HTML/XSS string                | `<img ... onerror=...>`                                    | Lưu như dữ liệu và render plain text |
| EC11 | Specification gap | Omitted or `null`              | README không xác định required                             | Hành vi nhất quán, không 5xx/partial state; PO chốt policy |
| EC12 | Specification gap | Empty/whitespace-only          | `""`, `"   "`                                           | Hành vi nhất quán theo policy, không 5xx |
| EC13 | Specification gap | Non-string JSON type           | number, boolean, object, array                             | Preferred reject 400 hoặc documented normalization; không 5xx/partial state |

#### Input Variable: UI, Client Snapshot & Cart Isolation

| #    | Domain Type    | Equivalence Class                  | Value Range / Description                         | Expected |
| ---- | -------------- | ---------------------------------- | ------------------------------------------------- | -------- |
| EC14 | Valid          | Multiple lines / quantity > 1      | Nhiều SKU, ít nhất một dòng có quantity > 1       | UI hiển thị đầy đủ và tính đúng |
| EC15 | Valid          | Auto-calculated read-only total    | Người dùng không sửa trực tiếp được               | UI immutable; backend vẫn enforce |
| EC16 | Valid per FR-08| Client total omitted               | Request không có `total_amount`                   | Server tự tính và tạo đúng total |
| EC17 | Invalid/Hostile| Forged items/price/quantity/total  | Payload khác server cart/catalog                  | Ignore/reject payload giả; không persist |
| EC18 | Valid/State    | Two authenticated users have carts | User A checkout khi cart B cũng tồn tại            | Chỉ cart A bị xóa |

#### Output Variables (Expected Output Domains)

| #   | Domain Type | Equivalence Class | Value Range / Description                          | Triggered By                           |
| --- | ----------- | ----------------- | -------------------------------------------------- | -------------------------------------- |
| OC1 | Valid       | Success checkout  | HTTP 200, tạo đơn "pending", xóa giỏ hàng          | Mọi dữ liệu vào hợp lệ (EC1, EC4, EC6) |
| OC2 | Error       | Unauthorized      | HTTP 401, không tạo đơn hàng                       | Thiếu hoặc sai token (EC2, EC3)        |
| OC3 | Error       | Empty Cart error  | HTTP 400, không tạo đơn hàng                       | Giỏ hàng trống (EC5)                   |
| OC4 | Valid/Safe  | Price Mismatch handling | Từ chối 400/no mutation hoặc bỏ qua giá client và persist server total | Gửi sai tổng tiền (EC7) |
| OC5 | Valid       | Address preserved | Địa chỉ thường/Unicode lưu đúng                    | EC8, EC9                              |
| OC6 | Valid/Safe  | Address rendered safely | Không parse HTML/event handler                | EC10                                  |
| OC7 | Spec gap    | Deterministic missing/blank policy | Không 5xx, không trạng thái dở dang     | EC11, EC12                            |
| OC8 | Spec gap    | Address type policy     | Reject 400 hoặc normalize theo contract; không silent coercion/partial state | EC13 |
| OC9 | Valid       | Full checkout item list | Mọi dòng/quantity/line total đầy đủ              | EC14                                  |
| OC10| Valid       | Immutable UI total | Không editable; thay DOM không đổi server total      | EC15                                  |
| OC11| Valid/Safe  | Authoritative server total | Tự tính khi omitted; bỏ qua/reject dữ liệu giả   | EC16, EC17                            |
| OC12| Valid/State | Per-user cart isolation | Chỉ cart của actor bị clear                       | EC18                                  |

---

### B3: Select Representative Values — Thanh toán

#### Input Variable: Authorization

| #   | EC Reference | Representative Value                      | Rationale                         |
| --- | ------------ | ----------------------------------------- | --------------------------------- |
| 1   | EC1          | `Bearer <valid_token_for_test@eshop.com>` | Token hợp lệ từ API đăng nhập     |
| 2   | EC2          | `null` (omitted)                          | Không truyền header Authorization |
| 3   | EC3          | `Bearer invalid.token.signature`          | Token giả mạo hoặc sai định dạng  |

#### Input Variable: Cart State

| #   | EC Reference | Representative Value                   | Rationale                   |
| --- | ------------ | -------------------------------------- | --------------------------- |
| 1   | EC4          | Giỏ có 1 AirPods Pro 2 + 1 Keychron Q1 | Server total = 10.000.000 ₫ |
| 2   | EC5          | Giỏ hàng trống (0 sản phẩm)            | Server total = 0 ₫          |

#### Input Variable: total_amount

| #   | EC Reference | Representative Value | Rationale                                      |
| --- | ------------ | -------------------- | ---------------------------------------------- |
| 1   | EC6          | `10000000`           | Khớp chính xác tổng tiền 2 sản phẩm trong giỏ  |
| 2   | EC7          | `1000`               | Giá trị thấp hơn thực tế nhằm thử gian lận giá |

#### Input Variable: shipping_address

| #   | EC Reference | Representative Value   | Rationale                            |
| --- | ------------ | ---------------------- | ------------------------------------ |
| 1   | EC8          | `"123 Lê Lợi, Quận 1, TP.HCM"` | Địa chỉ hợp lệ thông thường |
| 2   | EC9          | `"12/3 Đường Nguyễn Huệ – P.Bến Nghé, TP.HCM"` | Unicode và dấu câu |
| 3   | EC10         | `<img src=x onerror="window.__addressXss=1">` | Dữ liệu không tin cậy |
| 4   | EC11         | omitted / `null`        | Khoảng trống đặc tả required/optional |
| 5   | EC12         | `""` / `"   "`        | Empty và whitespace-only |
| 6   | EC13         | `123`, `true`, `{}`, `[]` | Sai kiểu JSON |

#### UI, Client Snapshot & Isolation

| #   | EC Reference | Representative Value                                     | Rationale |
| --- | ------------ | -------------------------------------------------------- | --------- |
| 1   | EC14         | 3 dòng, một dòng quantity = 2                            | Kiểm tra đầy đủ item/line total |
| 2   | EC15         | Total hiển thị dạng text/read-only                       | Không cho sửa ở UI |
| 3   | EC16         | Request bỏ `total_amount`                                | Chứng minh backend là nguồn tính toán |
| 4   | EC17         | price = 1, quantity = 999, total = 1 trong payload giả   | Chống client tampering |
| 5   | EC18         | Cart A và Cart B cùng tồn tại                            | Kiểm tra cô lập phiên |

---

### B4: Enumerate Partition Scenarios — Thanh toán

Nominal values for other variables: `Authorization` = Valid Token, `Cart State` = 1 AirPods Pro 2 + 1 Keychron Q1 (Server Total = 10.000.000 ₫), `total_amount` = `10000000`.

#### Input Partition Scenarios

| #   | Partition | Variable Tested | Test Value             | Other Variables  | Expected Output (OC) | Expected Result           |
| --- | --------- | --------------- | ---------------------- | ---------------- | -------------------- | ------------------------- |
| 1   | EC1       | Authorization   | Valid Token            | all nominal      | OC1                  | Accept (200 OK)           |
| 2   | EC2       | Authorization   | Missing Header         | all nominal      | OC2                  | Reject (401 Unauthorized) |
| 3   | EC3       | Authorization   | Invalid Token          | all nominal      | OC2                  | Reject (401 Unauthorized) |
| 4   | EC4       | Cart State      | 1 AirPods + 1 Keychron | all nominal      | OC1                  | Accept (200 OK)           |
| 5   | EC5       | Cart State      | Empty Cart             | total_amount = 0 | OC3                  | Reject (400 Bad Request)  |
| 6   | EC6       | total_amount    | 10000000               | all nominal      | OC1                  | Accept (200 OK)           |
| 7   | EC7       | total_amount    | 1000                   | all nominal      | OC4                  | Reject/no mutation hoặc accept với server total |
| 8   | EC8       | shipping_address| Địa chỉ thường         | all nominal      | OC5                  | Accept & preserve         |
| 9   | EC9       | shipping_address| Unicode/dấu câu         | all nominal      | OC5                  | Accept, không mất dữ liệu |
| 10  | EC10      | shipping_address| HTML/XSS               | all nominal      | OC6                  | Render plain text         |
| 11  | EC11      | shipping_address| omitted/null           | all nominal      | OC7                  | Deterministic, no 5xx     |
| 12  | EC12      | shipping_address| empty/whitespace        | all nominal      | OC7                  | Theo policy, no 5xx       |
| 13  | EC13      | shipping_address| non-string             | all nominal      | OC8                  | Characterize policy; no 5xx/partial state |
| 14  | EC14      | Checkout items  | multi-line + qty > 1   | auth hợp lệ      | OC9                  | Hiển thị đủ/tính đúng     |
| 15  | EC15      | UI total        | read-only              | cart hợp lệ      | OC10                 | Không chỉnh trực tiếp     |
| 16  | EC16      | total_amount    | omitted                | server cart hợp lệ| OC11                | Server tự tính            |
| 17  | EC17      | Client snapshot | forged values          | server cart hợp lệ| OC11                | Ignore/reject dữ liệu giả |
| 18  | EC18      | Cart isolation  | Users A/B              | A checkout       | OC12                 | Chỉ clear cart A          |

#### Output Partition Scenarios

| #   | Partition | Output Description                       | Triggering Input Condition         | Same As Input Scenario |
| --- | --------- | ---------------------------------------- | ---------------------------------- | ---------------------- |
| 1   | OC1       | Đơn hàng tạo pending & giỏ hàng được xóa | Tất cả các biến hợp lệ             | Scenario #1            |
| 2   | OC2       | Lỗi chưa đăng nhập (401)                 | Token không hợp lệ hoặc thiếu      | Scenario #2, #3        |
| 3   | OC3       | Lỗi giỏ hàng trống (400)                 | Giỏ hàng không có sản phẩm nào     | Scenario #5            |
| 4   | OC4       | Xử lý an toàn sai lệch giá: reject hoặc dùng server total | total_amount gửi khác máy chủ tính | Scenario #7 |
| 5   | OC5       | Địa chỉ được lưu nguyên vẹn               | Địa chỉ thường/Unicode              | Scenarios #8, #9       |
| 6   | OC6       | Địa chỉ render an toàn                    | HTML/XSS trong address              | Scenario #10           |
| 7   | OC7       | Policy thiếu/rỗng nhất quán               | omitted/null/blank                  | Scenarios #11, #12     |
| 8   | OC8       | Policy kiểu dữ liệu có kiểm soát          | non-string address                  | Scenario #13           |
| 9   | OC9       | UI đủ danh sách sản phẩm                  | multi-line cart                     | Scenario #14           |
| 10  | OC10      | Tổng UI không chỉnh được                  | read-only total                     | Scenario #15           |
| 11  | OC11      | Server total authoritative                | omitted/forged client data          | Scenarios #16, #17     |
| 12  | OC12      | Cart tách biệt theo user                  | hai user có cart                    | Scenario #18           |

---

### B5: Consolidate into Test Cases — Thanh toán

#### Consolidation Table

| Scenario(s) Merged                            | Reason                                                          | Resulting TC                                                                                                                               |
| --------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Scenario #1 + Scenario #4 + Scenario #6 + OC1 | Trùng test data và expected output cho luồng chính hợp lệ       | [TC-CHECKOUT-001](../../tests/test-cases/checkout/TC-CHECKOUT-001.md) |
| Scenario #2 + Scenario #3 + OC2               | Kiểm thử bảo mật/phân quyền (chưa đăng nhập hoặc sai token)     | [TC-CHECKOUT-002](../../tests/test-cases/checkout/TC-CHECKOUT-002.md) |
| Scenario #5 + OC3                             | Kiểm thử nghiệp vụ ngăn chặn giỏ hàng rỗng                      | [TC-CHECKOUT-003](../../tests/test-cases/checkout/TC-CHECKOUT-003.md) |
| Scenario #7 + OC4                             | Kiểm thử tính an toàn/giá tiền không cho phép client tự sửa giá | [TC-CHECKOUT-004](../../tests/test-cases/checkout/TC-CHECKOUT-004.md) |
| EC8 + OC5                                      | Địa chỉ thông thường                                            | [TC-CHECKOUT-005](../../tests/test-cases/checkout/TC-CHECKOUT-005.md) |
| EC9 + OC5                                      | Unicode/dấu câu                                                 | [TC-CHECKOUT-006](../../tests/test-cases/checkout/TC-CHECKOUT-006.md) |
| EC10 + OC6                                     | XSS cần oracle render độc lập                                   | [TC-CHECKOUT-007](../../tests/test-cases/checkout/TC-CHECKOUT-007.md) |
| EC11 + OC7                                     | Omitted/null là khoảng trống đặc tả                             | [TC-CHECKOUT-008](../../tests/test-cases/checkout/TC-CHECKOUT-008.md) |
| EC12 + OC7                                     | Empty/whitespace policy                                         | [TC-CHECKOUT-009](../../tests/test-cases/checkout/TC-CHECKOUT-009.md) |
| EC13 + OC8                                     | Khoảng trống schema kiểu JSON                                   | [TC-CHECKOUT-010](../../tests/test-cases/checkout/TC-CHECKOUT-010.md) |
| EC14 + OC9                                     | Danh sách nhiều dòng/quantity                                   | [TC-CHECKOUT-011](../../tests/test-cases/checkout/TC-CHECKOUT-011.md) |
| EC15 + OC10                                    | Total không editable                                            | [TC-CHECKOUT-012](../../tests/test-cases/checkout/TC-CHECKOUT-012.md) |
| EC16 + OC11                                    | Bỏ total để buộc server tự tính                                 | [TC-CHECKOUT-013](../../tests/test-cases/checkout/TC-CHECKOUT-013.md) |
| EC17 + OC11                                    | Payload cart/price giả                                          | [TC-CHECKOUT-014](../../tests/test-cases/checkout/TC-CHECKOUT-014.md) |
| EC18 + OC12                                    | Cô lập cart người dùng                                          | [TC-CHECKOUT-015](../../tests/test-cases/checkout/TC-CHECKOUT-015.md) |

#### Final Test Case Summary

| #   | TC ID                                                                                                                                      | Description                                                              | Technique | EC/OC Covered      | Expected                                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ | --------- | ------------------ | ------------------------------------------ |
| 1   | [TC-CHECKOUT-001](../../tests/test-cases/checkout/TC-CHECKOUT-001.md) | Thanh toán đơn hàng thành công với thông tin hợp lệ                      | DT        | EC1, EC4, EC6, OC1 | Pass - Đơn hàng pending, giỏ hàng được xóa |
| 2   | [TC-CHECKOUT-002](../../tests/test-cases/checkout/TC-CHECKOUT-002.md) | Thanh toán đơn hàng thất bại khi chưa đăng nhập hoặc token không hợp lệ  | DT        | EC2, EC3, OC2      | Fail - Trả về mã lỗi 401                   |
| 3   | [TC-CHECKOUT-003](../../tests/test-cases/checkout/TC-CHECKOUT-003.md) | Thanh toán đơn hàng thất bại khi giỏ hàng trống                          | DT        | EC5, OC3           | Fail - Trả về mã lỗi 400                   |
| 4   | [TC-CHECKOUT-004](../../tests/test-cases/checkout/TC-CHECKOUT-004.md) | Xử lý tổng tiền client không khớp máy chủ                                | DT/Security | EC7, OC4         | Reject hoặc persist đúng server total      |
| 5   | [TC-CHECKOUT-005](../../tests/test-cases/checkout/TC-CHECKOUT-005.md) | Địa chỉ giao hàng thông thường                                          | DT        | EC8, OC5           | Accept & preserve                          |
| 6   | [TC-CHECKOUT-006](../../tests/test-cases/checkout/TC-CHECKOUT-006.md) | Địa chỉ Unicode/dấu câu                                                  | DT        | EC9, OC5           | Không mất encoding                         |
| 7   | [TC-CHECKOUT-007](../../tests/test-cases/checkout/TC-CHECKOUT-007.md) | Địa chỉ HTML/XSS                                                         | DT/Security | EC10, OC6       | Render plain text                          |
| 8   | [TC-CHECKOUT-008](../../tests/test-cases/checkout/TC-CHECKOUT-008.md) | Bỏ thuộc tính hoặc gửi null address                                      | DT/Characterization | EC11, OC7 | Deterministic, no 5xx          |
| 9   | [TC-CHECKOUT-009](../../tests/test-cases/checkout/TC-CHECKOUT-009.md) | Address chỉ whitespace                                                   | DT/Characterization | EC12, OC7 | Theo policy, no 5xx           |
| 10  | [TC-CHECKOUT-010](../../tests/test-cases/checkout/TC-CHECKOUT-010.md) | Chính sách kiểu dữ liệu address                                           | DT/Characterization | EC13, OC8 | Policy rõ, không partial state       |
| 11  | [TC-CHECKOUT-011](../../tests/test-cases/checkout/TC-CHECKOUT-011.md) | UI hiển thị đủ mọi dòng sản phẩm                                         | DT        | EC14, OC9          | Đủ item/quantity/line total                |
| 12  | [TC-CHECKOUT-012](../../tests/test-cases/checkout/TC-CHECKOUT-012.md) | Tổng tiền tự động, không editable                                        | DT        | EC15, OC10         | UI immutable + server enforce              |
| 13  | [TC-CHECKOUT-013](../../tests/test-cases/checkout/TC-CHECKOUT-013.md) | Backend tính tổng khi client bỏ total                                    | DT        | EC16, OC11         | Persist server total                       |
| 14  | [TC-CHECKOUT-014](../../tests/test-cases/checkout/TC-CHECKOUT-014.md) | Backend bỏ qua/từ chối cart/price giả                                    | DT/Security | EC17, OC11      | Không persist dữ liệu giả                  |
| 15  | [TC-CHECKOUT-015](../../tests/test-cases/checkout/TC-CHECKOUT-015.md) | Chỉ xóa cart của actor                                                    | DT/State  | EC18, OC12         | Cart user khác giữ nguyên                  |

---

## Feature: Quản lý Danh mục (FR-14)

### B1: Identify Input & Output Variables — Quản lý Danh mục

#### Input Variables

| #   | Variable Name | Data Type | Constraints                           | Source          |
| --- | ------------- | --------- | ------------------------------------- | --------------- |
| 1   | name          | String    | Bắt buộc, không được để trống         | UI Form / API   |
| 2   | category_id   | Integer   | ID hợp lệ của danh mục đang tồn tại   | UI Action / API |
| 3   | Token         | String    | Bắt buộc, role Admin (Bearer <token>) | HTTP Header     |
| 4   | Category Count| Integer   | Trạng thái tập danh mục, miền tự nhiên `>= 0` | DB / GET response |

#### Output Variables

| #   | Variable Name | Data Type | Description                                         |
| --- | ------------- | --------- | --------------------------------------------------- |
| 1   | Response Code | Integer   | Trạng thái HTTP (200, 201, 204, 400, 401, 403, 404) |
| 2   | Category List | Array     | Danh sách danh mục được trả về hoặc cập nhật        |
| 3   | Error Msg     | String    | Thông báo lỗi khi thất bại                          |
| 4   | Rendered Name | String    | Tên danh mục hiển thị dưới dạng plain text an toàn  |

### B2: Identify Value Domains — Quản lý Danh mục

#### Input Variable: name

| #   | Domain Type | Equivalence Class       | Value Range / Description             | Expected |
| --- | ----------- | ----------------------- | ------------------------------------- | -------- |
| EC1 | Valid       | Tên hợp lệ, chuỗi ký tự | >= 1 ký tự, không chỉ chứa whitespace | Accept   |
| EC2 | Invalid     | Tên rỗng (Empty string) | "" hoặc không gửi trường này          | Reject   |
| EC3 | Invalid     | Chỉ chứa whitespace     | " "                                   | Reject   |
| EC10 | Invalid    | `null`                    | JSON null                              | Reject   |
| EC11 | Invalid    | Non-string                | number, boolean, object, array         | Reject   |
| EC12 | Valid      | Unicode/multibyte         | Tiếng Việt, emoji, ký tự quốc tế       | Accept   |
| EC13 | Specification gap | Duplicate name       | Trùng tên đã tồn tại                   | Accept hoặc reject có kiểm soát; PO chốt uniqueness |
| EC14 | Valid/Untrusted | HTML/XSS payload      | Tên chứa thẻ/event handler             | Lưu và render plain text |
| EC15 | Untrusted  | SQL metacharacters         | Apostrophe/comment/tautology trong tên | Accept literal hoặc safe reject; không thực thi/lộ lỗi |

#### Input Variable: Token

| #   | Domain Type | Equivalence Class        | Value Range / Description               | Expected |
| --- | ----------- | ------------------------ | --------------------------------------- | -------- |
| EC4 | Invalid     | Không có token           | Thiếu Authorization header               | Reject   |
| EC5 | Invalid     | Token không phải Admin   | Token hợp lệ nhưng role = user          | Reject   |
| EC6 | Valid       | Token Admin hợp lệ       | Có chứa role = admin                    | Accept   |
| EC16 | Invalid    | Token malformed/expired  | Sai chữ ký, sai cấu trúc hoặc hết hạn   | Reject 401/403 |

#### Input Variable: category_id

| #   | Domain Type | Equivalence Class    | Value Range / Description            | Expected |
| --- | ----------- | -------------------- | ------------------------------------ | -------- |
| EC7 | Valid       | ID tồn tại           | ID của một danh mục đang có trong DB | Accept   |
| EC8 | Specification gap | ID không tồn tại | ID không có trong DB (VD: 99999) | 404/410 hoặc idempotent có tài liệu; no mutation/false success |
| EC9 | Specification gap/Relational | Có sản phẩm liên kết | Category đang được product tham chiếu | Restrict hoặc safe cascade/reassign; không orphan/partial state |
| EC17 | Invalid/Spec gap | ID sai cú pháp/kiểu | Chuỗi, số thực, ký hiệu, object      | Reject có kiểm soát 400/404; không mutation |
| EC18 | Specification gap | ID đã bị xóa   | Xóa lặp cùng ID hoặc stale state     | Policy 404/410 hoặc idempotent có tài liệu; không mutation |

#### Input Variable: Category Count

| #    | Domain Type | Equivalence Class     | Value Range / Description | Expected |
| ---- | ----------- | --------------------- | ------------------------- | -------- |
| EC19 | Valid       | Empty category set    | 0 category                | HTTP 200 + empty array/state |
| EC20 | Valid       | Exactly one category  | 1 category                | HTTP 200 + one row |
| EC21 | Valid       | Multiple categories   | >= 2 categories           | HTTP 200 + all rows |

#### Output Variables

| #   | Domain Type | Equivalence Class     | Value Range / Description            | Triggered By             |
| --- | ----------- | --------------------- | ------------------------------------ | ------------------------ |
| OC1 | Valid       | Thêm thành công       | HTTP 201 / 200, danh mục mới tạo     | Tạo DM hợp lệ            |
| OC2 | Error       | Validation error      | HTTP 400, tên bắt buộc/sai kiểu/không hợp lệ | EC2, EC3, EC10, EC11 |
| OC3 | Valid       | Trả về danh sách DM   | HTTP 200, mảng danh mục và tên giữ nguyên | Token Admin hợp lệ, EC12 |
| OC4 | Valid       | Xóa thành công        | HTTP 200 / 204, không còn trong list | Xóa với ID tồn tại       |
| OC5 | Error/Spec gap | Missing/stale resource policy | 404/410 hoặc idempotent 200/204 có tài liệu; no mutation/false deleted-count | EC8, EC18 |
| OC6 | Error       | Auth Error (401/403)  | HTTP 401 hoặc 403, từ chối truy cập  | EC4, EC5, EC16           |
| OC7 | Spec gap/Safe | Reference-integrity policy | Reject 400/409 hoặc safe cascade/reassign có tài liệu; không orphan/raw DB/partial state | EC9 |
| OC8 | Valid/Safe  | Safe text rendering   | HTML/XSS trong tên không được thực thi | EC14                    |
| OC9 | Valid/Safe  | Database integrity    | SQL metacharacters được xử lý literal/parameterized | EC15         |
| OC10| Error/Spec gap | Invalid identifier policy | HTTP 400/404, không xóa/thay đổi dữ liệu | EC17               |
| OC11| Valid       | Count-sensitive list  | Empty/one/multiple rows đúng DB             | EC19, EC20, EC21 |
| OC12| Spec gap    | Duplicate-name policy | Accept tạo ID mới hoặc reject 400/409 rõ ràng; không overwrite/500 | EC13 |

### B3: Select Representative Values — Quản lý Danh mục

#### Input Variables

| #   | EC Reference               | Representative Value | Rationale                               |
| --- | -------------------------- | -------------------- | --------------------------------------- |
| 1   | EC1 (Tên hợp lệ)           | Điện tử              | Tên phổ biến, hợp lệ                    |
| 2   | EC2 (Tên rỗng)             | "" (Rỗng)            | Boundary: không có input                |
| 3   | EC3 (Chỉ chứa whitespace)  | " "                  | Invalid data type handling              |
| 4   | EC4 (Không có token)       | Null                 | Không cung cấp header                   |
| 5   | EC5 (Token user)           | JWT (role=user)      | Kiểm tra quyền Admin                    |
| 6   | EC6 (Token Admin)          | JWT (role=admin)     | Quyền truy cập đầy đủ                   |
| 7   | EC7 (ID tồn tại)           | 1                    | ID thực tế có trong hệ thống            |
| 8   | EC8 (ID không tồn tại)     | 99999                | ID không thể có                         |
| 9   | EC9 (Có sản phẩm liên kết) | 1                    | ID danh mục đang chứa sản phẩm liên kết |
| 10  | EC10 (null)                 | `null`               | Phân biệt thiếu/rỗng/null                 |
| 11  | EC11 (sai kiểu)             | `123`, `{}`, `[]`    | Validation JSON shape                    |
| 12  | EC12 (Unicode)              | `Điện tử 📱`         | Multibyte hợp lệ                         |
| 13  | EC13 (trùng tên)            | `Điện tử` lần hai    | SRS không đặt uniqueness                 |
| 14  | EC14 (HTML/XSS)             | `<img src=x onerror=alert(1)>` | Kiểm tra render an toàn       |
| 15  | EC15 (SQL literal)          | `Kid's Toys');--`    | Parameterized query                      |
| 16  | EC16 (token invalid)        | expired/malformed JWT| Xác thực lỗi                             |
| 17  | EC17 (ID sai cú pháp)       | `abc`, `1.5`         | Không phải integer ID                    |
| 18  | EC18 (ID đã xóa)            | ID vừa xóa thành công| Stale resource                           |
| 19  | EC19/20/21 (Count)          | 0 / 1 / 3 categories| Empty/one/multiple                       |

### B4: Enumerate Partition Scenarios — Quản lý Danh mục

Nominal values: name = Điện tử, Token = JWT Admin, category_id = 1 (khi cần)

#### Input Partition Scenarios

| #   | Partition | Variable Tested | Test Value  | Other Variables | Expected Output (OC) | Expected Result |
| --- | --------- | --------------- | ----------- | --------------- | -------------------- | --------------- |
| 1   | EC1       | name            | Điện tử     | all nominal     | OC1                  | Accept          |
| 2   | EC2       | name            | ""          | all nominal     | OC2                  | Reject          |
| 3   | EC3       | name            | " "         | all nominal     | OC2                  | Reject          |
| 4   | EC4       | Token           | Null        | all nominal     | OC6                  | Reject          |
| 5   | EC5       | Token           | JWT (user)  | all nominal     | OC6                  | Reject          |
| 6   | EC6       | Token           | JWT (admin) | all nominal     | OC3                  | Accept          |
| 7   | EC7       | category_id     | 1           | all nominal     | OC4                  | Accept          |
| 8   | EC8       | category_id     | 99999       | all nominal     | OC5                  | Characterize missing-ID policy; no false success/mutation |
| 9   | EC9       | category_id     | 1 (có SP)   | all nominal     | OC7                  | Restrict hoặc safe cascade/reassign; không orphan |
| 10  | EC10      | name            | `null`      | admin token     | OC2                  | Reject          |
| 11  | EC11      | name            | non-string  | admin token     | OC2                  | Reject          |
| 12  | EC12      | name            | `Điện tử 📱`| admin token     | OC1, OC3             | Accept/preserve |
| 13  | EC13      | name            | duplicate   | admin token     | OC12                 | Characterize policy |
| 14  | EC14      | name            | HTML/XSS    | admin token     | OC8                  | Render text     |
| 15  | EC15      | name            | SQL chars   | admin token     | OC9                  | Accept literal hoặc safe reject; không SQL execution/500 |
| 16  | EC16      | Token           | invalid/expired | nominal name | OC6              | Reject          |
| 17  | EC17      | category_id     | string/float| admin token     | OC10                 | Reject 400/404, no mutation |
| 18  | EC18      | category_id     | already deleted | admin token  | OC5                  | Policy-consistent, no mutation |
| 19  | EC19      | Category Count  | 0           | admin token     | OC11                 | Empty list      |
| 20  | EC20      | Category Count  | 1           | admin token     | OC11                 | One row         |
| 21  | EC21      | Category Count  | 3           | admin token     | OC3, OC11            | All rows        |

### B5: Consolidate into Test Cases — Quản lý Danh mục

#### Final Test Case Summary

| #   | TC ID                                                                                                                                      | Description                 | Technique | EC/OC Covered | Expected |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | --------- | ------------- | -------- |
| 1   | [TC-CATEGORY-001](../../tests/test-cases/category/TC-CATEGORY-001.md) | Thêm danh mục thành công    | DT        | EC1, OC1      | Pass     |
| 2   | [TC-CATEGORY-002](../../tests/test-cases/category/TC-CATEGORY-002.md) | Thêm thất bại (tên rỗng)    | DT        | EC2, OC2      | Fail     |
| 3   | [TC-CATEGORY-003](../../tests/test-cases/category/TC-CATEGORY-003.md) | Thêm thất bại (whitespace)  | DT        | EC3, OC2      | Fail     |
| 4   | [TC-CATEGORY-004](../../tests/test-cases/category/TC-CATEGORY-004.md) | Xem danh sách nhiều danh mục| DT        | EC6, EC21, OC3, OC11 | Pass |
| 5   | [TC-CATEGORY-005](../../tests/test-cases/category/TC-CATEGORY-005.md) | Xóa danh mục thành công     | DT        | EC7, OC4      | Pass     |
| 6   | [TC-CATEGORY-006](../../tests/test-cases/category/TC-CATEGORY-006.md) | Chính sách xóa ID không tồn tại | DT/Characterization | EC8, OC5 | No mutation/false deleted-count |
| 7   | [TC-CATEGORY-007](../../tests/test-cases/category/TC-CATEGORY-007.md) | Lỗi xác thực (Auth missing) | DT        | EC4, OC6      | Fail     |
| 8   | [TC-CATEGORY-008](../../tests/test-cases/category/TC-CATEGORY-008.md) | Lỗi phân quyền (User token) | DT        | EC5, OC6      | Fail     |
| 9   | [TC-CATEGORY-009](../../tests/test-cases/category/TC-CATEGORY-009.md) | Xóa category được product tham chiếu | DT/Characterization | EC9, OC7 | Restrict hoặc safe delete; không orphan |
| 10  | [TC-CATEGORY-010](../../tests/test-cases/category/TC-CATEGORY-010.md) | Xóa không có token (401)    | DT        | EC4, OC6      | Fail     |
| 11  | [TC-CATEGORY-011](../../tests/test-cases/category/TC-CATEGORY-011.md) | Xóa dùng token user (403)   | DT        | EC5, OC6      | Fail     |
| 12  | [TC-CATEGORY-012](../../tests/test-cases/category/TC-CATEGORY-012.md) | Thiếu thuộc tính name       | DT        | EC2, OC2      | Reject   |
| 13  | [TC-CATEGORY-013](../../tests/test-cases/category/TC-CATEGORY-013.md) | Name null/sai kiểu          | DT        | EC10, EC11, OC2 | Reject |
| 14  | [TC-CATEGORY-014](../../tests/test-cases/category/TC-CATEGORY-014.md) | Name Unicode/emoji          | DT        | EC12, OC1, OC3 | Accept |
| 15  | [TC-CATEGORY-015](../../tests/test-cases/category/TC-CATEGORY-015.md) | Chính sách tên trùng        | DT/Characterization | EC13, OC12 | Accept hoặc reject có kiểm soát |
| 16  | [TC-CATEGORY-016](../../tests/test-cases/category/TC-CATEGORY-016.md) | Tên chứa HTML/XSS           | DT/Security | EC14, OC8  | Render plain text |
| 17  | [TC-CATEGORY-017](../../tests/test-cases/category/TC-CATEGORY-017.md) | Xử lý an toàn SQL metacharacters | DT/Security | EC15, OC9 | Literal hoặc safe reject; DB nguyên vẹn |
| 18  | [TC-CATEGORY-018](../../tests/test-cases/category/TC-CATEGORY-018.md) | Token sai/hết hạn           | DT        | EC16, OC6     | Reject 401/403 |
| 19  | [TC-CATEGORY-019](../../tests/test-cases/category/TC-CATEGORY-019.md) | category_id sai cú pháp     | DT/Characterization | EC17, OC10 | Reject có kiểm soát, no mutation |
| 20  | [TC-CATEGORY-020](../../tests/test-cases/category/TC-CATEGORY-020.md) | Chính sách xóa lặp ID       | DT/Characterization | EC18, OC5 | Policy rõ, không mutation |

Các lớp số lượng EC19/EC20/EC21 còn được cô lập tại [TC-CATEGORY-BVA-006](../../tests/test-cases/category/TC-CATEGORY-BVA-006.md), [TC-CATEGORY-BVA-007](../../tests/test-cases/category/TC-CATEGORY-BVA-007.md) và [TC-CATEGORY-BVA-008](../../tests/test-cases/category/TC-CATEGORY-BVA-008.md).

---

## Feature: Đăng ký Mobile (FR-01 / FR-20)

### B1: Identify Input & Output Variables — Đăng ký Mobile

#### Input Variables

| #   | Variable Name | Data Type | Constraints                                            | Source  |
| --- | ------------- | --------- | ------------------------------------------------------ | ------- |
| 1   | Full Name     | String    | Bắt buộc, giá trị hiệu dụng sau trim không được rỗng    | UI Form |
| 2   | Email         | String    | Bắt buộc, dạng `user@domain.com`, duy nhất              | UI Form |
| 3   | Password      | String    | Bắt buộc, >=8 ký tự, 1 hoa, 1 thường, 1 số, 1 ký tự trong `@$!%*?&` | UI Form |
| 4   | Confirm Pwd   | String    | Bắt buộc, phải khớp với Password                       | UI Form |

#### Output Variables

| #   | Variable Name | Data Type | Description                                                    |
| --- | ------------- | --------- | -------------------------------------------------------------- |
| 1   | UI State      | UI        | Thành công chuyển hướng login, Thất bại hiển thị lỗi trên form |
| 2   | DB State      | DB        | User được tạo trong hệ thống khi đăng ký hợp lệ                |
| 3   | Form Structure| UI        | Có đủ 4 trường bắt buộc; Email dùng input semantics phù hợp; password/confirm được che; lỗi nằm trên nút submit |

### B2: Identify Value Domains — Đăng ký Mobile

#### Input Variable: Full Name

| #   | Domain Type | Equivalence Class | Expected |
| --- | ----------- | ----------------- | -------- |
| EC1 | Valid       | Có nhập dữ liệu   | Accept   |
| EC2 | Invalid     | Bỏ trống          | Reject   |
| EC17 | Invalid    | Chỉ whitespace    | Reject sau khi trim |
| EC18 | Valid      | Unicode/tiếng Việt có dấu | Accept |

#### Input Variable: Email

| #   | Domain Type | Equivalence Class        | Expected |
| --- | ----------- | ------------------------ | -------- |
| EC3 | Valid       | Email hợp lệ và duy nhất | Accept   |
| EC4 | Invalid     | Bỏ trống                 | Reject   |
| EC5 | Invalid     | Sai định dạng email      | Reject   |
| EC6 | Invalid     | Email đã tồn tại         | Reject   |
| EC19 | Invalid    | Thiếu local-part         | Reject   |
| EC20 | Invalid    | Thiếu nhãn miền          | Reject   |
| EC21 | Invalid    | Thiếu dấu chấm/TLD       | Reject theo dạng `user@domain.com` |
| EC22 | Invalid    | Nhiều hơn một `@`        | Reject   |
| EC23 | Invalid    | Có whitespace nội bộ     | Reject   |

#### Input Variable: Password

| #    | Domain Type | Equivalence Class       | Expected |
| ---- | ----------- | ----------------------- | -------- |
| EC7  | Valid       | Khớp mọi điều kiện      | Accept   |
| EC8  | Invalid     | Bỏ trống                | Reject   |
| EC9  | Invalid     | Nhỏ hơn 8 ký tự         | Reject   |
| EC10 | Invalid     | Không có chữ hoa        | Reject   |
| EC11 | Invalid     | Không có chữ thường     | Reject   |
| EC12 | Invalid     | Không có số             | Reject   |
| EC13 | Invalid     | Không có ký tự đặc biệt | Reject   |
| EC24 | Invalid     | Chỉ có ký tự đặc biệt ngoài tập cho phép | Reject |

#### Input Variable: Confirm Pwd

| #    | Domain Type | Equivalence Class       | Expected |
| ---- | ----------- | ----------------------- | -------- |
| EC14 | Valid       | Khớp với Password       | Accept   |
| EC15 | Invalid     | Bỏ trống                | Reject   |
| EC16 | Invalid     | Không khớp với Password | Reject   |

#### Output Variables

| #   | Domain Type | Equivalence Class      | Triggered By                     |
| --- | ----------- | ---------------------- | -------------------------------- |
| OC1 | Valid       | Thành công             | Tất cả valid (EC1/EC18, EC3, EC7, EC14) |
| OC2 | Error       | Validation Error UI    | EC2, EC4, EC5, EC8–EC13, EC15–EC17, EC19–EC24 |
| OC3 | Error       | Trùng lặp Email UI/API | EC6                              |
| OC4 | Valid/Error | Form đúng FR-01/FR-22   | Có Confirm, 4 dấu `*`, Email dùng email semantics, trường bí mật được che và lỗi nằm trên submit |

### B3: Select Representative Values — Đăng ký Mobile

- EC1: "Nguyen Van A"
- EC2: ""
- EC3: "newuser@gmail.com"
- EC4: ""
- EC5: "invalid-email"
- EC6: "test@eshop.com"
- EC7: "Test1234!"
- EC8: ""
- EC9: "Te1!abc" (7 char)
- EC10: "test1234!"
- EC11: "TEST1234!"
- EC12: "TestPass!"
- EC13: "Test12345"
- EC14: Khớp với mật khẩu trên
- EC15: ""
- EC16: Không khớp (ví dụ "Test1234@")
- EC17: `"   "` (Full Name chỉ whitespace)
- EC18: `"Nguyễn Ánh Dương 😊"` (Unicode/multibyte)
- EC19: `"@domain.com"` (local-part dài 0)
- EC20: `"user@.com"` (thiếu nhãn miền)
- EC21: `"user@domain"` (thiếu dot/TLD)
- EC22: `"user@@domain.com"` (nhiều hơn một `@`)
- EC23: `"user name@domain.com"` (whitespace nội bộ)
- EC24: `"Test123#"` (`#` ngoài tập `@$!%*?&`)
- OC4: đủ Full Name, Email, Password, Confirm Password; 4 dấu `*`; Email có `keyboardType=email-address`/`type=email`; hai trường mật khẩu được che; lỗi nằm trên nút submit.

### B4: Enumerate Partition Scenarios — Đăng ký Mobile

Nominal values: Full Name = Nguyen Van A, Email = newuser@gmail.com, Password = Test1234!, Confirm = Test1234!

| #   | Partition | Tested Variable | Test Value       | Output |
| --- | --------- | --------------- | ---------------- | ------ |
| 1   | EC1...    | All Valid       | Nominal          | OC1    |
| 2   | EC2       | Full Name       | ""               | OC2    |
| 3   | EC4       | Email           | ""               | OC2    |
| 4   | EC5       | Email           | "invalid-email"  | OC2    |
| 5   | EC6       | Email           | "test@eshop.com" | OC3    |
| 6   | EC8       | Password        | ""               | OC2    |
| 7   | EC9       | Password        | "Te1!abc"        | OC2    |
| 8   | EC10      | Password        | "test1234!"      | OC2    |
| 9   | EC11      | Password        | "TEST1234!"      | OC2    |
| 10  | EC12      | Password        | "TestPass!"      | OC2    |
| 11  | EC13      | Password        | "Test12345"      | OC2    |
| 12  | EC15      | Confirm Pwd     | ""               | OC2    |
| 13  | EC16      | Confirm Pwd     | "Test1234@"      | OC2    |
| 14  | EC17      | Full Name       | `"   "`          | OC2    |
| 15  | EC18      | Full Name       | `"Nguyễn Ánh Dương 😊"` | OC1 |
| 16  | EC19      | Email           | `"@domain.com"`  | OC2    |
| 17  | EC20      | Email           | `"user@.com"`    | OC2    |
| 18  | EC21      | Email           | `"user@domain"`  | OC2    |
| 19  | EC22      | Email           | `"user@@domain.com"` | OC2 |
| 20  | EC23      | Email           | `"user name@domain.com"` | OC2 |
| 21  | EC24      | Password        | `"Test123#"`     | OC2    |
| 22  | OC4       | Form Structure  | Kiểm tra field/type/required/error position | OC4 |

### B5: Consolidate into Test Cases — Đăng ký Mobile

#### Final Test Case Summary

| #   | TC ID                                                                                                                                                           | Description         | Technique | EC/OC Covered            | Expected |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | --------- | ------------------------ | -------- |
| 1   | [TC-MOBILE-REGISTER-001](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-001.md) | Hợp lệ              | DT        | EC1, EC3, EC7, EC14, OC1 | Pass     |
| 2   | [TC-MOBILE-REGISTER-002](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-002.md) | Name trống          | DT        | EC2, OC2                 | Fail     |
| 3   | [TC-MOBILE-REGISTER-003](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-003.md) | Email trống         | DT        | EC4, OC2                 | Fail     |
| 4   | [TC-MOBILE-REGISTER-004](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-004.md) | Email sai định dạng | DT        | EC5, OC2                 | Fail     |
| 5   | [TC-MOBILE-REGISTER-005](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-005.md) | Email trùng         | DT        | EC6, OC3                 | Fail     |
| 6   | [TC-MOBILE-REGISTER-006](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-006.md) | Mật khẩu trống      | DT        | EC8, OC2                 | Fail     |
| 7   | [TC-MOBILE-REGISTER-007](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-007.md) | Mật khẩu < 8        | DT        | EC9, OC2                 | Fail     |
| 8   | [TC-MOBILE-REGISTER-008](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-008.md) | Không chữ hoa       | DT        | EC10, OC2                | Fail     |
| 9   | [TC-MOBILE-REGISTER-009](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-009.md) | Không chữ thường    | DT        | EC11, OC2                | Fail     |
| 10  | [TC-MOBILE-REGISTER-010](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-010.md) | Không số            | DT        | EC12, OC2                | Fail     |
| 11  | [TC-MOBILE-REGISTER-011](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-011.md) | Không ký tự ĐB      | DT        | EC13, OC2                | Fail     |
| 12  | [TC-MOBILE-REGISTER-012](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-012.md) | Xác nhận trống      | DT        | EC15, OC2                | Fail     |
| 13  | [TC-MOBILE-REGISTER-013](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-013.md) | Xác nhận sai        | DT        | EC16, OC2                | Fail     |
| 14  | [TC-MOBILE-REGISTER-014](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-014.md) | Name chỉ whitespace | DT        | EC17, OC2                | Reject   |
| 15  | [TC-MOBILE-REGISTER-015](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-015.md) | Name Unicode        | DT        | EC18, EC3, EC7, EC14, OC1 | Accept |
| 16  | [TC-MOBILE-REGISTER-016](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-016.md) | Email thiếu local-part | DT      | EC19, OC2                | Reject   |
| 17  | [TC-MOBILE-REGISTER-017](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-017.md) | Email thiếu nhãn miền | DT      | EC20, OC2                | Reject   |
| 18  | [TC-MOBILE-REGISTER-018](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-018.md) | Email thiếu dot/TLD | DT        | EC21, OC2                | Reject   |
| 19  | [TC-MOBILE-REGISTER-019](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-019.md) | Email nhiều `@`     | DT        | EC22, OC2                | Reject   |
| 20  | [TC-MOBILE-REGISTER-020](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-020.md) | Email có whitespace | DT        | EC23, OC2                | Reject   |
| 21  | [TC-MOBILE-REGISTER-021](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-021.md) | Ký tự đặc biệt ngoài tập | DT   | EC24, OC2                | Reject   |
| 22  | [TC-MOBILE-REGISTER-022](../../tests/test-cases/mobile-register/TC-MOBILE-REGISTER-022.md) | Cấu trúc form/Confirm Password | DT/UI | OC4            | Đúng FR-01/FR-22 |
