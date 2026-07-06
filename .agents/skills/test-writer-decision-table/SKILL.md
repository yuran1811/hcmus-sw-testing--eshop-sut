# Agent Skill: Decision Table Testing — Test Case Writer

## Metadata

| Field      | Value                                                    |
| ---------- | -------------------------------------------------------- |
| Skill ID   | `decision-table-testing-writer`                          |
| Version    | 2.3                                                      |
| Author     | AI Agent                                                 |
| Created    | 2026-06-29                                               |
| Reusable   | Yes — works for any feature of EShop SUT or similar apps |
| Techniques | Decision Table Testing                                   |

## Purpose

This skill guides an AI agent to systematically design test cases for a given feature using the **Decision Table Testing** technique.
The AI must act as a **disciplined assistant** — NOT a black box. Every step must be explicit, traceable, and reviewable by the human tester.

---

## Prerequisites

Before invoking this skill, ensure:

1. **SRS document** is available at: `README.md` (root of the repository)
2. **API specification** is available at: `api_specification.md` (if applicable)
3. The target **Feature ID** or **Business Rule** is explicitly specified (e.g., `FR-08`)

---

## Input Parameters

| Parameter      | Required | Description                                         | Example                 |
| -------------- | -------- | --------------------------------------------------- | ----------------------- |
| `FEATURE_ID`   | Yes      | The Functional Requirement ID from SRS              | `FR-08`                 |
| `FEATURE_NAME` | Yes      | Human-readable feature name                         | `Thanh toán (Checkout)` |
| `OUTPUT_DIR`   | No       | Output directory for test cases (default: `tests/`) | `tests/`                |

---

## Execution Workflow

### PHASE 1: DECISION TABLE TESTING

The AI MUST follow these 4 steps in order. Do NOT skip any step.

#### Step 1: Phân tích yêu cầu (Conditions & Actions)

**Objective**: Đọc kỹ spec và xác định toàn bộ các điều kiện đầu vào và kết quả đầu ra.

**Instructions for AI**:

1. Đọc kỹ spec của `{FEATURE_ID}`.
2. Trích xuất **Conditions (điều kiện)**: Các yếu tố đầu vào có thể TRUE/FALSE hoặc có nhiều giá trị rời rạc. Ưu tiên dạng nhị phân (Y/N).
3. Trích xuất **Actions (kết quả)**: Những gì hệ thống thực hiện tương ứng với các tổ hợp điều kiện.

**Output format**:
Ghi kết quả vào phần Tóm tắt phân tích của file Report.

---

#### Step 2: Xây dựng Bảng Đầy Đủ (Full Decision Table)

**Objective**: Xây dựng bảng quyết định với toàn bộ tổ hợp điều kiện có thể có (Với **n điều kiện nhị phân**, sẽ có chính xác **2^n cột/rules**).

**Instructions for AI**:

1. Liệt kê tất cả các rules kể cả các rule không khả thi (impossible rules).
2. Trình bày bảng Markdown đầy đủ.
3. Cung cấp giải thích ký hiệu:
   - `Y`: Điều kiện đúng
   - `N`: Điều kiện sai
   - `✓`: Action được thực hiện
   - `-`: Không quan tâm (Don't care)
   - Khoảng trắng: Action không thực hiện
4. Giải thích ngắn gọn cách các rule thỏa mãn yêu cầu của Spec.

---

#### Step 3: Xây dựng Bảng Rút Gọn (Collapsed Decision Table)

**Objective**: Rút gọn bảng đầy đủ bằng cách gộp các rules có cùng kết quả.

**Instructions for AI**:

1. Gộp các rules có cùng actions mà sự thay đổi của một số conditions không làm thay đổi kết quả (dùng `-` hoặc `*` cho "don't care").
2. Loại bỏ hoặc gom chung các rule không khả thi.

---

#### Step 4: Convert to Test Cases

**Objective**: Mỗi Rule trong bảng rút gọn trở thành một Test Case.

**Instructions for AI**:

1. Sử dụng tool sinh file Markdown cho từng Rule.
2. Lưu vào thư mục `tests/test-cases/{MODULE}/` (ví dụ: `tests/test-cases/checkout/`). Nếu thư mục module chưa tồn tại, hãy tự động tạo nó.
3. Tên file theo định dạng: `TC-{MODULE}-DTT-{ID}.md` (ví dụ: `TC-CHECKOUT-DTT-01.md`).
4. Sử dụng template sau cho mỗi file test case:

```markdown
# TC-{MODULE}-DTT-{ID}: {Tên ngắn gọn}

## Requirement ID

{FEATURE_ID}

## Module / Test type / Technique

{MODULE} / Functional / Decision Table Testing

## Preconditions

- {Danh sách các điều kiện tiên quyết}
- Rule tương ứng: Rule {Số thứ tự rule}

## Test data

| Field | Value            |
| ----- | ---------------- |
| C1    | {Giá trị cụ thể} |
| C2    | {Giá trị cụ thể} |
| ...   |

## Test steps

1. {Bước thực hiện 1}
2. {Bước thực hiện 2}
   ...

## Expected result

{Mô tả hành động/output hệ thống cần làm theo Rule}

## Status / Related bugs

Not Run / None
```

---

### PHASE 2: GENERATE REPORTS, TEST RUNS & REST SCRIPTS

**Objective**: Lưu toàn bộ thiết kế ở Phase 1 vào file cấu hình, bắt buộc khởi tạo/cập nhật bảng Test Run và sinh file REST Client (.rest) cho từng Test Case.

**Instructions for AI**:

1. **Tạo/Cập nhật file Test Design**:
   Ghi toàn bộ nội dung của **Step 1, Step 2 và Step 3** (kèm bảng thống kê có bao nhiêu test case sinh ra từ bảng rút gọn và phục vụ kiểm thử gì) vào file:
   `tests/test-design/Decision_Table_Testing.md` (Append dưới header của `{FEATURE_ID}`).

2. **Bắt buộc Tạo/Cập nhật file Test Run**:
   Tạo hoặc cập nhật bảng Test Run chứa tất cả các test case mới tạo với trạng thái ban đầu là `Not Run`.
   - Đường dẫn file: `tests/test-runs/{MODULE}-test-run.md`.

3. **Bắt buộc Sinh REST Client Scripts (.rest)**:
   Với mỗi Test Case sinh ra, tạo file script tương ứng trong thư mục `tests/test-runs/script/{MODULE}/`:
   - Đường dẫn file: `tests/test-runs/script/{MODULE}/TC-{MODULE}-DTT-{ID}.rest`

---

### PHASE 3: LINT & FORMAT

**Objective**: Đảm bảo chất lượng định dạng Markdown.

**Instructions for AI**:

1. Tự kiểm tra cú pháp Markdown của các file vừa tạo (bảng không bị gãy cột, tiêu đề đúng chuẩn).
2. Chạy lệnh prettier để format (nếu có sẵn prettier trong project):
   ```bash
   npx prettier --write "tests/**/*.md" "tests/test-design/*.md"
   ```

---

### PHASE 4: AI AUDIT LOGGING

**CRITICAL**: After completing ALL phases, the AI MUST append an audit entry to `report/AI_Audit_Report.md`. (Tạo file nếu chưa tồn tại).

**Entry format**:

```markdown
### Entry {N} — Decision Table Testing cho {FEATURE_NAME}

| Field                      | Value                                                                  |
| -------------------------- | ---------------------------------------------------------------------- |
| **AI Tool**                | {Tool name}                                                            |
| **Date/Time**              | {ISO 8601 timestamp}                                                   |
| **Task**                   | Decision Table test case design for {FEATURE_ID}                       |
| **Output Summary**         | Generated {N} DTT TCs from {M} rules, Test Run table, and REST scripts |
| **Human Review Required**  | Yes — review all TCs for correctness and completeness                  |
| **Files Created/Modified** | {List of files}                                                        |
```

---

## Output format cuối cùng trong Chat

Luôn phản hồi theo thứ tự:

1. Thông báo đã cập nhật `Decision_Table_Testing.md`, file Test Run (`{MODULE}-test-run.md`), các file REST script (`tests/test-runs/script/{MODULE}/*.rest`), và `AI_Audit_Report.md`.
2. Hiển thị lại **Bảng Rút Gọn** trong chat để người dùng review nhanh.
3. Liệt kê danh sách các file test case, test run và REST scripts đã tạo/cập nhật.
4. Nêu các điểm cần làm rõ (nếu spec có chỗ mơ hồ hoặc thiếu).

---

## Tips for Human Reviewer

- [DO] Kiểm tra xem AI đã xác định ĐÚNG và ĐỦ tất cả các Conditions và Actions chưa.
- [DO] Kiểm tra Bảng Đầy Đủ có đúng số lượng 2^n quy tắc hay không.
- [DO] Kiểm tra các file script REST Client (.rest) có thể chạy trực tiếp với REST Client Extension hay không.
- [DO NOT] Submit raw AI output without review.
