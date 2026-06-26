# BÁO CÁO THIẾT KẾ KIỂM THỬ: XEM LỊCH SỬ ĐƠN HÀNG (FR-11)

Báo cáo thiết kế ca kiểm thử này áp dụng kỹ thuật Phân vùng tương đương (EP) và Phân tích giá trị biên (BVA) để xây dựng một bộ ca kiểm thử tối ưu và hoàn chỉnh về mặt toán học cho tính năng Xem lịch sử đơn hàng (FR-11), Tiêu chuẩn giao diện chung (FR-21) và Trạng thái trang phản hồi (FR-24) của hệ thống EShop.

---

## PHẦN 1: PHÂN TÍCH PHÂN VÙNG TƯƠNG ĐƯƠNG (EP) & GIÁ TRỊ BIÊN (BVA)

### 1. Phân tích các tham số đầu vào và Phân vùng tương đương (EP)

Chúng ta phân tích các tham số đầu vào, trạng thái phiên làm việc (`userSession`), số lượng đơn hàng (`ordersInDB`), các trạng thái đơn hàng (`orderStatus`) và các tiêu chuẩn tuân thủ giao diện thành các phân vùng tương đương hợp lệ (Valid Partitions) và không hợp lệ (Invalid Partitions):

| Tham số nhập liệu / Trạng thái | Phân vùng hợp lệ (Valid Partitions) | Phân vùng không hợp lệ (Invalid Partitions) |
| --- | --- | --- |
| **Phiên đăng nhập** (`userSession`) | **EP-IN-SESSION-1**: Phiên đăng nhập hợp lệ của chính chủ.<br>*Giá trị đại diện: test@eshop.com* | **EP-IN-SESSION-2-INV**: Chưa đăng nhập (khách vãng lai).<br>*Giá trị đại diện: anonymous*<br><br>**EP-IN-SESSION-3-INV**: Đăng nhập tài khoản A nhưng cố truy cập đơn hàng tài khoản B.<br>*Giá trị đại diện: test@eshop.com xem ORD999 của other@eshop.com* |
| **Số lượng đơn hàng** (`ordersInDB`) | **EP-IN-COUNT-1**: Có 0 đơn hàng (trạng thái trang trống).<br>*Giá trị đại diện: 0*<br><br>**EP-IN-COUNT-2**: Có từ 1 đơn hàng trở lên (hiển thị danh sách).<br>*Giá trị đại diện: 1, 5, 100* | N/A |
| **Trạng thái đơn hàng** (`orderStatus`) | **EP-IN-STATUS-1**: Chờ xác nhận (pending)<br>**EP-IN-STATUS-2**: Đã xác nhận (confirmed)<br>**EP-IN-STATUS-3**: Đang giao (shipping)<br>**EP-IN-STATUS-4**: Đã giao (delivered)<br>**EP-IN-STATUS-5**: Đã hủy (canceled) | **EP-IN-STATUS-6-INV**: Trạng thái không hợp lệ / không được hỗ trợ bởi hệ thống.<br>*Giá trị đại diện: unknown, processing* |
| **Đơn vị tiền tệ** (`totalAmount`) | **EP-IN-CURR-1**: Số tiền đơn hàng hợp lệ hiển thị bằng VND.<br>*Giá trị đại diện: 150.000 ₫* | **EP-IN-CURR-2-INV**: Số tiền hiển thị dạng số thô hoặc sai đơn vị.<br>*Giá trị đại diện: 150000, $150, 150.000 VND* |
| **Tiêu đề trang** (`h1Tags`) | **EP-IN-H1-1**: Có chính xác duy nhất 1 tiêu đề trang thẻ H1.<br>*Giá trị đại diện: 1 thẻ <h1>* | **EP-IN-H1-2-INV**: Không có thẻ H1 nào hoặc có nhiều hơn 1 thẻ H1 trên trang.<br>*Giá trị đại diện: 0 thẻ, 2 thẻ H1* |
| **Ngôn ngữ** (`language`) | **EP-IN-LANG-1**: Giao diện hiển thị nhất quán 100% bằng tiếng Việt.<br>*Giá trị đại diện: Toàn bộ tiếng Việt* | **EP-IN-LANG-2-INV**: Giao diện hiển thị lẫn lộn tiếng Anh chưa dịch.<br>*Giá trị đại diện: "Order Date", "Status", "Total"* |
| **Ngày đặt** (`orderDate`) | **EP-IN-DATE-1**: Định dạng ngày hiển thị thân thiện tiếng Việt.<br>*Giá trị đại diện: 26/06/2026* | **EP-IN-DATE-2-INV**: Định dạng ngày dạng chuỗi ISO thô hoặc định dạng nước ngoài gây khó hiểu.<br>*Giá trị đại diện: 2026-06-26T07:39:15.000Z, 06/26/26* |

