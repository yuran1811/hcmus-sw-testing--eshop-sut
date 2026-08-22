# Báo Cáo Tổng Quan Bài Tập HW06 — Kiểm Thử API (HW06 API Testing Summary)

---

## 1. Thông Tin Sinh Viên & Bài Nộp

| Mục | Chi Tiết |
| :--- | :--- |
| **Họ và tên sinh viên** | **Ân Tiến Nguyên An** |
| **Mã số sinh viên (MSSV)** | **23127148** |
| **Lớp / Khóa** | 23CLC08 |
| **Môn học** | Kiểm chứng phần mềm (Software Testing — CS423 / CSC13003) |
| **Giảng viên lý thuyết & thực hành** | TS. Lâm Quang Vũ / TS. Trần Duy Hoàng / ThS. Trần Thị Bích Hạnh |
| **Mã bài tập** | HW06-AI (API Testing with Postman & AI-Driven Test Generation) |
| **Mức Bloom-AI đạt được** | **G9.2 (Apply), G9.3 (Analyse), G9.4 (Collaborate), G9.5 (Create)** |
| **Public GitHub Repository** | [https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw6/23127148-nguyenan](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw6/23127148-nguyenan) |
| **Postman Collections & Environment** | [HW6/Postman/](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw6/23127148-nguyenan/HW6/Postman) |
| **Báo Cáo & HTML Reports** | [HW6/Report/](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw6/23127148-nguyenan/HW6/Report) |
| **CI/CD Workflow & Runs** | [GitHub Actions Runs](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions) |
| **Hệ thống kiểm thử (SUT)** | EShop Demo Application (`backend/server.js`) |
| **Base URL** | `http://localhost:3000` |
| **Header chống gian lận (Anti-Cheat)** | `X-Student-Id: 23127148` (Tự động cấu hình trong Pre-request scripts) |
| **Điểm tự đánh giá (Self-Assessed Grade)** | **100 / 100** |

---

## 2. Self-Assessment Table (15. Assessment Template)

### 15. Assessment Template

| No. | Criteria | Grade | Self-Assessed Grade | Evidence & Notes |
| :---: | :--- | :---: | :---: | :--- |
| **1** | **API 1 — full pipeline (generate + audit + extend + execute + bugs)**<br>*(Endpoint: `POST /api/forgot-password` — FR-03)* | 30 | **30** | - 45 test cases (40 AI + 5 Human Extended)<br>- Human Audit AI-02 đầy đủ phán quyết & Student fix<br>- 5 Lỗi SUT được báo cáo chi tiết (`BUG-FORGOT-001..005`)<br>- Báo cáo HTML Newman 40 requests (93.0% pass rate) |
| **2** | **API 2 — full pipeline (same criteria)**<br>*(Endpoint: `PUT /api/orders/:id/cancel` — FR-10)* | 30 | **30** | - 45 test cases (40 AI + 5 Human Extended)<br>- Bắt lỗi nghiêm trọng dòng 329 cho phép hủy đơn hàng `shipping`<br>- 2 Lỗi SUT được báo cáo (`BUG-CANCEL-001..002`)<br>- Báo cáo HTML Newman 44 requests (77.4% pass rate) |
| **3** | **API 3 — full pipeline (same criteria)**<br>*(Endpoint: `POST /api/admin/import-products` — FR-16)* | 30 | **30** | - 45 test cases (40 AI + 5 Human Extended)<br>- Bắt lỗ hổng BFLA Admin phân quyền dòng 199<br>- 3 Lỗi SUT được báo cáo (`BUG-IMPORT-001..003`)<br>- Báo cáo HTML Newman 45 requests (100.0% pass rate) |
| **4** | **Agent Skills (AI-driven test generator)**<br>*(Bloom-AI Level G9.5 Create)* | 10 | **10** | - Reusable Agent Skill `api-test-generator` & `api-test-executor`<br>- Sơ đồ kiến trúc tự thiết kế (`diagram.md`)<br>- Đặc tả hình thức thuật toán 5 giai đoạn (`pseudocode.md`) |
| | **Total** | **100** | **100** | **Hoàn thành toàn diện 100% tất cả tiêu chí đánh giá** |


---

## 3. Báo Cáo Tổng Hợp Kiểm Thử (Test Summary Report)

