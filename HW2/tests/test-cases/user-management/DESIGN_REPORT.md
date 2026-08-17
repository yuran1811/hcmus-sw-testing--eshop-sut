# BÁO CÁO THIẾT KẾ KIỂM THỬ: QUẢN LÝ NGƯỜI DÙNG (FR-19)

Báo cáo thiết kế ca kiểm thử này áp dụng kỹ thuật Phân vùng tương đương (EP) và Phân tích giá trị biên (BVA) để xây dựng một bộ ca kiểm thử tối ưu và hoàn chỉnh về mặt toán học cho tính năng Quản lý Người dùng (FR-19), Kiểm soát truy cập (FR-12), Tiêu chuẩn giao diện chung (FR-21) và Trạng thái trang phản hồi (FR-24) của hệ thống EShop.

---

## PHẦN 1: PHÂN TÍCH PHÂN VÙNG TƯƠNG ĐƯƠNG (EP) & GIÁ TRỊ BIÊN (BVA)

### 1. Phân tích các tham số đầu vào và Phân vùng tương đương (EP)

Chúng ta phân tích các tham số đầu vào, trạng thái phiên làm việc (`userSession`), danh sách người dùng (`userList`), tài khoản mục tiêu cần xóa (`targetUserToDelete`), trạng thái đơn hàng liên kết (`targetUserOrders`), trạng thái tranh chấp đồng thời (`concurrencyState`), hành động xóa (`deleteAction`) và các tiêu chuẩn tuân thủ giao diện thành các phân vùng tương đương hợp lệ (Valid Partitions) và không hợp lệ (Invalid Partitions):

| Tham số nhập liệu / Trạng thái | Phân vùng hợp lệ (Valid Partitions) | Phân vùng không hợp lệ (Invalid Partitions) |
| --- | --- | --- |
| **Phiên đăng nhập** (`userSession`) | **EP-IN-USER-MGT-SESSION-1**: Phiên đăng nhập hợp lệ của Admin.<br>*Giá trị đại diện: admin@eshop.com (role = admin)* | **EP-IN-USER-MGT-SESSION-2-INV**: Đăng nhập tài khoản thường nhưng cố truy cập danh sách hoặc gọi API xóa.<br>*Giá trị đại diện: test@eshop.com (role = user)*<br><br>**EP-IN-USER-MGT-SESSION-3-INV**: Chưa đăng nhập (khách vãng lai).<br>*Giá trị đại diện: anonymous* |
| **Danh sách người dùng** (`userList`) | **EP-IN-USER-MGT-COUNT-1**: Chỉ có tài khoản Admin đang hoạt động (0 người dùng khác -> trang trống).<br>*Giá trị đại diện: 0 other users*<br><br>**EP-IN-USER-MGT-COUNT-2**: Có từ 1 người dùng khác trở lên đăng ký trên hệ thống.<br>*Giá trị đại diện: 1 other user, 4 other users* | N/A |
| **Tài khoản mục tiêu xóa** (`targetUserToDelete`) | **EP-IN-USER-MGT-TARGET-1**: Một tài khoản người dùng thường khác hoặc admin khác (không phải chính mình).<br>*Giá trị đại diện: test@eshop.com* | **EP-IN-USER-MGT-TARGET-2-INV**: Chính tài khoản admin đang đăng nhập hiện tại (cả trên UI và API bypass).<br>*Giá trị đại diện: admin@eshop.com (chính mình)* |
| **Đơn hàng liên kết** (`targetUserOrders`) | **EP-IN-USER-MGT-ORDER-1**: Người dùng bị xóa không có đơn hàng hoạt động nào trong hệ thống.<br>*Giá trị đại diện: 0 đơn hàng hoạt động* | **EP-IN-USER-MGT-ORDER-2-INV**: Người dùng bị xóa đang có ít nhất một đơn hàng hoạt động (`pending`, `confirmed`, `shipping`).<br>*Giá trị đại diện: 1 đơn hàng hoạt động* |
| **Tranh chấp đồng thời** (`concurrencyState`) | **EP-IN-USER-MGT-CONC-1**: Yêu cầu xóa được gửi tuần tự và độc lập.<br>*Giá trị đại diện: Xóa đơn lẻ* | **EP-IN-USER-MGT-CONC-2-INV**: Hai Admin cùng gửi yêu cầu xóa một người dùng tại cùng một thời điểm.<br>*Giá trị đại diện: Xóa đồng thời* |
| **Hành động xóa** (`deleteAction`) | **EP-IN-USER-MGT-ACTION-1**: Nhấn xác nhận xóa trong dialog.<br>*Giá trị đại diện: Click Confirm*<br><br>**EP-IN-USER-MGT-ACTION-2**: Nhấn hủy xóa trong dialog.<br>*Giá trị đại diện: Click Cancel* | N/A |
| **Tiêu chuẩn giao diện** (`guiCompliance`) | **EP-IN-USER-MGT-GUI-1**: Đầy đủ 1 thẻ H1, tiếng Việt nhất quán, nút xóa màu đỏ, password che giấu hoàn toàn, hiển thị an toàn chống XSS, Tab Order phím di chuyển chuẩn (FR-21).<br>*Giá trị đại diện: Giao diện chuẩn* | **EP-IN-USER-MGT-GUI-2-INV**: 0 hoặc nhiều hơn 1 thẻ H1.<br>*Giá trị đại diện: 0 thẻ H1, 2 thẻ H1*<br><br>**EP-IN-USER-MGT-GUI-3-INV**: Ngôn ngữ pha trộn tiếng Anh chưa dịch.<br>*Giá trị đại diện: Hiển thị chữ "Delete", "Actions"*<br><br>**EP-IN-USER-MGT-GUI-4-INV**: Nút xóa không màu đỏ.<br>*Giá trị đại diện: Nút xóa màu xám hoặc xanh dương*<br><br>**EP-IN-USER-MGT-GUI-5-INV**: Mật khẩu hiển thị hoặc xuất hiện trong cây DOM dưới dạng văn bản thô.<br>*Giá trị đại diện: password hash hoặc plain text bị lộ ở client* |