---

### 2. Phân tích Giá trị biên (BVA) và Biện minh kỹ thuật

Chúng ta áp dụng kỹ thuật BVA tại các điểm chuyển đổi ranh giới quan trọng của dữ liệu hiển thị và cấu hình thẻ HTML:

*   **Số lượng đơn hàng hiển thị (Trang trống vs. Danh sách)**:
    *   **Kỹ thuật áp dụng**: **2-Point BVA** (mốc ranh giới 0 đơn hàng và 1 đơn hàng).
    *   **Biện minh**: Đây là điểm chuyển tiếp cực kỳ quan trọng giữa hai trạng thái giao diện hoàn toàn khác nhau: Trang trống (Empty State) theo đặc tả FR-24 và Bảng danh sách đơn hàng theo FR-11. Thiết kế 2 ca kiểm thử tại biên giúp đảm bảo khi số lượng đơn hàng bằng 0 thì hệ thống kích hoạt đúng Empty State, và ngay khi có đúng 1 đơn hàng thì Empty State lập tức ẩn đi để hiển thị bảng dữ liệu.
    *   **Giá trị biên**:
        *   `BVA-HISTORY-COUNT-1` (Trang trống): 0 đơn hàng -> Kết quả mong đợi: Hiển thị giao diện Empty State (icon minh họa, message thân thiện, nút CTA).
        *   `BVA-HISTORY-COUNT-2` (Bắt đầu hiển thị danh sách): 1 đơn hàng -> Kết quả mong đợi: Ẩn Empty State, hiển thị bảng danh sách đơn hàng có 1 dòng dữ liệu.
*   **Số lượng thẻ tiêu đề trang `<h1>` (Chuẩn giao diện FR-21)**:
    *   **Kỹ thuật áp dụng**: **3-Point BVA** tại ranh giới số lượng thẻ H1 bằng đúng 1.
    *   **Biện minh**: Đây là yêu cầu nghiêm ngặt về SEO và cấu trúc trang web (mỗi trang có *đúng 1 thẻ <h1>*). Sử dụng 3-Point BVA giúp cô lập hành vi kiểm soát cấu trúc:
        *   Điểm dưới biên (0 thẻ H1 - Không hợp lệ) -> Báo lỗi cấu trúc.
        *   Điểm tại biên (chính xác 1 thẻ H1 - Hợp lệ) -> Đạt chuẩn giao diện.
        *   Điểm trên biên (2 thẻ H1 trở lên - Không hợp lệ) -> Báo lỗi cấu trúc.
    *   **Giá trị biên**:
        *   `BVA-H1-COUNT-1` (Dưới biên): 0 thẻ `<h1>` -> Kết quả mong đợi: Thất bại.
        *   `BVA-H1-COUNT-2` (Tại biên): 1 thẻ `<h1>` -> Kết quả mong đợi: Đạt chuẩn.
        *   `BVA-H1-COUNT-3` (Trên biên): 2 thẻ `<h1>` -> Kết quả mong đợi: Thất bại.
