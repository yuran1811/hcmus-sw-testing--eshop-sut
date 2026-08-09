# BÁO CÁO TỔNG KẾT KIỂM THỬ TỰ ĐỘNG (AUTOMATION TESTING REPORT)
## MÔN HỌC: KIỂM THỬ PHẦN MỀM (SEMINAR / THỰC HÀNH) - HỌC KỲ II

---

### I. Thông Tin Sinh Viên
* **Họ và tên:** Ân Tiến Nguyên An
* **Mã số sinh viên (MSSV):** 23127148
* **Lớp:** 23KTPM3
* **Đề tài bài tập:** HW04 - Automation Testing (Phát triển và Chạy bộ test tự động hóa đa trình duyệt cho SUT EShop)
* **Thời gian thực hiện:** Tháng 8/2026
* **Công cụ tự động hóa sử dụng:** Playwright v1.52.0 (TypeScript) & Node.js
* **Môi trường:** Windows 11, SQLite Cục bộ, Google Chrome, Mozilla Firefox, WebKit

---

### II. Tổng Quan Ma Trận Kiểm Thử (Test Matrix Overview)

Quy trình chạy thử nghiệm tự động hóa được thiết kế và thực thi dưới dạng **Ma trận 9-Cell (3 Tính năng × 3 Trình duyệt)** nhằm đảm bảo khả năng tương thích chéo (cross-browser compatibility) và kiểm chứng tính nhất quán về mặt phản hồi logic/giao diện trên các công cụ render khác nhau (Chromium, Firefox, WebKit).

Tất cả 9 cell kiểm thử đã được chạy thành công qua trình điều khiển tự động hóa `run-matrix.js`. Tuy nhiên, do tồn tại các lỗi nghiêm trọng trong bản build hiện tại của SUT (System Under Test) ở cả phía Frontend và Backend API, một số test case kiểm thử đã bị **FAILED** trên mọi trình duyệt. Sự thất bại này phản ánh chính xác các khiếu khuyết (defects) của SUT so với tài liệu đặc tả SRS, chứ không phải do lỗi của kịch bản kiểm thử (test script).

#### Bảng Ma Trận Thực Thi 9-Cell & Trạng Thái Trình Duyệt:

| Phân hệ tính năng (Feature Code) | Chromium (Google Chrome) | Firefox (Mozilla Firefox) | WebKit (Safari Engine) | Nhận xét chung của QA |
| :--- | :---: | :---: | :---: | :--- |
| **FR-03: Quên mật khẩu** | `FAILED` | `FAILED` | `FAILED` | Chạy thành công 22/22 TCs. Phát hiện **9 lỗi** thực tế của SUT trên cả 3 trình duyệt. |
| **FR-11: Lịch sử đơn hàng** | `FAILED` | `FAILED` | `FAILED` | Chạy thành công 18/18 TCs. Phát hiện **5 lỗi** giao diện/nghiệp vụ của SUT trên cả 3 trình duyệt. |
| **FR-19: Quản lý người dùng (Admin)** | `FAILED` | `FAILED` | `FAILED` | Chạy thành công 16/16 TCs. Phát hiện **5 lỗi** (gồm 3 lỗi logic lớn trong đó có lỗi bảo mật P0) trên cả 3 trình duyệt. |

---

### III. Thống Kê Tóm Tắt Kết Quả Kiểm Thử (Test Execution Summary)

Dưới đây là bảng thống kê số lượng Test Cases thực hiện cho từng phân hệ tính năng. Các chỉ số này là đồng nhất trên cả 3 trình duyệt thuộc ma trận chạy:

| Mã Tính Năng | Tên Tính Năng | Tổng Số Test Cases | Số Test Case ĐẠT (Passed) | Số Test Case LỖI (Failed do lỗi SUT) | Tỷ lệ Đạt (Pass Rate) |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **FR-03** | Quên & Đặt lại mật khẩu | 22 | 13 | 9 | 59.09% |
| **FR-11** | Xem Lịch sử Đơn hàng (User) | 18 | 13 | 5 | 72.22% |
| **FR-19** | Quản lý Người dùng (Admin) | 16 | 11 | 5 | 68.75% |
| **TỔNG CỘNG** | **Bộ test tích hợp HW04** | **56** | **37** | **19** | **66.07%** |

