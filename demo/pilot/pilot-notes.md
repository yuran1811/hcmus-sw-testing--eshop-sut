# Nhật ký & Kết quả Chạy thử (Pilot Notes)

*Tài liệu này dùng để điều phối viên ghi nhận nhanh các phát hiện ngay sau buổi Pilot Run, phục vụ cho việc tinh chỉnh tài liệu và quy trình trước khi chạy 7 phiên chính thức.*

---

## 1. Nhật ký phiên chạy thử (Pilot Session Record)
- **Ngày thực hiện**: [Điền ngày]
- **Thời lượng thực tế**: [Điền số phút] phút
- **Người chạy thử (Pilot Participant)**: [Họ tên / ID người tham gia]
- **Tình trạng hoàn thành tác vụ**: [ ] Thành công / [ ] Thất bại / [ ] Thất bại một phần (cần can thiệp)

---

## 2. Các vấn đề phát hiện (Issues Found)

### 2.1. Vấn đề từ kịch bản tác vụ & câu hỏi (Scenario & Instrument Issues)
- **Mức độ rõ ràng của kịch bản**: [Ví dụ: Người dùng có hiểu từ "mật khẩu an toàn" không? Có bị nhầm lẫn giữa Đăng ký và Quên mật khẩu không?]
- **Bộ câu hỏi SUS & Probes**: [Ví dụ: Người dùng có bị bối rối bởi câu hỏi SUS số 4 hay số 10 không? Có cần viết lại bằng từ ngữ bình dân hơn không?]

### 2.2. Lỗi/Trở ngại kỹ thuật từ hệ thống SUT (SUT Technical Issues & Bugs)
- **Lỗi Regex mật khẩu (nếu có)**: [Ví dụ: Regex yêu cầu khoảng trắng hoặc ký tự đặc biệt cụ thể nhưng thông báo lỗi không ghi rõ, gây nghẽn].
- **Lỗi đồng bộ dữ liệu**: [Ví dụ: Đăng ký thành công nhưng khi đăng nhập ngay lập tức hệ thống báo lỗi không tồn tại tài khoản hoặc bị delay].
- **Lỗi phản hồi giao diện**: [Ví dụ: Nút bấm Đăng ký không hiển thị trạng thái Loading hoặc Toast thông báo thành công biến mất quá nhanh].

---

## 3. Các thay đổi và tinh chỉnh áp dụng (Adjustments Applied)

*Dựa trên các vấn đề trên, điều phối viên đưa ra quyết định điều chỉnh quy trình:*

| Vấn đề phát hiện | Giải pháp/Thay đổi áp dụng trước phiên chính thức | Lý do áp dụng |
| :--- | :--- | :--- |
| **Kịch bản/Câu hỏi mơ hồ** | *[Ví dụ: Thay đổi từ "Mật khẩu an toàn" thành "Mật khẩu mạnh theo yêu cầu hệ thống" trong kịch bản]* | Giảm nhiễu thông tin, giúp người dùng tập trung vào các ràng buộc giao diện. |
| **Lỗi hệ thống SUT** | *[Quyết định giữ nguyên SUT vì nhóm kiểm thử không có quyền sửa code nguồn, nhưng bổ sung ghi chú vào bảng quan sát để theo dõi hành vi phục hồi lỗi]* | Đảm bảo tính khách quan của kiểm thử Usability trên SUT nguyên bản. |
| **Thời lượng vượt quá** | *[Ví dụ: Rút ngắn thời gian phỏng vấn Probe hoặc thiết lập thời gian ngắt dòng (cut-off) nghiêm ngặt hơn]* | Tránh gây mệt mỏi cho người dùng và tuân thủ thời lượng cam kết. |

---

## 4. Đánh giá tính sẵn sàng (Readiness Approval)
- Buổi chạy thử có đạt yêu cầu chất lượng để tiếp tục triển khai 7 session chính thức không?
  - [ ] **ĐẠT**: Quy trình chạy mượt mà, kịch bản rõ ràng, hệ thống chạy ổn định.
  - [ ] **ĐẠT CÓ ĐIỀU KIỆN**: Hệ thống có lỗi nhẹ hoặc kịch bản cần sửa đổi nhỏ (ghi rõ thay đổi ở phần 3).
  - [ ] **KHÔNG ĐẠT**: Lỗi kỹ thuật chặn đứng hoàn toàn việc đăng ký/đăng nhập mà không thể vượt qua, hoặc kịch bản gây hiểu nhầm nghiêm trọng. (Cần sửa đổi và chạy lại một buổi Pilot khác).