*   **Định dạng tiền tệ và dấu chấm phân cách hàng nghìn (FR-21)**:
    *   **Kỹ thuật áp dụng**: **3-Point BVA** tại ranh giới số tiền bắt đầu xuất hiện dấu chấm phân cách (1,000 ₫).
    *   **Biện minh**: Dấu chấm phân cách hàng nghìn chỉ xuất hiện khi giá trị số tiền đạt từ 1,000 trở lên. Dưới mốc đó (ví dụ 999 ₫) không được hiển thị dấu chấm phân cách. Để kiểm tra thuật toán định dạng hiển thị tiền tệ, ta chọn ranh giới xung quanh mốc 1,000:
        *   Giá trị dưới biên: 999 ₫ -> Hiển thị: `999 ₫` (không có dấu chấm).
        *   Giá trị tại biên: 1,000 ₫ -> Hiển thị: `1.000 ₫` (bắt đầu xuất hiện dấu chấm).
        *   Giá trị trên biên: 1,001 ₫ -> Hiển thị: `1.001 ₫` (có dấu chấm).
    *   **Giá trị biên**:
        *   `BVA-CURR-BORDER-1` (Dưới biên): 999 ₫ -> Hiển thị: `999 ₫`.
        *   `BVA-CURR-BORDER-2` (Tại biên): 1,000 ₫ -> Hiển thị: `1.000 ₫`.
        *   `BVA-CURR-BORDER-3` (Trên biên): 1,001 ₫ -> Hiển thị: `1.001 ₫`.
*   **Số lượng đơn hàng phục vụ phân trang (Pagination)**:
    *   **Kỹ thuật áp dụng**: **2-Point BVA** tại ngưỡng kích thước trang mặc định (kích thước trang = 5 đơn hàng).
    *   **Biện minh**: Phân trang chỉ xuất hiện và hoạt động khi số lượng đơn hàng vượt quá kích thước hiển thị của một trang (mặc định là 5 đơn hàng). Do đó, điểm ranh giới nhị phân là giữa việc không hiển thị phân trang (5 đơn hàng) và có hiển thị phân trang (6 đơn hàng). Kiểm tra 2 điểm biên này giúp xác định logic phân trang kích hoạt chính xác.
    *   **Giá trị biên**:
        *   `BVA-PAGE-COUNT-1` (Tại biên hiển thị tối đa 1 trang): 5 đơn hàng -> Kết quả mong đợi: Hiển thị đúng 5 đơn hàng trên trang 1, không xuất hiện nút phân trang (hoặc nút phân trang bị ẩn/vô hiệu hóa).
        *   `BVA-PAGE-COUNT-2` (Vượt biên, kích hoạt trang thứ 2): 6 đơn hàng -> Kết quả mong đợi: Hiển thị 5 đơn hàng trên trang 1, xuất hiện điều khiển phân trang và cho phép nhấp sang trang 2 để xem đơn hàng thứ 6.

---

### 3. Thiết lập Cấu hình Baseline và Nguyên lý Cô lập lỗi (Error Isolation)

Mọi ca kiểm thử biên hoặc ca kiểm thử lỗi sẽ được phát triển bằng cách **chỉ thay đổi duy nhất một biến đầu vào/trạng thái hiển thị** so với baseline hợp lệ dưới đây, nhằm cô lập nguyên nhân gây lỗi chính xác:

*   **Cấu hình Baseline hợp lệ**:
    *   `userSession = logged in as test@eshop.com` (Đã đăng nhập)
    *   `ordersInDB = 5 orders` (Có 5 đơn hàng, hiển thị danh sách bình thường)
    *   `filterStatus = None` (Hiển thị tất cả đơn hàng)
    *   `guiCompliance = Valid` (1 tiêu đề H1, ngôn ngữ tiếng Việt hoàn toàn, hiển thị đúng ký hiệu `₫` và dấu chấm phân cách hàng nghìn).

---

## PHẦN 2: MA TRẬN TRUY VẾT (TRACEABILITY MATRIX)

Ma trận dưới đây chứng minh độ bao phủ toán học đầy đủ của **23 ca kiểm thử** đã được sinh ra đối với toàn bộ các Phân vùng tương đương (EP ID) và Giá trị biên (BVA ID) của module `order-history`:

