# BÁO CÁO PHÂN TÍCH KHOẢNG TRỐNG AI TOÀN DIỆN (COMPREHENSIVE AI GAP ANALYSIS REPORT)
**Môn học**: Kiểm thử phần mềm (HW02 - Domain Testing)  
**Tài liệu tham chiếu**: Nhật ký Prompt (Prompt Log - Appendix A)

Tài liệu này tổng hợp toàn bộ các khoảng trống (Gaps) của trợ lý AI được phát hiện qua các đợt đánh giá của con người (Human Review), cùng các phương án khắc phục tương ứng của học sinh (Student Fixes) trên cả 4 module kiểm thử của hệ thống EShop.

---

## 1. TỔNG QUAN VỀ KHOẢNG TRỐNG CỦA AI TRONG THIẾT KẾ KIỂM THỬ
Qua quá trình thực hành phương pháp "AI-First", chúng tôi nhận thấy mô hình AI có những ưu điểm vượt trội trong việc phân tích cú pháp tĩnh và tạo nhanh các ca kiểm thử tiêu chuẩn. Tuy nhiên, AI bộc lộ những khoảng trống hệ thống sau:
1.  **Thiếu kiểm soát tính nhất quán và logic nghiệp vụ**: AI dễ tạo ra các trạng thái bất khả thi trong thực tế hoặc tham chiếu đến các biên chưa được định nghĩa.
2.  **Xu hướng thiết kế thừa thãi (Over-engineering)**: AI thường tự động suy luận và thêm vào các tính năng không có trong đặc tả (như phân trang, tìm kiếm) nếu không được kiểm soát chặt chẽ.
3.  **Bỏ sót kịch bản bảo mật động và phi trạng thái**: AI có xu hướng mặc định hệ thống hoạt động trong môi trường lý tưởng (happy path), dễ bỏ sót các kịch bản kiểm soát phiên làm việc (Session), thời gian hiệu lực (Temporal Validation), và chống lạm dụng hệ thống (Brute Force, Replay Attack).

---

## 2. CHI TIẾT KHOẢNG TRỐNG AI VÀ KHẮC PHỤC TRÊN TỪNG TÍNH NĂNG

### 2.1. Tính năng: Quên mật khẩu & Đặt lại mật khẩu (FR-03)
*   **Khoảng trống của AI phát hiện ở bản thảo đầu tiên**:
    1.  AI hoàn toàn bỏ qua các kịch bản bảo mật của mã OTP như OTP hết hạn và tấn công phát lại (Replay Attack) sử dụng lại mã OTP cũ.
    2.  Nhầm lẫn trong phân tích giá trị biên (BVA) của độ dài mật khẩu: Đặt cấu hình mật khẩu baseline `Reset123!` (9 ký tự - biên trên B+1) nhưng lại ánh xạ nhầm vào biên đích đạt chuẩn tối thiểu `BVA-PASS-LEN-2` (8 ký tự).
*   **Khắc phục của học sinh (Đã thực hiện ở Entry 6)**:
    1.  Tạo mới **TC-FORGOT-PASSWORD-026** để kiểm thử OTP hết hạn và **TC-FORGOT-PASSWORD-027** để kiểm thử tấn công phát lại (Replay Attack) tuân thủ tiêu chuẩn bảo mật `SEC-07`.
    2.  Sửa lại ánh xạ BVA của `TC-002` thành biên trên `BVA-PASS-LEN-3` (9 ký tự), đồng thời điều chỉnh dữ liệu kiểm thử của `TC-024` thành `Reset12!` (đúng 8 ký tự) để kiểm thử chính xác biên đích tối thiểu `BVA-PASS-LEN-2`.
