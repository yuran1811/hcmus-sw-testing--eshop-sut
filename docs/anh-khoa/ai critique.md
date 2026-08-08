## AI Critique (200–300 từ)

Hai lỗi đáng chú ý nhất của AI trong bài này thuộc cùng một dạng: **AI xử lý tốt từng sự kiện riêng lẻ nhưng không tự đối chiếu chéo giữa các phần output đã tạo ra trước đó.** Ở FR-01, AI tự phát hiện đúng bug regex mật khẩu và ghi vào `knownIssues`, nhưng khi soạn dữ liệu cho 2 ca kiểm email lại vô tình dùng chính mật khẩu đã biết là bị chặn — khiến 2 assertion fail sai lý do nhiều lượt trước khi bị phát hiện. Ở FR-07 xảy ra tương tự: AI ghi nhận đúng nhãn nút "quay lại" không nhất quán giữa 2 trạng thái giỏ hàng, nhưng setup của một test case khác lại vô tình rơi đúng vào nhánh không nhất quán đó. Cả hai không phải "AI không biết" — thông tin đúng đã có sẵn trong cùng file — mà là AI thiếu bước tự kiểm tra ngược giữa các phần mình vừa sinh ra.

AI cũng không tự bắt được 2 lỗi này khi đọc lại code, vì đọc tĩnh không lộ ra hành vi thực thi — chỉ khi chạy thật qua Playwright MCP mới lộ ra. Lỗi thứ ba (locator `hasText` khớp nhầm chuỗi con) cùng gốc: helper dùng chung "tình cờ đúng" với đa số dữ liệu dài, chỉ vỡ khi gặp đúng dữ liệu biên ngắn mà BVA cố tình sinh ra.

Nguyên tắc rút ra: khi AI tự phát hiện một đặc thù nào đó của hệ thống, cần chủ động hỏi ngược "phát hiện này có ảnh hưởng phần khác mình đã/sắp viết không", thay vì coi mỗi test case là đơn vị độc lập hoàn toàn — và luôn ưu tiên xác minh bằng chạy thật thay vì suy luận từ code tĩnh.