---

### 2. Phân tích Giá trị biên (BVA) và Biện minh kỹ thuật

Chúng ta áp dụng kỹ thuật BVA tại các điểm chuyển đổi ranh giới quan trọng của dữ liệu hiển thị và cấu hình thẻ HTML:

*   **Số lượng người dùng khác hiển thị (Trang trống vs. Danh sách)**:
    *   **Kỹ thuật áp dụng**: **2-Point BVA** (mốc ranh giới 0 người dùng khác và 1 người dùng khác).
    *   **Biện minh**: Đây là điểm chuyển tiếp cực kỳ quan trọng giữa hai trạng thái giao diện hoàn toàn khác nhau: Trang trống (Empty State) theo đặc tả FR-24 và Bảng danh sách người dùng theo FR-19. Thiết kế 2 ca kiểm thử tại biên giúp đảm bảo khi số lượng người dùng khác bằng 0 thì hệ thống kích hoạt đúng Empty State, và ngay khi có đúng 1 người dùng khác thì Empty State lập tức ẩn đi để hiển thị bảng dữ liệu.
    *   **Giá trị biên**:
        *   `BVA-USER-COUNT-1` (Trang trống): 0 người dùng khác -> Kết quả mong đợi: Hiển thị giao diện Empty State (icon minh họa, message thân thiện).
        *   `BVA-USER-COUNT-2` (Bắt đầu hiển thị danh sách): 1 người dùng khác -> Kết quả mong đợi: Ẩn Empty State, hiển thị bảng danh sách người dùng có 2 dòng dữ liệu (gồm admin và người dùng này).
*   **Số lượng đơn hàng hoạt động của người dùng bị xóa (Ràng buộc Khóa ngoại)**:
    *   **Kỹ thuật áp dụng**: **2-Point BVA** (mốc ranh giới 0 đơn hàng hoạt động và 1 đơn hàng hoạt động).
    *   **Biện minh**: Để bảo toàn tính toàn vẹn cơ sở dữ liệu và tránh đơn hàng mồ côi (orphaned), hệ thống phải từ chối xóa tài khoản nếu họ có từ 1 đơn hàng hoạt động trở lên. Biên kiểm thử tại mốc 0 đơn hàng hoạt động (cho phép xóa) và 1 đơn hàng hoạt động (bị chặn và báo lỗi) giúp kiểm tra tính chính xác của luật kiểm soát khóa ngoại.
    *   **Giá trị biên**:
        *   `BVA-USER-ORDER-1` (Cho phép xóa): 0 đơn hàng hoạt động -> Kết quả mong đợi: Xóa người dùng thành công.
        *   `BVA-USER-ORDER-2` (Chặn xóa): 1 đơn hàng hoạt động -> Kết quả mong đợi: Hệ thống từ chối xóa, hiển thị lỗi tiếng Việt "Không thể xóa người dùng đang có giao dịch hoặc đơn hàng hoạt động!".