> [!NOTE]
> - **Tổng số lượt chạy test case trong ma trận:** 56 test cases × 3 trình duyệt = **168 lượt chạy**.
> - **Tổng số lượt chạy Passed:** 37 × 3 = **111 lượt**.
> - **Tổng số lượt chạy Failed do lỗi hệ thống:** 19 × 3 = **57 lượt**.

---

### IV. Phân Tích Khoảng Cách Và Đánh Giá Kịch Bản AI Sinh (AI-Generated Scripts Review & Gap Analysis)

Để đáp ứng đầy đủ yêu cầu khắt khe của môn học, QA Lead đã thực hiện phân tích khoảng cách kỹ thuật giữa sản phẩm do AI (Gemini 3.5 Flash) sinh ra ban đầu so với bộ test case hoàn chỉnh chạy ổn định trên thực tế.

#### 4.1 Thiết Kế Hướng Dữ Liệu (Data-Driven Testing)
Kịch bản sinh ra bởi AI đã tách biệt hoàn toàn dữ liệu kiểm thử ra khỏi mã nguồn logic. Toàn bộ dữ liệu đầu vào và các kết quả mong đợi được cấu trúc trong 3 tệp JSON ngoài:
- [FR03_data.json](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/test-data/FR03_data.json) (22 bộ dữ liệu)
- [FR11_data.json](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/test-data/FR11_data.json) (18 bộ dữ liệu)
- [FR19_data.json](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/test-data/FR19_data.json) (16 bộ dữ liệu)

Mã nguồn Playwright sử dụng vòng lặp động `for (const tc of testCases)` để đọc dữ liệu từ file JSON thông qua thư viện `fs` và `path` của Node.js nhằm sinh ra các test case tương ứng một cách tự động, tuân thủ đúng yêu cầu không sử dụng mảng/đối tượng inline cứng trong code.

#### 4.2 Các Mẫu Kiểm Chứng Được Sử Dụng (Assertion Patterns)
Bộ kiểm thử tự động sử dụng **3 mẫu kiểm chứng (assertion) khác biệt** của Playwright để đảm bảo độ bao phủ và tính tin cậy của kết quả:
1. **Web-First Assertions (Kiểm chứng Giao diện động):** Sử dụng các hàm bất đồng bộ trực tiếp trên locator như `await expect(locator).toBeVisible()`, `await expect(locator).toHaveClass()`, `await expect(locator).toHaveText()` để tự động chờ (auto-wait) phần tử xuất hiện trên DOM.
2. **Value Assertions (Kiểm chứng Giá trị & Logic API):** Sử dụng hàm kiểm chứng giá trị đồng bộ như `expect(actualValue).toBe(expectedValue)` hoặc `expect(actualValue).toContain(substring)` để kiểm tra mã trạng thái response API, dữ liệu JSON phản hồi hoặc nội dung hội thoại alert thu thập được từ trình duyệt.
3. **Negative Assertions (Kiểm chứng Phủ định/Chặn lỗi):** Sử dụng dạng phủ định `.not` như `expect(actualValue).not.toBe(forbiddenValue)` hoặc `await expect(locator).not.toBeVisible()` nhằm xác nhận các trường hợp bảo mật hoặc giao diện không được phép hiển thị thông tin sai lệch.

