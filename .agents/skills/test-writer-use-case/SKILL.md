---
name: use-case-testing
description: >
  Tạo test case theo phương pháp Use Case Testing từ mô tả yêu cầu/spec bằng văn bản hoặc use case
  đã được đặc tả sẵn theo chuẩn: Title, Primary Actor, Level, Precondition, Minimal Guarantees,
  Success Guarantees, Main Success Scenario, Extensions (Alternative Flow).
  Kết quả bao gồm: bảng đặc tả use case chuẩn hóa, danh sách test case chi tiết ở định dạng Markdown,
  khởi tạo/cập nhật bảng Test Run ({MODULE}-test-run.md), và sinh các script REST Client (.rest) để chạy API testing.

  Dùng skill này bất cứ khi nào người dùng muốn:
  - Viết test case từ một use case hoặc một chức năng có luồng tương tác actor - hệ thống
  - Phân tích yêu cầu theo Primary Actor, Precondition, Minimal Guarantees, Success Guarantees,
    Main Success Scenario, Extensions
  - Sinh test case bằng kỹ thuật use case testing, scenario testing, user flow testing
  - Người dùng đề cập "use case", "actor", "main success scenario", "extensions",
    "alternative flow", "minimal guarantees", "success guarantees", "kịch bản sử dụng",
    "test case theo kịch bản"
  - Bất kỳ tình huống nào mô tả yêu cầu dưới dạng "actor làm gì -> hệ thống phản hồi gì"
    theo trình tự các bước, có các nhánh mở rộng (extensions)
---

# Agent Skill: Use Case Testing — Test Case Writer

## Metadata

| Field      | Value                                                    |
| ---------- | -------------------------------------------------------- |
| Skill ID   | `use-case-testing-writer`                                |
| Version    | 2.3                                                      |
| Author     | AI Agent                                                 |
| Created    | 2026-07-06                                               |
| Reusable   | Yes — works for any feature of EShop SUT or similar apps |
| Techniques | Use Case Testing                                         |

## Purpose

This skill guides an AI agent to systematically design test cases for a given feature using the **Use Case Testing** technique.
The AI must act as a **disciplined assistant** — NOT a black box. Every step must be explicit, traceable, and reviewable by the human tester.

---

## Prerequisites

Before invoking this skill, ensure:

1. **SRS document** is available at: `README.md` (root of the repository)
2. **API specification** is available at: `api_specification.md` (if applicable)
3. The target **Feature ID** or **Business Rule** is explicitly specified (e.g., `FR-01`)

---

## Input Parameters

| Parameter      | Required | Description                                         | Example                           |
| -------------- | -------- | --------------------------------------------------- | --------------------------------- |
| `FEATURE_ID`   | Yes      | The Functional Requirement ID from SRS              | `FR-01`                           |
| `FEATURE_NAME` | Yes      | Human-readable feature name                         | `Đăng nhập hệ thống (User Login)` |
| `OUTPUT_DIR`   | No       | Output directory for test cases (default: `tests/`) | `tests/`                          |

---

## Execution Workflow

### PHASE 1: USE CASE TESTING

The AI MUST follow these 4 steps in order. Do NOT skip any step.

#### Step 1: Phân tích và chuẩn hóa Use Case

**Objective**: Đọc kỹ spec/user story và trích xuất đủ 8 field đặc tả use case chuẩn hóa:

1. **Title**: Tên use case, thường ở dạng động từ + danh từ (ví dụ: "Đăng nhập hệ thống", "Đặt hàng online").
2. **Primary Actor**: Actor chính khởi tạo use case, người có mục tiêu cần đạt được (ví dụ: "Khách hàng", "Quản trị viên").
3. **Level**: Mức độ của use case, thường theo 3 mức:
   - **Sea level (User-goal level)**: Use case hoàn chỉnh mang lại giá trị cho actor (phổ biến nhất, mặc định nếu không nêu rõ).
   - **Kite level (Summary level)**: Tổng hợp nhiều use case sea level, mục tiêu ở tầm cao hơn.
   - **Clam level (Sub-function level)**: Một bước nhỏ hỗ trợ use case sea level (ví dụ: "Xác thực OTP" là sub-function của "Đăng nhập").