*   **Số lượng thẻ tiêu đề trang `<h1>` (Chuẩn giao diện FR-21)**:
    *   **Kỹ thuật áp dụng**: **3-Point BVA** tại ranh giới số lượng thẻ H1 bằng đúng 1.
    *   **Biện minh**: Đây là yêu cầu nghiêm ngặt về SEO và cấu trúc trang web (mỗi trang có *đúng 1 thẻ <h1>*). Sử dụng 3-Point BVA giúp cô lập hành vi kiểm soát cấu trúc:
        *   Điểm dưới biên (0 thẻ H1 - Không hợp lệ) -> Báo lỗi cấu trúc.
        *   Điểm tại biên (chính xác 1 thẻ H1 - Hợp lệ) -> Đạt chuẩn giao diện.
        *   Điểm trên biên (2 thẻ H1 trở lên - Không hợp lệ) -> Báo lỗi cấu trúc.
    *   **Giá trị biên**:
        *   `BVA-USER-H1-1` (Dưới biên): 0 thẻ `<h1>` -> Kết quả mong đợi: Thất bại.
        *   `BVA-USER-H1-2` (Tại biên): 1 thẻ `<h1>` -> Kết quả mong đợi: Đạt chuẩn.
        *   `BVA-USER-H1-3` (Trên biên): 2 thẻ `<h1>` -> Kết quả mong đợi: Thất bại.
*   **Hành động trên Dialog xác nhận xóa (FR-24)**:
    *   **Kỹ thuật áp dụng**: **2-Point BVA** (mốc quyết định giữa đồng ý và hủy bỏ hành động).
    *   **Biện minh**: Dialog xác nhận là chốt chặn cuối cùng ngăn ngừa việc mất mát dữ liệu do vô tình click chuột. Phải kiểm tra đầy đủ cả 2 nhánh quyết định có thể có của dialog để đảm bảo hệ thống phản hồi chính xác.
    *   **Giá trị biên**:
        *   `BVA-USER-CONFIRM-1` (Hủy bỏ): Chọn nút "Hủy" trên dialog -> Đóng dialog, giữ nguyên dữ liệu.
        *   `BVA-USER-CONFIRM-2` (Xác nhận): Chọn nút "Xác nhận" trên dialog -> Tiến hành xóa, cập nhật giao diện và DB.

---

### 3. Thiết lập Cấu hình Baseline và Nguyên lý Cô lập lỗi (Error Isolation)

Mọi ca kiểm thử biên hoặc ca kiểm thử lỗi sẽ được phát triển bằng cách **chỉ thay đổi duy nhất một biến đầu vào/trạng thái hiển thị** so với baseline hợp lệ dưới đây, nhằm cô lập nguyên nhân gây lỗi chính xác:

*   **Cấu hình Baseline hợp lệ**:
    *   `userSession = logged in as admin@eshop.com (role = admin)` (Đã đăng nhập Admin)
    *   `usersInDB = 5 users` (1 active admin, 4 other users)
    *   `targetUserToDelete = test@eshop.com` (Một người dùng thường khác, không có đơn hàng hoạt động)
    *   `deleteAction = Confirmed` (Xác nhận xóa qua dialog)
    *   `concurrencyState = Sequence` (Không tranh chấp đồng thời)
    *   `guiCompliance = Valid` (1 tiêu đề H1, ngôn ngữ tiếng Việt hoàn toàn, nút xóa màu đỏ, password che giấu hoàn toàn, hiển thị an toàn chống XSS, Tab Order chuẩn).

---

## PHẦN 2: MA TRẬN TRUY VẾT (TRACEABILITY MATRIX)

Ma trận dưới đây chứng minh độ bao phủ toán học đầy đủ của **21 ca kiểm thử** đã được sinh ra đối với toàn bộ các Phân vùng tương đương (EP ID) và Giá trị biên (BVA ID) của module `user-management`:

| Test Case ID | Tên Ca Kiểm Thử | EP ID đã bao phủ | BVA ID đã bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| **TC-USER-MANAGEMENT-001** | Happy Path - Hiển thị danh sách thành công | EP-IN-USER-MGT-SESSION-1, EP-IN-USER-MGT-COUNT-2 | BVA-USER-COUNT-2 | Hiển thị 5 người dùng, thông tin tiếng Việt đầy đủ |
| **TC-USER-MANAGEMENT-002** | Chặn truy cập danh sách khi chưa đăng nhập | EP-IN-USER-MGT-SESSION-3-INV | N/A | Điều hướng về trang Đăng nhập |
| **TC-USER-MANAGEMENT-003** | Chặn truy cập danh sách khi đăng nhập bằng User thường | EP-IN-USER-MGT-SESSION-2-INV | N/A | Chặn truy cập, báo lỗi 403 Forbidden |
| **TC-USER-MANAGEMENT-004** | Hiển thị Empty State khi hệ thống có 0 người dùng khác | EP-IN-USER-MGT-COUNT-1 | BVA-USER-COUNT-1 | Giao diện Empty State (FR-24) |
| **TC-USER-MANAGEMENT-005** | Hiển thị bảng danh sách khi có đúng 1 người dùng khác | EP-IN-USER-MGT-COUNT-2 | BVA-USER-COUNT-2 | Bảng hiển thị chính xác 2 dòng (admin + user) |
| **TC-USER-MANAGEMENT-006** | Xóa thành công người dùng khác sau khi xác nhận qua Dialog | EP-IN-USER-MGT-TARGET-1, EP-IN-USER-MGT-ACTION-1 | BVA-USER-CONFIRM-2 | Thực hiện xóa, cập nhật bảng, báo toast thành công |
| **TC-USER-MANAGEMENT-007** | Hủy thao tác xóa người dùng khi chọn Hủy trên Dialog | EP-IN-USER-MGT-TARGET-1, EP-IN-USER-MGT-ACTION-2 | BVA-USER-CONFIRM-1 | Đóng dialog, giữ nguyên người dùng trong bảng |
| **TC-USER-MANAGEMENT-008** | Ngăn chặn Admin tự xóa chính tài khoản đang đăng nhập | EP-IN-USER-MGT-TARGET-2-INV | N/A | Nút Xóa bị ẩn/disabled trên giao diện |
| **TC-USER-MANAGEMENT-009** | Chặn API xóa người dùng từ tài khoản thường | EP-IN-USER-MGT-SESSION-2-INV | N/A | API trả về 403 Forbidden, người dùng không bị xóa |
| **TC-USER-MANAGEMENT-010** | Chặn API xóa người dùng từ khách vãng lai | EP-IN-USER-MGT-SESSION-3-INV | N/A | API trả về 401 Unauthorized, người dùng không bị xóa |
| **TC-USER-MANAGEMENT-011** | Đảm bảo mật khẩu không bao giờ bị lộ trên giao diện | EP-IN-USER-MGT-GUI-5-INV | N/A | Mật khẩu không hiển thị và không được tải về client |
| **TC-USER-MANAGEMENT-012** | Nhất quán ngôn ngữ tiếng Việt 100% trên giao diện | EP-IN-USER-MGT-GUI-3-INV | N/A | Toàn bộ giao diện hiển thị bằng tiếng Việt |
| **TC-USER-MANAGEMENT-013** | Xác thực thẻ tiêu đề H1 đạt chuẩn (H1 count = 1) | EP-IN-USER-MGT-GUI-1 | BVA-USER-H1-2 | Trả về duy nhất 1 thẻ <h1> |
| **TC-USER-MANAGEMENT-014** | Biên thẻ tiêu đề H1 - Không có thẻ H1 nào | EP-IN-USER-MGT-GUI-2-INV | BVA-USER-H1-1 (3-point BVA) | Trả về 0 thẻ <h1> -> Lỗi cấu trúc |
| **TC-USER-MANAGEMENT-015** | Biên thẻ tiêu đề H1 - Có nhiều hơn 1 thẻ H1 | EP-IN-USER-MGT-GUI-2-INV | BVA-USER-H1-3 (3-point BVA) | Trả về 2 thẻ <h1> -> Lỗi cấu trúc |
| **TC-USER-MANAGEMENT-016** | Nhất quán màu sắc nút hành động nguy hiểm - Nút Xóa màu đỏ | EP-IN-USER-MGT-GUI-4-INV | N/A | Nút Xóa hiển thị màu đỏ đặc trưng |
| **TC-USER-MANAGEMENT-017** | Đảm bảo hiển thị an toàn thông tin người dùng, tránh XSS | EP-IN-USER-MGT-GUI-1 | N/A | Dữ liệu được escape an toàn, không thực thi mã script |
| **TC-USER-MANAGEMENT-018** | Chặn xóa người dùng đang có giao dịch hoặc đơn hàng hoạt động | EP-IN-USER-MGT-ORDER-2-INV | BVA-USER-ORDER-2 | Hệ thống từ chối xóa, báo lỗi tiếng Việt bảo toàn khóa ngoại |
| **TC-USER-MANAGEMENT-019** | Chặn API gửi yêu cầu tự xóa chính tài khoản Admin đang đăng nhập | EP-IN-USER-MGT-TARGET-2-INV | N/A | API trả về 400/403, báo lỗi tự xóa không được phép |
| **TC-USER-MANAGEMENT-020** | Xử lý tranh chấp đồng thời khi hai Admin cùng xóa một người dùng | EP-IN-USER-MGT-CONC-2-INV | N/A | Admin gửi sau nhận lỗi 404 thân thiện, không crash server |
| **TC-USER-MANAGEMENT-021** | Kiểm tra thứ tự chuyển tiêu điểm bàn phím (Tab Order) trên bảng | EP-IN-USER-MGT-GUI-1 | N/A | Tiêu điểm di chuyển tuần tự từ trên xuống dưới, trái sang phải |

