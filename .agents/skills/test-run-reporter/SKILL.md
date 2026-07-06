---
name: test-run-reporter
description: >
  Đóng gói quy trình báo cáo kết quả test run thủ công. Nhận kết quả test
  (pass/fail/blocked) và ghi chú từ tester, sau đó tự động cập nhật test run
  table, tạo/cập nhật bug reports, cập nhật status test case, và quản lý
  screenshot evidence. Sử dụng skill này khi user đính kèm kết quả test đã
  thực hiện thủ công và muốn cập nhật toàn bộ tài liệu liên quan.
---

# Agent Skill: Test Run Reporter

## Metadata

| Field    | Value                                                                    |
| -------- | ------------------------------------------------------------------------ |
| Skill ID | `test-run-reporter`                                                      |
| Version  | 1.0                                                                      |
| Author   | Mạch Quốc Tấn                                                            |
| Created  | 2026-06-28                                                               |
| Reusable | Yes — works for any module of EShop SUT                                  |
| Purpose  | Cập nhật toàn bộ tài liệu test dựa trên kết quả test thủ công của tester |

## Purpose

Skill này nhận **kết quả test đã thực hiện thủ công** từ tester và tự động hoá
toàn bộ quy trình ghi chép tài liệu:

1. Cập nhật bảng test run (`sprint-X-test-run.md`)
2. Tạo bug report mới hoặc cập nhật bug report cũ
3. Cập nhật status trong test case file
4. Quản lý và rename screenshot evidence

Skill này **KHÔNG** chạy test tự động — nó chỉ xử lý phần báo cáo.

---

## Prerequisites

1. Test case files đã tồn tại trong `tests/test-cases/{module-slug}/`
2. Test run file đã tồn tại trong `tests/test-runs/`
3. User đã thực hiện test thủ công và có kết quả

---

## Input

User cung cấp thông tin kèm khi đính kèm skill (trong prompt hoặc qua file đính kèm):

| Thông tin          | Bắt buộc | Mô tả                                                       | Ví dụ                                     |
| ------------------ | -------- | ----------------------------------------------------------- | ----------------------------------------- |
| Test Case ID(s)    | Có       | Danh sách TC cần báo cáo                                    | `TC-PLAS-004, TC-PLAS-005`                |
| Kết quả            | Có       | Pass / Fail / Blocked                                       | `Fail`                                    |
| Ghi chú / Nhận xét | Có*      | Mô tả lỗi hoặc nhận xét (*bắt buộc nếu Fail)                | `Có 2 thẻ <h1>, không có alt text`        |
| Screenshot path    | Không    | Đường dẫn file screenshot (nếu user đã chụp)                | `tests/bug-reports/screenshots/image.png` |
| Test run file      | Không    | File test run cần cập nhật (mặc định: tự tìm file mới nhất) | `tests/test-runs/sprint-1-test-run.md`    |
| Bugs đã tồn tại    | Không    | Nếu user biết lỗi giống bug cũ, chỉ rõ BUG IDs              | `Lỗi giống BUG-PLAS-001, BUG-PLAS-002`    |

### Cách user thường cung cấp input

User có thể cung cấp thông tin dưới nhiều dạng khác nhau:

**Dạng 1 — Trực tiếp trong prompt:**

> Tôi vừa test xong TC-PLAS-004, kết quả Fail. Lỗi giống 001 (có 2 thẻ h1, không có alt text). Screenshot đã lưu ở screenshots/image.png

**Dạng 2 — Cập nhật trực tiếp vào test run table:**

> User tự điền Note vào bảng test run rồi nói: "tôi đã cập nhật kết quả trong note, hãy thêm bug và cập nhật các thứ liên quan"

**Dạng 3 — Đính kèm file test run đã có note:**

> User @mention file `sprint-1-test-run.md` đã có Note column được điền

---

## Execution Workflow

### PHASE 1: DISCOVERY — Thu thập thông tin

#### Step 1.1: Xác định Module Slug

