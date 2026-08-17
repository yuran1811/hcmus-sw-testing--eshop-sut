# Master Test Summary Report — EShop SUT (Overall HW02 – HW05)

> **Document Standard:** IEEE 829 / Software Testing Help 12-Step Master Template  
> **Project:** EShop SUT (Software Under Test)  
> **Repository:** `yuran1811/hcmus-sw-testing--eshop-sut`  
> **Target Branches:** `hw02/23127211`, `hw3/23127211`, `hw04/23127211`, `hw05/23127211`  
> **Lead Tester / Author:** Nguyễn Lê Hồ Anh Khoa (MSSV: 23127211)  
> **Overall Date:** 2026-08-17  

---

## 1. Purpose of the Document
Báo cáo này là **Báo cáo Tổng kết Kiểm thử Tổng thể (Master Test Summary Report)** hợp nhất toàn bộ các đợt kiểm thử từ HW02 đến HW05 cho hệ thống EShop SUT. Document cung cấp cái nhìn toàn cảnh executive-level cho Ban Quản trị và các Stakeholder về độ bao phủ kiểm thử, tổng số lượng lỗi phát hiện qua tất cả các phương pháp kiểm thử (tĩnh, động, GUI, Usability, Tự động hóa Playwright E2E và Hiệu năng JMeter/k6), đánh giá rủi ro và đưa ra quyết định Sign-Off chính thức cho việc phát hành hệ thống.

---

## 2. Application Overview
**EShop SUT** là một nền tảng Thương mại Điện tử đa kênh (Multi-channel E-commerce Platform) gồm Backend RESTful API (Node.js/Express, SQLite DB), Web Admin Dashboard, Storefront Web Client, và Mobile Web App.  
Hệ thống trải qua 4 giai đoạn kiểm thử chuyên sâu:
1. **HW02 — Static & Dynamic Test Design:** Thiết kế kịch bản kiểm thử tĩnh/động nâng cao (BVA, EP, Domain Testing, Decision Table/Pairwise).
2. **HW03 — GUI, Usability & Cross-Platform:** Kiểm thử giao diện 73 tiêu chí, thử nghiệm trải nghiệm người dùng U-01 (7 người tham gia) và tương thích đa trình duyệt/hệ điều hành.
3. **HW04 — Automated E2E Testing:** Tự động hóa kịch bản kiểm thử End-to-End trên 3 trình duyệt (Chromium, Firefox, WebKit) bằng Playwright Framework (144 lượt thực thi).
4. **HW05 — Performance & Load Testing:** Kiểm thử tải định ngạch (Load 50 VU), chịu tải sức bền (Stress 400 VU), và đột biến (Spike 500 VU) bằng JMeter & k6.

---

## 3. Testing Scope

### Consolidated In-Scope Matrix:

| Giai đoạn HW | Phân hệ Chức năng Kiểm thử | Phương pháp / Kỹ thuật | Trình duyệt / Môi trường / Công cụ |
| :--- | :--- | :--- | :--- |
| **HW02** | Register (FR-01), Login/Lockout (FR-02), Cart (FR-07), Product (FR-15) | BVA, EP, Domain Testing, Decision Table / Pairwise | Desktop Browsers (Chrome, Firefox) |
| **HW03** | Product Detail Screen, Navigation Flow U-01 | GUI Checklist Inspection (73 Items), Usability Evaluation, Watermarked Screenshots | Chrome (Blink), Firefox (Gecko), Safari Mobile iOS (WebKit) |
| **HW04** | E2E Register, Cart, Product Admin Flows | Playwright Automated E2E Scripts, Multi-Browser Runs, HTML Reports | Chromium, Firefox, WebKit (`workers: 1`) |
| **HW05** | Auth API, Product Catalog API, Checkout Order API | Load Testing (50 VU), Stress Testing (400 VU), Spike Testing (500 VU), AI Log Analysis | Apache JMeter 5.6.3, k6 v2.2.0, WSL2 Ubuntu 22.04 LTS |

### Out-of-Scope:
- Kiểm thử thâm nhập bảo mật chuyên sâu (Penetration Testing / Dynamic Application Security Testing).
- Kiểm thử hạ tầng mạng lớp phần cứng viễn thông.

