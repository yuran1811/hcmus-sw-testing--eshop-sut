# BÁO CÁO TOÀN DIỆN: KIỂM THỬ GIAO DIỆN & TÍNH KHẢ DỤNG (GUI & USABILITY TESTING REPORT)

**Thông tin sinh viên:**
- **Họ và tên:** Ân Tiến Nguyên An
- **MSSV:** 23127148
- **Lớp:** 23KTPM3
- **Môn học:** CSC13003 - Software Testing
- **Hệ thống kiểm thử (SUT):** EShop (Hệ thống demo thương mại điện tử)
- **Ngày báo cáo:** 2026/08/03

---

## 1. TỔNG QUAN DỰ ÁN & PHẠM VI KIỂM THỬ (EXECUTIVE SUMMARY & SCOPE)

Báo cáo này tổng hợp kết quả của quá trình kiểm thử giao diện (GUI Testing), kiểm thử khả năng sử dụng (Usability Evaluation) và kiểm thử đa nền tảng (Cross-Platform Testing) đối với hệ thống EShop. Mục tiêu nhằm đánh giá độ tin cậy của giao diện, trải nghiệm người dùng, khả năng tương thích của ứng dụng trên các trình duyệt/hệ điều hành khác nhau, đồng thời phát hiện các lỗi thiết kế hoặc lỗi kỹ thuật để đưa ra khuyến nghị cải tiến.

### Phạm vi kiểm thử (Scope of Testing)
1. **Trang Quên Mật Khẩu (`/forgot-password`):** Bao gồm quy trình lấy mã OTP (Bước 1) và quy trình nhập OTP để thay đổi mật khẩu mới (Bước 2) trên web bán hàng dành cho khách hàng.
2. **Trang Quản lý Đơn hàng Admin (`/admin/orders`):** Kiểm tra cấu trúc hiển thị, các nút chuyển đổi trạng thái đơn hàng và luồng thay đổi trạng thái của Admin.

---

## 2. PHẦN 1: THIẾT KẾ & THỰC THI GUI CHECKLIST (TASK 1)

### A. Phương pháp xây dựng Checklist
Checklist kiểm thử GUI được thiết kế dựa trên 4 khía cạnh chính của Interface Analysis (IA) theo các tiêu chuẩn:
- **IA-01 General UI:** Bố cục tổng quan, nhãn ngôn ngữ, tiêu chuẩn HTML (ví dụ: một thẻ `<h1>` duy nhất trên trang) và a11y (khả năng tiếp cận).
- **IA-02 Forms:** Kiểm tra các ô nhập liệu, nhãn bắt buộc `*`, các thuộc tính input (`type="email"`, `type="password"`), biểu thức chính quy (Regex) và thông báo lỗi.
- **IA-03 Navigation:** Tính đúng đắn của các liên kết điều hướng, nút quay lại ("← Quay lại"), và liên kết logo.
- **IA-04 Feedback & State:** Hiển thị mã OTP, thông báo trạng thái thành công/lỗi, máy trạng thái đơn hàng (State Machine) và trạng thái trống (Empty State).

Để xây dựng 45 hạng mục kiểm thử không trùng lặp, chúng tôi đã áp dụng các phương pháp:
- **Requirement-based (Dựa trên yêu cầu):** Đối chiếu trực tiếp với SRS của EShop (FR-03, FR-10, FR-18, FR-21..24).
- **Component & State-based (Dựa trên thành phần & trạng thái):** Áp dụng cho các ô nhập, nút bấm hành động hiển thị có điều kiện, badge trạng thái.
- **Heuristic-based:** Sử dụng 10 nguyên lý Nielsen để thiết kế kiểm thử nhằm ngăn ngừa lỗi và cung cấp phản hồi hệ thống rõ ràng.
- **Risk-based (Dựa trên rủi ro):** Chú trọng kiểm tra lỗi Regex mật khẩu, lỗ hổng Stored XSS trong ô nhập địa chỉ, và chuyển đổi trạng thái đơn hàng bất hợp lý.

