# Probe Questions — Câu hỏi đào sâu

## Hướng dẫn cho moderator

Hỏi **sau khi** participant hoàn thành (hoặc hết thời gian) task scenario. Giọng tự nhiên, không dẫn dắt. Ghi lại **nguyên văn** câu trả lời của participant.

## Câu hỏi bắt buộc (4 câu)

### 1. Clarity — Sự rõ ràng
> "Bạn có hiểu mình cần phải làm gì ở mỗi bước không? Bước nào bạn thấy rõ ràng nhất, bước nào mù mờ nhất?"

**Mục đích:** Kiểm tra xem hệ thống có cung cấp đủ hướng dẫn và context ở mỗi bước không (IA-01, IA-04).

### 2. Error Recovery — Phục hồi lỗi
> "Khi bạn nhập sai gì đó (email, OTP, mật khẩu), hệ thống phản hồi như thế nào? Bạn có hiểu vấn đề là gì và cách sửa không?"

**Mục đích:** Kiểm tra chất lượng thông báo lỗi, liên quan BUG-FORGOT-005 (regex sai), BUG-FORGOT-007 (window.alert thay vì inline message).

### 3. Speed — Tốc độ / Hiệu quả
> "Bạn có thấy quá trình đặt lại mật khẩu nhanh không? Bước nào bạn cảm thấy mất thời gian nhất hoặc phải đợi lâu?"

**Mục đích:** Phát hiện friction points trong quy trình 2 bước.

### 4. Trust — Độ tin tưởng
> "Sau khi đổi mật khẩu xong, bạn có tự tin rằng mật khẩu đã được đổi thành công không? Tại sao?"

**Mục đích:** Kiểm tra feedback confirmation (IA-04), liên quan BUG-FORGOT-008 (không redirect về login).

## Câu hỏi bổ sung (tùy chọn — hỏi nếu có thời gian)

### 5. Ấn tượng tổng thể
> "Nếu đánh giá trải nghiệm vừa rồi bằng một từ, bạn sẽ dùng từ gì?"

### 6. So sánh
> "So với các trang web/app khác bạn từng đổi mật khẩu, trang này dễ hơn hay khó hơn? Vì sao?"

### 7. Gợi ý cải thiện
> "Nếu bạn được thay đổi một thứ trong quy trình vừa rồi, bạn sẽ thay đổi gì?"

## Lưu ý quan trọng

- **KHÔNG dẫn dắt câu trả lời.** Ví dụ sai: "Bạn có thấy cái nút đó khó tìm không?" → Đúng: "Bạn nghĩ gì về cách tìm đường trong trang?"
- **KHÔNG giải thích tại sao hệ thống hoạt động như vậy.** Nếu participant hỏi, nói: "Mình sẽ ghi nhận câu hỏi đó."
- **Ghi nguyên văn**, kể cả ngập ngừng, ừm, à... — đây là dữ liệu quan trọng.