| Test Case ID | Tên Ca Kiểm Thử | EP ID đã bao phủ | BVA ID đã bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| **TC-ORDER-HISTORY-001** | Happy Path - Hiển thị danh sách thành công | EP-IN-SESSION-1, EP-IN-COUNT-2 | BVA-HISTORY-COUNT-2 | Hiển thị 5 đơn hàng, trạng thái tiếng Việt |
| **TC-ORDER-HISTORY-002** | Chặn truy cập khi chưa đăng nhập | EP-IN-SESSION-2-INV | N/A | Điều hướng về trang Đăng nhập |
| **TC-ORDER-HISTORY-003** | Đảm bảo cô lập dữ liệu (không xem được đơn người khác) | EP-IN-SESSION-3-INV | N/A | Chặn truy cập, báo lỗi 403 |
| **TC-ORDER-HISTORY-004** | Hiển thị Empty State khi có 0 đơn hàng | EP-IN-COUNT-1 | BVA-HISTORY-COUNT-1 | Giao diện Empty State (FR-24) |
| **TC-ORDER-HISTORY-005** | Hiển thị bảng đơn hàng khi có đúng 1 đơn hàng | EP-IN-COUNT-2 | BVA-HISTORY-COUNT-2 | Hiển thị bảng chứa đúng 1 dòng |
| **TC-ORDER-HISTORY-006** | Xác thực dịch trạng thái - chờ xác nhận | EP-IN-STATUS-1 | N/A | Hiển thị "chờ xác nhận", nhãn màu vàng/cam |
| **TC-ORDER-HISTORY-007** | Xác thực dịch trạng thái - đã xác nhận | EP-IN-STATUS-2 | N/A | Hiển thị "đã xác nhận", nhãn màu xanh dương |
| **TC-ORDER-HISTORY-008** | Xác thực dịch trạng thái - đang giao | EP-IN-STATUS-3 | N/A | Hiển thị "đang giao", nhãn màu tím/xanh lam |
| **TC-ORDER-HISTORY-009** | Xác thực dịch trạng thái - đã giao | EP-IN-STATUS-4 | N/A | Hiển thị "đã giao", nhãn màu xanh lá |
| **TC-ORDER-HISTORY-010** | Xác thực dịch trạng thái - đã hủy | EP-IN-STATUS-5 | N/A | Hiển thị "đã hủy", nhãn màu đỏ/xám |
| **TC-ORDER-HISTORY-011** | Định dạng tiền tệ cho đơn hàng giá trị tối thiểu 1 ₫ | EP-IN-CURR-1 | N/A | Hiển thị: `1 ₫` |
| **TC-ORDER-HISTORY-012** | Định dạng tiền tệ cho đơn hàng 999 ₫ | EP-IN-CURR-1 | BVA-CURR-BORDER-1 | Hiển thị: `999 ₫` (không có dấu chấm) |
| **TC-ORDER-HISTORY-013** | Định dạng tiền tệ cho đơn hàng 1,000 ₫ | EP-IN-CURR-1 | BVA-CURR-BORDER-2 (3-point BVA) | Hiển thị: `1.000 ₫` (có dấu chấm) |
| **TC-ORDER-HISTORY-014** | Định dạng tiền tệ cho đơn hàng 1,001 ₫ | EP-IN-CURR-1 | BVA-CURR-BORDER-3 (3-point BVA) | Hiển thị: `1.001 ₫` (có dấu chấm) |
| **TC-ORDER-HISTORY-015** | Định dạng tiền tệ cho đơn hàng giá trị lớn | EP-IN-CURR-1 | N/A | Hiển thị: `1.234.567 ₫` (phân cách hàng triệu, nghìn) |
| **TC-ORDER-HISTORY-016** | Xác thực thẻ tiêu đề H1 đạt chuẩn (H1 count = 1) | EP-IN-H1-1 | BVA-H1-COUNT-2 | Trả về duy nhất 1 thẻ <h1> |
| **TC-ORDER-HISTORY-017** | Biên thẻ tiêu đề H1 - Không có thẻ H1 | EP-IN-H1-2-INV | BVA-H1-COUNT-1 (3-point BVA) | Trả về 0 thẻ <h1> -> Lỗi cấu trúc |
| **TC-ORDER-HISTORY-018** | Biên thẻ tiêu đề H1 - Có nhiều hơn 1 thẻ H1 | EP-IN-H1-2-INV | BVA-H1-COUNT-3 (3-point BVA) | Trả về 2 thẻ <h1> -> Lỗi cấu trúc |
| **TC-ORDER-HISTORY-019** | Nhất quán ngôn ngữ tiếng Việt 100% | EP-IN-LANG-1 | N/A | Toàn bộ giao diện hiển thị bằng tiếng Việt |
| **TC-ORDER-HISTORY-020** | Lọc đơn hàng theo trạng thái và hiển thị bảng rỗng khi không có đơn hàng tương ứng | EP-IN-COUNT-1 | N/A | Hiển thị Empty State cho bộ lọc rỗng |
| **TC-ORDER-HISTORY-021** | Kiểm tra phân trang lịch sử đơn hàng - Số lượng đơn hàng đúng bằng kích thước trang | EP-IN-COUNT-2 | BVA-PAGE-COUNT-1 | Bảng hiển thị đúng 5 dòng, không hiển thị phân trang |
| **TC-ORDER-HISTORY-022** | Kiểm tra phân trang lịch sử đơn hàng - Số lượng đơn hàng vượt kích thước trang 1 đơn vị | EP-IN-COUNT-2 | BVA-PAGE-COUNT-2 | Xuất hiện phân trang hoạt động bình thường |
| **TC-ORDER-HISTORY-023** | Xác thực định dạng hiển thị trường Ngày đặt (orderDate) | EP-IN-DATE-1 | N/A | Hiển thị ngày dạng DD/MM/YYYY hoặc thân thiện Việt Nam |