---

## PHẦN 3: KHUNG PHÂN TÍCH LỖ HỔNG AI (AI GAP ANALYSIS FRAMEWORK)

Khung phân tích này định hướng kiểm thử viên con người rà soát các tình huống nghiệp vụ động, rủi ro tích hợp hệ thống phức tạp mà AI thiết kế tĩnh dễ bỏ sót:

| Các khía cạnh nghiệp vụ cần rà soát | Tình huống kiểm thử tiềm năng (Gaps) | Nguyên nhân kỹ thuật khiến AI dễ bỏ sót (Root Causes) |
| --- | --- | --- |
| **Ràng buộc Khóa ngoại & Đơn hàng liên kết** | - Người dùng cần xóa đang có các đơn hàng hoạt động trong DB (chờ xác nhận, đang giao) hoặc các lịch sử giao dịch. Hệ thống xử lý thế nào? Có cơ chế xóa mềm (Soft Delete) hay chặn xóa (Cascade Restrict)? | AI phân tích thực thể Người dùng đơn lẻ ở góc độ UI tĩnh, không nắm được mối quan hệ khóa ngoại phức tạp (Foreign Key constraints) giữa các bảng `users`, `orders` và `transactions` trong Database. |
| **Tranh chấp Đồng thời (Concurrency)** | - Hai Admin cùng mở trang quản lý người dùng. Admin A thực hiện xóa Người dùng X, cùng lúc đó Admin B cũng nhấn nút xóa Người dùng X. Hệ thống xử lý tranh chấp thế nào? | AI thiết kế các luồng kiểm thử tuần tự đơn luồng (single-thread), bỏ qua các vấn đề bất đồng bộ và tranh chấp tài nguyên đồng thời của hệ thống đa người dùng. |
| **Hành vi Xóa tài khoản Admin khác** | - Một Admin có thể xóa một Admin khác không? Hệ thống có phân cấp Admin (Super Admin vs. Regular Admin) không? | AI dựa hoàn toàn vào phát biểu mô tả chung "Admin có thể xóa người dùng", bỏ qua việc phân tích sâu các vai trò con (Sub-roles) và các quy định chính sách bảo mật nội bộ. |
| **Bypass qua Token JWT cũ (Token Revocation)** | - Sau khi Admin xóa Người dùng X, nhưng Người dùng X vẫn đang giữ một JWT Token hợp lệ còn hạn sử dụng. Token đó có bị thu hồi (revoke) ngay lập tức để chặn người dùng X truy cập API không? | AI giả định việc xóa tài khoản ở Database là kết thúc chu kỳ, bỏ qua cơ chế kiểm soát phiên làm việc (Session Management) và bộ nhớ đệm phân tán (như Redis cache của JWT). |

