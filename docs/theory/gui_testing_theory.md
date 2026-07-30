# GUI Testing — Tài liệu Lý thuyết Toàn diện

> Tài liệu học tập nghiêm túc về **GUI Testing** (Kiểm thử Giao diện Đồ họa Người dùng), tổng hợp và đối chiếu từ các nguồn lý thuyết chuẩn: ISTQB Glossary, ISTQB Foundation Level Syllabus, Nielsen Norman Group, W3C WCAG 2.2, mô hình Test Automation Pyramid (Mike Cohn) và Ice-Cream Cone Anti-Pattern (Alister Scott). Mục tiêu: giúp người đọc nắm được **định nghĩa chính xác, phạm vi, quy trình, kỹ thuật thiết kế test, và giới hạn thực tế** của GUI Testing — không chỉ là một danh sách việc cần làm mà là một hệ thống lý thuyết có cơ sở.

---

## Mục lục

1. [Định nghĩa và các khái niệm dễ nhầm lẫn](#1-định-nghĩa-và-các-khái-niệm-dễ-nhầm-lẫn)
2. [Vì sao GUI Testing quan trọng](#2-vì-sao-gui-testing-quan-trọng)
3. [Phạm vi kiểm thử GUI](#3-phạm-vi-kiểm-thử-gui)
4. [Quy trình GUI Testing](#4-quy-trình-gui-testing)
5. [GUI Checklist — Lý thuyết và kỹ thuật xây dựng](#5-gui-checklist--lý-thuyết-và-kỹ-thuật-xây-dựng)
6. [Heuristic Evaluation — 10 nguyên tắc Usability của Nielsen](#6-heuristic-evaluation--10-nguyên-tắc-usability-của-nielsen)
7. [Accessibility Testing — Chuẩn WCAG 2.2](#7-accessibility-testing--chuẩn-wcag-22)
8. [Thiết kế Test Case & Kỹ thuật chọn dữ liệu test](#8-thiết-kế-test-case--kỹ-thuật-chọn-dữ-liệu-test)
9. [Bug/Defect Report](#9-bugdefect-report)
10. [Responsive, Compatibility, Accessibility Testing](#10-responsive-compatibility-accessibility-testing)
11. [Automation trong GUI Testing](#11-automation-trong-gui-testing)
12. [Test Result & Test Summary Report](#12-test-result--test-summary-report)
13. [Tổng kết & Nguyên tắc cốt lõi](#13-tổng-kết--nguyên-tắc-cốt-lõi)
14. [Bảng thuật ngữ (Glossary)](#14-bảng-thuật-ngữ-glossary)
15. [Tài liệu tham khảo](#15-tài-liệu-tham-khảo)

---

## 1. Định nghĩa và các khái niệm dễ nhầm lẫn

### 1.1 GUI Testing là gì?

Theo ISTQB Glossary, **GUI Testing** (kiểm thử giao diện đồ họa người dùng) được định nghĩa là _"testing performed by interacting with the software under test via the graphical user interface"_ — tức là **kiểm thử được thực hiện bằng cách tương tác với phần mềm thông qua giao diện đồ họa**, để phân biệt với các cách kiểm thử khác như qua API (giao diện lập trình ứng dụng), qua dòng lệnh (CLI), hay truy cập trực tiếp vào cơ sở dữ liệu.

Điểm mấu chốt cần nắm: GUI Testing được định nghĩa bởi **kênh tương tác** (thông qua giao diện mà người dùng thật sẽ nhìn thấy và thao tác — nút bấm, form, menu, hình ảnh...), **không phải** bởi loại thuộc tính đang được kiểm tra. Nói cách khác, khi tester kiểm tra chức năng "thêm sản phẩm vào giỏ hàng" bằng cách click chuột trên trình duyệt, đó là GUI Testing — dù lúc đó đang kiểm tra tính đúng đắn của chức năng (functional), chứ không phải hình thức hiển thị (visual).

### 1.2 Phân biệt các thuật ngữ hay bị dùng lẫn

Trong thực tế, bốn thuật ngữ dưới đây thường bị dùng thay thế cho nhau một cách không chính xác. Việc phân biệt rõ giúp tránh nhầm lẫn giữa tiêu chí "đẹp" (hình thức) và tiêu chí "dùng được" (chức năng, trải nghiệm):

| Thuật ngữ                                         | Trọng tâm                                                                                                                                                                                                                            | Ví dụ câu hỏi kiểm thử                                                                  |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| **Visual Testing** (Kiểm thử hình ảnh)            | Giao diện hiển thị đúng với thiết kế (pixel, màu sắc, font chữ, khoảng cách)                                                                                                                                                         | "Nút Checkout có đúng màu `#3446FF` và bo góc 8px như trong file thiết kế Figma không?" |
| **UI Testing** (Kiểm thử giao diện người dùng)    | Các phần tử tương tác (button, input, menu...) hoạt động đúng chức năng                                                                                                                                                              | "Click vào nút Checkout có chuyển đúng sang trang thanh toán không?"                    |
| **GUI Testing** (Kiểm thử giao diện đồ họa)       | Tập hợp rộng hơn UI Testing — bao gồm cả kiểm tra hiển thị lẫn hành vi của toàn bộ thành phần đồ họa (icon, cửa sổ, menu, hộp thoại...); trong thực hành hằng ngày, thuật ngữ này thường được dùng bao trùm cả Visual lẫn UI Testing | Kết hợp cả hai câu hỏi ở trên                                                           |
| **Usability Testing** (Kiểm thử khả năng sử dụng) | Người dùng thật có hoàn thành được mục tiêu một cách dễ dàng, hiệu quả và hài lòng hay không                                                                                                                                         | "Người dùng mất bao lâu để hoàn tất checkout? Họ có bị bối rối ở bước nào không?"       |

Cần lưu ý một điểm quan trọng: **Usability Testing** khác biệt về bản chất so với ba loại còn lại, vì nó đòi hỏi **người dùng thật** thực hiện tác vụ và quan sát hành vi của họ, trong khi Visual/UI/GUI Testing thường do **tester (chuyên gia kiểm thử)** tự thực hiện dựa trên tiêu chí đã định sẵn (không cần người dùng thật tham gia). Vì lý do này, trong thực hành, "GUI Testing" thường được hiểu theo nghĩa rộng — bao gồm mọi thứ có thể kiểm tra được qua giao diện bởi tester — còn Usability Evaluation là một hoạt động độc lập, cần phương pháp và đối tượng tham gia khác hẳn.

---

## 2. Vì sao GUI Testing quan trọng?

- **GUI là điểm chạm duy nhất** mà phần lớn người dùng cuối trải nghiệm hệ thống. Logic backend có thể đúng 100%, nhưng nếu form hiển thị sai hoặc phản hồi chậm, người dùng vẫn coi hệ thống là "bị lỗi" — vì họ không nhìn thấy backend, họ chỉ nhìn thấy giao diện.
- **Lỗi GUI rẻ để sửa nhưng đắt nếu phát hiện trễ.** Một lỗi validation phát hiện ở giai đoạn thiết kế chỉ tốn vài phút chỉnh sửa; nếu phát hiện sau khi đã triển khai (production), chi phí tăng lên gồm: hỗ trợ khách hàng, ảnh hưởng uy tín thương hiệu, và có thể gây lỗi dữ liệu thực tế (ví dụ: người dùng submit đơn hàng trùng lặp do nút không bị vô hiệu hóa (disable) trong lúc hệ thống đang xử lý).
- **GUI Testing là lớp kiểm thử gần nhất với hành vi người dùng thật.** Nó không thay thế được Unit Testing (kiểm thử đơn vị mã nguồn) hay API Testing, nhưng là lớp kiểm thử bắt buộc phải có trước khi phát hành sản phẩm, vì đây là nơi phát hiện những lỗi mà các lớp kiểm thử thấp hơn không thể nhìn thấy (ví dụ: hai thành phần backend đều đúng riêng lẻ, nhưng khi ghép lại hiển thị sai trên giao diện).

---

## 3. Phạm vi kiểm thử GUI

GUI Testing bao phủ nhiều khía cạnh khác nhau của giao diện. Dưới đây là 10 nhóm tiêu chí chính, mỗi nhóm có một trọng tâm kiểm tra riêng biệt:

| Nhóm                             | Trọng tâm                                                            | Tiêu chí cụ thể cần kiểm tra                                                                                                                                                                                                                                                                                   |
| -------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎨 **Visual**                    | Hình thức hiển thị                                                   | Độ tương phản (contrast) đủ để đọc rõ; khoảng cách (spacing) nhất quán theo hệ lưới 4px/8px; hình ảnh không bị vỡ hoặc rỗ (pixelated); icon đồng bộ phong cách; không bị cắt chữ (text truncation) khi nội dung dài                                                                                            |
| ⚙️ **Functional**                | Chức năng hoạt động đúng                                             | Tính bất biến khi lặp thao tác (idempotency — ví dụ: double-click không được tạo ra 2 đơn hàng); nút bị vô hiệu hóa đúng lúc (disable khi đang loading); hành vi đúng khi mất kết nối mạng giữa chừng                                                                                                          |
| 🛡️ **Validation**                | Kiểm tra tính hợp lệ của dữ liệu nhập vào và thông báo lỗi tương ứng | Cần áp dụng các kỹ thuật thiết kế test chuyên biệt — xem [Mục 8](#8-thiết-kế-test-case--kỹ-thuật-chọn-dữ-liệu-test) — thay vì chỉ kiểm tra qua loa trường hợp "để trống"                                                                                                                                       |
| 🧑‍💻 **Usability**                 | Dễ hiểu, dễ thao tác, giảm khả năng nhầm lẫn                         | Khi không có người dùng thật tham gia, có thể đối chiếu bằng phương pháp Heuristic Evaluation (Mục 6); phân biệt rõ với Usability Testing có người dùng thật                                                                                                                                                   |
| 📐 **Responsive**                | Hiển thị ổn định trên nhiều kích thước màn hình                      | Kiểm tra tại các điểm ngắt (breakpoint) chuẩn (320/375/390px cho mobile, 768px cho tablet, 1024/1440px cho desktop); không bị tràn ngang (kiểm tra `scrollWidth > clientWidth`); vùng chạm (touch target) tối thiểu 44×44px theo Apple Human Interface Guidelines, hoặc 24×24px theo WCAG 2.2 (tiêu chí 2.5.8) |
| 🌐 **Compatibility**             | Hoạt động nhất quán trên nhiều trình duyệt, thiết bị, hệ điều hành   | Nên test theo ma trận rủi ro (risk-based) — ưu tiên trình duyệt có tỷ lệ người dùng cao nhất trước, thay vì dàn trải kiểm tra mọi tổ hợp có thể                                                                                                                                                                |
| ♿ **Accessibility**             | Khả năng tiếp cận cho người dùng khuyết tật                          | Cần đối chiếu với chuẩn tham chiếu WCAG 2.2 — xem [Mục 7](#7-accessibility-testing--chuẩn-wcag-22)                                                                                                                                                                                                             |
| 💬 **Feedback**                  | Phản hồi trạng thái hệ thống cho người dùng                          | Phân biệt skeleton loading (khung xương chờ tải) và spinner (biểu tượng xoay); thông báo lỗi phải có tính hành động (actionable — nói rõ cách khắc phục, không chỉ "Có lỗi xảy ra"); toast (thông báo nổi) tự ẩn sau bao lâu, có thể đóng thủ công hay không                                                   |
| 🌗 **Dark Mode / Theme**         | Hiển thị đúng ở cả giao diện sáng và tối                             | Độ tương phản vẫn đạt chuẩn ở cả hai theme; không còn "vùng trắng lóa" sót lại khi chuyển theme; icon/logo có biến thể (variant) phù hợp với nền tối                                                                                                                                                           |
| 🌍 **Localization (i18n) / RTL** | Hiển thị đúng khi đổi ngôn ngữ hoặc hướng chữ                        | Văn bản dịch không bị tràn khung khi ngôn ngữ đích dài hơn (ví dụ tiếng Đức thường dài hơn tiếng Anh khoảng 30%); bố cục đảo chiều đúng khi dùng ngôn ngữ viết từ phải sang trái — RTL (tiếng Ả Rập, tiếng Do Thái); định dạng ngày tháng/tiền tệ đúng theo từng vùng (locale)                                 |

---

## 4. Quy trình GUI Testing

Quy trình chuẩn gồm 7 bước: **Requirement → Component → State → Checklist → Execute → Bug Report → Re-test**.

1. **Requirement (Yêu cầu)**: Đọc yêu cầu nghiệp vụ (user story, acceptance criteria — tiêu chí chấp nhận) **và** thiết kế (Figma). Nếu chỉ đọc văn bản yêu cầu mà bỏ qua file thiết kế, sẽ dễ bỏ sót các chi tiết visual/spacing chỉ thể hiện rõ trên file thiết kế.
2. **Component (Thành phần)**: Liệt kê toàn bộ thành phần giao diện xuất hiện trên màn hình. Nên làm dưới dạng bảng kiểm kê (inventory) thay vì chỉ nhớ trong đầu, để tránh bỏ sót các thành phần dễ bị quên như tooltip (chú thích khi di chuột), badge số lượng trên icon giỏ hàng.
3. **State (Trạng thái)**: Với mỗi thành phần, liệt kê **toàn bộ trạng thái** có thể có (xem chi tiết ở Mục 5.3). Đây là bước hay bị bỏ qua nhất trong thực tế, dù là bước quan trọng nhất để tránh sót lỗi.
4. **Checklist (Danh sách kiểm tra)**: Kết hợp các cặp (thành phần, trạng thái) với yêu cầu nghiệp vụ để tạo thành các mục checklist có kết quả mong đợi (expected result) rõ ràng.
5. **Execute (Thực thi)**: Chạy checklist trong điều kiện môi trường đã xác định trước (trình duyệt, kích thước màn hình, tài khoản dùng để test).
6. **Bug Report (Báo cáo lỗi)**: Với mỗi mục Fail (thất bại), viết báo cáo lỗi có thể tái hiện được (reproducible).
7. **Re-test (Kiểm tra lại)**: Sau khi lập trình viên sửa lỗi, chạy lại đúng trường hợp đã fail; đồng thời cân nhắc thực hiện **regression test** (kiểm thử hồi quy) — kiểm tra các chức năng liên quan không bị ảnh hưởng tiêu cực bởi việc sửa lỗi.

**Lưu ý về tính lặp của quy trình**: Về bản chất, quy trình trên nên được hiểu là **lặp (iterative)** chứ không chỉ là một đường thẳng tuyến tính. Trong lúc Execute, tester thường phát hiện ra các trường hợp mới nằm ngoài checklist ban đầu — đây chính là lúc **Exploratory Testing** (kiểm thử khám phá, xem Mục 5.5) phát huy tác dụng. Một quy trình testing hiệu quả cần có vòng phản hồi ngược từ bước Execute quay lại bước Checklist (để bổ sung các mục mới phát hiện), thay vì chỉ đi theo một chiều.

---

## 5. GUI Checklist — Lý thuyết và kỹ thuật xây dựng

### 5.1 Định nghĩa

Theo ISTQB, **Checklist-based Testing** (Kiểm thử dựa trên danh sách kiểm tra) là một **kỹ thuật kiểm thử dựa trên kinh nghiệm** (_experience-based test technique_), trong đó tester có kinh nghiệm sử dụng một danh sách các mục cần lưu ý, kiểm tra, hoặc ghi nhớ — hoặc một tập hợp quy tắc/tiêu chí — để đối chiếu với sản phẩm cần kiểm thử. Kỹ thuật này đặc biệt hữu ích khi hệ thống phức tạp, khó kiểm thử, hoặc khi yêu cầu (requirement) không đầy đủ hay không rõ ràng.

Điểm mấu chốt trong định nghĩa: đây là kỹ thuật **dựa trên kinh nghiệm (experience-based)**, nghĩa là **chất lượng của checklist phụ thuộc trực tiếp vào kinh nghiệm của người viết ra nó**. Một checklist do người có kinh nghiệm dày dặn viết sẽ khác hẳn về chất lượng so với checklist do người mới viết — dù cấu trúc bảng biểu có thể giống nhau.

### 5.2 Bảy phương pháp xây dựng Checklist

| Phương pháp                                           | Nguồn tham chiếu                                          | Giải thích thêm                                                                                                                                                                          |
| ----------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requirement-based** (Dựa trên yêu cầu)              | User story, acceptance criteria                           | Mỗi tiêu chí chấp nhận (acceptance criterion) nên được ánh xạ (map) thành ít nhất một mục checklist — có thể dùng ma trận truy vết (traceability matrix) để chứng minh độ bao phủ đầy đủ |
| **Design-based** (Dựa trên thiết kế)                  | Figma, design system (hệ thống thiết kế)                  | Nên so khớp bằng công cụ (chế độ Figma Dev Mode, hoặc công cụ so sánh hình ảnh tự động), thay vì chỉ "nhìn bằng mắt"                                                                     |
| **Component-based** (Dựa trên thành phần)             | Danh sách thành phần (button, input...)                   | Nên lập một bảng kiểm kê thành phần (Component Inventory) riêng trước khi viết checklist                                                                                                 |
| **State-based** (Dựa trên trạng thái)                 | Loading, empty, error, success, disabled                  | Xem chi tiết ở Mục 5.3                                                                                                                                                                   |
| **Heuristic-based** (Dựa trên nguyên tắc kinh nghiệm) | 10 nguyên tắc Usability của Nielsen                       | Xem nội dung đầy đủ ở [Mục 6](#6-heuristic-evaluation--10-nguyên-tắc-usability-của-nielsen)                                                                                              |
| **Risk-based** (Dựa trên rủi ro)                      | Ưu tiên các luồng quan trọng: login, giỏ hàng, thanh toán | Nên định lượng mức độ rủi ro = (khả năng xảy ra lỗi) × (mức độ ảnh hưởng nếu lỗi xảy ra), thay vì chỉ liệt kê theo cảm tính                                                              |
| **Experience-based** (Dựa trên kinh nghiệm cá nhân)   | Lỗi cũ đã từng gặp, kinh nghiệm cá nhân của tester        | Nên duy trì một "sổ tay lỗi thường gặp" (known-issue checklist) để tái sử dụng qua nhiều dự án                                                                                           |

### 5.3 Trạng thái (State) của một thành phần GUI

Việc liệt kê đầy đủ trạng thái của từng thành phần là bước quan trọng nhất khi xây dựng checklist, vì phần lớn lỗi thực tế xuất hiện ở các trạng thái ít được để ý, không phải ở trạng thái mặc định.

**Với Button (nút bấm):** Default (mặc định), Hover (khi di chuột qua), Active (khi đang nhấn), Disabled (bị vô hiệu hóa), Loading (đang xử lý), Success/Error (sau khi xử lý xong), và **trạng thái pressed trên thiết bị cảm ứng** (phản hồi khi chạm), **trạng thái khi nhãn (label) quá dài** (chữ có tự động xuống dòng hay bị cắt bớt).

**Với Input (ô nhập liệu):** Empty (rỗng), Focus (đang được chọn để nhập), Valid/Invalid (hợp lệ/không hợp lệ), Disabled, Read-only (chỉ đọc), Required (bắt buộc), và **trạng thái autofill** (khi trình duyệt tự động điền — có làm vỡ giao diện không?), **trạng thái khi dán (paste) dữ liệu dài hoặc có ký tự đặc biệt**.

**Với màn hình (Screen):** Initial (ban đầu), Loading, Empty, Error, Success, No Permission (không có quyền truy cập), và hai trạng thái dễ bị bỏ sót nhất:

- **Partial data (dữ liệu một phần)**: hệ thống tải được một phần dữ liệu, phần còn lại bị lỗi — trường hợp này thường bị bỏ qua vì phần lớn tester chỉ kiểm tra toàn bộ Success hoặc toàn bộ Error.
- **Stale data (dữ liệu cũ)**: dữ liệu cũ vẫn đang hiển thị trong lúc hệ thống đang tải dữ liệu mới (ví dụ: giỏ hàng hiển thị số lượng cũ trong khi đang cập nhật số lượng mới).

**Với danh sách/bảng dữ liệu (List/Table):** 0 mục, 1 mục, nhiều mục vừa đủ một trang, nhiều mục tràn trang (cần phân trang — pagination), mục có dữ liệu bất thường (tên sản phẩm rất dài, giá bằng 0, giá âm nếu tồn tại lỗi cho phép).

> **Vì sao trạng thái "trung gian" hay bị bỏ sót?** Cả checklist do con người viết vội lẫn checklist do công cụ hỗ trợ tự động sinh ra đều có xu hướng liệt kê các trạng thái "sách vở" quen thuộc (loading/error/empty/success) mà bỏ qua các trạng thái **trung gian, không rõ ràng** như partial data hay stale data — trong khi đây lại chính là nơi phát sinh nhiều lỗi thực tế nhất, vì lập trình viên cũng thường quên xử lý các trường hợp này khi viết code.

### 5.4 Cấu trúc một mục Checklist

| Cột                    | Ý nghĩa                                           | Ví dụ                                                                                            |
| ---------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Checklist ID           | Mã định danh tiêu chí                             | FUN-01                                                                                           |
| Screen/Feature         | Màn hình hoặc chức năng đang kiểm tra             | Cart (Giỏ hàng)                                                                                  |
| Category               | Nhóm kiểm thử (xem Mục 3)                         | Functional                                                                                       |
| Checklist Item         | Nội dung cụ thể cần kiểm tra                      | Xóa một sản phẩm trong giỏ hàng                                                                  |
| Expected Result        | Kết quả mong đợi                                  | Chỉ sản phẩm được chọn bị xóa, các sản phẩm khác giữ nguyên                                      |
| Actual/Status/Evidence | Kết quả thực tế, trạng thái Pass/Fail, bằng chứng | Fail + ảnh chụp màn hình                                                                         |
| Priority               | Độ ưu tiên chạy checklist item (High/Medium/Low)  | Giúp biết nên chạy mục nào trước nếu thời gian hạn chế — khác với Priority của bug (xem Mục 9.2) |
| Notes                  | Ghi chú                                           | Lý do fail, hoặc điều kiện đặc biệt để tái hiện lỗi                                              |

### 5.5 Giới hạn của Checklist-based Testing

Một tài liệu lý thuyết nghiêm túc cần nêu rõ giới hạn của phương pháp, không chỉ ca ngợi lợi ích:

- **Ảo giác về độ bao phủ (coverage illusion)**: Có 40+ mục checklist Pass không đồng nghĩa hệ thống không còn lỗi. Checklist chỉ bao phủ những gì người viết **nghĩ ra được** — những lỗi nằm ngoài trí tưởng tượng của người viết sẽ không bao giờ được checklist phát hiện. Đây là lý do vì sao checklist-based testing **luôn cần đi kèm Exploratory Testing** (kiểm thử khám phá) để bù đắp.
- **Tính tĩnh (static) của checklist**: Một checklist viết một lần rồi để đó dễ trở nên lỗi thời khi giao diện thay đổi (thêm trường mới, đổi luồng thao tác) nhưng không ai cập nhật lại — dẫn đến "cảm giác an toàn giả" (false sense of security).
- **Checklist không thay thế được Test Case chi tiết** khi cần tái hiện chính xác một luồng phức tạp gồm nhiều bước — trường hợp này cần dùng Test Case đầy đủ (xem Mục 8).
- **Khi checklist được sinh tự động (ví dụ bằng công cụ AI)**: kết quả thường mang tính "công thức" (generic best-practice áp dụng chung cho mọi ứng dụng web), mà không thực sự hiểu ngữ cảnh nghiệp vụ cụ thể của hệ thống đang kiểm thử (ví dụ: khó tự nghĩ ra trường hợp "mã giảm giá có giá trị âm hơn cả giá trị đơn hàng" nếu không được cung cấp đúng quy tắc nghiệp vụ). Vì vậy, checklist do công cụ sinh ra chỉ nên đóng vai trò khung ban đầu, con người vẫn phải rà soát và bổ sung dựa trên kinh nghiệm thực tế và hiểu biết nghiệp vụ.

Về **Exploratory Testing (kiểm thử khám phá)**: đây không phải là việc "khám phá tự do, tùy hứng" mà nên được thực hiện có kiểm soát, thường theo mô hình **session-based** (kiểm thử theo phiên) — mỗi phiên có một "charter" (mục tiêu/phạm vi rõ ràng, ví dụ: "khám phá luồng thanh toán trong 30 phút, tập trung vào các trường hợp lỗi mạng") và giới hạn thời gian (time-box). Nếu không có charter và time-box, exploratory testing dễ biến thành lan man, không đo lường được kết quả hay tiến độ.

---

## 6. Heuristic Evaluation — 10 nguyên tắc Usability của Nielsen

**Heuristic Evaluation** (Đánh giá theo nguyên tắc kinh nghiệm) là một phương pháp kiểm tra usability không cần người dùng thật tham gia — thay vào đó, chuyên gia (hoặc tester) tự đối chiếu giao diện với một bộ nguyên tắc đã được đúc kết từ kinh nghiệm thực tế. Bộ nguyên tắc phổ biến nhất thế giới là **10 Usability Heuristics** do Jakob Nielsen và Rolf Molich đề xuất năm 1990, hoàn thiện năm 1994:

1. **Visibility of system status** (Hiển thị rõ trạng thái hệ thống) — Hệ thống luôn cho người dùng biết chuyện gì đang xảy ra (ví dụ: hiển thị spinner khi đang xử lý form).
2. **Match between system and the real world** (Phù hợp với thế giới thực) — Ngôn ngữ và biểu tượng dùng theo cách người dùng thật hiểu được, không dùng thuật ngữ kỹ thuật nội bộ.
3. **User control and freedom** (Người dùng có quyền kiểm soát và tự do) — Luôn có "lối thoát khẩn cấp" rõ ràng: chức năng Undo (hoàn tác), Cancel (hủy), nút Back hoạt động đúng.
4. **Consistency and standards** (Tính nhất quán và theo chuẩn) — Không bắt người dùng phải đoán; các từ ngữ, hành động, tình huống giống nhau phải được thể hiện nhất quán trong toàn hệ thống.
5. **Error prevention** (Ngăn ngừa lỗi trước khi xảy ra) — Thiết kế ngăn lỗi xảy ra ngay từ đầu (ví dụ: vô hiệu hóa nút Submit khi form chưa hợp lệ) thay vì để lỗi xảy ra rồi mới báo.
6. **Recognition rather than recall** (Nhận diện tốt hơn ghi nhớ) — Giảm gánh nặng ghi nhớ của người dùng bằng cách hiển thị lựa chọn có sẵn, thay vì bắt họ phải nhớ và gõ lại thông tin.
7. **Flexibility and efficiency of use** (Linh hoạt và hiệu quả khi sử dụng) — Có phím tắt/tùy chỉnh cho người dùng thành thạo (power user), nhưng vẫn dễ dùng cho người mới.
8. **Aesthetic and minimalist design** (Thiết kế tối giản và thẩm mỹ) — Giao diện không chứa thông tin thừa, không liên quan hoặc hiếm khi cần đến.
9. **Help users recognize, diagnose, and recover from errors** (Giúp người dùng nhận biết, chẩn đoán và khắc phục lỗi) — Thông báo lỗi bằng ngôn ngữ dễ hiểu (không phải mã lỗi kỹ thuật), chỉ rõ vấn đề và gợi ý cách khắc phục.
10. **Help and documentation** (Trợ giúp và tài liệu hướng dẫn) — Dù thiết kế đã tốt, hệ thống vẫn nên có tài liệu hỗ trợ, dễ tìm kiếm và tập trung vào đúng tác vụ người dùng đang thực hiện.

**Cách áp dụng vào GUI Checklist**: Với mỗi màn hình, đối chiếu lần lượt 10 nguyên tắc trên như 10 câu hỏi kiểm tra nhanh — mỗi nguyên tắc nên sinh ra ít nhất một mục checklist thuộc nhóm Usability hoặc Feedback. Đây là cách hệ thống hóa phương pháp "heuristic-based checklist" đã nêu ở Mục 5.2.

---

## 7. Accessibility Testing — Chuẩn WCAG 2.2

**Accessibility Testing** (Kiểm thử khả năng tiếp cận) là việc kiểm tra xem người dùng khuyết tật (khiếm thị, khiếm thính, hạn chế vận động, khó khăn về nhận thức...) có thể sử dụng được sản phẩm hay không. Chuẩn quốc tế phổ biến nhất hiện nay là **WCAG (Web Content Accessibility Guidelines) phiên bản 2.2** do W3C công bố chính thức vào tháng 10/2023 — hiện là chuẩn được các cuộc kiểm toán khả năng tiếp cận tham chiếu phổ biến nhất, và cũng đã được công nhận là tiêu chuẩn ISO/IEC 40500. WCAG 2.2 tổ chức các tiêu chí theo 4 nguyên tắc, viết tắt là **POUR**:

| Nguyên tắc                      | Ý nghĩa                                                                                     | Tiêu chí kiểm thử cụ thể (mức AA — mức phổ biến nhất trong thực hành và pháp lý)                                                                                                                                                                                                                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P**erceivable (Cảm nhận được) | Nội dung phải được truyền tải theo cách mà người dùng có thể cảm nhận được                  | Độ tương phản màu chữ/nền (contrast) ≥ 4.5:1 với văn bản thường, ≥ 3:1 với văn bản lớn; ảnh phải có văn bản thay thế (`alt text`); nội dung phải hiển thị lại được (reflow) ở độ rộng 320px mà không cần cuộn ngang                                                                                                                                                                                        |
| **O**perable (Vận hành được)    | Giao diện phải điều khiển được bằng nhiều cách khác nhau                                    | Toàn bộ chức năng phải dùng được chỉ bằng bàn phím, không có "bẫy bàn phím" (keyboard trap — nơi người dùng bị kẹt không thoát ra được); phần tử đang được focus (chọn bằng bàn phím) không được bị nội dung khác che khuất hoàn toàn (tiêu chí 2.4.11 Focus Not Obscured, mức AA); vùng chạm (target size) tối thiểu 24×24 pixel CSS, trừ một số trường hợp ngoại lệ (tiêu chí 2.5.8 Target Size, mức AA) |
| **U**nderstandable (Hiểu được)  | Nội dung và cách vận hành phải dễ hiểu, dự đoán được                                        | Nhãn (label) phải gắn đúng với ô nhập liệu tương ứng (dùng thuộc tính `<label for>` hoặc `aria-label`); thông báo lỗi phải mô tả rõ ràng và gắn đúng với trường bị lỗi; hành vi hệ thống phải nhất quán qua các trang                                                                                                                                                                                      |
| **R**obust (Bền vững)           | Nội dung phải tương thích tốt với công cụ hỗ trợ (screen reader — trình đọc màn hình, v.v.) | Các thẻ tiêu đề (heading) phải đúng thứ tự (h1 → h2 → h3, không nhảy cấp); dùng đúng các thẻ HTML5 mang tính định vị (landmark) như `<nav>`, `<main>`; thuộc tính ARIA (Accessible Rich Internet Applications) được dùng đúng ngữ nghĩa, không lạm dụng                                                                                                                                                    |

**Lưu ý về chỉ số tương phản của focus indicator**: yêu cầu độ tương phản ≥ 3:1 giữa trạng thái đang được focus và không được focus thuộc tiêu chí **2.4.13 Focus Appearance**, hiện ở **mức AAA** (mức cao nhất, không bắt buộc với mức tuân thủ AA phổ biến) — nên phân biệt với tiêu chí 2.4.11 Focus Not Obscured (mức AA) chỉ yêu cầu phần tử được focus không bị che khuất hoàn toàn.

**Công cụ hỗ trợ kiểm thử tự động**: axe DevTools, Lighthouse (tích hợp sẵn trong Chrome DevTools), WAVE. Các công cụ này chỉ phát hiện được khoảng **30–57%** lỗi accessibility (chủ yếu là lỗi cấu trúc/markup có thể quét tự động); phần còn lại — đặc biệt là trải nghiệm điều hướng thực tế bằng bàn phím và trải nghiệm với screen reader — **bắt buộc phải kiểm tra thủ công**, thường bằng cách dùng thử ít nhất một luồng chính với công cụ đọc màn hình thật (VoiceOver trên macOS/iOS, NVDA trên Windows).

Cần lưu ý rằng accessibility là một lĩnh vực có **chuẩn pháp lý riêng** ở nhiều quốc gia (ví dụ: đạo luật ADA tại Mỹ, đạo luật EAA tại châu Âu), và đòi hỏi kiến thức chuyên sâu hơn nhiều so với việc chỉ kiểm tra "bấm phím Tab xem có hiển thị focus hay không". Một checklist accessibility chỉ vài mục là chưa đủ để coi là đã kiểm thử accessibility một cách nghiêm túc và toàn diện.

---

## 8. Thiết kế Test Case & Kỹ thuật chọn dữ liệu test

### 8.1 Cấu trúc Test Case

Một Test Case (trường hợp kiểm thử) đầy đủ nên có các thành phần: Test Case ID, Title (tiêu đề), Preconditions (điều kiện tiên quyết), Steps (các bước thực hiện), Test Data (dữ liệu test), Expected Result (kết quả mong đợi), Actual Result (kết quả thực tế), Status (trạng thái Pass/Fail), Evidence (bằng chứng — ảnh chụp màn hình/video), Notes (ghi chú).

Việc chọn đúng dữ liệu test (Test Data) là yếu tố quyết định chất lượng của một Test Case, đặc biệt với nhóm kiểm thử Validation. Dưới đây là các kỹ thuật thiết kế test chuyên biệt cần áp dụng:

### 8.2 Equivalence Partitioning — Phân vùng tương đương

Kỹ thuật chia dữ liệu đầu vào thành các **nhóm (partition)** mà trong cùng một nhóm, hệ thống được dự kiến sẽ xử lý giống nhau. Nhờ đó, chỉ cần kiểm thử một giá trị đại diện cho mỗi nhóm, thay vì phải kiểm thử toàn bộ giá trị có thể có — giúp giảm đáng kể số lượng test case mà vẫn giữ được độ bao phủ hợp lý.

_Ví dụ_: Trường "Số lượng sản phẩm" cho phép nhập giá trị từ 1 đến 99.

- Phân vùng hợp lệ: 1–99 → giá trị đại diện để test: 50
- Phân vùng không hợp lệ (quá nhỏ): ≤ 0 → giá trị đại diện: 0, -1
- Phân vùng không hợp lệ (quá lớn): ≥ 100 → giá trị đại diện: 100

### 8.3 Boundary Value Analysis — Phân tích giá trị biên

Lỗi phần mềm thường xảy ra ở **ranh giới (boundary)** giữa các phân vùng, chứ không phải ở giá trị nằm giữa phân vùng. Với trường hợp cho phép nhập 1–99, nên kiểm tra cụ thể tại các giá trị 0, 1, 2 (biên dưới) và 98, 99, 100 (biên trên) — thay vì chỉ kiểm tra một giá trị "chung chung ở giữa".

### 8.4 Error Guessing — Đoán lỗi dựa trên kinh nghiệm

Dựa trên kinh nghiệm về các lỗi thường gặp để chủ động thiết kế test, gồm các trường hợp: chuỗi rỗng nhưng chỉ chứa khoảng trắng (`"   "`), ký tự đặc biệt hoặc emoji, chuỗi rất dài (kiểm tra giới hạn độ dài tối đa mà cơ sở dữ liệu cho phép), một số ký tự tấn công SQL injection cơ bản (`' OR 1=1--`), thao tác gửi trùng lặp (double-submit — double click vào nút Submit), hoặc thao tác nhanh bất thường (spam click liên tục).

### 8.5 Decision Table — Bảng quyết định

Kỹ thuật này được dùng khi có **nhiều điều kiện kết hợp** dẫn đến các kết quả khác nhau. Ví dụ: việc áp dụng mã giảm giá (coupon) phụ thuộc vào 3 điều kiện boolean độc lập — đơn hàng có đủ giá trị tối thiểu hay không? mã giảm giá còn hạn sử dụng hay không? mã giảm giá đã được dùng trước đó hay chưa? — với 3 điều kiện độc lập, sẽ có tổng cộng 2³ = 8 trường hợp kết hợp cần được kiểm thử đầy đủ.

> Việc chỉ kiểm tra một vài trường hợp đơn giản (ví dụ: chỉ để trống một trường rồi kiểm tra thông báo lỗi) là chưa đủ cho một checklist Validation nghiêm túc — cần áp dụng đầy đủ 4 kỹ thuật trên để đảm bảo độ bao phủ, vì nhóm Validation thường là nhóm **dễ phát hiện lỗi nhất** nếu áp dụng đúng kỹ thuật thiết kế test.

---

## 9. Bug/Defect Report

### 9.1 Cấu trúc báo cáo lỗi

Một báo cáo lỗi (Bug/Defect Report) đầy đủ cần có: Bug ID & Title (mã và tiêu đề lỗi), Environment (môi trường xảy ra lỗi), Preconditions (điều kiện tiên quyết), Steps to Reproduce (các bước tái hiện lỗi), Expected vs Actual (kết quả mong đợi so với thực tế), Severity & Priority (mức độ nghiêm trọng và độ ưu tiên), Screenshot/Video (bằng chứng hình ảnh/video).

### 9.2 Severity và Priority — hai khái niệm dễ nhầm lẫn nhất

Đây là cặp khái niệm hay bị nhầm lẫn nhất đối với người mới học kiểm thử phần mềm:

|                 | **Severity (Mức độ nghiêm trọng)**                                                      | **Priority (Độ ưu tiên)**                                                                                     |
| --------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Trả lời câu hỏi | Lỗi này ảnh hưởng đến **chức năng** nghiêm trọng đến mức nào?                           | Lỗi này cần được sửa **nhanh** đến mức nào?                                                                   |
| Ai quyết định   | Thường do Tester/QA đánh giá (dựa trên tác động kỹ thuật thực tế)                       | Thường do Product Manager/nhóm quản lý sản phẩm quyết định (dựa trên giá trị kinh doanh, thời điểm phát hành) |
| Tính khách quan | Tương đối khách quan — dựa trên mức độ hỏng hóc thực tế của hệ thống                    | Mang tính chủ quan hơn — phụ thuộc bối cảnh kinh doanh, có thể thay đổi theo thời gian                        |
| Ví dụ 1         | Toàn bộ trang Checkout bị crash khi bấm nút Pay → **Severity: Critical**                | Đang trong mùa sale lớn → **Priority: Highest**, cần sửa ngay lập tức                                         |
| Ví dụ 2         | Logo công ty bị lệch 2px trên trang chủ → **Severity: Low** (không ảnh hưởng chức năng) | Nhưng đang có chiến dịch truyền thông lớn → **Priority: High** (ảnh hưởng đến hình ảnh thương hiệu)           |

**Điểm mấu chốt cần nhớ**: Severity cao **không đồng nghĩa** với Priority cao, và ngược lại. Một lỗi có Severity thấp (ví dụ: lỗi chính tả trên trang thanh toán) vẫn có thể được gán Priority cao nếu nó ảnh hưởng đến uy tín thương hiệu tại một thời điểm nhạy cảm.

### 9.3 Thang đo Severity phổ biến

- **Critical/Blocker**: Hệ thống bị crash, không thể tiếp tục sử dụng, mất dữ liệu, hoặc chặn hoàn toàn luồng thao tác chính (ví dụ: không thể hoàn tất checkout).
- **Major/High**: Một chức năng chính không hoạt động đúng nhưng vẫn có cách vòng qua (workaround), hoặc không chặn hoàn toàn luồng chính.
- **Minor/Medium**: Lỗi ảnh hưởng nhỏ đến trải nghiệm, hoặc nằm ở chức năng phụ.
- **Trivial/Low**: Lỗi thẩm mỹ, lỗi chính tả, không ảnh hưởng đến chức năng.

### 9.4 Nguyên tắc viết bug report tốt

- Tiêu đề nên theo công thức: **[Thành phần] + [Hành động] + [Kết quả sai] + [Điều kiện]** — ví dụ: "Cart: Xóa sản phẩm cuối cùng khiến toàn bộ giỏ hàng biến mất (khi có ≥2 sản phẩm cùng loại)".
- Các bước tái hiện lỗi (Steps to Reproduce) phải được viết dưới dạng **danh sách đánh số**, không viết văn xuôi — người khác đọc và làm theo y hệt phải tái hiện được lỗi.
- Environment phải ghi đầy đủ: trình duyệt + phiên bản, hệ điều hành, kích thước màn hình/thiết bị, tài khoản test đã dùng.
- Nguyên tắc **1 bug report = 1 lỗi** — không gộp nhiều lỗi không liên quan vào cùng một báo cáo, vì sẽ khó theo dõi trạng thái sửa lỗi riêng lẻ.

---

## 10. Responsive, Compatibility, Accessibility Testing

|                       | Responsive Testing                                                                                                                                                        | Compatibility Testing                                                                                                                                                                                                                         | Accessibility Testing                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Nội dung cốt lõi**  | Kiểm tra tại các kích thước màn hình phổ biến (1440×900, 768×1024, 390×844...), không bị tràn ngang, menu không bị che khuất                                              | Kiểm tra trên nhiều trình duyệt (Chrome, Edge, Firefox), font chữ/bố cục nhất quán, luồng chính hoạt động đúng                                                                                                                                | Kiểm tra Tab, Focus, Label, phím Enter/Space, thông báo lỗi rõ ràng                                                           |
| **Mở rộng cần lưu ý** | Kiểm tra cả hướng màn hình (orientation — dọc/ngang) trên mobile/tablet; kiểm tra khi phóng to trình duyệt lên 200% (theo tiêu chí WCAG 1.4.4); kiểm tra vùng chạm đủ lớn | Nên định nghĩa **ma trận hỗ trợ (support matrix)** rõ ràng trước khi test (ví dụ: "hỗ trợ 2 phiên bản gần nhất của Chrome/Firefox/Safari") thay vì test tùy hứng; kiểm tra cả các phương thức nhập liệu khác nhau (chuột/cảm ứng/bút cảm ứng) | Nên kiểm tra bằng **screen reader thật** (VoiceOver/NVDA) với ít nhất một luồng chính, không chỉ dựa vào công cụ quét tự động |

---

## 11. Automation trong GUI Testing

### 11.1 Nguyên lý cơ bản

**Test Automation** (Kiểm thử tự động) mô phỏng hành vi người dùng bằng mã lệnh: mở trình duyệt, truy cập trang, nhập liệu, click, kiểm tra URL/nội dung văn bản, chụp ảnh màn hình, xuất báo cáo. Một trong những công cụ phổ biến hiện nay là **Playwright** — dễ cài đặt, hỗ trợ đa engine trình duyệt (Chromium, Firefox, WebKit), có cơ chế auto-wait (tự động chờ phần tử sẵn sàng) tốt, hỗ trợ chụp ảnh màn hình/video/trace để gỡ lỗi.

### 11.2 Test Automation Pyramid — Mô hình kim tự tháp kiểm thử tự động

Đây là mô hình chiến lược automation quan trọng bậc nhất, do **Mike Cohn** đề xuất năm 2009:

```
        /\
       /UI\        <- ít nhất: chậm, dễ vỡ (flaky), chi phí bảo trì cao
      /----\
     / API  \       <- vừa phải: nhanh hơn, ổn định hơn UI test
    /--------\
   /   Unit   \     <- nhiều nhất: rất nhanh, rất ổn định, chi phí bảo trì thấp
  /------------\
```

Nguyên tắc cốt lõi: **tỷ lệ đầu tư automation nên giảm dần khi đi lên tầng trên**, vì test ở tầng GUI (tầng UI, trên cùng) có 3 nhược điểm cố hữu:

1. **Brittle (dễ vỡ)**: Chỉ cần đổi 1 class CSS hoặc đổi vị trí 1 phần tử, test có thể bị fail dù chức năng thực tế vẫn đúng.
2. **Chậm**: Mỗi test phải khởi động cả trình duyệt, render giao diện, chờ hiệu ứng chuyển động (animation) — chậm hơn hàng trăm lần so với unit test (kiểm thử đơn vị).
3. **Flaky (không ổn định)**: Cùng một đoạn code, cùng môi trường, nhưng test có lúc pass lúc fail do vấn đề thời gian (timing), mạng, hoặc điều kiện tranh chấp (race condition) — hiện tượng này làm giảm niềm tin vào bộ test, khiến đội ngũ có xu hướng bỏ qua hoặc chạy lại (re-run) mà không điều tra kỹ nguyên nhân.

Ngược lại với mô hình kim tự tháp, có một **anti-pattern** (mẫu hình phản tác dụng) thường gặp trong thực tế gọi là **"Ice-Cream Cone"** (do Alister Scott mô tả năm 2012) — chỉ tình trạng có quá nhiều test ở tầng UI nhưng quá ít ở tầng Unit. Đây là dấu hiệu cho thấy chiến lược automation của một đội ngũ đang đi sai hướng, cho dù công cụ sử dụng (Playwright, Selenium...) có tốt đến đâu.

### 11.3 Khi nào nên và không nên automation GUI Testing

**Nên automation khi:**

- Luồng thao tác **ổn định**, ít thay đổi giao diện (ví dụ: đăng nhập, checkout cơ bản).
- Cần chạy **lặp lại nhiều lần** (kiểm thử hồi quy — regression test — sau mỗi lần triển khai/deploy).
- Kết quả test case **rõ ràng, xác định được** (deterministic) — không phụ thuộc vào đánh giá chủ quan.

**Không nên automation khi:**

- Việc đánh giá mang tính **chủ quan/thẩm mỹ** (ví dụ: "màu sắc có hài hòa không") — nên dùng Visual Regression Testing (xem Mục 11.4) hoặc rà soát thủ công thay vì cố gắng assert (kiểm tra) bằng code.
- Giao diện **đang thay đổi liên tục** (giai đoạn đầu phát triển sản phẩm) — automation lúc này sẽ tốn công bảo trì hơn giá trị mang lại.
- Test case chỉ chạy **một lần duy nhất** (kiểm thử khám phá dùng một lần) — không đáng công viết script tự động.

### 11.4 Visual Regression Testing — Kiểm thử hồi quy hình ảnh

Việc kiểm tra Visual (hình thức hiển thị) không thể assert bằng vài dòng code logic thông thường, vì "đẹp hay không" khó biểu diễn bằng giá trị đúng/sai (boolean). **Visual Regression Testing** giải quyết bài toán này bằng cách: chụp ảnh màn hình ở lần chạy đầu tiên (gọi là **baseline** — coi là "đúng"), sau đó mỗi lần chạy lại sẽ so sánh (diff) từng pixel, hoặc dùng AI để phân biệt vùng thay đổi có ý nghĩa với vùng nhiễu không đáng kể (ví dụ: khác biệt nhỏ trong cách render font, khử răng cưa — anti-aliasing — giữa các lần chạy). Công cụ phổ biến gồm: **Percy** (của BrowserStack), **Applitools Eyes**, và tính năng có sẵn `toHaveScreenshot()` trong **Playwright**. Đây là cách hiệu quả nhất để tự động hóa việc kiểm thử nhóm Visual Testing.

### 11.5 Vai trò của AI trong Automation hiện đại

- **Self-healing locators** (bộ định vị phần tử tự phục hồi): một số công cụ hiện đại dùng AI để tự động "đoán lại" vị trí phần tử khi cấu trúc trang (DOM) thay đổi nhẹ, giúp giảm tỷ lệ flaky do đổi selector (bộ chọn phần tử).
- **AI sinh test case/checklist từ yêu cầu**: giúp tăng tốc bước khởi tạo, nhưng vẫn cần con người rà soát vì AI dễ bỏ sót ngữ cảnh nghiệp vụ cụ thể (xem thêm Mục 5.5).
- **AI hỗ trợ so sánh hình ảnh thông minh (AI visual diffing)**: phân biệt được "thay đổi có ý nghĩa" (ví dụ: một nút biến mất) với "nhiễu không đáng kể" (ví dụ: khử răng cưa), giúp giảm số lượng cảnh báo sai (false positive) so với việc so sánh từng pixel một cách máy móc.

**Lưu ý về chi phí dài hạn**: Automation cần được nhìn nhận với chi phí bảo trì dài hạn — đây là rủi ro lớn nhất của automation ở tầng GUI trong thực tế. Nhiều dự án automation hóa GUI ồ ạt ngay từ đầu, nhưng sau vài tháng bộ test trở thành gánh nặng (chạy chậm, không ổn định, không ai dám sửa vì sợ vỡ thêm) và cuối cùng bị bỏ xó. Một chiến lược automation tốt cần cân nhắc **ROI (return on investment — tỷ suất lợi ích trên chi phí đầu tư)** của từng test, thay vì áp dụng nguyên tắc "cái gì automation được thì automation hết".

---

## 12. Test Result & Test Summary Report

Một báo cáo kết quả kiểm thử (Test Result) thường ở dạng bảng thống kê: Total (tổng số), Pass, Fail, Blocked (bị chặn không chạy được), Not Run (chưa chạy), Pass Rate (tỷ lệ pass). Một Test Summary Report (báo cáo tổng hợp kiểm thử) cần nêu rõ phạm vi đã test, kết quả tổng quan, danh sách lỗi nghiêm trọng còn tồn đọng, và khuyến nghị có nên phát hành sản phẩm hay không.

Một số điểm cần lưu ý để báo cáo có giá trị thực tiễn cao hơn:

- Nên phân tích Pass Rate **theo từng nhóm** (ví dụ: Pass Rate của nhóm Accessibility thấp hơn hẳn so với nhóm Visual) thay vì chỉ đưa ra một con số tổng — giúp việc ra quyết định phát hành có trọng tâm hơn.
- **Defect Density (mật độ lỗi)** = số lỗi phát hiện / số mục checklist (hoặc / số màn hình) — một chỉ số hữu ích để so sánh "độ nóng" (mức độ rủi ro) giữa các module khác nhau trong hệ thống.
- Nên có **Traceability Matrix (ma trận truy vết)** tối thiểu, ánh xạ mỗi mục checklist với mã yêu cầu (requirement/FR code) tương ứng — để chứng minh được việc kiểm thử đã bao phủ đúng yêu cầu đề ra, chứ không chỉ bao phủ những gì tester tự nghĩ ra.

---

## 13. Tổng kết & Nguyên tắc cốt lõi

> **GUI Testing hiệu quả = Checklist có cơ sở rõ ràng (dựa trên yêu cầu + thiết kế + nguyên tắc heuristic) + kỹ thuật thiết kế test đúng (Boundary Value Analysis/Equivalence Partitioning/Error Guessing) + Exploratory Testing bù đắp phần checklist bỏ sót + bằng chứng (evidence) đầy đủ + Automation đúng chỗ (ROI cao, luồng ổn định) + con người luôn là lớp kiểm soát cuối cùng đối với mọi kết quả, kể cả kết quả do công cụ AI hỗ trợ tạo ra.**

Bốn trụ cột chính của một chiến lược GUI Testing toàn diện là: **Manual Testing (kiểm thử thủ công) — Checklist-based Testing (kiểm thử theo danh sách kiểm tra) — Exploratory Testing (kiểm thử khám phá) — Automation (kiểm thử tự động)**. Exploratory Testing chính là trụ cột không thể thiếu, vì đây là cơ chế duy nhất bù đắp được giới hạn "ảo giác về độ bao phủ" vốn có của checklist đã phân tích ở Mục 5.5.

---

## 14. Bảng thuật ngữ (Glossary)

| Thuật ngữ tiếng Anh                          | Nghĩa tiếng Việt                         | Giải thích ngắn gọn                                                                                                                           |
| -------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| GUI (Graphical User Interface)               | Giao diện đồ họa người dùng              | Toàn bộ các thành phần hình ảnh mà người dùng nhìn thấy và tương tác trực tiếp (nút, form, menu...)                                           |
| Acceptance Criteria                          | Tiêu chí chấp nhận                       | Điều kiện cụ thể để xác định một yêu cầu/tính năng được coi là hoàn thành đúng                                                                |
| Regression Testing                           | Kiểm thử hồi quy                         | Kiểm tra lại các chức năng đã hoạt động đúng trước đó, để đảm bảo chúng không bị ảnh hưởng bởi thay đổi mới                                   |
| Exploratory Testing                          | Kiểm thử khám phá                        | Kỹ thuật kiểm thử vừa thiết kế vừa thực thi test song song, dựa trên sự khám phá tự do có kiểm soát, không theo kịch bản viết sẵn             |
| Session-based Testing                        | Kiểm thử theo phiên                      | Hình thức tổ chức Exploratory Testing thành các phiên có mục tiêu (charter) và giới hạn thời gian (time-box) rõ ràng                          |
| Charter                                      | Mục tiêu phiên kiểm thử                  | Bản mô tả ngắn gọn phạm vi và mục tiêu của một phiên Exploratory Testing                                                                      |
| Idempotency                                  | Tính bất biến khi lặp thao tác           | Thực hiện cùng một thao tác nhiều lần cho ra cùng một kết quả, không gây tác dụng phụ tích lũy (ví dụ: bấm Submit 2 lần không tạo 2 đơn hàng) |
| Breakpoint                                   | Điểm ngắt (kích thước màn hình)          | Ngưỡng độ rộng màn hình mà tại đó bố cục giao diện thay đổi để thích ứng (responsive)                                                         |
| Touch Target                                 | Vùng chạm                                | Khu vực có thể chạm/click để kích hoạt một phần tử giao diện trên thiết bị cảm ứng                                                            |
| Risk-based Testing                           | Kiểm thử dựa trên rủi ro                 | Ưu tiên kiểm thử các phần có khả năng xảy ra lỗi cao và/hoặc mức độ ảnh hưởng lớn nếu lỗi xảy ra                                              |
| Traceability Matrix                          | Ma trận truy vết                         | Bảng ánh xạ giữa các mục kiểm thử và yêu cầu nghiệp vụ tương ứng, dùng để chứng minh độ bao phủ                                               |
| Defect Density                               | Mật độ lỗi                               | Số lỗi phát hiện được tính trên một đơn vị đo (số mục checklist, số dòng code, số màn hình...)                                                |
| Severity                                     | Mức độ nghiêm trọng                      | Mức độ ảnh hưởng của lỗi đến chức năng/hệ thống, do tester đánh giá                                                                           |
| Priority                                     | Độ ưu tiên                               | Mức độ khẩn cấp cần sửa lỗi, do đội ngũ sản phẩm quyết định dựa trên giá trị kinh doanh                                                       |
| Reproducible                                 | Có thể tái hiện                          | Lỗi có thể được tạo lại một cách nhất quán theo đúng các bước đã mô tả                                                                        |
| WCAG (Web Content Accessibility Guidelines)  | Hướng dẫn khả năng tiếp cận nội dung web | Bộ tiêu chuẩn quốc tế do W3C ban hành, quy định các yêu cầu để nội dung web tiếp cận được với người khuyết tật                                |
| POUR                                         | Bốn nguyên tắc của WCAG                  | Viết tắt của Perceivable (Cảm nhận được), Operable (Vận hành được), Understandable (Hiểu được), Robust (Bền vững)                             |
| Screen Reader                                | Trình đọc màn hình                       | Phần mềm hỗ trợ đọc nội dung trên màn hình thành giọng nói/chữ nổi cho người khiếm thị (ví dụ: NVDA, VoiceOver)                               |
| ARIA (Accessible Rich Internet Applications) | Thuộc tính hỗ trợ tiếp cận               | Tập hợp thuộc tính HTML bổ sung ngữ nghĩa cho công cụ hỗ trợ (như screen reader) hiểu đúng vai trò của phần tử giao diện                      |
| Test Automation Pyramid                      | Kim tự tháp kiểm thử tự động             | Mô hình khuyến nghị phân bổ số lượng test tự động theo tầng: nhiều nhất ở Unit, ít nhất ở UI/GUI                                              |
| Flaky Test                                   | Test không ổn định                       | Test có kết quả không nhất quán (lúc pass lúc fail) dù không có thay đổi về code hoặc môi trường                                              |
| Ice-Cream Cone (Anti-pattern)                | Mẫu hình phản tác dụng "cây kem"         | Tình trạng có quá nhiều automation test ở tầng UI, quá ít ở tầng Unit — ngược lại với mô hình kim tự tháp lý tưởng                            |
| Visual Regression Testing                    | Kiểm thử hồi quy hình ảnh                | Kỹ thuật so sánh ảnh chụp màn hình hiện tại với ảnh baseline để phát hiện thay đổi ngoài ý muốn về hình ảnh                                   |
| Baseline                                     | Ảnh/kết quả chuẩn                        | Ảnh chụp màn hình hoặc kết quả được lưu lại ở lần chạy đầu tiên, dùng làm chuẩn để so sánh cho các lần sau                                    |
| Equivalence Partitioning                     | Phân vùng tương đương                    | Kỹ thuật chia dữ liệu đầu vào thành các nhóm mà hệ thống xử lý giống nhau trong cùng một nhóm                                                 |
| Boundary Value Analysis                      | Phân tích giá trị biên                   | Kỹ thuật tập trung kiểm thử tại các giá trị ranh giới giữa các phân vùng dữ liệu                                                              |
| Error Guessing                               | Đoán lỗi                                 | Kỹ thuật thiết kế test dựa trên kinh nghiệm về các lỗi thường gặp trong thực tế                                                               |
| Decision Table                               | Bảng quyết định                          | Kỹ thuật liệt kê đầy đủ các tổ hợp điều kiện và kết quả tương ứng, dùng khi có nhiều điều kiện kết hợp                                        |
| Coverage Illusion                            | Ảo giác về độ bao phủ                    | Cảm giác sai lầm rằng hệ thống đã được kiểm thử đầy đủ chỉ vì số lượng lớn checklist item đã Pass                                             |

---

## 15. Tài liệu tham khảo

- ISTQB Glossary — mục _GUI Testing_, _Checklist-Based Testing_: <https://glossary.istqb.org/>
- ISTQB Foundation Level Syllabus (bản mới nhất)
- Nielsen Norman Group — _10 Usability Heuristics for User Interface Design_: <https://www.nngroup.com/articles/ten-usability-heuristics/>
- W3C — _Web Content Accessibility Guidelines (WCAG) 2.2_: <https://www.w3.org/TR/WCAG22/>
- Mike Cohn — _Succeeding with Agile: Software Development Using Scrum_ (nguồn gốc mô hình Test Automation Pyramid, 2009)
- Alister Scott — mô hình _Ice-Cream Cone Anti-Pattern_ (2012)
- Martin Fowler — bài viết về _Test Pyramid_ và tính brittle (dễ vỡ) của UI test