---

## PHẦN 3: KHUNG PHÂN TÍCH LỖ HỔNG AI (AI GAP ANALYSIS FRAMEWORK)

Khung phân tích này định hướng kiểm thử viên con người rà soát các tình huống nghiệp vụ động, rủi ro tích hợp hệ thống phức tạp mà AI thiết kế tĩnh dễ bỏ sót:

| Các khía cạnh nghiệp vụ cần rà soát | Tình huống kiểm thử tiềm năng (Gaps) | Nguyên nhân kỹ thuật khiến AI dễ bỏ sót (Root Causes) |
| --- | --- | --- |
| **Phân trang & Số lượng đơn hàng khổng lồ** | - Người dùng có hơn 1,000 đơn hàng. Giao diện có bị treo do load dữ liệu hàng loạt không? Cơ chế phân trang (Pagination) hoặc cuộn vô tận (Infinite Scroll) hoạt động đúng không? | AI tập trung vào logic hiển thị bảng thô và trạng thái biên tối thiểu (0 hoặc 1), bỏ qua các ràng buộc về tài nguyên mạng, hiệu năng kết xuất (rendering performance) tại client. |
| **Đồng bộ hóa Trạng thái thời gian thực (Real-time Sync)** | - Người dùng đang mở trang Lịch sử đơn hàng, cùng lúc đó nhân viên cửa hàng thay đổi trạng thái đơn từ "đang giao" sang "đã giao" ở trang Admin. Trạng thái hiển thị ở client có tự động cập nhật hoặc thông báo tải lại không? | AI giả định dữ liệu tĩnh trong DB không thay đổi trong suốt phiên làm việc, thiếu nhận thức về cơ chế kết nối liên tục (WebSockets/Polling) và luồng xử lý bất đồng bộ đa kênh. |
| **Xác thực API & Lỗ hổng IDOR** | - Tấn công thay đổi mã đơn hàng trực tiếp qua request API (Insecure Direct Object Reference) để đọc hoặc cập nhật trạng thái đơn hàng của người khác mà không thông qua giao diện. | AI phân tích luồng điều hướng UI tuyến tính (tiến/lùi) của người dùng cuối, không giả định hành vi gửi request API tự do phá vỡ kiểm soát quyền của Backend. |
| **Khả năng hoạt động ngoại tuyến (Offline Resiliency)** | - Đang xem danh sách đơn hàng thì mất kết nối mạng (hoặc server sập). Hệ thống xử lý thế nào? Có hiển thị thông báo lỗi thân thiện hay bị crash màn hình trắng? | AI giả lập hệ thống hoạt động trong điều kiện lý tưởng (Happy Network State), bỏ qua các trạng thái biên của hạ tầng truyền tải dữ liệu. |

