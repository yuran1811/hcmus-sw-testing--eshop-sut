# BÁO CÁO THIẾT KẾ KIỂM THỬ: QUÊN MẬT KHẨU & ĐẶT LẠI MẬT KHẨU (FR-03)

Báo cáo thiết kế ca kiểm thử này áp dụng kỹ thuật Phân vùng tương đương (EP) và Phân tích giá trị biên (BVA) để xây dựng một bộ ca kiểm thử tối ưu và hoàn chỉnh về mặt toán học cho tính năng Quên mật khẩu & Đặt lại mật khẩu (gồm 2 bước) và các yêu cầu giao diện form liên quan (FR-22).

---

## PHẦN 1: PHÂN TÍCH PHÂN VÙNG TƯƠNG ĐƯƠNG (EP) & GIÁ TRỊ BIÊN (BVA)

### 1. Phân tích các tham số đầu vào và Phân vùng tương đương (EP)

Chúng ta chia các tham số đầu vào (`email`, `otp`, `newPassword`, `confirmNewPassword`) và các quyết định logic thành các phân vùng hợp lệ (Valid Partitions) và không hợp lệ (Invalid Partitions) như sau:

| Tham số nhập liệu | Phân vùng hợp lệ (Valid Partitions) | Phân vùng không hợp lệ (Invalid Partitions) |
| --- | --- | --- |
| **Email** (Bước 1) | **EP-IN-EMAIL-1**: Email đã đăng ký trong hệ thống.<br>*Giá trị đại diện: test@eshop.com* | **EP-IN-EMAIL-2-INV**: Để trống trường Email.<br>*Giá trị đại diện: ""*<br><br>**EP-IN-EMAIL-3-INV**: Email chưa đăng ký trong hệ thống.<br>*Giá trị đại diện: unregistered@eshop.com*<br><br>**EP-IN-EMAIL-4-INV**: Email sai định dạng cú pháp.<br>*Giá trị đại diện: invalid-email* |
| **OTP** (Bước 2) | **EP-IN-OTP-1**: Mã OTP đúng 6 chữ số sinh ra cho email hiện tại.<br>*Giá trị đại diện: 123456* | **EP-IN-OTP-2-INV**: Để trống trường OTP.<br>*Giá trị đại diện: ""*<br><br>**EP-IN-OTP-3-INV**: Độ dài OTP không đúng 6 chữ số.<br>*Giá trị đại diện: 12345, 1234567*<br><br>**EP-IN-OTP-4-INV**: OTP chứa ký tự phi số.<br>*Giá trị đại diện: 123a56*<br><br>**EP-IN-OTP-5-INV**: OTP 6 chữ số nhưng sai giá trị.<br>*Giá trị đại diện: 999999*<br><br>**EP-IN-OTP-6-INV**: OTP hợp lệ của email khác.<br>*Giá trị đại diện: 123456 (cho other@eshop.com)*<br><br>**EP-IN-OTP-7-INV**: Mã OTP đã hết hạn.<br>*Giá trị đại diện: 123456 (hết hạn)*<br><br>**EP-IN-OTP-8-INV**: Mã OTP đã được sử dụng trước đó (Replay Attack).<br>*Giá trị đại diện: 123456 (đã sử dụng)* |
| **Mật khẩu mới** (Bước 2) | **EP-IN-PASS-1**: Mật khẩu mạnh từ 8 ký tự trở lên, chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 ký tự đặc biệt cho phép.<br>*Giá trị đại diện: Reset123!* | **EP-IN-PASS-2-INV**: Để trống trường mật khẩu mới.<br>*Giá trị đại diện: ""*<br><br>**EP-IN-PASS-3-INV**: Độ dài mật khẩu quá ngắn (< 8 ký tự).<br>*Giá trị đại diện: Res123!*<br><br>**EP-IN-PASS-4-INV**: Mật khẩu thiếu chữ hoa.<br>*Giá trị đại diện: reset123!*<br><br>**EP-IN-PASS-5-INV**: Mật khẩu thiếu chữ thường.<br>*Giá trị đại diện: RESET123!*<br><br>**EP-IN-PASS-6-INV**: Mật khẩu thiếu chữ số.<br>*Giá trị đại diện: Resetxyz!*<br><br>**EP-IN-PASS-7-INV**: Mật khẩu thiếu ký tự đặc biệt.<br>*Giá trị đại diện: Reset1234*<br><br>**EP-IN-PASS-8-INV**: Mật khẩu chứa ký tự đặc biệt không được phép.<br>*Giá trị đại diện: Reset123#* |
| **Xác nhận mật khẩu** (Bước 2) | **EP-IN-CONFIRM-1**: Trùng khớp hoàn toàn với mật khẩu mới.<br>*Giá trị đại diện: Reset123!* | **EP-IN-CONFIRM-2-INV**: Để trống trường xác nhận.<br>*Giá trị đại diện: ""*<br><br>**EP-IN-CONFIRM-3-INV**: Không trùng khớp mật khẩu mới.<br>*Giá trị đại diện: Different123!* |

