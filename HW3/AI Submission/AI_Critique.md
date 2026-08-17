# AI Critique - Đánh giá phản biện sử dụng AI (HW03)

Trong HW03, AI hỗ trợ hiệu quả việc sinh mã khung tài liệu và viết script Playwright, nhưng tồn tại nhiều lỗi logic và thiếu sót nghiêm trọng. Thứ nhất, checklist GUI ban đầu của AI bỏ sót các tiêu chuẩn quan trọng như tính dễ tiếp cận (accessibility), chế độ tối, hiển thị tiếng Việt và các trạng thái biên của giỏ hàng. Trong kịch bản Usability, AI mắc lỗi định hướng (moderator bias) khi đưa ra chỉ dẫn từng bước thay vì kịch bản hướng mục tiêu (goal-only), đồng thời tự bịa đặt thông tin 7 người dùng giả. Về kỹ thuật, AI tạo các ảnh bằng chứng lỗi trùng lặp do thiếu highlight, gây lỗi Quota 429 trên Google Sheets do gọi API riêng lẻ, và định dạng sai cột điểm SUS (kiểu văn bản thay vì số) làm hỏng công thức tính.

AI không phát hiện được các lỗi này do hoạt động trên cơ chế dự đoán mẫu từ ngữ thay vì chạy thử nghiệm thực tế (empirical verification). Nó thiếu năng lực cảm nhận chủ quan để đánh giá trải nghiệm người dùng, đồng thời không tự chạy kiểm tra môi trường để phát hiện giới hạn API hay định dạng kiểu dữ liệu.

Qua bài tập này, tôi rút ra nguyên tắc cốt lõi: AI chỉ là công cụ tạo bản thảo thô, không phải nguồn chân lý. Người kiểm thử phải áp dụng quy trình xác minh nghiêm ngặt theo chuẩn ISTQB FL (review tĩnh và chạy động). Sinh viên bắt buộc phải gap-pass thủ công checklist, tuyển người dùng thật để thu thập dữ liệu Usability, điều chỉnh mã nguồn highlight và tối ưu hóa tích hợp hệ thống. Nếu thiếu sự giám sát, hiệu chỉnh và phản hồi liên tục của con người, các tài liệu kiểm thử do AI tạo ra sẽ chỉ mang tính hình thức và không có giá trị thực tế.


