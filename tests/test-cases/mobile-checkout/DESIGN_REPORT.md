# BÁO CÁO THIẾT KẾ KIỂM THỬ: THANH TOÁN TRÊN MOBILE (FR-20 / MOBILE CHECKOUT)

Báo cáo thiết kế ca kiểm thử này áp dụng kỹ thuật Phân vùng tương đương (EP) và Phân tích giá trị biên (BVA) để xây dựng một bộ ca kiểm thử tối ưu và hoàn chỉnh về mặt toán học cho tính năng Thanh toán trên ứng dụng di động (FR-20), tích hợp Quy tắc áp dụng Mã giảm giá (FR-09), Tiêu chuẩn giao diện di động (FR-21) và Trạng thái trang phản hồi (FR-24) của hệ thống EShop.

---

## PHẦN 1: PHÂN TÍCH PHÂN VÙNG TƯƠNG ĐƯƠNG (EP) & GIÁ TRỊ BIÊN (BVA)

### 1. Phân tích các tham số đầu vào và Phân vùng tương đương (EP)

Chúng ta phân tích các tham số đầu vào, trạng thái phiên làm việc di động (`userSession`), trạng thái giỏ hàng (`cartState`), mã giảm giá (`couponCode`), tính toàn vẹn dữ liệu số tiền (`totalAmountEditable`), trạng thái mạng di động (`networkState`) và các tiêu chuẩn tuân thủ giao diện thành các phân vùng tương đương hợp lệ (Valid Partitions) và không hợp lệ (Invalid Partitions):

| Tham số nhập liệu / Trạng thái | Phân vùng hợp lệ (Valid Partitions) | Phân vùng không hợp lệ (Invalid Partitions) |
| --- | --- | --- |
| **Phiên đăng nhập** (`userSession`) | **EP-IN-MOB-SESSION-1**: Phiên đăng nhập hợp lệ có token JWT.<br>*Giá trị đại diện: test@eshop.com* | **EP-IN-MOB-SESSION-2-INV**: Chưa đăng nhập (khách vãng lai).<br>*Giá trị đại diện: anonymous* |
| **Giỏ hàng di động** (`cartState`) | **EP-IN-MOB-CART-1**: Giỏ hàng có từ 1 sản phẩm trở lên (cho phép thanh toán).<br>*Giá trị đại diện: 1 sản phẩm, 3 sản phẩm* | **EP-IN-MOB-CART-2-INV**: Giỏ hàng trống (0 sản phẩm).<br>*Giá trị đại diện: 0 sản phẩm* |
| **Mã giảm giá** (`couponCode`) | **EP-IN-MOB-COUPON-1**: Mã giảm giá tồn tại, đang hoạt động, còn hạn dùng, đủ ngưỡng đơn hàng và chưa dùng hết lượt.<br>*Giá trị đại diện: SAVE10 (đơn hàng >= 300.000 ₫)* | **EP-IN-MOB-COUPON-2-INV**: Mã đã hết hạn.<br>*Giá trị đại diện: EXPIRED*<br><br>**EP-IN-MOB-COUPON-3-INV**: Đơn hàng không đạt ngưỡng tối thiểu.<br>*Giá trị đại diện: SAVE10 (đơn hàng < 300.000 ₫)*<br><br>**EP-IN-MOB-COUPON-4-INV**: Đã dùng hết lượt cho phép.<br>*Giá trị đại diện: SAVE10 (đã dùng 1 lần trước đó)*<br><br>**EP-IN-MOB-COUPON-5-INV**: Mã không tồn tại.<br>*Giá trị đại diện: FAKECOUPON* |
| **Số tiền từ Client** (`totalAmountEditable`) | **EP-IN-MOB-TOTAL-1**: Số tiền tính toán bởi hệ thống, không bị chỉnh sửa.<br>*Giá trị đại diện: 450.000 ₫* | **EP-IN-MOB-TOTAL-2-INV**: Số tiền gửi lên từ client bị chỉnh sửa bất thường qua công cụ proxy.<br>*Giá trị đại diện: Sửa từ 450.000 ₫ thành 10.000 ₫* |
| **Trạng thái mạng** (`networkState`) | **EP-IN-MOB-NET-1**: Mạng hoạt động ổn định trong suốt giao dịch.<br>*Giá trị đại diện: Connected* | **EP-IN-MOB-NET-2-INV**: Mất mạng đột ngột khi đang gửi yêu cầu đặt hàng.<br>*Giá trị đại diện: Network Lost*<br><br>**EP-IN-MOB-NET-3-INV**: Mạng có độ trễ cao (High Latency) dễ xảy ra double submit.<br>*Giá trị đại diện: 3000ms delay* |
| **Tiêu chuẩn giao diện** (`guiCompliance`) | **EP-IN-MOB-GUI-1**: Ngôn ngữ tiếng Việt nhất quán, hiển thị đúng ký hiệu `₫` và dấu chấm phân cách hàng nghìn, empty state minh họa đầy đủ, Breadcrumb đầy đủ, Tab Order chuẩn.<br>*Giá trị đại diện: Giao diện di động chuẩn* | **EP-IN-MOB-GUI-2-INV**: Trộn lẫn tiếng Anh chưa dịch.<br>*Giá trị đại diện: Hiển thị chữ "Checkout", "Total"*<br><br>**EP-IN-MOB-GUI-3-INV**: Định dạng tiền tệ sai chuẩn.<br>*Giá trị đại diện: 150000, $150, 150.000 VND* |
| **Trạng thái hủy đơn** (`orderCancelStatus`) | **EP-IN-MOB-CANCEL-1**: Đơn hàng ở trạng thái cho phép hủy.<br>*Giá trị đại diện: pending, confirmed* | **EP-IN-MOB-CANCEL-2-INV**: Đơn hàng ở trạng thái không cho phép hủy.<br>*Giá trị đại diện: shipping* |

