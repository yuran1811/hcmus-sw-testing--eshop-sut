# Agent Skill: Pairwise Testing (All-Pairs) — Test Case Writer

## Metadata

| Field      | Value                                                 |
| ---------- | ----------------------------------------------------- |
| Skill ID   | `pairwise-testing-writer`                             |
| Version    | 2.0                                                   |
| Author     | AI Agent                                              |
| Created    | 2026-06-29                                            |
| Reusable   | Yes — works for any feature with combinatorial inputs |
| Techniques | Pairwise Testing / All-Pairs                          |

## Purpose

This skill guides an AI agent to systematically design test cases using the **Pairwise Testing (All-Pairs)** technique.
It aims to ensure that every parameter pair has all combinations of values tested at least once, optimizing the number of test cases while maintaining high coverage.
The AI must act as a **disciplined assistant** — NOT a black box. Every step must be explicit, traceable, and reviewable by the human tester.

---

## Prerequisites

Before invoking this skill, ensure:

1. **SRS document** or **Feature Description** is available.
2. The target **Feature ID** is explicitly specified.
3. The feature involves ≥ 3 parameters, each with ≥ 2 independent values.

---

## Input Parameters

| Parameter      | Required | Description                                         | Example           |
| -------------- | -------- | --------------------------------------------------- | ----------------- |
| `FEATURE_ID`   | Yes      | The Functional Requirement ID from SRS              | `FR-05`           |
| `FEATURE_NAME` | Yes      | Human-readable feature name                         | `Filter Products` |
| `OUTPUT_DIR`   | No       | Output directory for test cases (default: `tests/`) | `tests/`          |

---

## Execution Workflow

### PHASE 1: PAIRWISE TESTING

The AI MUST follow these 4 steps in order. Do NOT skip any step.

#### Step 1: Trích xuất Parameters & Values

**Objective**: Đọc kỹ spec, liệt kê các tham số độc lập và tập giá trị của chúng.

**Instructions for AI**:

1. Mỗi **parameter** là một yếu tố đầu vào có thể thay đổi độc lập.
2. Mỗi parameter chọn **2–5 giá trị đại diện** (boundary values, equivalence classes, enum).
   - Giá trị số: âm / zero / dương
   - Boolean: Y / N
   - String: rỗng / hợp lệ / không hợp lệ
3. Trình bày kết quả dạng bảng Markdown.

---

#### Step 2: Tính toán & Thống kê Combinatorial

**Objective**: Tính số lượng test case nếu dùng phương pháp vét cạn (Full Combinatorial) so với dự kiến Pairwise.

**Instructions for AI**:

- Tính **Full combinatorial**: P1_count × P2_count × ... = N
- Tính tỷ lệ tiết kiệm số lượng test cases khi áp dụng Pairwise.

---

#### Step 3: Sinh Test Cases (Thuật toán Greedy All-Pairs)

**Objective**: Sinh danh sách các test cases sao cho mọi cặp (Pi, Pj) đều được test mọi tổ hợp giá trị ít nhất một lần.

**Instructions for AI**:

1. Liệt kê tất cả các tổ hợp cặp cần cover.
2. Với mỗi test case, chọn các giá trị sao cho cover được nhiều cặp chưa test nhất (greedy approach).
3. Nếu có **Constraints** (ràng buộc không hợp lệ, ví dụ "P1=X thì P2 không thể là Y"), đánh dấu là [INVALID] và tránh sinh test case cho tổ hợp đó.
4. Chuyển đổi thành các file test case tương ứng vào thư mục `tests/test-cases/{MODULE}/` (ví dụ: `tests/test-cases/filter/`). Nếu thư mục module chưa tồn tại, hãy tự động tạo nó.
5. Định dạng tên file: `TC-{MODULE}-PWS-{ID}.md`.
6. Sử dụng template sau cho mỗi test case:

```markdown
# TC-{MODULE}-PWS-{ID}: {Tên ngắn gọn}

## Requirement ID

{FEATURE_ID}

## Module / Test type / Technique

{MODULE} / Functional / Pairwise Testing

## Preconditions

- {Danh sách các điều kiện tiên quyết}

## Test data

| Parameter | Value     |
| --------- | --------- |
| P1        | {Giá trị} |
| P2        | {Giá trị} |
| ...       |

## Test steps

1. {Bước thực hiện 1}
2. {Bước thực hiện 2}
   ...

## Expected result

{Kết quả mong đợi dựa trên tổ hợp tham số này}

## Status / Related bugs

Not Run / None
```

---

#### Step 4: Bảng Coverage Matrix

**Objective**: (Bắt buộc nếu số tham số ≤ 6) Lập bảng đánh giá các cặp tham số đã được test case nào cover.

**Instructions for AI**:

- Lập ma trận giao cắt giữa các tham số để chứng minh rằng mọi cặp tổ hợp đều xuất hiện trong ít nhất 1 test case.

---

### PHASE 2: GENERATE REPORTS

**Objective**: Lưu toàn bộ thiết kế ở Phase 1 vào file cấu hình.

**Instructions for AI**:
Ghi toàn bộ nội dung của **Step 1, Step 2, Step 3 (Bảng test case tổng hợp) và Step 4** vào file:
`tests/test-design/Pair_Wise_Testing.md` (Append dưới header của `{FEATURE_ID}`).

---

### PHASE 3: LINT & FORMAT

**Objective**: Đảm bảo chất lượng định dạng Markdown.

**Instructions for AI**:

1. Tự kiểm tra cú pháp Markdown của các file vừa tạo.
2. Chạy lệnh prettier để format (nếu có sẵn):
   ```bash
   npx prettier --write "tests/**/*.md" "tests/test-design/*.md"
   ```

---

### PHASE 4: AI AUDIT LOGGING

**CRITICAL**: After completing ALL phases, the AI MUST append an audit entry to `report/AI_Audit_Report.md`. (Tạo file nếu chưa tồn tại).

**Entry format**:

```markdown
### Entry {N} — Pairwise Testing cho {FEATURE_NAME}

| Field                      | Value                                                               |
| -------------------------- | ------------------------------------------------------------------- |
| **AI Tool**                | {Tool name}                                                         |
| **Date/Time**              | {ISO 8601 timestamp}                                                |
| **Task**                   | Pairwise test case design for {FEATURE_ID}                          |
| **Output Summary**         | Generated {N} Pairwise TCs, reduced from {M} full combinatorial TCs |
| **Human Review Required**  | Yes — review all TCs for completeness and domain correctness        |
| **Files Created/Modified** | {List of files}                                                     |
```

---

## Output format cuối cùng trong Chat

Luôn phản hồi theo thứ tự:

1. Thông báo đã cập nhật `Pair_Wise_Testing.md` và `AI_Audit_Report.md`.
2. Báo cáo số lượng test case tiết kiệm được so với phương pháp Full Combinatorial.
3. Liệt kê danh sách các file test case đã tạo.
4. Nêu các điểm giả định cần làm rõ.

---

## Tips for Human Reviewer

- [DO] Kiểm tra xem AI đã xác định các giá trị đại diện (Values) cho từng Parameter hợp lý chưa (có kết hợp Boundary Value Analysis không).
- [DO] Đảm bảo mọi "impossible combination" (ràng buộc nghiệp vụ) đã được loại bỏ trước khi sinh pairwise.
- [DO] Sử dụng bảng Coverage Matrix để verify lại xem có cặp nào bị bỏ sót hay không.
- [DO NOT] Submit raw AI output without review.