#### 4.3 Những Lỗi Sai Và Điểm Thiếu Sót Của AI (What AI Got Wrong & Missed)
Trong quá trình rà soát (Human Review), sinh viên đã phát hiện và chỉnh sửa các lỗi lớn sau trong mã nguồn do AI cung cấp:
- **Thiếu logic dọn dẹp cơ sở dữ liệu (Database Cleanup):** Đây là lỗi nghiêm trọng nhất. Do cơ sở dữ liệu SQLite của SUT có các ràng buộc duy nhất (Unique Constraints) về email và mã đơn hàng, việc AI chạy lặp lại test case nhiều lần hoặc chạy song song trên 3 trình duyệt mà không làm sạch dữ liệu cũ (`beforeAll` hook) dẫn đến lỗi trùng lặp dữ liệu (`SQLITE_CONSTRAINT: UNIQUE constraint failed`) khiến toàn bộ các lượt chạy sau bị hỏng.
- **Lỗi ô nhiễm trạng thái Admin (State Isolation Violations):** Trong phân hệ FR-19, kịch bản test API xóa Admin thực hiện xóa tài khoản quản trị chính của hệ thống. AI viết test case này mà không có cơ chế hoàn tác/khôi phục dữ liệu Admin, dẫn đến việc các test case sau đó không thể đăng nhập quyền Admin để tiếp tục chạy test, gây lỗi hàng loạt.
- **Bộ định vị phần tử dễ gãy (Fragile Locators):** AI lạm dụng các selector tĩnh dựa trên text tiếng Việt cụ thể (như `page.locator('text=Lịch sử đơn hàng')`) hoặc class CSS Tailwind dài dòng của nút bấm. Khi chạy trên các trình duyệt khác nhau hoặc khi giao diện có sự thay đổi nhỏ về giao diện render, các selector này lập tức bị lỗi timeout.
- **Sai cú pháp TypeScript & Playwright API:** AI sinh nhầm cú pháp so khớp của hàm expect (ví dụ: `expect(actual, message).toBe(...)` thay vì cấu trúc chuẩn của Playwright).

#### 4.4 Giải Trình Nguyên Nhân AI Bỏ Sót (Why AI Missed)
- **Thiếu ngữ cảnh thực thi động (Execution Context):** AI hoạt động dựa trên mô hình ngôn ngữ tĩnh (static language model), chỉ suy đoán mã nguồn dựa trên mô tả văn bản và cấu trúc API tĩnh được cung cấp. Nó không có khả năng tự chạy thử, không nhìn thấy luồng chạy dữ liệu động trong SQLite, và không cảm nhận được sự xung đột dữ liệu giữa các luồng chạy song song (Parallel execution).
- **Giới hạn huấn luyện (Training Data Limitations):** AI thường học từ các ví dụ kiểm thử đơn lẻ trên mạng vốn bỏ qua các logic phức tạp về setup/teardown cơ sở dữ liệu thực tế, dẫn đến thói quen viết code test "sạch" trên lý thuyết nhưng "bẩn" trên môi trường tích hợp thực tế.

#### 4.5 Các Ca Kiểm Thử Không Thể Tự Động Hóa (Unautomated Test Cases)
- **Kết quả:** **0 ca bị bỏ lại.**
- **Giải trình:** Cả 56/56 test cases được thiết kế ban đầu đều đã được tự động hóa thành công 100%. Các khó khăn về định vị hộp thoại Alert trình duyệt, đồng bộ dữ liệu SQLite bất đồng bộ, hay giả lập đăng nhập đa quyền (Guest, User, Admin) đều đã được giải quyết triệt để bằng mã nguồn bổ sung thủ công của con người (như hàm `reseedAdminSync` đồng bộ cơ sở dữ liệu trực tiếp bằng lệnh gọi SQLite backend).

---

### V. Chi Tiết Các Lỗi Hệ Thống Phát Hiện Được (SUT Defects Mapping)

Bộ test tự động đã phát hiện tổng cộng **17 lỗi hệ thống khác nhau** (được mô tả chi tiết trong 17 tệp tin `.md` báo cáo lỗi tại thư mục [Bug Report](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW4/Bug%20Report/)). 
Dưới đây là bảng ánh xạ chi tiết giữa các Test Case bị FAILED trong quá trình chạy tự động hóa và Bug Report tương ứng:

#### 1. Phân hệ FR-03: Quên và Đặt lại mật khẩu (9 Lỗi SUT khiến 9 Test Cases thất bại)