---

### 2. Phân tích Giá trị biên (BVA) và Biện minh kỹ thuật

Chúng ta áp dụng kỹ thuật BVA tại các ranh giới chuyển đổi logic quan trọng để đảm bảo phát hiện các lỗi lập trình biên:

*   **Độ dài mã OTP (Bước 2)**:
    *   **Kỹ thuật áp dụng**: **3-Point BVA** tại ranh giới độ dài đúng bằng 6 chữ số.
    *   **Biện minh**: Độ dài OTP là một độ dài cố định cực kỳ nghiêm ngặt (chính xác bằng 6). Việc sử dụng 3-Point BVA giúp ta kiểm tra cả giá trị biên dưới sát ranh giới (5 chữ số - Không hợp lệ), giá trị biên danh nghĩa (6 chữ số - Hợp lệ) và giá trị biên trên sát ranh giới (7 chữ số - Không hợp lệ). Điều này giúp cô lập hoàn hảo logic kiểm tra độ dài.
    *   **Giá trị biên**:
        *   `BVA-OTP-LEN-1` (Biên trái / Quá ngắn): 5 chữ số (e.g., `12345`) -> Kết quả mong đợi: Lỗi.
        *   `BVA-OTP-LEN-2` (Biên đích / Đạt chuẩn): 6 chữ số (e.g., `123456`) -> Kết quả mong đợi: Hợp lệ.
        *   `BVA-OTP-LEN-3` (Biên phải / Quá dài): 7 chữ số (e.g., `1234567`) -> Kết quả mong đợi: Lỗi.
*   **Độ dài Mật khẩu mới (Bước 2)**:
    *   **Kỹ thuật áp dụng**: **3-Point BVA** tại ngưỡng độ dài tối thiểu bằng 8 ký tự.
    *   **Biện minh**: Ngưỡng độ dài mật khẩu tối thiểu là một ranh giới một chiều (từ 8 trở lên là hợp lệ). Áp dụng 3-Point BVA giúp xác định hành vi hệ thống tại giá trị cận dưới không hợp lệ (7 ký tự), giá trị biên chính xác (8 ký tự), và giá trị biên hợp lệ (9 ký tự).
    *   **Giá trị biên**:
        *   `BVA-PASS-LEN-1` (Biên trái / Quá ngắn): 7 ký tự (e.g., `Res123!`) -> Kết quả mong đợi: Lỗi.
        *   `BVA-PASS-LEN-2` (Biên đích / Đạt chuẩn tối thiểu): 8 ký tự (e.g., `Reset123!`) -> Kết quả mong đợi: Hợp lệ.
        *   `BVA-PASS-LEN-3` (Biên phải / Vượt chuẩn): 9 ký tự (e.g., `Reset1234!`) -> Kết quả mong đợi: Hợp lệ.
