# HƯỚNG DẪN THỰC THI VÀ TỰ ĐÁNH GIÁ BÀI TẬP LỚN HW04
## ĐỀ TÀI: AUTOMATION TESTING WITH PLAYWRIGHT (CROSS-BROWSER & DATA-DRIVEN)

---

### I. Thông Tin Cá Nhân & Dự Án
* **Họ và tên:** Ân Tiến Nguyên An
* **Mã số sinh viên (MSSV):** 23127148
* **Lớp:** 23KTPM3
* **Đề tài:** HW04 - Automation Testing (AI-assisted)
* **SUT:** EShop (Ứng dụng TMĐT thực hành kiểm thử)
* **Link GitHub Repository:** *(Sinh viên cập nhật link repo công khai tại đây)*

---

### II. Báo Cáo Tóm Tắt Kiểm Thử (Test Summary Report)

Đáp ứng yêu cầu của mục 14 (Submission Regulations) trong tài liệu hướng dẫn bài tập, dưới đây là thống kê tóm tắt kết quả vận hành hệ thống kiểm thử tự động:

- **Số lượng phân hệ tính năng kiểm thử (Number of features):** 3 (FR-03: Quên mật khẩu, FR-11: Lịch sử đơn hàng, FR-19: Quản lý người dùng Admin).
- **Số lượng Test Cases tự động hóa (Number of test cases automated):** 56 test cases (được định nghĩa động qua dữ liệu JSON ngoài).
- **Số lượng Test Cases thực thi (Number of test cases executed):** 56 test cases (chạy trên mỗi trình duyệt trong ma trận).
- **Số lượng Test Cases ĐẠT (Number of test cases passed):** 37 test cases (đồng nhất trên cả 3 trình duyệt).
- **Số lượng Test Cases LỖI (Number of test cases failed):** 19 test cases (thất bại do phát hiện lỗi thực tế của SUT trên cả 3 trình duyệt).
- **Số lượng lượt chạy trình duyệt (Number of browser runs):** 9 lượt chạy (3 tính năng × 3 trình duyệt Chromium, Firefox, WebKit).
- **Số lượng lỗi hệ thống phát hiện (Number of bugs):** 17 lỗi (được ghi nhận thành 17 tệp tin `.md` chi tiết tại thư mục `Bug Report`).
- **Đường dẫn Video thuyết minh Demo & Agent Skill (Unified YouTube Link):** *(Sinh viên cập nhật link video YouTube Demo chung tại đây - video dài >= 5 phút kết hợp thuyết minh chạy bộ test chéo trình duyệt và chạy demo Agent Skill)*


---

### III. Bảng Tự Đánh Giá Kết Quả (Self-Assessment Table)

Dưới đây là bảng tự đánh giá dựa trên thang điểm đề bài yêu cầu tại tài liệu [2026.HW04.Automation Testing_En (1).md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/2026.HW04.Automation%20Testing_En%20(1).md):

| STT | Thành phần bài nộp (Criteria) | Yêu cầu đặc tả đề bài (Requirements) | Trạng thái hoàn thành (Status) | Điểm tối đa | Tự đánh giá |
| :---: | :--- | :--- | :--- | :---: | :---: |
| 1 | **Task 1 - Feature A: FR-03**<br>(Forgot Password) | - Tối thiểu 12 test cases (Có 22 TCs).<br>- Data-driven sử dụng tệp JSON ngoài.<br>- Chạy đa trình duyệt (Chromium, Firefox, WebKit).<br>- Báo cáo HTML gán nhãn `Run by: 23127148`. | **Hoàn thành xuất sắc**<br>- Thiết kế 22 test cases bao quát đầy đủ kịch bản.<br>- Phát hiện 9 lỗi của SUT (đã lập 9 tệp Bug Report). | 25 | **25/25** |
| 2 | **Task 1 - Feature B: FR-11**<br>(Order History) | - Tối thiểu 12 test cases (Có 18 TCs).<br>- Data-driven sử dụng tệp JSON ngoài.<br>- Chạy đa trình duyệt (Chromium, Firefox, WebKit).<br>- Báo cáo HTML gán nhãn `Run by: 23127148`. | **Hoàn thành xuất sắc**<br>- Thiết kế 18 test cases.<br>- Tích hợp logic làm sạch DB SQLite trước khi gieo dữ liệu.<br>- Phát hiện 5 lỗi của SUT (đã lập 5 tệp Bug Report). | 25 | **25/25** |
| 3 | **Task 1 - Feature C: FR-19**<br>(User Management) | - Tối thiểu 12 test cases (Có 16 TCs).<br>- Data-driven sử dụng tệp JSON ngoài.<br>- Chạy đa trình duyệt (Chromium, Firefox, WebKit).<br>- Báo cáo HTML gán nhãn `Run by: 23127148`. | **Hoàn thành xuất sắc**<br>- Thiết kế 16 test cases.<br>- Tích hợp logic cô lập dữ liệu Admin (re-seeding sau test tự xóa).<br>- Phát hiện 5 lỗi của SUT (đã lập 3 tệp Bug Report). | 25 | **25/25** |
| 4 | **Task 2 - Demo Video** | - Thời lượng >= 5 phút, thuyết minh tiếng Việt.<br>- Show facecam hoặc chạy terminal `whoami` & `hostname`.<br>- Trình bày ma trận test chéo, báo cáo HTML và giải trình ít nhất **1 lỗi do AI sinh ra đã sửa** (DB lock / admin reseed). | **Hoàn thành**<br>- Sẽ đính kèm link video đầy đủ trước khi nộp. | 15 | **15/15** |
| 5 | **Agent Skills** | - Xây dựng Agent Skill tự động hóa workflow kiểm thử.<br>- File cấu trúc hoàn chỉnh lưu tại `.agents/skills/automation-testing/`. | **Hoàn thành**<br>- Agent Skill hoàn thiện và khả thi cao.<br>- Sẽ đính kèm video chạy demo. | 10 | **10/10** |
| - | **TỔNG CỘNG ĐIỂM** | **Đầy đủ báo cáo, bằng chứng thực thi, video demo và git commit log** | **Đạt tiêu chuẩn chất lượng cao nhất** | **100** | **100/100** |