---

### 2. Phân tích Giá trị biên (BVA) và Biện minh kỹ thuật

Chúng ta áp dụng kỹ thuật BVA tại các điểm chuyển đổi ranh giới quan trọng của dữ liệu hiển thị và cấu hình thẻ HTML:

*   **Số lượng sản phẩm trong giỏ để đặt hàng (Trang trống vs. Danh sách)**:
    *   **Kỹ thuật áp dụng**: **2-Point BVA** (mốc ranh giới 0 sản phẩm và 1 sản phẩm).
    *   **Biện minh**: Đây là điểm ranh giới kích hoạt luồng nghiệp vụ. Khi giỏ hàng có 0 sản phẩm, hệ thống bắt buộc phải chặn người dùng vào màn hình Checkout bằng cách khóa hoặc ẩn nút bấm, đồng thời hiển thị giao diện giỏ hàng trống (Empty State) theo FR-24. Ngay khi có đúng 1 sản phẩm, nút bấm phải hoạt động bình thường.
    *   **Giá trị biên**:
        *   `BVA-MOB-CART-1`: 0 sản phẩm -> Giỏ hàng trống, hiển thị Empty State di động, không cho bấm Thanh toán.
        *   `BVA-MOB-CART-2`: 1 sản phẩm -> Hiển thị bảng giỏ hàng di động, cho phép điều hướng và Thanh toán thành công.
*   **Ngưỡng đơn hàng tối thiểu áp dụng Coupon (`min_order_amount` của `SAVE10`)**:
    *   **Kỹ thuật áp dụng**: **3-Point BVA** tại ranh giới số tiền đạt tối thiểu 300.000 ₫.
    *   **Biện minh**: Đây là điều kiện tiên quyết C3 của mã giảm giá. Để xác định thuật toán backend có so sánh chính xác mốc lớn hơn hoặc bằng (`>=`) hay không, ta chọn 3 điểm kiểm thử xung quanh mốc 300.000 ₫:
        *   Điểm dưới biên (299.999 ₫ - Không hợp lệ) -> Hệ thống từ chối áp dụng mã giảm giá.
        *   Điểm tại biên (300.000 ₫ - Hợp lệ) -> Hệ thống áp dụng thành công (giảm 30.000 ₫).
        *   Điểm trên biên (300.001 ₫ - Hợp lệ) -> Hệ thống áp dụng thành công.
    *   **Giá trị biên**:
        *   `BVA-MOB-COUPON-MIN-1` (Dưới biên): Đơn hàng trị giá 299.999 ₫ -> Từ chối áp dụng mã.
        *   `BVA-MOB-COUPON-MIN-2` (Tại biên): Đơn hàng trị giá 300.000 ₫ -> Áp dụng thành công, giảm 30.000 ₫.
        *   `BVA-MOB-COUPON-MIN-3` (Trên biên): Đơn hàng trị giá 300.001 ₫ -> Áp dụng thành công, giảm 30.000 ₫.
