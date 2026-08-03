# Kế hoạch Chạy thử (Pilot Session Plan)

## 1. Mục đích của buổi Pilot
Trước khi tiến hành đánh giá usability chính thức với 7 người dùng thực tế, điều phối viên (Moderator) cần thực hiện 1 buổi chạy thử (Pilot Run) nhằm:
- **Kiểm tra Kịch bản tác vụ**: Đảm bảo kịch bản (Task Scenario) rõ ràng, thực tế, dễ hiểu đối với đối tượng người dùng Non-IT và không chứa các từ ngữ định hướng giao diện (không vi phạm nguyên tắc goal-only).
- **Kiểm tra Hệ thống (SUT)**: Xác nhận luồng nghiệp vụ trên hệ thống EShop (đặc biệt là trang Đăng ký và Đăng nhập) hoạt động trơn tru, không có lỗi kỹ thuật (crash, loop) chặn đứng hành trình của người dùng.
- **Thử nghiệm Bộ câu hỏi**: Đảm bảo 10 câu hỏi SUS và 10 câu hỏi phỏng vấn sâu (Probes) dễ hiểu, người tham gia không gặp khó khăn khi chọn điểm số hoặc trả lời phỏng vấn.
- **Đo lường thời gian**: Đánh giá xem thời lượng dự kiến (15-20 phút) có đủ để hoàn tất toàn bộ quy trình hay không để kịp thời điều chỉnh timeline.

---

## 2. Thông tin buổi Pilot dự kiến
- **Ngày thực hiện**: 04/08/2026
- **Thời lượng dự kiến**: 20-30 phút
- **Đối tượng tham gia Pilot**: 1 người dùng chạy thử (thường là một người quen có hồ sơ gần giống mục tiêu tuyển chọn, hoặc có thể sử dụng dữ liệu của P01 nếu quá trình chạy diễn ra chuẩn chỉ nhưng hệ thống gặp lỗi đặc thù không sửa được).
- **Trạng thái môi trường**: Chạy cục bộ Frontend (`http://localhost:5173`) và Backend (`http://localhost:3000`).

---

## 3. Checklist đánh giá kết quả Pilot

Điều phối viên sẽ đánh giá buổi chạy thử dựa trên các tiêu chí sau:

- [ ] **Scenario Clarity**: Người dùng có hiểu ngay mục tiêu cần đạt được mà không cần Moderator giải thích thêm không?
- [ ] **SUT Reliability**: Có lỗi kỹ thuật nghiêm trọng nào từ mã nguồn hệ thống chặn đứng tiến trình không? (Nếu có và không được phép sửa SUT, chuẩn bị kịch bản ứng phó cho Moderator để ghi nhận hành vi).
- [ ] **Task Completeness**: Người dùng có hoàn thành luồng đăng ký & đăng nhập trong thời gian cho phép hay không?
- [ ] **Instrument Understanding**: Người dùng có hiểu nghĩa tiếng Việt của 10 câu hỏi SUS không? Có cần giải thích thêm câu hỏi nào không?
- [ ] **Probe Flow**: Các câu hỏi phỏng vấn sâu có kích thích người dùng chia sẻ những điểm ức chế (friction) hoặc điểm hài lòng không?
- [ ] **Moderator Bias**: Moderator có vô tình hướng dẫn hoặc nhắc nhở cách click chuột trong suốt quá trình không? (Cần tự đánh giá lại qua video ghi hình).
