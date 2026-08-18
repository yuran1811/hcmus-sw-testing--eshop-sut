---
name: api-testcase-auditor
description: Rà soát bộ test case API do AI sinh - gán nhãn VALID/INVALID/INCOMPLETE kèm lý do, sửa case sai, và bổ sung các case AI bỏ sót (đặc biệt security, state transition, IDOR, race condition) kèm phân tích nguyên nhân bỏ sót. LUÔN dùng skill này khi người dùng nhắc tới "audit test case", "review test case AI sinh", "gán nhãn VALID INVALID", "bổ sung case AI bỏ sót", "extend test case", "human review test case", hoặc dán một bảng/CSV test case và hỏi "bộ này ổn chưa".
---

# API Test Case Auditor

Skill này thực hiện bước **Audit (human review)** và **Extend** của HW06. Đây là bước quyết định điểm số: đề bài ghi rõ "submitting the raw AI output without review is not acceptable" và sinh viên chịu trách nhiệm hoàn toàn về tính đúng đắn của test case cuối cùng.

Vai trò của skill là làm *người phản biện*, không phải người tán thành. Nếu rà 40 case mà không tìm ra case nào INVALID hay INCOMPLETE, gần như chắc chắn việc rà chưa đủ sâu — hãy soi lại theo checklist thay vì kết luận "bộ test tốt".

## Input cần có

- File `TC_<API>.csv` hoặc bảng test case (từ skill `eshop-api-test-generator` hoặc nguồn khác)
- Trích đoạn `api_specification.md` của endpoint tương ứng — **bắt buộc**, vì không có spec thì không thể phán một case là đúng hay sai
- Nếu có: kết quả chạy thật của SUT (giúp phân biệt "test sai" với "SUT có bug")

Thiếu spec thì hỏi lại, đừng audit theo cảm tính.

## Phần 1 — Audit từng case

Với mỗi case, gán đúng 1 nhãn:

| Nhãn | Khi nào | Hành động |
|---|---|---|
| **VALID** | Kỳ vọng đúng theo spec, dữ liệu cụ thể, assert được, truy vết được về FR/SEC | Giữ nguyên |
| **INVALID** | Kỳ vọng sai so với spec, endpoint/method sai, precondition mâu thuẫn, hoặc case kiểm chứng điều spec không quy định như thể đó là quy định | **Sửa lại** và ghi rõ sửa gì |
| **INCOMPLETE** | Hướng đúng nhưng thiếu chi tiết: dữ liệu mơ hồ ("dữ liệu hợp lệ"), thiếu precondition, expected chỉ có status mà không có nội dung, thiếu spec_ref | **Bổ sung** cho đủ |

Đọc `references/audit-rubric.md` để lấy danh sách dấu hiệu cụ thể của từng nhãn — nó liệt kê các lỗi mà LLM sinh test hay mắc (kỳ vọng 400 cho case đáng lẽ 409, dùng 401 thay 403, giả định field không tồn tại trong spec, v.v.).

Lý do (`AuditReason`) phải nêu **bằng chứng**, không phải cảm nhận:

- Tốt: "INVALID — spec mục 4.2 quy định email trùng trả 409 Conflict, case này kỳ vọng 400"
- Kém: "INVALID — kỳ vọng không hợp lý"

### Output phần 1

Điền 2 cột `AuditLabel`, `AuditReason` vào CSV gốc (giữ nguyên thứ tự cột), kèm bảng thống kê:

```markdown
| Nhãn | Số case | Tỷ lệ |
|---|---|---|
| VALID | 28 | 70% |
| INVALID | 5 | 12.5% |
| INCOMPLETE | 7 | 17.5% |
```

Và bảng liệt kê chi tiết các case INVALID/INCOMPLETE: TC_ID · vấn đề · nội dung đã sửa. Bảng này đi thẳng vào báo cáo chính.

## Phần 2 — Extend: tìm case AI bỏ sót

Đề bài yêu cầu **tối thiểu 5 case** tự thêm, ưu tiên security và state transition, kèm giải thích *tại sao* AI bỏ sót.

Cách tìm có hệ thống (đừng brainstorm ngẫu nhiên): duyệt `references/blindspot-catalog.md`, đối chiếu từng nhóm blind spot với bộ case hiện có. Nhóm nào chưa có case nào → đó là ứng viên.

