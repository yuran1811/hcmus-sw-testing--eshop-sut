# AI Critique

Trong HW03, chỗ AI sai rõ nhất không phải sai kiến thức mà là **sai phạm vi và sai đơn vị**. Ba ví dụ cụ thể:

**Thứ nhất — bịa ràng buộc không kiểm chứng.** Khi dựng kịch bản usability, AI tự đặt ngân sách "dưới 10 triệu" rồi lập luận rằng ràng buộc này tạo ra điểm quyết định thật (chỉ 2/5 sản phẩm hợp lệ nên người dùng buộc phải lọc). Lập luận nghe rất thuyết phục, nhưng ràng buộc đó **không đến từ yêu cầu nào** — nó là thứ AI tự nghĩ ra để kịch bản trông "có chiều sâu". Khi người thực hiện quyết định bỏ hẳn giới hạn ngân sách, toàn bộ lập luận đó sụp đổ mà không mất mát gì. Bài học: AI có xu hướng **tạo ra ràng buộc để có cái mà phân tích**, và lập luận hay không đồng nghĩa với tiền đề đúng.

**Thứ hai — sai đơn vị trong phép so sánh đơn giản nhất.** AI ghi phiên P04 dài 2 phút 16 giây là "vượt timebox 3 phút" — so `2:16` với số `3` mà không đổi cùng đơn vị. Lỗi sơ đẳng này lọt qua vì nó nằm trong một câu văn dài trông có vẻ chuyên nghiệp. Người thực hiện phát hiện chỉ bằng một câu hỏi ngắn: _"ủa tại sao 2p16s mà quá timebox?"_. Cùng loại lỗi lặp lại khi AI viết mốc thời gian timeline thành `00:60`, `00:66` thay vì `01:00`, `01:06`.

**Thứ ba — áp nhầm quy tắc từ ngữ cảnh khác.** Đề bài quy định "chỉ chụp ảnh cho item Failed" ở **Task 1**. AI áp máy móc quy tắc đó sang **Task 3**, nơi ảnh chụp có mục đích hoàn toàn khác — chứng minh độ phủ nền tảng, không phải chứng minh lỗi. Kết quả suýt nữa chỉ nộp 7/27 ảnh, mất phần lớn bằng chứng của một task 20 điểm.

**Nguyên tắc rút ra:** AI mạnh nhất khi được giao việc _đối chiếu_ (so lời kể với video, so checklist với DOM thật) và yếu nhất khi được giao việc _quyết định phạm vi_. Vì vậy giá trị của người review không nằm ở chỗ đọc lại từng câu chữ, mà ở chỗ hỏi ngược những câu ngắn — "cái này lấy ở đâu ra?", "đơn vị gì?", "quy tắc này của task nào?" — đúng ba câu đã bắt được cả ba lỗi trên.