### B. Ma trận bao phủ & Độ truy vết
Tổng số **45 checklist items** được phân bổ đều qua các nhóm tiêu chí:
- **IA-01 General UI:** 12 items (7 của Forgot Password, 5 của Admin Orders).
- **IA-02 Forms:** 12 items (10 của Forgot Password, 2 của Admin Orders).
- **IA-03 Navigation:** 9 items (5 của Forgot Password, 4 của Admin Orders).
- **IA-04 Feedback & State:** 12 items (5 của Forgot Password, 7 của Admin Orders).

### C. Tóm tắt kết quả thực thi tự động (Playwright Automation)
Tất cả 45 checklist items đã được thực thi tự động thông qua framework Playwright (Chromium Headed) trên môi trường cục bộ.

| Màn hình kiểm thử | Số test case | Đạt (Passed) | Không đạt (Failed) | Tỷ lệ Đạt (%) |
| :--- | :---: | :---: | :---: | :---: |
| Quên Mật Khẩu (`/forgot-password`) | 27 | 16 | 11 | 59.3% |
| Quản lý Đơn hàng (`/admin/orders`) | 18 | 10 | 8 | 55.6% |
| **Tổng cộng** | **45** | **26** | **19** | **57.8%** |

### D. Danh sách Lỗi Giao diện (GUI Defects)
19 hạng mục kiểm tra thất bại được gom nhóm lại thành **13 báo cáo lỗi (Bug Reports)** chi tiết:

| Bug ID | Màn hình | Tên lỗi (Short Description) | Mức độ Severity |
| :--- | :--- | :--- | :---: |
| `BUG-ORDERS-001` | Admin Orders | Lỗ hổng Stored XSS trong địa chỉ giao hàng dùng `dangerouslySetInnerHTML` | **Critical** |
| `BUG-ORDERS-002` | Admin Orders | Đơn hàng Đã hủy vẫn hiển thị nút "Đánh dấu Đã giao" vi phạm State Machine | **Critical** |
| `BUG-FORGOT-005` | Quên Mật Khẩu | Bước 2 thiếu ô nhập "Xác nhận mật khẩu mới" | **Major** |
| `BUG-FORGOT-006` | Quên Mật Khẩu | Regex xác thực mật khẩu mới bị lỗi logic (yêu cầu khoảng trắng `\s`) | **Critical** |
| `BUG-ORDERS-005` | Admin Orders | Thay đổi trạng thái đơn hàng ngay lập tức mà thiếu hộp thoại xác nhận | **Major** |
| `BUG-FORGOT-007` | Quên Mật Khẩu | Các thông báo lỗi xác thực và submit phụ thuộc hoàn toàn vào native `window.alert()` | **Major** |
| `BUG-FORGOT-001` | Quên Mật Khẩu | Thiếu thẻ tiêu đề `<h1>` chuẩn SEO và trợ năng | **Minor** |
| `BUG-FORGOT-002` | Quên Mật Khẩu | Ô nhập email dùng `type="text"` thay vì `type="email"`, thiếu dấu sao `*` | **Minor** |
| `BUG-ORDERS-003` | Admin Orders | Làm mới trang reset tab về Dashboard do không lưu trạng thái trên URL | **Minor** |
| `BUG-ORDERS-004` | Admin Orders | Thiếu Loading Spinner khi gọi API bất đồng bộ và thiếu Empty State | **Minor** |
| `BUG-FORGOT-004` | Quên Mật Khẩu | Nhãn OTP ở Bước 2 ghi sai số chữ số ("Mã OTP (4 số)" thay vì "6 số") | **Minor** |
| `BUG-FORGOT-008` | Quên Mật Khẩu | Thẻ `<label>` thiếu thuộc tính `htmlFor` liên kết tới ô nhập input | **Trivial** |

---

## 3. PHẦN 2: BÁO CÁO ĐÁNH GIÁ USABILITY (TASK 2)

Chúng tôi đã thiết kế và thực thi một nghiên cứu đánh giá usability có điều phối (moderated usability testing) nhằm phân tích các friction points trên luồng reset mật khẩu.

