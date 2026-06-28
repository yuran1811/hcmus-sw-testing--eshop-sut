# AI Audit Report — HW02 Domain Testing on EShop

## Thông tin sinh viên (Student Information)

| Field                          | Value                             |
| ------------------------------ | --------------------------------- |
| **MSSV (Student ID)**          | `{STUDENT_ID}`                    |
| **Họ tên (Full Name)**         | `{STUDENT_NAME}`                  |
| **Mã bài tập (Assignment)**    | HW02-AI — Domain Testing on EShop |
| **Ngày nộp (Submission Date)** | `{YYYY-MM-DD}`                    |

---

## Tuyên bố sử dụng AI (AI Usage Declaration)

> **"I use AI tools for the following tasks:"**
>
> 1. Phân tích yêu cầu và thiết kế test cases theo Domain Testing (Equivalence Partitioning)
> 2. Thiết kế test cases theo Boundary Value Analysis
> 3. Thực thi test cases và ghi nhận kết quả
> 4. Phân tích AI Gap Analysis
> 5. Viết Bug Reports
> 6. Tổng hợp AI Audit Report

---

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool          | Task Category         | Feature | Date       | Bloom-AI Level |
| --- | ---------------- | --------------------- | ------- | ---------- | -------------- |
| 1   | Gemini 3.5 Flash | Domain Testing Design | FR-05   | 2026-06-27 | G9.2 (Apply)   |
| 2   | Gemini 3.5 Flash | BVA Design            | FR-05   | 2026-06-27 | G9.2 (Apply)   |
| 3   | Gemini 3.5 Flash | Domain Testing Design | FR-08   | 2026-06-28 | G9.2 (Apply)   |
| 4   | Gemini 3.5 Flash | BVA Design            | FR-08   | 2026-06-28 | G9.2 (Apply)   |
| 5   | Gemini 3.1 Pro   | Domain Testing Design | FR-14   | 2026-06-28 | G9.2 (Apply)   |
| 6   | Gemini 3.1 Pro   | BVA Design            | FR-14   | 2026-06-28 | G9.2 (Apply)   |
| 5   |                  | Test Execution        |         |            | G9.2 (Apply)   |
| 8   |                  | AI Gap Analysis       |         |            | G9.3 (Analyse) |
| 9   |                  | Bug Report Writing    |         |            | G9.2 (Apply)   |

> **Hướng dẫn**: Điền thông tin vào bảng trên cho mỗi lần sử dụng AI. Thêm dòng nếu cần.

---

## Chi tiết từng lần sử dụng AI (Detailed AI Interaction Log)

<!--
  HƯỚNG DẪN SỬ DỤNG:
  - Copy template Entry bên dưới cho mỗi lần tương tác với AI
  - Điền đầy đủ thông tin
  - Giữ nguyên thứ tự thời gian (chronological order)
  - Mỗi lần gọi Agent Skill = 1 Entry
  - Mỗi lần hỏi AI trực tiếp = 1 Entry

  Nếu sử dụng agent skill, skill sẽ tự động append entry vào đây.
-->

### Entry 1

| Field              | Value                                     |
| ------------------ | ----------------------------------------- |
| **AI Tool**        | Gemini 3.5 Flash                          |
| **Date/Time**      | 2026-06-27 00:21:00                       |
| **Task**           | Domain Testing & BVA test case design     |
| **Feature**        | FR-05 — Xem danh sách & Tìm kiếm sản phẩm |
| **Bloom-AI Level** | G9.2 (Apply) / G9.3 (Analyse)             |

#### Prompt

**[Original User Prompt]**

```text
dựa vào mô tả của FR-05 trong file README.md , dựa vào skill .agents\skills\test-writer\SKILL.md , bạn hãy tạo ra những test case cho tính năng này dựa trên 2 kĩ thuật được đề cập trong skill, thực hiện tuần tự và đầy đủ các phase được đề cập, sau đó sử dụng .agents\skills\ai-audit-report\SKILL.md để log lại quá trình, các thông tin cần human review để trống để tôi điền vào, ngoài ra tạo trong folder tests\test-cases\product-list-and-search tôi đã tạo sẵn và làm theo các template
```

**[Skill Execution Details]**

```text
Invoked skill: domain-testing-writer with parameters:
- FEATURE_ID: FR-05
- FEATURE_NAME: Xem danh sách & Tìm kiếm sản phẩm
- POOL: B
- OUTPUT_DIR: tests/test-cases/product-list-and-search/

Detailed instruction: Design test cases for FR-05 based on Domain Testing (Equivalence Partitioning) and Boundary Value Analysis (BVA), following the HCMUS Software Testing course methodology. Produce markdown test case files and comprehensive reports, then append audit log.
```

#### AI Output