*   **Giới hạn số lần sử dụng tối đa của Coupon (`max_uses_per_user` của `VIP100`)**:
    *   **Kỹ thuật áp dụng**: **3-Point BVA** tại mốc giới hạn 2 lần sử dụng.
    *   **Biện minh**: Đây là điều kiện C5. Sử dụng 3-point BVA giúp kiểm chứng tính chính xác của bộ đếm số lần sử dụng của tài khoản người dùng:
        *   Dưới biên (đã dùng 1 lần < 2) -> Cho phép áp dụng thành công.
        *   Tại biên (đã dùng 2 lần = 2) -> Báo lỗi hết lượt dùng.
        *   Trên biên (đã dùng 3 lần > 2) -> Báo lỗi hết lượt dùng.
    *   **Giá trị biên**:
        *   `BVA-MOB-COUPON-USES-1` (Dưới biên): Đã dùng 1 lần -> Hợp lệ.
        *   `BVA-MOB-COUPON-USES-2` (Tại biên): Đã dùng 2 lần -> Từ chối.
        *   `BVA-MOB-COUPON-USES-3` (Trên biên): Đã dùng 3 lần -> Từ chối.
*   **Định dạng dấu chấm phân cách hàng nghìn của tiền tệ (FR-21)**:
    *   **Kỹ thuật áp dụng**: **3-Point BVA** tại mốc ranh giới bắt đầu xuất hiện dấu chấm phân cách (1.000 ₫).
    *   **Biện minh**: Dấu chấm phân cách hàng nghìn chỉ xuất hiện từ 1.000 trở lên. Thiết kế 3 ca kiểm thử giúp kiểm soát thuật toán hiển thị tiền tệ di động hoạt động đúng:
        *   Điểm dưới biên (999 ₫) -> Hiển thị: `999 ₫` (không có dấu chấm).
        *   Điểm tại biên (1.000 ₫) -> Hiển thị: `1.000 ₫` (có dấu chấm).
        *   Điểm trên biên (1.001 ₫) -> Hiển thị: `1.001 ₫` (có dấu chấm).
    *   **Giá trị biên**:
        *   `BVA-MOB-CURR-BORDER-1`: Đơn hàng trị giá 999 ₫.
        *   `BVA-MOB-CURR-BORDER-2`: Đơn hàng trị giá 1.000 ₫.
        *   `BVA-MOB-CURR-BORDER-3`: Đơn hàng trị giá 1.001 ₫.
*   **Dialog xác nhận khi xóa sản phẩm khỏi giỏ hàng di động (FR-07, FR-24)**:
    *   **Kỹ thuật áp dụng**: **2-Point BVA** (nhánh Xác nhận vs. Hủy bỏ).
    *   **Biện minh**: Đảm bảo phản hồi dialog hoạt động chính xác với cả hai quyết định của người dùng.
*   **Ngưỡng giá trị giảm tối đa của Coupon (Capped Discount)**:
    *   **Kỹ thuật áp dụng**: **3-Point BVA** tại mốc giỏ hàng có giá trị bằng giá trị giảm cố định của coupon (100.000 ₫).
    *   **Biện minh**: Đảm bảo thuật toán trừ tiền không bị âm và khống chế chính xác số tiền thanh toán cuối cùng tối thiểu là 0 ₫.
    *   **Giá trị biên**:
        *   `BVA-MOB-COUPON-VAL-1` (Giỏ < Coupon): Giỏ hàng 90.000 ₫, mã giảm 100.000 ₫ -> Thanh toán 0 ₫.
        *   `BVA-MOB-COUPON-VAL-2` (Giỏ = Coupon): Giỏ hàng 100.000 ₫, mã giảm 100.000 ₫ -> Thanh toán 0 ₫.
        *   `BVA-MOB-COUPON-VAL-3` (Giỏ > Coupon): Giỏ hàng 101.000 ₫, mã giảm 100.000 ₫ -> Thanh toán 1.000 ₫.