| Mã Test Case | Tên Kịch Bản Kiểm Thử | Mã Lỗi (Bug ID) | Mô Tả Lỗi Hệ Thống Thực Tế & Ảnh Hưởng | Mức Độ (Severity) |
| :---: | :--- | :---: | :--- | :---: |
| **F03-TC-001** | Happy Path - Khôi phục mật khẩu thành công | **BUG-FORGOT-008** | Sau khi đổi mật khẩu thành công và điều hướng về trang đăng nhập `/login`, tiêu đề trang đăng nhập hiển thị sai văn bản tiếng Việt thành "Đăng Ký" thay vì "Đăng Nhập". | Major |
| **F03-TC-004** | Yêu cầu OTP với email sai định dạng | **BUG-FORGOT-003** | Form quên mật khẩu không sử dụng HTML5 email validation (`type="email"`). Hệ thống cho phép gửi email sai định dạng lên server và hiển thị hộp thoại alert thay vì chặn trực tiếp trên giao diện. | Medium |
| **F03-TC-011** | Đặt lại mật khẩu đúng đặc tả (không chứa khoảng trắng) | **BUG-FORGOT-001** | Lỗi Regex xác thực mật khẩu mạnh ở phía Backend API bắt buộc mật khẩu phải chứa ký tự khoảng trắng (ví dụ: `New Pass123` mới hợp lệ, còn `NewPass123!` không khoảng trắng bị từ chối). Đây là một thiết kế sai lầm nghiêm trọng về bảo mật. | Critical |
| **F03-TC-012** | Đặt lại mật khẩu với Xác nhận mật khẩu không khớp | **BUG-FORGOT-002** | Giao diện đặt lại mật khẩu của SUT hoàn toàn thiếu trường nhập liệu "Xác nhận mật khẩu" (Confirm Password), khiến người dùng không thể xác thực lại mật khẩu và làm test case kiểm tra tính không khớp bị lỗi trên giao diện. | Major |
| **F03-TC-017** | Kiểm tra hiển thị Step Indicator và liên kết điều hướng | **BUG-FORGOT-004** | Giao diện thiếu hiển thị chỉ báo bước thực hiện (Step Indicator "Bước 1 / 2") và thiếu liên kết "Quay lại đăng nhập" tại màn hình nhập Email. | Minor |
| **F03-TC-018** | Kiểm tra nhãn trường bắt buộc `*` và màu nút bấm | **BUG-FORGOT-005** | Nhãn (label) trường Email không có ký tự dấu sao đỏ `*` để biểu thị đây là trường bắt buộc nhập theo tài liệu SRS. | Trivial |
| **F03-TC-019** | Kiểm tra vị trí hiển thị thông báo lỗi trên nút submit | **BUG-FORGOT-006** | SUT hiển thị lỗi bằng Dialog Alert mặc định của trình duyệt thay vì hiển thị thông báo lỗi (inline error) dạng văn bản màu đỏ nằm ngay phía trên nút submit. | Minor |
| **F03-TC-021** | Kiểm tra vô hiệu hóa nút submit (Double Submit Prevention) | **BUG-FORGOT-007** | Nút submit "Lấy mã OTP" và "Đặt lại mật khẩu" không bị vô hiệu hóa (disabled) khi client đang gửi request và chờ phản hồi từ server, dẫn đến rủi ro gửi nhiều request trùng lặp. | Medium |
| **F03-TC-022** | Kiểm tra định dạng type của các trường nhập liệu | **BUG-FORGOT-009** | Ô nhập mật khẩu trên trang đăng nhập sử dụng thuộc tính `type="text"` thay vì `type="password"`, làm lộ mật khẩu của người dùng dưới dạng văn bản thô ngay trên màn hình. | Critical |

#### 2. Phân hệ FR-11: Xem Lịch sử Đơn hàng (5 Lỗi SUT khiến 5 Test Cases thất bại)