*   **Trạng thái để trống (Empty Checks)**:
    *   **Kỹ thuật áp dụng**: **2-Point BVA** (để trống và không để trống).
    *   **Biện minh**: Đây là ranh giới nhị phân đơn giản giữa sự hiện diện và vắng mặt của dữ liệu.
    *   **Giá trị biên**:
        *   `BVA-EMAIL-EMPTY` (Để trống): `""` -> Lỗi.
        *   `BVA-EMAIL-NOT-EMPTY` (Có dữ liệu): `test@eshop.com` -> Hợp lệ.
        *   `BVA-OTP-EMPTY` (Để trống): `""` -> Lỗi.
        *   `BVA-PASS-EMPTY` (Để trống): `""` -> Lỗi.
        *   `BVA-CONFIRM-EMPTY` (Để trống): `""` -> Lỗi.

---

### 3. Thiết lập Cấu hình Baseline và Nguyên lý Cô lập lỗi (Error Isolation)

Để phát hiện lỗi chính xác mà không bị nhiễu do nhiều tham số sai cùng lúc, chúng ta thiết lập một cấu hình **Baseline hợp lệ (Valid Baseline)**. Mọi ca kiểm thử biên hoặc ca kiểm thử lỗi sẽ được phát triển bằng cách **chỉ thay đổi duy nhất một biến đầu vào** so với baseline, giữ nguyên toàn bộ các biến khác ở trạng thái baseline hợp lệ.

*   **Cấu hình Baseline hợp lệ**:
    *   `email = test@eshop.com` (Đã đăng ký)
    *   `otp = 123456` (OTP đúng, do hệ thống sinh ra ở môi trường demo)
    *   `newPassword = Reset123!` (Mật khẩu mạnh hợp lệ)
    *   `confirmNewPassword = Reset123!` (Trùng khớp mật khẩu mới)

---

## PHẦN 2: MA TRẬN TRUY VẾT (TRACEABILITY MATRIX)

Ma trận dưới đây chứng minh độ bao phủ toán học đầy đủ của **27 ca kiểm thử** đã được sinh ra đối với toàn bộ các Phân vùng tương đương (EP ID) và Giá trị biên (BVA ID):

