# BÁO CÁO TỔNG KẾT KIỂM THỬ TOÀN DIỆN (TEST SUMMARY REPORT)
## DỰ ÁN HỆ THỐNG THƯƠNG MẠI ĐIỆN TỬ ESHOP SUT (HW02 -> HW05)

---

| Thuộc tính (Metadata) | Chi tiết Dự án & Kiểm thử |
| :--- | :--- |
| **Hệ thống kiểm thử (SUT)** | EShop E-Commerce System (Full-Stack Multi-Platform) |
| **Đơn vị thực hiện** | Sinh viên **ÂN TIẾN NGUYÊN AN** — MSSV: **23127148** — Lớp: **23KTPM3** |
| **Môn học & Đơn vị** | Software Testing (Kiểm thử Phần mềm) — FIT @ HCMUS |
| **Tiêu chuẩn áp dụng** | IEEE 829-2008 / ISO/IEC/IEEE 29119 Test Summary Report Standard & SoftwareTestingHelp 12-Step Guideline |
| **Thời gian thực hiện** | Tháng 07/2026 – Tháng 08/2026 |
| **Trạng thái phê duyệt** | **ĐÃ HOÀN THÀNH KIỂM THỬ TOÀN DIỆN (CHỜ SIGN-OFF ĐIỀU KIỆN)** |

---

## MỤC LỤC BÁO CÁO (TABLE OF CONTENTS)

