# Task 2 — Usability Evaluation Report

## 1. Objectives
Mục tiêu của bài usability evaluation này là đánh giá luồng "Đăng nhập → Quên mật khẩu → Đăng nhập lại" trên hệ thống EShop (Vietnamese e-commerce demo), nhằm trả lời các câu hỏi sau:
- **Discoverability**: Người dùng có tự tìm được lối vào chức năng "Quên mật khẩu" từ trang Đăng nhập hay không?
- **Friction Points**: Người dùng gặp trở ngại/nghẽn (bottleneck) ở bước nào trong luồng reset mật khẩu (nhập email, nhập mã OTP, nhập mật khẩu mới, đăng nhập lại)?
- **Error Recovery**: Người dùng có hiểu rõ thông báo lỗi khi nhập sai (email không tồn tại, mật khẩu không đạt yêu cầu) và biết cách sửa không?
- **Trust (Độ tin cậy)**: Người dùng cảm thấy tự tin/an tâm đến mức nào khi thực hiện thao tác đổi mật khẩu trên hệ thống?
- **Efficiency**: Thời gian hoàn thành toàn bộ luồng trung bình là bao lâu, có bước nào gây chậm trễ bất thường không?

Chi tiết các mục tiêu và kế hoạch có thể xem tại [objectives.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task2_Usability/plan/objectives.md).

## 2. Method
- **Task Scenario**: Người dùng thử đăng nhập nhưng sai mật khẩu, sau đó tìm cách đặt lại mật khẩu mới để đăng nhập lại thành công vào tài khoản. Chi tiết kịch bản tại [scenario.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task2_Usability/plan/scenario.md).
- **Instruments**: Sử dụng bảng câu hỏi System Usability Scale (SUS) gồm 10 câu để đánh giá định lượng, kết hợp 4 nhóm câu hỏi đào sâu (Probe Questions) về sự rõ ràng, khả năng phục hồi lỗi, tốc độ và độ tin cậy để đánh giá định tính.
- **Participants**: Gồm 7 người dùng thực tế tham gia thực hiện nhiệm vụ (roster chi tiết xem tại [roster.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task2_Usability/participants/roster.md)).
- **Pilot**: Chạy thử nghiệm pilot với participant P01 vào ngày 01/08/2026, phát hiện lỗi nghiêm trọng liên quan đến Regex mật khẩu mới và cách hiển thị OTP công khai trên UI (chi tiết tại [pilot-notes.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task2_Usability/pilot/pilot-notes.md)).

## 3. Results
- **SUS Scores**: Điểm SUS trung bình của 7 phiên kiểm thử đạt **46.79 / 100**, được xếp hạng định tính là **Poor (Yếu)** và nằm trong vùng **Not Acceptable (Không thể chấp nhận)**. Bảng điểm chi tiết xem tại [sus-scores.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task2_Usability/results/sus-scores.md).
- **Findings & Bugs**: Gom nhóm được 4 Pain Points hệ thống (trong đó có 1 Blocker và 3 Major Issues). Đã log thành công 3 Bug Reports lên GitHub Issues. Chi tiết danh sách lỗi xem tại [findings.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task2_Usability/results/findings.md).

## 4. Discussion & Recommendations

### Phân tích nguyên nhân & Bottleneck chính:
1. **Tỷ lệ hoàn thành nhiệm vụ là 0% (7/7 thất bại)**:
   - Nguyên nhân trực tiếp là do lỗi logic Regex kiểm tra độ mạnh mật khẩu mới ở trang frontend (`BUG-FORGOT-006`). Regex này bắt buộc mật khẩu phải chứa ký tự khoảng trắng (`\s`) thay vì kiểm tra các ký tự đặc biệt thông dụng, làm cho mọi nỗ lực đặt mật khẩu chuẩn bảo mật cao của người dùng đều bị báo "Mật khẩu quá yếu".
2. **Nghi ngờ lớn về tính bảo mật (Trust Flaw)**:
   - Việc mã OTP được hiển thị trực tiếp ngay dưới dạng thông báo thành công trên giao diện web (UI) khiến nhiều người dùng (đặc biệt là P05 và P06) hoang mang cực độ và đặt câu hỏi về mức độ an toàn dữ liệu của EShop.
3. **Friction về hiển thị & Tương tác**:
   - Thiếu trường "Xác nhận mật khẩu mới" (`BUG-FORGOT-005`) và thiếu tính năng ẩn/hiện mật khẩu (con mắt) làm người dùng gặp khó khăn trong việc kiểm chứng xem mình đã gõ gì, đặc biệt trong bối cảnh hệ thống liên tục báo lỗi mật khẩu yếu.

### Đề xuất khuyến nghị cải tiến:
- **Khắc phục khẩn cấp Regex kiểm tra mật khẩu**: Thay đổi Regex từ bắt buộc khoảng trắng sang kiểm tra ký tự đặc biệt chuẩn bảo mật (`[!@#$%^&*(),.?":{}|<>]`).
- **Ẩn mã OTP và gửi qua Email**: Sửa lại cơ chế sinh OTP ở backend để gửi trực tiếp vào email người dùng đăng ký thay vì hiển thị trực tiếp lên UI.
- **Bổ sung các yếu tố giao diện tối thiểu**: Thêm trường xác nhận mật khẩu, thêm nút toggle ẩn/hiện mật khẩu, và thêm thanh đo độ mạnh mật khẩu trực quan (màu sắc xanh/đỏ/vàng) để người dùng phục hồi lỗi tốt hơn.
- **Tự động chuyển hướng**: Chuyển hướng người dùng về trang Đăng nhập ngay sau khi đặt lại mật khẩu thành công kèm thông báo rõ ràng (`BUG-FORGOT-008`).

## 5. Appendix
Nhật ký chi tiết các phiên quan sát thực tế (Timeline, verbatim quotes, SUS scores):
- [Session P01](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task2_Usability/sessions/session-P01.md)
- [Session P02](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task2_Usability/sessions/session-P02.md)
- [Session P03](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task2_Usability/sessions/session-P03.md)
- [Session P04](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task2_Usability/sessions/session-P04.md)
- [Session P05](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task2_Usability/sessions/session-P05.md)
- [Session P06](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task2_Usability/sessions/session-P06.md)
- [Session P07](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task2_Usability/sessions/session-P07.md)