---

## 4. Master Metrics & Overall Defect Distribution

### 4.1 Master Test Execution Summary Across All 4 HWs

| Homework | Mô tả Giai đoạn Kiểm thử | Tổng số Test Cases / Executions | Executed | Passed | Failed | Pass Rate (%) | Total Defects Found |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **HW02** | Static & Dynamic Test Design | 59 Test Cases | 59 | 36 | 23 | 61.02% | **23** |
| **HW03** | GUI Checklist & Usability U-01 | 73 Checklist Items + 7 Participants | 73 | 33 | 40 | 45.21% | **13** |
| **HW04** | Playwright Automated E2E | 144 Browser Execution Runs | 144 | 53 | 91 | 36.81% | **22** |
| **HW05** | Performance & Load Testing | 63,051 Performance Requests | 63,051 | 59,301 | 3,750 | 94.05% | **5** |
| **TỔNG MASTER** | **Toàn bộ 4 Giai đoạn Kiểm thử** | **63,327 Executions** | **63,327** | **59,423** | **3,904** | **93.83%** | **63 DEFECTS** |

### 4.2 Overall Defect Severity Distribution (Master 63 Defects)

| Severity Level | HW02 | HW03 | HW04 | HW05 | Tổng Defect Master | Tỷ lệ (%) | Các Bug Nguy hiểm nhất |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Critical** | 5 | 3 | 6 | 1 | **15** | 23.81% | `BUG-REGISTER-001/002`, `BUG-PRODDETAIL-001`, `BUG-API-001` (DB Lock) |
| **Major** | 11 | 5 | 11 | 2 | **29** | 46.03% | `BUG-CART-001` (Số lượng âm), `BUG-PRODUCT-002` (Giá âm/0), Latency 400 VU |
| **Minor / Medium** | 7 | 5 | 5 | 2 | **19** | 30.16% | Generic error messages, Focus Ring shift, Search query timeout |
| **TỔNG MASTER** | **23** | **13** | **22** | **5** | **63** | **100%** | **Tracking via GitHub Issues & Defect Logs** |

---

## 5. Types of Testing Performed
1. **White/Black-Box Functional Testing:** BVA, EP, Domain Testing, Decision Table/Pairwise DTT.
2. **GUI & Usability Inspection:** Checklist 73 items, Task-based Usability (U-01) với 7 người dùng thực tế.
3. **Cross-Browser & Multi-Platform:** So sánh giao diện và tự động hóa trên Chromium, Firefox, WebKit Safari iOS.
4. **Automated E2E Regression:** Playwright Automation Test Suite chạy tuần tự bám sát SRS.
5. **Performance & Stress Engineering:** Load (50 VU), Stress (400 VU), Spike (500 VU) bằng JMeter & k6.

---