*   **Quy trình State Machine của trạng thái Hủy đơn hàng di động (FR-20, FR-10)**:
    *   **Kỹ thuật áp dụng**: **2-Point BVA** tại ranh giới chuyển đổi trạng thái giữa được phép hủy và không được phép hủy (confirmed vs shipping).
    *   **Biện minh**: Đảm bảo tính nhất quán của State Machine của đơn hàng, ngăn chặn người dùng tự hủy khi đơn hàng đã bắt đầu giao.
    *   **Giá trị biên**:
        *   `BVA-MOB-CANCEL-BORDER-1`: Trạng thái `confirmed` -> Nút Hủy hoạt động, cho phép hủy thành công.
        *   `BVA-MOB-CANCEL-BORDER-2`: Trạng thái `shipping` -> Nút Hủy bị ẩn hoặc khóa hoàn toàn, chặn thao tác hủy.
*   **Thứ tự chuyển đổi tiêu điểm (Tab Order - FR-21)**:
    *   **Kỹ thuật áp dụng**: **2-Point BVA** (Tuần tự đúng vs Bị ngắt quãng/sai lệch).
    *   **Biện minh**: Xác thực tiêu điểm di chuyển đúng hướng từ trên xuống dưới, từ trái sang phải, không bị lạc lối trên form di động.
*   **Chống trùng lặp đặt hàng (Double Submit - Idempotency)**:
    *   **Kỹ thuật áp dụng**: **2-Point BVA** tại ranh giới số lần bấm nút (1 lần bấm hợp lệ vs bấm từ lần 2 trở đi bị chặn/vô hiệu hóa).
    *   **Biện minh**: Chặn đứng việc gửi nhiều yêu cầu tạo đơn trùng nhau dưới điều kiện mạng trễ.

---

### 3. Thiết lập Cấu hình Baseline và Nguyên lý Cô lập lỗi (Error Isolation)

Mọi ca kiểm thử biên hoặc ca kiểm thử lỗi sẽ được phát triển bằng cách **chỉ thay đổi duy nhất một biến đầu vào/trạng thái hiển thị** so với baseline hợp lệ dưới đây, nhằm cô lập nguyên nhân gây lỗi chính xác:

*   **Cấu hình Baseline hợp lệ**:
    *   `userSession = logged in as test@eshop.com` (Đã đăng nhập tài khoản thường trên ứng dụng di động)
    *   `cartState = 3 items (450.000 ₫)` (Giỏ hàng có sản phẩm, không trống)
    *   `couponCode = None` (Không áp dụng mã giảm giá)
    *   `totalAmountEditable = Read-Only` (Số tiền được tính đúng, không can thiệp)
    *   `networkState = Connected` (Mạng kết nối ổn định)
    *   `guiCompliance = Valid` (Ngôn ngữ tiếng Việt hoàn toàn, hiển thị tiền dạng `₫` có dấu chấm phân cách hàng nghìn, màu nút xanh dương cho hành động tích cực và đỏ cho hành động nguy hiểm).

---

## PHẦN 2: MA TRẬN TRUY VẾT (TRACEABILITY MATRIX)

Ma trận dưới đây chứng minh độ bao phủ toán học đầy đủ của **26 ca kiểm thử** đã được sinh ra đối với toàn bộ các Phân vùng tương đương (EP ID) và Giá trị biên (BVA ID) của module `mobile-checkout`:

| Test Case ID | Tên Ca Kiểm Thử | EP ID đã bao phủ | BVA ID đã bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| **TC-MOBILE-CHECKOUT-001** | Happy Path - Thanh toán thành công không coupon | EP-IN-MOB-SESSION-1, EP-IN-MOB-CART-1, EP-IN-MOB-GUI-1 | BVA-MOB-CART-2 | Thanh toán thành công, hiển thị Breadcrumb, khóa tiền không cho sửa, badge giỏ hàng về 0, hiển thị trạng thái "Chờ xác nhận" trong Order History |
| **TC-MOBILE-CHECKOUT-002** | Ngăn chặn truy cập Checkout khi chưa đăng nhập | EP-IN-MOB-SESSION-2-INV | N/A | Hiện thông báo, chuyển hướng đến màn hình Đăng nhập |
| **TC-MOBILE-CHECKOUT-003** | Hiển thị Empty State giỏ hàng di động khi giỏ trống | EP-IN-MOB-CART-2-INV | BVA-MOB-CART-1 | Hiển thị giao diện trang trống, khóa nút thanh toán |
| **TC-MOBILE-CHECKOUT-004** | Cho phép thanh toán khi giỏ hàng có đúng 1 sản phẩm | EP-IN-MOB-CART-1, EP-IN-MOB-GUI-1 | BVA-MOB-CART-2 | Đặt hàng thành công với đúng 1 dòng sản phẩm, hiển thị Breadcrumb, khóa ô tiền |
| **TC-MOBILE-CHECKOUT-005** | Áp dụng coupon SAVE10 tại mốc đơn hàng tối thiểu | EP-IN-MOB-COUPON-1 | BVA-MOB-COUPON-MIN-2 | Áp dụng thành công, giảm 10% (30.000 ₫) |
| **TC-MOBILE-CHECKOUT-006** | Chặn áp dụng coupon SAVE10 khi đơn dưới ngưỡng 1 đơn vị | EP-IN-MOB-COUPON-3-INV | BVA-MOB-COUPON-MIN-1 | Báo lỗi không đủ điều kiện đơn hàng, thông báo lỗi hiển thị phía TRÊN nút submit (FR-22) |
| **TC-MOBILE-CHECKOUT-007** | Áp dụng coupon SAVE10 khi đơn trên ngưỡng 1 đơn vị | EP-IN-MOB-COUPON-1 | BVA-MOB-COUPON-MIN-3 | Áp dụng thành công, giảm 10% (30.000 ₫) |
| **TC-MOBILE-CHECKOUT-008** | Áp dụng thành công coupon fixed BIGBUY đạt ngưỡng | EP-IN-MOB-COUPON-1 | N/A | Áp dụng thành công, giảm cố định 50.000 ₫ |
| **TC-MOBILE-CHECKOUT-009** | Chặn áp dụng coupon đã hết hạn sử dụng | EP-IN-MOB-COUPON-2-INV | N/A | Báo lỗi hết hạn, thông báo lỗi hiển thị phía TRÊN nút submit (FR-22) |
| **TC-MOBILE-CHECKOUT-010** | Chặn áp dụng coupon không tồn tại hoặc inactive | EP-IN-MOB-COUPON-5-INV | N/A | Báo lỗi không tồn tại, thông báo lỗi hiển thị phía TRÊN nút submit (FR-22) |
| **TC-MOBILE-CHECKOUT-011** | Áp dụng coupon VIP100 khi dưới giới hạn lượt dùng | EP-IN-MOB-COUPON-1 | BVA-MOB-COUPON-USES-1 | Áp dụng thành công, giảm cố định 100.000 ₫ |
| **TC-MOBILE-CHECKOUT-012** | Chặn áp dụng coupon VIP100 khi đạt giới hạn lượt dùng | EP-IN-MOB-COUPON-4-INV | BVA-MOB-COUPON-USES-2 | Báo lỗi hết lượt dùng, thông báo lỗi hiển thị phía TRÊN nút submit (FR-22) |
| **TC-MOBILE-CHECKOUT-013** | Backend chặn giao dịch khi client can thiệp sửa đổi số tiền | EP-IN-MOB-TOTAL-2-INV | N/A | API trả về 400 Bad Request, từ chối tạo đơn hàng |
| **TC-MOBILE-CHECKOUT-014** | Kiểm tra định dạng tiền tệ di động dưới biên phân cách | EP-IN-MOB-GUI-1 | BVA-MOB-CURR-BORDER-1 | Hiển thị số tiền: `999 ₫` (không có dấu chấm) |
| **TC-MOBILE-CHECKOUT-015** | Kiểm tra định dạng tiền tệ di động tại biên phân cách | EP-IN-MOB-GUI-1 | BVA-MOB-CURR-BORDER-2 | Hiển thị số tiền: `1.000 ₫` (có dấu chấm) |
| **TC-MOBILE-CHECKOUT-016** | Kiểm tra định dạng tiền tệ di động trên biên phân cách | EP-IN-MOB-GUI-1 | BVA-MOB-CURR-BORDER-3 | Hiển thị số tiền: `1.001 ₫` (có dấu chấm) |
| **TC-MOBILE-CHECKOUT-017** | Nhất quán ngôn ngữ tiếng Việt 100% trên Checkout di động | EP-IN-MOB-GUI-2-INV | N/A | Toàn bộ giao diện hiển thị bằng tiếng Việt |
| **TC-MOBILE-CHECKOUT-018** | Xử lý mất kết nối mạng đột ngột khi đang đặt hàng | EP-IN-MOB-NET-2-INV | N/A | Hiển thị lỗi mạng tiếng Việt phía TRÊN nút submit (FR-22), không bị crash app |
| **TC-MOBILE-CHECKOUT-019** | Dialog xác nhận khi xóa sản phẩm khỏi giỏ hàng - Xác nhận | EP-IN-MOB-GUI-1 | N/A | Xóa sản phẩm khỏi giỏ, cập nhật lại tiền |
| **TC-MOBILE-CHECKOUT-020** | Dialog xác nhận khi xóa sản phẩm khỏi giỏ hàng - Hủy bỏ | EP-IN-MOB-GUI-1 | N/A | Đóng dialog, giữ nguyên sản phẩm trong giỏ |
| **TC-MOBILE-CHECKOUT-021** | Nhất quán màu sắc nút hành động trên Mobile | EP-IN-MOB-GUI-1 | N/A | Nút tích cực màu xanh dương, nút nguy hiểm màu đỏ |
| **TC-MOBILE-CHECKOUT-022** | Hủy đơn hàng thành công trên Mobile khi ở trạng thái Chờ xác nhận | EP-IN-MOB-SESSION-1, EP-IN-MOB-CANCEL-1 | BVA-MOB-CANCEL-BORDER-1 | Hủy đơn hàng thành công, trạng thái chuyển sang "Đã hủy" (canceled) màu đỏ |
| **TC-MOBILE-CHECKOUT-023** | Chặn không cho phép Hủy đơn hàng trên Mobile khi đang giao hàng | EP-IN-MOB-SESSION-1, EP-IN-MOB-CANCEL-2-INV | BVA-MOB-CANCEL-BORDER-2 | Nút hủy đơn hàng bị ẩn/vô hiệu hóa, không cho hủy |
| **TC-MOBILE-CHECKOUT-024** | Kiểm tra Tab Order và Keyboard Navigation trên Checkout | EP-IN-MOB-SESSION-1, EP-IN-MOB-GUI-1 | N/A (Tab Order tuần tự) | Tiêu điểm (focus) di chuyển tuần tự đúng quy chuẩn từ trên xuống dưới, từ trái sang phải |
| **TC-MOBILE-CHECKOUT-025** | Đặt hàng thành công với cơ chế chống gửi trùng lặp đơn hàng | EP-IN-MOB-SESSION-1, EP-IN-MOB-NET-3-INV | N/A (Double click) | Nút đặt hàng bị khóa ngay khi click, chỉ tạo 1 đơn hàng duy nhất |
| **TC-MOBILE-CHECKOUT-026** | Áp dụng mã giảm giá fixed có giá trị vượt quá tổng tiền giỏ hàng | EP-IN-MOB-SESSION-1, EP-IN-MOB-COUPON-1 | BVA-MOB-COUPON-VAL-1 | Áp dụng thành công, tổng tiền thanh toán được khống chế chính xác ở mức `0 ₫` |