Từ Test Case ID, trích xuất module slug:

- `TC-PLAS-XXX` → module slug = `product-list-and-search`, prefix = `PLAS`
- Pattern chung: `TC-{PREFIX}-{NNN}` → tìm thư mục tương ứng trong `tests/test-cases/`

#### Step 1.2: Đọc Test Run File

1. Nếu user chỉ định file cụ thể → dùng file đó
2. Nếu không → tìm file `sprint-*-test-run.md` trong `tests/test-runs/`
3. Parse bảng Markdown để tìm row tương ứng với Test Case ID
4. Kiểm tra xem đã có kết quả chưa (tránh ghi đè)

#### Step 1.3: Đọc Test Case Files

Đọc nội dung các file `TC-{PREFIX}-{NNN}.md` liên quan để hiểu:

- Test case đang test gì (title, requirement)
- Expected result là gì
- Status hiện tại

#### Step 1.4: Scan Bug Reports Hiện Có

1. Liệt kê toàn bộ `BUG-{PREFIX}-*.md` trong `tests/bug-reports/{module-slug}/`
2. Đọc từng bug report, ghi nhận:
   - Bug ID
   - Title (mô tả lỗi)
   - `Found by Test Case` (danh sách TC)
3. Xác định BUG ID tiếp theo nếu cần tạo bug mới:
   - Tìm số lớn nhất trong các BUG ID hiện có, +1

---

### PHASE 2: BUG ANALYSIS — Phân tích lỗi

#### Step 2.1: Phân loại ghi chú của tester và quy tắc tách bug

Từ ghi chú/nhận xét của tester, xác định danh sách các vấn đề riêng biệt.

> [!IMPORTANT]
> **QUY TẮC TÁCH BUG (BUG SPLITTING):**
> Luôn tách các vấn đề có bản chất khác nhau về mặt kỹ thuật, chức năng hoặc độ nghiêm trọng (severity) thành các bug report riêng biệt.
>
> - **KHÔNG** gộp chung lỗi semantic/SEO (như dư thừa thẻ `<h1>`) chung với các lỗi hiển thị thô/crash backend (như raw exception/stack trace) hay lỗi định dạng tiền tệ.
> - Nếu một test case phát hiện 2 lỗi thuộc 2 nhóm khác nhau, phải cập nhật/tạo 2 bug reports riêng.

**Ví dụ:** Ghi chú `"Có 3 thẻ <h1>, hiển thị lỗi hệ thống thay vì empty state"` → 2 vấn đề hoàn toàn khác nhau cần xử lý riêng:

1. Dư thừa thẻ `<h1>` (Gom/cập nhật vào `BUG-PLAS-001` đã có)
2. Hiển thị lỗi hệ thống thô/raw stack trace (Tạo mới `BUG-PLAS-005`)

#### Step 2.2: So khớp với Bug Reports hiện có

Với mỗi vấn đề riêng biệt đã phân tách:

1. **Tìm kiếm bug report đã tồn tại** có mô tả tương tự:
   - So sánh title và actual result trong các BUG files đã đọc ở Step 1.4
   - Nếu user nói rõ "lỗi giống BUG-XXX" → xác nhận khớp trực tiếp

2. **Quyết định hành động:**
   - **Bug đã tồn tại** → KHÔNG tạo mới, chỉ cập nhật (xem Phase 3A)
   - **Bug mới** → Tạo file mới (xem Phase 3B)

#### Step 2.3: Xác nhận với user nếu không chắc chắn

Nếu agent không chắc một vấn đề trong ghi chú có khớp với bug cũ hay không hoặc phân vân về việc tách bug:

- Hỏi user để xác nhận trước khi tạo bug mới
- Liệt kê các bug hiện có có vẻ liên quan

---

### PHASE 3A: CẬP NHẬT BUG REPORT CŨ (bug đã tồn tại)

Khi test case mới phát hiện bug giống bug đã ghi nhận:

#### Step 3A.1: Cập nhật `Found by Test Case`