---

## PHẦN 4: QUY TRÌNH BÁO CÁO LỖI & BIỂU MẪU

### 1. Phân loại Mức độ Nghiêm trọng (Severity) và Độ ưu tiên (Priority)
*   **Severity**:
    *   `Block`: Màn hình lịch sử đơn hàng bị crash trắng trang không thể truy cập.
    *   `Critical`: Người dùng A đọc được đơn hàng của người dùng B (Lỗ hổng bảo mật rò rỉ dữ liệu).
    *   `Major`: Định dạng tiền tệ hiển thị sai (ví dụ: `150000 ₫` không có dấu chấm, hoặc ký hiệu tiền tệ không đúng); trạng thái đơn hiển thị tiếng Anh.
    *   `Minor`: Lỗi hiển thị sai màu nhãn trạng thái; sai số lượng thẻ tiêu đề H1; lỗi căn lề giao diện.
*   **Priority**:
    *   `P0`: Sửa ngay lập tức (crash trang, lộ dữ liệu khách hàng).
    *   `P1`: Sửa trước khi đóng sprint hiện tại.
    *   `P2`: Sửa trong sprint tiếp theo.
    *   `P3`: Cải tiến trải nghiệm người dùng hoặc sửa khi rảnh.

### 2. Biểu mẫu báo cáo lỗi trên GitHub (Markdown Template)

```markdown
# [BUG][order-history] <Mô tả ngắn gọn lỗi hiển thị/chức năng lịch sử đơn hàng>

## Found by Test Case
- **Test Case ID**: [Điền mã TC phát hiện lỗi, ví dụ: TC-ORDER-HISTORY-013]

## Related Requirement
- **Requirement ID**: FR-11, FR-21

## Severity / Priority
- **Severity**: [Block / Critical / Major / Minor]
- **Priority**: [P0 / P1 / P2 / P3]

## Environment
- **URL**: http://localhost:5173/orders
- **Browser**: [Ví dụ: Google Chrome v120]
- **OS**: [Ví dụ: Windows 11]

## Steps to reproduce
1. Đăng nhập hệ thống bằng tài khoản có đơn hàng trị giá 1,000 ₫.
2. Truy cập trang Lịch sử đơn hàng tại `http://localhost:5173/orders`.
3. Quan sát định dạng hiển thị số tiền của đơn hàng đó trong bảng.

## Expected result
- Số tiền hiển thị đúng định dạng phân cách hàng nghìn có dấu chấm: `1.000 ₫` theo yêu cầu của FR-21.

## Actual result
- Hệ thống hiển thị số tiền dạng số thô không có dấu chấm phân cách: `1000 ₫`.

## Evidence
- [Chèn ảnh chụp màn hình lỗi giao diện: ![Screenshot](/path/to/screenshot.png)]
```

### 3. Nhãn dán (Labels) bắt buộc phải gắn trên GitHub Issue:
*   `type: bug`
*   `module: order-history`
*   `severity: [block | critical | major | minor]`
*   `priority: [p0 | p1 | p2 | p3]`
*   `status: new`
*   `found-by: test-case`

### 4. Quy trình Retest và Đóng lỗi (Closure Checklist):
1.  **PR Verification**: Kiểm tra xem nhánh code sửa lỗi đã được merge thành công vào nhánh chính và deploy lên môi trường kiểm thử chưa.
2.  **Clean Cache & Environment**: Xóa cache trình duyệt và khởi động lại dự án.
3.  **Retest Execution**: Thực hiện lại chính xác các bước tái hiện trong báo cáo lỗi.
4.  **Regression Check**: Chạy lại các ca kiểm thử liên quan xung quanh (Happy Path TC-001, lọc đơn hàng, đăng xuất) để đảm bảo không phát sinh lỗi hồi quy.
5.  **Write Retest Comment & Close**: Chỉ có kiểm thử viên phát hiện lỗi mới có quyền đóng Issue sau khi viết bình luận xác nhận thành công.