Các nhóm AI bỏ sót nhiều nhất, theo thứ tự:

1. **Quan hệ dữ liệu giữa nhiều user** — IDOR, cross-tenant. AI đọc chữ ký endpoint không suy ra được ai sở hữu resource nào.
2. **Tác dụng phụ của chuyển trạng thái** — huỷ đơn có hoàn kho không, có trả lại lượt coupon không. Spec mô tả trạng thái, không mô tả side effect.
3. **Đồng thời / thứ tự** — double submit, race condition, idempotency. Test case là mô hình tuần tự nên AI mặc định thế giới tuần tự.
4. **Ràng buộc xuyên endpoint** — xoá sản phẩm đang nằm trong đơn hàng; sửa giá sau khi đã thêm vào giỏ. Cần nhìn toàn hệ thống, AI chỉ được cho xem 1 endpoint.
5. **Ngữ cảnh vận hành** — dữ liệu tiếng Việt có dấu, timezone GMT+7, số tiền VNĐ không có phần lẻ, giới hạn 72 byte của bcrypt.

Mỗi case thêm phải ghi `Source = HUMAN` để phân biệt rõ trong file nộp.

### Giải thích nguyên nhân bỏ sót

Với mỗi case thêm, phân loại nguyên nhân vào đúng 1 trong 3 nhóm (đề bài liệt kê chính xác 3 nhóm này):

| Nguyên nhân | Nghĩa là | Ví dụ |
|---|---|---|
| **Prompt quality** | Thông tin có sẵn nhưng người dùng không đưa vào prompt | Không cung cấp mục SEC-04 nên AI không sinh case IDOR |
| **Model limitation** | Có thông tin nhưng model không suy luận ra | Có bảng trạng thái nhưng model chỉ sinh đường đi hợp lệ, bỏ ô invalid |
| **API characteristic** | Bản thân spec không chứa thông tin đó | Spec không mô tả hành vi hoàn kho khi huỷ đơn |

Phân loại trung thực quan trọng hơn phân loại đẹp: nếu nguyên nhân thật là do prompt của mình sơ sài thì ghi đúng như vậy — đây chính là nội dung của mục AI Critique (200–300 từ) sau này, và TA đọc được sự khác biệt giữa phản tỉnh thật và lời khen chung chung.

### Output phần 2

```markdown
### Extended test cases (Source = HUMAN)

| TC_ID | Title | Category | Vì sao AI bỏ sót | Nhóm nguyên nhân |
|---|---|---|---|---|
| TC-B-ORDER-ST-021 | Huỷ đơn đã trừ kho phải hoàn lại tồn kho | ST | Spec chỉ mô tả trạng thái, không mô tả side effect lên inventory | API characteristic |
```

Kèm đầy đủ chi tiết từng case theo đúng schema CSV để chạy được ngay.

## Phần 3 — Phân biệt "test sai" và "SUT có bug"

Khi có kết quả chạy thật, một case fail có 2 khả năng. Kết luận sai ở đây dẫn tới bug report rác hoặc bỏ lọt bug thật.

Quy trình phán:

1. Đối chiếu hành vi thực tế với **nguyên văn spec** — spec nói gì?
2. Nếu spec quy định rõ và SUT làm khác → **bug của SUT** → mở GitHub Issue, kèm request/response thật
3. Nếu spec không quy định → **không phải bug**, mà là *spec gap* → ghi vào mục "Câu hỏi cho spec", có thể vẫn báo cáo như observation
4. Nếu spec quy định rõ và test hiểu sai spec → **test sai** → sửa test, gán INVALID

Bug security (IDOR, mass assignment, thiếu phân quyền) thì dù spec không nói rõ vẫn nên báo cáo — "spec không cấm" không có nghĩa là "an toàn".

## Nhắc về ranh giới

Skill này chỉ audit và thiết kế thêm case. Việc dựng collection và chạy thuộc `postman-newman-builder`; việc viết bug report chi tiết dùng skill bug-reporting sẵn có của bạn.

## Tài nguyên kèm theo

- `references/audit-rubric.md` — dấu hiệu nhận biết từng nhãn, lỗi thường gặp của test case do LLM sinh
- `references/blindspot-catalog.md` — danh mục blind spot để duyệt khi tìm case bổ sung