| Test Case ID | Tên Ca Kiểm Thử | EP ID đã bao phủ | BVA ID đã bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| **TC-FORGOT-PASSWORD-001** | Happy Path Step 1 - Gửi OTP thành công | EP-IN-EMAIL-1 | BVA-EMAIL-NOT-EMPTY | Chuyển sang Bước 2 |
| **TC-FORGOT-PASSWORD-002** | Happy Path Step 2 - Đặt lại mật khẩu thành công | EP-IN-OTP-1, EP-IN-PASS-1, EP-IN-CONFIRM-1 | BVA-OTP-LEN-2, BVA-PASS-LEN-3 | Thành công, về Login |
| **TC-FORGOT-PASSWORD-003** | Bước 1 - Để trống Email | EP-IN-EMAIL-2-INV | BVA-EMAIL-EMPTY | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-004** | Bước 1 - Email chưa đăng ký | EP-IN-EMAIL-3-INV | N/A | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-005** | Bước 1 - Email sai định dạng | EP-IN-EMAIL-4-INV | N/A | Chặn bởi trình duyệt/BE |
| **TC-FORGOT-PASSWORD-006** | Bước 1 - Nhấp nút Quay lại đăng nhập | N/A (Điều hướng) | N/A | Quay lại trang Login |
| **TC-FORGOT-PASSWORD-007** | Bước 2 - Để trống OTP | EP-IN-OTP-2-INV | BVA-OTP-EMPTY | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-008** | Bước 2 - OTP thiếu chữ số (5 ký tự) | EP-IN-OTP-3-INV | BVA-OTP-LEN-1 (3-point BVA) | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-009** | Bước 2 - OTP thừa chữ số (7 ký tự) | EP-IN-OTP-3-INV | BVA-OTP-LEN-3 (3-point BVA) | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-010** | Bước 2 - OTP chứa chữ cái | EP-IN-OTP-4-INV | N/A | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-011** | Bước 2 - OTP sai giá trị | EP-IN-OTP-5-INV | N/A | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-012** | Bước 2 - OTP của email khác | EP-IN-OTP-6-INV | N/A | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-013** | Bước 2 - Để trống Mật khẩu mới | EP-IN-PASS-2-INV | BVA-PASS-EMPTY | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-014** | Bước 2 - Mật khẩu mới quá ngắn (7 ký tự) | EP-IN-PASS-3-INV | BVA-PASS-LEN-1 (3-point BVA) | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-015** | Bước 2 - Mật khẩu mới thiếu chữ hoa | EP-IN-PASS-4-INV | N/A | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-016** | Bước 2 - Mật khẩu mới thiếu chữ thường | EP-IN-PASS-5-INV | N/A | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-017** | Bước 2 - Mật khẩu mới thiếu chữ số | EP-IN-PASS-6-INV | N/A | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-018** | Bước 2 - Mật khẩu mới thiếu ký tự đặc biệt | EP-IN-PASS-7-INV | N/A | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-019** | Bước 2 - Mật khẩu chứa ký tự đặc biệt sai | EP-IN-PASS-8-INV | N/A | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-020** | Bước 2 - Để trống Xác nhận mật khẩu | EP-IN-CONFIRM-2-INV | BVA-CONFIRM-EMPTY | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-021** | Bước 2 - Xác nhận mật khẩu không khớp | EP-IN-CONFIRM-3-INV | N/A | Chặn, báo lỗi trên nút |
| **TC-FORGOT-PASSWORD-022** | Bước 2 - Kiểm tra ẩn mật khẩu (Masking) | N/A (GUI) | N/A (GUI) | Ký tự ẩn dạng `●`, type="password" |
| **TC-FORGOT-PASSWORD-023** | Xác thực nhãn bắt buộc & vị trí lỗi | N/A (GUI) | N/A (GUI) | Có nhãn `*`, lỗi trên nút submit |
| **TC-FORGOT-PASSWORD-024** | Bước 2 - Mật khẩu mới có độ dài tối thiểu đạt chuẩn (8 ký tự) | EP-IN-PASS-1 | BVA-PASS-LEN-2 (3-point BVA) | Đặt lại mật khẩu thành công |
| **TC-FORGOT-PASSWORD-025** | Bước 1 - Email đăng ký chữ thường nhưng yêu cầu OTP bằng chữ hoa | EP-IN-EMAIL-1 | N/A | Chấp nhận không phân biệt chữ hoa/thường, gửi OTP thành công |
| **TC-FORGOT-PASSWORD-026** | Bước 2 - Đặt lại mật khẩu với mã OTP đã hết hạn | EP-IN-OTP-7-INV | N/A | Chặn, báo lỗi OTP đã hết hạn |
| **TC-FORGOT-PASSWORD-027** | Bước 2 - Đặt lại mật khẩu với mã OTP đã được sử dụng (Replay Attack) | EP-IN-OTP-8-INV | N/A | Chặn, báo lỗi OTP đã được sử dụng |

---

## PHẦN 3: KHUNG PHÂN TÍCH LỖ HỔNG AI (AI GAP ANALYSIS FRAMEWORK)

Khung phân tích dưới đây hướng dẫn người đánh giá (kiểm thử viên con người) rà soát các trường hợp biên nâng cao, logic nghiệp vụ phức tạp hoặc trạng thái chạy bất đồng bộ mà mô hình AI có thể bỏ sót trong quá trình thiết kế tĩnh:

