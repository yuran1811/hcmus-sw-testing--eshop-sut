# AI Audit Report — HW02 Domain Testing on EShop

## Thông tin sinh viên (Student Information)

| Field                          | Value                                    |
| ------------------------------ | ---------------------------------------- |
| **MSSV (Student ID)**          | `{STUDENT_ID}`                           |
| **Họ tên (Full Name)**         | `{STUDENT_NAME}`                         |
| **Mã bài tập (Assignment)**   | HW02-AI — Domain Testing on EShop        |
| **Ngày nộp (Submission Date)** | `{YYYY-MM-DD}`                           |

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

| #   | AI Tool | Task Category           | Feature       | Date       | Bloom-AI Level   |
| --- | ------- | ----------------------- | ------------- | ---------- | ---------------- |
| 1   |         | Domain Testing Design   |               |            | G9.2 (Apply)     |
| 2   |         | BVA Design              |               |            | G9.2 (Apply)     |
| 3   |         | Test Execution          |               |            | G9.2 (Apply)     |
| 4   |         | AI Gap Analysis         |               |            | G9.3 (Analyse)   |
| 5   |         | Bug Report Writing      |               |            | G9.2 (Apply)     |

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

| Field              | Value                                                |
| ------------------ | ---------------------------------------------------- |
| **AI Tool**        | `{e.g., Claude Opus 4, Gemini 2.5 Pro, ChatGPT-4o}` |
| **Date/Time**      | `{YYYY-MM-DD HH:MM:SS}`                             |
| **Task**           | `{e.g., Domain Testing Design for FR-01}`            |
| **Feature**        | `{FEATURE_ID} — {FEATURE_NAME}`                     |
| **Bloom-AI Level** | `{G9.2 (Apply) / G9.3 (Analyse)}`                   |

#### Prompt

```text
{Paste your full prompt here, or a faithful summary if too long.
If using an agent skill, note: "Invoked skill: {skill_name} with parameters: ..."}
```

#### AI Output

```text
{Paste the AI's response here, or a faithful summary.
Include key numbers: how many test cases generated, variables identified, etc.
If output is saved in a file, note: "[Full output: see {file_path}]"}
```

#### Human Review

| Aspect             | Detail                                    |
| ------------------ | ----------------------------------------- |
| Reviewed by        | `{Your name}`                             |
| Review date        | `{YYYY-MM-DD}`                            |
| Corrections made   | `{Yes/No — describe what was changed}`    |
| Quality rating     | `{Excellent / Good / Acceptable / Poor}`  |
| Issues found       | `{None / describe issues}`                |

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

| Metric                                     | Value   |
| ------------------------------------------ | ------- |
| Tổng số lần tương tác AI (Total AI interactions) | `{N}` |
| Công cụ AI đã dùng (AI tools used)         | `{list}` |
| Tính năng đã test (Features covered)       | `{list}` |
| Tổng TC do AI sinh (Total TCs by AI)       | `{N}`   |
| TC đã chỉnh sửa sau review (TCs modified)  | `{N} ({%}%)` |
| TC giữ nguyên (TCs accepted as-is)         | `{N} ({%}%)` |
| Độ chính xác AI (AI accuracy before review) | `{%}%` |
| Bug tìm bởi AI (Bugs found with AI)       | `{N}`   |
| Bug AI bỏ sót (Bugs AI missed)             | `{N}`   |

### Tỷ lệ đóng góp AI vs Human (AI Contribution Breakdown)

| Task                          | AI (%) | Human (%) |
| ----------------------------- | ------ | --------- |
| Domain Testing analysis       |        |           |
| BVA analysis                  |        |           |
| Test case writing             |        |           |
| Test execution                |        |           |
| Bug identification            |        |           |
| Report writing                |        |           |

---

## Agent Skills đã sử dụng (Agent Skills Used)

| # | Skill ID                     | Invocations | Description                        |
|---|------------------------------|-------------|-------------------------------------|
| 1 | `domain-testing-writer`      |             | Domain Testing + BVA test design    |
| 2 | `test-runner`                |             | Test case execution                 |
| 3 | `ai-audit-report-generator`  |             | AI Audit Report generation          |
| 4 | `ai-gap-analysis`            |             | Coverage gap analysis               |

---

_Report generated with assistance from `ai-audit-report-generator` agent skill._
_Last updated: {YYYY-MM-DD HH:MM:SS}_