### A. Kịch bản đánh giá (Task Scenario)
Người dùng đóng vai là một khách hàng đã có tài khoản trên EShop nhưng quên mật khẩu. Họ phải thực hiện:
1. Đăng nhập thử với mật khẩu cũ (không thành công).
2. Tìm và nhấp vào link "Quên mật khẩu".
3. Nhập email đăng ký để yêu cầu mã OTP.
4. Nhập mã OTP nhận được (hiển thị chế độ demo trên màn hình) và mật khẩu mới để đặt lại mật khẩu.
5. Quay lại trang Đăng nhập và đăng nhập thành công bằng mật khẩu mới.

### B. Người dùng tham gia (Participants Profile)
Kiểm thử được thực hiện với **7 người dùng thực tế** (P01 đến P07) được tuyển dụng bên ngoài lớp học để đảm bảo tính khách quan (thông tin cá nhân được ẩn danh):
- **Đối tượng:** Gồm 1 người dùng non-IT (P02 - học sinh 18 tuổi) và 6 người dùng IT (tuổi từ 21-22).
- **Phân bổ:** 3 người dùng có liên kết học tập cùng trường nhưng không học môn Software Testing, 4 người hoàn toàn độc lập.

### C. Điểm số System Usability Scale (SUS)
Bảng điểm SUS cá nhân được tính toán dựa trên bảng khảo sát 10 câu hỏi chuẩn hóa:

| Mã người dùng (Participant) | Điểm SUS cá nhân (SUS Score) |
| :---: | :---: |
| P01 | 12.5 |
| P02 | 47.5 |
| P03 | 62.5 |
| P04 | 37.5 |
| P05 | 47.5 |
| P06 | 42.5 |
| P07 | 77.5 |
| **Điểm trung bình (Mean SUS)** | **46.79 / 100** |

**Đánh giá:**
- **Adjective Rating:** **Poor (Yếu - Hạng D)**.
- **Acceptability:** **Not Acceptable (Không thể chấp nhận)**.

### D. Các phát hiện Usability chính & Trở ngại hệ thống (Friction Points)
1. **Tỷ lệ thành công là 0% (7/7 người dùng thất bại):**
   Tất cả 7 người dùng đều bị kẹt lại ở Bước 2 do lỗi Regex độ mạnh mật khẩu (`BUG-FORGOT-006`). Dù nhập mật khẩu rất phức tạp, hệ thống vẫn báo lỗi mật khẩu yếu. P01 đã bỏ cuộc hoàn toàn sau nhiều lần thử lại, trong khi các người dùng khác chỉ hoàn thành kịch bản sau khi kiểm thử viên phải can thiệp (moderator bypass) tiết lộ rằng Regex yêu cầu có **khoảng trắng** trong mật khẩu.
2. **Khủng hoảng độ tin cậy bảo mật (Trust Flaw):**
   Người dùng P05 và P06 lập tức tỏ thái độ e ngại và mất niềm tin khi mã OTP bảo mật lại hiển thị công khai ngay trong banner thành công trên UI của trang web thay vì gửi bí mật vào hòm thư cá nhân.
3. **Trở ngại về thao tác nhập liệu:**
   Việc thiếu ô nhập "Xác nhận mật khẩu" và không có biểu tượng ẩn/hiện mật khẩu làm người dùng gặp khó khăn lớn trong việc xác định ký tự mình vừa gõ, đặc biệt khi họ liên tục bị báo lỗi mật khẩu không đạt chuẩn.

---

## 4. PHẦN 3: KIỂM THỬ ĐA NỀN TẢNG & ĐA TRÌNH DUYỆT (TASK 3)

Để đảm bảo ứng dụng hoạt động ổn định trên nhiều thiết bị và trình duyệt của khách hàng, chúng tôi đã tiến hành kiểm thử chéo nền tảng (Cross-Platform) trên 3 môi trường khác nhau.

### A. Thiết lập môi trường (Test Platforms)
- **Platform 1 (Windows / Chrome):** Chạy cục bộ trên hệ điều hành Windows 11 với Google Chrome phiên bản mới nhất.
- **Platform 2 (macOS / Firefox):** Kiểm thử trên macOS Sonoma thông qua Firefox trên BrowserStack.
- **Platform 3 (macOS / Safari):** Kiểm thử trên macOS Sequoia thông qua Safari trên BrowserStack.

