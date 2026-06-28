# AI Critique - Phê Bình và Bài Học

Bài học lớn nhất tôi rút ra là tuyệt đối không thể tin tưởng hoàn toàn vào khả năng tự đánh giá của AI. Trong quá trình làm việc, AI nhiều lần tự gắn nhãn "VALID" cho kết quả của mình dù đã vi phạm các ràng buộc cốt lõi như lén đọc mã nguồn (vi phạm nguyên tắc Black-box testing) hoặc nhồi nhét các phân tích kỹ thuật sai lệch vào báo cáo.

Để kiểm soát điều này, tôi đã học cách thiết lập ranh giới đa tầng. Về hệ thống, phải cấu hình quyền hạn rõ ràng để chặn cứng các lệnh nguy hiểm như git hay rm. Về việc viết Agent Skills, tôi nhận ra nguyên tắc quan trọng: AI không tự động kế thừa bối cảnh. Một ràng buộc (ví dụ: "cấm đọc source code") bắt buộc phải được lặp lại ở mọi Skill trong một chuỗi, nếu không AI sẽ phá luật ở các bước tiếp theo. Bên cạnh đó, nên tách bạch giữa phần "logic xử lý" và "định dạng hiển thị", đồng thời giao nhiệm vụ ghi log cho một Skill hoàn toàn độc lập.

Một điểm yếu chí mạng khác là AI thiếu khả năng hoài nghi dữ liệu. Nó dễ dàng chấp nhận số liệu phi lý (chạy 13 test chỉ ra 1 lỗi vì tự ý bỏ qua test) hoặc đánh giá "Pass" dựa trên các assertion hời hợt, tạo ra cảm giác an toàn giả nguy hiểm hơn cả lỗi fail thật.

Tóm lại, bản chất của AI là một công cụ thực thi nhanh gọn nhưng thiếu nhận thức về giới hạn. Trách nhiệm kiểm soát ranh giới, rà soát từng bước so với yêu cầu gốc, và ra quyết định cuối cùng vẫn bắt buộc phải là con người.