```text
- Identified 3 input variables and 6 output variables with multiple equivalence classes.
- Generated 7 Domain Testing test cases (TC-PLAS-001 to TC-PLAS-007).
- Identified 3 boundary points and generated 5 Boundary Value Analysis test cases (TC-PLAS-BVA-001 to TC-PLAS-BVA-005).
- Created Domain Testing Report (Domain_Testing_Report.md).
- Created Boundary Value Analysis Report (Boundary_Value_Analysis_Report.md).
[Full output: see tests/test-cases/product-list-and-search/ and report/]
```

#### Human Review

| Aspect           | Detail                                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| Reviewed by      | Mạch Quốc Tấn                                                                                                         |
| Review date      | 28/06/2026                                                                                                            |
| Corrections made | Sửa lại các dữ liệu đại diện sao cho phù hợp với test data, và thêm vào log của skill                                 |
| Quality rating   | Khá tốt, bao quát được yêu cầu, cần xác thực lại các chi tiết nhỏ                                                     |
| Issues found     | AI không yêu cầu biết thêm hay cung cấp thông tin db mà tự bịa ra một dữ liệu hợp lệ, và dữ liệu đó không có trong db |

---

### Entry 2

| Field              | Value                                     |
| ------------------ | ----------------------------------------- |
| **AI Tool**        | Gemini 3.5 Flash                          |
| **Date/Time**      | 2026-06-28 15:03:00                       |
| **Task**           | Test run manual reporting & Bug updates   |
| **Feature**        | FR-05 — Xem danh sách & Tìm kiếm sản phẩm |
| **Bloom-AI Level** | G9.2 (Apply)                              |

#### Prompt

**[Original User Prompt]**

```text
Sử dụng skill test-run-reporter áp dụng cho {TEST_CASE}, và kết quả tôi thực hiện được là {KẾT_QUẢ}, với các hình ảnh {HÌNH_ẢNH} lần lượt minh chứng cho {LỖI}.
```

#### AI Output

```text
- Renamed and organized 13 screenshots to target names.
- Created 3 new bug reports (BUG-PLAS-005, BUG-PLAS-006, BUG-PLAS-007) and updated BUG-PLAS-001/002/003/004.
- Updated 9 test case files (TC-PLAS-004 to TC-PLAS-007, TC-PLAS-BVA-001 to BVA-005) with status fail and related bugs.
- Populated sprint-1-test-run.md table with results and bug tracking.
```

#### Human Review

| Aspect           | Detail                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------- |
| Reviewed by      | Mạch Quốc Tấn                                                                             |
| Review date      | 28/06/2026                                                                                |
| Corrections made | Yêu cầu tách BUG-PLAS-005 thành 2 lỗi (H1 và SQLite error), xóa BUG-PLAS-001 khỏi BVA-002 |
| Quality rating   | Rất tốt, tự động hóa toàn bộ việc cập nhật bảng và file test case theo đúng conventions   |
| Issues found     | Cần lưu ý quy tắc tách bug rõ ràng hơn khi có nhiều lỗi trên cùng 1 test case             |

---

### Entry 3

| Field              | Value                                 |
| ------------------ | ------------------------------------- |
| **AI Tool**        | Gemini 3.5 Flash                      |
| **Date/Time**      | 2026-06-28 15:30:00                   |
| **Task**           | Domain Testing & BVA test case design |
| **Feature**        | FR-08 — Thanh toán (Checkout)         |
| **Bloom-AI Level** | G9.2 (Apply) / G9.3 (Analyse)         |

#### Prompt

**[Original User Prompt]**

```text
dựa vào mô tả của FR-08 trong file README.md , dựa vào skill .agents\skills\test-writer\SKILL.md , bạn hãy tạo ra những test case cho tính năng này dựa trên 2 kĩ thuật được đề cập trong skill, thực hiện tuần tự và đầy đủ các phase được đề cập, sau đó sử dụng .agents\skills\ai-audit-report\SKILL.md để log lại quá trình, các thông tin cần human review để trống để tôi điền vào, ngoài ra tạo trong folder tests\test-cases\checkout tôi đã tạo sẵn và làm theo các template
```

**[Skill Execution Details]**

```text
Invoked skill: domain-testing-writer with parameters:
- FEATURE_ID: FR-08
- FEATURE_NAME: Thanh toán (Checkout)
- POOL: C
- OUTPUT_DIR: tests/test-cases/checkout/

Detailed instruction: Design test cases for FR-08 based on Domain Testing (Equivalence Partitioning) and Boundary Value Analysis (BVA), following the HCMUS Software Testing course methodology. Produce markdown test case files and comprehensive reports, then append audit log.
```

#### AI Output

```text
- Identified 4 input variables and 4 output variables with multiple equivalence classes.
- Generated 5 Domain Testing test cases (TC-CHECKOUT-001 to TC-CHECKOUT-005).
- Identified 4 boundary points and generated 4 Boundary Value Analysis test cases (TC-CHECKOUT-BVA-001 to TC-CHECKOUT-BVA-004).
- Updated Domain Testing Report (Domain_Testing_Report.md).
- Updated Boundary Value Analysis Report (Boundary_Value_Analysis_Report.md).
[Full output: see tests/test-cases/checkout/ and report/]
```