### 3.1 Thống Kê Tổng Quan Hệ Thống

```
+-------------------------------------------------------------------------------+
|                        EShop SUT HW06 Test Metrics                            |
+--------------------------+----------------------------------------------------+
| Số lượng API phân hệ     | 3 APIs (Pool A, Pool B, Pool C)                    |
| Tổng số Test Cases       | 135 Test Cases (45 TCs / API)                      |
| - AI-Generated (Audited) | 120 Test Cases (40 TCs / API)                      |
| - Human Extended Cases   | 15 Test Cases (5 TCs / API - Security & FSM)       |
| Tổng số Requests chạy    | 129 HTTP Requests qua Newman CLI                   |
| Tổng số Assertions       | 172 Assertions                                     |
| - Passed Assertions      | 155 Assertions (90.1%)                             |
| - Failed Assertions      | 17 Assertions (9.9% - Bắt được lỗi & seed gap)     |
| Tổng số Bugs phát hiện   | 10 Lỗi SUT (4 Critical, 5 Major, 1 Medium)         |
| Tỷ lệ chính xác thô AI   | 78.3% (94 Valid / 19 Incomplete / 7 Invalid)       |
| Tỷ lệ chính xác sau Audit| 100.0% (120/120 Cases được hiệu chỉnh hoàn hảo)    |
+--------------------------+----------------------------------------------------+
```

### 3.2 Bảng Chi Tiết Thực Thi Từng Phân Hệ API

| API Phân Hệ & Endpoint | Feature ID | Tổng TC | AI Gen | Human Ext | Số Requests | Assertions | Passed | Failed | Pass Rate | Bugs SUT | File Newman Báo Cáo |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **API 1: `POST /api/forgot-password`** | FR-03 | 45 | 40 | 5 | 40 | 43 | 40 | 3 | **93.0%** | 5 | [`forgot-password-report.html`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW6/Report/newman/forgot-password-report.html) |
| **API 2: `PUT /api/orders/:id/cancel`** | FR-10 | 45 | 40 | 5 | 44 | 62 | 48 | 14 | **77.4%** | 2 | [`order-cancel-report.html`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW6/Report/newman/order-cancel-report.html) |
| **API 3: `POST /api/admin/import-products`** | FR-16 | 45 | 40 | 5 | 45 | 67 | 67 | 0 | **100.0%** | 3 | [`import-products-report.html`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW6/Report/newman/import-products-report.html) |
| **TỔNG CỘNG HỆ THỐNG** | **3 APIs** | **135** | **120** | **15** | **129** | **172** | **155** | **17** | **90.1%** | **10** | **3 File Báo Cáo HTML** |

---

## 4. Danh Sách 10 Lỗi Hệ Thống (Defect Log)

| Mã Bug | Module / API Endpoint | Tên Lỗi Phát Hiện (Bug Title) | Found by TC | Severity / Priority | Vị Trí Mã Nguồn SUT |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **`BUG-FORGOT-001`** | `POST /api/forgot-password` | Lộ mã xác thực OTP (`resetToken`) dạng văn bản rõ trong HTTP response body | `TC-FORGOT-027` | **Critical / P1** | `backend/server.js:78-82` |
| **`BUG-FORGOT-002`** | `POST /api/forgot-password` | Sinh mã OTP 4 chữ số với entropy thấp và PRNG yếu (`Math.random`) | `TC-FORGOT-028` | **Major / P2** | `backend/server.js:75` |
| **`BUG-FORGOT-003`** | `POST /api/forgot-password` | Lỗ hổng dò quét tài khoản (User Enumeration) qua response code (200 vs 404) | `TC-FORGOT-026` | **Medium / P2** | `backend/server.js:71` |
| **`BUG-FORGOT-004`** | `POST /api/forgot-password` | Sập server 500 Internal Server Error khi nhận Content-Type không phải JSON | `TC-FORGOT-034..035` | **Major / P2** | `backend/server.js:69` |
| **`BUG-FORGOT-005`** | `POST /api/forgot-password` | Bypass cờ khóa tài khoản tạm thời (`locked_until`) qua tính năng reset mật khẩu | `TC-FORGOT-041` | **Major / P2** | `backend/server.js:68, 90` |
| **`BUG-CANCEL-001`** | `PUT /api/orders/:id/cancel` | Vi phạm FSM: Cho phép hủy đơn hàng đang ở trạng thái Shipping (Vận chuyển) | `TC-CANCEL-003` | **Critical / P1** | `backend/server.js:329` |
| **`BUG-CANCEL-002`** | `PUT /api/orders/:id/cancel` | Thiếu kiểm tra quyền sở hữu người dùng trong truy vấn UPDATE hủy đơn hàng | `TC-CANCEL-041..042` | **Major / P2** | `backend/server.js:335` |
| **`BUG-IMPORT-001`** | `POST /api/admin/import-products` | Lỗ hổng leo thang đặc quyền BFLA: User thường có thể gọi API Import của Admin | `TC-IMPORT-001` | **Critical / P1** | `backend/server.js:199` |
| **`BUG-IMPORT-002`** | `POST /api/admin/import-products` | Bỏ qua xác thực miền giá trị, cho phép import sản phẩm có giá tiền âm (`price < 0`)| `TC-IMPORT-029` | **Major / P2** | `backend/server.js:205` |
| **`BUG-IMPORT-003`** | `POST /api/admin/import-products` | Batch import thiếu tính nguyên tử (Không có Transaction BEGIN / ROLLBACK) | `TC-IMPORT-041` | **Medium / P3** | `backend/server.js:201-210` |