4. **Precondition**: Điều kiện phải đúng trước khi use case bắt đầu (hệ thống có quyền coi là đã thỏa mãn, không cần kiểm tra lại trong test).
5. **Minimal Guarantees**: Điều đảm bảo tối thiểu cho tất cả các bên liên quan (stakeholder), **dù use case thành công hay thất bại** — thường liên quan đến toàn vẹn dữ liệu, bảo mật, không để hệ thống ở trạng thái không nhất quán (ví dụ: "Không mất tiền của khách hàng dù giao dịch lỗi", "Mật khẩu không bị lộ qua log/thông báo lỗi").
6. **Success Guarantees (Postcondition)**: Điều đảm bảo đạt được **khi use case hoàn thành thành công** — trạng thái hệ thống/dữ liệu sau khi Main Success Scenario hoặc một Extension kết thúc tốt đẹp.
7. **Main Success Scenario (Basic Flow)**: Chuỗi bước đánh số mô tả kịch bản "mọi thứ diễn ra thuận lợi nhất" (happy path), dạng "Actor làm gì → Hệ thống phản hồi gì", kết thúc bằng việc đạt Success Guarantees.
8. **Extensions (Alternative Flow)**: Các nhánh rẽ tại một bước cụ thể của Main Success Scenario, bao gồm cả:
   - Nhánh mở rộng vẫn dẫn đến thành công (alternative path thành công).
   - Nhánh lỗi/ngoại lệ (dẫn đến thất bại nhưng vẫn phải đảm bảo Minimal Guarantees).
   - Đánh số extension theo dạng `<số bước>a`, `<số bước>b`... (ví dụ: `2a`, `3a`, `3b`).

Nếu spec chưa nêu rõ field nào (thường gặp nhất: Level, Minimal Guarantees), suy luận hợp lý dựa trên ngữ cảnh và **ghi chú rõ đây là giả định**, đề xuất người dùng xác nhận lại.

---

#### Step 2: Chuẩn hóa bảng đặc tả Use Case

**Objective**: Trình bày bảng đặc tả Use Case theo đúng định dạng Markdown.

**Instructions for AI**:

Định dạng Markdown:

```markdown
## Use Case: [Title]

- **Primary Actor**: [actor]
- **Level**: Sea level / Kite level / Clam level
- **Precondition**: [điều kiện trước, được coi là đã đúng]
- **Minimal Guarantees**: [đảm bảo tối thiểu dù thành công hay thất bại]
- **Success Guarantees**: [đảm bảo khi thành công]

### Main Success Scenario

1. [Actor làm gì] → [Hệ thống phản hồi gì]
2. ...
   n. Use case kết thúc, đạt Success Guarantees.

### Extensions

- **2a. [Tên tình huống rẽ nhánh tại bước 2]**: [điều kiện xảy ra]
  1. [Bước xử lý riêng]
  2. Quay lại bước [x] / Use case kết thúc (thành công hoặc thất bại, nêu rõ).
- **3a. [Tên tình huống khác tại bước 3]**: ...
```

---

#### Step 3: Sinh Test Cases

**Objective**: Áp dụng quy tắc Main Success Scenario → 1 test case bao phủ trọn happy path; mỗi Extension → 1 test case riêng.

**Instructions for AI**:

1. Sử dụng tool sinh file Markdown cho từng Scenario / Extension.
2. Lưu vào thư mục `tests/test-cases/{MODULE}/` (ví dụ: `tests/test-cases/auth/`). Nếu thư mục module chưa tồn tại, hãy tự động tạo nó.
3. Định dạng tên file: `TC-{MODULE}-UCT-{ID}.md` (ví dụ: `TC-AUTH-UCT-01.md`).
4. Sử dụng template sau cho mỗi file test case:

```markdown
# TC-{MODULE}-UCT-{ID}: {Tên ngắn gọn}

## Requirement ID

{FEATURE_ID}

## Module / Test type / Technique

{MODULE} / Functional / Use Case Testing

## Scenario Type / Extension ID

{Main Success Scenario / Extension 1a / Extension 2b ...}

## Primary Actor

{Primary Actor}

## Preconditions

- {Precondition của Use Case}

## Test data

| Field / Parameter | Value                |
| ----------------- | -------------------- |
| Actor Input       | {Dữ liệu thử nghiệm} |
| ...               |                      |

## Test steps

1. {Bước 1: Actor thực hiện hành động}
2. {Bước 2: Hệ thống xử lý & phản hồi}
   ...

## Expected result

- Đối chiếu kết quả mong đợi:
  - Nếu là Main Success Scenario hoặc Extension thành công: Đối chiếu với **Success Guarantees** ({Mô tả cụ thể}).
  - Nếu là Extension thất bại/ngoại lệ: Đối chiếu với **Minimal Guarantees** ({Mô tả cụ thể: dữ liệu không bị sai lệch, không lộ mật khẩu/thông tin nhạy cảm...}).

## Status / Related bugs

Not Run / None
```

---

### Quy tắc phân tích & Lưu ý quan trọng (từ SKILL (1).md gốc)

1. **Minimal Guarantees vs Success Guarantees — luôn đối chiếu đúng loại**:
   - Test case cho Main Success Scenario và các Extension **thành công** → kiểm tra theo **Success Guarantees**.
   - Test case cho Extension **thất bại/ngoại lệ** → kiểm tra theo **Minimal Guarantees** (ví dụ: dữ liệu không bị mất, giao dịch được rollback, không lộ thông tin nhạy cảm), KHÔNG kiểm tra theo Success Guarantees vì use case chưa thành công.