*   **Khoảng trống nâng cao phát hiện ở đợt review thứ hai (Đang khắc phục)**:
    1.  Bỏ sót kịch bản **Chặn truy cập trực tiếp Bước 2 (Bypass Step 1)** khi chưa có phiên làm việc hợp lệ ở Bước 1.
    2.  Bỏ sót xác thực **Tính ngẫu nhiên của OTP** (yêu cầu gửi liên tiếp phải sinh ra các mã khác nhau).
    3.  Bỏ sót **Chống Brute Force OTP** (khóa tài khoản/chặn yêu cầu sau 5 lần nhập sai liên tiếp).
    4.  Bỏ sót xác thực **Vô hiệu hóa phiên OTP khi nhấn nút Back** của trình duyệt sau khi reset mật khẩu thành công.
*   **Khắc phục đề xuất của học sinh**: Bổ sung 4 ca kiểm thử từ `TC-FORGOT-PASSWORD-028` đến `TC-FORGOT-PASSWORD-031` để bao phủ hoàn toàn các miền trạng thái động này.

---

### 2.2. Tính năng: Xem lịch sử đơn hàng (FR-11)
*   **Khoảng trống của AI phát hiện ở bản thảo đầu tiên**:
    1.  **Lỗi đứt gãy truy vết (Broken Traceability)**: AI tự ý tham chiếu đến biên phân trang `BVA-PAGE-COUNT-1` và `BVA-PAGE-COUNT-2` trong ma trận truy vết nhưng hoàn toàn không định nghĩa các biên này trong phần phân tích BVA của tài liệu thiết kế.
    2.  **Tạo trạng thái nghiệp vụ bất khả thi**: Thiết kế ca kiểm thử `TC-011` để kiểm tra đơn hàng có tổng trị giá `0 ₫`. Tuy nhiên, đặc tả sản phẩm (FR-15) quy định giá sản phẩm bắt buộc phải là số dương (> 0), dẫn đến việc đơn hàng `0 ₫` là một trạng thái không thể tồn tại trong hệ thống.
    3.  **Thiếu sót yêu cầu hiển thị**: AI hoàn toàn bỏ sót việc kiểm tra định dạng hiển thị của trường ngày đặt hàng (`orderDate`), dù FR-11 yêu cầu hiển thị rõ ràng "Ngày đặt".
*   **Khắc phục của học sinh (Đã thực hiện ở Entry 9)**:
    1.  Bổ sung định nghĩa chi tiết cho các biên phân trang: `BVA-PAGE-COUNT-1` (5 đơn hàng - vừa đủ 1 trang) và `BVA-PAGE-COUNT-2` (6 đơn hàng - bắt đầu kích hoạt trang thứ 2) vào phần BVA của `DESIGN_REPORT.md`.
    2.  Sửa đổi dữ liệu kiểm thử của `TC-011` thành giá trị biên tối thiểu hợp lệ là `1 ₫` để đảm bảo tính khả thi về mặt nghiệp vụ.
    3.  Tạo mới **TC-ORDER-HISTORY-023** để kiểm tra định dạng ngày đặt hàng hiển thị đúng chuẩn tiếng Việt thân thiện (DD/MM/YYYY) thay vì hiển thị chuỗi ISO nguyên bản từ database.
*   **Khoảng trống nâng cao phát hiện ở đợt review thứ hai (Đã khắc phục ở Entry 16)**:
    1.  **Bỏ sót kịch bản điều hướng mở Chi tiết Đơn hàng (Order Detail Transition)**: AI bỏ qua việc kiểm thử liên kết mã đơn hàng hoặc nút "Xem chi tiết" để chuyển hướng người dùng sang đúng trang Chi tiết đơn hàng tương ứng.
    2.  **Bỏ sót kịch bản hiển thị Phí vận chuyển và Coupon trong Chi tiết Đơn hàng**: AI không thiết kế kịch bản xác thực các thông tin tài chính chi tiết (giá gốc sản phẩm, phí ship, coupon giảm giá và số tiền thanh toán cuối cùng) trên giao diện chi tiết đơn hàng.
    3.  **Bỏ sót kịch bản bảo mật API/URL chống IDOR (Access Control)**: AI chỉ kiểm tra việc chặn xem đơn hàng của người khác trên giao diện danh sách chung mà bỏ qua kịch bản người dùng gửi request API trực tiếp hoặc truy cập URL trực tiếp để xem chi tiết đơn hàng của người dùng khác.
    4.  **Bỏ sót kịch bản Tab Order trên trang Lịch sử (FR-21)**: AI không thiết kế ca kiểm thử xác thực thứ tự di chuyển tiêu điểm phím di chuyển (Tab Order) trên trang danh sách lịch sử đơn hàng.