---

## PHẦN 3: KHUNG PHÂN TÍCH LỖ HỔNG AI (AI GAP ANALYSIS FRAMEWORK)

Khung phân tích này định hướng kiểm thử viên con người rà soát các tình huống nghiệp vụ động, rủi ro tích hợp hệ thống phức tạp mà AI thiết kế tĩnh dễ bỏ sót:

| Các khía cạnh nghiệp vụ cần rà soát | Tình huống kiểm thử tiềm năng (Gaps) | Nguyên nhân kỹ thuật khiến AI dễ bỏ sót (Root Causes) |
| --- | --- | --- |
| **Độ trễ Mạng di động & Đặt hàng trùng (Double Submit)** | - Thiết bị di động sử dụng mạng 3G yếu, người dùng nhấn nút "Đặt hàng" liên tiếp 2-3 lần do màn hình phản hồi chậm. Hệ thống có chặn được việc tạo các đơn hàng trùng lặp (Idempotency Key) không? | AI thiết kế kịch bản dựa trên giả định mạng lý tưởng có phản hồi tức thời hoặc giả lập mất mạng hẳn, bỏ qua trạng thái mạng có độ trễ cao (High Latency) dẫn đến hành vi click liên tiếp của con người. |
| **Xung đột Hàng tồn kho tại Backend (Race Condition)** | - Hai người dùng di động cùng đặt mua sản phẩm cuối cùng còn lại trong kho cùng một thời điểm. Giao dịch của ai sẽ thành công và backend xử lý trừ kho thế nào để tránh bán quá đà (Overbooking)? | AI phân tích luồng thanh toán ở góc độ giao diện người dùng đơn lẻ (Single-user client flow), không mô phỏng được trạng thái tranh chấp tài nguyên (Concurrency / Race Condition) của hệ thống thực tế. |
| **Khôi phục Giỏ hàng khi Thanh toán thất bại** | - Người dùng tiến hành đặt hàng nhưng backend trả về lỗi thanh toán thất bại (hoặc lỗi cổng thanh toán bên thứ ba). Giỏ hàng trên ứng dụng di động có được giữ nguyên để người dùng chỉnh sửa và đặt lại không? | AI giả định luồng hoạt động lý tưởng (Happy Path) là thanh toán luôn thành công hoặc chỉ kiểm tra lỗi dữ liệu thô, bỏ qua việc thiết kế luồng khôi phục trạng thái ứng dụng (State Recovery Workflow). |
| **Đồng bộ hóa Trạng thái Giỏ hàng Đa nền tảng** | - Người dùng thêm sản phẩm vào giỏ hàng trên Web, sau đó mở ứng dụng di động để tiến hành Checkout. Giỏ hàng có được đồng bộ hóa thời gian thực (Real-time Sync) giữa các thiết bị không? | AI phân tích ứng dụng di động như một hệ thống độc lập lưu trữ Local Storage riêng biệt, bỏ qua khía cạnh kiểm thử tích hợp đa kênh (Omnichannel) đồng nhất qua server. |

