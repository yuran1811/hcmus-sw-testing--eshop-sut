**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên TP.HCM (HCMUS)**

**CS423 / CSC15003 – Kiểm thử Phần mềm (Tích hợp AI · 2026)**

**CHÍNH SÁCH AI · MẪU BIỂU — 2026 v1.0**

# Báo Cáo Kiểm Tra AI – Mẫu 5 Phần cho Mỗi Sản Phẩm

_Phụ lục bắt buộc cho mọi bài tập có sử dụng AI (HW#01–HW#06 và Seminar)._

_Được điều chỉnh từ Med Kharbach, PhD (2026) — AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0. Bản điều chỉnh này được chuẩn bị cho FIT@HCMUS – CS423 / CSC15003 Kiểm thử Phần mềm._

## 1. Thông Tin Sinh Viên

| Trường                            | Giá trị                                                         |
| :-------------------------------- | :-------------------------------------------------------------- |
| **Họ và tên sinh viên (in hoa):** | MẠCH QUỐC TẤN                                                   |
| **Mã số sinh viên:**              | 23127115                                                        |
| **Lớp / Khóa:**                   | 23KTPM3                                                         |
| **Mã bài tập:**                   | HW02 - Domain Testing on EShop                                  |
| **Ngày nộp bài:**                 | 29/06/2026                                                      |
| **Công cụ AI đã sử dụng:**        | Gemini 3.5 Flash, Gemini 3.1 Pro, Antigravity IDE with AI Agent |
| **Bài nộp có sử dụng AI:**        | Có                                                              |

## 2. Hướng Dẫn (đọc trước khi điền)

- Thêm một hàng cho mỗi sản phẩm do AI tạo ra (ca kiểm thử, script, checklist, OpenAPI spec, kế hoạch JMeter, v.v.).
- Dán nguyên văn prompt đã dùng – KHÔNG được diễn đạt lại.
- Dán nguyên văn kết quả đầu ra của AI (hoặc đính kèm ảnh chụp màn hình có nhãn trong báo cáo).
- Gán phán quyết: VALID / INVALID / INCOMPLETE.
- Phần lý giải phải trích dẫn slide bài giảng, mục ISTQB, hoặc RFC kỹ thuật.
- Trình bày sản phẩm đã chỉnh sửa với phần thay đổi được làm nổi bật.
- Các hàng mẫu in nghiêng – thay thế trước khi nộp.

## 3. Báo Cáo Kiểm Tra Chi Tiết – Từng Sản Phẩm

### Sản phẩm #1: Thiết kế ca kiểm thử tính năng Xem danh sách & Tìm kiếm sản phẩm (FR-05)

- **Công cụ:** Gemini 3.5 Flash
- **Thời gian thực hiện:** 00:21 27/06/2026
- **Prompt đã sử dụng:**
  > "dựa vào mô tả của FR-05 trong file README.md , dựa vào skill .agents\skills\test-writer\SKILL.md , bạn hãy tạo ra những test case cho tính năng này dựa trên 2 kĩ thuật được đề cập trong skill, thực hiện tuần tự và đầy đủ các phase được đề cập, sau đó sử dụng .agents\skills\ai-audit-report\SKILL.md để log lại quá trình, các thông tin cần human review để trống để tôi điền vào, ngoài ra tạo trong folder tests\test-cases\product-list-and-search tôi đã tạo sẵn và làm theo các template"
- **Kết quả AI & Minh chứng:**
  - AI đã phân tích 3 biến đầu vào và 6 biến đầu ra với các lớp tương đương để thiết kế test cases.
  - Sinh ra 7 ca kiểm thử theo phương pháp Phân hoạch tương đương (TC-PLAS-001 đến TC-PLAS-007) và 5 ca kiểm thử theo phân tích giá trị biên (TC-PLAS-BVA-001 đến TC-PLAS-BVA-005).
  - Tự động tạo và cập nhật các báo cáo [Domain_Testing_Report.md](./Domain_Testing_Report.md) và [Boundary_Value_Analysis_Report.md](./Boundary_Value_Analysis_Report.md).
  - **Bản AI gen thô (raw):** Lưu tại thư mục `tests/test-cases/product-list-and-search/` lúc 00:21 ngày 27/06/2026.
- **Phán quyết:** `INCOMPLETE`
- **Lý giải đánh giá (ISTQB):** Không có
- **Chỉnh sửa của Sinh viên:** Em đã: (1) rà soát lại các dữ liệu đại diện cho test data; (2) chỉnh sửa dữ liệu biên và các giá trị kiểm thử để phù hợp với cơ sở dữ liệu thực tế (do AI tự bịa ra dữ liệu không tồn tại trong db); (3) bổ sung thông tin log cho các bước tiếp theo.

---

### Sản phẩm #2: Thực thi ca kiểm thử và cập nhật kết quả kiểm thử (FR-05)

- **Công cụ:** Gemini 3.5 Flash & Skill `test-run-reporter`
- **Thời gian thực hiện:** 15:03 28/06/2026
- **Prompt đã sử dụng:**
  > "Sử dụng skill test-run-reporter áp dụng cho {TEST_CASE}, và kết quả tôi thực hiện được là {KẾT_QUẢ}, với các hình ảnh {HÌNH_ẢNH} lần lượt minh chứng cho {LỖI}."
- **Kết quả AI & Minh chứng:**
  - AI tự động đổi tên và quản lý 13 ảnh chụp minh chứng kiểm thử theo đúng định dạng đích.
  - Tạo mới 3 báo cáo lỗi (BUG-PLAS-005, BUG-PLAS-006, BUG-PLAS-007) và cập nhật các file BUG-PLAS-001 đến BUG-PLAS-004.
  - Cập nhật kết quả Fail và liên kết lỗi cho 9 file test cases tương ứng.
  - Tự động điền dữ liệu vào bảng test run trong file `tests/test-runs/sprint-1-test-run.md`.
- **Phán quyết:** `INCOMPLETE`
- **Lý giải đánh giá (ISTQB):** Không có
- **Chỉnh sửa của Sinh viên:** Em đã hiệu chỉnh: (1) yêu cầu AI tách BUG-PLAS-005 thành 2 lỗi riêng biệt (lỗi trùng thẻ h1 trên trang chủ và lỗi SQLite thô khi tìm kiếm ký tự đặc biệt); (2) loại bỏ liên kết BUG-PLAS-001 không chính xác ra khỏi ca kiểm thử TC-PLAS-BVA-002.

---

### Sản phẩm #3: Thiết kế ca kiểm thử tính năng Thanh toán (FR-08)

- **Công cụ:** Gemini 3.5 Flash
- **Thời gian thực hiện:** 15:30 28/06/2026
- **Prompt đã sử dụng:**
  > "dựa vào mô tả của FR-08 trong file README.md , dựa vào skill .agents\skills\test-writer\SKILL.md , bạn hãy tạo ra những test case cho tính năng này dựa trên 2 kĩ thuật được đề cập trong skill, thực hiện tuần tự và đầy đủ các phase được đề cập, sau đó sử dụng .agents\skills\ai-audit-report\SKILL.md để log lại quá trình, các thông tin cần human review để trống để tôi điền vào, ngoài ra tạo trong folder tests\test-cases\checkout tôi đã tạo sẵn và làm theo các template"
- **Kết quả AI & Minh chứng:**
  - AI đã xác định 4 biến đầu vào và 4 biến đầu ra để thiết kế test cases.
  - Sinh ra 5 ca kiểm thử Phân hoạch tương đương (TC-CHECKOUT-001 đến TC-CHECKOUT-005) và 4 ca kiểm thử BVA (TC-CHECKOUT-BVA-001 đến TC-CHECKOUT-BVA-004).
  - Cập nhật kết quả vào các tệp báo cáo tổng hợp.
  - **Bản AI gen thô (raw):** Thư mục `tests/test-cases/checkout/` lúc 15:30 ngày 28/06/2026.
- **Phán quyết:** `INCOMPLETE`
- **Lý giải đánh giá (ISTQB):** Không có
- **Chỉnh sửa của Sinh viên:** Em đã: (1) rà soát lại logic của các ca kiểm thử; (2) loại bỏ các bước liên quan đến việc nhập địa chỉ do AI tự biên tự diễn (FR-08 không yêu cầu nhập địa chỉ mà tự động lấy thông tin từ hệ thống).

---

### Sản phẩm #4: Thiết kế ca kiểm thử tính năng Quản lý Danh mục (FR-14)

- **Công cụ:** Gemini 3.1 Pro
- **Thời gian thực hiện:** 19:25 28/06/2026
- **Prompt đã sử dụng:**
  > "dựa vào mô tả của FR-14 trong file README.md , dựa vào skill .agents\skills\test-writer\SKILL.md , bạn hãy tạo ra những test case cho tính năng này dựa trên 2 kĩ thuật được đề cập trong skill, thực hiện tuần tự và đầy đủ các phase được đề cập, sau đó sử dụng .agents\skills\ai-audit-report\SKILL.md để log lại quá trình, các thông tin cần human review để trống để tôi điền vào, ngoài ra tạo trong folder tests\test-cases\category tôi đã tạo sẵn và làm theo các template"
- **Kết quả AI & Minh chứng:**
  - AI xác định 3 biến đầu vào và 3 biến đầu ra.
  - Sinh ra 8 ca kiểm thử Phân hoạch tương đương (TC-CATEGORY-001 đến TC-CATEGORY-008) và 2 ca kiểm thử BVA (TC-CATEGORY-BVA-001 đến TC-CATEGORY-BVA-002).
  - **Bản AI gen thô (raw):** Thư mục `tests/test-cases/category/` lúc 19:25 ngày 28/06/2026.
- **Phán quyết:** `INCOMPLETE`
- **Lý giải đánh giá (ISTQB):** Không có
- **Chỉnh sửa của Sinh viên:** Em đã: (1) bổ sung thêm các ca kiểm thử liên quan đến việc xóa danh mục (đặc biệt là xóa danh mục đang có sản phẩm liên kết - vi phạm ràng buộc khóa ngoại) do bản gốc của AI không bao phủ hết trường hợp này.

---

### Sản phẩm #5: Thiết kế ca kiểm thử tính năng Đăng ký trên Mobile (FR-01 / FR-20)

- **Công cụ:** Gemini 3.1 Pro
- **Thời gian thực hiện:** 00:18 29/06/2026
- **Prompt đã sử dụng:**
  > "dựa vào mô tả của FR-01, FR-20 trong file README.md , dựa vào skill @`g:\HCMUS\NAM3-HK3\Testing\Homework\HW2\hcmus-sw-testing--eshop-sut\.agents\skills\test-writer\SKILL.md` , bạn hãy tạo ra những test case cho tính năng này dựa trên 2 kĩ thuật được đề cập trong skill, thực hiện tuần tự và đầy đủ các phase được đề cập, sau đó sử dụng @`g:\HCMUS\NAM3-HK3\Testing\Homework\HW2\hcmus-sw-testing--eshop-sut\.agents\skills\ai-audit-report\SKILL.md` để log lại quá trình, các thông tin cần human review để trống để tôi điền vào, ngoài ra tạo trong folder @`g:\HCMUS\NAM3-HK3\Testing\Homework\HW2\hcmus-sw-testing--eshop-sut\tests\test-cases\mobile-register` tôi đã tạo sẵn và làm theo các template"
- **Kết quả AI & Minh chứng:**
  - AI xác định 4 biến đầu vào và 2 biến đầu ra.
  - Sinh ra 13 ca kiểm thử Phân hoạch tương đương (TC-MOBILE-REGISTER-001 đến TC-MOBILE-REGISTER-013) và 2 ca kiểm thử BVA (TC-MOBILE-REGISTER-BVA-001 đến TC-MOBILE-REGISTER-BVA-002).
  - **Bản AI gen thô (raw):** Thư mục `tests/test-cases/mobile-register/` lúc 00:18 ngày 29/06/2026.
- **Phán quyết:** `VALID`
- **Lý giải đánh giá (ISTQB):** Không có
- **Chỉnh sửa của Sinh viên:** Giữ nguyên các ca kiểm thử do AI đã bao phủ đầy đủ và chính xác tất cả các trường hợp theo đúng mô tả nghiệp vụ của FR-01 và FR-20.

---

## 4. Tổng Hợp Độ Chính Xác của AI

Tổng hợp các phán quyết từ Phần 3 và hoàn thiện bảng dưới đây.

| Chỉ số                                            | Số lượng | Tỷ lệ |
| :------------------------------------------------ | :------- | :---- |
| **Tổng số sản phẩm do AI tạo ra được kiểm tra**   | 5        | 100%  |
| **VALID (đúng, chấp nhận nguyên bản)**            | 1        | 20%   |
| **INVALID (sai; bị từ chối)**                     | 0        | 0%    |
| **INCOMPLETE (chấp nhận được sau khi chỉnh sửa)** | 4        | 80%   |

## 5. Kết Luận – Khi nào nên (hoặc không nên) sử dụng AI?

Qua việc thực hiện thiết kế 47 ca kiểm thử và báo cáo kết quả trên EShop SUT với sự hỗ trợ của AI, có thể rút ra một số kết luận:

1. **Nên sử dụng AI khi:** Cần tạo khung sườn test case nhanh chóng, phân tích ban đầu về phân hoạch tương đương cho các trường đầu vào tiêu chuẩn (tên, email, số điện thoại), viết mô tả hoặc định dạng báo cáo kiểm thử tự động theo chuẩn Markdown.
2. **Không nên sử dụng AI (hoặc cần kiểm tra kỹ) khi:** Thiết kế các ca kiểm thử tích hợp phức tạp, kiểm tra ràng buộc logic database (như ràng buộc khóa ngoại giữa Category và Product), và các edge cases riêng của dự án. AI thường có xu hướng tự "suy diễn" thêm yêu cầu nằm ngoài tài liệu (như tự thêm phần nhập địa chỉ ở Checkout), hoặc sử dụng test data ngẫu nhiên không khớp với database thực tế của dự án.

## 6. Công Bố Bắt Buộc (dán nguyên văn)

_"Thiết kế ca kiểm thử FR-05, FR-08, FR-14, FR-01/FR-20 và thực thi báo cáo kết quả kiểm thử trên EShop SUT" ban đầu được tạo ra bởi Gemini 3.5 Flash, Gemini 3.1 Pro và Antigravity IDE. Em đã xem xét và chỉnh sửa toàn bộ 5 sản phẩm này, bao gồm: sửa lại test data ngẫu nhiên của AI cho đúng với db thực tế; yêu cầu tách lỗi BUG-PLAS-005; rà soát loại bỏ trường địa chỉ dư thừa ở Checkout; bổ sung thêm test case xóa danh mục có sản phẩm liên kết ở Category CRUD. Báo cáo Kiểm tra AI chi tiết được đính kèm như Phụ lục A. Em xác nhận rằng em không sử dụng AI để tạo ra bất kỳ sản phẩm nào thuộc danh mục bị cấm (ảnh bằng chứng kiểm thử thực tế, video thực thi, ảnh chụp tài khoản đăng nhập)._

## Ký Xác Nhận

| Họ và tên sinh viên (in hoa): | MẠCH QUỐC TẤN                                                                                            |
| :---------------------------- | :------------------------------------------------------------------------------------------------------- |
| **Mã số sinh viên:**          | 23127115                                                                                                 |
| **Lớp / Khóa:**               | 23KTPM3                                                                                                  |
| **Môn học:**                  | CS423 / CSC15003 – Kiểm thử Phần mềm                                                                     |
| **Giảng viên:**               | TS. Lâm Quang Vũ, TS. Trần Duy Hoàng, ThS. Trần Thị Bích Hạnh, ThS. Hồ Tuấn Thanh, ThS. Trương Phước Lộc |
| **Ngày:**                     | 29/06/2026                                                                                               |
| **Chữ ký:**                   | Mạch Quốc Tấn                                                                                            |

## Tài Liệu Tham Khảo

- Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.
- ISTQB Foundation Level Syllabus (phiên bản mới nhất).
- Hardman, P. (2025). A Post-AI Learning Taxonomy.
- OECD Education Working Paper No. 338.
- Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.
- Anthropic (2025). Building reliable AI test agents – engineering blog.
