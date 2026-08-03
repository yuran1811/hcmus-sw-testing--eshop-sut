# Kế hoạch Đánh giá Usability (Usability Test Plan)

## 1. Thông tin chung (Metadata)
- **Ngày lập kế hoạch**: 03/08/2026
- **Hệ thống đánh giá (SUT)**: EShop (React Frontend Web)
- **URL thử nghiệm**: `http://localhost:5173`
- **Luồng nghiệp vụ đánh giá**: Đăng ký tài khoản mới → Đăng nhập hệ thống
- **Mã yêu cầu đặc tả (FR)**: [FR-01 (Đăng ký tài khoản)](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/README.md#L30-L36), [FR-02 (Đăng nhập & Khóa tài khoản)](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/README.md#L38-L44)
- **Khía cạnh giao diện (IA)**: IA-01 (General UI), IA-02 (Forms), IA-03 (Navigation), IA-04 (Feedback/State)
- **Thời lượng tối đa (Timebox)**: 15–20 phút/session
- **Điều phối viên (Moderator)**: [Họ tên sinh viên]
- **Thiết bị thử nghiệm**: Máy tính cá nhân (PC/Laptop), sử dụng trình duyệt Web chuẩn (Chrome, Firefox, Edge hoặc Safari).

---

## 2. Mục tiêu đánh giá (Objectives)
Thiết kế đo lường trải nghiệm người dùng thực tế xoay quanh 4 mục tiêu cụ thể sau:
1. **Khả năng điều hướng & Tìm kiếm lối vào (IA-03)**: Người dùng có dễ dàng tự tìm thấy liên kết chuyển sang trang Đăng ký từ trang Đăng nhập hoặc trang chủ và ngược lại mà không cần trợ giúp không?
2. **Trải nghiệm điền biểu mẫu & Ràng buộc nhập liệu (IA-02, FR-01)**: Đánh giá xem các quy tắc mật khẩu mạnh (tối thiểu 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt) và trường "Xác nhận mật khẩu" có gây khó khăn hoặc nhầm lẫn cho người dùng khi điền form hay không.
3. **Hiệu quả phản hồi lỗi & Phục hồi lỗi (IA-04, FR-01, FR-02)**: Người dùng có hiểu rõ nguyên nhân lỗi (ví dụ: email không đúng định dạng, mật khẩu yếu, mật khẩu xác nhận không khớp, đăng nhập sai nhiều lần) qua các thông báo hiển thị trên giao diện và tự sửa lỗi thành công hay không.
4. **Nhận thức về trạng thái hệ thống (IA-04)**: Đánh giá độ tin cậy và sự rõ ràng của giao diện khi đăng ký thành công (có thông báo rõ ràng, tự chuyển trang) và khi đăng nhập thành công (hiển thị thông tin tài khoản, thay đổi trạng thái đăng nhập).

---

## 3. Kịch bản tác vụ (Task Scenario)

### Bối cảnh (Moderator đọc cho Participant nghe)
> "Bạn chưa từng mua hàng trên EShop và chưa có tài khoản. Bạn muốn tạo một tài khoản mới để bắt đầu sử dụng dịch vụ mua sắm của cửa hàng, sau đó đăng nhập thử vào hệ thống."

### Nhiệm vụ giao cho Participant (Goal-only)
> "Hãy thực hiện đăng ký một tài khoản mới bằng họ tên của bạn và email là `user_test_usability@eshop.com`. Mật khẩu của tài khoản do bạn tự chọn nhưng phải đảm bảo an toàn theo yêu cầu của hệ thống. Sau khi đăng ký thành công, hãy dùng tài khoản vừa tạo để đăng nhập vào hệ thống.
> 
> Tác vụ hoàn thành khi bạn đăng nhập thành công và hệ thống hiển thị màn hình chứng minh bạn đã đăng nhập (như trang chủ hiển thị tên của bạn hoặc trang thông tin tài khoản cá nhân)."

> [!WARNING]
> Điều phối viên tuyệt đối **không** hướng dẫn từng bước click (ví dụ: *"Bấm vào nút Đăng ký ở góc phải, điền ô tên, rồi bấm Tiếp tục..."*). Hãy để người dùng tự khám phá.

### Câu nhắc nói thành tiếng (Think-aloud Prompt)
> "Trong suốt quá trình thực hiện, xin vui lòng nói to tất cả những suy nghĩ, cảm xúc của bạn — kể cả khi bạn phân vân, không chắc chắn nên bấm vào đâu, hoặc cảm thấy thông tin hiển thị khó hiểu. Không có câu trả lời đúng hay sai, chúng tôi đang kiểm thử giao diện của hệ thống chứ không phải kiểm thử bạn."

---

## 4. Dữ liệu kiểm thử (Test Data)

| Trường thông tin | Dữ liệu hợp lệ mẫu | Dữ liệu không hợp lệ mẫu (để kiểm tra phục hồi lỗi) | Ràng buộc nghiệp vụ theo đặc tả |
| :--- | :--- | :--- | :--- |
| **Họ Tên** | `Nguyễn Văn A` | ` ` (để trống) | Không được bỏ trống. |
| **Email** | `user_test_usability@eshop.com` | `usertest@` (thiếu domain)<br>`user_test_usability` | Định dạng chuẩn `user@domain.com` và là duy nhất. |
| **Mật khẩu** | `User123!` | `12345` (quá ngắn)<br>`user1234` (thiếu chữ hoa, ký tự đặc biệt)<br>`USER1234` (thiếu chữ thường, ký tự đặc biệt) | Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt (`@$!%*?&`). |
| **Xác nhận mật khẩu**| Khớp với mật khẩu trên | `User123#` (không khớp) | Phải khớp hoàn toàn với trường Mật khẩu. |

---

## 5. Các điều kiện kiểm thử (Conditions)

### Trạng thái khởi đầu (Start State)
- Trình duyệt Chrome đang mở ở trang chủ EShop (`http://localhost:5173`) hoặc trang Đăng nhập (`http://localhost:5173/login`). Người dùng chưa đăng nhập bất kỳ tài khoản nào.
- Cơ sở dữ liệu của EShop chưa tồn tại tài khoản `user_test_usability@eshop.com` (nếu có, Moderator cần xóa trước phiên test).

### Điều kiện thành công (Success Criteria)
- Participant thực hiện đăng ký thành công và đăng nhập thành công bằng thông tin tài khoản mới.
- Hệ thống ghi nhận session và hiển thị trạng thái đã đăng nhập (hiển thị tên người dùng hoặc nút đăng xuất).
- Người dùng thực hiện độc lập, không có sự chỉ dẫn trực tiếp các bước bấm từ Moderator.

### Điều kiện thất bại/Khóa (Failure Criteria)
- Participant xin bỏ cuộc vì không thể vượt qua các bước điền form/sửa lỗi.
- Vượt quá thời lượng timebox (20 phút) mà vẫn chưa đăng nhập thành công.
- Moderator phải can thiệp chỉ dẫn cụ thể các bước bấm nút hoặc sửa lỗi thì mới đi tiếp được (tính là cần trợ giúp và thất bại một phần).

### Tình huống lệch hướng (Deviations)
- Người dùng truy cập nhầm vào trang quản trị admin (`http://localhost:5174`) thay vì trang dành cho khách hàng.
- Hệ thống bị treo, không phản hồi hoặc gặp lỗi cơ sở dữ liệu (Crash) do lỗi code của SUT.

---

## 6. Checklist chuẩn bị trước Session (Pre-session Checklist)
- [ ] **Kiểm tra kỹ thuật**: Đảm bảo cổng chạy Frontend (`5173`) và Backend (`3000`) đang hoạt động ổn định. Đảm bảo xóa sạch tài khoản thử nghiệm cũ `user_test_usability@eshop.com` khỏi DB.
- [ ] **Chuẩn bị ghi hình**: Thiết lập công cụ quay màn hình và thu âm giọng nói (đảm bảo camera/mic hoạt động tốt và đã có sự đồng ý của participant).
- [ ] **Bản đồng ý (Consent Form)**: Đọc sơ lược và lấy chữ ký/xác nhận đồng ý tham gia test và ghi hình của người dùng.
- [ ] **Đọc bối cảnh và hướng dẫn**: Đọc rõ ràng phần "Bối cảnh", "Nhiệm vụ", và câu nhắc "Think-aloud" cho người dùng nghe.
- [ ] **Nhắc nhở quan trọng**: Nhắc người dùng rằng họ được tự do dừng cuộc thử nghiệm bất cứ lúc nào nếu cảm thấy quá mệt mỏi hoặc không thoải mái.
- [ ] **Vào trạng thái bắt đầu**: Mở trang web EShop lên màn hình đăng nhập và bàn giao chuột/bàn phím cho người dùng.
