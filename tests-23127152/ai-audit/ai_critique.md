# AI Critique — HW03 SV 23127152

Trong HW03, AI (Cursor Agent) hữu ích ở phần khung: sinh checklist theo IA-01…IA-04, kịch bản usability goal-oriented, bảng SUS/probes, và template bug report. Tuy nhiên AI thường **thiếu** các điểm “mù” của model: accessibility (`label`/`htmlFor`, `aria-live`), mật khẩu `type="text"`, tiêu đề Login ghi “Đăng Ký”, và mâu thuẫn placeholder SĐT `0912…` với regex không chấp nhận số 0 đầu. Những item này chỉ xuất hiện rõ sau **critical review** và khi chạy thật trên SUT — đúng với pattern Weak Prompt Input / Model Blind Spot trong skill checklist.

Ở Task 2, AI **không** được (và không nên) bịa participant hay timeline. Khi có survey thật, AI hỗ trợ chấm SUS và gom findings; nhưng dễ **over-generalize** từ quote thành severity cao nếu không đối chiếu tần suất x/7. Nguyên tắc rút ra: AI lo scaffolding và công thức; người giữ gate Pass/Fail, severity, và bằng chứng (screenshot watermark, Issues, phiếu khảo sát).

Với Task 3, AI tự động hoá capture/watermark tốt, nhưng ảnh chỉ có giá trị khi cửa sổ browser thật hiện URL localhost — lần capture viewport-only từng tạo ảnh đen/không đủ identity, buộc human cấp quyền Screen Recording và chạy lại. Kết luận collaborate: **AI-first có kỷ luật** (từng phase/skill), **human review bắt buộc**, và mọi claim phải truy được về artefact trong repo hoặc Issue.

*(≈ 260 từ)*