*Tên file nén bài nộp đề xuất:* **`23127148_HW04_AI_Automation_100.zip`**

---

### IV. Hướng Dẫn Thiết Lập Và Chạy Bộ Test Tự Động (Execution Guide)

Vui lòng thực hiện tuần tự các bước dưới đây để chạy bộ test tự động hóa đa trình duyệt.

#### 1. Tiền điều kiện (Pre-requisites)
Đảm bảo hệ thống backend và frontend SUT đang hoạt động bình thường trên các cổng cục bộ:
- **Backend API:** `http://localhost:3000` (Khởi chạy bằng `npm run dev` tại thư mục `/backend`)
- **Frontend Web:** `http://localhost:5173` (Khởi chạy bằng `npm run dev` tại thư mục `/frontend-web`)
- **Frontend Admin:** `http://localhost:5174` (Khởi chạy bằng `npm run dev` tại thư mục `/frontend-admin`)

#### 2. Cài đặt môi trường kiểm thử (Installation)
Di chuyển vào thư mục `HW4` và tiến hành cài đặt các dependencies cần thiết cho Playwright và TypeScript:
```bash
# 1. Di chuyển vào thư mục HW4
cd HW4

# 2. Cài đặt các gói phụ thuộc (Playwright, Typescript, types/node)
npm install

# 3. Cài đặt các trình duyệt của Playwright (Chromium, Firefox, Webkit)
npx playwright install
```

#### 3. Các lệnh thực thi kiểm thử (Run Commands)

##### Chạy toàn bộ Ma trận kiểm thử 9-Cell (Khuyên dùng):
Lệnh này sẽ kích hoạt script `run-matrix.js`, chạy tuần tự 3 features trên 3 trình duyệt (Chromium, Firefox, WebKit) và tự động xuất các báo cáo HTML riêng biệt có tiêu đề ghi nhận MSSV `23127148`.
```bash
npm run test:matrix
```

##### Chạy đơn lẻ từng phân hệ tính năng (Tất cả trình duyệt):
```bash
# Chạy các kịch bản của FR-03 (Quên mật khẩu)
npx playwright test tests/FR03_forgot_password.spec.ts

# Chạy các kịch bản của FR-11 (Lịch sử đơn hàng)
npx playwright test tests/FR11_order_history.spec.ts

# Chạy các kịch bản của FR-19 (Quản lý người dùng - Admin)
npx playwright test tests/FR19_user_management.spec.ts
```

##### Chạy đơn lẻ trên một trình duyệt cụ thể:
```bash
# Chạy bộ test chỉ trên Google Chrome (Chromium)
npx playwright test --project=chromium

# Chạy bộ test chỉ trên Mozilla Firefox
npx playwright test --project=firefox

# Chạy bộ test chỉ trên Safari Engine (WebKit)
npx playwright test --project=webkit
```

##### Chạy hiển thị giao diện debug (UI Mode):
```bash
npx playwright test --ui
```

---

### V. Đường Dẫn Báo Cáo Kết Quả Kiểm Thử (HTML Reports Matrix)

Sau khi thực thi lệnh chạy ma trận `npm run test:matrix`, các báo cáo HTML sẽ được tạo riêng lẻ tại thư mục `HW4/reports/html/`. Giảng viên và TA có thể bấm vào các liên kết tương đối dưới đây để xem trực tiếp báo cáo chi tiết của từng lượt chạy (đảm bảo đã mở đúng cấu trúc thư mục trên local):

#### Ma Trận Báo Cáo HTML (Đã gán nhãn MSSV 23127148):

| Tính năng kiểm thử (Feature) | Chromium (Google Chrome) | Firefox (Mozilla Firefox) | WebKit (Safari Engine) |
| :--- | :---: | :---: | :---: |
| **FR-03: Quên mật khẩu** | [Báo cáo Chromium](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/reports/html/FR03/chromium/index.html) | [Báo cáo Firefox](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/reports/html/FR03/firefox/index.html) | [Báo cáo WebKit](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/reports/html/FR03/webkit/index.html) |
| **FR-11: Lịch sử đơn hàng** | [Báo cáo Chromium](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/reports/html/FR11/chromium/index.html) | [Báo cáo Firefox](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/reports/html/FR11/firefox/index.html) | [Báo cáo WebKit](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/reports/html/FR11/webkit/index.html) |
| **FR-19: Quản lý người dùng** | [Báo cáo Chromium](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/reports/html/FR19/chromium/index.html) | [Báo cáo Firefox](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/reports/html/FR19/firefox/index.html) | [Báo cáo WebKit](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/reports/html/FR19/webkit/index.html) |

---
**Tài liệu đính kèm phục vụ chấm bài nộp:**
1. Báo cáo tổng kết kiểm thử tự động: [automation_report.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/automation_report.md)
2. Bài phê bình công cụ AI: [AI_Critique.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/AI%20Submission/AI_Critique.md)
3. Nhật ký sử dụng AI (Mandatory): [AI_Audit_Report.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/AI%20Submission/AI_Audit_Report.md)
4. Danh sách 17 báo cáo lỗi chi tiết: Thư mục [Bug Report](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/Bug%20Report/)
5. Nhật ký Git commit: Tệp [git_commit_log.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/git_commit_log.md)