| Các khía cạnh nghiệp vụ cần rà soát | Tình huống kiểm thử tiềm năng (Gaps) | Nguyên nhân kỹ thuật khiến AI dễ bỏ sót (Root Causes) |
| --- | --- | --- |
| **Hiệu lực và Thời gian của OTP** | - Gửi mã OTP, đợi 5 phút (hết hạn OTP) mới thực hiện nhập để đặt lại mật khẩu.<br>- Sử dụng lại mã OTP cũ đã được xác thực thành công trước đó (Replay Attack). | AI chỉ phân tích tài liệu tĩnh, không có nhận thức về thời gian thực (temporal awareness) hoặc cơ chế hết hạn phiên lưu trữ (session expiration) trên server. |
| **Chống Spam & Tần suất yêu cầu (Rate Limiting)** | - Nhấp liên tục nút "Gửi mã OTP" 10 lần trong 1 phút.<br>- Gửi yêu cầu OTP liên tiếp từ các địa chỉ IP khác nhau cho cùng một email. | AI tập trung vào logic chức năng trực diện (functional flow) thay vì các khía cạnh an toàn phi chức năng (non-functional/security requirements) và cấu hình hạ tầng mạng. |
| **Giới hạn số lần thử sai (Brute Force Protection)** | - Nhập sai mã OTP liên tiếp quá 5 lần tại Bước 2. Hệ thống có khóa tài khoản hoặc chặn IP không? | AI thường giả định trạng thái hệ thống luôn sẵn sàng, thiếu mô hình hóa trạng thái lỗi tích lũy (cumulative error state) và cơ chế tự bảo vệ của hệ thống. |
| **Bất đồng bộ & Đồng bộ trạng thái** | - Yêu cầu gửi OTP cho email A, nhưng ngay lập tức đổi email nhập ở Bước 1 thành B bằng cách chỉnh sửa DOM hoặc gửi request trực tiếp qua API. | AI phân tích dựa trên luồng đi tuần tự của giao diện (GUI flow) nên dễ bỏ qua các lỗ hổng gửi request trực tiếp phá vỡ luồng giao diện (API bypass). |

### Phân tích Khoảng trống Thực tế (Actual AI Gap Analysis)

Trong phiên bản thiết kế đầu tiên, mô hình AI đã bỏ sót hai ca kiểm thử quan trọng về bảo mật mã OTP:
- **TC-FORGOT-PASSWORD-026**: OTP hết hạn -> Hệ thống phải từ chối.
- **TC-FORGOT-PASSWORD-027**: Sử dụng lại OTP (Replay Attack) -> Hệ thống phải từ chối.

**Nguyên nhân gốc rễ (Root Causes):**
- **Giới hạn phạm vi của Prompt ban đầu**: Prompt yêu cầu ban đầu của người dùng chỉ cung cấp và tham chiếu trực tiếp đến đặc tả chức năng **FR-03** (Quên mật khẩu & Đặt lại mật khẩu) và đặc tả giao diện **FR-22**, hoàn toàn không đề cập hoặc liên kết đến các yêu cầu bảo mật hệ thống chung như **SEC-07** (quy định về thời gian hết hạn OTP và chống tấn công phát lại). Do đó, mô hình AI chỉ tập trung tối ưu hóa các phân vùng dữ liệu đầu vào tĩnh và các ràng buộc độ dài/định dạng trực tiếp trên giao diện, dẫn đến việc bỏ qua các quy tắc bảo mật động/temporal.
- **Thiếu mô hình hóa trạng thái phi chức năng (Non-functional State Modeling)**: Nếu không được chỉ dẫn rõ ràng bằng các tiêu chuẩn bảo mật hoặc tài liệu kiểm soát bảo mật (như SEC-07), AI có xu hướng mặc định hệ thống hoạt động trong môi trường lý tưởng (happy state), không tự động suy luận ra các kịch bản lạm dụng hệ thống phức tạp (abuse cases) hoặc tấn công an ninh mạng.

---

## PHẦN 4: QUY TRÌNH BÁO CÁO LỖI & BIỂU MẪU

### 1. Phân loại Mức độ Nghiêm trọng (Severity) và Độ ưu tiên (Priority)
Chúng ta áp dụng phân loại chuẩn nghiệp vụ dự án thực tế:
*   **Mức độ nghiêm trọng (Severity)**:
    *   `Block`: Gây sập hệ thống, mất dữ liệu, hoặc không thể tiếp tục thực hiện kiểm thử.
    *   `Critical`: Lỗi bảo mật nghiêm trọng (bypass OTP, lộ mật khẩu), lỗi chức năng chính không hoạt động (không gửi được OTP đúng, không lưu được mật khẩu mới).
    *   `Major`: Lỗi chức năng nhỏ hơn, hoặc không tuân thủ các form bắt buộc (nhập ký tự đặc biệt sai mà vẫn nhận, không ẩn mật khẩu).
    *   `Minor`: Lỗi hiển thị, sai vị trí thông báo lỗi, sai Step Indicator.