Trong file bug report hiện có, thêm TC ID mới vào danh sách:

**Trước:**

```markdown
## Found by Test Case

TC-PLAS-001
```

**Sau:**

```markdown
## Found by Test Case

TC-PLAS-001, TC-PLAS-004
```

#### Step 3A.2: Thêm Evidence Screenshot

Nếu test case mới có screenshot riêng, thêm vào section Evidence:

```markdown
## Evidence

- **TC-PLAS-001 (Xem danh sách):**
  ![Evidence 1](../screenshots/TC-PLAS-001.png)
- **TC-PLAS-004 (Test case mô tả):**
  ![Evidence 2](../screenshots/TC-PLAS-004.png)
```

---

### PHASE 3B: TẠO BUG REPORT MỚI (bug mới)

#### Step 3B.1: Xác định thông tin bug

| Trường             | Cách xác định                                                    |
| ------------------ | ---------------------------------------------------------------- |
| Bug ID             | `BUG-{PREFIX}-{NNN}` với NNN = max hiện có + 1                   |
| Title              | Dựa trên mô tả lỗi trong ghi chú, viết bằng tiếng Việt           |
| Module             | Tên module đầy đủ (VD: `Product List & Search`)                  |
| Severity           | Critical / Major / Minor / Cosmetic — dựa trên impact của lỗi    |
| Priority           | P0 / P1 / P2 / P3 — dựa trên severity và frequency               |
| Requirement        | Lấy từ test case file (Requirement ID)                           |
| Steps to reproduce | Dựa trên Test Steps trong test case file, điều chỉnh cho phù hợp |
| Expected result    | Dựa trên Expected Result trong test case file                    |
| Actual result      | Dựa trên ghi chú của tester                                      |

#### Step 3B.2: Tạo file bug report

Tạo file tại: `tests/bug-reports/{module-slug}/BUG-{PREFIX}-{NNN}.md`

> **QUAN TRỌNG:** Tuân thủ format trong `references/conventions.md`.
> Đặc biệt: KHÔNG bao gồm block mô tả labels.

#### Step 3B.3: Gắn Evidence

- Nếu có screenshot → tham chiếu trong section Evidence
- Nếu screenshot cần rename → rename theo convention `TC-{PREFIX}-{NNN}.png`

---

### PHASE 4: CẬP NHẬT TEST CASE FILES

Với mỗi Test Case ID được báo cáo:

#### Step 4.1: Cập nhật Status

Mở file `tests/test-cases/{module-slug}/TC-{PREFIX}-{NNN}.md` và sửa section cuối:

**Nếu Pass:**

```markdown
## Status / Related bugs

Pass / None
```

**Nếu Fail:**

```markdown
## Status / Related bugs

Fail / BUG-{PREFIX}-{NNN1}, BUG-{PREFIX}-{NNN2}
```

Danh sách bug bao gồm **tất cả** BUG IDs liên quan (cả bug mới tạo và bug cũ được cập nhật).

---

### PHASE 5: CẬP NHẬT TEST RUN TABLE

#### Step 5.1: Cập nhật bảng

Trong file test run, cập nhật row tương ứng với mỗi Test Case ID:

| Column      | Giá trị                                                    |
| ----------- | ---------------------------------------------------------- |
| Result      | `Pass`, `Fail`, hoặc `Blocked`                             |
| Related Bug | Danh sách BUG IDs (phân cách bằng dấu phẩy), hoặc để trống |
| Note        | Ghi chú ngắn gọn từ tester (tiếng Việt)                    |

> **Lưu ý:** KHÔNG dùng hyperlinks trong bảng test run.

---

### PHASE 6: QUẢN LÝ SCREENSHOT

#### Step 6.1: Kiểm tra và rename screenshot

1. Nếu user lưu screenshot với tên tạm (VD: `image.png`):
   - Rename thành `TC-{PREFIX}-{NNN}.png` theo convention
   - Di chuyển vào `tests/bug-reports/screenshots/` nếu chưa đúng thư mục