| Mã Test Case | Tên Kịch Bản Kiểm Thử | Mã Lỗi (Bug ID) | Mô Tả Lỗi Hệ Thống Thực Tế & Ảnh Hưởng | Mức Độ (Severity) |
| :---: | :--- | :---: | :--- | :---: |
| **F11-TC-008** -> **F11-TC-012** | Kiểm tra mã màu CSS và nhãn dịch tiếng Việt của 5 trạng thái đơn hàng | **BUG-ORDERS-003** | Nút "Đăng xuất" trên thanh sidebar hiển thị sai nhãn tiếng Việt và sai màu (yêu cầu màu đỏ, nhãn "Đăng xuất" nhưng thực tế hiển thị nhãn khác hoặc sai màu). | Medium |
| **F11-TC-013** | Kiểm tra trạng thái danh sách đơn hàng trống | **BUG-ORDERS-001** | Khi tài khoản mới đăng nhập và chưa có đơn hàng nào, trang Lịch sử đơn hàng trống không hiển thị hình ảnh minh họa (Empty State Illustration) như tài liệu hướng dẫn thiết kế. | Minor |
| **F11-TC-014** | Kiểm tra sự tồn tại của thẻ tiêu đề `<h1>` duy nhất | **BUG-ORDERS-004** | Trang Lịch sử đơn hàng không sử dụng thẻ tiêu đề `<h1>` duy nhất cho tên trang, gây ảnh hưởng đến cấu trúc Semantic HTML5 và tính năng SEO/Accessibility. | Minor |
| **F11-TC-015** | Kiểm tra đánh dấu nổi bật trang hiện tại trên sidebar | **BUG-ORDERS-005** | Menu "Lịch sử đơn hàng" trên thanh điều hướng không được áp dụng class CSS active để làm nổi bật (highlight) khi người dùng đang truy cập trang này. | Minor |
| **F11-TC-016** & **F11-TC-017** | Hủy đơn hàng ở các trạng thái khác nhau (Shipping / Cancelled) | **BUG-ORDERS-002** | Hệ thống vẫn hiển thị nút "Hủy đơn hàng" và cho phép hủy thành công các đơn hàng đang ở trạng thái "shipping" (Đang giao hàng), vi phạm nghiệp vụ bán hàng (chỉ cho phép hủy khi đang ở trạng thái `pending` - Chờ xử lý). | Critical |

#### 3. Phân hệ FR-19: Quản lý Người dùng - Admin (3 Lỗi SUT khiến 5 Test Cases thất bại)

| Mã Test Case | Tên Kịch Bản Kiểm Thử | Mã Lỗi (Bug ID) | Mô Tả Lỗi Hệ Thống Thực Tế & Ảnh Hưởng | Mức Độ (Severity) |
| :---: | :--- | :---: | :--- | :---: |
| **F19-TC-005** | User thường gọi API lấy danh sách người dùng quản trị | **BUG-USERS-001** | API Backend `/api/admin/users` thiếu phân quyền vai trò. Người dùng thông thường (role `'user'`) chỉ cần đính kèm JWT hợp lệ là có thể lấy toàn bộ danh sách tài khoản trong hệ thống. | Blocker |
| **F19-TC-006** | User thường gọi API xóa người dùng thông qua endpoint Admin | **BUG-USERS-001** | API DELETE `/api/admin/users/<id>` thiếu phân quyền vai trò, cho phép tài khoản thường gửi request và xóa thành công bất kỳ người dùng nào khác. | Blocker |
| **F19-TC-011** | Admin kiểm tra nút Xóa trên chính tài khoản của mình | **BUG-USERS-002** | Giao diện Admin vẫn hiển thị nút "Xóa" hoạt động bình thường trên dòng thông tin của chính tài khoản Admin đang đăng nhập. | Major |
| **F19-TC-012** | Admin gửi yêu cầu API tự xóa chính mình | **BUG-USERS-002** | API DELETE `/api/admin/users/<admin_id>` không chặn hành vi tự xóa của Admin đang đăng nhập, dẫn đến việc xóa thành công tài khoản admin khỏi DB, làm sập phiên làm việc và khóa quyền quản trị hệ thống vĩnh viễn. | Critical |
| **F19-TC-014** | Kiểm tra cấu trúc Semantic HTML tiêu đề trang | **BUG-USERS-003** | Tiêu đề chính "Quản lý Người dùng" sử dụng sai thẻ `<h2>` thay vì `<h1>`, trong khi thẻ `<h1>` duy nhất trên trang bị lạm dụng cho Logo thương hiệu ở sidebar. | Minor |

---

### VI. Nhận Định QA Về Chất Lượng Sản Phẩm (SUT Quality Assessment)

Dựa trên kết quả thực thi 168 lượt chạy test tự động hóa chéo và phân tích chi tiết 17 lỗi phát hiện được, QA Lead đưa ra các nhận định và đánh giá chuyên môn sau về chất lượng sản phẩm:

