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
| 3   |                  | Test Execution        |         |            | G9.2 (Apply)   |
| 4   |                  | AI Gap Analysis       |         |            | G9.3 (Analyse) |
| 5   |                  | Bug Report Writing    |         |            | G9.2 (Apply)   |

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

| Aspect           | Detail |
| ---------------- | ------ |
| Reviewed by      |        |
| Review date      |        |
| Corrections made |        |
| Quality rating   |        |
| Issues found     |        |

---

<!-- COPY THE TEMPLATE ABOVE FOR EACH NEW AI INTERACTION -->

<!--
### Entry 2
{Copy and fill Entry template}

### Entry 3
{Copy and fill Entry template}
-->

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                                           | Value            |
| ------------------------------------------------ | ---------------- |
| Tổng số lần tương tác AI (Total AI interactions) | 1                |
| Công cụ AI đã dùng (AI tools used)               | Gemini 3.5 Flash |
| Tính năng đã test (Features covered)             | FR-05            |
| Tổng TC do AI sinh (Total TCs by AI)             | 12               |
| TC đã chỉnh sửa sau review (TCs modified)        | `{N} ({%}%)`     |
| TC giữ nguyên (TCs accepted as-is)               | `{N} ({%}%)`     |
| Độ chính xác AI (AI accuracy before review)      | `{%}%`           |
| Bug tìm bởi AI (Bugs found with AI)              | `{N}`            |
| Bug AI bỏ sót (Bugs AI missed)                   | `{N}`            |

### Tỷ lệ đóng góp AI vs Human (AI Contribution Breakdown)

| Task                    | AI (%) | Human (%) |
| ----------------------- | ------ | --------- |
| Domain Testing analysis |        |           |
| BVA analysis            |        |           |
| Test case writing       |        |           |
| Test execution          |        |           |
| Bug identification      |        |           |
| Report writing          |        |           |

---

## Agent Skills đã sử dụng (Agent Skills Used)

| #   | Skill ID                    | Invocations | Description                      |
| --- | --------------------------- | ----------- | -------------------------------- |
| 1   | `domain-testing-writer`     | 1           | Domain Testing + BVA test design |
| 2   | `test-runner`               |             | Test case execution              |
| 3   | `ai-audit-report-generator` |             | AI Audit Report generation       |
| 4   | `ai-gap-analysis`           |             | Coverage gap analysis            |

---

_Report generated with assistance from `ai-audit-report-generator` agent skill._
_Last updated: 2026-06-27 00:21:00_