2. **Đánh số Extension bám theo bước gốc**:
   - Luôn ghi rõ extension rẽ ra từ bước nào của Main Success Scenario (`2a`, `3a`, `3b`...) để test case phản ánh đúng ngữ cảnh.
3. **Level ảnh hưởng đến độ chi tiết**:
   - If **Clam level** (sub-function): test case tập trung vào input/output kỹ thuật của bước đó, không lặp lại ngữ cảnh use case cha.
   - If **Kite level**: cân nhắc trỏ về các use case sea level con.
4. **Precondition không cần test lại**:
   - Precondition được xem là đã đúng trước khi use case bắt đầu, không viết test case lặp lại trong phạm vi use case này.
5. **Nhận diện thiếu thông tin**:
   - Nếu spec không đề cập rõ Minimal Guarantees hoặc Success Guarantees, chú thích **"? – Chưa được định nghĩa"** và đề xuất người dùng làm rõ.

---

### PHASE 2: GENERATE REPORTS, TEST RUNS & REST SCRIPTS

**Objective**: Lưu toàn bộ thiết kế ở Phase 1 vào file test design, bắt buộc khởi tạo/cập nhật bảng Test Run và sinh file REST Client (.rest) cho từng Test Case.

**Instructions for AI**:

1. **Tạo/Cập nhật file Test Design**:
   Ghi toàn bộ nội dung của **Step 1, Step 2 và danh sách Test Cases tổng hợp** vào file:
   `tests/test-design/Use_Case_Testing.md` (Append dưới header của `{FEATURE_ID}`).

2. **Bắt buộc Tạo/Cập nhật file Test Run**:
   Tạo hoặc cập nhật bảng Test Run chứa tất cả các test case mới tạo với trạng thái ban đầu là `Not Run`.
   - Đường dẫn file: `tests/test-runs/{MODULE}-test-run.md`.

3. **Bắt buộc Sinh REST Client Scripts (.rest)**:
   Với mỗi Test Case sinh ra, tạo file script tương ứng trong thư mục `tests/test-runs/script/{MODULE}/`:
   - Đường dẫn file: `tests/test-runs/script/{MODULE}/TC-{MODULE}-UCT-{ID}.rest`

---

### PHASE 3: LINT & FORMAT

**Objective**: Đảm bảo chất lượng định dạng Markdown.

**Instructions for AI**:

1. Tự kiểm tra cú pháp Markdown của các file vừa tạo.
2. Chạy lệnh prettier để format (nếu có sẵn prettier trong project):
   ```bash
   npx prettier --write "tests/**/*.md" "tests/test-design/*.md"
   ```

---

### PHASE 4: AI AUDIT LOGGING

**CRITICAL**: After completing ALL phases, the AI MUST append an audit entry to `report/AI_Audit_Report.md`. (Tạo file nếu chưa tồn tại).

**Entry format**:

```markdown
### Entry {N} — Use Case Testing cho {FEATURE_NAME}

| Field                      | Value                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| **AI Tool**                | {Tool name}                                                                                        |
| **Date/Time**              | {ISO 8601 timestamp}                                                                               |
| **Task**                   | Use Case test case design for {FEATURE_ID}                                                         |
| **Output Summary**         | Generated {N} UCT TCs (1 Main Success Scenario + {M} Extensions), Test Run table, and REST scripts |
| **Human Review Required**  | Yes — review all TCs for correctness and completeness                                              |
| **Files Created/Modified** | {List of files}                                                                                    |
```

---

## Output format cuối cùng trong Chat

Luôn phản hồi theo thứ tự:

1. Thông báo đã cập nhật `Use_Case_Testing.md`, file Test Run (`{MODULE}-test-run.md`), các file REST script (`tests/test-runs/script/{MODULE}/*.rest`), và `AI_Audit_Report.md`.
2. Hiển thị lại **Đặc tả Use Case chuẩn hóa** trong chat để người dùng review nhanh.
3. Liệt kê danh sách các file test case, test run và REST scripts đã tạo/cập nhật.
4. Nêu các điểm cần làm rõ (nếu spec có chỗ mơ hồ hoặc thiếu Minimal/Success Guarantees).

---

## Tips for Human Reviewer

- [DO] Kiểm tra xem AI đã xác định ĐÚNG và ĐỦ 8 fields đặc tả Use Case chưa.
- [DO] Đảm bảo Minimal Guarantees và Success Guarantees được phân biệt rõ ràng.
- [DO] Kiểm tra xem các file script REST Client (.rest) trong `tests/test-runs/script/{MODULE}/` có thể chạy trực tiếp với REST Client Extension hay không.
- [DO NOT] Submit raw AI output without review.