## 6. Master Test Environment & Tooling Ecosystem
- **Backend & Database:** Node.js v20.20.2, Express Framework, SQLite 3.x Database.
- **Frontend Applications:** React Storefront Web, Admin Portal, Mobile Responsive Web.
- **Testing Frameworks & Tools:**
  - *Automation:* Playwright v1.45+ (Chromium, Firefox, WebKit engines).
  - *Performance:* Apache JMeter 5.6.3 (OpenJDK 17), k6 v2.2.0.
  - *Environment:* Ubuntu 22.04 LTS (WSL2), Windows 11 Pro.
  - *Defect Tracking:* GitHub Issues (#157–#169, #217–#238).

---

## 7. Master Lessons Learned
1. **Lỗi nhân đôi Log trong JMeter (`parent=false`):** Việc sử dụng `Transaction Controller` bọc sampler gây ra hiện tượng 2 dòng log cho 1 HTTP request trong file `.jtl` raw. Đã giải quyết bằng script Python `ground_truth.py` để loại bỏ sai số.
2. **Khóa dữ liệu SQLite:** SQLite không hỗ trợ ghi đa luồng concurrent write tốt, dẫn đến lỗi `database is locked` khi chạy Playwright multi-workers hoặc Spike Test 500 VU.
3. **Sự khác biệt giữa giả lập DevTools và Thiết bị thật:** Kiểm thử trên Safari iOS thật phát hiện các lỗi vỡ khung giao diện mà DevTools Desktop không tái hiện được.

---

## 8. Consolidated Recommendations
1. **Kiến trúc Database:** Chuyển đổi ngay từ SQLite sang PostgreSQL/MySQL hỗ trợ Connection Pool thực sự để xử lý triệt để lỗi DB Lock (`BUG-API-001`).
2. **Validation phía Server-side:** Bổ sung validation bắt buộc cho giá sản phẩm (`price > 0`), độ dài chuỗi ký tự, và ràng buộc Unique Email ở tầng API.
3. **Tối ưu GUI Mobile:** Cố định vị trí nút "Add to Cart" trên giao diện di động (Sticky CTA Button) và sửa lỗi hiển thị tiếng Việt có dấu.
4. **Caching Layer:** Cài đặt Redis Cache cho các API đọc danh mục/sản phẩm để giảm tải cho DB ở nấc 400+ VU.

---

## 9. Best Practices Established
- **Pairwise Combination:** Tối ưu kịch bản đăng ký từ 81 xuống 17 test cases nhưng vẫn đạt 100% độ bao phủ cặp giá trị.
- **Isolate Test Data:** Lưu trữ dữ liệu kiểm thử trong các file `test-data/*.json` độc lập.
- **Watermarked Audit Screenshots:** Tự động chèn Watermark thông tin kiểm thử lên hình ảnh bằng chứng bug.
- **Automated HTML Audit Metadata:** Tự động bơm ISO Timestamp và MSSV `23127211` vào tất cả báo cáo HTML.

---

## 10. Master Exit Criteria Verification

| Tiêu chí Đóng Tổng thể (Master Exit Criteria) | Đạt / Chưa đạt | Ghi chú minh chứng |
| :--- | :---: | :--- |
| 100% Kịch bản kiểm thử (HW02, HW03, HW04, HW05) đã thực thi | **ĐẠT** | 63,327 Lượt thực thi hoàn tất |
| 100% Defect phát hiện được log & phân loại Severity | **ĐẠT** | 63 Defects logged & classified |
| Không còn lỗi Critical nào mở (0 Open Critical Defects) | **CHƯA ĐẠT** | **Còn 15 Critical Defects đang MỞ** |
| Đạt ngưỡng thông lượng tối thiểu 100 RPS ở tải Spike | **CHƯA ĐẠT** | Spike Test bị lỗi 22.18% do DB Lock |

---

## 11. Final Conclusion & Sign-Off Verdict

### 🛑 KẾT LUẬN CHÍNH THỨC: REJECT — KHÔNG ĐỦ ĐIỀU KIỆN GO-LIVE (NOT READY FOR PRODUCTION)

**Lý do từ chối phát hành:**
1. Hệ thống còn tồn tại **15 lỗi Critical** và **29 lỗi Major** chưa được khắc phục ở các luồng nghiệp vụ cốt lõi (cho phép đăng ký trùng email, giá sản phẩm cho phép âm, giỏ hàng tính sai tiền).
2. Giao diện Mobile Web trên Safari iOS bị lỗi hiển thị nghiêm trọng làm ẩn nút thanh toán.
3. Hệ thống bị nghẽn DB Lock nghiêm trọng ở kịch bản Spike Test (tỷ lệ lỗi 22.18%), không đảm bảo khả năng chịu tải khi có sự kiện khuyến mãi lớn.

**Kế hoạch hành động đề xuất (Action Plan):**
- Đội ngũ Dev cần thực hiện Sprint Remediation để sửa toàn bộ 15 lỗi Critical & 29 lỗi Major.
- Thực hiện chuyển đổi cơ sở dữ liệu sang PostgreSQL.
- Tiến hành đợt kiểm thử lại (Re-testing & Regression Run) sau khi có bản Build mới.

---

## 12. Definitions, Acronyms, and Abbreviations
- **SUT:** Software Under Test
- **E2E:** End-to-End Testing
- **VU:** Virtual User
- **RPS:** Requests Per Second
- **BVA / EP:** Boundary Value Analysis / Equivalence Partitioning
- **DTT:** Decision Table Testing / Pairwise Testing
- **CTA:** Call to Action (Nút hành động UI)
- **CMMI:** Capability Maturity Model Integration
