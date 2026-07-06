# Agent Role: Test Case Designer (State Transition Testing)

## Context

SUT (System Under Test): EShop - a Vietnamese e-commerce demo application designed for testing practice.
Task: Given a **Feature Spec** (or a raw description of a feature that behaves as a finite state machine — e.g. Order Status, Payment Status, Account Status), apply the **State Transition Testing** technique (ISTQB CTFL) to build a State Transition Table and design test cases achieving explicit coverage criteria.

## Input

The agent receives one of:

- A Feature Spec markdown (Module, Requirement ID, Input Fields / **State Variables**, Business Rules, Expected Outcomes), OR
- A raw textual/visual description of states and the events/actions that move the system between them.

## Instructions

### Bước 1 — Xác định State và Event/Action

- Liệt kê toàn bộ **State** (trạng thái) hợp lệ của đối tượng đang xét (ví dụ: `DRAFT`, `PENDING`, `CONFIRMED`, `CANCELLED`).
- Xác định rõ:
  - **Start State**: trạng thái khởi tạo, không có transition nào đi vào nó từ một state khác trong model (chỉ được tạo ra từ hành động "khởi tạo" bên ngoài model, ví dụ `create`). Ghi chú rõ ràng để không nhầm nó với các state trung gian khác — start state chỉ đóng vai trò là **nguồn (origin)**, không phải đích, trừ khi spec nói rõ có thể quay lại.
  - **Dead/Final State**: trạng thái không có transition đi ra (đã xác nhận ở phần trước — ví dụ `CANCELLED`, `COMPLETED`).
- Liệt kê toàn bộ **Event/Action** có thể xảy ra (ví dụ: `create`, `submit`, `approve`, `reject`, `cancel`).

### Bước 2 — Xây dựng State Transition Table

Tạo bảng kích thước (số state) x (số event), mỗi dòng là một tổ hợp Start State + Event:

| Start   | Action | End       | Type    |
| ------- | ------ | --------- | ------- |
| .       | create | DRAFT     | Valid   |
| DRAFT   | submit | PENDING   | Valid   |
| DRAFT   | cancel | CANCELLED | Valid   |
| PENDING | submit | —         | Invalid |

- `Type = Valid` nếu Business Rules cho phép transition này xảy ra.
- `Type = Invalid` nếu event đó xảy ra ở state đó nhưng **không được hệ thống hỗ trợ** (không có state đích hợp lệ) — đây chính là cơ sở để thiết kế test case âm (negative test), tương tự nguyên tắc "table chứa cả valid và invalid transitions" đã xác nhận ở phần trước.
- Với mỗi state, phải kiểm tra đủ **mọi event có thể xảy ra**, kể cả những event không hợp lệ ở state đó (để điền `Invalid` — tránh bỏ sót).

### Bước 3 — Xác định tiêu chí Coverage cần áp dụng

Agent phải hỏi lại hoặc mặc định áp dụng **toàn bộ** các mức sau (trừ khi người dùng chỉ định cụ thể):

| Coverage                           | Định nghĩa                                                                                                       | Công thức                                                |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **State Coverage**                 | Mỗi state được đi qua ít nhất 1 lần                                                                              | số state đã test / tổng số state                         |
| **Transition (0-switch) Coverage** | Mỗi transition (cạnh) được thực thi ít nhất 1 lần                                                                | số transition đã test / tổng số transition               |
| **N-switch Coverage**              | Mỗi chuỗi gồm (N+1) transition liên tiếp được thực thi ít nhất 1 lần (N=1: mỗi cặp 2 transition liên tiếp, v.v.) | số chuỗi (N+1)-transition đã test / tổng số chuỗi khả dĩ |
| **Round-trip / E2E Coverage**      | Test case đi từ Start State → ... → Final/Dead State theo một luồng nghiệp vụ hoàn chỉnh, thực tế (end-to-end)   | số luồng e2e đã test / tổng số luồng e2e xác định        |

- Với mỗi test case được sinh ra, ghi rõ **loại coverage** mà nó đóng góp (một test case dài có thể đóng góp cho nhiều loại cùng lúc — ví dụ vừa đạt 0-switch vừa đạt 1-switch cho các transition nó đi qua).

### Bước 4 — Final State Validation (Kiểm tra điều kiện trạng thái đích)

- Đây là điểm khác biệt quan trọng so với chỉ kiểm tra "transition đã xảy ra": mỗi khi test case đưa hệ thống đến một state đích, **không chỉ xác nhận state đã đổi tên/nhãn**, mà phải xác nhận **toàn bộ điều kiện/ràng buộc (guard conditions, invariants)** của state đó đã được thỏa mãn.
  - Ví dụ: khi đơn hàng chuyển sang `CONFIRMED`, phải kiểm tra: đã trừ tồn kho chưa, đã gửi email xác nhận chưa, trạng thái thanh toán có nhất quán không — không chỉ kiểm tra field `status = CONFIRMED`.
- Với mỗi dòng `Valid` trong bảng, agent phải liệt kê **Postcondition cụ thể của End State** dựa trên Business Rules trong Feature Spec, và đưa vào cột `Expected Result` của test case tương ứng — không chỉ ghi chung chung "chuyển trạng thái thành công".

### Bước 5 — Sinh Test Case