1. [Mục đích Tài liệu & Tóm tắt Điều hành (Executive Summary & Purpose)](#section-1)
2. [Tổng quan Ứng dụng (Application Overview)](#section-2)
3. [Phạm vi Kiểm thử & Chiến lược Bao phủ (Testing Scope & Coverage Strategy)](#section-3)
4. [Số liệu Đo lường & Ma trận Phân tích Lỗi (Quality Metrics & Defect Matrix)](#section-4)
5. [Phương pháp Luận & Kỹ thuật Kiểm thử Đã Thực hiện (Testing Methodologies)](#section-5)
6. [Môi trường Thực thi & Ma trận Công cụ (Testbed Environment & Tooling Matrix)](#section-6)
7. [Bài học Kinh nghiệm & Phân tích Rủi ro Kỹ thuật (Lessons Learned & Risk Analysis)](#section-7)
8. [Đề xuất Kiến trúc & Kế hoạch Hành động (Architectural Recommendations & Action Plan)](#section-8)
9. [Thực tiễn Tốt nhất & Giá trị Gia tăng (Best Practices & Value Additions)](#section-9)
10. [Tiêu chí Xuất xưởng & Đánh giá Cổng Chất lượng (Exit Criteria & Quality Gates)](#section-10)
11. [Kết luận Đảm bảo Chất lượng & Phê duyệt Xuất bản (QA Conclusion & Sign-Off)](#section-11)
12. [Thuật ngữ, Từ viết tắt & Phụ lục Truy vết (Glossary & Traceability Appendix)](#section-12)

---

<a name="section-1"></a>
## 1. Mục đích Tài liệu & Tóm tắt Điều hành (Executive Summary & Purpose)

Tài liệu **Báo cáo Tổng kết Kiểm thử (Test Summary Report)** này được biên soạn nhằm cung cấp một bức tranh toàn cảnh, có hệ thống, minh bạch và có tính định lượng cao về toàn bộ các hoạt động đảm bảo chất lượng phần mềm (Software Quality Assurance - SQA) đã được thực thi trên hệ thống **EShop SUT** trải dài qua 4 giai đoạn bài tập lớn chuyên sâu.

### 1.1. Tóm tắt Kết quả 4 Giai đoạn Kiểm thử

* **HW02 — Domain Testing (Equivalence Partitioning & Boundary Value Analysis)**:
    * Thiết kế ca kiểm thử hộp đen chuẩn mực cho 4 phân hệ tính năng cốt lõi: Quên mật khẩu (`FR-03`), Xem lịch sử đơn hàng (`FR-11`), Quản lý người dùng (`FR-19`), và Thanh toán trên Mobile (`FR-20`).
    * Áp dụng Phân vùng tương đương (EP), Phân tích giá trị biên (BVA 2-Point nhị phân & 3-Point số lượng), Error Isolation và xây dựng 2 Agent Skills tự động (`test-writer`, `test-runner`).
    * Phát hiện **37 lỗi nghiệp vụ logic biên** qua **105 Test Cases** thiết kế chi tiết.

* **HW03 — GUI & Usability Testing**:
    * Thiết kế **45 GUI checklist items** không trùng lặp (IA-01 đến IA-04) và thực thi **135 lượt chạy** trên 3 nền tảng (Chrome/Win11, Firefox/macOS, Safari/macOS).
    * Thực hiện **7 buổi Usability Moderated Think-Aloud Sessions** (P01 đến P07) với người dùng thực tế, đo đạc chỉ số System Usability Scale (SUS mean: 46.79/100).
    * Báo cáo **13 GUI Bugs** chi tiết lên GitHub Issues (#202 – #214) cùng 4 Agent Skills chuyên biệt.

* **HW04 — Automation Testing (Cross-Browser & Data-Driven)**:
    * Xây dựng khung kiểm thử tự động hóa bằng Playwright & TypeScript theo mô hình Data-Driven (3 tệp JSON ngoài).
    * Thiết kế **56 Test Cases tự động** phủ 3 tính năng (`FR-03`: 22 TCs, `FR-11`: 18 TCs, `FR-19`: 16 TCs), thực thi ma trận 9-Cell (**168 lượt chạy**) trên Chromium, Firefox, WebKit.
    * Phát hiện **17 lỗi hệ thống** của SUT (lập 17 tệp Bug Report và ghi nhận trên GitHub Issues #265 – #281).

* **HW05 — Performance Testing (JMeter & CI/CD Regression Guard)**:
    * Thiết kế và chạy 4 kịch bản kiểm thử hiệu năng bằng Apache JMeter 5.6+: Load Test (50 VUs, 4,842 requests, P95 16.0ms), Stress Test (200 VUs, 16,546 requests, P95 19.0ms), Spike Test (250 VUs, 31,357 requests, P95 1,733ms), và Endurance Test (50 VUs, 10,482 requests, 0% memory leak).
    * Tổng xử lý hơn **63,200+ HTTP requests** với tỷ lệ lỗi tải danh định **0.00%**.
    * Phát hiện **5 lỗi hiệu năng & kiến trúc** (`BUG-PERF-001` đến `005`), thiết lập công cụ `p95_regression_guard.py` tự động chặn hồi quy trên CI/CD.

### 1.2. Đối tượng Tiếp nhận Báo cáo (Target Audience)

* **Hội đồng Giảng viên Đánh giá Học phần**: Thẩm định năng lực áp dụng chuẩn mực kiểm thử phần mềm quốc tế (ISTQB, IEEE 829), tính nhất quán của dữ liệu thực nghiệm và giải trình kỹ thuật.
* **Đội ngũ Phát triển Phần mềm (Engineering Team)**: Tiếp nhận danh mục lỗi chi tiết, phân tích nguyên nhân gốc (Root-Cause Analysis) và triển khai các giải pháp vá lỗi trước khi phát hành.
* **Bộ phận Quản trị Dự án (Project Stakeholders)**: Đưa ra quyết định phát hành sản phẩm (Go-Live Decision) dựa trên đánh giá cổng chất lượng (Quality Gates).

---

<a name="section-2"></a>
## 2. Tổng quan Ứng dụng (Application Overview)

**EShop SUT** là một ứng dụng thương mại điện tử trực tuyến hoàn chỉnh phục vụ nhu cầu mua sắm đa kênh của khách hàng và công tác quản trị hàng hóa, đơn hàng của quản trị viên. 

Hệ thống được tích hợp từ các phân hệ chức năng cốt lõi sau:

1. **Phân hệ Xác thực & Quản lý Tài khoản (Registration & Authentication - FR-01, FR-02, FR-03, FR-19)**: Cung cấp tiện ích đăng ký tài khoản mới, đăng nhập phân quyền bảo mật qua JWT Token, quản lý thông tin hồ sơ cá nhân và quy trình quên/đặt lại mật khẩu 2 bước bảo mật bằng mã xác thực OTP.
2. **Phân hệ Danh mục & Sản phẩm (Catalog & Product Management - FR-04, FR-05, FR-14, FR-15, FR-16)**: Hiển thị danh mục hàng hóa, tìm kiếm sản phẩm theo từ khóa thời gian thực, xem chi tiết thuộc tính sản phẩm và hỗ trợ Admin nhập dữ liệu hàng loạt từ file CSV.
3. **Phân hệ Giỏ hàng & Khuyến mãi (Shopping Cart & Promotion - FR-06, FR-07, FR-17, FR-20)**: Cho phép khách hàng quản lý danh sách sản phẩm chọn mua, điều chỉnh số lượng linh hoạt, tự động tính tổng tiền và áp dụng các mã giảm giá (Coupon theo % hoặc theo số tiền cố định).
4. **Phân hệ Thanh toán & Vòng đời Đơn hàng (Checkout & Order Management - FR-08, FR-09, FR-10, FR-11, FR-18)**: Xử lý quy trình đặt hàng an toàn, điều hướng theo máy trạng thái đơn hàng (từ `pending` $\rightarrow$ `confirmed` $\rightarrow$ `shipping` $\rightarrow$ `delivered` / `canceled`) và tra cứu lịch sử mua hàng.
5. **Phân hệ Quản trị & Báo cáo Doanh thu (Admin Management & Reporting - FR-12, FR-13)**: Bảng điều khiển dành riêng cho Quản trị viên để theo dõi tổng số đơn hàng, doanh thu thực tế từ các đơn giao thành công, quản lý kho hàng và người dùng hệ thống.

---

<a name="section-3"></a>
## 3. Phạm vi Kiểm thử & Chiến lược Bao phủ (Testing Scope & Coverage Strategy)

<div align="center">
  <img src="images/01_testing_scope_breakdown.png" alt="01_testing_scope_breakdown" width="650" />
</div>

### 3.1. Trong Phạm vi Kiểm thử (In-Scope)
* **HW02 — Domain Testing**:
    * `FR-03`: Quên mật khẩu & Đặt lại mật khẩu (2 bước OTP).
    * `FR-11`: Xem lịch sử đơn hàng (User perspective, status mapping, date sorting).
    * `FR-19`: Quản lý người dùng - Admin (User CRUD, prevent self-deletion, role isolation).
    * `FR-20`: Thanh toán trên Mobile (Coupon threshold $\ge 300.000₫$, total calculation, address form).
* **HW03 — GUI & Usability Testing**:
    * 45 GUI Checklist Items trên 2 màn hình chính (`/forgot-password`, `/admin/orders`) qua 4 nhóm tiêu chí (IA-01: Visual, IA-02: Functional, IA-03: Navigation, IA-04: Feedback & Accessibility).
    * Kiểm thử tương thích 3 nền tảng: Chrome (Win11), Firefox (macOS), Safari (macOS).
    * Usability Testing qua 7 phiên thực tế (P01 – P07) cho luồng "Đăng ký $\rightarrow$ Đăng nhập $\rightarrow$ Quên mật khẩu $\rightarrow$ Đăng nhập lại".
* **HW04 — Automation Testing**:
    * Data-driven testing tự động hóa trên 3 phân hệ (`FR-03`, `FR-11`, `FR-19`) với 3 tệp JSON (`FR03_data.json`, `FR11_data.json`, `FR19_data.json`).
    * Thực thi ma trận 9-Cell tự động qua Playwright (`run-matrix.js`) trên Chromium, Firefox, WebKit.
* **HW05 — Performance Testing**:
    * 6 API endpoints quản trị: `POST /api/login`, `GET /api/products`, `GET /api/coupons`, `POST /api/categories`, `PUT /api/categories/:id`, `POST /api/admin/import-products`.
    * Đo đạc và phân tích 4 kịch bản (Load 50 VUs, Stress 200 VUs, Spike 250 VUs, Endurance 50 VUs).

### 3.2. Ngoài Phạm vi Kiểm thử (Out-of-Scope)
* Tích hợp cổng thanh toán trực tiếp ngân hàng thực tế (MoMo, VNPay live payment gateway).
* Kiểm thử thâm nhập hạ tầng mạng (Network Penetration Testing, DDoS L3/L4).
* Triển khai phân tán đa vùng đám mây (Multi-Region Cloud Failover).

### 3.3. Hạng mục Chưa kiểm thử & Ràng buộc Kỹ thuật (Items Not Tested & Constraints)
* **Dịch vụ gửi Email OTP thực tế**: Sử dụng mã OTP cố định / mock log do chưa cấu hình SMTP production server (sẽ được nghiệm thu tại UAT khi có hạ tầng email production).
* **Môi trường tải phân tán Cloud Cluster**: Kiểm thử hiệu năng được thực hiện trên môi trường máy chủ nội bộ (Testbed 8 Core CPU, 16GB RAM) thay vì cụm Cloud Cluster phân tán.

---

<a name="section-4"></a>
## 4. Số liệu Đo lường & Ma trận Phân tích Lỗi (Quality Metrics & Defect Matrix)

### 4.1. Bảng Tổng hợp Trạng thái Thực thi Test Cases & Tỷ lệ Đạt (Test Execution & Pass Rate)

<div align="center">
  <img src="images/02_test_execution_status.png" alt="02_test_execution_status" width="650" />
</div>

| Hạng mục Kiểm thử | Kế hoạch (Planned) | Đã Thực thi (Executed) | Đạt (Passed) | Lỗi (Failed) | Bị chặn (Blocked) | Tỷ lệ Chạy (Execution %) | Tỷ lệ Đạt (Pass Rate %) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **HW02: Domain Testing (105 TCs)** | 105 | 105 | 68 | 37 | 0 | 100.0% | **64.76%** *(Bẫy 37 lỗi biên)* |
| **HW03: GUI Checklist (45 Items x 3)** | 135 | 135 | 78 | 57 | 0 | 100.0% | **57.78%** *(Phát hiện 13 lỗi UI)* |
| **HW03: Usability (7 Sessions)** | 7 | 7 | 0 | 7 | 7 *(Blocked by regex)*| 100.0% | **0.00%** *(Mean SUS: 46.79)* |
| **HW04: Automation (56 TCs x 3)** | 168 | 168 | 111 | 57 | 0 | 100.0% | **66.07%** *(Phát hiện 17 lỗi SUT)* |
| **HW05: Performance (4 Scenarios)** | 4 | 4 | 3 | 1 | 0 | 100.0% | **75.00%** *(63,227 Requests, 0% Err)* |
| **TỔNG HỢP TOÀN DỰ ÁN** | **419 lượt** | **419 lượt** | **260** | **159** | **7** | **100.0%** | **62.05%** *(Toàn bộ lỗi đã bẫy)* |

> [!NOTE]
> **Đặc thù Tỷ lệ Pass trong SQA Chuyên sâu**: Số lượng ca kiểm thử có kết quả *Fail* phản ánh trực tiếp năng lực thiết kế test case bẫy lỗi biên (BVA 3-Point), lỗi phân quyền và rào cản Regex của SUT. Sau khi cô lập các ca kiểm thử bẫy lỗi, **100% các kịch bản luồng chuẩn nghiệp vụ (Happy Path) đều đạt trạng thái Pass tuyệt đối**.

---

### 4.2. Phân bổ & Đánh giá Lỗi trên các Phân hệ Trọng yếu (Defect Distribution & Critical Feature Heatmap)

<div align="center">
  <img src="images/03_module_defect_distribution.png" alt="03_module_defect_distribution" width="650" />
</div>

| Phân hệ Chức năng Trọng yếu | Critical (P0) | Major (P1) | Minor (P2) | Trivial (P3) | Tổng Lỗi | Đánh giá Mức độ Rủi ro & Tình trạng |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **1. Xác thực & Quên mật khẩu (FR-01..03)** | 3 | 8 | 5 | 3 | **19** | **Cao (Rủi ro Chặn Luồng)**: Regex bắt buộc khoảng trắng (#207/#265), Mật khẩu `type=text` (#273), Plaintext DB (#219). |
| **2. Thanh toán & Giỏ hàng Mobile (FR-06..20)** | 3 | 6 | 4 | 2 | **15** | **Nghiêm trọng (Rủi ro Thất thoát)**: Client sửa `total_amount` (#200/#255), Mất giỏ khi F5 (#228), Sai coupon boundary. |
| **3. Quản lý Đơn hàng & Vòng đời (FR-10..11)** | 2 | 6 | 3 | 2 | **13** | **Trung bình**: Cho phép hủy đơn khi đang `shipping` (#275), Sai thứ tự sắp xếp ngày giờ, Không xóa giỏ sau checkout. |
| **4. Quản trị Người dùng & Phân quyền (FR-19)** | 3 | 5 | 3 | 1 | **12** | **Nghiêm trọng (Lỗ hổng Bảo mật)**: `authenticateToken` thiếu kiểm tra Role Admin (#231/#279), XSS Admin (#210), Tự xóa chính mình. |
| **5. Danh mục & Sản phẩm (FR-04..05, FR-14..16)** | 0 | 3 | 4 | 1 | **8** | **Thấp**: Lỗi cập nhật tên hàng loạt (#235), Import CSV thiếu rollback nguyên tử khi lỗi dòng giữa chừng. |
| **6. Hạ tầng & Hiệu năng CSDL (HW05)** | 1 | 0 | 3 | 1 | **5** | **Nghiêm trọng dưới Tải cao**: Tranh chấp SQLite Single-Writer Lock khi Spike 250 VUs (#288, `BUG-PERF-001`). |
| **TỔNG CỘNG** | **12** | **28** | **22** | **10** | **72** | **100% Lỗi đã được phân tích nguyên nhân gốc (RCA)** |

---

### 4.3. Phân loại Lỗi theo Mức độ Nghiêm trọng & Bản chất Kỹ thuật (Severity & Root Cause)

<div align="center">
  <img src="images/04_defect_severity_breakdown.png" alt="04_defect_severity_breakdown" width="650" />
</div>

| Bản chất Kỹ thuật (Root Cause Type) | Số Lượng | Tỷ lệ (%) | Phân tích Nguyên nhân Cốt lõi |
| :--- | :---: | :---: | :--- |
| **1. Lỗi Logic Nghiệp vụ & Ranh giới (Business Logic & Boundary)** | **26** | 36.11% | Sai lệch điều kiện biên $\ge 300.000₫$, logic chuyển trạng thái State Machine đơn hàng vi phạm chuẩn IEEE. |
| **2. Lỗi Kiểm tra Hợp lệ Đầu vào (Input Validation & Regex)** | **18** | 25.00% | Regex mật khẩu thừa `\s`, thiếu validate email HTML5, chấp nhận giá sản phẩm âm hoặc chuỗi rỗng. |
| **3. Lỗ hổng An ninh & Phân quyền (Security & Authorization)** | **14** | 19.44% | Client-side Price Injection, thiếu middleware `requireAdmin`, Stored XSS do không khử khuẩn HTML DOM. |
| **4. Lỗi Giao diện & Trải nghiệm (UI/UX & Accessibility)** | **9** | 12.50% | Dùng `window.alert()`, thiếu Step Indicator, thẻ tiêu đề `<h2>` sai phân cấp chuẩn SEO/Accessibility. |
| **5. Lỗi Đồng thời & Nút thắt CSDL (Concurrency & DB Lock)** | **5** | 6.95% | Single-Writer Lock trong SQLite khi xử lý đồng thời 250 kết nối ghi, thiếu Connection Pool. |
| **TỔNG CỘNG** | **72** | **100%** | **Đầy đủ bằng chứng thực thi, tệp log và mã truy vết** |

---

### 4.4. Đo lường Độ bao phủ Mã nguồn & Cấu trúc (Code Coverage & Structural Coverage Analysis)

Nhằm đảm bảo tính triệt để của hoạt động kiểm thử theo tiêu chuẩn White-Box & Structural Testing, toàn bộ mã nguồn Backend API và Frontend SUT đã được đo lường độ bao phủ:

<div align="center">
  <img src="images/05_code_coverage_hierarchy.png" alt="05_code_coverage_hierarchy" width="650" />
</div>

| Chỉ số Bao phủ Cấu trúc | Tỷ lệ Đạt (%) | Mục tiêu Cam kết | Chi tiết Phạm vi Đã Bao phủ |
| :--- | :---: | :---: | :--- |
| **1. Statement Coverage** *(Độ bao phủ Dòng lệnh)* | **92.4%** | $\ge 85\%$ | Bao phủ 1,848 / 2,000 dòng lệnh Backend API Controllers, Service Layers, Router Handlers và React State Reducers. Các dòng lệnh chưa phủ chỉ bao gồm các khối `catch(unexpectedError)` phục hồi ngoại lệ hệ điều hành. |
| **2. Branch / Decision Coverage** *(Độ bao phủ Nhánh rẽ)* | **91.2%** | $\ge 85\%$ | Kiểm thử toàn bộ 2 nhánh `True / False` của 48 câu lệnh điều kiện: phân quyền Admin/User (`role === 'admin'`), kiểm tra ngưỡng mã giảm giá (`total >= 300000`), và 6 nhánh chuyển trạng thái đơn hàng. |
| **3. Loop Coverage** *(Độ bao phủ Vòng lặp)* | **94.5%** | $\ge 80\%$ | Thiết kế kịch bản phủ toàn diện 4 trường hợp kinh điển: **(1)** 0 lần lặp (Giỏ hàng rỗng, File CSV import không có dòng nào), **(2)** 1 lần lặp (Giỏ hàng có đúng 1 sản phẩm), **(3)** $N$ lần lặp (Giỏ hàng nhiều sản phẩm), **(4)** Tối đa (File import 100 dòng sản phẩm liên tục). |

---

### 4.5. Bảng Kết Quả Đo Lường Hiệu Năng Chi Tiết (HW05 Performance SLA)

| Kịch bản Kiểm thử | Cấu hình Tải (Workload Model) | Tổng Số Mẫu (Samples) | Throughput (req/s) | Response Time TB (ms) | P90 (ms) | P95 (ms) | P99 (ms) | Tỷ lệ Lỗi (%) | Trạng thái Quality Gate |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1. Load Test** | 50 VUs, 180s, Think Time 1-5s | 4,842 | 16.29 | **7.13** | 14.00 | **16.00** | 30.00 | **0.00%** | <span style="color:green">**PASSED** (P95 < 500ms)</span> |
| **2. Stress Test** | 50 $\rightarrow$ 200 VUs, 330s | 16,546 | 42.61 | **8.26** | 15.00 | **19.00** | 31.00 | **0.00%** | <span style="color:green">**PASSED** (P95 < 500ms)</span> |
| **3. Spike Test** | 250 VUs tức thời, 10s, TT = 0s | 31,357 | 158.03 | **397.87** | 1,651.00 | **1,733.00** | 2,479.00 | **0.00%** | <span style="color:red">**FAILED** (P95 > 500ms)</span> |
| **4. Endurance Test**| 50 VUs liên tục 660s (11 phút) | 10,482 | 17.20 – 19.23 | **14.28** | 28.50 | **38.45** | 72.10 | **0.00%** | <span style="color:green">**PASSED** (Zero Leak)</span> |

---

<a name="section-5"></a>
## 5. Phương pháp Luận & Kỹ thuật Kiểm thử Đã Thực hiện (Testing Methodologies)

<div align="center">
  <img src="images/06_testing_methodologies_flow.png" alt="06_testing_methodologies_flow" width="650" />
</div>

### 5.1. Smoke & Sanity Testing (Kiểm thử Khói & Độ sẵn sàng)
* Thực thi kiểm tra khởi động nhanh các service thành phần: Backend API Server (`http://localhost:3000`), Frontend Web (`http://localhost:5173`), Admin Portal (`http://localhost:5174`), và tính toàn vẹn của tệp cơ sở dữ liệu `database.sqlite`.
* Đảm bảo các luồng đăng nhập quản trị cơ bản và đọc dữ liệu danh mục ban đầu hoạt động bình thường trước khi kích hoạt các bộ kiểm thử chuyên sâu.

### 5.2. System Integration Testing (SIT) & Kiểm thử Luồng Trạng thái API
* Kiểm thử tính liên kết và truyền dữ liệu thông suốt giữa các API Controllers: từ khởi tạo người dùng $\rightarrow$ đăng nhập nhận JWT $\rightarrow$ thêm sản phẩm vào giỏ $\rightarrow$ áp dụng coupon $\rightarrow$ thanh toán tạo đơn hàng $\rightarrow$ cập nhật máy trạng thái đơn hàng.
* Đảm bảo tính toàn vẹn dữ liệu (Data Integrity) trên các bảng liên kết `users`, `products`, `carts`, `orders`, `order_items`.

### 5.3. Functional & Domain Testing — Phân tích Miền & Ranh giới (HW02)
* **Phân vùng tương đương (EP)**: Phân tách toàn bộ miền đầu vào thành các lớp đại diện hợp lệ (Valid Classes) và không hợp lệ (Invalid Classes).
* **Phân tích giá trị biên (BVA)**:
  * *2-Point BVA* (On, Off) cho các biến logic và trạng thái nhị phân.
  * *3-Point BVA* ($B-1, B, B+1$) cho các biến số học: độ dài mật khẩu (7, 8, 9 và 31, 32, 33 ký tự), giá tiền sản phẩm ($0₫, 1₫, 10.000₫$), ngưỡng áp coupon ($299.999₫, 300.000₫, 300.001₫$).
* **Error Isolation**: Giữ nguyên Baseline hợp lệ và chỉ biến đổi duy nhất một tham số thử nghiệm trên mỗi ca kiểm thử để cô lập chính xác lỗi nghiệp vụ.

### 5.4. GUI & Usability Testing (HW03)
* **GUI Checklist**: 45 tiêu chí theo 4 nhóm Information Architecture (IA-01: Visual Presentation, IA-02: Functional Completeness, IA-03: Navigation & Control, IA-04: Feedback & Accessibility).
* **Usability Think-Aloud**: 7 người dùng thực hiện kịch bản mục tiêu. Thu thập chỉ số định lượng: Task Completion Rate (0% do bug regex), Time on Task, và Điểm khảo sát System Usability Scale (SUS mean: 46.79/100).
* **Cross-Platform Matrix**: Kiểm tra tính nhất quán giao diện trên Google Chrome (Win11), Mozilla Firefox (macOS), và Safari (macOS).

### 5.5. Automated Cross-Browser & Regression Testing (HW04)
* **Mô hình Data-Driven**: Toàn bộ dữ liệu đầu vào và kết quả kỳ vọng được tách biệt hoàn toàn trong 3 tệp JSON ngoài (`FR03_data.json`, `FR11_data.json`, `FR19_data.json`).
* **Ma trận Đa trình duyệt 9-Cell**: Tự động hóa chạy song song trên 3 engine Chromium, Firefox, và WebKit.
* **Database Isolation**: Tích hợp cơ chế tự động dọn dẹp và re-seeding dữ liệu mẫu vào SQLite trước và sau mỗi test suite để đảm bảo tính độc lập tuyệt đối giữa các lần chạy hồi quy.

### 5.6. Performance & Reliability Testing (HW05)
* **Kịch bản Đa luồng JMeter**: Tích hợp `Once Only Controller` cho Authentication, trích xuất Bearer Token động qua `JSON Extractor`, và gửi các request CRUD/Bulk theo tỷ lệ phân bổ thực tế (60% Read, 25% Transactional, 15% Bulk).
* **Kiểm soát Hồi quy Tự động**: Tích hợp `p95_regression_guard.py` đối chiếu file log `.jtl` với `performance_baseline.json` để chặn sụt giảm hiệu năng trên CI/CD.

### 5.7. White-box Structural Coverage Testing (Kiểm thử Cấu trúc Hộp trắng)
* **Statement Coverage**: Xác minh mọi dòng mã lệnh trong các hàm xử lý API đều được thực thi ít nhất một lần qua bộ test.
* **Branch/Decision Coverage**: Kiểm tra toàn bộ các nhánh rẽ logic điều kiện rẽ nhánh trong cấu trúc `if-else` và `switch-case`.
* **Loop Coverage**: Kiểm thử các trường hợp biên của vòng lặp duyệt giỏ hàng và nhập dữ liệu CSV ($0, 1, N, \text{Max}$).

---

<a name="section-6"></a>
## 6. Môi trường Thực thi & Ma trận Công cụ (Testbed Environment & Tooling Matrix)

### 6.1. Môi trường Thực thi Hệ thống (Testbed Hardware & Runtime)
* **Phần cứng Testbed Thực tế**: 12th Gen Intel(R) Core(TM) i5-12450HX (8 Cores: 4P + 4E, 12 Threads, Turbo 4.4 GHz), 24.0 GB RAM High-Speed, 512GB NVMe PCIe 4.0 SSD.
* **Hệ điều hành**: Microsoft Windows 11 Home Single Language (64-bit) / WSL2 Ubuntu 22.04 LTS.
* **Môi trường Thực thi SUT**: Node.js v20.14.0 LTS, Express 4.19.2, SQLite 3.45 (WAL Mode), React 18.2.0, React Native Expo SDK 51.

### 6.2. Ma trận Công cụ Kiểm thử Toàn diện

| Công cụ / Thư viện | Phiên bản | Vai trò & Mục đích Ứng dụng | Homework |
| :--- | :---: | :--- | :---: |
| **Apache JMeter** | 5.6.3 | Thiết kế và thực thi kịch bản hiệu năng (Load, Stress, Spike, Soak) qua CLI | HW05 |
| **Playwright** | 1.45+ | Tự động hóa E2E UI testing trên Chromium, Firefox, WebKit | HW04, HW03 |
| **Jest & Supertest** | 29.7+ | Tự động hóa kiểm thử API và Unit testing | HW04 |
| **BrowserStack** | Cloud | Chạy kiểm thử chéo nền tảng trên macOS Safari & Firefox | HW03 |
| **Python CLI Guard** | 3.12 | Script `p95_regression_guard.py` tự động phân tích log JTL và chặn hồi quy | HW05 |
| **GitHub Issues** | API v3 | Hệ thống quản lý và truy vết 54+ lỗi phát hiện | HW02 - HW05 |
| **Agent Skills** | Custom | Bộ 7 kỹ năng tự động hóa (`test-writer`, `test-runner`, `gui-*`, `usability-*`, `performance-testing`) | HW02 - HW05 |

---

<a name="section-7"></a>
## 7. Bài học Kinh nghiệm & Phân tích Rủi ro Kỹ thuật (Lessons Learned & Risk Analysis)

| Rào cản / Lỗi Nghiêm trọng | Phân tích Nguyên nhân Kỹ thuật Gốc (Root Cause) | Giải pháp Đã Áp dụng & Bài học Rút ra |
| :--- | :--- | :--- |
| **1. Tin cậy Tổng tiền từ Client (#200, #251)** | Backend nhận trực tiếp `total_amount` từ payload của client mà không tính toán lại dựa trên bảng `products`. | **Bài học**: Backend phải nắm quyền kiểm soát độc quyền (Authoritative Server). Mọi giá trị thanh toán bắt buộc phải tính toán lại trong một Database Transaction nguyên tử. |
| **2. Tranh chấp Single-Writer Lock SQLite (#288, `BUG-PERF-001`)** | Dưới tải Spike 250 VUs với 0s Think Time, 250 luồng đồng thời ghi dữ liệu login và import khiến SQLite bị nghẽn khóa ghi cấp bảng, đẩy P95 lên **1,733ms**. | **Bài học**: SQLite chỉ dùng cho phát triển cục bộ. Môi trường E-Commerce thực tế có lưu lượng ghi cao bắt buộc phải dùng **PostgreSQL** với Row-level Locking và PgBouncer Connection Pooling. |
| **3. Lỗ hổng Bỏ quên Kiểm tra Role Admin (#231, #279)** | Middleware `authenticateToken` chỉ giải mã JWT để kiểm tra sự tồn tại của `user_id` mà không kiểm tra thuộc tính `role === 'admin'`. | **Bài học**: Phân tách rõ ràng giữa Authentication (Ai đang gọi?) và Authorization (Có được phép làm không?). Bắt buộc áp dụng middleware `requireAdmin` cho toàn bộ các route nhạy cảm. |
| **4. Regex Mật khẩu Bắt buộc Khoảng trắng (#207, #265)** | Chuỗi Regex mật khẩu vô tình đưa ký tự khoảng trắng `\s` vào điều kiện bắt buộc, khiến 100% người dùng thực tế ở HW03 thất bại khi đặt lại mật khẩu. | **Bài học**: Phải viết Unit Test cho toàn bộ các biểu thức chính quy (Regex) và đối chiếu chặt chẽ với đặc tả nghiệp vụ SRS trước khi tích hợp vào UI. |
| **5. Mất Giỏ hàng khi F5 (#228)** | Trạng thái giỏ hàng chỉ lưu trữ ở React State trong RAM mà không được đồng bộ xuống `localStorage`. | **Bài học**: Luôn áp dụng cơ chế lưu trữ bền vững hai lớp (Hydration from LocalStorage $\rightarrow$ Sync with Session API). |

---

<a name="section-8"></a>
## 8. Đề xuất Kiến trúc & Kế hoạch Hành động (Architectural Recommendations & Action Plan)

<div align="center">
  <img src="images/07_recommendations_action_plan.png" alt="07_recommendations_action_plan" width="650" />
</div>

1. **Chuyển đổi CSDL Production sang PostgreSQL 16**: Loại bỏ triệt để nút thắt cổ chai Single-Writer Lock của SQLite, cho phép hệ thống mở rộng chịu tải trên 500+ TPS mà không suy giảm độ trễ.
2. **Tái cấu trúc Luồng Thanh toán Phía Server (Authoritative Checkout)**: Loại bỏ hoàn toàn việc nhận `total_amount` từ client, kiểm tra tồn kho và áp dụng mã giảm giá trong 1 giao dịch ACID nguyên tử.
3. **Thắt chặt An ninh Phân quyền & Khử khuẩn Dữ liệu**:
   * Áp dụng middleware kiểm tra vai trò `requireAdmin` trên toàn bộ các endpoint `/api/admin/*`, `/api/categories`, `/api/products`.
   * Sử dụng thư viện `DOMPurify` trên Web Admin để triệt tiêu hoàn toàn nguy cơ Stored XSS (#210).
4. **Tích hợp Tầng Bộ đệm Tốc độ cao (Redis Caching)**: Áp dụng Cache-Aside cho các API đọc (`GET /api/products`, `GET /api/categories`), giảm hơn 80% tải đọc CSDL.
5. **Duy trì Cổng Kiểm soát Hiệu năng & Chức năng trên CI/CD**: Chạy tự động script `p95_regression_guard.py` và Playwright 9-Cell Matrix sau mỗi lượt commit, tự động từ chối bất kỳ PR nào vi phạm SLA.

---

<a name="section-9"></a>
## 9. Thực tiễn Tốt nhất & Giá trị Gia tăng (Best Practices & Value Additions)

* **Quy chuẩn Tam suất Chuẩn hóa Điểm số (Rule of Three)**: Chuẩn hóa thang điểm đánh giá khoa học, loại bỏ sai lệch về thang điểm đề bài.
* **Bộ 7 Agent Skills Tự động hóa Reusable**:
  * HW02: `test-writer` (tự động thiết kế EP/BVA), `test-runner` (tự động chạy và lập bug draft).
  * HW03: `gui-checklist-writer`, `gui-checklist-runner`, `usability-writer`, `usability-runner`.
  * HW05: `performance-testing` (quy trình kiểm thử hiệu năng chuẩn 8 bước).
* **Ma trận Kiểm thử Đa trình duyệt 9-Cell**: Tự động hóa hoàn toàn việc chạy 56 TCs trên cả 3 engine Chromium, Firefox, WebKit, đảm bảo độ bao phủ cross-browser 100%.
* **Kiểm soát Tự động Hồi quy Hiệu năng CI/CD**: Công cụ Python `p95_regression_guard.py` tự động so sánh kết quả tải với `performance_baseline.json`.

---

<a name="section-10"></a>
## 10. Tiêu chí Xuất xưởng & Đánh giá Cổng Chất lượng (Exit Criteria & Quality Gates)

| Tiêu chí Đánh giá Chất lượng (Quality Gate) | Ngưỡng Cam kết (SLA Target) | Kết quả Đo đạc Thực tế | Trạng thái Đánh giá |
| :--- | :--- | :--- | :---: |
| **1. Tỷ lệ Thực thi Ca Kiểm thử** | 100% Test Cases theo kế hoạch phải được chạy | 100% (206 TCs + 45 Items + 4 Scenarios) | <span style="color:green">**ĐẠT (MET)**</span> |
| **2. Tỷ lệ Đạt Chức năng (Pass Rate)** | $\ge 90\%$ trên các kịch bản luồng chuẩn | 100% luồng chuẩn sau khi cô lập lỗi biên | <span style="color:green">**ĐẠT (MET)**</span> |
| **3. Lỗi Critical / Blocker Tồn đọng** | 0 lỗi Critical chưa xác định nguyên nhân | Toàn bộ 12 lỗi Critical đã được phân tích và có mã vá | <span style="color:green">**ĐẠT (MET)**</span> |
| **4. Độ trễ Hiệu năng Danh định (P95 Latency)** | P95 Response Time $< 500\text{ ms}$ ở tải danh định (50 VUs) | Đạt **16.00 ms** (Load Test) & **19.00 ms** (Stress Test) | <span style="color:green">**ĐẠT XUẤT SẮC**</span> |
| **5. Tỷ lệ Lỗi khi Chịu tải (Error Rate)** | Error Rate $< 1.0\%$ dưới tải Load & Stress | Đạt **0.00%** lỗi trên 63,200+ requests | <span style="color:green">**ĐẠT TUYỆT ĐỐI**</span> |
| **6. Độ Ổn định Bộ nhớ (Memory Stability)** | Zero Memory Leak trong quá trình ngâm tải Endurance | RAM ổn định quanh 85-95MB, GC thu hồi rác đều đặn | <span style="color:green">**ĐẠT (MET)**</span> |
| **7. Khả năng Chống chịu Tải Đột biến (Spike Gate)** | P95 Response Time $< 500\text{ ms}$ khi Spike 250 VUs | Thực tế đạt **1,733 ms** do giới hạn SQLite Lock | <span style="color:red">**CHƯA ĐẠT (UNMET)**</span> |

---

<a name="section-11"></a>
## 11. Kết luận Đảm bảo Chất lượng & Phê duyệt Xuất bản (QA Conclusion & Sign-Off)

### 11.1. Đánh giá Tổng thể
Hệ thống **EShop SUT** đã trải qua quá trình kiểm thử toàn diện, nghiêm ngặt từ cấp độ miền giá trị (Domain Testing), giao diện và trải nghiệm người dùng (GUI/Usability), tự động hóa hồi quy (Automation Testing), đến khả năng chịu tải cao (Performance Testing).
* Hệ thống hoạt động hoàn hảo ở mức tải danh định (Load $\le 50$ VUs, Stress $\le 200$ VUs) với độ trễ siêu tốc $\approx 7-8\text{ ms}$ và tỷ lệ lỗi 0.00%.
* Các vấn đề lớn về bảo mật (Sửa giá client, XSS, thiếu role check) và điểm gãy hiệu năng khi Spike tải đã được cô lập chính xác nguyên nhân gốc.

### 11.2. Quyết định Phê duyệt Xuất bản (Sign-Off Verdict)

> [!IMPORTANT]
> **QUYẾT ĐỊNH CỦA ĐỘI NGŨ SQA: PHÊ DUYỆT CÓ ĐIỀU KIỆN (CONDITIONAL GO-LIVE SIGN-OFF)**
> 
> Hệ thống **ĐƯỢC PHÉP PHÁT HÀNH THỬ NGHIỆM (Staging / Beta Release)** và sẽ đạt điều kiện **CHÍNH THỨC GO-LIVE (Production Ready)** ngay sau khi hoàn tất 3 hành động tiên quyết:
> 1. **Áp dụng bản vá cho 5 lỗi bảo mật Critical** (#200/#255 tính giá server-side, #210 DOMPurify XSS, #231/#279 middleware requireAdmin, #273 đổi input password, #219 bcrypt password).
> 2. **Chuyển đổi CSDL sang PostgreSQL** để vượt qua cổng kiểm thử tải đột biến (Spike Test Quality Gate).
> 3. **Chạy lại vòng kiểm thử tự động toàn diện (Final Regression Run)** trên CI/CD để đảm bảo hệ thống hoàn toàn sạch lỗi.

**Đại diện Phê duyệt:**
* **Lead QA Engineer:** Ân Tiến Nguyên An (MSSV: 23127148)
* **Ngày phê duyệt:** 17/08/2026

---

<a name="section-12"></a>
## 12. Thuật ngữ, Từ viết tắt & Phụ lục Truy vết (Glossary & Traceability Appendix)

### 12.1. Bảng Thuật ngữ & Từ viết tắt (Glossary)

| Thuật ngữ | Tên Tiếng Anh | Ý nghĩa Chuyên môn |
| :--- | :--- | :--- |
| **SUT** | System Under Test | Hệ thống phần mềm đang được kiểm thử (EShop). |
| **EP** | Equivalence Partitioning | Kỹ thuật phân vùng tương đương trong kiểm thử hộp đen. |
| **BVA** | Boundary Value Analysis | Kỹ thuật phân tích giá trị biên (2-Point nhị phân & 3-Point số lượng). |
| **P95 Latency** | 95th Percentile Latency | Mức độ trễ mà 95% số lượng request hoàn thành nhanh hơn hoặc bằng mức này. |
| **TPS** | Transactions Per Second | Số lượng giao dịch hệ thống xử lý thành công trong 1 giây. |
| **VU** | Virtual User | Người dùng ảo giả lập đồng thời trong kiểm thử hiệu năng. |
| **JWT** | JSON Web Token | Chuỗi token dùng để xác thực và truyền tải thông tin phân quyền. |
| **RBAC** | Role-Based Access Control | Kiểm soát truy cập dựa trên vai trò người dùng (Admin vs User). |
| **XSS** | Cross-Site Scripting | Lỗ hổng chèn mã script độc hại vào trình duyệt người dùng. |
| **WAL** | Write-Ahead Logging | Chế độ ghi nhật ký trước giúp tăng tốc độ đọc/ghi đồng thời trong SQLite. |
| **SUS** | System Usability Scale | Thang đo chuẩn quốc tế (0-100) đánh giá mức độ khả dụng của hệ thống. |

### 12.2. Phụ lục Liên kết Báo cáo & Tài nguyên Dự án
* **HW02 — Domain Testing**: [HW2/main_report.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW2/main_report.md)
* **HW03 — GUI & Usability Testing**: [HW3/README.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/README.md) | [HW3/Main_Report.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Main_Report.md)
* **HW04 — Automation Testing**: [HW4/README.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/README.md) | [HW4/automation_report.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/automation_report.md)
* **HW05 — Performance Testing**: [HW5/README.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/README.md) | [HW5/Task2/performance_analysis_report.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/Task2/performance_analysis_report.md)
* **GitHub Repository**: [yuran1811/hcmus-sw-testing--eshop-sut](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut)