---

## 5. Cấu Trúc Thư Mục Nộp Bài (Submission Structure)

```
HW6/
├── README.md                                       # Bảng tự đánh giá & Test Summary Report
├── github_link.txt                                 # Đường dẫn GitHub Repository & tài nguyên nộp bài
├── git_commit_log.txt                              # Lịch sử Git commit chi tiết từng bước
├── Excel/
│   └── test_summary.xlsx                           # Sổ bảng tính Excel toàn diện 8 sheets (135 TCs, Dashboard, Matrix)
├── Report/
│   ├── 23127148_HW06_API_Testing_Report.md         # Báo cáo chính Markdown
│   ├── 23127148_HW06_API_Testing_Report.pdf        # Báo cáo chính định dạng PDF
│   ├── images/                                     # Ảnh chụp minh chứng Newman, Pre-request script & Postman
│   └── newman/                                     # 3 File HTML báo cáo kết quả chạy Newman
│       ├── forgot-password-report.html
│       ├── order-cancel-report.html
│       └── import-products-report.html
├── AI Submission/
│   ├── AI_Audit_Report.md                          # Báo cáo Kiểm toán AI Audit (AI-02) chi tiết 120 TCs
│   └── AI_Audit_Report.pdf                         # Báo cáo Kiểm toán AI Audit định dạng PDF
├── CI_CD/
│   └── README.md                                   # Báo cáo cấu hình GitHub Actions & 2 sample commits
├── Agent_Skill/
│   ├── pseudocode.md                               # Đặc tả hình thức thuật toán sinh test case 5 giai đoạn
│   └── diagram.md                                  # Thiết kế kiến trúc sơ đồ Agent Skill G9.5 Create
├── Postman/
│   ├── ForgotPassword.postman_collection.json      # Postman Collection API 1
│   ├── OrderCancel.postman_collection.json         # Postman Collection API 2
│   ├── ImportProducts.postman_collection.json      # Postman Collection API 3
│   └── eshop.postman_environment.json              # Postman Environment Variables
├── OpenAPI/
│   └── openapi.yaml                                # Đặc tả chuẩn OpenAPI 3.0.3 YAML cho toàn bộ 31 API SUT
└── Test/

    ├── Bug_Reports/                                # 10 Báo cáo lỗi chi tiết kèm bước tái hiện
    │   ├── README.md
    │   ├── Github_Issues/                          # 4 Ảnh chụp minh chứng tạo Issues thực tế trên GitHub
    │   ├── ForgotPassword/ (BUG-001 .. BUG-005)
    │   ├── OrderCancel/ (BUG-001 .. BUG-002)
    │   └── ImportProducts/ (BUG-001 .. BUG-003)
    ├── ForgotPassword/                             # 45 Test cases, Checklist, Matrix, Data-driven JSON
    ├── OrderCancel/                                # 45 Test cases, Checklist, Matrix, Data-driven JSON
    └── ImportProducts/                             # 45 Test cases, Checklist, Matrix, Data-driven JSON
```