### Ghi chú Đánh giá từ Con người (Human Review Findings & Actual Gaps Added):
Qua rà soát thực tế từ kiểm thử viên con người đối với bản thiết kế ban đầu của AI, chúng tôi đã phát hiện và bổ sung thêm **5 ca kiểm thử thực tế quan trọng** (từ `TC-022` đến `TC-026`) vì các lý do sau:
1. **Thiếu sót luồng nghiệp vụ Hủy đơn hàng di động (FR-20, FR-10)**: AI ban đầu chỉ tập trung vào luồng checkout mà quên mất trạng thái hủy đơn sau khi đặt hàng của người dùng di động, vốn là một phần bắt buộc trong State Machine của đơn hàng.
2. **Bỏ sót các tiêu chuẩn GUI chi tiết**: AI bỏ qua các ràng buộc giao diện di động như thứ tự di chuyển tiêu điểm khi dùng bàn phím (Tab Order - FR-21), sự tồn tại bắt buộc của Breadcrumb (FR-23), và quy tắc hiển thị lỗi form nằm phía TRÊN nút hành động (FR-22).
3. **Bỏ sót xử lý biên của công thức tính tiền**: AI chưa thiết kế trường hợp giá trị giảm cố định của mã giảm giá lớn hơn tổng tiền của giỏ hàng, dẫn đến nguy cơ hệ thống tính toán ra số tiền âm.
4. **Bổ sung kiểm thử chống gửi trùng lặp**: Hiện thực hóa kịch bản "Double Submit" khi mạng có độ trễ cao thành một ca kiểm thử cụ thể (`TC-025`) để bảo vệ dữ liệu hệ thống.

---

## PHẦN 4: QUY TRÌNH BÁO CÁO LỖI & BIỂU MẪU

