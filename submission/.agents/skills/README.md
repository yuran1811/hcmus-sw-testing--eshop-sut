# Agent Skills cho HW06 — Kiểm thử API (EShop)

Thư mục này chứa toàn bộ các Skills hỗ trợ quy trình kiểm thử API bài tập lớn HW06 và các công cụ bổ trợ xuất bản tài liệu.

---

## 1. Danh sách Skills Chính cho Quy trình HW06

| STT | Skill                                                  | Vai trò                                                                                                                                                           | Tương ứng bước trong đề bài                          |
| :-- | :----------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| 1   | [`api-test-case-generator`](./api-test-case-generator) | Hướng dẫn AI qua 4 vòng sinh test case (Phân vùng tương đương/Giá trị biên → Chuyển trạng thái → Bảo mật → Kiểm định Schema); khởi tạo file Excel test case chuẩn | Mục 6.1 (Generate) & Mục 7 (Thiết kế test generator) |
| 2   | [`ai-audit-report`](./ai-audit-report)                 | Ghi nhận chi tiết từng lượt tương tác với AI (công cụ, thời gian, prompt chính xác, output) và dàn ý AI Critique 200–300 từ                                       | Mục 9 (AI Audit Report) & Mục 10 (AI Critique)       |
| 3   | [`postman-newman-runner`](./postman-newman-runner)     | Tạo Postman collection/environment, đính kèm header `X-Student-Id` qua Pre-request Script, chạy Newman và xuất báo cáo HTML                                       | Mục 6.4 (Execute) & Yêu cầu kỹ thuật Postman         |
| 4   | [`bug-report-writer`](./bug-report-writer)             | Viết báo cáo lỗi (Bug Report) chuẩn theo mẫu + chuẩn bị nội dung issue cho GitHub Issues                                                                          | Mục 6.5 (Report bugs)                                |
| 5   | [`cicd-pipeline-setup`](./cicd-pipeline-setup)         | Cấu hình GitHub Actions chạy Newman tự động, tạo 2 commit minh họa (pass/fail)                                                                                    | Mục 6 (CI/CD)                                        |
| 6   | [`hw06-report-builder`](./hw06-report-builder)         | Tổng hợp báo cáo chính, README tự đánh giá điểm và checklist các file cần nộp                                                                                     | Mục 14 (Yêu cầu nộp bài) & Mục 15 (Bảng điểm)        |

---

## 2. Danh sách Skills Bổ trợ Định dạng & Xuất Tài liệu

| STT | Skill                              | Vai trò                                                                                                                                   | Mục đích sử dụng                         |
| :-- | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| 7   | [`doc_generator`](./doc_generator) | Tự động tạo và đồng bộ tài liệu định dạng song song Markdown (.md) và PDF (.pdf), hỗ trợ chèn sơ đồ SVG chất lượng cao và mục lục tự động | Định dạng báo cáo PDF chuẩn nộp bài      |
| 8   | [`md-to-pdf`](./md-to-pdf)         | Xuất file Markdown sang PDF chuyên nghiệp thông qua tiện ích mở rộng VS Code (yzane.markdown-pdf) với CSS tùy chỉnh cao cấp               | Xuất nhanh file PDF trực tiếp từ VS Code |

---

## 3. Quy trình Thực hiện Đề xuất (Áp dụng cho từng API trong số 3 API đã chọn)

```
1. api-test-case-generator   -> Sinh >= 35 test cases (qua 4 vòng)
   └─ Sau mỗi lượt gọi AI    -> ai-audit-report (ghi log tức thì, không gom lại cuối buổi)
2. postman-newman-runner     -> Tạo Postman collection, gắn X-Student-Id, chạy Newman
3. bug-report-writer         -> Với mỗi lỗi thật tìm thấy, viết bug report + tạo GitHub Issue
(Lặp lại các bước trên cho cả 3 API)
4. cicd-pipeline-setup       -> Thiết lập CI/CD pipeline, tạo 2 commit mẫu
5. hw06-report-builder       -> Tổng hợp báo cáo chính, file README và đóng gói nộp bài
6. doc_generator / md-to-pdf -> Biên dịch và xuất các báo cáo Markdown sang PDF hoàn chỉnh
```

---

## 4. Các Lưu ý Quan trọng

- **Không dùng một prompt chung chung duy nhất** để sinh toàn bộ test case — luôn luôn sinh theo từng vòng có cấu trúc như hướng dẫn trong skill `api-test-case-generator`.
- **Sinh viên chịu trách nhiệm về từng test case cuối cùng** — cần rà soát kỹ lưỡng kết quả từ AI trước khi đưa vào kiểm thử, không nộp nguyên văn output chưa qua kiểm duyệt.
- **Sơ đồ thiết kế Test Generator (Mục 7) phải tự vẽ bằng tay** — tuyệt đối không dùng AI để sinh trực tiếp ảnh sơ đồ. Các skill chỉ hỗ trợ gợi ý khối và mã giả (pseudocode).
- **Header `X-Student-Id`** bắt buộc phải cấu hình qua Pre-request Script (đã tích hợp sẵn trong skill `postman-newman-runner`) để có bằng chứng ghi nhận tại console log.
- **Ghi log tương tác AI (skill `ai-audit-report`)** ngay sau mỗi lượt trao đổi với AI, tránh gom lại ghi hồi tố vào cuối buổi.

---

## 5. Cài đặt Môi trường Cần thiết (Python/Node)

```bash
pip install openpyxl --break-system-packages
npm install -g newman newman-reporter-htmlextra
```