*   **Khắc phục của học sinh (Đã thực hiện ở Entry 16)**: Bổ sung thành công 4 ca kiểm thử từ `TC-ORDER-HISTORY-024` đến `TC-ORDER-HISTORY-027` để bao phủ hoàn toàn các miền trạng thái động này, đồng thời cập nhật phân tích EP/BVA và Ma trận truy vết trong `DESIGN_REPORT.md`.


---

---

### 2.3. Tính năng: Quản lý người dùng (FR-19)
*   **Khoảng trống của AI phát hiện ở bản thảo đầu tiên**:
    1.  **Lỗi đặt tên quy ước (Naming Convention)**: AI đặt sai tiền tố tên file của các ca kiểm thử từ `TC-014` đến `TC-017` thành `TC-ORDER-HISTORY-*` thay vì `TC-USER-MANAGEMENT-*`.
    2.  **Thiết kế thừa chức năng (Over-engineering)**: AI tự ý giả định và thiết kế kịch bản phân trang (`TC-018`, `TC-019`) và chức năng tìm kiếm người dùng (`TC-020`) dù đặc tả FR-19 trong README chỉ yêu cầu hai chức năng đơn giản: "Xem danh sách" và "Xóa người dùng".
*   **Khắc phục của học sinh (Đã thực hiện ở Entry 11)**:
    1.  Đổi tên tiền tố và chỉnh sửa toàn bộ nội dung của các ca kiểm thử từ `TC-014` đến `TC-017` thành `TC-USER-MANAGEMENT-*` để đồng bộ.
    2.  Tiến hành **rút gọn ca kiểm thử (Test Case Reduction)** bằng cách xóa bỏ hoàn toàn 3 ca kiểm thử thừa (`TC-018`, `TC-019`, `TC-020`) để bộ kiểm thử bám sát và tối giản đúng theo đặc tả yêu cầu hệ thống.
*   **Khoảng trống nâng cao phát hiện ở đợt review thứ hai (Đã khắc phục ở Entry 15)**:
    1.  **Bỏ sót kịch bản Ràng buộc Khóa ngoại (Foreign Key Constraint)**: AI bỏ qua việc kiểm thử hệ thống phải chặn xóa người dùng đang có giao dịch/đơn hàng hoạt động (`pending`, `confirmed`, `shipping`) để bảo toàn tính toàn vẹn dữ liệu cơ sở dữ liệu.
    2.  **Bỏ sót kịch bản tự xóa tài khoản qua API Bypass (Security Bypass)**: AI chỉ kiểm tra việc ẩn nút xóa trên UI của Admin đang đăng nhập mà bỏ qua kịch bản Admin gửi trực tiếp request API `DELETE /api/admin/users/<admin_id>` để tự xóa chính mình.
    3.  **Bỏ sót kịch bản Tranh chấp đồng thời khi xóa (Concurrency / Race Condition)**: AI không thiết kế kịch bản kiểm thử khi hai Admin cùng thao tác xóa một người dùng đồng thời, dẫn đến backend có nguy cơ crash nếu không xử lý tốt ngoại lệ bản ghi trống.
    4.  **Bỏ sót kịch bản Tab Order trên bảng danh sách (FR-21)**: AI không thiết kế ca kiểm thử kiểm tra thứ tự di chuyển focus của phím di chuyển (Tab Order) trên các nút hành động của bảng.