> [!NOTE]
> **Đánh giá đợt review thứ hai**: Các khoảng trống về Ràng buộc Khóa ngoại, API Bypass tự xóa tài khoản, Tranh chấp đồng thời (Concurrency) và Tiêu chuẩn tiếp cận giao diện di động/phím di chuyển (Tab Order) đã được bổ sung đầy đủ vào bộ kiểm thử thông qua các ca kiểm thử từ `TC-USER-MANAGEMENT-018` đến `TC-USER-MANAGEMENT-021`.

---

## PHẦN 4: QUY TRÌNH BÁO CÁO LỖI & BIỂU MẪU

### 1. Phân loại Mức độ Nghiêm trọng (Severity) và Độ ưu tiên (Priority)
*   **Severity**:
    *   `Block`: Màn hình quản lý người dùng bị crash trắng trang không thể thao tác.
    *   `Critical`: Lộ mật khẩu người dùng ở dạng văn bản thô trên DOM hoặc Network Payload; người dùng thường có thể gọi API xóa người dùng khác.
    *   `Major`: Admin không thể tự xóa tài khoản của chính mình nhưng hệ thống vẫn cho phép xóa (gây sập phiên làm việc hiện tại); nút Xóa người dùng không có dialog xác nhận; mật khẩu hiển thị dạng `******` trên bảng.
    *   `Minor`: Nút xóa không màu đỏ; sai số lượng thẻ tiêu đề H1; lỗi hiển thị tiếng Anh chưa dịch.
*   **Priority**:
    *   `P0`: Sửa ngay lập tức (lộ mật khẩu khách hàng, bypass API xóa người dùng).
    *   `P1`: Sửa trước khi đóng sprint hiện tại.
    *   `P2`: Sửa trong sprint tiếp theo.
    *   `P3`: Cải tiến giao diện hoặc sửa khi rảnh.

### 2. Biểu mẫu báo cáo lỗi trên GitHub (Markdown Template)

```markdown
# [BUG][user-management] <Mô tả ngắn gọn lỗi hiển thị/chức năng quản lý người dùng>

## Found by Test Case
- **Test Case ID**: [Điền mã TC phát hiện lỗi, ví dụ: TC-USER-MANAGEMENT-008]

## Related Requirement
- **Requirement ID**: FR-19, FR-12

## Severity / Priority
- **Severity**: [Block / Critical / Major / Minor]
- **Priority**: [P0 / P1 / P2 / P3]

## Environment
- **URL**: http://localhost:5174/users
- **Browser**: [Ví dụ: Google Chrome v120]
- **OS**: [Ví dụ: Windows 11]

## Steps to reproduce
1. Đăng nhập Admin Portal bằng tài khoản `admin@eshop.com`.
2. Truy cập trang "Quản lý Người dùng" tại địa chỉ `http://localhost:5174/users`.
3. Tìm dòng chứa chính tài khoản `admin@eshop.com`.
4. Quan sát nút "Xóa" và thử click để thực hiện xóa.

## Expected result
- Nút "Xóa" của chính tài khoản admin đang đăng nhập phải bị ẩn hoặc disabled (FR-19).

## Actual result
- Nút "Xóa" vẫn hiển thị hoạt động bình thường và cho phép click thực hiện tự xóa gây crash phiên làm việc.

## Evidence
- [Chèn ảnh chụp màn hình lỗi giao diện: ![Screenshot](/path/to/screenshot.png)]
```

### 3. Nhãn dán (Labels) bắt buộc phải gắn trên GitHub Issue:
*   `type: bug`
*   `module: user-management`
*   `severity: [block | critical | major | minor]`
*   `priority: [p0 | p1 | p2 | p3]`
*   `status: new`
*   `found-by: test-case`

### 4. Quy trình Retest và Đóng lỗi (Closure Checklist):
1.  **PR Verification**: Kiểm tra xem nhánh code sửa lỗi đã được merge thành công vào nhánh chính và deploy lên môi trường staging.
2.  **Clean Cache & Environment**: Xóa cache trình duyệt và khởi động lại dự án.
3.  **Retest Execution**: Thực hiện lại chính xác các bước tái hiện trong báo cáo lỗi.
4.  **Regression Check**: Chạy lại các ca kiểm thử liên quan xung quanh (Happy Path TC-001, lọc người dùng, xóa người dùng khác) để đảm bảo không phát sinh lỗi hồi quy.
5.  **Write Retest Comment & Close**: Chỉ có kiểm thử viên phát hiện lỗi mới có quyền đóng Issue sau khi viết bình luận xác nhận thành công kèm hình ảnh minh chứng.