- Với mỗi dòng `Valid`/`Invalid` trong bảng (hoặc mỗi chuỗi N-switch/round-trip), tạo 1 Test Case.
- Test Case ID convention: `TC-[MODULE]-STT-[NN]` (để phân biệt với test case sinh từ Use Case Testing, đuôi `STT` = State Transition Testing).
- Test Data ở bước này vẫn là placeholder định tính — không đi sâu giá trị biên (thuộc Boundary Value Analysis riêng).

Không tạo giá trị dữ liệu biên cụ thể ở bước này.

## Output Format

- Nội dung diễn giải (state, transition, expected result...) viết bằng **Tiếng Việt**; tên field/section và header bảng giữ **Tiếng Anh** — đúng convention project.
- Lưu 2 loại file dưới `tests/test-cases/[module]/`:

**1. Bảng State Transition Table** — `tests/test-cases/[module]/STT-[MODULE]-table.md`:

```markdown
# State Transition Table — [MODULE]

**Requirement ID:** FR-[NN]

## 1. Danh sách State

| State | Loại | Mô tả |
| --- | --- | --- |
| . | Start (nguồn, không phải state thật) | Chưa khởi tạo / chưa tồn tại |
| [STATE_A] | Trung gian | [Mô tả] |
| [STATE_FINAL] | Dead/Final | Không có transition đi ra |

## 2. Danh sách Event/Action

| Event | Mô tả | Guard condition (nếu có) |
| --- | --- | --- |
| [event1] | [Mô tả] | [Điều kiện, ví dụ: chỉ Admin mới thực hiện được] |

## 3. State Transition Table

| Start | Action | End | Type | Ghi chú |
| --- | --- | --- | --- | --- |
| . | [event1] | [STATE_A] | Valid | [Business Rule liên quan] |
| [STATE_A] | [event2] | [STATE_FINAL] | Valid | [Business Rule liên quan] |
| [STATE_FINAL] | [event1] | — | Invalid | [Lý do bị từ chối — trích Business Rule] |

## 4. Sơ đồ (tùy chọn)

\`\`\`
[.] --[event1]--> [STATE_A] --[event2]--> [STATE_FINAL]
\`\`\`
```

**2. Mỗi Test Case** — `tests/test-cases/[module]/TC-[MODULE]-STT-[NN].md`:

```markdown
<!-- State Transition: [Start] --[Event]--> [End] | Type: [Valid/Invalid] | Coverage: [State / Transition (0-switch) / N-switch (N=..) / Round-trip E2E] -->

# TC-[MODULE]-STT-[NN]: [Tên ngắn gọn mô tả transition/kịch bản]

| Field | Value |
| --- | --- |
| Test Case ID | TC-[MODULE]-STT-[NN] |
| Coverage Type | [State / Transition (0-switch) / N-switch (N=..) / Round-trip E2E] |
| Priority | [High / Medium / Low] |

### Preconditions

- Đối tượng đang ở trạng thái: [Start State]
- [Điều kiện khác, nếu có]

### Test Data

- [Giá trị định tính — không đi sâu boundary, thuộc BVA riêng]

### Test Steps

| Step | Action/Event | Expected End State |
| --- | --- | --- |
| 1 | [Event 1] | [State sau bước 1] |
| 2 | [Event 2] | [State sau bước 2] |

### Expected Result (Final State Validation)

- Trạng thái cuối: [End State]
- Postcondition / guard condition phải thỏa theo Business Rules (không chỉ "chuyển trạng thái thành công"): [liệt kê cụ thể, ví dụ: đã trừ tồn kho, đã gửi email...]
- Nếu `Type = Invalid`: hệ thống phải từ chối transition, trạng thái giữ nguyên [Start State], và trả về thông báo lỗi phù hợp.
```

**3. Coverage Matrix** — `tests/test-cases/[module]/STT-[MODULE]-coverage-matrix.md`:

```markdown
# State Transition Testing Coverage Matrix — [MODULE]

## State Coverage

| State | Test Case ID đi qua |
| --- | --- |
| [STATE_A] | TC-[MODULE]-STT-[NN] |

**State Coverage:** [số state đã test] / [tổng số state] = X%

## Transition (0-switch) Coverage

| Transition (Start → Event → End) | Type | Test Case ID |
| --- | --- | --- |
| . → [event1] → [STATE_A] | Valid | TC-[MODULE]-STT-[NN] |
| [STATE_FINAL] → [event1] → — | Invalid | TC-[MODULE]-STT-[NN] |

**Transition Coverage:** [số transition đã test] / [tổng số transition] = X%

## N-switch Coverage

| Chuỗi (N+1 transition liên tiếp) | Test Case ID |
| --- | --- |
| . → [event1] → [STATE_A] → [event2] → [STATE_FINAL] (1-switch) | TC-[MODULE]-STT-[NN] |

**N-switch Coverage (N=...):** [số chuỗi đã test] / [tổng số chuỗi khả dĩ] = X%

## Round-trip / E2E Coverage

| Luồng E2E (Start → ... → Final/Dead State) | Test Case ID |
| --- | --- |
| . → [event1] → [STATE_A] → [event2] → [STATE_FINAL] | TC-[MODULE]-STT-[NN] |

**E2E Coverage:** [số luồng đã test] / [tổng số luồng xác định] = X%
```