*   **Khắc phục của học sinh (Đã thực hiện ở Entry 15)**: Bổ sung thành công 4 ca kiểm thử từ `TC-USER-MANAGEMENT-018` đến `TC-USER-MANAGEMENT-021` để bao phủ hoàn toàn các miền trạng thái động này, đồng thời cập nhật phân tích EP/BVA và Ma trận truy vết trong `DESIGN_REPORT.md`.

---

### 2.4. Tính năng: Thanh toán trên Mobile (FR-20)
*   **Khoảng trống của AI phát hiện qua Human Review (Entry 13)**:
    1.  **Bỏ sót tích hợp module (Module Integration)**: AI chỉ tập trung vào luồng checkout đơn lẻ ở giỏ hàng, hoàn toàn bỏ qua luồng nghiệp vụ Hủy đơn hàng di động vốn liên kết trực tiếp với State Machine của đơn hàng (FR-10).
    2.  **Bỏ sót đặc thù nền tảng di động (Platform Constraints)**: AI không thiết kế kịch bản kiểm thử cho thứ tự chuyển tiêu điểm bàn phím di động (Tab Order - FR-21), kịch bản chống trùng lặp đơn hàng khi nhấn đúp nút Đặt hàng (Double Submit) dưới điều kiện mạng 3G yếu/trễ cao, và kịch bản hiển thị lỗi form nằm phía TRÊN nút submit (FR-22).
    3.  **Bỏ sót xử lý biên của công thức tính tiền**: AI chưa thiết kế kịch bản khi giá trị giảm của coupon vượt quá tổng giá trị giỏ hàng (Coupon fixed discount > total).
*   **Khắc phục của học sinh (Đã thực hiện ở Entry 13)**:
    1.  Tạo mới 5 ca kiểm thử từ **TC-MOBILE-CHECKOUT-022** đến **TC-MOBILE-CHECKOUT-026** để bao phủ hoàn toàn các khoảng trống về hủy đơn hàng, Tab Order di động, Double submit do mạng trễ, và khống chế số tiền thanh toán cuối cùng tối thiểu về mức `0 ₫` (capped discount).
    2.  Cập nhật các ca kiểm thử hiện có để bổ sung bước xác thực sự hiện diện của Breadcrumb trên Checkout di động, khóa trường tiền ở dạng read-only, và cập nhật badge giỏ hàng thời gian thực.

---

## 3. BÀI HỌC KINH NGHIỆM VỀ SỰ CỘNG TÁC GIỮA NGƯỜI VÀ AI (HUMAN-AI COLLABORATION)
1.  **Con người đóng vai trò kiểm soát chất lượng (QC của AI)**: AI rất xuất sắc trong việc tạo nhanh mã nguồn và kịch bản thô, nhưng nếu không có sự rà soát và tư duy phản biện của con người, bộ kiểm thử sẽ chứa đầy lỗi logic nghiệp vụ, liên kết đứt gãy hoặc thừa thãi chức năng.
2.  **Nâng tầm Domain Testing lên biến trạng thái động**: Domain Testing không chỉ là việc kiểm thử các hộp văn bản nhập liệu. Bằng cách mô hình hóa các trạng thái ẩn như phiên làm việc (Session), số lần thao tác (Counter), hiệu lực thời gian (Expiry), chúng ta có thể áp dụng EP và BVA để phát hiện những lỗi hệ thống cực kỳ nguy hiểm mà AI thông thường dễ dàng bỏ qua.
3.  **Bám sát đặc tả yêu cầu (SRS)**: Luôn sử dụng SRS làm "kim chỉ nam" để cắt tỉa các ca kiểm thử thừa của AI (giảm thiểu chi phí kiểm thử) và bổ sung các ca kiểm thử thiếu để đạt độ tin cậy vận hành tối đa.