### B. Kết quả thực thi đa nền tảng
Tất cả 45 hạng mục trong checklist GUI đã được chạy lại trên cả 3 nền tảng (tổng cộng **135 lượt chạy**).

| Nền tảng (Platform) | Tổng số test cases | Số lượng Pass | Số lượng Fail | Tỷ lệ Pass (%) |
| :--- | :---: | :---: | :---: | :---: |
| Platform 1 (Chrome/Win11) | 45 | 26 | 19 | 57.8% |
| Platform 2 (Firefox/macOS) | 45 | 26 | 19 | 57.8% |
| Platform 3 (Safari/macOS) | 45 | 26 | 19 | 57.8% |

### C. Khác biệt hành vi giữa các trình duyệt & Xác thực ảnh chụp
- **Sự nhất quán layout:** Giao diện hiển thị nhất quán trên cả 3 trình duyệt, không xảy ra hiện tượng vỡ khung hình, tràn thẻ div hay thanh cuộn ngang ngoài ý muốn ở độ phân giải 1536×864.
- **Khác biệt về Viền Focus:** Firefox hiển thị viền focus màu xanh lam dày và rõ nét hơn so với cơ chế vẽ outline mặc định của Chrome và Safari khi người dùng nhấn phím Tab để di chuyển qua các trường nhập liệu.
- **Khác biệt về Hộp thoại Alert:** Hộp thoại thông báo lỗi được dựng bởi trình duyệt (native `window.alert`) hiển thị giao diện khác biệt rõ rệt (Chrome hiển thị popup từ trên cùng của trang web, Safari hiển thị modal xám bo góc ở giữa màn hình).
- **Xác thực:** Mỗi lượt chạy đều được chụp ảnh màn hình làm bằng chứng (Evidences) đi kèm với email sinh viên làm watermark phủ lên trên để đảm bảo tính xác thực của dữ liệu kiểm thử.

### D. Phân loại lỗi
Tất cả 19 lỗi phát hiện được trên các nền tảng kiểm thử đều thuộc loại **General Defect** (lỗi logic và HTML chung của ứng dụng nguồn). Không phát hiện bất kỳ **Cross-platform defect** (lỗi chỉ xuất hiện đơn lẻ trên một nền tảng nhất định) nào, cho thấy khả năng tương thích mã nguồn của SUT rất tốt.

---

## 5. TỔNG KẾT & KHUYẾN NGHỊ HÀNH ĐỘNG (CONCLUSIONS & RECOMMENDATIONS)

### Nhận xét chung
Hệ thống EShop có giao diện trực quan, layout gọn gàng và khả năng hiển thị tương thích đa nền tảng tốt. Tuy nhiên, tính khả dụng và tính bảo mật của sản phẩm hiện đang ở mức **không chấp nhận được** (Mean SUS 46.79 và Task Success Rate 0%) do một số lỗi logic lập trình giao diện nghiêm trọng.

### Khuyến nghị hành động cải tiến
1. **Sửa Regex mật khẩu ngay lập tức (Ưu tiên P0):** Thay đổi logic kiểm tra mật khẩu ở frontend, loại bỏ yêu cầu bắt buộc khoảng trắng (`\s`) và thay thế bằng việc kiểm tra ký tự đặc biệt tiêu chuẩn.
2. **Che giấu mã OTP (Ưu tiên P0):** Chuyển cơ chế hiển thị mã OTP từ việc đưa lên UI thành việc gửi qua email của tài khoản yêu cầu.
3. **Bổ sung các trường giao diện thiết yếu (Ưu tiên P1):** Thêm trường Xác nhận mật khẩu mới, nút bật/tắt hiển thị mật khẩu và chỉ báo trạng thái đang tải (Loading Spinner) trên các tác vụ bất đồng bộ.
4. **Phòng chống XSS (Ưu tiên P0):** Thay thế việc render địa chỉ bằng `dangerouslySetInnerHTML` ở trang Admin Orders bằng việc hiển thị text thuần đã được escape để tránh nguy cơ bị chèn mã độc.
5. **Cải tiến giao diện phản hồi (Ưu tiên P2):** Thay thế các hộp thoại native `window.alert()` bằng các component Toast/Alert tùy chỉnh trên UI để cải thiện trải nghiệm người dùng.
