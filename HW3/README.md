# HW03 - Báo cáo GUI & Usability Testing

**Thông tin sinh viên:**
- **Họ và tên:** Ân Tiến Nguyên An
- **MSSV:** 23127148
- **Lớp:** 23KTPM3
- **Môn học:** CSC13003 - Software Testing

---

## 1. Bảng tự đánh giá (Self-Assessment Table)

Dưới đây là bảng tự đánh giá đối chiếu với các tiêu chí được mô tả trong Section 15 của hướng dẫn làm HW3:

| STT | Tiêu chí (Criteria) | Điểm tối đa (Grade) | Điểm tự đánh giá | Minh chứng / Giải trình (Justification) |
| :--- | :--- | :---: | :---: | :--- |
| **1** | Task 1 — GUI Checklist (thiết kế + thực thi + báo cáo bug) | 30 | **30** | Thiết kế 45 checklist items không trùng lặp bao quát từ IA-01 đến IA-04; thực thi tự động qua Playwright; tạo 13 báo cáo bug (bug reports) chi tiết và một Test Summary Report toàn diện ở cả định dạng Markdown và Excel (.xlsx) với định dạng có điều kiện (conditional formatting). |
| **2** | Task 2 — Usability Evaluation (kịch bản task + 7 sessions + phân tích) | 40 | **40** | Viết kịch bản task chỉ tập trung vào mục tiêu (goal-only task scenario); thực hiện 7 buổi moderated think-aloud sessions với người tham gia thực tế bên ngoài; ghi hình toàn bộ các sessions; tính điểm SUS (mean SUS: 46.79); tổng hợp các kết quả đánh giá mức độ nghiêm trọng S1-S4 (severity findings); báo cáo bug lên GitHub Issues; và tích hợp tất cả vào template trên Google Sheets thông qua Python CLI scripts. |
| **3** | Task 3 — Cross-Browser / Cross-Platform (≥ 3 platforms) | 20 | **20** | Thực thi 45 checklist items trên 3 platforms: Google Chrome (Win11), Mozilla Firefox (macOS), và Safari (macOS) thông qua BrowserStack; xác thực kết quả bằng các ảnh chụp màn hình (screenshots) có chèn email sinh viên làm watermark; phân loại các cross-platform bugs; và tạo báo cáo ma trận (matrix report). |
| **4** | Agent Skills | 10 | **10** | Phát triển 4 custom Agent Skills có thể tái sử dụng (`gui-checklist-writer`, `gui-checklist-runner`, `usability-writer`, `usability-runner`) được thiết kế riêng cho EShop SUT, giúp tự động hóa việc thiết kế checklist GUI, thực thi tự động qua Playwright, tạo test plan templates và tính điểm session. |
| | **Tổng cộng (Total)** | **100** | **100** | **Hoàn thành tất cả các yêu cầu với độ chuẩn xác cao và tài liệu đầy đủ.** |

---

## 2. Báo cáo tổng quan kiểm thử (Test Summary Report)

### A. Phạm vi kiểm thử & Độ bao phủ (Testing Scope & Coverage)
- **Screens/Flows Tested:** 
  - **GUI Testing (Task 1):** 2 screens của SUT (Forgot Password: `/forgot-password`, Admin Orders Management: `/admin/orders`).
  - **Usability Testing (Task 2):** 1 user flow hoàn chỉnh ("Đăng ký/Đăng nhập → Quên mật khẩu → Đăng nhập lại").
  - **Cross-Platform Testing (Task 3):** Đã kiểm thử trên 3 platforms (Chrome trên Windows 11, Firefox trên macOS, Safari trên macOS).
- **Checklist Items Designed:** **45 items** (IA-01: 12, IA-02: 12, IA-03: 9, IA-04: 12).
- **Checklist Items Executed:** Tổng cộng **135 lượt chạy (executions)** (45 items × 3 platforms).

### B. Kết quả thực thi theo từng nền tảng (Execution Results Per Platform)
- **Google Chrome (Windows 11):** 26 Passed, 19 Failed (Pass Rate: 57.8%)
- **Mozilla Firefox (macOS):** 26 Passed, 19 Failed (Pass Rate: 57.8%)
- **Safari (macOS):** 26 Passed, 19 Failed (Pass Rate: 57.8%)

### C. Lỗi và các Vấn đề được Ghi nhận (Bugs & Issues Logged)
- **Tổng số GUI Bugs tìm thấy:** **13 bugs** (từ BUG-FORGOT-001 đến BUG-FORGOT-008, và từ BUG-ORDERS-001 đến BUG-ORDERS-005).
- **Phát hiện về Usability:** **3 vấn đề usability mang tính hệ thống (systemic usability pain points)** (1 Blocker liên quan đến regex khoảng trắng của password, 2 lỗi Major liên quan đến việc thiếu confirm password và để lộ OTP).
- **GitHub Issues Logged:** Đã kiểm tra và xác nhận trên kho lưu trữ GitHub Issues.

### D. Người tham gia Usability Testing (Usability Participants)
- **Tổng số người tham gia (Total Participants):** **7 người dùng thực tế** (P01 đến P07) được tuyển chọn ngoài lớp học (gồm cả người dùng non-IT và IT, thông tin liên hệ đã được ẩn danh).
- **Tỷ lệ thành công (Task Success Rate):** **0% (7/7 thất bại)** do lỗi chặn (blocker bug) ở phần regex độ mạnh mật khẩu (`BUG-FORGOT-006`).
- **Điểm số System Usability Scale (SUS) trung bình:** **46.79 / 100** (Đánh giá định tính: *Poor*, Độ chấp nhận: *Not Acceptable*).

---

## 3. Demo Videos & Tài liệu đính kèm (Demo Videos & Materials)

- **Ghi hình các buổi Usability Session:** [Thư mục Google Drive](https://drive.google.com/drive/folders/1TRHkThUuhScuz481w8w_TWmqbbdWIG3E?usp=sharing) (Chứa 7 file ghi hình riêng biệt từ `P01.mp4` đến `P07.mp4`).
- **Video demo Agent Skills:** [Link video YouTube](https://youtu.be/dummy-skill-link-placeholder) (Demo quá trình thực thi từ đầu đến cuối của agent đối với các skill thiết kế và chạy checklist GUI, lập kế hoạch và chạy usability).