*   **Độ ưu tiên xử lý (Priority)**:
    *   `P0`: Sửa lỗi ngay lập tức, chặn đứng luồng làm việc.
    *   `P1`: Sửa lỗi trước khi phát hành sprint hiện tại.
    *   `P2`: Sửa lỗi trong phiên bản tiếp theo.
    *   `P3`: Sửa lỗi khi có thời gian trống hoặc cải tiến trải nghiệm.

### 2. Biểu mẫu báo cáo lỗi trên GitHub (Markdown Template)

Khi phát hiện lỗi trong quá trình thực hiện các ca kiểm thử trên, kiểm thử viên soạn thảo báo cáo lỗi theo định dạng chuẩn sau:

```markdown
# [BUG][forgot-password] <Tiêu đề ngắn gọn mô tả lỗi>

## Found by Test Case
- **Test Case ID**: [Điền mã TC kích hoạt lỗi, ví dụ: TC-FORGOT-PASSWORD-011]

## Related Requirement
- **Requirement ID**: [Ví dụ: FR-03]

## Severity / Priority
- **Severity**: [Block / Critical / Major / Minor]
- **Priority**: [P0 / P1 / P2 / P3]

## Environment
- **URL**: http://localhost:5173
- **Browser**: [Ví dụ: Chrome v120.0.0, Firefox v121.0]
- **OS**: [Ví dụ: Windows 11, macOS Sonoma]

## Steps to reproduce
1. Truy cập trang chủ EShop tại `http://localhost:5173`.
2. Đi tới trang đăng nhập và chọn "Quên mật khẩu?".
3. [Điền các bước chi tiết dẫn tới lỗi...]

## Expected result
- [Mô tả kết quả đúng theo đặc tả yêu cầu...]

## Actual result
- [Mô tả chi tiết hành vi sai sót thực tế xảy ra của hệ thống...]

## Evidence
- [Chèn ảnh chụp màn hình minh họa lỗi hoặc log console tại đây: ![Screenshot](/path/to/screenshot.png)]
```

### 3. Nhãn dán (Labels) bắt buộc phải gắn trên GitHub Issue:
Mỗi báo cáo lỗi khi tạo trên GitHub bắt buộc phải đính kèm đầy đủ các nhãn sau để phục vụ quản lý tự động:
*   `type: bug`
*   `module: forgot-password`
*   `severity: [block | critical | major | minor]`
*   `priority: [p0 | p1 | p2 | p3]`
*   `status: new`
*   `found-by: test-case`

### 4. Quy trình Retest và Đóng lỗi (Closure Checklist):
Sau khi lập trình viên sửa lỗi và gửi Pull Request (PR), kiểm thử viên thực hiện quy trình xác nhận lại lỗi:
1.  **Xác nhận PR**: Đảm bảo PR liên quan đến lỗi đã được review và merge hoàn toàn vào nhánh chính (`main` / `develop`).
2.  **Cập nhật môi trường**: Kéo code mới nhất về môi trường kiểm thử cục bộ và khởi chạy lại hệ thống.
3.  **Chạy lại ca kiểm thử (Retest)**: Thực hiện lại chính xác các bước trong mục "Steps to reproduce" của báo cáo lỗi.
4.  **Viết bình luận xác nhận (Retest Comment)**: Viết bình luận rõ ràng trên Issue, ghi rõ kết quả chạy lại kèm theo bằng chứng (ảnh chụp/log mới).
    *   *Mẫu bình luận: "Retested successfully on build [commit-hash]. The bug is resolved. Evidence: [link_image]"*
5.  **Đóng lỗi (Tester-Only Closure)**: **Chỉ có kiểm thử viên phát hiện lỗi hoặc Test Lead mới có quyền đóng (Close) Issue này.** Lập trình viên tuyệt đối không tự ý đóng Issue khi chưa có xác nhận từ QC.
