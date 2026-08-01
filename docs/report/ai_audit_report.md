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

## Entry 4

- **Tool:** Claude Sonnet 4.6 (via Antigravity IDE — agent "Antigravity")
- **Date/time:** 2026-07-31 11:48
- **Task context:** Task 2 Phase 1 - Usability Evaluation Plan & Preparation (Đăng ký → Đăng nhập → Xem sản phẩm → Thêm giỏ hàng → Checkout)
- **Prompt used (verbatim):**
  > tôi muốn thực hiện kiểm thử usability với luồng Đăng ký → Đăng nhập → Xem sản phẩm → Thêm giỏ hàng → Checkout dựa trên đặc tả trong @[README.md] , sử dụng @[.agents\skills\usability-study-designer\SKILL.md], hãy tạo ra các tài liệu đáp ứng các yêu cầu sau:
  >
  > - Xác định rõ mục tiêu đánh giá.
  > - Viết kịch bản nhiệm vụ (task scenario) theo hướng mục tiêu thực tế, không hướng dẫn từng bước.
  > - Chuẩn bị công cụ đo: **SUS hoặc UEQ-S** (hoặc thang đo tùy chỉnh có giải thích rõ), kèm câu hỏi mở về: độ rõ ràng, khả năng phục hồi lỗi, tốc độ, độ tin cậy.
  >   Thực hiện trong folder @[tests\usability-tests]
- **AI output (verbatim or faithful summary if very long):**
  > Agent đọc các file hướng dẫn, đặc tả hệ thống và tạo ra 5 tài liệu trong thư mục `tests/usability-tests/`:
  >
  > 1. `evaluation_goals.md`: Xác định 3 mục tiêu đánh giá cụ thể (khả năng hoàn thành luồng, xác định pain points, đo lường sự hài lòng SUS ≥ 68).
  > 2. `task_scenario.md`: Viết kịch bản nhiệm vụ dạng goal-oriented (mua quà sinh nhật cho bạn thân có sử dụng mã giảm giá `SAVE10`) và quy định thời điểm facilitator can thiệp.
  > 3. `instrument.md`: Cung cấp thang đo SUS gồm 10 câu bằng tiếng Việt và 4 câu hỏi mở về Clarity, Error Recovery, Speed/Efficiency, Trust/Reliability.
  > 4. `recruiting_screen.md`: Soạn tin nhắn tuyển người, checklist sàng lọc 6 câu để lọc đối tượng không thuộc IT/tester và không học cùng lớp, kèm bảng danh sách trống.
  > 5. `pilot_runsheet.md`: Bản hướng dẫn chi tiết quy trình chạy phiên pilot (chuẩn bị, giới thiệu script, think-aloud, ghi chú nhanh, rà soát sau pilot).
- **What the student changed/kept from this output:**
  - Giữ nguyên toàn bộ nội dung kịch bản và thang đo.
  - Tự căn chỉnh định dạng các bảng markdown cho dễ nhìn và đồng nhất.

---

## Entry 5

- **Tool:** Claude Sonnet 4.6 / Gemini 3.5 Flash (via Antigravity IDE)
- **Date/time:** 2026-07-31 12:03
- **Task context:** Tái cấu trúc thư mục usability và loại bỏ mã giảm giá khỏi luồng test
- **Prompt used (verbatim):**
  > flow hiện tại không áp dụng mã giảm giá, với tôi muốn bỏ các tài liệu hiện tại trong @[tests\usability-tests] vào 1 folder có đánh mã như U-001, bên ngoài có một file md mô tả các flow test để khi xem lại có thể xem file md đó có góc nhìn tổng quát rồi vô từng thư mục biết là test như thế nào
- **AI output (verbatim or faithful summary if very long):**
  > Agent thực hiện các lệnh PowerShell để tạo thư mục `U-001` và di chuyển toàn bộ tài liệu đã tạo vào đó. Sau đó thực hiện cập nhật bỏ các tham chiếu mã giảm giá `SAVE10` khỏi: `evaluation_goals.md`, `task_scenario.md`, `instrument.md`, `pilot_runsheet.md`. Cuối cùng, tạo file `README.md` ngoài cùng để mô tả tổng quát các luồng.
- **What the student changed/kept from this output:**
  - Giữ nguyên cấu trúc thư mục `U-001` và đánh số thứ tự các folder con (`1_`, `2_`,...) theo trình tự thực hiện.
  - Kết hợp với gợi ý phản biện từ AI để mở rộng tài liệu (bổ sung các bản ghi P01-P07, consent form, session protocol, bug index).
  - Tinh gọn bộ tài liệu usability xuống 14 file cốt lõi, chuyển sang URL deploy thật, chuẩn hóa checkbox dạng `[]`.

---

## Hướng Dẫn Cross-Check Trước Submission

Theo skill `ai-audit-report`, trước khi nộp, đối chiếu:

- [ ] Số lượng entries trong log này ~ số bước AI-assisted trong Git commit log
- [ ] Prompt trong mỗi entry là verbatim (copy-paste chính xác), không tái hiện hay làm đẹp
- [ ] Output summary trung thực — ghi rõ nếu AI sinh ra nội dung sai/bịa
- [ ] Mỗi bug report draft (nếu có) có entry riêng
- [ ] Không có bước AI-assisted nào mà không có entry tương ứng ở đây

_Tài liệu theo format skill `ai-audit-report` — Phiên bản: 1.3 — Cập nhật: 2026-07-31_