#### Human Review

| Aspect           | Detail                                                                    |
| ---------------- | ------------------------------------------------------------------------- |
| Reviewed by      | Mạch Quốc Tấn                                                             |
| Review date      | 28/06/2026                                                                |
| Corrections made | Sửa lại dữ liệu đại diện, bỏ phần nhập địa chỉ                            |
| Quality rating   | Tốt, logic hợp lý, chỉ cần điều chỉnh lại một chút để phù hợp với yêu cầu |
| Issues found     | AI tự đọc yêu cầu rồi bịa thêm việc nhập địa chỉ                          |

---

### Entry 4

| Field              | Value                                    |
| ------------------ | ---------------------------------------- |
| **AI Tool**        | Gemini 3.1 Pro                           |
| **Date/Time**      | 2026-06-28 19:25:00                      |
| **Task**           | Domain Testing & BVA test case design    |
| **Feature**        | FR-14 — Quản lý Danh mục (Category CRUD) |
| **Bloom-AI Level** | G9.2 (Apply) / G9.3 (Analyse)            |

#### Prompt

**[Original User Prompt]**

`	ext
dựa vào mô tả của FR-14 trong file README.md , dựa vào skill .agents\skills	est-writer\SKILL.md , bạn hãy tạo ra những test case cho tính năng này dựa trên 2 kĩ thuật được đề cập trong skill, thực hiện tuần tự và đầy đủ các phase được đề cập, sau đó sử dụng .agents\skillsi-audit-report\SKILL.md để log lại quá trình, các thông tin cần human review để trống để tôi điền vào, ngoài ra tạo trong folder tests	est-cases\category tôi đã tạo sẵn và làm theo các template
`

**[Skill Execution Details]**

` ext
Invoked skill: domain-testing-writer with parameters:

- FEATURE_ID: FR-14
- FEATURE_NAME: Quản lý Danh mục (Category CRUD)
- POOL: C
- OUTPUT_DIR: tests/test-cases/category/

Detailed instruction: Design test cases for FR-14 based on Domain Testing (Equivalence Partitioning) and Boundary Value Analysis (BVA), following the HCMUS Software Testing course methodology. Produce markdown test case files and comprehensive reports, then append audit log.
`

#### AI Output

` ext

- Identified 3 input variables and 3 output variables with multiple equivalence classes.
- Generated 8 Domain Testing test cases (TC-CATEGORY-001 to TC-CATEGORY-008).
- Identified 1 boundary point and generated 2 Boundary Value Analysis test cases (TC-CATEGORY-BVA-001 to TC-CATEGORY-BVA-002).
- Updated Domain Testing Report (Domain_Testing_Report.md).
- Updated Boundary Value Analysis Report (Boundary_Value_Analysis_Report.md).
  [Full output: see tests/test-cases/category/ and report/]
  `

#### Human Review

| Aspect           | Detail |
| ---------------- | ------ |
| Reviewed by      |        |
| Review date      |        |
| Corrections made |        |
| Quality rating   |        |
| Issues found     |        |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                                           | Value                            |
| ------------------------------------------------ | -------------------------------- |
| Tổng số lần tương tác AI (Total AI interactions) | 4                                |
| Công cụ AI đã dùng (AI tools used)               | Gemini 3.5 Flash, Gemini 3.1 Pro |
| Tính năng đã test (Features covered)             | FR-05, FR-08, FR-14              |
| Tổng TC do AI sinh (Total TCs by AI)             | 31                               |
| TC đã chỉnh sửa sau review (TCs modified)        | 12 (57%)                         |
| TC giữ nguyên (TCs accepted as-is)               | 0 (0%)                           |
| Độ chính xác AI (AI accuracy before review)      | 80%                              |
| Bug tìm bởi AI (Bugs found with AI)              | 7                                |
| Bug AI bỏ sót (Bugs AI missed)                   | 0                                |

### Tỷ lệ đóng góp AI vs Human (AI Contribution Breakdown)

| Task                    | AI (%) | Human (%) |
| ----------------------- | ------ | --------- |
| Domain Testing analysis | 90%    | 10%       |
| BVA analysis            | 90%    | 10%       |
| Test case writing       | 80%    | 20%       |
| Test execution          | 0%     | 100%      |
| Bug identification      | 50%    | 50%       |
| Report writing          | 85%    | 15%       |

---

## Agent Skills đã sử dụng (Agent Skills Used)

| #   | Skill ID                    | Invocations | Description                            |
| --- | --------------------------- | ----------- | -------------------------------------- |
| 1   | `domain-testing-writer`     | 2           | Domain Testing + BVA test design       |
| 2   | `test-run-reporter`         | 1           | Manual test execution reporting & sync |
| 3   | `ai-audit-report-generator` | 1           | AI Audit Report generation             |
| 4   | `ai-gap-analysis`           |             | Coverage gap analysis                  |

---

_Report generated with assistance from `ai-audit-report-generator` agent skill._
_Last updated: 2026-06-28 15:30:00_
