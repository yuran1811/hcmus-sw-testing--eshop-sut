# AI Audit Report — HW03 EShop GUI & Usability Testing

**Sinh viên:** Mạch Quốc Tấn  
**MSSV:** 23127115  
**Môn học:** Kiểm thử Phần mềm  
**Tuyên bố sử dụng AI:** Tôi sử dụng AI để hỗ trợ các tác vụ sau trong bài tập này.

---

> **Hướng dẫn:** Log này ghi lại **mọi** tương tác AI được sử dụng trong HW03.  
> Mỗi entry phải được ghi **ngay lập tức** sau khi tương tác, không tái hiện lại sau.  
> Format: Tool | Date/time | Task context | Exact prompt | AI output summary | What student changed.

---

## Entry 1

- **Tool:** Claude Sonnet 4.6 (via Antigravity IDE — agent "Antigravity")
- **Date/time:** 2026-07-30 15:40
- **Task context:** Task 1 — Thiết kế GUI checklist cho màn hình Trang Chủ EShop (Steps 1–6 gộp trong 1 lượt)
- **Prompt used (verbatim):**
  > sử dụng @[...skill gui-checklist-ai...], thiết kế checklist cho màn hình trang chủ, đọc đặc tả tại @[README.md], trang chủ có các danh sách sản phẩm, header và footer, thanh tìm kiếm, danh sách checklist sẽ được ghi vào trong folder @[tests/checklists/home], sử dụng @[...skill ai-audit-report] vào ghi lại báo cáo trong folder @[docs/report]
- **AI output (verbatim or faithful summary if very long):**
  > Agent đọc SKILL.md (gui-checklist-ai), SKILL.md (ai-audit-report) và README.md. Sau đó sinh nội bộ (không qua prompt riêng từng bước) toàn bộ:
  >
  > - 45 checklist items chia theo 4 IA aspects (IA-01: 12, IA-02: 8, IA-03: 10, IA-04: 11) + 4 student-added items
  > - ai_gap_analysis.md phân tích 6 hạng mục gap (accessibility, RTL, dark mode, keyboard nav, offline, performance)
  > - ai_audit_report.md ban đầu với 5 entries **giả** (entries đó không phản ánh thật — được phát hiện và sửa lại ở Entry 2 bên dưới)
  >
  > Tất cả 3 files được ghi vào đúng folder theo yêu cầu.
- **What the student changed/kept from this output:**
  - Giữ nguyên cấu trúc 45 checklist items và ai_gap_analysis.md.
  - Cập nhật tên/MSSV trong header của ai_audit_report.md.
  - Sửa markdown table formatting (align columns) trong checklist.md và ai_gap_analysis.md.
  - Phát hiện vấn đề: AI đã bịa 5 entries giả trong audit report, không phản ánh thực tế → yêu cầu sửa lại (Entry 2).

---

## Entry 2

- **Tool:** Claude Sonnet 4.6 (via Antigravity IDE)
- **Date/time:** 2026-07-30 15:53
- **Task context:** Task 1 — Sửa ai_audit_report.md để phản ánh đúng thực tế (chỉ có 1 prompt thật, không phải 5)
- **Prompt used (verbatim):**
  > sao cái ai_audit_report nó không phản ánh đúng thực tế, cái prompt tôi prompt thật sử và kết quả, nãy giờ chỉ mới 1 entry thôi, cập nhật lại @[ai_audit_report.md] và cả skill
- **AI output (verbatim or faithful summary if very long):**
  > Agent thừa nhận đã bịa 5 entries giả. Viết lại ai_audit_report.md với 2 entries thực tế: Entry 1 (prompt gốc sinh checklist) và Entry 2 (prompt sửa report). Cập nhật cảnh báo trong header report về tính trung thực.
- **What the student changed/kept from this output:** Giữ nguyên toàn bộ nội dung sửa lại; xác nhận đây phản ánh đúng thực tế.

---

## Entry 3

- **Tool:** Claude Sonnet 4.6 (via Antigravity IDE)
- **Date/time:** 2026-07-30 16:20
- **Task context:** Task 1 — Chuyển ai_gap_analysis.md và checklist.md thành template trống để sinh viên tự đánh giá; cập nhật skill
- **Prompt used (verbatim):**
  > sửa lại cái @[tests/checklists/home/ai_gap_analysis.md] này là do AI tự gen ra chứ không phải sinh viên tự đánh giá, hãy sử lại skill và chỉ cung cấp template để sinh viên thực hiện
- **AI output (verbatim or faithful summary if very long):**
  > Agent overwrite file ai_gap_analysis.md thành cấu trúc template rỗng để sinh viên tự điền. Cập nhật file SKILL.md (gui-checklist-ai) để bổ sung rule cấm AI tự điền gap analysis. Dọn dẹp checklist.md đưa các item student-added về dạng trống để sinh viên tự điền.
- **What the student changed/kept from this output:** Xác nhận file gap analysis và phần items bổ sung ở cuối checklist đã được chuyển về dạng trống hoàn toàn; cập nhật file commit.

---

## Entries Tiếp Theo

> _(Thêm entry mới ngay lập tức sau mỗi tương tác AI tiếp theo — không để đến cuối mới ghi)_

---

## Hướng Dẫn Cross-Check Trước Submission

Theo skill `ai-audit-report`, trước khi nộp, đối chiếu:

- [ ] Số lượng entries trong log này ~ số bước AI-assisted trong Git commit log
- [ ] Prompt trong mỗi entry là verbatim (copy-paste chính xác), không tái hiện hay làm đẹp
- [ ] Output summary trung thực — ghi rõ nếu AI sinh ra nội dung sai/bịa
- [ ] Mỗi bug report draft (nếu có) có entry riêng
- [ ] Không có bước AI-assisted nào mà không có entry tương ứng ở đây

---

## Tuyên Bố Cuối

"Tôi sử dụng AI tools cho các tác vụ sau: (1) sinh 41 checklist items cho màn hình Trang Chủ (IA-01 đến IA-04) qua một prompt duy nhất gửi cho Antigravity IDE, (2) tạo cấu trúc template trống cho ai_gap_analysis.md, checklist.md, và ai_audit_report.md. Tôi không sử dụng AI để: thực thi checklist (Step 7 — tự kiểm thử trên SUT), tự đánh giá gap analysis, viết lý do AI bỏ sót, tự ý thêm các items bổ sung vào checklist, xác nhận Pass/Failed status, chụp ảnh evidence, hay quyết định severity bug."

---

_Tài liệu theo format skill `ai-audit-report` — Phiên bản: 1.2 — Cập nhật: 2026-07-30_
