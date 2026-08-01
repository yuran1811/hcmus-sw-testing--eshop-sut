# Báo cáo usability evaluation — U-001

> Template cuối cùng đã gộp phần điểm số và findings để giảm số lượng file. Chỉ xuất khi đã có 7 phiên thật, pilot riêng và review thủ công.

**MSSV:** 23127115  
**Luồng:** Đăng ký → Đăng nhập → Xem sản phẩm → Thêm giỏ hàng → Checkout  
**Bản test:** `https://23127115-testing-hw3.vercel.app/`

## 1. Executive summary

- Independent completion: `<n>/7`
- Completed with help: `<n>/7`
- Not completed: `<n>/7`
- SUS mean/median/min/max/range: `<...>`
- Major findings: `<...>`
- Minor findings: `<...>`

## 2. Method

- Phương pháp: moderated think-aloud.
- Mẫu: 1 pilot riêng + 7 participant thật.
- Scenario dùng bản đã chốt sau pilot.
- Instrument: SUS + 4 câu hỏi mở.
- Ethics: consent, screen recording, audio nếu participant đồng ý.

## 3. Participants

| ID  | Online-shopping experience | Session date | Valid session? |
| --- | -------------------------- | ------------ | -------------- |
| P01 |                            |              |                |
| P02 |                            |              |                |
| P03 |                            |              |                |
| P04 |                            |              |                |
| P05 |                            |              |                |
| P06 |                            |              |                |
| P07 |                            |              |                |

Liên hệ đã che nằm trong `recruiting_screen.md`.

## 4. Quantitative results

| ID  | Completion | Time | M2  | SUS |
| --- | ---------- | ---- | --- | --- |
| P01 |            |      |     |     |
| P02 |            |      |     |     |
| P03 |            |      |     |     |
| P04 |            |      |     |     |
| P05 |            |      |     |     |
| P06 |            |      |     |     |
| P07 |            |      |     |     |

Ghi mean, median, min, max và range. SUS không phải phần trăm.

## 5. Findings

| ID  | Finding | Sessions (n/7) | Severity | Evidence | Recommendation | Bug/Issue |
| --- | ------- | -------------- | -------- | -------- | -------------- | --------- |
| F01 |         |                |          |          |                |           |

Gộp các quan sát lặp lại, tách one-off khỏi systemic, và giữ rationale human-reviewed.

## 6. Bug reports

- Tạo bug Markdown thật cho mỗi finding đáng kể.
- Chỉ tạo GitHub Issue khi đã review xong.
- Mọi bug phải có bằng chứng và link hai chiều với finding.

## 7. Traceability

- Raw notes: `3_sessions/P01.md` … `3_sessions/P07.md`
- Bugs: `5_evidence/bug_index.md`
- Final report: file này

## 8. Limitations

- `n=7`, mẫu nhỏ.
- Think-aloud có thể làm thay đổi hành vi.
- Bản test là demo đã deploy, không phải payment thật.
- Recovery giúp tiếp tục quan sát nhưng không xóa thất bại ban đầu.

## 9. Finalization checklist

[] Không còn `<placeholder>` quan trọng.
[] 7 session IDs và raw score khớp giữa mọi file.
[] Mọi finding có evidence.
[] Mọi bug có file Markdown và, nếu cần, GitHub Issue thật.
[] AI Audit và AI Critique đã được cập nhật.