2. Nếu screenshot đã có tên đúng → không làm gì thêm

#### Step 6.2: Kiểm tra references

Đảm bảo tất cả bug reports tham chiếu đúng tên file screenshot sau khi rename.

---

### PHASE 7: TỔNG KẾT

#### Step 7.1: Tóm tắt thay đổi

Sau khi hoàn tất, cung cấp cho user bản tóm tắt:

```
📋 Đã cập nhật kết quả test:
  - TC-PLAS-004: Fail
  - TC-PLAS-005: Pass

🐛 Bug reports:
  - BUG-PLAS-001: Cập nhật Found by (thêm TC-PLAS-004)
  - BUG-PLAS-005: Tạo mới — [mô tả]

📝 Files đã thay đổi:
  - tests/test-runs/sprint-1-test-run.md
  - tests/test-cases/product-list-and-search/TC-PLAS-004.md
  - tests/bug-reports/product-list-and-search/BUG-PLAS-001.md
  - ...
```

#### Step 7.2: Gợi ý commit

Đề xuất git commit message cho user:

```
test: record TC-{IDs} result and update bug reports
```

**KHÔNG** tự commit — để user tự quyết định.

---

## Quy tắc tham chiếu

Đọc file `references/conventions.md` (cùng thư mục với SKILL.md) để biết:

- Format chi tiết của bug report
- Test case status format
- Screenshot naming convention
- Quy ước đơn vị tiền tệ, ngôn ngữ
- Module slug mapping

---

## Ví dụ quy trình hoàn chỉnh

### Scenario: User báo cáo TC-PLAS-004 Fail, lỗi giống TC-PLAS-001

**User input:**

> Tôi vừa test TC-PLAS-004, Fail. Lỗi giống 001 — có 2 thẻ h1, không có alt text, tiền tệ hiển thị VND. Screenshot đã lưu tại screenshots/TC-PLAS-004.png

**Agent thực hiện:**

1. **Discovery:**
   - Module: `product-list-and-search`
   - Đọc `TC-PLAS-004.md` → Requirement FR-05
   - Scan bugs: BUG-PLAS-001 (h1), BUG-PLAS-002 (alt), BUG-PLAS-003 (VND)

2. **Bug Analysis:**
   - "2 thẻ h1" → khớp BUG-PLAS-001 ✓
   - "không có alt text" → khớp BUG-PLAS-002 ✓
   - "tiền tệ VND" → khớp BUG-PLAS-003 ✓
   - Không có bug mới → chỉ cập nhật

3. **Cập nhật Bug Reports cũ:**
   - BUG-PLAS-001: Found by → thêm `TC-PLAS-004`, thêm evidence
   - BUG-PLAS-002: Found by → thêm `TC-PLAS-004`, thêm evidence
   - BUG-PLAS-003: Found by → thêm `TC-PLAS-004`, thêm evidence

4. **Cập nhật TC-PLAS-004.md:**

   ```
   ## Status / Related bugs
   Fail / BUG-PLAS-001, BUG-PLAS-002, BUG-PLAS-003
   ```

5. **Cập nhật test run table:**

   ```
   | TC-PLAS-004 | product-list-and-search | Mạch Quốc Tấn | Fail | BUG-PLAS-001, BUG-PLAS-002, BUG-PLAS-003 | Có 2 thẻ <h1>, không có alt text, đơn vị tiền tệ hiển thị VND thay vì ₫ |
   ```

6. **Tổng kết cho user**

---

## Tips

- Luôn đọc file test case trước khi cập nhật — đừng giả định nội dung
- Kiểm tra screenshot tồn tại thực sự trước khi tham chiếu
- Khi tester nói "lỗi giống XXX" — xác nhận bằng cách đọc bug report XXX
- Nếu không chắc chắn một vấn đề là bug mới hay bug cũ → hỏi user
- Giữ Note trong test run table ngắn gọn (< 100 ký tự nếu có thể)