### 1. Phân loại Mức độ Nghiêm trọng (Severity) và Độ ưu tiên (Priority)
*   **Severity**:
    *   `Block`: Ứng dụng di động bị crash văng ra màn hình chủ điện thoại (force close) khi nhấn đặt hàng.
    *   `Critical`: Backend chấp nhận giá trị `total_amount` sai lệch do client gửi lên mà không kiểm tra lại (lỗ hổng bảo mật thanh toán thất thoát doanh thu).
    *   `Major`: Mã giảm giá hợp lệ nhưng ứng dụng báo lỗi không áp dụng được; giỏ hàng không bị xóa sau khi đặt hàng thành công.
    *   `Minor`: Tiền hiển thị sai định dạng dấu chấm phân cách; giao diện bị tràn viền hoặc lệch nút trên các màn hình điện thoại có kích thước khác nhau.
*   **Priority**:
    *   `P0`: Sửa ngay lập tức (crash ứng dụng, bypass số tiền thanh toán).
    *   `P1`: Sửa trước khi release ứng dụng lên App Store / Google Play.
    *   `P2`: Sửa trong bản cập nhật tiếp theo.
    *   `P3`: Cải tiến trải nghiệm người dùng.

### 2. Biểu mẫu báo cáo lỗi trên GitHub (Markdown Template)

```markdown
# [BUG][mobile-checkout] <Mô tả ngắn gọn lỗi hiển thị/chức năng thanh toán di động>

## Found by Test Case
- **Test Case ID**: [Điền mã TC phát hiện lỗi, ví dụ: TC-MOBILE-CHECKOUT-013]

## Related Requirement
- **Requirement ID**: FR-20, FR-12

## Severity / Priority
- **Severity**: [Block / Critical / Major / Minor]
- **Priority**: [P0 / P1 / P2 / P3]

## Environment
- **Device**: [Ví dụ: iPhone 15 Pro / Samsung Galaxy S23]
- **OS Version**: [Ví dụ: iOS 17.2 / Android 14]
- **App Version**: [Ví dụ: v1.0.0-RC2]

## Steps to reproduce
1. Đăng nhập tài khoản `test@eshop.com` trên ứng dụng di động.
2. Thêm sản phẩm trị giá 450.000 ₫ vào giỏ hàng.
3. Sử dụng công cụ proxy để can thiệp request và thay đổi tham số `total_amount` gửi lên thành `10000` (10.000 ₫).
4. Nhấn đặt hàng trên ứng dụng di động.

## Expected result
- Backend phát hiện số tiền sai lệch, từ chối giao dịch và trả về lỗi 400 Bad Request. Không tạo đơn hàng (FR-12).

## Actual result
- Backend chấp nhận giao dịch, trừ tiền đơn hàng 10.000 ₫ và tạo đơn hàng thành công trong hệ thống.

## Evidence
- [Chèn ảnh chụp màn hình hoặc video quay màn hình lỗi: ![Video/Screenshot](/path/to/evidence.mp4)]
```

### 3. Nhãn dán (Labels) bắt buộc phải gắn trên GitHub Issue:
*   `type: bug`
*   `module: mobile-checkout`
*   `severity: [block | critical | major | minor]`
*   `priority: [p0 | p1 | p2 | p3]`
*   `status: new`
*   `found-by: test-case`

### 4. Quy trình Retest và Đóng lỗi (Closure Checklist):
1.  **Build Verification**: Kiểm tra phiên bản build mới nhất của ứng dụng di động (file APK/IPA hoặc Expo build) đã được cập nhật bản sửa lỗi.
2.  **Clean Data**: Xóa dữ liệu ứng dụng (clear app data) hoặc cài đặt lại ứng dụng để xóa sạch cache.
3.  **Retest Execution**: Thực hiện lại chính xác các bước tái hiện trong báo cáo lỗi.
4.  **Regression Check**: Chạy lại các ca kiểm thử liên quan xung quanh (Happy Path TC-001, áp dụng mã giảm giá khác, kiểm tra định dạng tiền tệ) để đảm bảo không phát sinh lỗi hồi quy.
5.  **Write Retest Comment & Close**: Chỉ có kiểm thử viên phát hiện lỗi mới có quyền đóng Issue sau khi viết bình luận xác nhận thành công kèm video quay màn hình thiết bị di động thực tế chứng minh.