#### 1. Đánh giá tính Bảo mật và Phân quyền (Security & Access Control) - **RẤT KÉM (CRITICAL RISK)**
- **Lỗ hổng nghiêm trọng ở Backend API (P0/Blocker):** Backend hoàn toàn bỏ sót middleware kiểm tra quyền Admin đối với các route quản trị hệ thống (`/api/admin/*`). Việc chỉ kiểm tra tính hợp lệ của token JWT (`authenticateToken`) mà không kiểm tra giá trị `req.user.role === 'admin'` cho phép bất kỳ tài khoản khách hàng nào cũng có thể đọc thông tin nhạy cảm và thực hiện hành vi phá hoại (xóa tài khoản).
- **Rò rỉ thông tin đăng nhập (P1/Critical):** Trường mật khẩu trên trang đăng nhập sử dụng `type="text"` hiển thị rõ mật khẩu dưới dạng thô. Đây là một lỗi cơ bản nhưng cực kỳ nghiêm trọng, vi phạm các tiêu chuẩn an toàn thông tin tối thiểu (OWASP Top 10).
- **Hệ thống tự khóa (P1/Critical):** Thiếu logic validation chặn Admin tự xóa chính mình tạo ra rủi ro vận hành cực lớn, có thể gây gián đoạn hệ thống và mất kiểm soát dữ liệu admin một cách dễ dàng.

#### 2. Đánh giá Logic Nghiệp vụ (Business Logic Validation) - **CÓ LỖI LOGIC NẶNG**
- **Quy trình Quên mật khẩu bị hỏng:** Lỗi ràng buộc mật khẩu mạnh bằng Regex yêu cầu bắt buộc có khoảng trắng (`\s`) là một lỗi lập trình sơ đẳng ở Backend nhưng gây tắc nghẽn luồng nghiệp vụ khôi phục tài khoản của khách hàng thực tế.
- **Hủy đơn hàng sai thời điểm:** Cho phép hủy đơn hàng đang trên đường giao (`shipping`) làm phát sinh chi phí logistics thực tế và phá vỡ quy trình vận hành đồng bộ của một trang thương mại điện tử.

#### 3. Đánh giá Giao diện và Trải nghiệm người dùng (GUI & Usability) - **THIẾU CHUẨN HÓA**
- Thiết kế giao diện còn cẩu thả: thiếu ký tự trường bắt buộc (`*`), thiếu Step Indicator dẫn dắt người dùng qua quy trình quên mật khẩu 2 bước, sử dụng Dialog Alert mặc định của trình duyệt thay vì các thành phần thông báo lỗi nội dòng (inline error messages) gây đứt gãy trải nghiệm.
- Lỗi bản dịch tiếng Việt cẩu thả (tiêu đề trang đăng nhập hiển thị thành "Đăng Ký").
- Vi phạm các tiêu chuẩn cấu trúc Semantic HTML5 (sử dụng sai thứ tự các thẻ tiêu đề `<h1>`, `<h2>`), ảnh hưởng tiêu cực đến SEO và khả năng tiếp cận (Accessibility - WCAG).

#### KẾT LUẬN VÀ KHUYẾN NGHỊ:
> [!WARNING]
> **Hệ thống SUT hiện tại KHÔNG ĐỦ ĐIỀU KIỆN ĐỂ BÀN GIAO (RELEASE) HOẶC TRIỂN KHAI THỰC TẾ.**
> Đội ngũ phát triển Backend và Frontend cần phải ưu tiên sửa chữa ngay lập tức các lỗi phân quyền API (Blocker) và hiển thị mật khẩu thô (Critical) trước khi tiến hành tối ưu hóa giao diện. Bộ test tự động Playwright này nên được tích hợp vào quy trình CI/CD để tự động chạy kiểm thử hồi quy (Regression Testing) nhằm giám sát chất lượng trong các bản build tiếp theo.

---
**Báo cáo được chuẩn bị bởi QA Lead:** *Ân Tiến Nguyên An*  
*Chữ ký điện tử đã xác thực trên hệ thống.*
